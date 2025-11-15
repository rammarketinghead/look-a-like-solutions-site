import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { fixSlug, isValidSlug, hasProtocol } from '@/utils/slugUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

interface SlugValidatorProps {
  onValidationComplete?: (hasIssues: boolean) => void;
  autoFix?: boolean;
}

export function SlugValidator({ onValidationComplete, autoFix = false }: SlugValidatorProps) {
  const [validationStatus, setValidationStatus] = useState<'idle' | 'checking' | 'fixing' | 'complete'>('idle');
  const [issues, setIssues] = useState<Array<{ post: BlogPosts; issue: string; fixedSlug: string }>>([]);
  const [fixedCount, setFixedCount] = useState(0);

  const validateSlugs = async () => {
    setValidationStatus('checking');
    
    try {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      const foundIssues: Array<{ post: BlogPosts; issue: string; fixedSlug: string }> = [];
      
      items.forEach(post => {
        if (!post.slug) {
          foundIssues.push({
            post,
            issue: 'Missing slug',
            fixedSlug: fixSlug(post.title || `post-${post._id}`)
          });
        } else if (hasProtocol(post.slug)) {
          foundIssues.push({
            post,
            issue: 'Contains protocol',
            fixedSlug: fixSlug(post.slug)
          });
        } else if (!isValidSlug(post.slug)) {
          foundIssues.push({
            post,
            issue: 'Invalid format',
            fixedSlug: fixSlug(post.slug)
          });
        }
      });
      
      setIssues(foundIssues);
      onValidationComplete?.(foundIssues.length > 0);
      
      if (autoFix && foundIssues.length > 0) {
        await fixAllIssues(foundIssues);
      } else {
        setValidationStatus('complete');
      }
    } catch (error) {
      console.error('Error validating slugs:', error);
      setValidationStatus('complete');
    }
  };

  const fixAllIssues = async (issuesToFix: Array<{ post: BlogPosts; issue: string; fixedSlug: string }>) => {
    setValidationStatus('fixing');
    let fixed = 0;
    
    try {
      for (const issue of issuesToFix) {
        if (issue.fixedSlug) {
          // CRITICAL: Preserve all existing data when updating
          await BaseCrudService.update<BlogPosts>('blogposts', {
            ...issue.post, // Preserve all existing fields
            slug: issue.fixedSlug // Only update the slug
          });
          fixed++;
        }
      }
      
      setFixedCount(fixed);
      setIssues([]);
      setValidationStatus('complete');
    } catch (error) {
      console.error('Error fixing slugs:', error);
      setValidationStatus('complete');
    }
  };

  const handleFixAllIssues = async () => {
    await fixAllIssues(issues);
  };

  useEffect(() => {
    validateSlugs();
  }, []);

  if (validationStatus === 'idle' || validationStatus === 'checking') {
    return (
      <Alert>
        <RefreshCw className="h-4 w-4 animate-spin" />
        <AlertDescription>
          Validating blog post slugs...
        </AlertDescription>
      </Alert>
    );
  }

  if (validationStatus === 'fixing') {
    return (
      <Alert>
        <RefreshCw className="h-4 w-4 animate-spin" />
        <AlertDescription>
          Fixing slug issues...
        </AlertDescription>
      </Alert>
    );
  }

  if (issues.length === 0 && fixedCount === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          All blog post slugs are properly formatted.
        </AlertDescription>
      </Alert>
    );
  }

  if (fixedCount > 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Successfully fixed {fixedCount} blog post slug{fixedCount !== 1 ? 's' : ''}.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          Found {issues.length} blog post{issues.length !== 1 ? 's' : ''} with slug issues.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        {issues.slice(0, 5).map((issue, index) => (
          <div key={issue.post._id} className="p-3 bg-gray-50 rounded-lg text-sm">
            <div className="font-medium text-gray-900">
              {issue.post.title || `Post ${index + 1}`}
            </div>
            <div className="text-gray-600">
              Issue: {issue.issue}
            </div>
            <div className="text-gray-600">
              Current: <code className="bg-red-100 px-1 rounded">{issue.post.slug || '(empty)'}</code>
            </div>
            <div className="text-gray-600">
              Fixed: <code className="bg-green-100 px-1 rounded">{issue.fixedSlug}</code>
            </div>
          </div>
        ))}
        
        {issues.length > 5 && (
          <div className="text-sm text-gray-500 text-center">
            ...and {issues.length - 5} more
          </div>
        )}
      </div>
      
      <Button 
        onClick={handleFixAllIssues}
        className="w-full"
        disabled={false}
      >
        `Fix All ${issues.length} Issue${issues.length !== 1 ? 's' : ''}`
      </Button>
    </div>
  );
}