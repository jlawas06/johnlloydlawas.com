'use client';

import { experiences } from '@/data/experience';
import { calculateExperience, cn, formatDateShort } from '@/lib/utils';
import { Calendar, ChevronRight, ExternalLink, MapPin } from 'lucide-react';
import { useTheme } from './theme-provider';

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const duration = calculateExperience(experience.startDate, experience.endDate);
  const isEven = index % 2 === 0;
  const { colors } = useTheme();

  return (
    <div className={cn(
      'relative flex items-center mb-12 animate-fade-in',
      isEven ? 'flex-row' : 'flex-row-reverse'
    )} style={{ animationDelay: `${index * 0.2}s` }}>

      {/* Timeline line and dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className={cn(
          'w-4 h-4 rounded-full border-4 z-10',
          experience.current ? 'border-green-500' : 'border-cyan-500',
          colors.card
        )} />
        {index < experiences.length - 1 && (
          <div className="w-px h-24 bg-gray-300 dark:bg-gray-600 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className={cn(
        'w-5/12 p-6 rounded-xl shadow-lg transition-colors text-left',
        colors.card,
        colors.border,
        isEven ? 'mr-auto' : 'ml-auto'
      )}>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className={cn("text-xl font-bold", colors.text)}>{experience.position}</h3>
            {experience.current && (
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full">
                Current
              </span>
            )}
          </div>

          <div className={cn("text-lg font-semibold mb-2", colors.accent)}>
            {experience.company}
          </div>
          
          <div className={cn("flex items-center space-x-4 text-sm", colors.textMuted)}>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>
                {formatDateShort(experience.startDate)} - {' '}
                {experience.current ? 'Present' : formatDateShort(experience.endDate)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={cn("mb-4 leading-relaxed", colors.textSecondary)}>
          {experience.description}
        </p>

        {/* Key Responsibilities */}
        <div className="mb-4">
          <h4 className={cn("font-semibold mb-2", colors.text)}>Key Responsibilities:</h4>
          <ul className="space-y-1">
            {experience.responsibilities.slice(0, 3).map((responsibility, idx) => (
              <li key={idx} className={cn("flex items-start space-x-2 text-sm", colors.textMuted)}>
                <ChevronRight size={14} className="mt-0.5 text-cyan-500 flex-shrink-0" />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className={cn("font-semibold mb-2", colors.text)}>Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 text-xs font-medium rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div>
            <h4 className={cn("font-semibold mb-2", colors.text)}>Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.slice(0, 2).map((achievement, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-green-700 dark:text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  const { colors } = useTheme();

  return (
    <section className={cn("py-20 transition-colors", colors.background)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl sm:text-4xl font-bold mb-4", colors.text)}>
            Professional Experience
          </h2>
          <p className={cn("text-xl max-w-3xl mx-auto", colors.textSecondary)}>
            {experiences.length} positions across {new Set(experiences.map(exp => exp.company)).size} companies,
            building enterprise applications and leading development initiatives
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Main timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gray-300 dark:bg-gray-600 h-full" />
          
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={cn("rounded-xl shadow-lg p-6 animate-fade-in transition-colors", colors.card, colors.border)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn("text-lg font-bold", colors.text)}>{experience.position}</h3>
                  {experience.current && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <div className={cn("text-base font-semibold mb-2", colors.accent)}>
                  {experience.company}
                </div>
                
                <div className={cn("flex flex-col space-y-1 text-sm", colors.textMuted)}>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>
                      {formatDateShort(experience.startDate)} - {' '}
                      {experience.current ? 'Present' : formatDateShort(experience.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{calculateExperience(experience.startDate, experience.endDate)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className={cn("mb-4 text-sm leading-relaxed", colors.textSecondary)}>
                {experience.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className={cn("font-semibold mb-2 text-sm", colors.text)}>Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 text-xs font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h4 className={cn("font-semibold mb-2 text-sm", colors.text)}>Key Highlights:</h4>
                <ul className="space-y-1">
                  {experience.responsibilities.slice(0, 2).map((responsibility, idx) => (
                    <li key={idx} className={cn("flex items-start space-x-2 text-xs", colors.textMuted)}>
                      <ChevronRight size={12} className="mt-0.5 text-cyan-500 flex-shrink-0" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4">
            <a
              href="/experience"
              className={cn("inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors", colors.button, colors.buttonText)}
            >
              View Full Experience
              <ExternalLink size={18} className="ml-2" />
            </a>
            <a
              href="/resume/john-lloyd-lawas-resume.pdf"
              className={cn("inline-flex items-center justify-center px-6 py-3 border font-medium rounded-lg transition-colors", colors.border, colors.textSecondary, colors.cardHover)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
