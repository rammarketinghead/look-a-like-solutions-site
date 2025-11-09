import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Save form data to CMS
      const submissionData: FormSubmissions = {
        _id: crypto.randomUUID(),
        formType: 'Contact Form',
        submitterName: formData.name.trim(),
        submitterEmail: formData.email.trim(),
        submitterPhone: formData.phone.trim() || undefined,
        companyName: formData.company.trim() || undefined,
        interestedService: formData.service || undefined,
        budget: formData.budget || undefined,
        message: formData.message.trim(),
        projectTimeline: formData.timeline || undefined,
        submissionPageUrl: window.location.href,
        submissionDate: new Date().toISOString()
      };

      console.log('Saving contact form submission to CMS:', submissionData);
      await BaseCrudService.create('formsubmissions', submissionData);
      console.log('Contact form submission saved successfully');

      // Create email content
      const emailSubject = `New Contact Form Submission from ${formData.name}`;
      const emailBody = `
New contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Project Details:
${formData.message}

---
This inquiry was submitted through the contact page.
Page URL: ${window.location.href}
Submission ID: ${submissionData._id}
Submission Date: ${new Date().toLocaleString()}
      `;

      // Create mailto links for both email addresses
      const email1 = 'ram.dmm@lookalikesolutions.com';
      const email2 = 'rammarketinghead@gmail.com';
      
      // Send to first email
      const mailtoLink1 = `mailto:${email1}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink1, '_blank');
      
      // Send to second email after a short delay
      setTimeout(() => {
        const mailtoLink2 = `mailto:${email2}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink2, '_blank');
      }, 1000);
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
        timeline: ''
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error saving contact form submission:', error);
      setSubmitStatus('error');
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-dark-gray mb-6 sm:mb-8">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl font-paragraph text-secondary max-w-4xl mx-auto">
              Ready to transform your digital presence? Let's discuss your project and create a strategy that drives real results for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-heading text-dark-gray mb-6 sm:mb-8">
                Let's Start a Conversation
              </h2>
              <p className="font-paragraph text-secondary mb-8 sm:mb-12 text-sm sm:text-base">
                We're here to help you achieve your digital marketing goals. Reach out to us through any of the channels below, and we'll get back to you promptly.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-dark-gray mb-1 sm:mb-2 text-sm sm:text-base">Phone</h3>
                    <a href="tel:+919731588244" className="font-paragraph text-secondary hover:text-primary transition-colors text-sm sm:text-base">
                      +91-9731588244
                    </a>
                    <p className="font-paragraph text-secondary text-xs sm:text-sm">Mon-Fri 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-dark-gray mb-1 sm:mb-2 text-sm sm:text-base">Email</h3>
                    <a href="mailto:info@lookalikesolutions.com" className="font-paragraph text-secondary hover:text-primary transition-colors text-sm sm:text-base break-all">
                      info@lookalikesolutions.com
                    </a>
                    <p className="font-paragraph text-secondary text-xs sm:text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-dark-gray mb-1 sm:mb-2 text-sm sm:text-base">Office</h3>
                    <p className="font-paragraph text-secondary text-sm sm:text-base">Bengaluru, Karnataka</p>
                    <p className="font-paragraph text-secondary text-sm sm:text-base">India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-dark-gray mb-1 sm:mb-2 text-sm sm:text-base">Business Hours</h3>
                    <p className="font-paragraph text-secondary text-xs sm:text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="font-paragraph text-secondary text-xs sm:text-sm">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="font-paragraph text-secondary text-xs sm:text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 sm:p-8 lg:p-12">
                  <h2 className="text-2xl sm:text-3xl font-heading text-dark-gray mb-6 sm:mb-8">
                    Tell Us About Your Project
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block font-paragraph text-dark-gray mb-2 text-sm sm:text-base">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                          className="py-4"
                        />
                      </div>
                      <div>
                        <label className="block font-paragraph text-dark-gray mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@company.com"
                          required
                          className="py-4"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-paragraph text-dark-gray mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className="py-4"
                        />
                      </div>
                      <div>
                        <label className="block font-paragraph text-dark-gray mb-2">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Your company name"
                          className="py-4"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-paragraph text-dark-gray mb-2">
                          Service Interested In *
                        </label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger className="py-4">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seo">SEO Optimization</SelectItem>
                            <SelectItem value="social-media">Social Media Marketing</SelectItem>
                            <SelectItem value="paid-ads">Paid Advertising</SelectItem>
                            <SelectItem value="web-dev">Web Development</SelectItem>
                            <SelectItem value="influencer">Influencer Marketing</SelectItem>
                            <SelectItem value="content">Content Marketing</SelectItem>
                            <SelectItem value="analytics">Data Analytics</SelectItem>
                            <SelectItem value="cro">Conversion Optimization</SelectItem>
                            <SelectItem value="multiple">Multiple Services</SelectItem>
                            <SelectItem value="consultation">Free Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block font-paragraph text-dark-gray mb-2">
                          Budget Range
                        </label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger className="py-4">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                            <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="1l-3l">₹1,00,000 - ₹3,00,000</SelectItem>
                            <SelectItem value="3l-5l">₹3,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="above-5l">Above ₹5,00,000</SelectItem>
                            <SelectItem value="discuss">Prefer to discuss</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-paragraph text-dark-gray mb-2">
                        Project Timeline
                      </label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger className="py-4">
                          <SelectValue placeholder="When do you want to start?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">As soon as possible</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="planning">Just planning ahead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block font-paragraph text-dark-gray mb-2">
                        Project Details *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your project, goals, challenges, and any specific requirements..."
                        rows={6}
                        required
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-sm font-paragraph text-green-800">
                          Thank you! Your message has been submitted successfully. We'll contact you within 24 hours.
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        <p className="text-sm font-paragraph text-red-800">
                          There was an error submitting your form. Please try again or contact us directly.
                        </p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Why Partner With Us?
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              When you choose Look A Like Solutions, you're choosing a partner committed to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Proven Results',
                description: 'Track record of delivering measurable growth and ROI for our clients.'
              },
              {
                icon: Clock,
                title: 'Quick Response',
                description: 'We respond to all inquiries within 24 hours, often much sooner.'
              },
              {
                icon: Phone,
                title: 'Expert Consultation',
                description: 'Free initial consultation to understand your needs and goals.'
              },
              {
                icon: CheckCircle,
                title: 'Transparent Process',
                description: 'Clear communication and regular updates throughout the project.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Got questions? We've got answers. Here are some common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: 'How long does it take to see results?',
                answer: 'Results vary by service and goals. SEO typically shows results in 3-6 months, while paid advertising can show immediate results. We provide realistic timelines during consultation.'
              },
              {
                question: 'Do you work with small businesses?',
                answer: 'Absolutely! We work with businesses of all sizes, from startups to enterprises. Our strategies are tailored to your budget and goals.'
              },
              {
                question: 'What makes you different from other agencies?',
                answer: 'Our data-driven approach, transparent reporting, and focus on ROI set us apart. We treat your business like our own and are committed to your long-term success.'
              },
              {
                question: 'Do you provide ongoing support?',
                answer: 'Yes, we offer ongoing support and optimization for all our services. Digital marketing requires continuous monitoring and adjustment for best results.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border border-light-gray">
                <CardContent className="p-8">
                  <h3 className="text-lg font-heading text-dark-gray mb-4">{faq.question}</h3>
                  <p className="font-paragraph text-secondary">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}