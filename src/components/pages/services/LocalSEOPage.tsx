import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ROICalculator } from '@/components/ui/roi-calculator';
import { SEOHead } from '@/components/ui/seo-head';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, MapPin, Target, TrendingUp, Users, AlertCircle, Lightbulb, Zap } from 'lucide-react';
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

export default function LocalSEOPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Local SEO Services Bengaluru - Rank in Google Maps"
        description="Expert Local SEO services in Bengaluru. Dominate Google Maps, local search results, and 'near me' searches. Google My Business optimization, local citations, reviews. Free audit."
        keywords="local SEO Bengaluru, Google My Business optimization, local search, Google Maps ranking, near me search, local business SEO, Bengaluru local SEO, location-based SEO"
        type="service"
        schemaType="Service"
        services={[
          {
            name: "Local SEO Services",
            description: "Comprehensive Local SEO including Google My Business optimization, local citations, review management, local link building, and location-based schema markup.",
            areaServed: "Bengaluru, Karnataka, India",
            priceRange: "$"
          }
        ]}
        faqs={[
          {
            question: "What is Local SEO and why does it matter?",
            answer: "Local SEO helps your business appear in local search results and Google Maps when customers search for your services in Bengaluru. 46% of searches have local intent, making Local SEO critical for foot traffic and local leads."
          },
          {
            question: "How does Google My Business affect rankings?",
            answer: "Google My Business is the foundation of Local SEO. A complete, optimized GMB profile significantly improves your visibility in Google Maps and local search results."
          },
          {
            question: "What are local citations and why do they matter?",
            answer: "Local citations are mentions of your business name, address, and phone number on other websites. Consistent citations across directories like Justdial, Sulekha, and Google Maps boost your local authority."
          },
          {
            question: "How long does Local SEO take to show results?",
            answer: "You can see initial results within 2-4 weeks. Significant improvements typically occur within 2-3 months as your citations and reviews accumulate."
          },
          {
            question: "Do you manage customer reviews?",
            answer: "Yes! We help you generate positive reviews, respond to customer feedback, and manage your online reputation across Google, Facebook, and other platforms."
          },
          {
            question: "Can you help with multiple locations?",
            answer: "Absolutely. We specialize in multi-location Local SEO, creating location-specific pages and optimizing each location's GMB profile and citations."
          }
        ]}
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
            author: "Amit Verma",
            rating: 5,
            reviewBody: "Their Local SEO strategy got us to the top of Google Maps in Bengaluru. We now get 30+ local leads every month. Excellent service!",
            datePublished: "2024-10-05"
          }
        ]}
      />

      {/* Introduction Section */}
      <section className="py-20 bg-background border-b border-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-6">Local SEO: Dominate Your Bengaluru Market</h2>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Local SEO is the practice of optimizing your online presence to rank higher in local search results and Google Maps. For Bengaluru businesses, Local SEO is critical because 46% of all Google searches have local intent. When someone searches "plumber near me" or "best restaurant in Indiranagar," Local SEO determines whether your business appears.
            </p>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              The beauty of Local SEO is that it's highly targeted. You're reaching customers who are actively looking for your services in your area, right now. These are high-intent leads ready to convert. Unlike national SEO, which is highly competitive, Local SEO often has less competition, making it easier to achieve top rankings quickly.
            </p>
            <p className="text-lg font-paragraph text-secondary leading-relaxed">
              At Look A Like Solutions, we've helped 200+ Bengaluru businesses dominate their local markets. Our clients average 40+ local leads per month and see 250% increase in foot traffic within 3 months of implementing our Local SEO strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">Local SEO Challenges for Bengaluru Businesses</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Incomplete or Outdated Google My Business Profile",
                  description: "Your GMB profile is missing photos, has incorrect hours, or hasn't been updated in months. This signals to Google that your business is inactive, hurting your local rankings."
                },
                {
                  title: "Inconsistent Business Information",
                  description: "Your business name, address, and phone number are inconsistent across Google, Facebook, Justdial, and other directories. This confuses Google and hurts your rankings."
                },
                {
                  title: "Few or No Customer Reviews",
                  description: "You have fewer reviews than competitors. Google prioritizes businesses with more positive reviews, so low review counts hurt your visibility."
                },
                {
                  title: "Poor Review Management",
                  description: "You're not responding to customer reviews. Ignoring negative reviews or failing to thank positive reviewers looks unprofessional and hurts your reputation."
                },
                {
                  title: "Missing Local Citations",
                  description: "Your business isn't listed on major directories like Justdial, Sulekha, or Google Maps. Missing citations mean lost visibility and lower local authority."
                },
                {
                  title: "No Location-Specific Content",
                  description: "Your website doesn't have location-specific pages or content. You're not targeting local keywords like 'plumber in Indiranagar' or 'dentist in Whitefield'."
                }
              ].map((problem, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-destructive mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-dark-gray mb-2">{problem.title}</h3>
                    <p className="font-paragraph text-secondary">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Solve Section */}
      <section className="py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-gray mb-12">How We Dominate Your Local Market</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Google My Business Optimization",
                  description: "We optimize every aspect of your GMB profile: business information, photos, videos, posts, and Q&A. A complete, optimized GMB profile is the foundation of Local SEO success."
                },
                {
                  title: "Local Citation Building",
                  description: "We list your business on major directories (Justdial, Sulekha, Google Maps, Facebook, etc.) with consistent information. More citations = higher local authority."
                },
                {
                  title: "Review Generation & Management",
                  description: "We implement systems to generate positive customer reviews. We also respond professionally to all reviews, building trust and improving your reputation."
                },
                {
                  title: "Location-Specific Content",
                  description: "We create location-specific pages targeting local keywords. For example, 'Plumbing Services in Indiranagar' or 'Best Restaurants in Whitefield'."
                },
                {
                  title: "Local Link Building",
                  description: "We build high-quality links from local businesses, community websites, and local news outlets. Local links boost your local authority."
                },
                {
                  title: "Schema Markup Implementation",
                  description: "We implement local business schema markup, helping Google understand your business location, hours, phone number, and services."
                },
                {
                  title: "Multi-Location Management",
                  description: "If you have multiple locations, we optimize each one separately with location-specific GMB profiles, citations, and content."
                }
              ].map((solution, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-primary mt-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-dark-gray mb-2">{solution.title}</h3>
                    <p className="font-paragraph text-secondary">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Local SEO Process</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              A systematic approach to dominate your local market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Local Audit',
                description: 'We analyze your current local presence, GMB profile, citations, reviews, and local rankings.'
              },
              {
                step: '02',
                title: 'Strategy Development',
                description: 'We create a Local SEO strategy targeting your local keywords and competitive landscape.'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'We optimize GMB, build citations, generate reviews, create location content, and implement schema.'
              },
              {
                step: '04',
                title: 'Monitoring & Optimization',
                description: 'We continuously monitor rankings, reviews, and local performance, making ongoing improvements.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-2xl font-heading text-primary">{item.step}</span>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-light-gray transform -translate-y-1/2 ml-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">What You'll Receive</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our Local SEO packages include comprehensive deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'GMB & Profile Optimization',
                items: ['Complete GMB profile optimization', 'Business photos & videos', 'Posts & updates', 'Q&A management', 'Messaging setup']
              },
              {
                title: 'Citations & Directories',
                items: ['Justdial listing optimization', 'Sulekha listing optimization', 'Google Maps optimization', 'Facebook business page', '10+ local directories']
              },
              {
                title: 'Review Management',
                items: ['Review generation system', 'Review response management', 'Reputation monitoring', 'Negative review handling', 'Monthly review reports']
              },
              {
                title: 'Content & Technical',
                items: ['Location-specific pages', 'Local keyword targeting', 'Schema markup implementation', 'Local link building', 'Monthly reporting']
              }
            ].map((section, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
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

      {/* Industries Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Industries We Serve</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Local SEO works for any location-based business in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Restaurants & Cafes',
              'Plumbing & Home Services',
              'Dental Clinics',
              'Real Estate Agencies',
              'Fitness Centers & Gyms',
              'Salons & Spas',
              'Medical Clinics',
              'Automotive Services',
              'Legal Services',
              'Accounting Firms',
              'Educational Institutes',
              'Hotels & Hospitality'
            ].map((industry, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{industry}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Why Choose Look A Like Solutions?</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              What sets us apart in Local SEO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Bengaluru Local Expertise',
                description: 'We know Bengaluru neighborhoods, local competition, and customer behavior. We\'re not a generic agency.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Local Results',
                description: '200+ businesses optimized, 40+ average local leads per month, 250% foot traffic increase.'
              },
              {
                icon: Target,
                title: 'Complete Local Strategy',
                description: 'We handle everything: GMB, citations, reviews, content, links, and schema. One partner for all your local needs.'
              },
              {
                icon: BarChart3,
                title: 'Transparent Reporting',
                description: 'Monthly reports show your local rankings, reviews, and leads generated. You see exactly what we\'ve done.'
              },
              {
                icon: Users,
                title: 'Dedicated Support',
                description: 'You get a dedicated Local SEO specialist who understands your business and local market.'
              },
              {
                icon: CheckCircle,
                title: 'Fast Results',
                description: 'Local SEO shows results quickly. Many clients see improvements within 2-4 weeks.'
              }
            ].map((reason, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <reason.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-3">{reason.title}</h3>
                  <p className="font-paragraph text-secondary">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Local SEO Pricing</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Affordable Local SEO packages for Bengaluru businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '₹10,000',
                period: '/month',
                description: 'Perfect for single-location businesses',
                features: [
                  'GMB profile optimization',
                  'Citation building (5 directories)',
                  'Review generation setup',
                  'Basic local keyword targeting',
                  'Monthly reporting',
                  'Email support'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '₹25,000',
                period: '/month',
                description: 'Ideal for growing local businesses',
                features: [
                  'Complete GMB optimization',
                  'Citation building (15+ directories)',
                  'Review management & response',
                  'Location-specific content creation',
                  'Local link building',
                  'Schema markup implementation',
                  'Bi-weekly check-ins',
                  'Detailed monthly reports'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '₹50,000',
                period: '/month',
                description: 'Multi-location or high-competition markets',
                features: [
                  'Multiple location GMB management',
                  'Comprehensive citation building',
                  'Advanced review management',
                  'Custom local content strategy',
                  'Aggressive local link building',
                  'Reputation monitoring',
                  'Weekly optimization calls',
                  'Dedicated account manager',
                  'Custom reporting dashboard'
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
                      <span className="text-secondary font-paragraph ml-1">{plan.period}</span>
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
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Calculate Your Local SEO ROI</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              See the potential return on investment from our Local SEO services.
            </p>
          </div>
          <ROICalculator serviceName="Local SEO" />
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ServiceContactForm
          serviceName="Local SEO"
          serviceDescription="Let's discuss how our Local SEO expertise can help you dominate your Bengaluru market and attract more local customers."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Dominate Your Local Market?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Get a free Local SEO audit. We'll show you how to rank higher in Google Maps and local search results.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Get Free Local SEO Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
