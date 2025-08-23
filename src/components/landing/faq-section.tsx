'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Code, Download, HelpCircle, LucideIcon, Save, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const FAQS = [
  {
    question: 'Is MailYard really free to use?',
    answer:
      'Yes! MailYard is completely free to use. You can create unlimited emails and export them without any restrictions. Build beautiful emails without worrying about usage limits or subscription fees.',
    icon: HelpCircle,
  },
  {
    question: 'Do I need coding knowledge to use this?',
    answer:
      'Not at all! Our drag-and-drop interface is designed for anyone to use, regardless of technical background. However, developers will appreciate the clean React code export options for seamless integration.',
    icon: Code,
  },
  {
    question: 'Will my emails work in all email clients?',
    answer:
      'Yes, we use email-safe HTML and inline styles to ensure maximum compatibility across all major email clients including Gmail, Outlook, Apple Mail, and Yahoo Mail. Your emails will look great everywhere.',
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

export function FAQSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-xl">
            Everything you need to know about MailYard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut", 
                  delay: 0.3 + index * 0.1 
                }}
              >
                <FAQCard
                  question={faq.question}
                  answer={faq.answer}
                  value={`item-${index}`}
                  icon={faq.icon}
                />
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
}

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
