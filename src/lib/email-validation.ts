import { z } from 'zod';

// Shared form schema for client-side validation
export const sendEmailFormSchema = z.object({
  apiKey: z.string().min(1, 'Resend API key is required'),
  sender: z.string()
    .min(1, 'Sender is required')
    .regex(/^.+\s<.+@.+\..+>$/, 'Sender must be in format "[Name] <[email]@[domain]>"'),
  recipients: z.string().min(1, 'Recipients are required'),
  subject: z.string().min(1, 'Subject is required'),
});

// Transformed schema for server-side validation with additional constraints
export const sendEmailSchema = sendEmailFormSchema
  .transform((data) => ({
    ...data,
    recipients: data.recipients
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email),
  }))
  .pipe(
    z.object({
      apiKey: z.string()
        .min(1, 'API key is required')
        .refine(key => key.startsWith('re_'), 'Invalid Resend API key format'),
      sender: z.string()
        .min(1, 'From email is required')
        .regex(/^.+\s<.+@.+\..+>$/, 'From email must be in format "[Name] <[email]@[domain]>"'),
      recipients: z.array(z.string().email('Invalid email address'))
        .min(1, 'At least one recipient email is required')
        .max(100, 'Maximum 100 recipients allowed'),
      subject: z.string()
        .min(1, 'Subject is required')
        .max(998, 'Subject must be less than 998 characters'),
    })
  );

// Type exports
export type SendEmailFormData = z.infer<typeof sendEmailFormSchema>;
export type SendEmailData = z.infer<typeof sendEmailSchema>;