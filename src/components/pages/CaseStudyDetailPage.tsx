import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';
import { ArrowLeft, ExternalLink, Calendar, Building, Target, CheckCircle, TrendingUp, Users } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CaseStudyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!id) {
        setError('Case study ID not provided');
        setLoading(false);
        return;
      }

      try {
        const study = await BaseCrudService.getById<CaseStudies>('casestudies', id);
        if (study) {
          setCaseStudy(study);
        } else {
          setError('Case study not found');
        }
      } catch (error) {
        console.error('Error fetching case study:', error);
        setError('Failed to load case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="mobile-section">
          <div className="mobile-container">
            <div className="animate-pulse">
              <div className="h-8 bg-light-gray rounded mb-4 w-1/3"></div>
              <div className="h-12 bg-light-gray rounded mb-8 w-2/3"></div>
              <div className="h-64 bg-light-gray rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-light-gray rounded"></div>
                <div className="h-4 bg-light-gray rounded"></div>
                <div className="h-4 bg-light-gray rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <section className="mobile-section">
          <div className="mobile-container text-center">
            <Building className="h-16 w-16 text-secondary mx-auto mb-6" />
            <h1 className="mobile-h1 text-dark-gray mb-4">Case Study Not Found</h1>
            <p className="mobile-body text-secondary mb-8">
              {error || 'The case study you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Link to="/case-studies">
              <Button className="mobile-btn-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <section className="mobile-section-compact bg-light-gray">
        <div className="mobile-container">
          <Link to="/case-studies" className="inline-flex items-center mobile-body text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mobile-section">
        <div className="mobile-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="mobile-h1 text-dark-gray mb-6">
              {caseStudy.projectName}
            </h1>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              {caseStudy.clientName && `A successful digital marketing project for ${caseStudy.clientName}`}
            </p>
            
            {/* Project Meta */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
              {caseStudy.clientName && (
                <div className="flex items-center mobile-body text-secondary">
                  <Building className="h-4 w-4 mr-2" />
                  {caseStudy.clientName}
                </div>
              )}
              {caseStudy.dateCompleted && (
                <div className="flex items-center mobile-body text-secondary">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(caseStudy.dateCompleted).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>
              )}
              {caseStudy.projectUrl && (
                <a 
                  href={caseStudy.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mobile-body text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Project
                </a>
              )}
            </div>
          </motion.div>

          {/* Project Image */}
          {caseStudy.projectImage && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={caseStudy.projectImage}
                  alt={caseStudy.projectName || 'Case study project'}
                  width={1200}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Study Content */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <div className="mobile-grid-1 lg:grid-cols-3 gap-12">
            
            {/* Challenge */}
            {caseStudy.challenge && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
              >
                <Card className="mobile-card h-full">
                  <CardContent className="mobile-card-padding">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                        <Target className="h-6 w-6 text-red-600" />
                      </div>
                      <h2 className="mobile-h3 text-dark-gray">The Challenge</h2>
                    </div>
                    <p className="mobile-body text-secondary leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="mobile-card h-full">
                  <CardContent className="mobile-card-padding">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="mobile-h3 text-dark-gray">Our Solution</h2>
                    </div>
                    <p className="mobile-body text-secondary leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results */}
            {caseStudy.outcome && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="mobile-card h-full">
                  <CardContent className="mobile-card-padding">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <h2 className="mobile-h3 text-dark-gray">Results & Impact</h2>
                    </div>
                    <p className="mobile-body text-secondary leading-relaxed">
                      {caseStudy.outcome}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mobile-section">
        <div className="mobile-container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="mobile-h2 text-dark-gray mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="mobile-body-lg text-secondary mb-8">
              Let's discuss how we can help your business grow with our proven digital marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="mobile-btn-primary">
                  Start Your Project
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="mobile-btn-secondary">
                  View More Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}