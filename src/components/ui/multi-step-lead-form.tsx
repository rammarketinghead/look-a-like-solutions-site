import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface MultiStepLeadFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

type FormStep = 1 | 2 | 3 | 4;

interface FormData {
  service: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const services = [
  'SEO Optimization',
  'Social Media Marketing',
  'Paid Advertising',
  'Web Development',
  'Content Marketing',
  'Email Marketing',
  'Data Analytics',
  'Conversion Optimization',
  'Other'
];

const budgets = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+'
];

const timelines = [
  'Immediate (within 2 weeks)',
  'Short-term (1-3 months)',
  'Medium-term (3-6 months)',
  'Long-term (6+ months)',
  'Not sure yet'
];

export function MultiStepLeadForm({ onSuccess, onError }: MultiStepLeadFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    service: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && !formData.service) {
      setErrorMessage('Please select a service');
      return;
    }
    if (currentStep === 2 && (!formData.budget || !formData.timeline)) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (currentStep === 3 && (!formData.name.trim() || !formData.email.trim())) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setErrorMessage('');
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as FormStep);
    }
  };

  const handlePrevious = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStep);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const submissionData: FormSubmissions = {
        _id: crypto.randomUUID(),
        formType: 'Multi-Step Lead Form',
        submitterName: formData.name.trim(),
        submitterEmail: formData.email.trim(),
        submitterPhone: formData.phone.trim() || undefined,
        companyName: formData.company.trim() || undefined,
        interestedService: formData.service || undefined,
        budget: formData.budget || undefined,
        projectTimeline: formData.timeline || undefined,
        submissionPageUrl: window.location.href,
        submissionDate: new Date().toISOString()
      };

      await BaseCrudService.create('formsubmissions', submissionData);
      
      setSubmitStatus('success');
      setCurrentStep(4);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          service: '',
          budget: '',
          timeline: '',
          name: '',
          email: '',
          phone: '',
          company: ''
        });
        setCurrentStep(1);
        setSubmitStatus('idle');
        onSuccess?.();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-lg">
      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-heading font-bold text-dark-gray">
              Step {currentStep} of 4
            </h3>
            <span className="text-sm font-paragraph text-secondary">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-light-gray rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    What service are you interested in?
                  </label>
                  <p className="text-sm font-paragraph text-secondary mb-4">
                    Select the service that best matches your needs
                  </p>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary">
                      <SelectValue placeholder="Select a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget & Timeline */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    What's your budget range?
                  </label>
                  <p className="text-sm font-paragraph text-secondary mb-4">
                    This helps us tailor solutions for your needs
                  </p>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary">
                      <SelectValue placeholder="Select budget range..." />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    When do you need to start?
                  </label>
                  <p className="text-sm font-paragraph text-secondary mb-4">
                    Help us understand your timeline
                  </p>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary">
                      <SelectValue placeholder="Select timeline..." />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91-9731588244"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-dark-gray mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-primary"
                  />
                </div>

                <p className="text-xs font-paragraph text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Required fields
                </p>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {currentStep === 4 && submitStatus === 'success' && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-dark-gray mb-2">
                  Thank You!
                </h3>
                <p className="font-paragraph text-secondary mb-4">
                  We've received your information and will get back to you within 24 hours.
                </p>
                <p className="text-sm font-paragraph text-gray-500">
                  Check your email for a confirmation message.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm font-paragraph text-red-700">{errorMessage}</p>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 4 && (
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 h-12"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
              
              {currentStep < 3 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="submit"
                  onClick={handleNext}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Privacy Notice */}
          <p className="text-xs font-paragraph text-gray-500 text-center">
            By submitting this form, you agree to receive marketing communications from us. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
