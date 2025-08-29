'use client';

import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import { Award, Calendar, Code, MapPin, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './theme-provider';

export default function AboutContent() {
  const totalYears = getTotalExperience();
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${colors.background}`}>
      {/* Hero Section */}
      <section className={`py-20 transition-colors duration-300 ${colors.backgroundSecondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className={`text-4xl sm:text-5xl font-bold transition-colors ${colors.text}`}>
                About <span className={colors.accent.replace('text-', 'text-')}>Me</span>
              </h1>
              <p className={`text-xl leading-relaxed transition-colors ${colors.textSecondary}`}>
                {personalInfo.bio}
              </p>
              <div className="flex items-center space-x-6">
                <div className={`flex items-center space-x-2 transition-colors ${colors.textSecondary}`}>
                  <MapPin size={20} className={colors.accent.replace('text-', 'text-')} />
                  <span>{personalInfo.location.split(',').slice(-2).join(',').trim()}</span>
                </div>
                <div className={`flex items-center space-x-2 transition-colors ${colors.textSecondary}`}>
                  <Calendar size={20} className={colors.success.replace('text-', 'text-')} />
                  <span>{totalYears}+ years experience</span>
                </div>
              </div>
            </div>
            
            {/* Profile placeholder */}
            <div className="relative flex justify-center lg:justify-end">
              <div className={`w-80 h-80 bg-gradient-to-br ${colors.gradientAccent} rounded-2xl flex items-center justify-center shadow-2xl`}>
                <div className="text-white text-6xl font-bold">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Approach */}
      <section className={`py-20 transition-colors duration-300 ${colors.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-colors ${colors.text}`}>
              My Approach
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors ${colors.textSecondary}`}>
              Building enterprise applications requires more than just technical skills. 
              Here&apos;s what drives my development philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 ${colors.infoBg} rounded-full flex items-center justify-center mx-auto transition-colors`}>
                <Code className={colors.info.replace('text-', 'text-')} size={32} />
              </div>
              <h3 className={`text-xl font-semibold transition-colors ${colors.text}`}>Clean Code</h3>
              <p className={`transition-colors ${colors.textSecondary}`}>
                Writing maintainable, scalable code that follows industry best practices and patterns.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className={`w-16 h-16 ${colors.successBg} rounded-full flex items-center justify-center mx-auto transition-colors`}>
                <Users className={colors.success.replace('text-', 'text-')} size={32} />
              </div>
              <h3 className={`text-xl font-semibold transition-colors ${colors.text}`}>Collaboration</h3>
              <p className={`transition-colors ${colors.textSecondary}`}>
                Working effectively with cross-functional teams and stakeholders to deliver solutions.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto transition-colors">
                <Award className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <h3 className={`text-xl font-semibold transition-colors ${colors.text}`}>Quality</h3>
              <p className={`transition-colors ${colors.textSecondary}`}>
                Committed to delivering high-quality solutions through testing, code reviews, and continuous improvement.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className={`w-16 h-16 ${colors.warningBg} rounded-full flex items-center justify-center mx-auto transition-colors`}>
                <Target className={colors.warning.replace('text-', 'text-')} size={32} />
              </div>
              <h3 className={`text-xl font-semibold transition-colors ${colors.text}`}>Results</h3>
              <p className={`transition-colors ${colors.textSecondary}`}>
                Focused on solving real business problems and delivering measurable value to organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Story */}
      <section className={`py-20 transition-colors duration-300 ${colors.backgroundTertiary}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-12 text-center transition-colors ${colors.text}`}>
            My Journey
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className={`leading-relaxed mb-6 transition-colors ${colors.textSecondary}`}>
              My journey in software development began during my studies at the University of San Carlos, 
              where I earned my Certificate of Computer Technology. What started as curiosity about how 
              applications work evolved into a passion for building solutions that make a real difference.
            </p>

            <p className={`leading-relaxed mb-6 transition-colors ${colors.textSecondary}`}>
              Over the past {totalYears} years, I&apos;ve had the privilege of working with diverse teams across 
              multiple industries, from automotive manufacturing at Lear Corporation to aviation and logistics 
              at Sense Software Solutions. Each role has taught me valuable lessons about enterprise software 
              development, agile methodologies, and the importance of understanding business requirements.
            </p>

            <p className={`leading-relaxed mb-6 transition-colors ${colors.textSecondary}`}>
              My expertise in ASP.NET Core and Angular has been developed through hands-on experience building 
              and modernizing enterprise applications. I&apos;ve been involved in legacy system revamps, integrating 
              third-party systems, and mentoring junior developers. These experiences have shaped my understanding 
              of both the technical and human aspects of software development.
            </p>

            <p className={`leading-relaxed transition-colors ${colors.textSecondary}`}>
              Currently based in Cebu City, Philippines, I&apos;m passionate about working with international teams 
              and contributing to global software projects. I have extensive experience in remote collaboration 
              across different time zones and believe in continuous learning, staying current with technology trends, 
              and sharing knowledge with the worldwide developer community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`py-20 transition-colors duration-300 ${colors.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className={`text-4xl font-bold transition-colors ${colors.accent}`}>{totalYears}+</div>
              <div className={`transition-colors ${colors.textMuted}`}>Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold transition-colors ${colors.success}`}>10+</div>
              <div className={`transition-colors ${colors.textMuted}`}>Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 transition-colors">5</div>
              <div className={`transition-colors ${colors.textMuted}`}>Companies</div>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold transition-colors ${colors.warning}`}>15+</div>
              <div className={`transition-colors ${colors.textMuted}`}>Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 transition-colors duration-300 ${colors.accentBg}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-cyan-100 mb-8 transition-colors">
            Ready to discuss your next international project? I&apos;d love to hear about your challenges 
            and explore how we can build something amazing together, regardless of your location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-cyan-600 font-medium rounded-lg hover:bg-cyan-50 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 border border-cyan-400 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
