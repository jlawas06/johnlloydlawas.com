import ContactContent from '@/components/ui/contact-content';
import { personalInfo } from '@/data/personal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personalInfo.name} — available for remote full-stack development work from Cebu City, PH (UTC+8).`,
};

export default function ContactPage() {
  return <ContactContent />;
}
