import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SEOHead } from '@/components/ui/seo-head';
import { BaseCrudService } from '@/integrations';
import { FormSubmissions } from '@/entities';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Coffee, 
  CheckCircle, 
  Award,
  Target,
  TrendingUp,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function GoogleAdsTrainingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [spotsRemaining] = useState(7); // Update this manually as spots fill

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const submission: FormSubmissions = {
      _id: crypto.randomUUID(),
      formType: 'Google Ads Training - First Batch',
      submitterName: formData.name,
      submitterEmail: formData.email,
      submitterPhone: formData.phone,
      companyName: formData.company,
      message: `Role: ${formData.role}\nExperience: ${formData.experience}\n\nAdditional Info: ${formData.message}`,
      submissionDate: new Date().toISOString(),
      submissionPageUrl: window.location.href
    };

    await BaseCrudService.create('formsubmissions', submission);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      experience: '',
      message: ''
    });
    
    // Redirect to thank you page after 1 second
    setTimeout(() => {
      navigate('/thank-you');
    }, 1000);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Google Ads Training Program - First Batch | Look A Like Solutions"
        description="Join the exclusive first batch of our Google Ads Training Program in Bangalore. Limited to 10 SEO and digital marketing executives. Free session with lunch included."
        keywords="Google Ads training Bangalore, PPC training, digital marketing training, Google Ads course, free marketing workshop"
        type="website"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-light-gray overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm md:text-base font-medium">
                <Sparkles className="h-4 w-4" />
                First Batch - Limited to 10 Participants
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-dark-gray mb-6 leading-tight">
              Master Google Ads with
              <span className="text-primary"> Expert-Led Training</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              A personal invitation to SEO and digital marketing executives in Bangalore who want to truly understand Google Ads strategy, optimization, and ROI.
            </p>

            {/* Urgency Indicator */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-dark-gray font-medium">Only {spotsRemaining} spots remaining</span>
              </div>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Users, label: '10 People Only', color: 'text-blue-600' },
                { icon: Calendar, label: 'This Sunday', color: 'text-green-600' },
                { icon: Clock, label: '2-3 Hours', color: 'text-purple-600' },
                { icon: Coffee, label: 'Lunch Included', color: 'text-orange-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm"
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="text-xs md:text-sm text-dark-gray font-medium text-center">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes This Special */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why This is Different
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-dark-gray mb-4">
              This Isn&apos;t Just Another Workshop
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              We&apos;re launching our first-ever Google Ads training program, and we want to make it exceptional. That&apos;s why we&apos;re keeping it intimate, practical, and completely free.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                icon: Users,
                title: 'Small, Focused Group',
                description: 'Limited to just 10 participants so everyone gets personal attention and can ask questions freely.',
                color: 'bg-blue-500'
              },
              {
                icon: Award,
                title: 'Expert-Led Session',
                description: 'Learn from practitioners who manage real Google Ads campaigns with proven ROI for businesses.',
                color: 'bg-purple-500'
              },
              {
                icon: Target,
                title: 'Practical, Not Theory',
                description: 'Real campaign examples, live optimization techniques, and actionable strategies you can use Monday.',
                color: 'bg-green-500'
              },
              {
                icon: TrendingUp,
                title: 'Strategy-Focused',
                description: 'Beyond button-clicking. Understand bidding strategies, audience targeting, and conversion optimization.',
                color: 'bg-orange-500'
              },
              {
                icon: Coffee,
                title: 'Premium Experience',
                description: 'Comfortable venue, quality lunch, and networking with fellow marketing professionals.',
                color: 'bg-red-500'
              },
              {
                icon: Sparkles,
                title: 'Completely Free',
                description: 'No catch, no upsell. This is our way of giving back to the Bangalore marketing community.',
                color: 'bg-indigo-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                className="group"
              >
                <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-white">
                  <CardContent className="p-6 md:p-8">
                    <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-heading text-dark-gray mb-3">{feature.title}</h3>
                    <p className="text-base text-secondary leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Session Agenda
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-dark-gray mb-4">
                What You&apos;ll Walk Away With
              </h2>
              <p className="text-lg text-secondary">
                2-3 hours of focused, practical training covering everything you need to run successful Google Ads campaigns.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Campaign structure and setup best practices for maximum performance',
                'Keyword research strategies that actually drive qualified traffic',
                'Bidding strategies explained: When to use Manual CPC, Target CPA, Maximize Conversions',
                'Ad copywriting techniques that improve click-through rates',
                'Quality Score optimization and why it matters for your budget',
                'Conversion tracking setup and attribution models',
                'Audience targeting: In-market, affinity, and custom intent audiences',
                'Negative keywords strategy to reduce wasted spend',
                'Campaign optimization: What to monitor daily, weekly, and monthly',
                'Real campaign examples with actual performance data'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base text-dark-gray">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Details */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Event Details
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-dark-gray mb-4">
                Mark Your Calendar
              </h2>
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-primary/5">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading text-dark-gray mb-1">Date</h3>
                        <p className="text-base text-secondary">This Sunday, 1:00 PM</p>
                        <p className="text-sm text-secondary mt-1">Venue details shared Saturday evening</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading text-dark-gray mb-1">Duration</h3>
                        <p className="text-base text-secondary">2-3 hours of focused training</p>
                        <p className="text-sm text-secondary mt-1">Plus networking time over lunch</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading text-dark-gray mb-1">Location</h3>
                        <p className="text-base text-secondary">Bangalore (Central location)</p>
                        <p className="text-sm text-secondary mt-1">Exact venue shared after registration</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Coffee className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading text-dark-gray mb-1">What&apos;s Included</h3>
                        <p className="text-base text-secondary">Quality lunch & refreshments</p>
                        <p className="text-sm text-secondary mt-1">Training materials & resources</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-dark-gray">
                      <strong>Important:</strong> Venue address will be shared via email on Saturday evening to confirmed participants. Please ensure your contact details are correct.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading text-dark-gray mb-4">
                Is This For You?
              </h2>
              <p className="text-lg text-secondary">
                This training is designed for marketing professionals who want to level up their Google Ads expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Perfect If You Are:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'SEO or digital marketing executive',
                      'Marketing manager exploring paid channels',
                      'Business owner managing your own ads',
                      'Agency professional wanting to upskill',
                      "Someone who's tried Google Ads but struggled with ROI"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-base text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading text-dark-gray mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    You&apos;ll Get Most Value If:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'You have basic digital marketing knowledge',
                      "You're based in or around Bangalore",
                      'You can commit to the full 2-3 hour session',
                      "You're ready to implement what you learn",
                      'You want to network with fellow marketers'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-base text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Reserve Your Spot
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-dark-gray mb-4">
                Join the First Batch
              </h2>
              <p className="text-lg text-secondary">
                Fill out the form below to secure one of the {spotsRemaining} remaining spots. We&apos;ll confirm your registration within 24 hours.
              </p>
            </div>

            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8 md:p-12">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading text-dark-gray mb-4">
                      Registration Received!
                    </h3>
                    <p className="text-lg text-secondary mb-6">
                      Thank you for your interest! We&apos;ll review your application and send you a confirmation email within 24 hours.
                    </p>
                    <p className="text-base text-secondary">
                      The venue details will be shared on Saturday evening via email.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-dark-gray mb-2 block">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-dark-gray mb-2 block">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@company.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-dark-gray mb-2 block">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company" className="text-dark-gray mb-2 block">
                          Company Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="role" className="text-dark-gray mb-2 block">
                          Current Role <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="role"
                          name="role"
                          type="text"
                          required
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="e.g., SEO Executive, Marketing Manager"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor="experience" className="text-dark-gray mb-2 block">
                          Experience with Google Ads <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="experience"
                          name="experience"
                          type="text"
                          required
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g., Beginner, Intermediate"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-dark-gray mb-2 block">
                        Why do you want to attend? (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us what you hope to learn or achieve from this training..."
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-medium"
                      >
                        {isSubmitting ? (
                          'Submitting...'
                        ) : (
                          <>
                            Reserve My Spot
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-sm text-secondary text-center mt-4">
                      By registering, you agree to receive email communication about this event. We respect your privacy and won&apos;t spam you.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading text-dark-gray mb-4">
                Common Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'Is this really free?',
                  answer: 'Yes, completely free. No hidden costs, no upsells. This is our inaugural batch and we want to make it accessible to the Bangalore marketing community.'
                },
                {
                  question: 'Why only 10 people?',
                  answer: "We believe in quality over quantity. A small group allows for personalized attention, meaningful discussions, and the ability to answer everyone's specific questions."
                },
                {
                  question: "What if I'm a complete beginner?",
                  answer: "Perfect! We'll start with fundamentals and build up. The session is designed to be valuable whether you're just starting or have some experience but want to improve your results."
                },
                {
                  question: 'Will I get any materials or resources?',
                  answer: "Yes, you'll receive training materials, templates, and resources that you can use to implement what you learn."
                },
                {
                  question: "What if I can't make it on Sunday?",
                  answer: "We understand schedules can be tight. If you register but can't attend, please let us know ASAP so we can offer your spot to someone on the waitlist."
                },
                {
                  question: 'Will there be more batches?',
                  answer: "Based on the response to this first batch, we plan to run more sessions. However, this is the first one, so it's a unique opportunity to be part of the inaugural group."
                }
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg font-heading text-dark-gray mb-3">{faq.question}</h3>
                    <p className="text-base text-secondary leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark-gray to-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
                Don&apos;t Miss This Opportunity
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Join us this Sunday for an intimate, expert-led session that could transform how you approach Google Ads. Only {spotsRemaining} spots left.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#reserve-spot" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium">
                    Reserve Your Spot Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                Questions? Email us at contact@lookalikesolutions.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
