'use server';

import { EmailBlockType } from '@/app/design/components/email-blocks/types';
import { generateEmailComponent } from '@/app/design/utils/email-render-utils';
import { sendEmailSchema } from '@/lib/email-validation';
import { Resend } from 'resend';

interface CanvasStyles {
  maxWidth: string;
  backgroundColor: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginBottom: string;
  borderWidth: string;
  borderStyle: string;
  borderColor: string;
  borderRadius: string;
  fontFamily: string;
}

interface SendEmailProps {
  apiKey: string;
  fromEmail: string;
  toEmails: string[];
  subject: string;
  emailBlocks: EmailBlockType[];
  canvasStyles: CanvasStyles;
}

export async function sendEmail(props: SendEmailProps) {
  const transformedProps = {
    apiKey: props.apiKey,
    sender: props.fromEmail,
    recipients: props.toEmails.join(', '),
    subject: props.subject,
  };

  const validationResult = sendEmailSchema.safeParse(transformedProps);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Validation failed: ${errorMessages}`);
  }

  const { apiKey, sender: fromEmail, recipients: toEmails, subject } = validationResult.data;

  try {
    const resend = new Resend(apiKey);

    const EmailComponent = generateEmailComponent(props.emailBlocks, props.canvasStyles);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject,
      react: EmailComponent(),
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.startsWith('Validation failed') ||
        error.message.startsWith('Failed to send email')
      ) {
        throw error;
      }
    }

    console.error('Unexpected error in sendEmail:', error);
    throw new Error('An unexpected error occurred while sending email');
  }
}
