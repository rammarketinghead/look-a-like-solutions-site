import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-light-gray sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <Link to="/" className="text-2xl font-heading text-dark-gray">
              Look A Like Solutions
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
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
              ))}
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
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
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
              <h3 className="text-xl font-heading mb-6">Look A Like Solutions</h3>
              <p className="font-paragraph text-light-gray mb-6">
                Your trusted digital marketing partner in Bengaluru, helping businesses grow through innovative strategies and proven results.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-light-gray">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span className="font-paragraph text-sm">Bengaluru, India</span>
                </div>
                <div className="flex items-center text-light-gray">
                  <Phone className="h-4 w-4 mr-3" />
                  <span className="font-paragraph text-sm">+91 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center text-light-gray">
                  <Mail className="h-4 w-4 mr-3" />
                  <span className="font-paragraph text-sm">hello@lookalikesolutions.com</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-heading mb-6">Services</h4>
              <ul className="space-y-3">
                {[
                  'SEO Optimization',
                  'Social Media Marketing',
                  'Paid Advertising',
                  'Web Development',
                  'Content Marketing',
                  'Data Analytics'
                ].map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="font-paragraph text-light-gray hover:text-background transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-heading mb-6">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Team', href: '/about#team' },
                  { name: 'Careers', href: '/about#careers' },
                  { name: 'Case Studies', href: '/case-studies' },
                  { name: 'Blog', href: '/blog' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="font-paragraph text-light-gray hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-heading mb-6">Stay Updated</h4>
              <p className="font-paragraph text-light-gray mb-6">
                Subscribe to our newsletter for the latest digital marketing insights and tips.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-background text-dark-gray rounded border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-paragraph text-light-gray text-sm">
                © 2024 Look A Like Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  to="/privacy"
                  className="font-paragraph text-light-gray hover:text-background text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="font-paragraph text-light-gray hover:text-background text-sm transition-colors"
                >
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