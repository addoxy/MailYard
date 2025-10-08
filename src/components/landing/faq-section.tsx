'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Code, Download, HelpCircle, LucideIcon, Save, Shield } from 'lucide-react';
import { SectionDescription, SectionHeading } from './section-typography';

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
        return 'dark:text-blue-500 dark:bg-blue-950/50 text-blue-600 bg-blue-100';
      case Code:
        return 'dark:text-green-500 dark:bg-green-950/50 text-green-600 bg-green-100';
      case Shield:
        return 'dark:text-red-500 dark:bg-red-950/50 text-red-600 bg-red-100';
      case Save:
        return 'dark:text-yellow-500 dark:bg-yellow-950/50';
      case Download:
        return 'dark:text-purple-500 dark:bg-purple-950/50';
      default:
        return 'dark:text-gray-500 dark:bg-gray-950/50';
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
        'No coding knowledge is required! You can now send emails directly from MailYard using our integrated email sending feature. Simply provide your Resend API key, and you can send professional emails without any code. For advanced users, you can still export React code for custom integrations.',
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
        "Your changes aren't stored in the cloud yet, but they're saved locally in your browser. You can also export your designs as React code for local use. We're actively building cloud saving and design management features, coming soon.",
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
          <SectionHeading text="Frequently Asked Questions" />
          <SectionDescription text="Everything you need to know about MailYard" />
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
