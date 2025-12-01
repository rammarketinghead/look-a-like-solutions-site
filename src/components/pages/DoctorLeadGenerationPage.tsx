import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, DollarSign, Heart, Zap, Send, Stethoscope } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';

export default function DoctorLeadGenerationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
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
        formType: 'Doctor Lead Generation',
        submitterName: formData.name,
        submitterEmail: formData.email,
        submitterPhone: formData.phone,
        companyName: formData.clinicName,
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
        clinicName: '',
        message: ''
      });

      // Redirect to thank you page after 1 second
      setTimeout(() => {
        navigate('/thank-you');
      }, 1000);
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
      <section className="w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
              Steady Patient Inquiries,<br />
              <span className="text-blue-600">Delivered Consistently</span>
            </h1>
            <p className="font-paragraph text-xl sm:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto">
              15 years of proven expertise in generating high-quality patient leads for solo practitioners, clinics, and healthcare providers. Transparent billing. Real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Start Your Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToConsultation}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-blue-200"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <p className="font-paragraph text-slate-700">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">800+</div>
              <p className="font-paragraph text-slate-700">Healthcare Providers Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <p className="font-paragraph text-slate-700">Quality Patient Leads Monthly</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white" id="consultation-section">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Get Your Free Consultation Today
            </h2>
            <p className="font-paragraph text-lg text-slate-600">
              Tell us about your practice and let's discuss how we can help you attract consistent, quality patient inquiries.
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
                    placeholder="Dr. Sarah Johnson"
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
                    placeholder="sarah@clinic.com"
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

                {/* Clinic Name Field */}
                <div>
                  <label htmlFor="clinicName" className="block font-heading text-sm font-semibold text-slate-900 mb-2">
                    Clinic / Practice Name
                  </label>
                  <Input
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    placeholder="Your Clinic Name"
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
                    placeholder="What specialties do you offer? What are your patient acquisition challenges? Any other details we should know?"
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

      {/* The Challenge Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              The Challenge Every Healthcare Provider Faces
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              You're excellent at what you do—caring for patients. But finding consistent, qualified patient inquiries? That's a different skill entirely. Most practices struggle with unpredictable patient flow or waste thousands on ineffective marketing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Inconsistent Patient Flow",
                description: "Feast or famine cycles make it hard to plan staffing and manage your practice efficiently"
              },
              {
                icon: DollarSign,
                title: "Wasted Marketing Budget",
                description: "Generic agencies don't understand healthcare marketing or your specific specialties"
              },
              {
                icon: Users,
                title: "Wrong Patient Inquiries",
                description: "Low-quality leads waste your time and your team's resources"
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
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Our Proven Patient Lead Generation System
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              We've spent 15 years perfecting the art of connecting healthcare providers with qualified patients. Here's how we do it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div {...fadeInUp}>
              <Image
                src="https://static.wixstatic.com/media/f650f9_df100a2f7ce34b76a3ef2991f7ecd81c~mv2.png?originWidth=448&originHeight=384"
                alt="Patient lead generation strategy visualization"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div {...fadeInUp}>
              <h3 className="font-heading text-3xl font-bold text-slate-900 mb-6">
                A Two-Channel Approach Built for Healthcare
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white">
                      <span className="font-bold text-lg">70%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">
                      Google Ads (Primary Channel)
                    </h4>
                    <p className="font-paragraph text-slate-600">
                      Capture high-intent patients actively searching for healthcare services. We optimize for your specialties with precision targeting and continuous refinement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                      <span className="font-bold text-lg">30%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">
                      Facebook Ads (Awareness Channel)
                    </h4>
                    <p className="font-paragraph text-slate-600">
                      Build awareness and reach potential patients in their social feeds. Perfect for building trust and establishing your practice's reputation in your community.
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
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
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
                description: "Monthly reports showing patient inquiries generated, cost per lead, conversion rates, and ROI. Complete transparency."
              },
              {
                icon: CheckCircle2,
                title: "Quality Guarantee",
                description: "We focus on lead quality, not quantity. Every inquiry is vetted and relevant to your specialties."
              },
              {
                icon: Zap,
                title: "Continuous Optimization",
                description: "We constantly test and refine campaigns to improve results and lower your cost per lead over time."
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <Card className="p-8 border-0 shadow-lg">
                  <item.icon className="w-12 h-12 text-blue-600 mb-4" />
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

      {/* Patient Stories Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Real Results from Real Healthcare Providers
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl mx-auto">
              Whether you're a solo practitioner or managing a multi-specialty clinic, our system works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pediatrician Story */}
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-0 shadow-lg h-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://static.wixstatic.com/media/f650f9_abd807c35a6243aa905de7591b01d0c5~mv2.png?originWidth=128&originHeight=128"
                    alt="Pediatrician profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      Dr. Emily Chen
                    </h3>
                    <p className="font-paragraph text-slate-600">
                      Solo Pediatrician
                    </p>
                  </div>
                </div>
                <p className="font-paragraph text-slate-700 mb-6 italic">
                  "I was struggling to fill appointment slots, especially for new patients. After 4 months with this system, I'm fully booked and have a waiting list. The patient inquiries are qualified, the billing is transparent, and I finally have predictable income."
                </p>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>30+ qualified patient inquiries/month</strong> (up from 5-8)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>$1,500/month investment</strong> generating $25K+ in revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>Peace of mind</strong> knowing patient inquiries are coming consistently
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Multi-Specialty Clinic Story */}
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-0 shadow-lg h-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://static.wixstatic.com/media/f650f9_950445863a584d94b60742ffeb8fd8a8~mv2.png?originWidth=128&originHeight=128"
                    alt="Clinic director profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-900">
                      Wellness Medical Clinic
                    </h3>
                    <p className="font-paragraph text-slate-600">
                      Multi-Specialty Clinic (5 Providers)
                    </p>
                  </div>
                </div>
                <p className="font-paragraph text-slate-700 mb-6 italic">
                  "We were spending $6K/month with a generic agency getting mediocre results. Switching to this system cut our cost per inquiry in half while improving quality. Our providers are happier because they're seeing more engaged patients."
                </p>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>150+ qualified inquiries/month</strong> across all specialties
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>45% reduction in cost per inquiry</strong> within 3 months
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-paragraph text-slate-700">
                      <strong>Better patient quality</strong> = higher appointment show rates
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
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
                description: "We learn about your practice, specialties, and patient acquisition goals"
              },
              {
                step: "2",
                title: "Strategy",
                description: "We build a custom Google Ads and Facebook campaign for your specialties"
              },
              {
                step: "3",
                title: "Launch & Optimize",
                description: "Campaigns go live and we continuously refine for better results"
              },
              {
                step: "4",
                title: "Report & Scale",
                description: "Monthly reports and optimization to improve ROI and patient quality"
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-heading text-2xl font-bold">
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
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Why Healthcare Providers Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "15 years of healthcare marketing expertise—we understand your market",
              "Specialized in patient lead generation, not generic digital marketing",
              "Transparent billing with no hidden fees or surprise charges",
              "Focus on lead quality and patient fit, not vanity metrics",
              "Dedicated account management and responsive support",
              "Proven system that works for solo practitioners and multi-specialty clinics",
              "Monthly reporting with clear ROI metrics and patient acquisition data",
              "Flexible packages that scale with your practice growth"
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
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
              Ready to Fill Your Schedule with Quality Patient Inquiries?
            </h2>
            <p className="font-paragraph text-xl text-blue-100 mb-8">
              Let's talk about how our proven system can transform your patient acquisition. No pressure, no sales pitch—just a conversation about your practice and your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
              >
                Schedule Your Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToConsultation}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold"
              >
                Contact us today
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              We're Here to Help Your Practice Thrive
            </h2>
            <p className="font-paragraph text-lg text-slate-600 mb-8">
              Building a successful healthcare practice takes more than just clinical expertise. It takes consistent, quality patient inquiries. We've spent 15 years perfecting the system to deliver exactly that. Let's talk about how we can help your practice grow and thrive.
            </p>
            <p className="font-paragraph text-slate-700 italic">
              Your patients' health is our priority. Your practice's growth is our mission.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
