import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, TrendingUp, Users, Zap, Phone, Mail, MapPin } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

export default function RestaurantHotelLeadGenerationPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    ownerName: '',
    email: '',
    phone: '',
    currentChallenges: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create('formsubmissions', {
        _id: crypto.randomUUID(),
        formType: 'Restaurant/Hotel Lead Generation',
        submitterName: formData.ownerName,
        submitterEmail: formData.email,
        submitterPhone: formData.phone,
        companyName: formData.businessName,
        interestedService: formData.businessType,
        message: formData.currentChallenges,
        submissionPageUrl: window.location.href,
        submissionDate: new Date().toISOString(),
      });

      setSubmitSuccess(true);
      setFormData({
        businessName: '',
        businessType: '',
        ownerName: '',
        email: '',
        phone: '',
        currentChallenges: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Fill Your Tables & Rooms with Quality Guests
            </h1>
            <p className="font-paragraph text-xl text-secondary max-w-3xl mx-auto mb-8">
              A proven lead generation system designed specifically for restaurants and hotels. Get consistent, qualified bookings without the guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-blue-50 px-8 py-6 text-lg rounded-lg"
              >
                Schedule a Call
              </Button>
            </div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <Card className="bg-background p-6 text-center border-0 shadow-lg">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">3-5x ROI</h3>
              <p className="font-paragraph text-secondary">Average return on ad spend within 90 days</p>
            </Card>
            <Card className="bg-background p-6 text-center border-0 shadow-lg">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Qualified Leads</h3>
              <p className="font-paragraph text-secondary">Only people actively looking to book</p>
            </Card>
            <Card className="bg-background p-6 text-center border-0 shadow-lg">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">30-Day Setup</h3>
              <p className="font-paragraph text-secondary">Campaigns live and generating leads</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-8 text-center">
              The Challenge You're Facing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-light-gray p-8 rounded-lg border-l-4 border-primary">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">For Restaurants</h3>
                <ul className="space-y-3 font-paragraph text-secondary">
                  <li>• Empty tables during peak hours</li>
                  <li>• Inconsistent foot traffic</li>
                  <li>• Wasting money on ads that don't convert</li>
                  <li>• No clear way to track which marketing works</li>
                </ul>
              </div>
              <div className="bg-light-gray p-8 rounded-lg border-l-4 border-primary">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">For Hotels</h3>
                <ul className="space-y-3 font-paragraph text-secondary">
                  <li>• Low occupancy rates</li>
                  <li>• Competing with OTAs on price</li>
                  <li>• Difficulty reaching direct bookers</li>
                  <li>• Seasonal revenue fluctuations</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Example Section */}
      <section className="py-20 px-4 bg-light-gray">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
              Real Results: Marco's Italian Kitchen
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-background p-8 rounded-lg shadow-lg">
                  <p className="font-paragraph text-secondary mb-6 leading-relaxed">
                    "We were struggling with inconsistent reservations. Some nights we'd have empty tables, other nights we'd be overbooked. We tried Facebook ads ourselves but couldn't figure out what was working."
                  </p>
                  <p className="font-paragraph text-secondary mb-6 leading-relaxed">
                    "Within 30 days of working with the lead generation system, we went from averaging 45 covers a night to 70+. The leads are qualified—people who actually show up and spend money."
                  </p>
                  <p className="font-paragraph font-bold text-primary text-lg">
                    Marco Rossi, Owner - Marco's Italian Kitchen
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="bg-background p-6 border-0 shadow-lg">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-2">Before</h4>
                      <p className="font-paragraph text-secondary">45 average covers per night, unpredictable bookings</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-background p-6 border-0 shadow-lg">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-2">After (30 Days)</h4>
                      <p className="font-paragraph text-secondary">70+ covers per night, consistent bookings</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-background p-6 border-0 shadow-lg">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-2">ROI</h4>
                      <p className="font-paragraph text-secondary">4.2x return on ad spend in first 90 days</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our System Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
              Our Proven Lead Generation System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-light-gray p-8 border-0 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Google Ads Campaigns</h3>
                    <p className="font-paragraph text-secondary">
                      Capture high-intent searches. People actively looking for restaurants or hotels in your area.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-light-gray p-8 border-0 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Facebook & Instagram Ads</h3>
                    <p className="font-paragraph text-secondary">
                      Build awareness and reach people in your target demographic with compelling visuals.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-light-gray p-8 border-0 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">SEO (Optional)</h3>
                    <p className="font-paragraph text-secondary">
                      Long-term organic visibility. Show up when people search for dining or lodging options.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-light-gray p-8 border-0 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Transparent Reporting</h3>
                    <p className="font-paragraph text-secondary">
                      See exactly where each lead comes from and what it costs. No hidden fees or surprises.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-light-gray">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-12 text-center">
              Why Restaurants & Hotels Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Industry Expertise',
                  description: 'We specialize in hospitality. We understand your margins, your seasonality, and your customer journey.'
                },
                {
                  title: 'Transparent Billing',
                  description: 'No surprises. You pay for results, not promises. Clear breakdown of costs per lead.'
                },
                {
                  title: 'Dedicated Support',
                  description: 'Your own account manager who understands your business and is available when you need them.'
                },
                {
                  title: 'Proven Track Record',
                  description: 'Hundreds of restaurants and hotels have increased bookings by 40-80% in their first year.'
                },
                {
                  title: 'Quick Implementation',
                  description: 'Campaigns live within 30 days. Start seeing results before the end of your first month.'
                },
                {
                  title: 'Continuous Optimization',
                  description: 'We constantly test and refine. Your campaigns get better every month, not worse.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-background p-6 border-0 shadow-lg h-full">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="font-paragraph text-secondary">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-4 text-center">
              Ready to Fill Your Tables & Rooms?
            </h2>
            <p className="font-paragraph text-lg text-secondary text-center">
              Tell us about your business. We'll review your situation and show you exactly how we can help.
            </p>
          </motion.div>

          <Card className="bg-light-gray p-8 border-0 shadow-xl">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="font-paragraph text-secondary mb-4">
                  We've received your information. Our team will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-paragraph font-semibold text-foreground block mb-2">
                      Business Name *
                    </label>
                    <Input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Your restaurant or hotel name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="font-paragraph font-semibold text-foreground block mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                    >
                      <option value="">Select type</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-paragraph font-semibold text-foreground block mb-2">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="font-paragraph font-semibold text-foreground block mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-paragraph font-semibold text-foreground block mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="font-paragraph font-semibold text-foreground block mb-2">
                    What's Your Biggest Challenge Right Now?
                  </label>
                  <Textarea
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleInputChange}
                    placeholder="Tell us about your current booking situation..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Your Free Consultation'}
                </Button>

                <p className="font-paragraph text-sm text-secondary text-center">
                  We respect your privacy. No spam, just helpful insights about growing your business.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              Don't Leave Money on the Table
            </h2>
            <p className="font-paragraph text-xl text-white/90 mb-8">
              Every day without a lead generation system is a day you're losing potential customers to competitors.
            </p>
            <Button
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary hover:bg-light-gray px-8 py-4 text-lg font-semibold rounded-lg"
            >
              Start Your Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-16 px-4 bg-dark-gray text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold mb-2">Call Us</h3>
                <p className="font-paragraph text-secondary">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold mb-2">Email</h3>
                <p className="font-paragraph text-secondary">hello@leadgen.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold mb-2">Available</h3>
                <p className="font-paragraph text-secondary">Monday - Friday, 9am - 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
