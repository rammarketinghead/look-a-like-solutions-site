import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FAQSection } from '@/components/ui/faq-section';
import { Image } from '@/components/ui/image';
import { NewsletterSection } from '@/components/ui/newsletter-section';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Code, Laptop, Settings, Smartphone, Target, TrendingUp, Zap, Lock, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const scrollToContact = () => {
  const contactSection = document.getElementById('contact-form');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function WebDevelopmentPage() {
  const webDevFAQs = [
    {
      question: "How long does it take to develop a website?",
      answer: "Development timelines vary based on complexity. A basic website takes 2-4 weeks, professional websites take 4-8 weeks, and e-commerce solutions take 8-12 weeks. We provide detailed timelines during project planning and keep you updated throughout the process."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes! We offer comprehensive maintenance packages including security updates, content updates, performance optimization, backup management, and technical support. Our maintenance plans ensure your website stays secure, fast, and up-to-date."
    },
    {
      question: "Will my website be mobile-friendly and responsive?",
      answer: "Absolutely! All our websites are built with mobile-first design principles and are fully responsive across all devices. We test on various screen sizes and ensure optimal user experience on smartphones, tablets, and desktops."
    },
    {
      question: "Can you help with website hosting and domain setup?",
      answer: "Yes, we can handle all technical aspects including domain registration, hosting setup, SSL certificates, and email configuration. We work with reliable hosting providers and can recommend the best solution for your needs and budget."
    },
    {
      question: "Do you develop mobile apps for both iOS and Android?",
      answer: "Yes, we develop native apps for both iOS and Android platforms, as well as cross-platform solutions using React Native and Flutter. We'll recommend the best approach based on your target audience, budget, and feature requirements."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We use modern technologies including React, Next.js, TypeScript, Node.js, and various CMS platforms like WordPress and Shopify. We choose the best technology stack based on your project requirements, scalability needs, and long-term goals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Web Development Services Bengaluru - Custom Websites & Apps"
        description="Professional web development in Bengaluru. Custom websites, e-commerce, mobile apps. React, Next.js, responsive design. 200+ websites built. Free consultation available."
        keywords="web development Bengaluru, website design, custom web development, e-commerce development, mobile app development, React developer, web developer Bengaluru, website development company"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Web Development Services",
            description: "Custom website development, e-commerce solutions, mobile apps, and web applications using modern technologies. We build fast, secure, and scalable digital solutions for Bengaluru businesses.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={webDevFAQs}
        localBusiness={{
          name: "Look A Like Solutions",
          telephone: "+91-9731588244",
          streetAddress: "Bengaluru",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560001",
          latitude: 12.9716,
          longitude: 77.5946
        }}
        reviews={[
          {
            author: "Vikram Singh",
            rating: 5,
            reviewBody: "They built an amazing e-commerce website for our business. The site is fast, user-friendly, and has increased our online sales by 200%. Highly recommended!",
            datePublished: "2024-09-15"
          },
          {
            author: "Neha Patel",
            rating: 5,
            reviewBody: "Excellent web development team. They understood our requirements perfectly and delivered a professional website that exceeded expectations. Great communication throughout the project.",
            datePublished: "2024-10-10"
          }
        ]}
      />

      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-primary/5 via-background to-light-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50\"></div>
        <div className="max-w-[100rem] mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-paragraph mb-6">
                <Code className="h-4 w-4 mr-2" />
                Web & App Development Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Web Development in Bengaluru -
                <span className="text-primary block">Custom Solutions for Growth</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Create stunning, high-performance websites and mobile applications that drive results. From responsive design to e-commerce solutions, we build digital experiences that convert visitors into customers and scale with your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free Project Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Our Portfolio
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '200+', label: 'Websites Built' },
                  { number: '99.9%', label: 'Uptime Guarantee' },
                  { number: '50+', label: 'Apps Developed' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-heading text-primary mb-2">{stat.number}</div>
                    <div className="text-sm font-paragraph text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-light-gray">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <Image
                  src="https://static.wixstatic.com/media/f650f9_18935d79ba7148298654db9344b301d3~mv2.png?originWidth=576&originHeight=448"
                  alt="Web Development Process and Technology Stack"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-green-600 mb-1">↗ 95%</div>
                    <div className="text-sm font-paragraph text-green-700">Page Speed Score</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-blue-600 mb-1">100%</div>
                    <div className="text-sm font-paragraph text-blue-700">Mobile Responsive</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">
                What is Web Development and Why It Matters
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
                Web development is the process of building and maintaining websites and web applications. In today's digital-first world, your website is often the first impression customers have of your business. A well-designed, fast-loading, and user-friendly website is essential for success.
              </p>
              <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
                For Bengaluru businesses, having a professional web presence is critical. With over 750 million internet users in India and Bengaluru being a tech hub, businesses without a strong online presence are losing customers to competitors. Your website needs to not only look great but also perform exceptionally well and convert visitors into customers.
              </p>
              <p className="text-lg font-paragraph text-secondary mb-8 leading-relaxed">
                Our web development services combine modern design, cutting-edge technology, and conversion optimization to create digital solutions that drive real business results. We build websites that are beautiful, fast, secure, and profitable.
              </p>
              <Button
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base"
              >
                Start Your Web Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_271b9ff6f3c04d06959b752f63082c17~mv2.png?originWidth=576&originHeight=448"
                alt="Development process and methodology"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Common Web Development Challenges Bengaluru Businesses Face
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Many businesses struggle with outdated websites, poor performance, and lack of conversion optimization. Here are the most common challenges we solve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Slow, Outdated Websites",
                description: "Many businesses are stuck with old websites built on outdated technology. These sites are slow, difficult to maintain, and don't provide good user experience on mobile devices."
              },
              {
                title: "Poor Mobile Experience",
                description: "Over 70% of web traffic comes from mobile devices, but many websites aren't optimized for mobile. This leads to high bounce rates and lost customers."
              },
              {
                title: "Low Conversion Rates",
                description: "A beautiful website that doesn't convert visitors into customers is just an expensive brochure. Most businesses lack conversion optimization expertise."
              },
              {
                title: "Security Vulnerabilities",
                description: "Outdated websites are vulnerable to hacking and data breaches. Many businesses don't have proper security measures in place, putting customer data at risk."
              },
              {
                title: "Lack of SEO Optimization",
                description: "Websites built without SEO in mind won't rank in search engines. Many businesses invest in websites that nobody can find online."
              },
              {
                title: "Expensive Maintenance & Hosting",
                description: "Poorly built websites are expensive to maintain and require constant fixes. Businesses end up paying more for hosting and support than necessary."
              }
            ].map((problem, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{problem.title}</h3>
                  <p className="font-paragraph text-secondary">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              How We Solve Your Web Development Challenges
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our comprehensive approach ensures your website is fast, secure, beautiful, and profitable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Gauge,
                title: "Performance Optimization",
                description: "We build websites that load in under 2 seconds. Fast websites rank better in search engines and convert more visitors into customers."
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Every website we build is optimized for mobile devices first. We ensure perfect user experience across all screen sizes and devices."
              },
              {
                icon: Target,
                title: "Conversion Optimization",
                description: "We don't just build websites; we build conversion machines. Every element is designed to guide visitors toward taking action."
              },
              {
                icon: Lock,
                title: "Security & Compliance",
                description: "We implement enterprise-grade security measures, SSL certificates, and compliance standards to protect your business and customer data."
              },
              {
                icon: Code,
                title: "Modern Technology Stack",
                description: "We use the latest technologies like React, Next.js, and Node.js to build scalable, maintainable websites that grow with your business."
              },
              {
                icon: BarChart3,
                title: "SEO-Friendly Architecture",
                description: "Every website we build is optimized for search engines from the ground up. We implement proper schema markup, structured data, and SEO best practices."
              }
            ].map((solution, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{solution.title}</h3>
                  <p className="font-paragraph text-secondary">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Our Step-by-Step Web Development Process
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and long-term success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery & Planning",
                description: "We understand your business goals, target audience, and requirements. We create a detailed project plan and timeline."
              },
              {
                step: "2",
                title: "Design & Prototyping",
                description: "Our designers create beautiful, user-friendly designs. We get your feedback and refine until it's perfect."
              },
              {
                step: "3",
                title: "Development & Testing",
                description: "Our developers build your website using modern technologies. We test thoroughly across all devices and browsers."
              },
              {
                step: "4",
                title: "Launch & Support",
                description: "We deploy your website, set up hosting, and provide ongoing support and maintenance to ensure continued success."
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-heading">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                  <p className="font-paragraph text-secondary">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We have expertise across diverse industries and understand the unique web development needs of each sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "E-commerce & Retail",
              "Real Estate & Property",
              "Healthcare & Wellness",
              "Hospitality & Restaurants",
              "Education & Training",
              "Technology & SaaS",
              "Finance & Banking",
              "Fashion & Beauty",
              "Manufacturing & B2B",
              "Professional Services",
              "Travel & Tourism",
              "Media & Publishing"
            ].map((industry, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-4 flex-shrink-0" />
                  <span className="font-paragraph text-secondary">{industry}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              What You'll Receive
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our comprehensive web development packages include everything you need for a successful online presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                category: "Design & Development",
                items: ["Custom website design", "Responsive development", "Mobile optimization", "Cross-browser testing"]
              },
              {
                category: "Functionality & Features",
                items: ["Contact forms & CMS", "E-commerce integration", "Payment gateway setup", "Analytics integration"]
              },
              {
                category: "Performance & Security",
                items: ["Performance optimization", "SSL certificate", "Security hardening", "Backup systems"]
              },
              {
                category: "Support & Maintenance",
                items: ["3-12 months free support", "Content updates", "Security updates", "Performance monitoring"]
              }
            ].map((deliverable, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-6">{deliverable.category}</h3>
                  <ul className="space-y-3">
                    {deliverable.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="font-paragraph text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Development Pricing Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Transparent pricing for professional web and mobile development services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic Website',
                price: '₹75,000',
                period: 'one-time',
                description: 'Perfect for small businesses and startups',
                features: [
                  'Up to 5 pages',
                  'Responsive design',
                  'Contact form integration',
                  'Basic SEO optimization',
                  'Social media integration',
                  '3 months free support',
                  'Mobile-friendly design'
                ],
                popular: false
              },
              {
                name: 'Professional Website',
                price: '₹1,50,000',
                period: 'one-time',
                description: 'Ideal for growing businesses with advanced needs',
                features: [
                  'Up to 15 pages',
                  'Custom design & development',
                  'CMS integration',
                  'Advanced SEO optimization',
                  'Blog functionality',
                  'Analytics integration',
                  '6 months free support',
                  'Performance optimization'
                ],
                popular: true
              },
              {
                name: 'E-commerce Solution',
                price: '₹3,00,000',
                period: 'one-time',
                description: 'Complete online store with advanced features',
                features: [
                  'Unlimited products',
                  'Payment gateway integration',
                  'Inventory management',
                  'Order management system',
                  'Customer accounts',
                  'Advanced analytics',
                  '12 months free support',
                  'Mobile app (optional)',
                  'Multi-vendor support'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-heading">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-heading text-dark-gray mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl font-heading text-primary">{plan.price}</span>
                      <span className="text-secondary font-paragraph ml-1">/{plan.period}</span>
                    </div>
                    <p className="font-paragraph text-secondary">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="font-paragraph text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={scrollToContact}
                    className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background text-primary border border-primary hover:bg-primary hover:text-primary-foreground'}`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="font-paragraph text-secondary mb-4">
              Need a custom solution? We create tailored development packages for unique business requirements.
            </p>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Development ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our web development services. Input your business metrics to estimate your growth potential.
            </p>
          </div>
          <ROICalculator serviceName="Web Development" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Why Choose Look A Like Solutions for Web Development
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We're not just another web development agency. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Proven Track Record",
                description: "We've built 200+ websites, developed 50+ mobile apps, and maintained 99.9% uptime. Our portfolio speaks for itself."
              },
              {
                title: "Modern Technology Stack",
                description: "We use cutting-edge technologies like React, Next.js, and Node.js. Your website will be fast, scalable, and future-proof."
              },
              {
                title: "Conversion-Focused Design",
                description: "We don't just build beautiful websites; we build websites that convert. Every element is designed to drive business results."
              },
              {
                title: "SEO Optimization",
                description: "Every website we build is optimized for search engines from day one. We implement proper schema markup and SEO best practices."
              },
              {
                title: "Comprehensive Support",
                description: "We provide ongoing maintenance, support, and optimization. Your website will stay secure, fast, and up-to-date."
              },
              {
                title: "Bengaluru Expertise",
                description: "We understand the Bengaluru market and the unique needs of businesses in this tech-savvy city. We're local, responsive, and invested in your success."
              }
            ].map((reason, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{reason.title}</h3>
                  <p className="font-paragraph text-secondary">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={webDevFAQs}
        title="Web Development FAQ"
        description="Get answers to common questions about our web and mobile development services."
      />

      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm
          serviceName="Web & App Development"
          serviceDescription="Let's discuss your project requirements and create a custom development solution that meets your business goals."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Build Your Digital Presence?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free consultation and discover how we can help bring your digital vision to life with professional development services.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
