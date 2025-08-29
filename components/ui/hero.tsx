'use client';

import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import { Download, ExternalLink, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './theme-provider';

export default function Hero() {
  const totalYears = getTotalExperience();
  const { colors } = useTheme();

  return (
    <section className={`relative overflow-hidden min-h-screen flex items-center transition-colors ${colors.background}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className={`flex items-center space-x-2 font-medium ${colors.accent}`}>
                <MapPin size={18} />
                <span>{personalInfo.location.split(',').slice(-2).join(',').trim()}</span>
              </div>
              
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${colors.text}`}>
                Hi, I&apos;m{' '}
                <span className={colors.accent}>{personalInfo.name}</span>
              </h1>
              
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-medium ${colors.textSecondary}`}>
                {personalInfo.title}
              </h2>
              
              <div className={`flex items-center space-x-4 text-lg ${colors.textSecondary}`}>
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  {totalYears}+ Years Experience
                </span>
                <span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 px-3 py-1 rounded-full text-sm font-medium">
                  Available Worldwide
                </span>
              </div>
            </div>

            <p className={`text-lg leading-relaxed max-w-2xl ${colors.textSecondary}`}>
              {personalInfo.summary}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors group ${colors.button} ${colors.buttonText}`}
              >
                View My Work
                <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/resume/john-lloyd-lawas-resume.pdf"
                className={`inline-flex items-center justify-center px-6 py-3 border font-medium rounded-lg transition-colors group ${colors.border} ${colors.textSecondary} ${colors.cardHover}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
                <Download size={18} className="ml-2 group-hover:translate-y-1 transition-transform" />
              </Link>
              
              <Link
                href={`mailto:${personalInfo.email}`}
                className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors group ${colors.text} ${colors.card} ${colors.cardHover}`}
              >
                Get In Touch
                <Mail size={18} className="ml-2" />
              </Link>
            </div>

            {/* Quick stats */}
            <div className={`grid grid-cols-3 gap-6 pt-8 border-t ${colors.border}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text}`}>{totalYears}+</div>
                <div className={`text-sm ${colors.textMuted}`}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text}`}>10+</div>
                <div className={`text-sm ${colors.textMuted}`}>Projects Completed</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text}`}>5</div>
                <div className={`text-sm ${colors.textMuted}`}>Companies Worked</div>
              </div>
            </div>
          </div>

          {/* Profile Image / Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-slide-in-right">
            <div className="relative">
              {/* Placeholder for profile image */}
              <div className="w-80 h-80 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-white text-6xl font-bold">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-2xl">⚡</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xl">💻</span>
              </div>
              
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
