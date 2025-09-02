'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  sendEmailFormSchema,
  sendEmailSchema,
  type SendEmailFormData,
} from '@/lib/email-validation';
import { sendEmail } from '@/lib/resend';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { canvasStylesAtom, emailBlocksAtom } from '../../atoms';

export const SendEmailDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailBlocks = useAtomValue(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);

  const form = useForm<SendEmailFormData>({
    resolver: zodResolver(sendEmailFormSchema),
    defaultValues: {
      apiKey: '',
      sender: '',
      recipients: '',
      subject: '',
    },
  });

  const onSubmit = async (formData: SendEmailFormData) => {
    const validationResult = sendEmailSchema.safeParse(formData);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error);
      return;
    }

    const data = validationResult.data;
    setIsLoading(true);
    try {
      await sendEmail({
        apiKey: data.apiKey,
        fromEmail: data.sender,
        toEmails: data.recipients,
        subject: data.subject,
        emailBlocks: emailBlocks,
        canvasStyles: canvasStyles,
      });
      toast.success('Emails sent successfully!');
    } catch (error) {
      toast.error('Failed to send emails.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Send Email <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send your email to people</DialogTitle>
          <DialogDescription>
            Send your designed email to people using Resend. Input your API key below and other
            details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resend API Key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="re_xxxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe <john@yourdomain.com>" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="recipient1@example.com, recipient2@example.com"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Email'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
