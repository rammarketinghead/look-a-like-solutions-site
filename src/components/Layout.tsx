import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ChatWidget from '@/components/ui/chat-widget';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Menu, X, Phone, Mail, MapPin, Search, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Determine if we should show the exit intent popup
  const shouldShowExitIntent = !location.pathname.includes('/contact') && !location.pathname.includes('/thank-you');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'SEO Optimization', href: '/services/seo' },
        { name: 'Social Media Marketing', href: '/services/social-media' },
        { name: 'Paid Advertising', href: '/services/paid-ads' },
        { name: 'Web Development', href: '/services/web-development' },
        { name: 'Influencer Marketing', href: '/services/influencer-marketing' },
        { name: 'Content Marketing', href: '/services/content-marketing' },
        { name: 'Data Analytics', href: '/services/data-analytics' },
        { name: 'Conversion Optimization', href: '/services/conversion-optimization' },
        { name: 'Email Marketing', href: '/services/email-marketing' },
        { name: 'YouTube Growth', href: '/services/youtube-growth' },
        { name: 'Digital Audit', href: '/services/digital-audit' },
        { name: 'Digital Training', href: '/services/digital-training' }
      ]
    },
    { 
      name: 'Free Tools', 
      href: '/tools',
      dropdown: [
        { name: 'SEO Keyword Research', href: '/tools/seo-keyword-research' },
        { name: 'Email Subject Line Tester', href: '/tools/email-subject-tester' },
        { name: 'PPC Ad Copy Generator', href: '/tools/ppc-ad-generator' },
        { name: 'Keyword Grouping Tool', href: '/tools/keyword-grouping' },
        { name: 'Keyword Match Types', href: '/tools/keyword-match-types' },
        { name: 'Meta Title & Description Generator', href: '/tools/meta-title-description-generator' },
        { name: 'SERP Snippet Preview', href: '/tools/serp-snippet-preview' },
        { name: 'Backlink Checker', href: '/tools/backlink-checker' },
        { name: 'UTM Link Builder', href: '/tools/utm-link-builder' },
        { name: 'Website Speed Test', href: '/tools/website-speed-test' },
        { name: 'Social Media Post Ideas', href: '/tools/social-media-post-generator' },
        { name: 'Image Alt Text Generator', href: '/tools/image-alt-text-generator' },
        { name: 'Blog Topic Generator', href: '/tools/blog-topic-generator' },
        { name: 'Google Ads Generator', href: '/tools/google-ads-generator' },
        { name: 'Content Readability Checker', href: '/tools/content-readability-checker' },
        { name: 'Hashtag Generator', href: '/tools/hashtag-generator' },
        { name: 'Robots.txt Generator', href: '/tools/robots-txt-generator' },
        { name: 'XML Sitemap Generator', href: '/tools/xml-sitemap-generator' },
        { name: 'Favicon Generator', href: '/tools/favicon-generator' },
        { name: 'Open Graph Tag Generator', href: '/tools/open-graph-generator' }
      ]
    },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter current page
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Contact Bar */}
      <div className="bg-dark-gray text-background py-2">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="flex items-center">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <a href="tel:+919731588244" className="hover:text-primary transition-colors truncate">
                  <span className="hidden sm:inline">+91-9731588244</span>
                  <span className="sm:hidden">Call Us</span>
                </a>
              </div>
              <div className="hidden sm:flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@lookalikesolutions.com" className="hover:text-primary transition-colors">
                  info@lookalikesolutions.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a href="https://facebook.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="https://instagram.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="https://youtube.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-background border-b border-light-gray sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            {/* Logo with Icon */}
            <Link to="/" className="flex items-center text-lg sm:text-xl lg:text-2xl font-heading">
              <Image 
                src="https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
                alt="Look A Like Solutions Logo"
                width={32}
                className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 mr-2 lg:mr-3"
              />
              <span className="hidden sm:inline text-primary">Look A Like Solutions</span>
              <span className="sm:hidden text-primary">LAS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="flex items-center font-paragraph transition-colors text-secondary hover:text-dark-gray">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to={item.href} className="w-full">
                          All Services
                        </Link>
                      </DropdownMenuItem>
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link to={subItem.href} className="w-full">
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-paragraph transition-colors ${
                      isActive(item.href)
                        ? 'text-primary font-medium'
                        : 'text-secondary hover:text-dark-gray'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 border-light-gray focus:border-primary"
                />
              </form>
              
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm">
                  Get Quote
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-dark-gray" />
              ) : (
                <Menu className="h-6 w-6 text-dark-gray" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-light-gray">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-light-gray focus:border-primary text-base"
                />
              </form>
              
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  item.dropdown ? (
                    <div key={item.name} className="space-y-2">
                      <Link
                        to={item.href}
                        className={`font-paragraph transition-colors py-2 block ${
                          isActive(item.href)
                            ? 'text-primary font-medium'
                            : 'text-secondary hover:text-dark-gray'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="ml-4 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block font-paragraph text-secondary hover:text-dark-gray text-sm py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-paragraph transition-colors py-2 block ${
                        isActive(item.href)
                          ? 'text-primary font-medium'
                          : 'text-secondary hover:text-dark-gray'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-2">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full py-3 text-base">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-gray text-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white text-foreground">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4 lg:mb-6">
                <Image 
                  src="https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
                  alt="Look A Like Solutions Logo"
                  width={32}
                  className="h-6 w-6 lg:h-8 lg:w-8 mr-2 lg:mr-3"
                />
                <h3 className="text-lg lg:text-xl font-heading text-primary">Look A Like Solutions</h3>
              </div>
              <p className="font-paragraph text-light-gray mb-4 lg:mb-6 text-sm lg:text-base">
                Your trusted digital marketing partner in Bengaluru. We help businesses grow their online presence with data-driven strategies.
              </p>
              <div className="flex space-x-3 lg:space-x-4">
                <a href="https://facebook.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="h-4 w-4 lg:h-5 lg:w-5" />
                </a>
                <a href="https://instagram.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="h-4 w-4 lg:h-5 lg:w-5" />
                </a>
                <a href="https://youtube.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Youtube className="h-4 w-4 lg:h-5 lg:w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base lg:text-lg font-heading mb-4 lg:mb-6">Quick Links</h4>
              <ul className="space-y-2 lg:space-y-3">
                {navigation.slice(0, 6).map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="font-paragraph text-light-gray hover:text-primary transition-colors text-sm lg:text-base">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base lg:text-lg font-heading mb-4 lg:mb-6">Our Services</h4>
              <ul className="space-y-2 lg:space-y-3">
                {navigation.find(item => item.dropdown)?.dropdown?.slice(0, 6).map((service) => (
                  <li key={service.name}>
                    <Link to={service.href} className="font-paragraph text-light-gray hover:text-primary transition-colors text-sm lg:text-base">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base lg:text-lg font-heading mb-4 lg:mb-6">Contact Us</h4>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 lg:mr-3 mt-1 flex-shrink-0" />
                  <span className="font-paragraph text-light-gray text-sm lg:text-base">
                    Bengaluru, Karnataka, India
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 lg:mr-3 flex-shrink-0" />
                  <a href="tel:+919731588244" className="font-paragraph text-light-gray hover:text-primary transition-colors text-sm lg:text-base">
                    +91-9731588244
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 lg:mr-3 flex-shrink-0" />
                  <a href="mailto:info@lookalikesolutions.com" className="font-paragraph text-light-gray hover:text-primary transition-colors text-sm lg:text-base break-all">
                    info@lookalikesolutions.com
                  </a>
                </div>
                <div className="mt-4">
                  <WhatsAppButton 
                    variant="inline" 
                    phoneNumber="+919731588244"
                    message="Hi! I'm interested in your digital marketing services. Can we discuss my requirements?"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary/20 mt-8 lg:mt-12 pt-6 lg:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="font-paragraph text-light-gray text-xs lg:text-sm text-center md:text-left">
                © 2024 Look A Like Solutions. All rights reserved.
              </p>
              <div className="flex space-x-4 lg:space-x-6">
                <Link to="/privacy" className="font-paragraph text-light-gray hover:text-primary transition-colors text-xs lg:text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="font-paragraph text-light-gray hover:text-primary transition-colors text-xs lg:text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton 
        phoneNumber="+919731588244"
        message="Hi! I'm interested in your digital marketing services. Can we discuss my requirements?"
      />

      {/* Exit Intent Popup */}
      {shouldShowExitIntent && <ExitIntentPopup />}
    </div>
  );
}