'use client';

import { formatDate } from '@/lib/utils';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './theme-provider';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  author: string;
  tags: string[];
  featured?: boolean;
}

interface BlogContentProps {
  posts: Post[];
  tags: string[];
}

export default function BlogContent({ posts, tags }: BlogContentProps) {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${colors.background}`}>
      {/* Hero Section */}
      <section className={`py-20 transition-colors duration-300 ${colors.backgroundSecondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 transition-colors ${colors.text}`}>
              Technical Blog
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 transition-colors ${colors.textSecondary}`}>
              Insights and experiences from 6+ years of enterprise software development. 
              Deep dives into ASP.NET Core, Angular, and modern development practices.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${colors.backgroundTertiary} ${colors.textSecondary}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className={`py-20 transition-colors duration-300 ${colors.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className={`text-xl font-semibold mb-2 transition-colors ${colors.text}`}>
                Blog posts coming soon!
              </h3>
              <p className={`transition-colors ${colors.textSecondary}`}>
                I&apos;m working on some great content about enterprise development, 
                ASP.NET Core best practices, and Angular optimization techniques.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-fade-in ${colors.cardSolid} ${colors.border} border hover:shadow-xl ${
                    post.featured ? 'lg:col-span-2' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-8">
                    {post.featured && (
                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${colors.warningBg} ${colors.warning}`}>
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <h2 className={`text-2xl font-bold mb-3 transition-colors ${colors.text} ${colors.linkHover}`}>
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className={`mb-4 leading-relaxed transition-colors ${colors.textSecondary}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className={`flex items-center justify-between text-sm mb-4 transition-colors ${colors.textMuted}`}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                      <div className={`font-medium transition-colors ${colors.textSecondary}`}>
                        {post.author}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`flex items-center space-x-1 px-2 py-1 text-xs rounded transition-colors ${colors.backgroundTertiary} ${colors.textSecondary}`}
                          >
                            <Tag size={12} />
                            <span>{tag}</span>
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className={`px-2 py-1 text-xs rounded transition-colors ${colors.backgroundTertiary} ${colors.textSecondary}`}>
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className={`inline-flex items-center space-x-1 font-medium transition-colors group ${colors.accent} ${colors.linkHover}`}
                      >
                        <span>Read More</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={`py-20 transition-colors duration-300 ${colors.card} ${colors.border} border-t`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${colors.text}`}>
            Stay Updated
          </h2>
          <p className={`text-xl mb-8 transition-colors ${colors.textSecondary}`}>
            Get notified when I publish new articles about enterprise development 
            and modern software engineering practices.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border transition-colors ${colors.formInput} ${colors.formPlaceholder} ${colors.border}`}
              />
              <button className={`px-6 py-3 font-medium rounded-lg transition-colors ${colors.button} ${colors.buttonText}`}>
                Subscribe
              </button>
            </div>
            <p className={`text-sm mt-2 transition-colors ${colors.textMuted}`}>
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
