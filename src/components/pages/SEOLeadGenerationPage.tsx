import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { CheckCircle, TrendingUp, Target, Clock, MapPin, MessageSquare, Globe } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface FormData {
  websiteUrl: string;
  competitors: string;
  goals: string;
  timeline: string;
  budget: string;
  targetLocation: string;
  contactTime: string;
  notes: string;
}

export default function SEOLeadGenerationPage() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      websiteUrl: '',
      competitors: '',
      goals: '',
      timeline: '',
      budget: '',
      targetLocation: '',
      contactTime: '',
      notes: '',
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await BaseCrudService.create('formsubmissions', {
        _id: crypto.randomUUID(),
        formType: 'SEO Lead Generation',
        submitterName: '',
        submitterEmail: '',
        submitterPhone: '',
        companyName: '',
        interestedService: 'SEO',
        message: `Website: ${data.websiteUrl}\nCompetitors: ${data.competitors}\nGoals: ${data.goals}\nTimeline: ${data.timeline}\nBudget: ${data.budget}\nLocation: ${data.targetLocation}\nPreferred Contact: ${data.contactTime}\nAdditional Notes: ${data.notes}`,
        budget: data.budget,
        projectTimeline: data.timeline,
        submissionPageUrl: window.location.href,
        submissionDate: new Date().toISOString(),
      });

      setSubmitSuccess(true);
      reset();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Unlock Your Website's Full SEO Potential
            </h1>
            <p className="text-lg text-secondary mb-8 font-paragraph">
              Get a personalized SEO strategy tailored to your business goals. Our experts will analyze your website, competitors, and market to create a roadmap for sustainable growth.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-foreground">Free Initial Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-foreground">Expert Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-paragraph text-foreground">Custom Strategy</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://static.wixstatic.com/media/f650f9_beb940410cf646648796bc983dc046eb~mv2.png?originWidth=448&originHeight=384"
              alt="SEO Strategy Illustration"
              width={500}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-16 md:py-24 bg-light-gray rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4 text-center">
            Tell Us About Your Business
          </h2>
          <p className="text-center text-secondary font-paragraph mb-12">
            Fill out this quick form and we'll create a personalized SEO strategy for your website.
          </p>

          {submitSuccess && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-paragraph">
                ✓ Thank you! Your information has been received. We'll contact you shortly with your personalized SEO strategy.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Website URL */}
            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Website URL
              </label>
              <Input
                type="url"
                placeholder="https://www.yourwebsite.com"
                {...register('websiteUrl', {
                  required: 'Website URL is required',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL'
                  }
                })}
                className="w-full"
              />
              {errors.websiteUrl && (
                <p className="text-destructive text-sm mt-1 font-paragraph">{errors.websiteUrl.message}</p>
              )}
            </div>

            {/* Main Competitors */}
            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                Who are your main competitors?
              </label>
              <Textarea
                placeholder="List 2-3 of your main competitors or their websites"
                {...register('competitors', {
                  required: 'Please tell us about your competitors'
                })}
                className="w-full min-h-24"
              />
              {errors.competitors && (
                <p className="text-destructive text-sm mt-1 font-paragraph">{errors.competitors.message}</p>
              )}
            </div>

            {/* Goals and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  What are your main SEO goals?
                </label>
                <Textarea
                  placeholder="e.g., Increase organic traffic, improve rankings, generate leads"
                  {...register('goals', {
                    required: 'Please tell us your goals'
                  })}
                  className="w-full min-h-24"
                />
                {errors.goals && (
                  <p className="text-destructive text-sm mt-1 font-paragraph">{errors.goals.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  What's your timeline?
                </label>
                <Select onValueChange={(value) => setValue('timeline', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3-months">0-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="12-plus-months">12+ months</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register('timeline', { required: 'Timeline is required' })} />
                {errors.timeline && (
                  <p className="text-destructive text-sm mt-1 font-paragraph">{errors.timeline.message}</p>
                )}
              </div>
            </div>

            {/* Budget and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                  Planned SEO Budget
                </label>
                <Select onValueChange={(value) => setValue('budget', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1000">Under $1,000</SelectItem>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-plus">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register('budget', { required: 'Budget is required' })} />
                {errors.budget && (
                  <p className="text-destructive text-sm mt-1 font-paragraph">{errors.budget.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Target Location
                </label>
                <Input
                  type="text"
                  placeholder="e.g., United States, New York, Global"
                  {...register('targetLocation', {
                    required: 'Please tell us your target location'
                  })}
                  className="w-full"
                />
                {errors.targetLocation && (
                  <p className="text-destructive text-sm mt-1 font-paragraph">{errors.targetLocation.message}</p>
                )}
              </div>
            </div>

            {/* Preferred Contact Time */}
            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Preferred Contact Time
              </label>
              <Select onValueChange={(value) => setValue('contactTime', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning-9-12">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon-12-5">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening-5-8">Evening (5 PM - 8 PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register('contactTime', { required: 'Contact time is required' })} />
              {errors.contactTime && (
                <p className="text-destructive text-sm mt-1 font-paragraph">{errors.contactTime.message}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-heading font-semibold text-foreground mb-2">
                Anything else we should know?
              </label>
              <Textarea
                placeholder="Share any additional information about your business or SEO needs"
                {...register('notes')}
                className="w-full min-h-24"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-blue-700 text-white font-heading font-semibold py-3 text-lg rounded-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Get Your Free SEO Strategy'}
            </Button>
          </form>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-12 text-center">
          What Happens Next?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-0 bg-light-gray">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-6">
              <span className="text-white font-heading font-bold text-lg">1</span>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              We Review Your Information
            </h3>
            <p className="text-secondary font-paragraph">
              Our SEO experts analyze your website, competitors, and goals to understand your unique situation.
            </p>
          </Card>

          <Card className="p-8 border-0 bg-light-gray">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-6">
              <span className="text-white font-heading font-bold text-lg">2</span>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Schedule Your Consultation
            </h3>
            <p className="text-secondary font-paragraph">
              We'll reach out to schedule a 30-minute call at your preferred time to discuss your strategy.
            </p>
          </Card>

          <Card className="p-8 border-0 bg-light-gray">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-6">
              <span className="text-white font-heading font-bold text-lg">3</span>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Receive Your Custom Strategy
            </h3>
            <p className="text-secondary font-paragraph">
              Get a detailed, actionable SEO roadmap tailored to your business goals and budget.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-16 md:py-24 bg-light-gray rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://static.wixstatic.com/media/f650f9_7c1f3e0989f74eca9d352e16986eb49f~mv2.png?originWidth=448&originHeight=384"
              alt="Why Work With Us"
              width={500}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-8">
              Why Work With Us?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Proven Results
                  </h3>
                  <p className="text-secondary font-paragraph">
                    Our clients see an average 150% increase in organic traffic within 6 months.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Expert Team
                  </h3>
                  <p className="text-secondary font-paragraph">
                    Our SEO specialists have 10+ years of experience in digital marketing and search optimization.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Transparent Communication
                  </h3>
                  <p className="text-secondary font-paragraph">
                    We provide regular reports and keep you informed every step of the way.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Customized Approach
                  </h3>
                  <p className="text-secondary font-paragraph">
                    Every strategy is tailored to your specific industry, goals, and budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-16 md:py-24">
        <div className="bg-primary rounded-lg p-12 text-center">
          <h2 className="text-4xl font-heading font-bold text-white mb-6">
            Ready to Transform Your SEO?
          </h2>
          <p className="text-lg text-white font-paragraph mb-8 max-w-2xl mx-auto">
            Don't let your competitors outrank you. Get a free, personalized SEO strategy today.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary hover:bg-light-gray font-heading font-semibold py-3 px-8 text-lg rounded-lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
