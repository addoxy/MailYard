import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Code, Download, HelpCircle, LucideIcon, Save, Shield } from 'lucide-react';

interface FAQCardProps {
  question: string;
  answer: string;
  value: string;
  icon: LucideIcon;
}

const FAQCard = ({ question, answer, value, icon }: FAQCardProps) => {
  const Icon = icon;

  const getIconClasses = () => {
    switch (Icon) {
      case HelpCircle:
        return 'text-blue-500 bg-blue-950/50';
      case Code:
        return 'text-green-500 bg-green-950/50';
      case Shield:
        return 'text-red-500 bg-red-950/50';
      case Save:
        return 'text-yellow-500 bg-yellow-950/50';
      case Download:
        return 'text-purple-500 bg-purple-950/50';
      default:
        return 'text-gray-500 bg-gray-950/50';
    }
  };

  return (
    <AccordionItem
      value={value}
      className="bg-background border-border rounded-xl border shadow-sm"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <div className="flex items-center gap-4 text-left">
          <div
            className={cn(
              'bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
              getIconClasses()
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">{question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="ml-12">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export function FAQSection() {
  const FAQS = [
    {
      question: 'Is MailYard free to use?',
      answer:
        'Yes, MailYard is currently free to use! In the future, we plan to introduce both free and premium tiers once we implement database storage and user authentication. This transition will be necessary to support data persistence and account management features.',
      icon: HelpCircle,
    },
    {
      question: 'Do I need coding knowledge to use this?',
      answer:
        "Currently, coding knowledge is required since you'll need to export and integrate the React code into your own projects. However, we're working on direct email sending capabilities that will eliminate this requirement entirely.",
      icon: Code,
    },
    {
      question: 'Will my emails work in all email clients?',
      answer:
        'Absolutely! Our emails are built with React Email, which ensures universal compatibility across all major email clients including Gmail, Outlook, Apple Mail, and Yahoo Mail.',
      icon: Shield,
    },
    {
      question: 'Can I save my email templates?',
      answer:
        "Currently, you can export your templates as React code for local storage. We're actively working on cloud saving and template management features that will be available soon.",
      icon: Save,
    },
    {
      question: 'What export formats are supported?',
      answer:
        'You can export your emails as clean React components using @react-email/components, making them perfect for modern development workflows and easy integration into your projects.',
      icon: Download,
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-xl">
            Everything you need to know about MailYard
          </p>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index}>
                <FAQCard
                  question={faq.question}
                  answer={faq.answer}
                  value={`item-${index}`}
                  icon={faq.icon}
                />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
