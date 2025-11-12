import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", description }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mobile-section bg-light-gray">
      <div className="mobile-container">
        <div className="text-center mb-12">
          <h2 className="mobile-h2 text-dark-gray mb-6">{title}</h2>
          {description && (
            <p className="mobile-body-lg text-secondary max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto mobile-space-y">
          {faqs.map((faq, index) => (
            <Card key={index} className="mobile-card">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full mobile-card-padding text-left flex justify-between items-start hover:bg-gray-50 transition-colors"
                >
                  <h3 className="mobile-h4 text-dark-gray pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="mobile-card-padding pt-0">
                    <p className="mobile-body text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}