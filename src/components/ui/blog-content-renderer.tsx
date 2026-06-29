/**
 * Enhanced Blog Content Renderer
 * Supports semantic HTML structure, schema markup, and advanced content blocks
 */

import React, { useMemo } from 'react';
import { BlogPosts } from '@/entities';

interface BlogContentRendererProps {
  post: BlogPosts;
  readingTime: number;
}

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'table' | 'faq' | 'takeaways' | 'checklist' | 'quote';
  content: string;
  level?: number; // For headings
  items?: string[]; // For lists
  rows?: Array<Record<string, string>>; // For tables
  columns?: string[]; // For tables
}

/**
 * Parse blog content into structured blocks
 */
function parseContentBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split('\n');
  
  let currentParagraph = '';
  let inList = false;
  let listItems: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      if (inList && listItems.length > 0) {
        blocks.push({ type: 'list', items: listItems });
        listItems = [];
        inList = false;
      }
      continue;
    }
    
    // Check for headings
    if (trimmed.startsWith('##')) {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      const level = trimmed.match(/^#+/)?.[0].length || 2;
      const text = trimmed.replace(/^#+\s*/, '');
      blocks.push({ type: 'heading', content: text, level });
      continue;
    }
    
    // Check for list items
    if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      inList = true;
      const item = trimmed.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '');
      listItems.push(item);
      continue;
    }
    
    // Check for special blocks
    if (trimmed.toLowerCase().includes('key takeaway') || 
        trimmed.toLowerCase().includes('faq') ||
        trimmed.toLowerCase().includes('checklist')) {
      if (currentParagraph) {
        blocks.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      if (inList && listItems.length > 0) {
        blocks.push({ type: 'list', items: listItems });
        listItems = [];
        inList = false;
      }
      // These will be handled by specific components
      continue;
    }
    
    // Regular paragraph
    if (inList && listItems.length > 0) {
      blocks.push({ type: 'list', items: listItems });
      listItems = [];
      inList = false;
    }
    
    currentParagraph += (currentParagraph ? ' ' : '') + trimmed;
  }
  
  // Flush remaining content
  if (currentParagraph) {
    blocks.push({ type: 'paragraph', content: currentParagraph });
  }
  if (inList && listItems.length > 0) {
    blocks.push({ type: 'list', items: listItems });
  }
  
  return blocks;
}

/**
 * Generate Article Schema
 */
function generateArticleSchema(post: BlogPosts, readingTime: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.metaDescription,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: post.author || 'Digital Marketing Expert'
    },
    datePublished: post.publishedDate,
    dateModified: post._updatedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Look A Like Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lookalikesolutions.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : ''
    }
  };
}

/**
 * Generate FAQ Schema
 */
function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Breadcrumb Schema
 */
function generateBreadcrumbSchema(postTitle: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: typeof window !== 'undefined' ? window.location.origin : ''
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: typeof window !== 'undefined' ? `${window.location.origin}/blog` : ''
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: typeof window !== 'undefined' ? window.location.href : ''
      }
    ]
  };
}

/**
 * Main Blog Content Renderer Component
 */
export function BlogContentRenderer({ post, readingTime }: BlogContentRendererProps) {
  const blocks = useMemo(() => parseContentBlocks(post.content || ''), [post.content]);
  
  // Generate schema markup
  const articleSchema = useMemo(() => generateArticleSchema(post, readingTime), [post, readingTime]);
  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema(post.title || ''), [post.title]);
  
  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        {blocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
              return (
                <HeadingTag key={index} className="font-heading text-dark-gray mt-8 mb-4">
                  {block.content}
                </HeadingTag>
              );
            
            case 'list':
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4">
                  {block.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            
            case 'paragraph':
            default:
              return (
                <p key={index} className="text-secondary leading-relaxed my-4">
                  {block.content}
                </p>
              );
          }
        })}
      </article>
    </>
  );
}

/**
 * Key Takeaways Block Component
 */
export function KeyTakeawaysBlock({ takeaways }: { takeaways: string[] }) {
  return (
    <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 my-8">
      <h3 className="font-heading text-dark-gray mb-4 flex items-center">
        <span className="text-primary mr-2">✓</span>
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-3 font-bold">✓</span>
            <span className="text-secondary">{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * FAQ Block Component with Schema
 */
export function FAQBlock({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqSchema = useMemo(() => generateFAQSchema(faqs), [faqs]);
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="my-12">
        <h2 className="font-heading text-dark-gray text-2xl mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-light-gray transition-colors">
              <summary className="font-heading text-dark-gray font-semibold">
                {faq.question}
              </summary>
              <p className="text-secondary mt-3 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Implementation Checklist Component
 */
export function ImplementationChecklist({ items }: { items: Array<{ title: string; subitems: string[] }> }) {
  return (
    <div className="bg-light-gray rounded-lg p-8 my-8">
      <h3 className="font-heading text-dark-gray text-xl mb-6">Implementation Checklist</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center mb-2">
              <input type="checkbox" id={`item-${index}`} className="mr-3 w-5 h-5" />
              <label htmlFor={`item-${index}`} className="font-heading text-dark-gray cursor-pointer">
                {item.title}
              </label>
            </div>
            {item.subitems.length > 0 && (
              <ul className="ml-8 space-y-2">
                {item.subitems.map((subitem, subindex) => (
                  <li key={subindex} className="flex items-center text-secondary">
                    <input type="checkbox" className="mr-2 w-4 h-4" />
                    <span>{subitem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Comparison Table Component
 */
export function ComparisonTable({ 
  title, 
  columns, 
  rows 
}: { 
  title: string; 
  columns: string[]; 
  rows: Array<Record<string, string>> 
}) {
  return (
    <div className="my-8 overflow-x-auto">
      <h3 className="font-heading text-dark-gray text-xl mb-4">{title}</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-primary/10">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border border-gray-300 p-3 text-left font-heading text-dark-gray">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-light-gray'}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-3 text-secondary">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Expert Opinion Block
 */
export function ExpertOpinionBlock({ 
  expertName, 
  title, 
  bio, 
  opinion 
}: { 
  expertName: string; 
  title: string; 
  bio: string; 
  opinion: string 
}) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-lg p-6 my-8">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-heading text-2xl">
            {expertName.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-heading text-dark-gray font-semibold">
            Expert Opinion: {expertName}
          </h4>
          <p className="text-secondary text-sm mb-3">{title}</p>
          <p className="text-secondary italic mb-3">"{opinion}"</p>
          <p className="text-secondary text-sm">{bio}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogContentRenderer;
