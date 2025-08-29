import ContactForm from '@/components/ui/contact-form';
import { personalInfo } from '@/data/personal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personalInfo.name}. Available for remote full-stack development opportunities, international consulting, and global project collaborations.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <ContactForm />
    </div>
  );
}
