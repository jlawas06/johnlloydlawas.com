import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import { Award, Calendar, Code, MapPin, Target, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${personalInfo.name}, a Full Stack Developer with ${getTotalExperience()}+ years of experience in enterprise application development. Available for remote work and international collaborations.`,
};

export default function AboutPage() {
  const totalYears = getTotalExperience();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                About <span className="text-cyan-600">Me</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {personalInfo.bio}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin size={20} className="text-cyan-600" />
                  <span>{personalInfo.location.split(',').slice(-2).join(',').trim()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar size={20} className="text-green-600" />
                  <span>{totalYears}+ years experience</span>
                </div>
              </div>
            </div>
            
            {/* Profile placeholder */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-80 h-80 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-white text-6xl font-bold">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              My Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                          Building enterprise applications requires more than just technical skills. 
            Here&apos;s what drives my development philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Code className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Clean Code</h3>
              <p className="text-gray-600">
                Writing maintainable, scalable code that follows industry best practices and patterns.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Collaboration</h3>
              <p className="text-gray-600">
                Working effectively with cross-functional teams and stakeholders to deliver solutions.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Quality</h3>
              <p className="text-gray-600">
                Committed to delivering high-quality solutions through testing, code reviews, and continuous improvement.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Results</h3>
              <p className="text-gray-600">
                Focused on solving real business problems and delivering measurable value to organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            My Journey
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              My journey in software development began during my studies at the University of San Carlos, 
              where I earned my Certificate of Computer Technology. What started as curiosity about how 
              applications work evolved into a passion for building solutions that make a real difference.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Over the past {totalYears} years, I&apos;ve had the privilege of working with diverse teams across 
              multiple industries, from automotive manufacturing at Lear Corporation to aviation and logistics 
              at Sense Software Solutions. Each role has taught me valuable lessons about enterprise software 
              development, agile methodologies, and the importance of understanding business requirements.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
                          My expertise in ASP.NET Core and Angular has been developed through hands-on experience building 
            and modernizing enterprise applications. I&apos;ve been involved in legacy system revamps, integrating 
            third-party systems, and mentoring junior developers. These experiences have shaped my understanding 
            of both the technical and human aspects of software development.
            </p>

            <p className="text-gray-700 leading-relaxed">
                          Currently based in Cebu City, Philippines, I&apos;m passionate about working with international teams 
            and contributing to global software projects. I have extensive experience in remote collaboration 
            across different time zones and believe in continuous learning, staying current with technology trends, 
            and sharing knowledge with the worldwide developer community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-cyan-600">{totalYears}+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">10+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">5</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">15+</div>
              <div className="text-gray-600">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Ready to discuss your next international project? I&apos;d love to hear about your challenges 
            and explore how we can build something amazing together, regardless of your location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-cyan-600 font-medium rounded-lg hover:bg-cyan-50 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 border border-cyan-400 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
