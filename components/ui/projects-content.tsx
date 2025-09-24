'use client';

import { formatDateShort } from '@/lib/utils';
import { Calendar, Code, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './theme-provider';

interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  startDate?: string;
  readingTime?: number;
  featured?: boolean;
}

interface ProjectsContentProps {
  projects: Project[];
}

export default function ProjectsContent({ projects }: ProjectsContentProps) {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${colors.background}`}>
      {/* Hero Section */}
      <section className={`py-20 transition-colors duration-300 ${colors.backgroundSecondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 transition-colors ${colors.text}`}>
              Project Portfolio
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 transition-colors ${colors.textSecondary}`}>
              A showcase of enterprise applications and software solutions I&apos;ve built 
              over 6+ years of full-stack development experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors ${colors.info}`}>10+</div>
                <div className={`text-sm transition-colors ${colors.textMuted}`}>Projects Completed</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors ${colors.success}`}>15+</div>
                <div className={`text-sm transition-colors ${colors.textMuted}`}>Technologies Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 transition-colors">5</div>
                <div className={`text-sm transition-colors ${colors.textMuted}`}>Industries Served</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors ${colors.warning}`}>500+</div>
                <div className={`text-sm transition-colors ${colors.textMuted}`}>Users Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={`py-20 transition-colors duration-300 ${colors.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className={`text-xl font-semibold mb-2 transition-colors ${colors.text}`}>
                Project case studies coming soon!
              </h3>
              <p className={`mb-8 transition-colors ${colors.textSecondary}`}>
                I&apos;m documenting detailed case studies of my enterprise development projects, 
                including architecture decisions, technical challenges, and business outcomes.
              </p>
              
              {/* Placeholder project showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className={`rounded-xl shadow-lg p-6 transition-colors ${colors.cardSolid} ${colors.border} border`}>
                  <div className={`w-12 h-12 ${colors.infoBg} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                    <Code className={colors.info.replace('text-', 'text-')} size={24} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 transition-colors ${colors.text}`}>
                    ERP System Modernization
                  </h3>
                  <p className={`text-sm mb-4 transition-colors ${colors.textSecondary}`}>
                    Complete modernization of legacy ERP system serving 500+ users. 
                    Migrated from ASP.NET Framework to Core with Angular frontend.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded">ASP.NET Core</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded">Angular</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 text-xs rounded">SQL Server</span>
                  </div>
                  <div className={`text-sm transition-colors ${colors.textMuted}`}>Case study coming soon</div>
                </div>

                <div className={`rounded-xl shadow-lg p-6 transition-colors ${colors.cardSolid} ${colors.border} border`}>
                  <div className={`w-12 h-12 ${colors.successBg} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                    <Users className={colors.success.replace('text-', 'text-')} size={24} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 transition-colors ${colors.text}`}>
                    Aviation Logistics Platform
                  </h3>
                  <p className={`text-sm mb-4 transition-colors ${colors.textSecondary}`}>
                    Real-time logistics management system for aviation industry. 
                    Handles complex scheduling and resource allocation.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded">ASP.NET</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 text-xs rounded">WCF</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded">Angular</span>
                  </div>
                  <div className={`text-sm transition-colors ${colors.textMuted}`}>Case study coming soon</div>
                </div>

                <div className={`rounded-xl shadow-lg p-6 transition-colors ${colors.cardSolid} ${colors.border} border`}>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <ExternalLink className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 transition-colors ${colors.text}`}>
                    Manufacturing Process System
                  </h3>
                  <p className={`text-sm mb-4 transition-colors ${colors.textSecondary}`}>
                    Internal web applications for automotive manufacturing processes. 
                    Streamlined operations and improved efficiency.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded">ASP.NET MVC</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 text-xs rounded">JavaScript</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 text-xs rounded">SQL Server</span>
                  </div>
                  <div className={`text-sm transition-colors ${colors.textMuted}`}>Case study coming soon</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <article
                  key={project.slug}
                  className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-fade-in ${colors.cardSolid} ${colors.border} border hover:shadow-xl`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    {project.featured && (
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 text-sm font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <h2 className={`text-xl font-bold mb-3 transition-colors ${colors.text} ${colors.linkHover}`}>
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    
                    <p className={`text-sm leading-relaxed mb-4 transition-colors ${colors.textSecondary}`}>
                      {project.description}
                    </p>
                    
                    <div className={`flex items-center justify-between text-xs mb-4 transition-colors ${colors.textMuted}`}>
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>
                          {project.startDate ? formatDateShort(project.startDate) : 'Recent'}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded transition-colors ${colors.backgroundTertiary} ${colors.textSecondary}`}>
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded transition-colors ${colors.backgroundTertiary} ${colors.textSecondary}`}>
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {project.readingTime && (
                        <span className={`text-xs transition-colors ${colors.textMuted}`}>
                          {project.readingTime} min read
                        </span>
                      )}
                      
                      <Link
                        href={`/projects/${project.slug}`}
                        className={`inline-flex items-center space-x-1 font-medium text-sm transition-colors group ${colors.accent} ${colors.linkHover}`}
                      >
                        <span>View Details</span>
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 transition-colors duration-300 ${colors.card} ${colors.border} border-t`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 transition-colors ${colors.text}`}>
            Ready to Build Something Amazing?
          </h2>
          <p className={`text-xl mb-8 transition-colors ${colors.textSecondary}`}>
            Let&apos;s discuss your project requirements and explore how my enterprise 
            development experience can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-8 py-3 font-medium rounded-lg transition-colors ${colors.button} ${colors.buttonText}`}
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className={`inline-flex items-center justify-center px-8 py-3 border font-medium rounded-lg transition-colors ${colors.buttonOutline} ${colors.text} ${colors.hover}`}
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
