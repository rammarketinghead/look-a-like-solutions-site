import { useEffect, useRef, useCallback } from 'react';
import { BaseCrudService } from '@/integrations';
import { PartialFormData } from '@/entities';
import { debounce } from 'lodash';

interface UseFormAutosaveOptions {
  formType: string;
  formData: Record<string, any>;
  enabled?: boolean;
  debounceMs?: number;
  onSaveSuccess?: (sessionId: string) => void;
  onSaveError?: (error: Error) => void;
}

interface UserInfo {
  userAgent: string;
  timestamp: string;
  pageUrl: string;
  referrer?: string;
}

export function useFormAutosave({
  formType,
  formData,
  enabled = true,
  debounceMs = 1000,
  onSaveSuccess,
  onSaveError
}: UseFormAutosaveOptions) {
  const sessionIdRef = useRef<string | null>(null);
  const lastSavedDataRef = useRef<string>('');
  const isInitializedRef = useRef(false);

  // Generate a unique session ID for this form session
  const generateSessionId = useCallback(() => {
    return `${formType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, [formType]);

  // Get user information
  const getUserInfo = useCallback((): UserInfo => {
    return {
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      referrer: document.referrer || undefined
    };
  }, []);

  // Check if form data has meaningful content
  const hasValidData = useCallback((data: Record<string, any>) => {
    return Object.values(data).some(value => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    });
  }, []);

  // Save form data to CMS
  const saveFormData = useCallback(async (data: Record<string, any>, status: 'draft' | 'abandoned' | 'completed' = 'draft') => {
    if (!enabled || !hasValidData(data)) {
      return;
    }

    try {
      // Generate session ID if not exists
      if (!sessionIdRef.current) {
        sessionIdRef.current = generateSessionId();
      }

      const formDataString = JSON.stringify(data);
      
      // Skip if data hasn't changed
      if (formDataString === lastSavedDataRef.current) {
        return;
      }

      const userInfo = getUserInfo();
      const partialData: PartialFormData = {
        _id: sessionIdRef.current,
        sessionId: sessionIdRef.current,
        formType,
        formData: formDataString,
        userInfo: JSON.stringify(userInfo),
        submissionStatus: status,
        pageUrl: userInfo.pageUrl
      };

      // Try to update existing record first, create if doesn't exist
      try {
        await BaseCrudService.update('partialformdata', partialData);
      } catch (updateError) {
        // If update fails, try to create new record
        await BaseCrudService.create('partialformdata', partialData);
      }

      lastSavedDataRef.current = formDataString;
      onSaveSuccess?.(sessionIdRef.current);
      
      console.log('📝 Form autosaved:', {
        sessionId: sessionIdRef.current,
        formType,
        status,
        fieldsCount: Object.keys(data).length
      });
    } catch (error) {
      console.error('❌ Form autosave failed:', error);
      onSaveError?.(error as Error);
    }
  }, [enabled, formType, hasValidData, generateSessionId, getUserInfo, onSaveSuccess, onSaveError]);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data: Record<string, any>) => {
      saveFormData(data, 'draft');
    }, debounceMs),
    [saveFormData, debounceMs]
  );

  // Mark form as completed
  const markAsCompleted = useCallback(async () => {
    if (sessionIdRef.current && hasValidData(formData)) {
      await saveFormData(formData, 'completed');
    }
  }, [formData, saveFormData, hasValidData]);

  // Mark form as abandoned (called on page unload)
  const markAsAbandoned = useCallback(async () => {
    if (sessionIdRef.current && hasValidData(formData)) {
      // Use sendBeacon for reliable data sending on page unload
      const userInfo = getUserInfo();
      const partialData = {
        _id: sessionIdRef.current,
        sessionId: sessionIdRef.current,
        formType,
        formData: JSON.stringify(formData),
        userInfo: JSON.stringify(userInfo),
        submissionStatus: 'abandoned',
        pageUrl: userInfo.pageUrl
      };

      try {
        // Try to send via fetch with keepalive
        await fetch('/api/autosave-abandon', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partialData),
          keepalive: true
        }).catch(() => {
          // Fallback: try regular save
          saveFormData(formData, 'abandoned');
        });
      } catch (error) {
        console.error('Failed to mark form as abandoned:', error);
      }
    }
  }, [formData, formType, getUserInfo, saveFormData, hasValidData]);

  // Auto-save effect
  useEffect(() => {
    if (!enabled) return;

    // Initialize session on first meaningful data
    if (!isInitializedRef.current && hasValidData(formData)) {
      isInitializedRef.current = true;
      debouncedSave(formData);
    } else if (isInitializedRef.current) {
      debouncedSave(formData);
    }
  }, [formData, enabled, hasValidData, debouncedSave]);

  // Page unload effect
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = () => {
      markAsAbandoned();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        markAsAbandoned();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Mark as abandoned when component unmounts
      markAsAbandoned();
    };
  }, [enabled, markAsAbandoned]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return {
    sessionId: sessionIdRef.current,
    markAsCompleted,
    markAsAbandoned,
    saveNow: () => saveFormData(formData, 'draft')
  };
}