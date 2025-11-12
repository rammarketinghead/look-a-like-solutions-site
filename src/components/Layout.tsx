import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ChatWidget from '@/components/ui/chat-widget';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Menu, X, Phone, Mail, MapPin, Search, ChevronDown, Facebook, Instagram, Youtube, Linkedin, Heart } from 'lucide-react';
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
      <div className="bg-dark-gray text-background py-1.5 sm:py-2">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
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
        <div className="max-w-[100rem] mx-auto mobile-container-spacing">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-6">
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
            <div className="lg:hidden py-3 sm:py-4 border-t border-light-gray">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-3 sm:mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 sm:py-3 w-full border-light-gray focus:border-primary text-sm sm:text-base"
                />
              </form>
              
              <nav className="flex flex-col space-y-2 sm:space-y-3">
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
                <div className="pt-3 sm:pt-4">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full py-2.5 sm:py-3 text-sm sm:text-base">
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
      <footer className="bg-gradient-to-br from-dark-gray to-foreground text-white" role="contentinfo" aria-label="Site footer">
        <div className="max-w-[100rem] mx-auto mobile-container-spacing bg-primary-foreground">
          {/* Main Footer Content */}
          <div className="border-t border-white/10 py-6 sm:py-8">
            <div className="text-center">
              <h3 className="mobile-heading-tertiary text-white mb-3">Stay Updated</h3>
              <p className="mobile-text-body text-gray-300 mb-4 sm:mb-6 max-w-md mx-auto">
                Get the latest digital marketing insights and tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                  aria-label="Email address for newsletter"
                />
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-gray text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
              {/* Company Info - Takes more space on larger screens */}
              <div className="lg:col-span-4">
                <div className="flex items-center mb-4 sm:mb-6">
                  <Image 
                    src="https://static.wixstatic.com/media/f650f9_8f4cac9948dd449e824fcf229233b85e~mv2.png"
                    alt="Look A Like Solutions Logo"
                    width={40}
                    className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 mr-2 sm:mr-3"
                  />
                  <h2 className="mobile-heading-tertiary lg:text-2xl font-heading text-primary">Look A Like Solutions</h2>
                </div>
                <p className="mobile-text-body mb-4 sm:mb-6 lg:text-lg leading-relaxed text-secondary">
                  Your trusted digital marketing partner in Bengaluru. We help businesses grow their online presence with data-driven strategies and innovative solutions.
                </p>
                
                {/* Social Media Links with improved accessibility */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="mobile-text-small font-heading text-white mb-2 sm:mb-3 uppercase tracking-wide">Follow Us</h3>
                  <div className="flex space-x-3 sm:space-x-4">
                    <a 
                      href="https://facebook.com/lookalikesolutions" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-gray bg-secondary"
                      aria-label="Follow us on Facebook"
                    >
                      <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://instagram.com/lookalikesolutions" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-gray bg-secondary"
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://youtube.com/lookalikesolutions" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-gray"
                      aria-label="Follow us on YouTube"
                    >
                      <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://linkedin.com/company/lookalikesolutions" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-gray"
                      aria-label="Connect with us on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="lg:col-span-2">
                <h3 className="mobile-heading-tertiary text-white mb-4 sm:mb-6">Quick Links</h3>
                <nav aria-label="Footer navigation">
                  <ul className="space-y-2 sm:space-y-3">
                    {navigation.slice(0, 6).map((item) => (
                      <li key={item.name}>
                        <Link 
                          to={item.href} 
                          className="mobile-text-body text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Services */}
              <div className="lg:col-span-3">
                <h3 className="mobile-heading-tertiary text-white mb-4 sm:mb-6">Our Services</h3>
                <nav aria-label="Services navigation">
                  <ul className="space-y-2 sm:space-y-3">
                    {navigation.find(item => item.dropdown)?.dropdown?.slice(0, 6).map((service) => (
                      <li key={service.name}>
                        <Link 
                          to={service.href} 
                          className="mobile-text-body text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
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
                <h3 className="mobile-heading-tertiary text-white mb-4 sm:mb-6">Get In Touch</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="mobile-text-body text-gray-300 leading-relaxed">
                        Bengaluru, Karnataka<br />India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <a 
                      href="tel:+919731588244" 
                      className="mobile-text-body text-gray-300 hover:text-white transition-colors focus:outline-none focus:text-white"
                      aria-label="Call us at +91-9731588244"
                    >
                      +91-9731588244
                    </a>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <a 
                      href="mailto:info@lookalikesolutions.com" 
                      className="mobile-text-body text-gray-300 hover:text-white transition-colors break-all focus:outline-none focus:text-white"
                      aria-label="Email us at info@lookalikesolutions.com"
                    >
                      info@lookalikesolutions.com
                    </a>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
                    <WhatsAppButton 
                      variant="inline" 
                      phoneNumber="+919731588244"
                      message="Hi! I'm interested in your digital marketing services. Can we discuss my requirements?"
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-0 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 font-medium transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 sm:space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <p className="mobile-text-small text-gray-400 text-center sm:text-left">
                  © 2024 Look A Like Solutions. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-gray-400 mobile-text-small">
                  <span>Made with</span>
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 fill-current" />
                  <span>in Bengaluru</span>
                </div>
              </div>
              
              <nav aria-label="Legal links">
                <div className="flex flex-wrap justify-center lg:justify-end space-x-4 sm:space-x-6">
                  <Link 
                    to="/privacy" 
                    className="mobile-text-small text-gray-400 hover:text-white transition-colors focus:outline-none focus:text-white"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/terms" 
                    className="mobile-text-small text-gray-400 hover:text-white transition-colors focus:outline-none focus:text-white"
                  >
                    Terms of Service
                  </Link>
                  <Link 
                    to="/sitemap" 
                    className="mobile-text-small text-gray-400 hover:text-white transition-colors focus:outline-none focus:text-white"
                  >
                    Sitemap
                  </Link>
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