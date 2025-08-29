import ContactContent from '@/components/ui/contact-content';
import { personalInfo } from '@/data/personal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personalInfo.name}. Available for remote full-stack development opportunities, international consulting, and global project collaborations.`,
};

export default function ContactPage() {
  return <ContactContent />;
}
