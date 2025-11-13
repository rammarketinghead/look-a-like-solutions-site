import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TermsOfServicePage() {
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
              <Scale className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mobile-h1 text-dark-gray mb-6">
              Terms of Service
            </h1>
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              These terms govern your use of our services. Please read them carefully before engaging with Look A Like Solutions.
            </p>
            <div className="flex items-center justify-center mt-6 mobile-body-sm text-secondary">
              <Clock className="h-4 w-4 mr-2" />
              Last updated: November 13, 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="mobile-section">
        <div className="mobile-container-tight">
          <div className="mobile-space-y-lg">
            
            {/* Acceptance of Terms */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Acceptance of Terms</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  By accessing and using the services provided by Look A Like Solutions, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </motion.div>

            {/* Services Description */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Services Description</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary mb-4">
                  Look A Like Solutions provides digital marketing services including but not limited to:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6">
                  <li>• Search Engine Optimization (SEO)</li>
                  <li>• Social Media Marketing</li>
                  <li>• Paid Advertising Management</li>
                  <li>• Web Development and Design</li>
                  <li>• Content Marketing</li>
                  <li>• Data Analytics and Reporting</li>
                  <li>• Digital Marketing Consultation</li>
                </ul>
              </div>
            </motion.div>

            {/* Client Responsibilities */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Client Responsibilities</h2>
              </div>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary mb-4">
                  As our client, you agree to:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6">
                  <li>• Provide accurate and complete information about your business</li>
                  <li>• Grant necessary access to accounts and platforms</li>
                  <li>• Respond to requests for information in a timely manner</li>
                  <li>• Make payments according to agreed terms</li>
                  <li>• Comply with all applicable laws and regulations</li>
                  <li>• Not engage in activities that could harm our reputation</li>
                </ul>
              </div>
            </motion.div>

            {/* Payment Terms */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mobile-card mobile-card-padding"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Payment Terms</h2>
              <div className="mobile-space-y">
                <div>
                  <h3 className="mobile-h4 text-dark-gray mb-3">Payment Schedule</h3>
                  <ul className="mobile-body text-secondary space-y-2 ml-6">
                    <li>• Monthly retainer fees are due on the 1st of each month</li>
                    <li>• Project-based work requires 50% upfront payment</li>
                    <li>• Late payments may incur a 2% monthly service charge</li>
                    <li>• All prices are in Indian Rupees (INR) unless specified otherwise</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mobile-h4 text-dark-gray mb-3">Refund Policy</h3>
                  <p className="mobile-body text-secondary">
                    Refunds are considered on a case-by-case basis. Work completed cannot be refunded. For monthly retainers, 30 days notice is required for cancellation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mobile-card mobile-card-padding"
            >
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-primary mr-3" />
                <h2 className="mobile-h2 text-dark-gray">Intellectual Property</h2>
              </div>
              <div className="mobile-space-y">
                <div>
                  <h3 className="mobile-h4 text-dark-gray mb-3">Client Content</h3>
                  <p className="mobile-body text-secondary">
                    You retain ownership of all content, trademarks, and intellectual property you provide to us. You grant us a license to use this content for the purpose of providing our services.
                  </p>
                </div>
                
                <div>
                  <h3 className="mobile-h4 text-dark-gray mb-3">Our Work Product</h3>
                  <p className="mobile-body text-secondary">
                    Upon full payment, you own the rights to custom work created specifically for your business. We retain rights to our methodologies, processes, and general knowledge.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Confidentiality */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mobile-card mobile-card-padding"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Confidentiality</h2>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  We understand that you may share confidential information with us. We agree to:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6 mt-4">
                  <li>• Keep all client information confidential</li>
                  <li>• Not disclose sensitive business information to third parties</li>
                  <li>• Use information only for the purpose of providing services</li>
                  <li>• Implement appropriate security measures</li>
                </ul>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mobile-card mobile-card-padding"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Limitation of Liability</h2>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  Look A Like Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                </p>
                <p className="mobile-body text-secondary">
                  Our total liability shall not exceed the amount paid by you for the services in the 12 months preceding the claim.
                </p>
              </div>
            </motion.div>

            {/* Termination */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mobile-card mobile-card-padding"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Termination</h2>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary mb-4">
                  Either party may terminate this agreement with 30 days written notice. Upon termination:
                </p>
                <ul className="mobile-body text-secondary space-y-2 ml-6">
                  <li>• All outstanding payments become due immediately</li>
                  <li>• We will provide final reports and transfer account access</li>
                  <li>• Confidentiality obligations continue indefinitely</li>
                  <li>• You retain ownership of completed work upon payment</li>
                </ul>
              </div>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mobile-card mobile-card-padding"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Governing Law</h2>
              <div className="mobile-space-y">
                <p className="mobile-body text-secondary">
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mobile-card mobile-card-padding bg-light-gray"
            >
              <h2 className="mobile-h2 text-dark-gray mb-4">Contact Us</h2>
              <p className="mobile-body text-secondary mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mobile-space-y-sm">
                <p className="mobile-body text-secondary">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@lookalikesolutions.com" className="text-primary hover:underline">
                    legal@lookalikesolutions.com
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