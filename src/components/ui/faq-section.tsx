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
    <section className="mobile-section-spacing bg-light-gray">
      <div className="max-w-[100rem] mx-auto mobile-container-spacing">
        <div className="text-center mobile-margin-element">
          <h2 className="mobile-heading-primary text-dark-gray mobile-margin-element">{title}</h2>
          {description && (
            <p className="mobile-text-body text-secondary max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3 lg:space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-3 sm:p-4 lg:p-6 text-left flex justify-between items-start hover:bg-gray-50 transition-colors"
                >
                  <h3 className="mobile-heading-tertiary text-dark-gray pr-2 sm:pr-3 lg:pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0 mt-1" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
                    <p className="mobile-text-body text-secondary leading-relaxed">
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