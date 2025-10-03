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

  const { apiKey, sender: fromEmail, subject } = validationResult.data;

  try {
    const resend = new Resend(apiKey);

    const EmailComponent = generateEmailComponent(props.emailBlocks, props.canvasStyles);

    const results = await Promise.allSettled(
      props.toEmails.map((email) =>
        resend.emails.send({
          from: fromEmail,
          to: email,
          subject,
          react: EmailComponent(),
        })
      )
    );

    const failures = results.filter((result) => result.status === 'rejected');
    if (failures.length > 0) {
      const failedEmails = failures.map((_, index) => props.toEmails[index]).join(', ');
      throw new Error(`Failed to send email to some recipients`);
    }

    const errors = results
      .filter((result) => result.status === 'fulfilled' && result.value.error)
      .map((result) => (result as PromiseFulfilledResult<any>).value.error);

    if (errors.length > 0) {
      console.error('Resend API errors:', errors);
      throw new Error(`Failed to send some emails: ${errors.map((e) => e.message).join(', ')}`);
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
