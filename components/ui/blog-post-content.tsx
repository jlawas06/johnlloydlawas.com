'use client';

import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import Link from 'next/link';
import ReadingProgress from './reading-progress';
import { useTheme } from './theme-provider';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  author: string;
  tags: string[];
  featured?: boolean;
}

interface BlogPostContentProps {
  post: BlogPost;
  children: React.ReactNode; // This will be the MDX content
}

export default function BlogPostContent({ post, children }: BlogPostContentProps) {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${colors.background}`}>
      <ReadingProgress />
      {/* Header */}
      <header className={`py-12 transition-colors duration-300 ${colors.backgroundSecondary}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className={`inline-flex items-center space-x-2 font-medium mb-6 transition-colors group ${colors.accent} ${colors.linkHover}`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>
          
          <div className="space-y-4">
            {post.featured && (
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors ${colors.warningBg} ${colors.warning}`}>
                Featured Article
              </span>
            )}
            
            <h1 className={`text-4xl sm:text-5xl font-bold leading-tight transition-colors ${colors.text}`}>
              {post.title}
            </h1>
            
            <p className={`text-xl leading-relaxed transition-colors ${colors.textSecondary}`}>
              {post.excerpt}
            </p>
            
            <div className={`flex flex-wrap items-center gap-6 text-sm transition-colors ${colors.textMuted}`}>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
              <div className={`font-medium transition-colors ${colors.textSecondary}`}>
                By {post.author}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-full transition-colors ${colors.backgroundTertiary} ${colors.textSecondary}`}
                >
                  <Tag size={12} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className={`py-12 transition-colors duration-300 ${colors.background}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          <div className={`mb-12 p-6 rounded-lg transition-colors ${colors.backgroundSecondary} ${colors.border} border`}>
            <h3 className={`text-lg font-semibold mb-4 transition-colors ${colors.text}`}>
              📋 Table of Contents
            </h3>
            <nav className="space-y-2">
              <ul className={`space-y-1 text-sm transition-colors ${colors.textSecondary}`}>
                <li><a href="#understanding-performance-bottlenecks" className={`hover:${colors.accent} transition-colors`}>Understanding Performance Bottlenecks</a></li>
                <li><a href="#virtual-scrolling-for-large-datasets" className={`hover:${colors.accent} transition-colors`}>Virtual Scrolling for Large Datasets</a></li>
                <li><a href="#state-management-performance" className={`hover:${colors.accent} transition-colors`}>State Management Performance</a></li>
                <li><a href="#http-optimization-strategies" className={`hover:${colors.accent} transition-colors`}>HTTP Optimization Strategies</a></li>
                <li><a href="#component-optimization" className={`hover:${colors.accent} transition-colors`}>Component Optimization</a></li>
                <li><a href="#bundle-optimization" className={`hover:${colors.accent} transition-colors`}>Bundle Optimization</a></li>
                <li><a href="#image-and-asset-optimization" className={`hover:${colors.accent} transition-colors`}>Image and Asset Optimization</a></li>
                <li><a href="#real-world-performance-metrics" className={`hover:${colors.accent} transition-colors`}>Real-World Performance Metrics</a></li>
                <li><a href="#performance-monitoring" className={`hover:${colors.accent} transition-colors`}>Performance Monitoring</a></li>
                <li><a href="#key-takeaways" className={`hover:${colors.accent} transition-colors`}>Key Takeaways</a></li>
              </ul>
            </nav>
          </div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-12 transition-colors duration-300 ${colors.card} ${colors.border} border-t`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-4">
              <button className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${colors.button} ${colors.buttonText}`}>
                <Share2 size={16} />
                <span>Share Article</span>
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-lg font-semibold transition-colors ${colors.text}`}>
                Enjoyed this article?
              </h3>
              <p className={`transition-colors ${colors.textSecondary}`}>
                Feel free to reach out if you have questions or want to discuss enterprise development topics.
              </p>
              <div className="flex justify-center space-x-4 pt-2">
                <Link
                  href="/contact"
                  className={`font-medium transition-colors ${colors.accent} ${colors.linkHover}`}
                >
                  Get In Touch
                </Link>
                <Link
                  href="/blog"
                  className={`font-medium transition-colors ${colors.textSecondary} ${colors.linkHover}`}
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
