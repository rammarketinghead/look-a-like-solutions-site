import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ChatWidget from '@/components/ui/chat-widget';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { SEOHead } from '@/components/ui/seo-head';
import { useSitemapUpdater } from '@/hooks/useSitemapUpdater';
import { Menu, X, Phone, Mail, MapPin, Search, ChevronDown, ChevronRight, Facebook, Instagram, Youtube, Linkedin, Heart, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const location = useLocation();

  // Initialize sitemap auto-updater
  useSitemapUpdater();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedMobileMenu(null);
  }, [location.pathname]);

  // Determine if we should show the exit intent popup
  const shouldShowExitIntent = !location.pathname.includes('/contact') && !location.pathname.includes('/thank-you');

  const navigation = [
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'SEO Optimization', href: '/services/seo', icon: '🔍' },
        { name: 'Social Media Marketing', href: '/services/social-media', icon: '📱' },
        { name: 'Paid Advertising', href: '/services/paid-ads', icon: '🎯' },
        { name: 'Web Development', href: '/services/web-development', icon: '💻' },
        { name: 'Influencer Marketing', href: '/services/influencer-marketing', icon: '👥' },
        { name: 'Content Marketing', href: '/services/content-marketing', icon: '✍️' },
        { name: 'Data Analytics', href: '/services/data-analytics', icon: '📊' },
        { name: 'Conversion Optimization', href: '/services/conversion-optimization', icon: '⚡' },
        { name: 'Email Marketing', href: '/services/email-marketing', icon: '📧' },
        { name: 'YouTube Growth', href: '/services/youtube-growth', icon: '📹' },
        { name: 'Digital Audit', href: '/services/digital-audit', icon: '🔎' },
        { name: 'Digital Training', href: '/services/digital-training', icon: '🎓' }
      ]
    },
    { 
      name: 'Tools', 
      href: '/tools',
      dropdown: [
        { name: 'SEO Keyword Research', href: '/tools/seo-keyword-research', icon: '🔍' },
        { name: 'Email Subject Tester', href: '/tools/email-subject-tester', icon: '📧' },
        { name: 'PPC Ad Generator', href: '/tools/ppc-ad-generator', icon: '🎯' },
        { name: 'Keyword Grouping', href: '/tools/keyword-grouping', icon: '📊' },
        { name: 'Meta Title Generator', href: '/tools/meta-title-description-generator', icon: '📝' },
        { name: 'SERP Preview', href: '/tools/serp-snippet-preview', icon: '🔍' },
        { name: 'Backlink Checker', href: '/tools/backlink-checker', icon: '🔗' },
        { name: 'UTM Builder', href: '/tools/utm-link-builder', icon: '🏷️' },
        { name: 'Speed Test', href: '/tools/website-speed-test', icon: '⚡' }
      ]
    },
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
      // Implement search functionality here
      // For now, we'll redirect to a search results page or show a message
      alert(`Search functionality coming soon! You searched for: ${searchQuery}`);
    }
  };

  const toggleMobileSubmenu = (itemName: string) => {
    setExpandedMobileMenu(expandedMobileMenu === itemName ? null : itemName);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Default SEO for pages that don't have specific SEO */}
      <SEOHead />
      
      {/* Top Contact Bar - Hidden on mobile for cleaner look */}
      <div className="hidden sm:block bg-dark-gray text-background py-2">
        <div className="mobile-container">
          <div className="flex justify-between items-center mobile-caption">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+919731588244" className="hover:text-primary transition-colors">
                  +91-9731588244
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@lookalikesolutions.com" className="hover:text-primary transition-colors">
                  info@lookalikesolutions.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-First Header */}
      <header className={`mobile-sticky-header transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="mobile-container">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-50">
              <Image 
                src="https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
                alt="Look A Like Solutions Logo"
                width={32}
                className="h-8 w-8"
              />
              <span className="mobile-h4 text-primary font-bold">
                <span className="hidden sm:inline">Look A Like Solutions</span>
                <span className="sm:hidden">LAS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                item.dropdown ? (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className={`mobile-nav-link ${isActive(item.href) ? 'mobile-nav-link-active' : ''} flex items-center`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute top-full left-0 w-64 bg-background border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        <Link
                          to={item.href}
                          className="flex items-center px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          All {item.name}
                          <ArrowRight className="ml-auto h-4 w-4" />
                        </Link>
                        <div className="border-t border-gray-100 my-2"></div>
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center px-3 py-2 text-sm text-secondary hover:text-dark-gray hover:bg-light-gray rounded-lg transition-colors"
                          >
                            <span className="mr-3 text-base">{subItem.icon}</span>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`mobile-nav-link ${isActive(item.href) ? 'mobile-nav-link-active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Desktop Search & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-48 mobile-input"
                />
              </form>
              <Link to="/contact">
                <Button className="mobile-btn-primary">
                  Get Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Image 
                        src="https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
                        alt="Look A Like Solutions Logo"
                        width={24}
                        className="h-6 w-6"
                      />
                      <span className="mobile-h4 text-primary font-bold">LAS</span>
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-4 border-b border-gray-200">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 w-full mobile-input"
                      />
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                      {navigation.map((item) => (
                        <div key={item.name}>
                          {item.dropdown ? (
                            <div>
                              <button
                                onClick={() => toggleMobileSubmenu(item.name)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                                  isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-secondary hover:text-dark-gray hover:bg-light-gray'
                                }`}
                              >
                                <span className="mobile-body font-medium">{item.name}</span>
                                <ChevronRight className={`h-4 w-4 transition-transform ${
                                  expandedMobileMenu === item.name ? 'rotate-90' : ''
                                }`} />
                              </button>
                              {expandedMobileMenu === item.name && (
                                <div className="mt-2 ml-4 space-y-1">
                                  <Link
                                    to={item.href}
                                    className="flex items-center p-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    All {item.name}
                                    <ArrowRight className="ml-auto h-4 w-4" />
                                  </Link>
                                  {item.dropdown.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.href}
                                      className="flex items-center p-2 text-sm text-secondary hover:text-dark-gray hover:bg-light-gray rounded-lg transition-colors"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      <span className="mr-3">{subItem.icon}</span>
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              to={item.href}
                              className={`block p-3 rounded-lg transition-colors mobile-body font-medium ${
                                isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-secondary hover:text-dark-gray hover:bg-light-gray'
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="p-4 border-t border-gray-200">
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Button className="mobile-btn-primary w-full">
                        Get Free Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    {/* Mobile Contact Info */}
                    <div className="mt-4 space-y-2">
                      <a href="tel:+919731588244" className="flex items-center mobile-body-sm text-secondary">
                        <Phone className="h-4 w-4 mr-2" />
                        +91-9731588244
                      </a>
                      <a href="mailto:info@lookalikesolutions.com" className="flex items-center mobile-body-sm text-secondary">
                        <Mail className="h-4 w-4 mr-2" />
                        info@lookalikesolutions.com
                      </a>
                    </div>

                    {/* Mobile Social Links */}
                    <div className="flex items-center space-x-4 mt-4">
                      <a href="https://facebook.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="https://instagram.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="https://youtube.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a href="https://linkedin.com/company/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Mobile-First Footer */}
      <footer className="bg-gradient-to-br from-dark-gray to-foreground text-white" role="contentinfo" aria-label="Site footer">
        <div className="mobile-container">
          {/* Newsletter Section */}
          <div className="border-t border-white/10 py-8 sm:py-12">
            <div className="text-center">
              <h3 className="mobile-h3 text-white mb-4">Stay Updated</h3>
              <p className="mobile-body text-gray-300 mb-6 max-w-md mx-auto">
                Get the latest digital marketing insights and tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 mobile-input bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-primary focus:border-primary"
                  aria-label="Email address for newsletter"
                />
                <button className="mobile-btn-primary bg-primary hover:bg-primary/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="mobile-section-compact">
            <div className="mobile-grid-4 lg:grid-cols-12 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-4">
                <div className="flex items-center mb-6">
                  <Image 
                    src="https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
                    alt="Look A Like Solutions Logo"
                    width={40}
                    className="h-8 w-8 lg:h-10 lg:w-10 mr-3"
                  />
                  <h2 className="mobile-h3 text-white">Look A Like Solutions</h2>
                </div>
                <p className="mobile-body text-gray-300 mb-6 leading-relaxed">
                  Your trusted digital marketing partner in Bengaluru. We help businesses grow their online presence with data-driven strategies and innovative solutions.
                </p>
                
                {/* Social Media Links */}
                <div className="mb-6">
                  <h3 className="mobile-body-sm font-heading text-white mb-3 uppercase tracking-wide">Follow Us</h3>
                  <div className="flex space-x-3">
                    {[
                      { icon: Facebook, href: "https://facebook.com/lookalikesolutions", label: "Facebook" },
                      { icon: Instagram, href: "https://instagram.com/lookalikesolutions", label: "Instagram" },
                      { icon: Youtube, href: "https://youtube.com/lookalikesolutions", label: "YouTube" },
                      { icon: Linkedin, href: "https://linkedin.com/company/lookalikesolutions", label: "LinkedIn" }
                    ].map((social) => (
                      <a 
                        key={social.label}
                        href={social.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-gray"
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <social.icon className="h-5 w-5 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="lg:col-span-2">
                <h3 className="mobile-h4 text-white mb-6">Quick Links</h3>
                <nav aria-label="Footer navigation">
                  <ul className="mobile-space-y-sm">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link 
                          to={item.href} 
                          className="mobile-body text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link 
                        to="/case-studies" 
                        className="mobile-body text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        Case Studies
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/blog" 
                        className="mobile-body text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Services */}
              <div className="lg:col-span-3">
                <h3 className="mobile-h4 text-white mb-6">Our Services</h3>
                <nav aria-label="Services navigation">
                  <ul className="mobile-space-y-sm">
                    {navigation.find(item => item.dropdown)?.dropdown?.slice(0, 6).map((service) => (
                      <li key={service.name}>
                        <Link 
                          to={service.href} 
                          className="mobile-body text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-3">
                <h3 className="mobile-h4 text-white mb-6">Get In Touch</h3>
                <div className="mobile-space-y">
                  <div className="flex items-start group">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="mobile-body text-gray-300 leading-relaxed">
                        Bengaluru, Karnataka<br />India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <a 
                      href="tel:+919731588244" 
                      className="mobile-body text-gray-300 hover:text-white transition-colors focus:outline-none focus:text-white"
                      aria-label="Call us at +91-9731588244"
                    >
                      +91-9731588244
                    </a>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <a 
                      href="mailto:info@lookalikesolutions.com" 
                      className="mobile-body text-gray-300 hover:text-white transition-colors break-all focus:outline-none focus:text-white"
                      aria-label="Email us at info@lookalikesolutions.com"
                    >
                      info@lookalikesolutions.com
                    </a>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <WhatsAppButton 
                      variant="inline" 
                      phoneNumber="+919731588244"
                      message="Hi! I'm interested in your digital marketing services. Can we discuss my requirements?"
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-0 rounded-lg py-3 px-4 font-medium transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className="mobile-body-sm text-gray-400 text-center sm:text-left">
                  © 2024 Look A Like Solutions. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-gray-400 mobile-body-sm">
                  <span>Made with</span>
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                  <span>in Bengaluru</span>
                </div>
              </div>
              
              <nav aria-label="Legal links">
                <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
                  {[
                    { name: 'Privacy Policy', href: '/privacy' },
                    { name: 'Terms of Service', href: '/terms' },
                    { name: 'Sitemap', href: '/sitemap.xml' }
                  ].map((link) => (
                    <Link 
                      key={link.name}
                      to={link.href} 
                      className="mobile-body-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:text-white"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
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