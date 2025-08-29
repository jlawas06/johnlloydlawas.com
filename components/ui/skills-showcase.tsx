'use client';

import { skillCategories, topSkills } from '@/data/skills';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTheme } from './theme-provider';

interface SkillBarProps {
  name: string;
  proficiency: number;
  category: string;
}

function SkillBar({ name, proficiency, category }: SkillBarProps) {
  const { colors } = useTheme();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={cn("font-medium", colors.text)}>{name}</span>
        <span className={cn("text-sm", colors.textSecondary)}>{proficiency}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={cn(
            "h-2.5 rounded-full transition-all duration-1000 ease-out",
            category === "Backend" && "bg-cyan-500 dark:bg-cyan-400",
            category === "Frontend" && "bg-green-600 dark:bg-green-500",
            category === "UI" && "bg-purple-600 dark:bg-purple-500",
            category === "Database" && "bg-red-600 dark:bg-red-500",
            (category === "Methodology" || category === "Practice" || category === "Testing" || category === "Tools") && "bg-orange-600 dark:bg-orange-500"
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

  const categoryColors = {
    'Backend Development': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'Frontend Development': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'UI Frameworks & Libraries': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Database & Data': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Development Practices': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

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
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  categoryColors[category.name as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                )}>
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
                      category={skill.category}
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
        <div className={cn("mt-16 rounded-xl p-8 text-center transition-colors", colors.button, colors.buttonText)}>
          <h3 className="text-2xl font-bold mb-4">Ready to Build Amazing Things</h3>
          <p className="text-cyan-100 dark:text-cyan-200 mb-6 max-w-2xl mx-auto">
            With extensive experience across the full technology stack, I&apos;m equipped to tackle complex challenges
            and deliver scalable, maintainable solutions for enterprise applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className={cn("inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors", colors.text, colors.background)}
            >
              View Projects
            </a>
            <a
              href="/contact"
              className={cn("inline-flex items-center justify-center px-6 py-3 border font-medium rounded-lg transition-colors", colors.border, colors.buttonText)}
            >
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
