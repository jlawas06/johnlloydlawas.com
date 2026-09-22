import ContactContent from '@/components/ui/contact-content';
import { personalInfo } from '@/data/personal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personalInfo.name}. Available for remote full-stack projects and roles from Cebu City, PH (UTC+8). Replies within one working day.`,
};

export default function ContactPage() {
  return <ContactContent />;
}
