import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, FileText, Clock } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="mobile-section bg-light-gray">
        <div className="mobile-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mobile-h1 text-dark-gray mb-6">
              Privacy Policy
            </h1>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center mt-6 mobile-body-sm text-secondary">
              <Clock className="h-4 w-4 mr-2" />
              Last updated: November 13, 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="mobile-section">
        <div className="mobile-container-tight">
          <div className="mobile-space-y-lg">
            
            {/* Information We Collect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Information We Collect</h2>
              </div>
              <div className="mobile-space-y">
                <div>
                  <h3 className="mobile-h4 text-dark-gray mb-3">Personal Information</h3>
                  <p className="mobile-body text-secondary mb-4">
                    We collect information you provide directly to us, such as:
                  </p>
                  <ul className="mobile-body text-secondary space-y-2 ml-6">
                    <li>• Name and contact information (email, phone number)</li>
                    <li>• Company information and job title</li>
                    <li>• Project requirements and budget information</li>
                    <li>• Communication preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mobile-h4 text-dark-gray mb-3">Automatically Collected Information</h3>
                  <p className="mobile-body text-secondary mb-4">
                    When you visit our website, we automatically collect:
                  </p>
                  <ul className="mobile-body text-secondary space-y-2 ml-6">
                    <li>• IP address and browser information</li>
                    <li>• Pages visited and time spent on our site</li>
                    <li>• Referring website information</li>
                    <li>• Device and operating system information</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">How We Use Your Information</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  We use the information we collect to:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6">
                  <li>• Provide and improve our digital marketing services</li>
                  <li>• Respond to your inquiries and provide customer support</li>
                  <li>• Send you updates about our services and industry insights</li>
                  <li>• Analyze website usage to improve user experience</li>
                  <li>• Comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Information Sharing</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6">
                  <li>• With your explicit consent</li>
                  <li>• To trusted service providers who assist in our operations</li>
                  <li>• When required by law or to protect our rights</li>
                  <li>• In connection with a business transfer or merger</li>
                </ul>
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Data Security</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6 mt-4">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure servers and databases</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited access to personal information</li>
                </ul>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Your Rights</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary mb-4">
                  You have the right to:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6">
                  <li>• Access and review your personal information</li>
                  <li>• Request corrections to inaccurate information</li>
                  <li>• Request deletion of your personal information</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Request data portability</li>
                </ul>
                <p className="mobile-body text-secondary mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@lookalikesolutions.com" className="text-primary hover:underline">
                    privacy@lookalikesolutions.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mobile-card mobile-card-padding"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Cookies and Tracking</h2>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mobile-card mobile-card-padding bg-light-gray"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Contact Us</h2>
              <p className="mobile-body text-secondary mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mobile-space-y-sm">
                <p className="mobile-body text-secondary">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@lookalikesolutions.com" className="text-primary hover:underline">
                    privacy@lookalikesolutions.com
                  </a>
                </p>
                <p className="mobile-body text-secondary">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919731588244" className="text-primary hover:underline">
                    +91-9731588244
                  </a>
                </p>
                <p className="mobile-body text-secondary">
                  <strong>Address:</strong> Bengaluru, Karnataka, India
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}