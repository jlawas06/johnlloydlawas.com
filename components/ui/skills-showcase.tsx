'use client';

import { skillCategories, topSkills } from '@/data/skills';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTheme } from './theme-provider';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

function SkillBar({ name, proficiency }: SkillBarProps) {
  const { colors } = useTheme();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={cn("font-medium", colors.text)}>{name}</span>
        <span className={cn("text-sm", colors.textSecondary)}>{proficiency}%</span>
      </div>
      <div className={cn("w-full rounded-full h-2.5 transition-colors", colors.backgroundTertiary)}>
        <div
          className={cn(
            "h-2.5 rounded-full transition-all duration-1000 ease-out",
            colors.accentBg.replace('bg-', 'bg-')
          )}
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  );
}

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { colors } = useTheme();

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.name.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section className={cn("py-20 transition-colors", colors.background)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl sm:text-4xl font-bold mb-4", colors.text)}>
            Technical Skills
          </h2>
          <p className={cn("text-xl max-w-3xl mx-auto", colors.textSecondary)}>
            Comprehensive expertise across the full stack with {skillCategories.reduce((total, cat) => total + cat.skills.length, 0)}+ technologies
          </p>
        </div>

        {/* Top Skills Preview */}
        <div className="mb-12">
          <h3 className={cn("text-lg font-semibold mb-6 text-center", colors.text)}>Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {topSkills.map((skill) => (
              <span
                key={skill}
                className={cn("px-4 py-2 rounded-full font-medium text-sm", colors.button, colors.buttonText)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === 'all'
                ? `${colors.buttonText} ${colors.button}`
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            )}
          >
            All Skills
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name.toLowerCase())}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeCategory === category.name.toLowerCase()
                  ? `${colors.buttonText} ${colors.button}`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={cn("rounded-xl p-6 animate-fade-in transition-colors", colors.card, colors.cardHover)}
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={cn("text-xl font-semibold", colors.text)}>{category.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                  {category.skills.length} skills
                </span>
              </div>

              <p className={cn("text-sm mb-6", colors.textSecondary)}>{category.description}</p>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                  >
                    <SkillBar
                      name={skill.name}
                      proficiency={skill.proficiency}
                    />
                    {skill.description && (
                      <p className="text-xs text-gray-500 mt-1">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className={cn("mt-16 rounded-xl p-8 text-center transition-colors", colors.card, colors.border, "border")}>
          <h3 className={cn("text-2xl font-bold mb-4 transition-colors", colors.text)}>Ready to Build Amazing Things</h3>
          <p className={cn("mb-6 max-w-2xl mx-auto transition-colors", colors.textSecondary)}>
            With extensive experience across the full technology stack, I&apos;m equipped to tackle complex challenges
            and deliver scalable, maintainable solutions for enterprise applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className={cn("inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors", colors.button, colors.buttonText)}
            >
              View Projects
            </a>
            <a
              href="/contact"
              className={cn("inline-flex items-center justify-center px-6 py-3 border font-medium rounded-lg transition-colors", colors.buttonOutline, colors.text, colors.hover)}
            >
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
