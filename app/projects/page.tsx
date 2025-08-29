import { personalInfo } from '@/data/personal';
import { getAllProjects } from '@/lib/projects';
import { formatDateShort } from '@/lib/utils';
import { Calendar, Code, ExternalLink, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Portfolio of enterprise applications and software projects by ${personalInfo.name}. Showcasing ASP.NET Core, Angular, and full-stack development expertise for international clients.`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Project Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A showcase of enterprise applications and software solutions I&apos;ve built 
              over 7+ years of full-stack development experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-gray-600">Technologies Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Industries Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Users Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Project case studies coming soon!
              </h3>
              <p className="text-gray-600 mb-8">
                I&apos;m documenting detailed case studies of my enterprise development projects, 
                including architecture decisions, technical challenges, and business outcomes.
              </p>
              
              {/* Placeholder project showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Code className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ERP System Modernization
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Complete modernization of legacy ERP system serving 500+ users. 
                    Migrated from ASP.NET Framework to Core with Angular frontend.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">ASP.NET Core</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Angular</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">SQL Server</span>
                  </div>
                  <div className="text-sm text-gray-500">Case study coming soon</div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aviation Logistics Platform
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Real-time logistics management system for aviation industry. 
                    Handles complex scheduling and resource allocation.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">ASP.NET</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">WCF</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Angular</span>
                  </div>
                  <div className="text-sm text-gray-500">Case study coming soon</div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <ExternalLink className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Manufacturing Process System
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Internal web applications for automotive manufacturing processes. 
                    Streamlined operations and improved efficiency.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">ASP.NET MVC</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">JavaScript</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">SQL Server</span>
                  </div>
                  <div className="text-sm text-gray-500">Case study coming soon</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <article
                  key={project.slug}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    {project.featured && (
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>
                          {project.startDate ? formatDateShort(project.startDate) : 'Recent'}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {project.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {project.readingTime && (
                        <span className="text-xs text-gray-500">
                          {project.readingTime} min read
                        </span>
                      )}
                      
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
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
      <section className="py-20 bg-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let&apos;s discuss your project requirements and explore how my enterprise 
            development experience can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-cyan-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 border  text-white font-medium rounded-lg "
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
