import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Menu, X, Phone, Mail, MapPin, Search, ChevronDown, Zap, Facebook, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

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
        { name: 'Influencer Marketing', href: '/services/influencer' },
        { name: 'Content Marketing', href: '/services/content' },
        { name: 'Data Analytics', href: '/services/analytics' },
        { name: 'Conversion Optimization', href: '/services/conversion' }
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
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex justify-between items-center text-sm">
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
            <div className="hidden md:flex items-center space-x-4">
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

      {/* Header */}
      <header className="bg-background border-b border-light-gray sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo with Icon */}
            <Link to="/" className="flex items-center text-2xl font-heading text-dark-gray">
              <Zap className="h-8 w-8 text-primary mr-3" />
              Look A Like Solutions
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
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
              <form onSubmit={handleSearch} className="relative">
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
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
            <div className="lg:hidden py-6 border-t border-light-gray">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-light-gray focus:border-primary"
                />
              </form>
              
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  item.dropdown ? (
                    <div key={item.name} className="space-y-2">
                      <Link
                        to={item.href}
                        className={`font-paragraph transition-colors ${
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
                            className="block font-paragraph text-secondary hover:text-dark-gray text-sm"
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
                      className={`font-paragraph transition-colors ${
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
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                    Get Quote
                  </Button>
                </Link>
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
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-heading">Look A Like Solutions</h3>
              </div>
              <p className="font-paragraph text-light-gray mb-6">
                Your trusted digital marketing partner in Bengaluru. We help businesses grow their online presence with data-driven strategies.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://youtube.com/lookalikesolutions" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navigation.slice(0, 6).map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="font-paragraph text-light-gray hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-heading mb-6">Our Services</h4>
              <ul className="space-y-3">
                {navigation.find(item => item.dropdown)?.dropdown?.slice(0, 6).map((service) => (
                  <li key={service.name}>
                    <Link to={service.href} className="font-paragraph text-light-gray hover:text-primary transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-heading mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="font-paragraph text-light-gray">
                    Bengaluru, Karnataka, India
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="tel:+919731588244" className="font-paragraph text-light-gray hover:text-primary transition-colors">
                    +91-9731588244
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <a href="mailto:info@lookalikesolutions.com" className="font-paragraph text-light-gray hover:text-primary transition-colors">
                    info@lookalikesolutions.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-paragraph text-light-gray text-sm">
                © 2024 Look A Like Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="font-paragraph text-light-gray hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="font-paragraph text-light-gray hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}