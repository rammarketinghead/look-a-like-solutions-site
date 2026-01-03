import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Phone, TrendingUp, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LookALikeSolutionsPage() {
  const [isCtaHovered, setIsCtaHovered] = useState(false);

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
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg font-heading"
                  >
                    Book Your Free Strategy Call
                    {isCtaHovered && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </motion.div>
                <Button
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
                <div className="bg-slate-800 rounded-xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-24 h-24 mx-auto text-blue-400 mb-4" />
                    <p className="text-slate-300 font-paragraph">Real Results for Real Businesses</p>
                  </div>
                </div>
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
                benefits: ["Higher search rankings", "Targeted ad placement", "Right audience, right time"]
              },
              {
                number: "02",
                title: "Lead Generation That Works",
                description: "Visibility is only half the battle. We turn that visibility into actual leads. Through optimized landing pages, strategic campaigns, and smart targeting, we bring qualified prospects to your door—people who are actually interested in what you offer.",
                benefits: ["Qualified leads only", "Higher conversion rates", "Lower cost per lead"]
              },
              {
                number: "03",
                title: "Calls and Conversions",
                description: "At the end of the day, you need calls. We structure everything—from ad copy to landing pages to follow-up—to get the phone ringing with serious prospects ready to do business. We measure success by your results, not just clicks.",
                benefits: ["More phone calls", "Better-qualified prospects", "Higher close rates"]
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
                  <div className="space-y-3">
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

          <motion.div {...fadeInUp} className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-xl">
            <p className="font-paragraph text-lg text-white">
              <span className="font-bold">Bottom line:</span> We're not here to be your agency. We're here to be your growth partner. We succeed when you succeed.
            </p>
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
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-lg font-heading"
              >
                Book Your Free Strategy Call
              </Button>
              <Button
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
    </div>
  );
}
