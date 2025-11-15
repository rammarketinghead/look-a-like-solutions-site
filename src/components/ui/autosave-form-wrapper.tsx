import React, { useState, useEffect } from 'react';
import { useFormAutosave } from '@/hooks/useFormAutosave';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Save, AlertCircle, Clock } from 'lucide-react';

interface AutosaveFormWrapperProps {
  children: React.ReactNode;
  formType: string;
  formData: Record<string, any>;
  enabled?: boolean;
  showIndicator?: boolean;
  debounceMs?: number;
  onFormCompleted?: () => void;
  className?: string;
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function AutosaveFormWrapper({
  children,
  formType,
  formData,
  enabled = true,
  showIndicator = true,
  debounceMs = 1000,
  onFormCompleted,
  className = ''
}: AutosaveFormWrapperProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  const { sessionId, markAsCompleted } = useFormAutosave({
    formType,
    formData,
    enabled,
    debounceMs,
    onSaveSuccess: (sessionId) => {
      setSaveStatus('saved');
      setLastSaveTime(new Date());
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    },
    onSaveError: (error) => {
      setSaveStatus('error');
      console.error('Autosave error:', error);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 5000);
    }
  });

  // Set saving status when form data changes
  useEffect(() => {
    if (enabled && Object.values(formData).some(value => 
      typeof value === 'string' ? value.trim().length > 0 : value !== null && value !== undefined && value !== ''
    )) {
      setSaveStatus('saving');
    }
  }, [formData, enabled]);

  // Handle form completion
  const handleFormCompleted = async () => {
    await markAsCompleted();
    onFormCompleted?.();
  };

  const getSaveStatusInfo = () => {
    switch (saveStatus) {
      case 'saving':
        return {
          icon: <Save className="w-3 h-3 animate-pulse" />,
          text: 'Saving...',
          variant: 'secondary' as const,
          color: 'text-blue-600'
        };
      case 'saved':
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          text: lastSaveTime ? `Saved ${lastSaveTime.toLocaleTimeString()}` : 'Saved',
          variant: 'secondary' as const,
          color: 'text-green-600'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          text: 'Save failed',
          variant: 'destructive' as const,
          color: 'text-red-600'
        };
      default:
        return null;
    }
  };

  const statusInfo = getSaveStatusInfo();

  return (
    <div className={`relative ${className}`}>
      {/* Autosave Indicator */}
      {showIndicator && enabled && statusInfo && (
        <div className="absolute top-0 right-0 z-10 -mt-2 -mr-2">
          <Badge 
            variant={statusInfo.variant}
            className={`flex items-center gap-1 text-xs ${statusInfo.color} bg-white border shadow-sm`}
          >
            {statusInfo.icon}
            {statusInfo.text}
          </Badge>
        </div>
      )}

      {/* Session Info (for debugging) */}
      {process.env.NODE_ENV === 'development' && sessionId && (
        <div className="absolute bottom-0 left-0 z-10 -mb-6">
          <Badge variant="outline" className="text-xs opacity-50">
            Session: {sessionId.slice(-8)}
          </Badge>
        </div>
      )}

      {/* Form Content */}
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          onSubmit: (e: React.FormEvent) => {
            // Call original onSubmit if it exists
            const originalOnSubmit = (children as React.ReactElement).props.onSubmit;
            if (originalOnSubmit) {
              originalOnSubmit(e);
            }
            
            // Mark form as completed
            handleFormCompleted();
          }
        })}
      </div>

      {/* Autosave Info */}
      {enabled && showIndicator && (
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Your progress is automatically saved</span>
        </div>
      )}
    </div>
  );
}