import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';

interface ServiceContactFormProps {
  serviceName: string;
  serviceDescription?: string;
}

export function ServiceContactForm({ serviceName, serviceDescription }: ServiceContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    service: serviceName
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
        formType: 'Service Inquiry',
        submitterName: formData.name.trim(),
        submitterEmail: formData.email.trim(),
        submitterPhone: formData.phone.trim() || undefined,
        companyName: formData.company.trim() || undefined,
        interestedService: serviceName,
        budget: formData.budget || undefined,
        message: formData.message.trim(),
        submissionPageUrl: window.location.href,
        submissionDate: new Date().toISOString()
      };

      console.log('Saving form submission to CMS:', submissionData);
      await BaseCrudService.create('formsubmissions', submissionData);
      console.log('Form submission saved successfully');
      
      // Create email content
      const emailSubject = `New ${serviceName} Inquiry from ${formData.name}`;
      const emailBody = `
New ${serviceName} service inquiry:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Budget: ${formData.budget || 'Not specified'}

Project Details:
${formData.message}

---
This inquiry was submitted through the ${serviceName} service page.
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

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        budget: '',
        message: '',
        service: serviceName
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error saving form submission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-dark-gray mb-4 sm:mb-6">
              Ready to Get Started with {serviceName}?
            </h2>
            <p className="text-base sm:text-lg font-paragraph text-secondary mb-6 sm:mb-8">
              {serviceDescription || `Let's discuss how our ${serviceName} services can help grow your business. Get in touch for a free consultation and customized strategy.`}
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-dark-gray mb-1 text-sm sm:text-base">Call Us</h3>
                  <a href="tel:+919731588244" className="font-paragraph text-secondary hover:text-primary transition-colors text-sm sm:text-base">
                    +91-9731588244
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-dark-gray mb-1 text-sm sm:text-base">Email Us</h3>
                  <a href="mailto:info@lookalikesolutions.com" className="font-paragraph text-secondary hover:text-primary transition-colors text-sm sm:text-base break-all">
                    info@lookalikesolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-dark-gray mb-1 text-sm sm:text-base">Quick Response</h3>
                  <p className="font-paragraph text-secondary text-sm sm:text-base">
                    We typically respond within 2 hours during business hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-primary/5 rounded-lg">
              <h4 className="font-heading text-dark-gray mb-3 text-sm sm:text-base">What Happens Next?</h4>
              <ul className="space-y-2 font-paragraph text-secondary text-sm sm:text-base">
                <li>• Free consultation call within 24 hours</li>
                <li>• Customized strategy proposal</li>
                <li>• Transparent pricing and timeline</li>
                <li>• No obligation to proceed</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-heading text-dark-gray">
                Get Your Free {serviceName} Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-paragraph text-dark-gray mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="border-light-gray focus:border-primary h-10 sm:h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-paragraph text-dark-gray mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="border-light-gray focus:border-primary h-10 sm:h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-paragraph text-dark-gray mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-light-gray focus:border-primary h-10 sm:h-11"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-paragraph text-dark-gray mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="border-light-gray focus:border-primary h-10 sm:h-11"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-paragraph text-dark-gray mb-2">
                    Monthly Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:py-3 border border-light-gray rounded-md focus:outline-none focus:border-primary text-sm sm:text-base h-10 sm:h-11"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-25k">Under ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                    <option value="100k-200k">₹1,00,000 - ₹2,00,000</option>
                    <option value="200k-plus">₹2,00,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-paragraph text-dark-gray mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={`Tell us about your ${serviceName.toLowerCase()} goals, current challenges, and what you'd like to achieve...`}
                    rows={4}
                    className="border-light-gray focus:border-primary text-sm sm:text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 sm:py-4 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Get Free Consultation'
                  )}
                </Button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-sm font-paragraph text-green-800">
                      Thank you! Your inquiry has been submitted successfully. We'll contact you within 24 hours.
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

                <p className="text-xs font-paragraph text-secondary text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}