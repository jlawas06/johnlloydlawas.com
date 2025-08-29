'use client';

import { personalInfo } from '@/data/personal';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './theme-provider';

const socialLinks = [
  {
    href: personalInfo.linkedin,
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: `mailto:${personalInfo.email}`,
    label: 'Email',
    icon: Mail,
  },
];

const quickLinks = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { colors } = useTheme();

  return (
    <footer className={`transition-colors duration-300 ${colors.backgroundSecondary === 'bg-white' ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{personalInfo.name}</h3>
            <p className="text-gray-300 mb-4">{personalInfo.title}</p>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-cyan-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-cyan-400" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-cyan-400" />
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-cyan-300 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-cyan-300 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links & Availability */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 rounded-full hover:bg-cyan-600 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            <div className="text-sm text-gray-300">
              <p className="mb-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Available for opportunities
              </p>
              <p>Based in Cebu City, Philippines • Serving clients worldwide</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {currentYear} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
