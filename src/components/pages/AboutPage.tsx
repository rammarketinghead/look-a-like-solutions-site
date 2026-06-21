import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SEOHead } from '@/components/ui/seo-head';
import { TrustedBusinessesCarousel } from '@/components/ui/trusted-businesses-carousel';
import { NewsletterSection } from '@/components/ui/newsletter-section';
import { BaseCrudService } from '@/integrations';
import { TeamMembers, JobOpenings } from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Award, Linkedin, Calendar, MapPin, Clock, Heart, TrendingUp, Lightbulb, Shield, Zap, CheckCircle } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpenings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, jobsData] = await Promise.all([
          BaseCrudService.getAll<TeamMembers>('teammembers'),
          BaseCrudService.getAll<JobOpenings>('jobopenings')
        ]);
        
        setTeamMembers(teamData.items);
        setJobOpenings(jobsData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Us - Digital Marketing Experts in Bengaluru"
        description="Learn about Look A Like Solutions, a leading digital marketing agency in Bengaluru. Meet our expert team and discover our mission to help businesses grow online with innovative strategies."
        keywords="about Look A Like Solutions, digital marketing team Bengaluru, digital marketing experts, about us, company profile, digital marketing agency team"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-light-gray to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="mobile-container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium">
                Your Digital Growth Partner
              </span>
            </motion.div>
            
            <h1 className="mobile-h1 text-dark-gray mb-6">
              Transforming Businesses Through
              <span className="text-primary"> Digital Excellence</span>
            </h1>
            
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto mb-8">
              We are a passionate team of digital marketing experts based in Bengaluru, dedicated to helping businesses thrive in the digital landscape through innovative strategies and data-driven results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <Button className="mobile-btn-primary">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="#team">
                <Button variant="outline" className="mobile-btn-secondary">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <Image
                  src="https://static.wixstatic.com/media/f650f9_3aa7d396a63c432b87bd77c6eef38128~mv2.png?originWidth=576&originHeight=384"
                  alt="Our agency story and journey"
                  width={600}
                  className="w-full h-auto rounded-2xl shadow-lg relative z-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="mobile-h2 text-dark-gray mb-6">
                Building Digital Success Stories Since Day One
              </h2>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  Look A Like Solutions was born from a simple belief: every business deserves a powerful digital presence. What started as a small team of passionate marketers in Bengaluru has grown into a full-service digital marketing agency trusted by businesses across India.
                </p>
                <p className="mobile-body text-secondary">
                  We've helped hundreds of businesses transform their online presence, from startups finding their voice to established brands reaching new heights. Our approach combines cutting-edge technology with creative storytelling, always keeping your business goals at the center.
                </p>
                <p className="mobile-body text-secondary">
                  Today, we're proud to be recognized as one of Bengaluru's leading digital marketing agencies, but what drives us isn't awards—it's the success stories we create with our clients every single day.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                {[
                  { number: '150+', label: 'Projects Completed' },
                  { number: '98%', label: 'Client Satisfaction' },
                  { number: '5+', label: 'Team Members' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mobile-h3 text-primary font-bold mb-1">{stat.number}</div>
                    <div className="mobile-body-sm text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="mobile-h2 text-dark-gray mb-4">
              What Drives Us Forward
            </h2>
            <p className="mobile-body text-secondary max-w-3xl mx-auto">
              Our core values shape everything we do, from how we work with clients to how we support each other as a team.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                icon: Target,
                title: 'Results-Driven',
                description: 'Every strategy is designed to deliver measurable ROI and tangible business growth.',
                color: 'bg-blue-500'
              },
              {
                icon: Heart,
                title: 'Client-Centric',
                description: 'Your success is our success. We treat your business goals as our own.',
                color: 'bg-red-500'
              },
              {
                icon: Lightbulb,
                title: 'Innovation First',
                description: 'We stay ahead of digital trends to give you a competitive edge.',
                color: 'bg-yellow-500'
              },
              {
                icon: Shield,
                title: 'Transparency',
                description: 'Clear communication, honest reporting, and no hidden surprises.',
                color: 'bg-green-500'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInVariants}
                className="group"
              >
                <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-background">
                  <CardContent className="p-6 md:p-8">
                    <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mobile-h4 text-dark-gray mb-3">{value.title}</h3>
                    <p className="mobile-body text-secondary">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mobile-section bg-background">
        <div className="mobile-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="mobile-h2 text-dark-gray mb-6">
                Your Success is Our Mission
              </h2>
              <p className="mobile-body text-secondary mb-8">
                We don't just execute campaigns—we become your strategic partner in digital growth. Here's what sets us apart from other agencies.
              </p>

              <div className="mobile-space-y">
                {[
                  {
                    icon: TrendingUp,
                    title: 'Data-Driven Strategies',
                    description: 'Every decision backed by analytics and market insights'
                  },
                  {
                    icon: Users,
                    title: 'Dedicated Team',
                    description: 'A team of specialists assigned to your account'
                  },
                  {
                    icon: Zap,
                    title: 'Agile Approach',
                    description: 'Quick to adapt and optimize based on performance'
                  },
                  {
                    icon: Award,
                    title: 'Proven Track Record',
                    description: 'Hundreds of successful campaigns across industries'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mobile-h5 text-dark-gray mb-1">{item.title}</h3>
                      <p className="mobile-body-sm text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <Image
                  src="https://static.wixstatic.com/media/f650f9_6e9205aa637742418e93147373aa38c4~mv2.png?originWidth=576&originHeight=384"
                  alt="Why choose Look A Like Solutions"
                  width={600}
                  className="w-full h-auto rounded-2xl shadow-lg relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="mobile-h2 text-dark-gray mb-4">
              Meet the Experts Behind Your Success
            </h2>
            <p className="mobile-body text-secondary max-w-3xl mx-auto">
              Our diverse team of specialists brings together years of experience in digital marketing, technology, and creative strategy to deliver exceptional results.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="w-32 h-32 bg-light-gray rounded-2xl mx-auto mb-6 animate-pulse"></div>
                    <div className="h-6 bg-light-gray rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-20 bg-light-gray rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member._id}
                  variants={fadeInVariants}
                  className="group"
                >
                  <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-background overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="relative mb-6">
                        {member.profilePicture ? (
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                            <Image
                              src={member.profilePicture}
                              alt={member.fullName || 'Team member'}
                              width={128}
                              className="w-32 h-32 rounded-2xl mx-auto object-cover relative z-10 ring-4 ring-white group-hover:ring-primary/20 transition-all duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mx-auto flex items-center justify-center">
                            <Users className="h-16 w-16 text-primary/40" />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <h3 className="mobile-h4 text-dark-gray mb-2">
                          {member.fullName}
                        </h3>
                        <p className="text-primary mobile-body-sm font-medium mb-2">{member.role}</p>
                        {member.specialization && (
                          <p className="mobile-body-sm text-secondary mb-4 italic">
                            {member.specialization}
                          </p>
                        )}
                        {member.bio && (
                          <p className="mobile-body-sm text-secondary mb-6 line-clamp-3">
                            {member.bio}
                          </p>
                        )}
                        {member.linkedinProfile && (
                          <a
                            href={member.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mobile-body-sm font-medium"
                          >
                            <Linkedin className="h-4 w-4" />
                            Connect on LinkedIn
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 md:p-16 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mobile-h4 text-dark-gray mb-3">
                  Our Team is Growing
                </h3>
                <p className="mobile-body text-secondary max-w-md mx-auto">
                  We're building an amazing team of digital marketing experts. Check back soon to meet the people who will help transform your business.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="mobile-section-compact bg-background">
        <div className="mobile-container">
          <TrustedBusinessesCarousel 
            title="Trusted by Leading Businesses"
            showTitle={true}
            speed={25}
          />
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mobile-body-sm font-medium mb-4">
              Careers
            </span>
            <h2 className="mobile-h2 text-dark-gray mb-4">
              Join Our Growing Team
            </h2>
            <p className="mobile-body text-secondary max-w-3xl mx-auto">
              We're always looking for talented individuals who are passionate about digital marketing and want to make a real impact. Explore our current openings and internship opportunities.
            </p>
          </div>

          {loading ? (
            <div className="mobile-space-y">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="h-6 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-20 bg-light-gray rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobOpenings.length > 0 ? (
            <div className="mobile-space-y">
              {jobOpenings.map((job) => (
                <Card key={job._id} className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-background">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                      <div className="flex-1">
                        <h3 className="mobile-h3 text-dark-gray mb-4">
                          {job.jobTitle}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {job.location && (
                            <div className="flex items-center text-secondary">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="mobile-body-sm">{job.location}</span>
                            </div>
                          )}
                          {job.employmentType && (
                            <div className="flex items-center text-secondary">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="mobile-body-sm">{job.employmentType}</span>
                            </div>
                          )}
                          {job.applicationDeadline && (
                            <div className="flex items-center text-secondary">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="mobile-body-sm">
                                Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                        {job.jobDescription && (
                          <p className="mobile-body text-secondary">
                            {job.jobDescription}
                          </p>
                        )}
                      </div>
                      <div className="lg:ml-8 flex-shrink-0">
                        {job.applicationLink ? (
                          <a
                            href={job.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="mobile-btn-primary w-full lg:w-auto">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        ) : (
                          <Link to="/contact">
                            <Button className="mobile-btn-primary w-full lg:w-auto">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm bg-background">
              <CardContent className="p-12 md:p-16 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mobile-h3 text-dark-gray mb-4">
                  No Current Openings
                </h3>
                <p className="mobile-body text-secondary mb-8 max-w-md mx-auto">
                  We don't have any open positions at the moment, but we're always interested in hearing from talented individuals. Feel free to reach out with your resume.
                </p>
                <Link to="/contact">
                  <Button className="mobile-btn-primary">
                    Send Your Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mobile-section bg-gradient-to-br from-dark-gray to-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="mobile-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mobile-h2 text-white mb-6">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="mobile-body-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're looking to grow your business or join our team, we'd love to hear from you. Let's start a conversation and create something amazing together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <Button className="mobile-btn-primary bg-primary hover:bg-primary/90 text-white">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="mobile-btn-secondary border-white text-white hover:bg-white hover:text-dark-gray">
                    Explore Our Services
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
                {[
                  { icon: CheckCircle, text: 'Free Consultation' },
                  { icon: CheckCircle, text: 'Custom Strategy' },
                  { icon: CheckCircle, text: 'Proven Results' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center gap-3">
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="mobile-body text-white">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}