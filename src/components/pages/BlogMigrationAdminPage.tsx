import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, AlertTriangle, Download, Upload } from 'lucide-react';

export default function BlogMigrationAdminPage() {
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPosts[]>([]);
  const [csvData, setCsvData] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const validPosts = items.filter(p => p.title?.trim() && p.content?.trim());
        setBlogCount(validPosts.length);
        setPosts(validPosts);
      } catch (error) {
        console.error('Error fetching blog count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogCount();
  }, []);

  const exportAsCSV = () => {
    const headers = ['Title', 'Slug', 'Author', 'Published Date', 'Excerpt'];
    const rows = posts.map(post => [
      post.title || '',
      post.slug || '',
      post.author || '',
      post.publishedDate ? new Date(post.publishedDate).toISOString() : '',
      post.excerpt || ''
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-posts-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setImportStatus('importing');
        setImportMessage('Parsing CSV...');

        const csv = event.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const newPosts: BlogPosts[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          const post: BlogPosts = {
            _id: crypto.randomUUID(),
            title: values[0] || '',
            slug: values[1] || '',
            author: values[2] || 'Digital Marketing Team',
            publishedDate: values[3] ? new Date(values[3]) : new Date(),
            excerpt: values[4] || '',
            content: '', // Content must be added manually
            _createdDate: new Date(),
            _updatedDate: new Date()
          };

          if (post.title && post.slug) {
            newPosts.push(post);
          }
        }

        setImportMessage(`Found ${newPosts.length} posts. Importing...`);

        // Check for duplicates
        const existingSlugs = new Set(posts.map(p => p.slug));
        const duplicates = newPosts.filter(p => existingSlugs.has(p.slug));
        const toImport = newPosts.filter(p => !existingSlugs.has(p.slug));

        if (duplicates.length > 0) {
          setImportMessage(`Skipping ${duplicates.length} duplicate posts (by slug). Importing ${toImport.length} new posts...`);
        }

        // Import new posts
        let imported = 0;
        for (const post of toImport) {
          try {
            await BaseCrudService.create('blogposts', post);
            imported++;
          } catch (error) {
            console.error(`Error importing post ${post.title}:`, error);
          }
        }

        setImportStatus('success');
        setImportMessage(`Successfully imported ${imported} new posts! (${duplicates.length} duplicates skipped)`);
        
        // Refresh count
        const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
        const validPosts = items.filter(p => p.title?.trim() && p.content?.trim());
        setBlogCount(validPosts.length);
        setPosts(validPosts);
      } catch (error) {
        setImportStatus('error');
        setImportMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-light-gray py-12 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-heading text-dark-gray mb-4">Blog Migration Admin</h1>
          <p className="text-lg font-paragraph text-secondary">
            Manage blog post migration from Wix Blog app to CMS collection
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              {blogCount >= 95 ? (
                <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              ) : blogCount >= 50 ? (
                <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
              ) : (
                <AlertCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-heading text-dark-gray mb-2">Current Status</h2>
                <p className="font-paragraph text-secondary mb-4">
                  CMS Blog Posts: <span className="font-bold text-dark-gray">{blogCount}</span> / 95
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((blogCount / 95) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="font-paragraph text-secondary text-sm mt-2">
                  {blogCount < 95 ? `${95 - blogCount} posts remaining to migrate` : 'All posts migrated!'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Instructions */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading text-dark-gray mb-6">Migration Steps</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-heading text-dark-gray mb-2">Step 1: Export from Wix Blog</h3>
                <p className="font-paragraph text-secondary mb-3">
                  Go to your Wix Dashboard → Blog → Posts
                </p>
                <ol className="list-decimal list-inside space-y-2 font-paragraph text-secondary">
                  <li>Filter for "Published" posts only</li>
                  <li>Select all posts (95 total)</li>
                  <li>Look for "Export" option in menu</li>
                  <li>Export as CSV format</li>
                </ol>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-heading text-dark-gray mb-2">Step 2: Transform Data</h3>
                <p className="font-paragraph text-secondary mb-3">
                  Ensure CSV has these columns (in order):
                </p>
                <code className="block bg-dark-gray/10 p-4 rounded font-mono text-sm text-dark-gray mb-3">
                  Title, Slug, Author, Published Date, Excerpt
                </code>
                <p className="font-paragraph text-secondary text-sm">
                  Note: Content field must be added manually in CMS after import
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-heading text-dark-gray mb-2">Step 3: Import CSV</h3>
                <p className="font-paragraph text-secondary">
                  Use the import tool below to upload your CSV file
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Current Posts */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading text-dark-gray mb-6">Export Current Posts</h2>
            <p className="font-paragraph text-secondary mb-6">
              Download your current {blogCount} blog posts as CSV for backup or reference
            </p>
            <Button
              onClick={exportAsCSV}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export as CSV
            </Button>
          </CardContent>
        </Card>

        {/* Import CSV */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading text-dark-gray mb-6">Import Blog Posts</h2>
            
            <div className="mb-6">
              <label className="block font-heading text-dark-gray mb-3">
                Select CSV File
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVImport}
                  disabled={importStatus === 'importing'}
                  className="flex-1"
                />
                <Upload className="h-5 w-5 text-secondary" />
              </div>
            </div>

            {/* Status Messages */}
            {importStatus !== 'idle' && (
              <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
                importStatus === 'success' ? 'bg-green-50 border border-green-200' :
                importStatus === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                {importStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : importStatus === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-heading ${
                    importStatus === 'success' ? 'text-green-900' :
                    importStatus === 'error' ? 'text-red-900' :
                    'text-blue-900'
                  }`}>
                    {importStatus === 'success' ? 'Import Successful' :
                     importStatus === 'error' ? 'Import Failed' :
                     'Importing...'}
                  </p>
                  <p className={`font-paragraph text-sm ${
                    importStatus === 'success' ? 'text-green-700' :
                    importStatus === 'error' ? 'text-red-700' :
                    'text-blue-700'
                  }`}>
                    {importMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-light-gray p-6 rounded-lg">
              <h3 className="font-heading text-dark-gray mb-3">Import Details</h3>
              <ul className="space-y-2 font-paragraph text-secondary text-sm">
                <li>✓ Automatically detects duplicate posts by slug</li>
                <li>✓ Skips duplicates, imports only new posts</li>
                <li>✓ Generates unique IDs for each post</li>
                <li>✓ Sets creation and update timestamps</li>
                <li>⚠ Content field must be added manually in CMS</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Link */}
        <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-heading text-dark-gray mb-2">Need Help?</h3>
          <p className="font-paragraph text-secondary mb-4">
            See the detailed migration guide for step-by-step instructions:
          </p>
          <a
            href="/src/PHASE6_WIX_BLOG_TO_CMS_MIGRATION.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-heading hover:underline"
          >
            PHASE6_WIX_BLOG_TO_CMS_MIGRATION.md →
          </a>
        </div>
      </div>
    </div>
  );
}
