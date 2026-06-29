/**
 * Blog Content Analyzer Service
 * Analyzes blog posts for content quality, word count, structure, and SEO metrics
 */

import { BlogPosts } from '@/entities';

export interface ContentAnalysis {
  postId: string;
  title: string;
  wordCount: number;
  contentQuality: 'thin' | 'moderate' | 'comprehensive';
  hasH2Sections: boolean;
  hasH3Sections: boolean;
  hasFAQ: boolean;
  hasKeyTakeaways: boolean;
  hasComparisons: boolean;
  hasExamples: boolean;
  readingTime: number;
  issues: string[];
  recommendations: string[];
}

export interface BlogAuditReport {
  totalPosts: number;
  averageWordCount: number;
  thinContentPosts: number;
  moderateContentPosts: number;
  comprehensiveContentPosts: number;
  postsNeedingRewrite: number;
  totalWordCountNeeded: number;
  analyses: ContentAnalysis[];
}

/**
 * Analyze a single blog post for content quality
 */
export function analyzePost(post: BlogPosts): ContentAnalysis {
  const content = post.content || '';
  const title = post.title || '';
  
  // Calculate word count
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  
  // Determine content quality based on word count
  let contentQuality: 'thin' | 'moderate' | 'comprehensive';
  if (wordCount < 500) {
    contentQuality = 'thin';
  } else if (wordCount < 1500) {
    contentQuality = 'moderate';
  } else {
    contentQuality = 'comprehensive';
  }
  
  // Check for structural elements
  const hasH2Sections = /<h2|##/.test(content);
  const hasH3Sections = /<h3|###/.test(content);
  const hasFAQ = /faq|frequently asked|question:/i.test(content);
  const hasKeyTakeaways = /key takeaway|summary|conclusion/i.test(content);
  const hasComparisons = /vs\.|comparison|table|vs /i.test(content);
  const hasExamples = /example|case study|for instance|such as/i.test(content);
  
  // Calculate reading time (200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);
  
  // Identify issues
  const issues: string[] = [];
  if (wordCount < 500) {
    issues.push(`Very thin content: only ${wordCount} words (target: 3000+)`);
  } else if (wordCount < 1500) {
    issues.push(`Moderate content: ${wordCount} words (target: 3000+)`);
  }
  
  if (!hasH2Sections) {
    issues.push('No H2 sections found - lacks proper heading structure');
  }
  
  if (!hasFAQ) {
    issues.push('No FAQ section - missing common user questions');
  }
  
  if (!hasKeyTakeaways) {
    issues.push('No key takeaways or summary - missing conclusion');
  }
  
  if (!hasExamples) {
    issues.push('No practical examples - lacks real-world context');
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (wordCount < 3000) {
    recommendations.push(`Expand content to 3000+ words (currently ${wordCount})`);
  }
  
  if (!hasH2Sections) {
    recommendations.push('Add H2 sections for better structure and SEO');
  }
  
  if (!hasH3Sections) {
    recommendations.push('Add H3 subsections for detailed topic breakdown');
  }
  
  if (!hasFAQ) {
    recommendations.push('Add FAQ section with 5-7 common questions');
  }
  
  if (!hasKeyTakeaways) {
    recommendations.push('Add key takeaways box and strong conclusion');
  }
  
  if (!hasComparisons) {
    recommendations.push('Add comparison tables or sections for better clarity');
  }
  
  if (!hasExamples) {
    recommendations.push('Add practical examples and case studies (hypothetical if needed)');
  }
  
  recommendations.push('Optimize for featured snippets with answer-first paragraphs');
  recommendations.push('Add Indian/Bengaluru SMB context and examples');
  recommendations.push('Implement proper schema markup (Article, FAQ, BreadcrumbList)');
  
  return {
    postId: post._id,
    title,
    wordCount,
    contentQuality,
    hasH2Sections,
    hasH3Sections,
    hasFAQ,
    hasKeyTakeaways,
    hasComparisons,
    hasExamples,
    readingTime,
    issues,
    recommendations
  };
}

/**
 * Generate comprehensive audit report for all blog posts
 */
export function generateAuditReport(posts: BlogPosts[]): BlogAuditReport {
  const analyses = posts.map(post => analyzePost(post));
  
  const thinContentPosts = analyses.filter(a => a.contentQuality === 'thin').length;
  const moderateContentPosts = analyses.filter(a => a.contentQuality === 'moderate').length;
  const comprehensiveContentPosts = analyses.filter(a => a.contentQuality === 'comprehensive').length;
  
  const averageWordCount = Math.round(
    analyses.reduce((sum, a) => sum + a.wordCount, 0) / analyses.length
  );
  
  // Calculate total words needed to reach 3000 per post
  const totalWordCountNeeded = analyses.reduce((sum, a) => {
    const needed = Math.max(0, 3000 - a.wordCount);
    return sum + needed;
  }, 0);
  
  const postsNeedingRewrite = analyses.filter(a => a.wordCount < 3000).length;
  
  return {
    totalPosts: posts.length,
    averageWordCount,
    thinContentPosts,
    moderateContentPosts,
    comprehensiveContentPosts,
    postsNeedingRewrite,
    totalWordCountNeeded,
    analyses
  };
}

/**
 * Format analysis report as markdown
 */
export function formatAuditReportAsMarkdown(report: BlogAuditReport): string {
  let markdown = `# Blog Content Audit Report\n\n`;
  
  markdown += `## Summary Statistics\n\n`;
  markdown += `- **Total Posts**: ${report.totalPosts}\n`;
  markdown += `- **Average Word Count**: ${report.averageWordCount} words\n`;
  markdown += `- **Posts Needing Rewrite**: ${report.postsNeedingRewrite} (${Math.round((report.postsNeedingRewrite / report.totalPosts) * 100)}%)\n`;
  markdown += `- **Total Words Needed**: ${report.totalWordCountNeeded.toLocaleString()} words\n\n`;
  
  markdown += `## Content Quality Breakdown\n\n`;
  markdown += `| Quality Level | Count | Percentage |\n`;
  markdown += `|---|---|---|\n`;
  markdown += `| Thin (<500 words) | ${report.thinContentPosts} | ${Math.round((report.thinContentPosts / report.totalPosts) * 100)}% |\n`;
  markdown += `| Moderate (500-1500 words) | ${report.moderateContentPosts} | ${Math.round((report.moderateContentPosts / report.totalPosts) * 100)}% |\n`;
  markdown += `| Comprehensive (1500+ words) | ${report.comprehensiveContentPosts} | ${Math.round((report.comprehensiveContentPosts / report.totalPosts) * 100)}% |\n\n`;
  
  markdown += `## Post-by-Post Analysis\n\n`;
  
  report.analyses.forEach((analysis, index) => {
    markdown += `### ${index + 1}. ${analysis.title}\n\n`;
    markdown += `- **Post ID**: ${analysis.postId}\n`;
    markdown += `- **Word Count**: ${analysis.wordCount} words (${analysis.readingTime} min read)\n`;
    markdown += `- **Quality**: ${analysis.contentQuality.toUpperCase()}\n`;
    markdown += `- **Structure**:\n`;
    markdown += `  - H2 Sections: ${analysis.hasH2Sections ? '✓' : '✗'}\n`;
    markdown += `  - H3 Sections: ${analysis.hasH3Sections ? '✓' : '✗'}\n`;
    markdown += `  - FAQ: ${analysis.hasFAQ ? '✓' : '✗'}\n`;
    markdown += `  - Key Takeaways: ${analysis.hasKeyTakeaways ? '✓' : '✗'}\n`;
    markdown += `  - Comparisons: ${analysis.hasComparisons ? '✓' : '✗'}\n`;
    markdown += `  - Examples: ${analysis.hasExamples ? '✓' : '✗'}\n\n`;
    
    if (analysis.issues.length > 0) {
      markdown += `**Issues**:\n`;
      analysis.issues.forEach(issue => {
        markdown += `- ${issue}\n`;
      });
      markdown += `\n`;
    }
    
    if (analysis.recommendations.length > 0) {
      markdown += `**Recommendations**:\n`;
      analysis.recommendations.forEach(rec => {
        markdown += `- ${rec}\n`;
      });
      markdown += `\n`;
    }
  });
  
  return markdown;
}
