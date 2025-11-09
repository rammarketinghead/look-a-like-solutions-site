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
    <section className="py-16 sm:py-24 lg:py-32 bg-light-gray">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading text-dark-gray mb-4 sm:mb-6">{title}</h2>
          {description && (
            <p className="text-base sm:text-lg font-paragraph text-secondary max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 sm:p-6 text-left flex justify-between items-start hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-heading text-dark-gray pr-3 sm:pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0 mt-1" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <p className="font-paragraph text-secondary leading-relaxed text-sm sm:text-base">
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