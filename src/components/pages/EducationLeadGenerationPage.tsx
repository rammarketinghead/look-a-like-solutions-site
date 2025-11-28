import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, DollarSign, BookOpen, Zap, Send, GraduationCap } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';

export default function EducationLeadGenerationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instituteName: '',
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
        formType: 'Education Lead Generation',
        submitterName: formData.name,
        submitterEmail: formData.email,
        submitterPhone: formData.phone,
        companyName: formData.instituteName,
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
        instituteName: '',
        message: ''
      });

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
      <section className="w-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
              Steady Student Enquiries,<br />
              <span className="text-primary">Month After Month</span>
            </h1>
            <p className="font-paragraph text-xl sm:text-2xl text-secondary mb-8 max-w-3xl mx-auto">
              15 years of proven expertise in generating high-intent student enquiries for schools, colleges, training centers, and online courses. Transparent pricing. Real results. No surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Get Your Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToConsultation}
                className="border-2 border-primary text-primary hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
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
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="font-paragraph text-secondary">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <p className="font-paragraph text-secondary">Educational Institutions Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <p className="font-paragraph text-secondary">Quality Student Enquiries Monthly</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-light-gray" id="consultation-section">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Get Your Free Student Enquiry Strategy Consultation
            </h2>
            <p className="font-paragraph text-lg text-secondary">
              Tell us about your institution and let's discuss how we can help you attract consistent, high-intent student enquiries.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="p-8 sm:p-12 border-0 shadow-lg bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block font-heading text-sm font-semibold text-foreground mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block font-heading text-sm font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@institute.com"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block font-heading text-sm font-semibold text-foreground mb-2">
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Institute Name Field */}
                <div>
                  <label htmlFor="instituteName" className="block font-heading text-sm font-semibold text-foreground mb-2">
                    School / College / Training Center Name
                  </label>
                  <Input
                    id="instituteName"
                    name="instituteName"
                    type="text"
                    value={formData.instituteName}
                    onChange={handleInputChange}
                    placeholder="Your Institution Name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block font-heading text-sm font-semibold text-foreground mb-2">
                    Tell Us About Your Institution
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What courses do you offer? What's your target student demographic? What are your enrollment challenges? Any other details we should know?"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
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
                  className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
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

                <p className="font-paragraph text-xs text-secondary text-center">
                  We respect your privacy. Your information will only be used to contact you about your inquiry.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              The Challenge Every Educational Institution Faces
            </h2>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              You're excellent at teaching and developing students. But finding consistent, high-intent student enquiries? That's a different skill entirely. Most institutions struggle with unpredictable enrollment or waste thousands on ineffective marketing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Inconsistent Enrollment",
                description: "Feast or famine cycles make it hard to plan your academic year and manage your resources efficiently"
              },
              {
                icon: DollarSign,
                title: "Wasted Marketing Budget",
                description: "Generic agencies don't understand education or your specific courses, student demographics, and admission requirements"
              },
              {
                icon: Users,
                title: "Wrong Student Inquiries",
                description: "Low-quality leads waste your time and your team's resources on unqualified or uninterested prospects"
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-secondary">
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
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Proven Student Enquiry Generation System
            </h2>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              We've spent 15 years perfecting the art of connecting educational institutions with qualified, high-intent students. Here's how we do it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div {...fadeInUp}>
              <Image
                src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=education-strategy"
                alt="Education lead generation strategy visualization"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div {...fadeInUp}>
              <h3 className="font-heading text-3xl font-bold text-foreground mb-6">
                A Two-Channel Approach Built for Education
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white">
                      <span className="font-bold text-lg">70%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                      Google Ads (Primary Channel)
                    </h4>
                    <p className="font-paragraph text-secondary">
                      Capture high-intent students actively searching for courses, programs, and educational opportunities. We optimize for your specific courses, student demographics, and admission requirements with precision targeting.
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
                    <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                      Facebook Ads (Awareness Channel)
                    </h4>
                    <p className="font-paragraph text-secondary">
                      Build awareness and reach prospective students in their social feeds. Perfect for building trust, showcasing your campus, programs, and establishing your institution's reputation in your community.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-light-gray rounded-lg border border-blue-200">
                  <h4 className="font-heading text-lg font-bold text-foreground mb-2">
                    Optional: Long-Term SEO Support
                  </h4>
                  <p className="font-paragraph text-secondary">
                    Build organic visibility for sustainable growth. We can layer in SEO to create a long-term asset for your institution and dominate local search results for educational programs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transparent Billing Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Transparent Billing. No Surprises.
            </h2>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
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
                description: "Monthly reports showing student enquiries generated, cost per enquiry, conversion rates, and ROI. Complete transparency."
              },
              {
                icon: CheckCircle2,
                title: "Quality Guarantee",
                description: "We focus on enquiry quality, not quantity. Every lead is vetted and relevant to your courses and student demographics."
              },
              {
                icon: Zap,
                title: "Continuous Optimization",
                description: "We constantly test and refine campaigns to improve results and lower your cost per enquiry over time."
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <Card className="p-8 border-0 shadow-lg bg-white">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-secondary">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Real Results from Educational Institutions
            </h2>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Whether you're a school, college, training center, or online course provider, our system works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Training Center Story */}
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-0 shadow-lg h-full bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=training-center-profile"
                    alt="Training center director profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Priya Sharma
                    </h3>
                    <p className="font-paragraph text-secondary">
                      Director, Professional Skills Training Center
                    </p>
                  </div>
                </div>
                <p className="font-paragraph text-foreground mb-6 italic">
                  "We were struggling to fill our professional development courses, especially during off-peak seasons. After 3 months with this system, we're consistently getting 25-30 qualified student enquiries per month. The leads are genuinely interested, the pricing is transparent, and we finally have predictable enrollment. This has been transformative for our business."
                </p>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-foreground">
                      <strong>25-30 qualified enquiries/month</strong> (up from 5-8)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-foreground">
                      <strong>$1,500/month investment</strong> generating $35K+ in course enrollments
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-foreground">
                      <strong>Peace of mind</strong> knowing student enquiries are coming consistently
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* College Story */}
            <motion.div {...fadeInUp}>
              <Card className="p-8 border-0 shadow-lg h-full bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=college-profile"
                    alt="College principal profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Apex Institute of Technology
                    </h3>
                    <p className="font-paragraph text-secondary">
                      Engineering & Management College (500+ students)
                    </p>
                  </div>
                </div>
                <p className="font-paragraph text-foreground mb-6 italic">
                  "We were spending $6K/month with a generic agency getting mediocre results. Switching to this system cut our cost per enquiry in half while improving quality significantly. Our admissions team is happier because they're getting more serious, qualified applicants. We've increased our enrollment velocity and improved our student quality metrics."
                </p>
                <div className="space-y-3 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-foreground">
                      <strong>150+ qualified enquiries/month</strong> across all programs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-foreground">
                      <strong>50% reduction in cost per enquiry</strong> within 2 months
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-foreground">
                      <strong>Better student quality</strong> = higher enrollment rates and better academic outcomes
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              How We Get You Results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Discovery",
                description: "We learn about your courses, student demographics, and enrollment goals"
              },
              {
                step: "2",
                title: "Strategy",
                description: "We build a custom Google Ads and Facebook campaign for your institution"
              },
              {
                step: "3",
                title: "Launch & Optimize",
                description: "Campaigns go live and we continuously refine for better results"
              },
              {
                step: "4",
                title: "Report & Scale",
                description: "Monthly reports and optimization to improve ROI and enquiry quality"
              }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp}>
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4 font-heading text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-secondary text-sm">
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
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Why Educational Institutions Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "15 years of education marketing expertise—we understand your sector",
              "Specialized in student enquiry generation, not generic digital marketing",
              "Transparent billing with no hidden fees or surprise charges",
              "Focus on enquiry quality and student fit, not vanity metrics",
              "Dedicated account management and responsive support",
              "Proven system that works for schools, colleges, training centers, and online courses",
              "Monthly reporting with clear ROI metrics and enquiry acquisition data",
              "Flexible packages that scale with your institution's growth"
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeInUp} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="font-paragraph text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Ready to Fill Your Enrollment Pipeline with Quality Student Enquiries?
            </h2>
            <p className="font-paragraph text-xl text-blue-100 mb-8">
              Let's talk about how our proven system can transform your student acquisition. No pressure, no sales pitch—just a conversation about your institution and your enrollment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToConsultation}
                className="bg-white text-primary hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
              >
                Schedule Your Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToConsultation}
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold"
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
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
              We're Here to Help Your Institution Thrive
            </h2>
            <p className="font-paragraph text-lg text-secondary mb-8">
              Building a successful educational institution takes more than just great teaching. It takes consistent, quality student enquiries. We've spent 15 years perfecting the system to deliver exactly that. Let's talk about how we can help your institution grow and thrive.
            </p>
            <p className="font-paragraph text-foreground italic">
              Your institution's success is our mission. Your growth is our priority.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
