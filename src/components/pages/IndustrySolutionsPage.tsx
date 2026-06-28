import { Link } from 'react-router-dom';
import { Briefcase, Stethoscope, Home, BookOpen, UtensilsCrossed, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Head from '@/components/Head';

interface IndustryCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const industryCards: IndustryCard[] = [
  {
    id: 'lawyer',
    title: 'Lawyer Lead Generation',
    description: 'Attract qualified legal clients with targeted digital marketing strategies designed specifically for law firms and legal practices.',
    icon: <Briefcase className="w-8 h-8" />,
    link: '/lawyer-lead-generation',
  },
  {
    id: 'doctor',
    title: 'Doctor Lead Generation',
    description: 'Build your medical practice with patient acquisition strategies tailored for healthcare professionals and clinics.',
    icon: <Stethoscope className="w-8 h-8" />,
    link: '/doctor-lead-generation',
  },
  {
    id: 'realestate',
    title: 'Real Estate Lead Generation',
    description: 'Generate qualified property leads and close more deals with real estate-focused digital marketing solutions.',
    icon: <Home className="w-8 h-8" />,
    link: '/real-estate-lead-generation',
  },
  {
    id: 'education',
    title: 'Education Lead Generation',
    description: 'Increase student enrollment and program awareness with targeted marketing strategies for educational institutions.',
    icon: <BookOpen className="w-8 h-8" />,
    link: '/education-lead-generation',
  },
  {
    id: 'restaurant',
    title: 'Restaurant & Hotel Lead Generation',
    description: 'Drive foot traffic and bookings with hospitality-focused digital marketing and customer acquisition strategies.',
    icon: <UtensilsCrossed className="w-8 h-8" />,
    link: '/restaurant-hotel-lead-generation',
  },
  {
    id: 'seo',
    title: 'SEO Lead Generation',
    description: 'Dominate search results and attract organic leads with comprehensive SEO strategies and optimization services.',
    icon: <TrendingUp className="w-8 h-8" />,
    link: '/seo-lead-generation',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function IndustrySolutionsPage() {
  return (
    <>
      <Head
        title="Industry Solutions - Digital Marketing for Every Sector | Look A Like Solutions"
        description="Specialized digital marketing solutions for lawyers, doctors, real estate, education, restaurants, and more. Industry-specific lead generation strategies."
      />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-primary to-blue-600 text-white py-20 md:py-32">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Industry Solutions
              </h1>
              <p className="font-paragraph text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Specialized digital marketing for your industry
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industry Cards Section */}
        <section className="w-full py-16 md:py-24 bg-light-gray">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {industryCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col h-full"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-primary bg-opacity-10 rounded-lg mb-6 text-primary">
                    {card.icon}
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="font-paragraph text-secondary mb-6 flex-grow">
                    {card.description}
                  </p>
                  
                  <Link
                    to={card.link}
                    className="inline-flex items-center font-paragraph font-medium text-primary hover:text-blue-700 transition-colors duration-200"
                  >
                    Learn More
                    <span className="ml-2">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="font-paragraph text-lg text-secondary mb-8 max-w-2xl mx-auto">
                Choose your industry and discover how our specialized digital marketing solutions can drive qualified leads to your business.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground font-paragraph font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started Today
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
