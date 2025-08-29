'use client';

import ContactForm from '@/components/ui/contact-form';
import { useTheme } from './theme-provider';

export default function ContactContent() {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${colors.background}`}>
      <ContactForm />
    </div>
  );
}
