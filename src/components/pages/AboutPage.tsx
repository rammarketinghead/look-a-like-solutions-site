import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { TeamMembers, JobOpenings } from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Award, Linkedin, Calendar, MapPin, Clock } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
      {/* Hero Section */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-heading text-dark-gray mb-8">
              About Look A Like Solutions
            </h1>
            <p className="text-xl font-paragraph text-secondary max-w-4xl mx-auto">
              We are a passionate team of digital marketing experts based in Bengaluru, dedicated to helping businesses thrive in the digital landscape through innovative strategies and data-driven results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading text-dark-gray mb-8">Our Mission</h2>
              <p className="text-lg font-paragraph text-secondary mb-8">
                To empower businesses with cutting-edge digital marketing solutions that drive growth, enhance brand visibility, and deliver measurable results. We believe in the power of data-driven strategies combined with creative excellence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Target,
                    title: 'Results-Focused',
                    description: 'Every campaign is designed to deliver measurable ROI'
                  },
                  {
                    icon: Users,
                    title: 'Client-Centric',
                    description: 'Your success is our primary objective'
                  },
                  {
                    icon: Award,
                    title: 'Excellence',
                    description: 'Committed to delivering the highest quality work'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading text-dark-gray mb-2">{item.title}</h3>
                    <p className="font-paragraph text-secondary text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/f650f9_ac5563d63c2c491cab98286d4eb29444~mv2.png?originWidth=576&originHeight=448"
                alt="Our mission and values"
                width={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Meet Our Team</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience in digital marketing, technology, and creative strategy.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-light-gray rounded-full mx-auto mb-6 animate-pulse"></div>
                    <div className="h-6 bg-light-gray rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-16 bg-light-gray rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member._id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8 text-center">
                    {member.profilePicture && (
                      <Image
                        src={member.profilePicture}
                        alt={member.fullName || 'Team member'}
                        width={96}
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                      />
                    )}
                    <h3 className="text-xl font-heading text-dark-gray mb-2">
                      {member.fullName}
                    </h3>
                    <p className="text-primary font-paragraph mb-2">{member.role}</p>
                    {member.specialization && (
                      <p className="text-sm font-paragraph text-secondary mb-4">
                        {member.specialization}
                      </p>
                    )}
                    {member.bio && (
                      <p className="font-paragraph text-secondary text-sm mb-6">
                        {member.bio}
                      </p>
                    )}
                    {member.linkedinProfile && (
                      <a
                        href={member.linkedinProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        <span className="font-paragraph text-sm">LinkedIn</span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-paragraph text-secondary">
                Our team information will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Join Our Team</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              We're always looking for talented individuals who are passionate about digital marketing and want to make a real impact. Explore our current openings and internship opportunities.
            </p>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="border border-light-gray">
                  <CardContent className="p-8">
                    <div className="h-6 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-light-gray rounded mb-4 animate-pulse"></div>
                    <div className="h-20 bg-light-gray rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobOpenings.length > 0 ? (
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job._id} className="border border-light-gray hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-heading text-dark-gray mb-4">
                          {job.jobTitle}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {job.location && (
                            <div className="flex items-center text-secondary">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="font-paragraph text-sm">{job.location}</span>
                            </div>
                          )}
                          {job.employmentType && (
                            <div className="flex items-center text-secondary">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="font-paragraph text-sm">{job.employmentType}</span>
                            </div>
                          )}
                          {job.applicationDeadline && (
                            <div className="flex items-center text-secondary">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="font-paragraph text-sm">
                                Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="lg:ml-8">
                        {job.applicationLink ? (
                          <a
                            href={job.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        ) : (
                          <Link to="/contact">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                    {job.jobDescription && (
                      <div className="prose max-w-none">
                        <p className="font-paragraph text-secondary">
                          {job.jobDescription}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-light-gray">
              <CardContent className="p-16 text-center">
                <h3 className="text-xl font-heading text-dark-gray mb-4">
                  No Current Openings
                </h3>
                <p className="font-paragraph text-secondary mb-8">
                  We don't have any open positions at the moment, but we're always interested in hearing from talented individuals. Feel free to reach out with your resume.
                </p>
                <Link to="/contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Whether you're looking to grow your business or join our team, we'd love to hear from you. Let's start a conversation.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-dark-gray px-8 py-4 text-lg">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}