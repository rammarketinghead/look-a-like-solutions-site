import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { SEOHead } from '@/components/ui/seo-head';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Calendar, Building, Target, CheckCircle, TrendingUp } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CaseStudies>('casestudies');
        setCaseStudies(items);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Case Studies - Digital Marketing Success Stories"
        description="Explore our digital marketing case studies and success stories. See how we've helped businesses grow with SEO, social media marketing, paid advertising, and comprehensive digital strategies."
        keywords="digital marketing case studies, SEO success stories, social media marketing results, paid advertising case studies, digital marketing portfolio, client success stories"
        type="website"
      />
      
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
              Case Studies
            </h1>
            <p className="text-xl font-paragraph text-secondary max-w-4xl mx-auto">
              Discover how we've helped businesses across various industries achieve remarkable growth through strategic digital marketing solutions and innovative approaches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '300%', label: 'Average ROI Increase' },
              { number: '50+', label: 'Happy Clients' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading text-primary mb-2">{stat.number}</div>
                <div className="font-paragraph text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-32 bg-light-gray">
        <div className="max-w-[100rem] mx-auto px-8">
          {loading ? (
            <div className="space-y-12">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="h-80 bg-light-gray animate-pulse"></div>
                      <div className="p-12">
                        <div className="h-8 bg-light-gray rounded mb-4 animate-pulse"></div>
                        <div className="h-6 bg-light-gray rounded mb-6 animate-pulse"></div>
                        <div className="space-y-3 mb-8">
                          <div className="h-4 bg-light-gray rounded animate-pulse"></div>
                          <div className="h-4 bg-light-gray rounded animate-pulse"></div>
                          <div className="h-4 bg-light-gray rounded animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-light-gray rounded animate-pulse"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : caseStudies.length > 0 ? (
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <Card key={study._id} className="border-0 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        {study.projectImage ? (
                          <Image
                            src={study.projectImage}
                            alt={study.projectName || 'Case study project'}
                            width={600}
                            className="w-full h-80 lg:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-80 lg:h-full bg-light-gray flex items-center justify-center">
                            <Building className="h-16 w-16 text-secondary" />
                          </div>
                        )}
                        {study.dateCompleted && (
                          <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="flex items-center text-secondary">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="font-paragraph text-sm">
                                {new Date(study.dateCompleted).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long' 
                                })}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                        <div className="mb-6">
                          <h3 className="text-3xl font-heading text-dark-gray mb-4">
                            {study.projectName}
                          </h3>
                          {study.clientName && (
                            <p className="text-primary font-paragraph font-medium mb-2">
                              Client: {study.clientName}
                            </p>
                          )}
                        </div>

                        {study.challenge && (
                          <div className="mb-6">
                            <div className="flex items-center mb-3">
                              <Target className="h-5 w-5 text-primary mr-2" />
                              <h4 className="font-heading text-dark-gray">Challenge</h4>
                            </div>
                            <p className="font-paragraph text-secondary">
                              {study.challenge}
                            </p>
                          </div>
                        )}

                        {study.solution && (
                          <div className="mb-6">
                            <div className="flex items-center mb-3">
                              <CheckCircle className="h-5 w-5 text-primary mr-2" />
                              <h4 className="font-heading text-dark-gray">Solution</h4>
                            </div>
                            <p className="font-paragraph text-secondary">
                              {study.solution}
                            </p>
                          </div>
                        )}

                        {study.outcome && (
                          <div className="mb-8">
                            <div className="flex items-center mb-3">
                              <TrendingUp className="h-5 w-5 text-primary mr-2" />
                              <h4 className="font-heading text-dark-gray">Results</h4>
                            </div>
                            <p className="font-paragraph text-secondary">
                              {study.outcome}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-4">
                          <Link to={`/case-studies/${study._id}`}>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          {study.projectUrl && (
                            <a
                              href={study.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                Live Project
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-heading text-dark-gray mb-4">
                Case Studies Coming Soon
              </h3>
              <p className="text-lg font-paragraph text-secondary mb-8 max-w-2xl mx-auto">
                We're currently preparing detailed case studies of our successful projects. In the meantime, feel free to contact us to learn more about our work and results.
              </p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading text-dark-gray mb-6">Our Success Formula</h2>
            <p className="text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              Every successful project follows our proven methodology that ensures exceptional results and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Research & Analysis',
                description: 'Deep dive into market research, competitor analysis, and audience insights.'
              },
              {
                step: '02',
                title: 'Strategic Planning',
                description: 'Develop comprehensive strategies aligned with business objectives and KPIs.'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Execute campaigns with precision, creativity, and attention to detail.'
              },
              {
                step: '04',
                title: 'Optimization',
                description: 'Continuous monitoring and optimization for maximum performance and ROI.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-heading text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-heading text-dark-gray mb-4">{item.title}</h3>
                <p className="font-paragraph text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-dark-gray">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="text-4xl font-heading text-background mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-lg font-paragraph text-light-gray mb-12 max-w-2xl mx-auto">
            Let's discuss how we can help your business achieve similar results. Every great success story starts with a conversation.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg">
                Start Your Project
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