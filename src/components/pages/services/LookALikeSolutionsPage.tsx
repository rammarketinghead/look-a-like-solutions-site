import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Phone, TrendingUp, Users, Target, CheckCircle2, ArrowRight, Mail, MessageSquare, Clock, Search, Zap, BarChart3, Share2, FileText, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { TrustedBusinesses } from '@/entities';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  businessType: string;
  message: string;
}

export default function LookALikeSolutionsPage() {
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trustedBusinesses, setTrustedBusinesses] = useState<TrustedBusinesses[]>([]);
  const [loadingLogos, setLoadingLogos] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<ContactFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      businessType: '',
      message: ''
    }
  });

  useEffect(() => {
    const fetchTrustedBusinesses = async () => {
      try {
        const result = await BaseCrudService.getAll<TrustedBusinesses>('trustedbusinesses');
        if (result && result.items) {
          setTrustedBusinesses(result.items);
        }
      } catch (error) {
        console.error('Error fetching trusted businesses:', error);
      } finally {
        setLoadingLogos(false);
      }
    };

    fetchTrustedBusinesses();
  }, []);

  const scrollToContactForm = () => {
    const contactSection = document.getElementById('contact-form-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await BaseCrudService.create('formsubmissions', {
        _id: crypto.randomUUID(),
        formType: 'Look A Like Solutions Inquiry',
        submitterName: data.fullName,
        submitterEmail: data.email,
        submitterPhone: data.phone,
        companyName: data.companyName,
        interestedService: data.businessType,
        message: data.message,
        submissionDate: new Date().toISOString(),
        submissionPageUrl: window.location.href,
      });
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
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
    viewport: { once: true },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                Get Visible. Get Calls. Get Growing.
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
                Stop being invisible online. Look A Like Solutions helps business owners like you get found by the right customers, turn them into qualified leads, and get the calls that actually matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  onHoverStart={() => setIsCtaHovered(true)}
                  onHoverEnd={() => setIsCtaHovered(false)}
                >
                  <Button
                    onClick={scrollToContactForm}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
                  >
                    Book Your Free Strategy Call
                    {isCtaHovered && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </motion.div>
                <Button
                  onClick={scrollToContactForm}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg rounded-lg font-heading"
                >
                  See Our Results
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-1">
                <Image
                  src="https://static.wixstatic.com/media/f650f9_bbf122e14f2747e481da047242f83d57~mv2.png"
                  alt="Digital marketing dashboard with analytics and growth metrics"
                  width={600}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* The Problem Section */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
              The Struggle Is Real
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl">
              We talk to business owners every day. They tell us the same story: they're working hard, but nobody's finding them online. Their ads aren't working. And worst of all? The phone isn't ringing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-red-500" />,
                title: "Online Invisibility",
                description: "Your competitors show up first. Your ideal customers never find you. You're losing business to people who are just better at being visible."
              },
              {
                icon: <Target className="w-12 h-12 text-red-500" />,
                title: "Wasted Ad Spend",
                description: "You're throwing money at ads that don't convert. You get clicks, but not the right kind. Lots of tire-kickers, zero serious prospects."
              },
              {
                icon: <Phone className="w-12 h-12 text-red-500" />,
                title: "No Quality Leads",
                description: "The phone used to ring. Now? Silence. Or worse, you get inquiries from people who can't afford you or aren't a good fit."
              }
            ].map((problem, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="bg-slate-50 p-8 rounded-xl border border-slate-200"
              >
                <div className="mb-4">{problem.icon}</div>
                <h3 className="font-heading text-xl mb-3 text-slate-900">{problem.title}</h3>
                <p className="font-paragraph text-slate-600 leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-lg">
            <p className="font-paragraph text-lg text-slate-800">
              <span className="font-bold">Here's the thing:</span> This isn't about working harder. It's about working smarter. It's about being strategic with your visibility, your ads, and your lead generation. And that's exactly what we do.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Button
              onClick={scrollToContactForm}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
            >
              Let's Fix Your Visibility
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-16">

          </motion.div>
        </div>
      </section>
      {/* What We Do Section */}
      <section className="w-full py-20 md:py-28 bg-slate-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
              How We Fix It
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl">
              Look A Like Solutions uses a proven three-step approach to turn your invisibility into visibility, and visibility into calls.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                number: "01",
                title: "Strategic Visibility",
                description: "We make sure you show up where your customers are looking. Through smart SEO, targeted search ads, and strategic positioning, we get you in front of the right people at the right time. No more hiding in the shadows.",
                benefits: ["Higher search rankings", "Targeted ad placement", "Right audience, right time"],
                image: "https://static.wixstatic.com/media/f650f9_d81afce18e134223a6774b87aa0005b7~mv2.png",
                imageAlt: "SEO optimization concept with search results and ranking improvements"
              },
              {
                number: "02",
                title: "Lead Generation That Works",
                description: "Visibility is only half the battle. We turn that visibility into actual leads. Through optimized landing pages, strategic campaigns, and smart targeting, we bring qualified prospects to your door—people who are actually interested in what you offer.",
                benefits: ["Qualified leads only", "Higher conversion rates", "Lower cost per lead"],
                image: "https://static.wixstatic.com/media/f650f9_04674e2fa77a4949a9b24a7579327862~mv2.png",
                imageAlt: "Lead generation funnel visualization with conversion metrics"
              },
              {
                number: "03",
                title: "Calls and Conversions",
                description: "At the end of the day, you need calls. We structure everything—from ad copy to landing pages to follow-up—to get the phone ringing with serious prospects ready to do business. We measure success by your results, not just clicks.",
                benefits: ["More phone calls", "Better-qualified prospects", "Higher close rates"],
                image: "https://static.wixstatic.com/media/f650f9_fa5d8866300347c89f792235a718f326~mv2.png",
                imageAlt: "Success metrics dashboard showing increased calls and revenue growth"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
              >
                <div className="lg:col-span-1">
                  <div className="text-6xl font-heading text-blue-600 mb-4">{step.number}</div>
                  <h3 className="font-heading text-2xl md:text-3xl text-slate-900 mb-4">{step.title}</h3>
                </div>
                <div className="lg:col-span-2">
                  <p className="font-paragraph text-lg text-slate-700 mb-6 leading-relaxed">{step.description}</p>
                  <div className="space-y-3 mb-8">
                    {step.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="font-paragraph text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Button
              onClick={scrollToContactForm}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
            >
              Get Your Custom Strategy
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Success Stories Section */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
              Real Results. Real Businesses.
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl">
              Don't just take our word for it. Here's what we've done for businesses like yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                business: "Local HVAC Company",
                challenge: "Invisible in search results. Losing jobs to bigger competitors.",
                result: "Ranked #1 for key service areas. 3x increase in qualified calls within 4 months.",
                metric: "+340% calls"
              },
              {
                business: "Digital Marketing Agency",
                challenge: "Ad spend was high, but lead quality was poor. Lots of tire-kickers.",
                result: "Refined targeting and messaging. Cut ad spend by 30% while increasing qualified leads by 50%.",
                metric: "50% more leads, 30% less spend"
              },
              {
                business: "Home Services Contractor",
                challenge: "Seasonal business with unpredictable lead flow. Needed consistent pipeline.",
                result: "Built predictable lead generation system. Now books 2-3 months out consistently.",
                metric: "Booked 3 months ahead"
              },
              {
                business: "B2B Consulting Firm",
                challenge: "Struggling to reach decision-makers. Generic ads weren't working.",
                result: "Strategic positioning and targeted campaigns. Now getting 5-7 qualified inquiries per week.",
                metric: "5-7 qualified leads/week"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-blue-400 transition-colors"
              >
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-heading">
                    {story.business}
                  </span>
                </div>
                <div className="mb-6">
                  <h4 className="font-heading text-sm text-slate-600 mb-2">THE CHALLENGE</h4>
                  <p className="font-paragraph text-slate-800">{story.challenge}</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-heading text-sm text-slate-600 mb-2">THE RESULT</h4>
                  <p className="font-paragraph text-slate-800">{story.result}</p>
                </div>
                <div className="pt-6 border-t border-slate-300">
                  <p className="font-heading text-2xl text-green-600">{story.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Button
              onClick={scrollToContactForm}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
            >
              Start Your Success Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Why Look A Like Solutions Section */}
      <section className="w-full py-20 md:py-28 bg-slate-900 text-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Why Look A Like Solutions?
            </h2>
            <p className="font-paragraph text-lg text-slate-300 max-w-3xl">
              There are a lot of agencies out there. Here's what makes us different.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Results-First Mindset",
                description: "We don't care about vanity metrics. We care about calls, leads, and revenue. Everything we do is measured by your bottom line."
              },
              {
                title: "Strategic, Not Just Tactical",
                description: "We don't just run ads. We build a complete strategy—visibility, lead generation, conversion optimization. We think like your business partner, not just a vendor."
              },
              {
                title: "Tailored to Your Business",
                description: "No cookie-cutter campaigns. We take time to understand your business, your customers, and your goals. Then we build a strategy that actually fits."
              },
              {
                title: "Partnership Mentality",
                description: "Your success is our success. We're invested in your growth. You'll work with real people who care about your results, not a faceless agency."
              }
            ].map((reason, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700"
              >
                <h3 className="font-heading text-xl mb-3">{reason.title}</h3>
                <p className="font-paragraph text-slate-300 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-xl mb-12">
            <p className="font-paragraph text-lg text-white">
              <span className="font-bold">Bottom line:</span> We're not here to be your agency. We're here to be your growth partner. We succeed when you succeed.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-12">

          </motion.div>

          <motion.div {...fadeInUp} className="text-center">
            <Button
              onClick={scrollToContactForm}
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-lg font-heading"
            >
              Let's Become Growth Partners
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Ready to Get Visible and Get Growing?
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop spinning your wheels. Let's build a strategy that actually gets you calls from customers who want to buy. Book a free 30-minute strategy call with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContactForm}
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-lg font-heading"
              >
                Book Your Free Strategy Call
              </Button>
              <Button
                onClick={scrollToContactForm}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-blue-700 px-8 py-6 text-lg rounded-lg font-heading"
              >
                Get a Growth Blueprint
              </Button>
            </div>
            <p className="font-paragraph text-blue-100 mt-8 text-sm">
              No credit card required. No sales pitch. Just a real conversation about your business and how we can help.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="w-full py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Businesses Helped" },
              { number: "340%", label: "Avg. Call Increase" },
              { number: "8 Years", label: "Industry Experience" },
              { number: "100%", label: "Results-Focused" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
              >
                <p className="font-heading text-3xl md:text-4xl text-blue-600 mb-2">{stat.number}</p>
                <p className="font-paragraph text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Trusted Brands Section */}
      {!loadingLogos && trustedBusinesses.length > 0 && (
        <section className="w-full py-16 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl mb-4 text-slate-900">
                Trusted by Leading Brands
              </h2>
              <p className="font-paragraph text-lg text-slate-600 max-w-2xl mx-auto">
                We've helped these businesses get more visibility, leads, and revenue
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center"
            >
              {trustedBusinesses.slice(0, 10).map((business, index) => (
                <motion.div
                  key={business._id}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: (index % 5) * 0.1 }}
                  className="flex items-center justify-center h-24 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 p-4"
                >
                  {business.brandLogo ? (
                    <Image
                      src={business.brandLogo}
                      alt={business.brandName || 'Brand logo'}
                      width={120}
                      className="max-h-16 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-heading text-sm text-slate-600 text-center">
                      {business.brandName}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
      {/* Digital Marketing Services Section */}
      <section className="w-full py-20 md:py-28 bg-slate-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
              Our Digital Marketing Services
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl">
              We offer a complete suite of digital marketing services designed to help you achieve your business goals. From visibility to conversions, we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-10 h-10 text-blue-600" />,
                title: "SEO Optimization",
                description: "Rank higher on Google and get found by customers searching for your services. We optimize your website for maximum visibility.",
                benefits: ["Higher search rankings", "Organic traffic growth", "Long-term results"]
              },
              {
                icon: <Zap className="w-10 h-10 text-blue-600" />,
                title: "Paid Advertising",
                description: "Get instant visibility with Google Ads and Facebook Ads. We manage campaigns to maximize ROI and minimize wasted spend.",
                benefits: ["Immediate traffic", "Targeted audience", "Measurable results"]
              },
              {
                icon: <Share2 className="w-10 h-10 text-blue-600" />,
                title: "Social Media Marketing",
                description: "Build your brand presence and engage with customers on social platforms. We create content that converts followers into customers.",
                benefits: ["Brand awareness", "Customer engagement", "Community building"]
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
                title: "Data Analytics",
                description: "Know exactly what's working and where to invest your budget. We provide detailed insights and actionable recommendations.",
                benefits: ["Performance tracking", "Data-driven decisions", "ROI optimization"]
              },
              {
                icon: <FileText className="w-10 h-10 text-blue-600" />,
                title: "Content Marketing",
                description: "Attract and convert customers with valuable, SEO-optimized content. We create content that ranks and converts.",
                benefits: ["Thought leadership", "Lead generation", "Customer education"]
              },
              {
                icon: <Smartphone className="w-10 h-10 text-blue-600" />,
                title: "Conversion Optimization",
                description: "Double your sales without spending more on ads. We optimize your website and funnels to increase conversions.",
                benefits: ["Higher conversion rates", "Better user experience", "Increased revenue"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: (index % 3) * 0.1 }}
                className="bg-white p-8 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-blue-50 rounded-lg w-fit">
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl mb-3 text-slate-900">{service.title}</h3>
                <p className="font-paragraph text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="font-paragraph text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-xl border border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading text-2xl text-slate-900 mb-2">
                  Need a Custom Solution?
                </h3>
                <p className="font-paragraph text-slate-600">
                  We can combine these services to create a tailored strategy for your specific business goals.
                </p>
              </div>
              <Button
                onClick={scrollToContactForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-heading whitespace-nowrap"
              >
                Get Custom Strategy
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
              Our Process
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl">
              We follow a proven methodology to ensure your success. Here's exactly how we work with you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Discovery Call",
                description: "We learn about your business, goals, and challenges. No pressure, just a real conversation.",
                icon: <Phone className="w-8 h-8 text-blue-600" />
              },
              {
                step: "2",
                title: "Strategy Development",
                description: "We analyze your market, competitors, and opportunities. Then we build a custom strategy.",
                icon: <TrendingUp className="w-8 h-8 text-blue-600" />
              },
              {
                step: "3",
                title: "Implementation",
                description: "We execute the strategy across visibility, ads, and lead generation channels.",
                icon: <Target className="w-8 h-8 text-blue-600" />
              },
              {
                step: "4",
                title: "Optimization & Growth",
                description: "We monitor, measure, and continuously optimize to maximize your results.",
                icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-3xl font-heading text-slate-300">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-lg mb-3 text-slate-900">{item.title}</h3>
                  <p className="font-paragraph text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Button
              onClick={scrollToContactForm}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
            >
              Start Your Discovery Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full py-20 md:py-28 bg-slate-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="font-paragraph text-lg text-slate-600 max-w-3xl">
              Got questions? We've got answers. Here are the most common questions we hear.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                question: "How long does it take to see results?",
                answer: "Most clients start seeing meaningful results within 4-8 weeks. Some see improvements in 2-3 weeks. It depends on your industry, competition, and starting point. We'll give you realistic timelines during your strategy call."
              },
              {
                question: "What if I'm already working with another agency?",
                answer: "No problem. We can work alongside your current team or take over completely. We're flexible and focused on what works best for your business. Let's discuss your situation."
              },
              {
                question: "How much does this cost?",
                answer: "Our pricing varies based on your goals, industry, and the scope of work. We offer flexible packages starting at different price points. We'll discuss investment during your free strategy call."
              },
              {
                question: "Do you guarantee results?",
                answer: "We guarantee effort and expertise. We can't guarantee specific results (no honest agency can), but we do guarantee we'll work hard and measure everything. If it's not working, we'll pivot."
              },
              {
                question: "What industries do you work with?",
                answer: "We work with service-based businesses, contractors, consultants, agencies, and more. If you're a B2B or B2C business that needs leads, we can likely help."
              },
              {
                question: "Can you help if I have a small budget?",
                answer: "Yes. We work with businesses of all sizes. We'll be honest about what's possible with your budget and help you get the best ROI possible."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: (index % 2) * 0.1 }}
                className="bg-white p-8 rounded-xl border border-slate-200"
              >
                <h3 className="font-heading text-lg mb-4 text-slate-900 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="font-paragraph text-slate-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Button
              onClick={scrollToContactForm}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
            >
              Have More Questions? Let's Talk
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section id="contact-form-section" className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeInUp}>
              <h2 className="font-heading text-4xl md:text-5xl mb-6 text-slate-900">
                Ready to Get Started?
              </h2>
              <p className="font-paragraph text-lg text-slate-600 mb-8 leading-relaxed">
                Fill out the form and we'll reach out within 24 hours to schedule your free strategy call. No commitment, no pressure—just a real conversation about your business and how we can help you get more calls and grow your revenue.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: <Clock className="w-6 h-6 text-blue-600" />,
                    title: "Quick Response",
                    description: "We respond within 24 hours"
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-blue-600" />,
                    title: "No Spam",
                    description: "We respect your inbox"
                  },
                  {
                    icon: <Users className="w-6 h-6 text-blue-600" />,
                    title: "Real People",
                    description: "You'll talk to actual humans"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="font-heading text-slate-900 mb-1">{benefit.title}</h4>
                      <p className="font-paragraph text-slate-600 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="font-paragraph text-slate-800">
                  <span className="font-bold">Why fill out this form?</span> This helps us understand your specific situation so we can provide personalized recommendations during your strategy call. We'll know exactly what challenges you're facing and can come prepared with solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-xl border border-slate-200"
            >
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="font-paragraph text-green-800">
                    ✓ Thank you! We'll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="font-heading text-sm text-slate-900 block mb-2">
                    Full Name *
                  </label>
                  <Input
                    {...register('fullName', { required: 'Name is required' })}
                    placeholder="John Doe"
                    className="w-full"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-heading text-sm text-slate-900 block mb-2">
                    Email *
                  </label>
                  <Input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-heading text-sm text-slate-900 block mb-2">
                    Phone Number *
                  </label>
                  <Input
                    {...register('phone', { required: 'Phone is required' })}
                    placeholder="(555) 123-4567"
                    className="w-full"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-heading text-sm text-slate-900 block mb-2">
                    Company Name *
                  </label>
                  <Input
                    {...register('companyName', { required: 'Company name is required' })}
                    placeholder="Your Company"
                    className="w-full"
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-heading text-sm text-slate-900 block mb-2">
                    Business Type *
                  </label>
                  <Select defaultValue="">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hvac">HVAC/Home Services</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="legal">Legal Services</SelectItem>
                      <SelectItem value="medical">Medical/Dental</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register('businessType', { required: 'Business type is required' })}
                  />
                </div>

                <div>
                  <label className="font-heading text-sm text-slate-900 block mb-2">
                    Tell us about your goals
                  </label>
                  <Textarea
                    {...register('message')}
                    placeholder="What are you hoping to achieve? What's your biggest challenge right now?"
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-heading text-base"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Your Free Strategy Call'}
                </Button>

                <p className="font-paragraph text-xs text-slate-500 text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
