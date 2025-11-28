import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, DollarSign, Target, Zap, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';

export default function LawyerLeadGenerationPage() {
  const [selectedPlan, setSelectedPlan] = useState<'solo' | 'firm' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    firmName: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToConsultation = () => {
    const element = document.getElementById('consultation-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submission: FormSubmissions = {
        _id: crypto.randomUUID(),
        formType: 'Lawyer Lead Generation',
        submitterName: formData.name,
        submitterEmail: formData.email,
        submitterPhone: formData.phone,
        companyName: formData.firmName,
        message: formData.message,
        submissionDate: new Date().toISOString(),
        submissionPageUrl: window.location.href
      };

      await BaseCrudService.create('formsubmissions', submission);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        firmName: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Quality Legal Leads,<br />
              <span className="text-blue-400">Delivered Consistently</span>
            </h1>
            <p className="font-paragraph text-xl sm:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
              15 years of proven expertise in generating high-quality leads for solo practitioners and law firms. Transparent billing. Real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Start Your Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold"
              >
                See Our Results
              </Button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-700"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
              <p className="font-paragraph text-slate-300">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <p className="font-paragraph text-slate-300">Law Firms Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <p className="font-paragraph text-slate-300">Quality Leads Monthly</p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50" id="consultation-section">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Get Your Free Consultation Today
            </h2>
            <p className="font-paragraph text-lg text-slate-600">
              Tell us about your practice and let's discuss how we can help you generate consistent, quality leads.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="p-8 sm:p-12 border-0 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block font-heading text-sm font-semibold text-slate-900 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block font-heading text-sm font-semibold text-slate-900 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block font-heading text-sm font-semibold text-slate-900 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Firm Name Field */}
                <div>
                  <label htmlFor="firmName" className="block font-heading text-sm font-semibold text-slate-900 mb-2">
                    Law Firm / Practice Name
                  </label>
                  <Input
                    id="firmName"
                    name="firmName"
                    type="text"
                    value={formData.firmName}
                    onChange={handleInputChange}
                    placeholder="Your Law Firm Name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block font-heading text-sm font-semibold text-slate-900 mb-2">
                    Tell Us About Your Practice
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What practice areas do you focus on? What are your lead generation challenges? Any other details we should know?"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p className="font-paragraph text-green-800">
                        Thank you! We've received your inquiry. Our team will contact you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="font-paragraph text-red-800">
                      There was an error submitting your form. Please try again.
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get Your Free Consultation
                    </>
                  )}
                </Button>

                <p className="font-paragraph text-xs text-slate-500 text-center">
                  We respect your privacy. Your information will only be used to contact you about your inquiry.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
      {/* The Problem Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              The Challenge Every Law Firm Faces
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              You're excellent at what you do—practicing law. But finding consistent, qualified leads? That's a different skill entirely. Most firms waste thousands on ineffective marketing or settle for low-quality referrals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Inconsistent Lead Flow",
                description: "Feast or famine cycles make it hard to plan and grow your practice"
              },
              {
                icon: DollarSign,
                title: "Wasted Marketing Budget",
                description: "Generic agencies don't understand the legal market or your specific practice areas"
              },
              {
                icon: Users,
                title: "Wrong Leads",
                description: "Quantity over quality wastes your time and your team's resources"
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <item.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-slate-600">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Solution Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Our Proven Lead Generation System
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              We've spent 15 years perfecting the art of finding qualified legal clients. Here's how we do it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div {...fadeInUp}>
              <Image
                src="https://static.wixstatic.com/media/f650f9_d681e61196b04b23b11e9cd18c89f9d3~mv2.png?originWidth=448&originHeight=384"
                alt="Lead generation strategy visualization"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div {...fadeInUp}>
              <h3 className="font-heading text-3xl font-bold text-slate-900 mb-6">
                A Two-Channel Approach Built for Legal Services
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                      <span className="font-bold text-lg">70%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">
                      Google Ads (Primary Channel)
                    </h4>
                    <p className="font-paragraph text-slate-600">
                      Capture high-intent clients actively searching for legal services. We optimize for your specific practice areas with precision targeting and continuous refinement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-400 text-white">
                      <span className="font-bold text-lg">30%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">
                      Facebook Ads (Awareness Channel)
                    </h4>
                    <p className="font-paragraph text-slate-600">
                      Build awareness and reach potential clients in their social feeds. Perfect for building trust and establishing your firm's reputation in your community.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-heading text-lg font-bold text-slate-900 mb-2">
                    Optional: Long-Term SEO Support
                  </h4>
                  <p className="font-paragraph text-slate-600">
                    Build organic visibility for sustainable growth. We can layer in SEO to create a long-term asset for your practice.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Transparent Billing Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Transparent Billing. No Surprises.
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              You know exactly what you're paying for and what results you're getting. Monthly reporting, clear metrics, and honest communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Fixed Monthly Fee",
                description: "No hidden costs. You know your budget upfront. We manage all ad spend and optimization within your agreed budget."
              },
              {
                icon: TrendingUp,
                title: "Performance Metrics",
                description: "Monthly reports showing leads generated, cost per lead, conversion rates, and ROI. Complete transparency."
              },
              {
                icon: CheckCircle2,
                title: "Quality Guarantee",
                description: "We focus on lead quality, not quantity. Every lead is vetted and relevant to your practice areas."
              },
              {
                icon: Zap,
                title: "Continuous Optimization",
                description: "We constantly test and refine campaigns to improve results and lower your cost per lead over time."
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <Card className="p-8 border-0 shadow-lg">
                  <item.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-slate-600">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Client Stories Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Real Results from Real Lawyers
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              Whether you're a solo practitioner or managing a mid-sized firm, our system works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Solo Advocate Story */}
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-0 shadow-lg h-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://static.wixstatic.com/media/f650f9_008c093a01d04acca5b45dfa0c14edc6~mv2.png?originWidth=128&originHeight=128"
                    alt="Solo advocate profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      Sarah Mitchell
                    </h3>
                    <p className="font-paragraph text-slate-600">
                      Solo Family Law Practitioner
                    </p>
                  </div>
                </div>
                <p className="font-paragraph text-slate-700 mb-6 italic">
                  "I was struggling to keep my practice full. After 6 months with this system, I'm turning away clients and have a waiting list. The leads are qualified, the billing is transparent, and I finally have predictable income."
                </p>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>25 qualified leads/month</strong> (up from 3-4)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>$1,200/month investment</strong> generating $15K+ in revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>Peace of mind</strong> knowing leads are coming consistently
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Mid-Sized Firm Story */}
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-0 shadow-lg h-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://static.wixstatic.com/media/f650f9_920e902b43b247d886f4d598df7b164a~mv2.png?originWidth=128&originHeight=128"
                    alt="Law firm partner profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      James & Associates
                    </h3>
                    <p className="font-paragraph text-slate-600">
                      12-Attorney Personal Injury Firm
                    </p>
                  </div>
                </div>
                <p className="font-paragraph text-slate-700 mb-6 italic">
                  "We were spending $8K/month with a generic agency getting mediocre results. Switching to this system cut our cost per lead in half while improving quality. Our attorneys are happier because they're getting better cases."
                </p>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>120+ qualified leads/month</strong> across practice areas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>50% reduction in cost per lead</strong> within 3 months
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>Better case quality</strong> = higher settlement values
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              How We Get You Results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Discovery",
                description: "We learn about your practice, target clients, and goals"
              },
              {
                step: "2",
                title: "Strategy",
                description: "We build a custom Google Ads and Facebook campaign"
              },
              {
                step: "3",
                title: "Launch & Optimize",
                description: "Campaigns go live and we continuously refine for results"
              },
              {
                step: "4",
                title: "Report & Scale",
                description: "Monthly reports and optimization to improve ROI"
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 font-heading text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-slate-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-1 bg-blue-300" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Why Law Firms Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "15 years of legal industry expertise—we understand your market",
              "Specialized in lead generation, not generic digital marketing",
              "Transparent billing with no hidden fees or surprise charges",
              "Focus on quality leads, not vanity metrics",
              "Dedicated account management and responsive support",
              "Proven system that works for solo practitioners and large firms",
              "Monthly reporting with clear ROI metrics",
              "Flexible packages that scale with your growth"
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <p className="font-paragraph text-slate-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Ready to Fill Your Practice with Quality Leads?
            </h2>
            <p className="font-paragraph text-xl text-blue-100 mb-8">
              Let's talk about how our proven system can transform your lead generation. No pressure, no sales pitch—just a conversation about your practice and your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
              >
                Schedule Your Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold"
              >
                Call Us: (555) 123-4567
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Lead Capture Form Section */}
      {/* Closing Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              We're Here to Help You Succeed
            </h2>
            <p className="font-paragraph text-lg text-slate-600 mb-8">
              Building a successful law practice takes more than just legal expertise. It takes consistent, quality leads. We've spent 15 years perfecting the system to deliver exactly that. Let's talk about how we can help your practice grow.
            </p>
            <p className="font-paragraph text-slate-700 italic">
              Your success is our success. We're invested in your growth.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
