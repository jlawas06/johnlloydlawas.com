'use client';

import { personalInfo } from '@/data/personal';
import { cn } from '@/lib/utils';
import { CheckCircle, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from './theme-provider';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { colors } = useTheme();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className={cn(
            " inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer",
            colors.buttonText,
            colors.button
          )}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <section className={cn("py-20 transition-colors", colors.background)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl sm:text-4xl font-bold mb-4", colors.text)}>
            Get In Touch
          </h2>
          <p className={cn("text-xl max-w-3xl mx-auto", colors.textSecondary)}>
            Ready to discuss your next project? Let&apos;s connect and explore how we can work together globally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={cn("text-2xl font-bold mb-6", colors.text)}>Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                    <Mail className="text-cyan-600 dark:text-cyan-400" size={20} />
                  </div>
                  <div>
                    <div className={cn("font-medium", colors.text)}>Email</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className={cn("transition-colors", colors.accent, colors.accentHover)}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Phone className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <div className={cn("font-medium", colors.text)}>Phone</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <div className={cn("font-medium", colors.text)}>Location</div>
                    <div className={colors.textSecondary}>{personalInfo.location}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                    <Linkedin className="text-cyan-600 dark:text-cyan-400" size={20} />
                  </div>
                  <div>
                    <div className={cn("font-medium", colors.text)}>LinkedIn</div>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("transition-colors", colors.accent, colors.accentHover)}
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn("rounded-xl p-6 transition-colors", colors.card, colors.border)}>
              <h4 className={cn("font-semibold mb-3", colors.text)}>Availability</h4>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className={colors.textSecondary}>Available for new opportunities</span>
              </div>
              <p className={cn("text-sm", colors.textSecondary)}>
                Currently open to full-time positions, consulting projects, and freelance work.
                Specializing in remote work for international clients and global teams.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={cn("rounded-xl shadow-lg p-8 transition-colors", colors.card)}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={cn("block text-sm font-medium mb-2", colors.textSecondary)}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                      colors.formInput,
                      errors.name ? 'border-red-500' : colors.border
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className={cn("block text-sm font-medium mb-2", colors.textSecondary)}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                      colors.formInput,
                      errors.email ? 'border-red-500' : colors.border
                    )}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={cn("block text-sm font-medium mb-2", colors.textSecondary)}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                    colors.formInput,
                    errors.subject ? 'border-red-500' : colors.border
                  )}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className={cn("block text-sm font-medium mb-2", colors.textSecondary)}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical",
                    colors.formInput,
                    errors.message ? 'border-red-500' : colors.border
                  )}
                  placeholder="Tell me about your project or what you'd like to discuss..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors",
                  colors.buttonText,
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : colors.button
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
