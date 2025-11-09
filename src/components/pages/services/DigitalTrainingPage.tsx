import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FAQSection } from '@/components/ui/faq-section';
import { ServiceContactForm } from '@/components/ui/service-contact-form';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, TrendingUp, Target, CheckCircle, BarChart3, Clock, DollarSign, Users, Award, Zap, Settings, Book, Video } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const scrollToContact = () => {
  const contactSection = document.getElementById('contact-form');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function DigitalTrainingPage() {
  const trainingFAQs = [
    {
      question: "Who should attend digital marketing training?",
      answer: "Our training is perfect for business owners, marketing professionals, entrepreneurs, students, and anyone looking to enhance their digital marketing skills. We offer different levels from beginner to advanced, so no prior experience is required for entry-level courses."
    },
    {
      question: "Are the training sessions conducted online or offline?",
      answer: "We offer both online and offline training options. Online sessions are conducted via Zoom with interactive elements, while offline sessions are held at our Bengaluru office or your location for corporate training. All sessions include hands-on practical exercises."
    },
    {
      question: "Do you provide certificates upon completion?",
      answer: "Yes! All participants receive a certificate of completion from Look A Like Solutions. Our advanced courses also include industry-recognized certifications from Google, Facebook, and other platforms as part of the curriculum."
    },
    {
      question: "What is included in the training materials?",
      answer: "Training includes comprehensive course materials, video recordings of sessions, practical worksheets, case studies, templates, tools access, and ongoing support. You'll also get access to our private community for continued learning and networking."
    },
    {
      question: "Do you offer customized training for companies?",
      answer: "Absolutely! We provide customized corporate training programs tailored to your team's needs and industry. This includes on-site training, specific use cases, and integration with your existing marketing tools and processes."
    },
    {
      question: "What support is available after the training?",
      answer: "We provide 3 months of post-training support including Q&A sessions, email support, access to updated materials, and invitations to our monthly digital marketing workshops. Advanced course participants also get 1-on-1 consultation sessions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-primary/5 via-background to-light-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23007BFF%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="max-w-[100rem] mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-paragraph mb-6">
                <GraduationCap className="h-4 w-4 mr-2" />
                Digital Marketing Training Service
              </div>
              <h1 className="text-6xl font-heading text-dark-gray mb-8 leading-tight">
                Master Digital Marketing with 
                <span className="text-primary block">Expert Training</span>
              </h1>
              <p className="text-xl font-paragraph text-secondary mb-12 leading-relaxed">
                Empower yourself and your team with comprehensive digital marketing training. Learn from industry experts and gain practical skills to drive real business results in today's digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg transition-all duration-300"
                  onClick={scrollToContact}
                >
                  View Course Curriculum
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { number: '500+', label: 'Students Trained' },
                  { number: '95%', label: 'Satisfaction Rate' },
                  { number: '20+', label: 'Industry Experts' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-heading text-primary mb-2">{stat.number}</div>
                    <div className="text-sm font-paragraph text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-light-gray">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <Image
                  src="https://static.wixstatic.com/media/f650f9_84f9e50e5d654495a58ae6a7cd30b7c7~mv2.png?originWidth=576&originHeight=384"
                  alt="Digital Marketing Training Session"
                  width={600}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-blue-600 mb-1">40hrs</div>
                    <div className="text-sm font-paragraph text-blue-700">Training Duration</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-heading text-green-600 mb-1">100%</div>
                    <div className="text-sm font-paragraph text-green-700">Practical Learning</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">
                Practical Digital Marketing Education
              </h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                Our training programs combine theoretical knowledge with hands-on practical experience. Learn from industry experts who have successfully managed campaigns for hundreds of businesses and stay updated with the latest digital marketing trends.
              </p>
              <div className="space-y-4">
                {[
                  'Comprehensive curriculum covering all digital channels',
                  'Hands-on practical exercises and real projects',
                  'Industry-recognized certifications included',
                  'Small batch sizes for personalized attention',
                  'Ongoing support and mentorship'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="font-paragraph text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_930cc047531e46ae8601d3e94277d576~mv2.png?originWidth=576&originHeight=384"
                alt="Digital marketing training curriculum and methodology"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Training Modules</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Comprehensive curriculum covering all aspects of modern digital marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Digital Strategy',
                description: 'Learn to develop comprehensive digital marketing strategies aligned with business goals.'
              },
              {
                icon: BarChart3,
                title: 'SEO & SEM',
                description: 'Master search engine optimization and search engine marketing techniques.'
              },
              {
                icon: Users,
                title: 'Social Media Marketing',
                description: 'Create engaging social media campaigns across all major platforms.'
              },
              {
                icon: Zap,
                title: 'Paid Advertising',
                description: 'Learn Google Ads, Facebook Ads, and other paid advertising platforms.'
              },
              {
                icon: Book,
                title: 'Content Marketing',
                description: 'Develop content strategies that engage audiences and drive conversions.'
              },
              {
                icon: Settings,
                title: 'Analytics & Optimization',
                description: 'Use data to measure performance and optimize marketing campaigns.'
              }
            ].map((module, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <module.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-dark-gray mb-4">{module.title}</h3>
                  <p className="font-paragraph text-secondary">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Training Packages</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Professional digital marketing training programs for individuals and teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Foundation Course',
                price: '₹25,000',
                period: 'per person',
                description: 'Essential digital marketing skills for beginners',
                features: [
                  '20 hours of training',
                  'Digital marketing fundamentals',
                  'Basic SEO & social media',
                  'Course materials included',
                  'Certificate of completion',
                  '1 month support'
                ],
                popular: false
              },
              {
                name: 'Professional Course',
                price: '₹50,000',
                period: 'per person',
                description: 'Comprehensive training for marketing professionals',
                features: [
                  '40 hours of training',
                  'All digital marketing channels',
                  'Hands-on practical projects',
                  'Industry certifications',
                  'Advanced analytics training',
                  'Job placement assistance',
                  '3 months support',
                  'Access to tools & resources'
                ],
                popular: true
              },
              {
                name: 'Corporate Training',
                price: '₹2,00,000',
                period: 'per batch',
                description: 'Customized training for corporate teams',
                features: [
                  'Customized curriculum',
                  'On-site or online delivery',
                  'Up to 15 participants',
                  'Industry-specific case studies',
                  'Advanced strategy sessions',
                  'Ongoing consultation',
                  '6 months support',
                  'Team performance tracking',
                  'Custom certification'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-heading">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-heading text-dark-gray mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl font-heading text-primary">{plan.price}</span>
                      <span className="text-secondary font-paragraph ml-1">/{plan.period}</span>
                    </div>
                    <p className="font-paragraph text-secondary">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="font-paragraph text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToContact}
                    className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background text-primary border border-primary hover:bg-primary hover:text-primary-foreground'}`}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="font-paragraph text-secondary mb-4">
              Need customized training for your specific requirements? We create tailored programs for unique business needs.
            </p>
            <Button 
              onClick={scrollToContact}
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Request Custom Training
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={trainingFAQs}
        title="Digital Marketing Training FAQ"
        description="Get answers to common questions about our digital marketing training programs."
      />

      {/* Contact Form Section */}
      <div id="contact-form">
        <ServiceContactForm 
          serviceName="Digital Marketing Training"
          serviceDescription="Let's discuss how our training programs can help you or your team master digital marketing skills and drive business growth."
        />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Master Digital Marketing?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Join our comprehensive training program and gain the skills needed to succeed in today's digital marketing landscape.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/case-studies">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Student Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}