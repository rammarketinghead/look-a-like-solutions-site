import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Custom labels for specific routes
      const customLabels: { [key: string]: string } = {
        'about': 'About Us',
        'services': 'Services',
        'case-studies': 'Case Studies',
        'blog': 'Blog',
        'contact': 'Contact',
        'seo': 'SEO Optimization',
        'social-media': 'Social Media Marketing',
        'paid-ads': 'Paid Advertising',
        'web-development': 'Web Development',
        'influencer': 'Influencer Marketing',
        'content': 'Content Marketing',
        'analytics': 'Data Analytics',
        'conversion': 'Conversion Optimization'
      };

      const label = customLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-light-gray border-b border-gray-200">
      <div className="max-w-[100rem] mx-auto px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm font-paragraph">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-secondary mx-2 flex-shrink-0" />
              )}
              {index === 0 && (
                <Home className="h-4 w-4 text-secondary mr-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-primary font-medium">{item.label}</span>
              ) : (
                <Link
                  to={item.href}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}