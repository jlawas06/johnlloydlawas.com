export type SkillLevel = 'core' | 'proficient' | 'familiar';

export interface Skill {
  name: string;
  /** Lowercase mono-friendly display slug, e.g. `aspnet-core` */
  slug?: string;
  /** Years of practical experience */
  years: number;
  level: SkillLevel;
  note?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'backend',
    description: 'Server-side runtimes, frameworks, and APIs.',
    skills: [
      { name: 'C#', slug: 'csharp', years: 6, level: 'core' },
      { name: 'ASP.NET Core', slug: 'aspnet-core', years: 5, level: 'core' },
      { name: 'ASP.NET Framework', slug: 'aspnet-framework', years: 4, level: 'proficient' },
      { name: 'Web API', slug: 'web-api', years: 5, level: 'proficient' },
      { name: 'Entity Framework', slug: 'entity-framework', years: 4, level: 'proficient' },
      { name: 'WCF', slug: 'wcf', years: 1, level: 'familiar' },
    ],
  },
  {
    name: 'frontend',
    description: 'Client-side frameworks, languages, and styling.',
    skills: [
      { name: 'Angular', slug: 'angular', years: 5, level: 'core' },
      { name: 'TypeScript', slug: 'typescript', years: 5, level: 'core' },
      { name: 'JavaScript', slug: 'javascript', years: 6, level: 'core' },
      { name: 'HTML', slug: 'html', years: 6, level: 'proficient' },
      { name: 'CSS', slug: 'css', years: 6, level: 'proficient' },
      { name: 'TailwindCSS', slug: 'tailwindcss', years: 2, level: 'proficient' },
      { name: 'React / Next.js', slug: 'react-nextjs', years: 2, level: 'proficient' },
      { name: 'Svelte / SvelteKit', slug: 'svelte-sveltekit', years: 1, level: 'familiar' },
      { name: 'Chrome Extensions', slug: 'chrome-extensions', years: 2, level: 'proficient' },
      { name: 'Bootstrap', slug: 'bootstrap', years: 4, level: 'proficient' },
      { name: 'Kendo UI', slug: 'kendo-ui', years: 2, level: 'familiar' },
      { name: 'Ionic', slug: 'ionic', years: 1, level: 'familiar' },
      { name: 'jQuery', slug: 'jquery', years: 3, level: 'familiar' },
    ],
  },
  {
    name: 'ai & automation',
    description: 'LLM integrations and agentic tooling.',
    skills: [
      { name: 'OpenAI API', slug: 'openai-api', years: 2, level: 'proficient' },
      { name: 'Claude API', slug: 'claude-api', years: 2, level: 'proficient' },
      { name: 'Gemini API', slug: 'gemini-api', years: 1, level: 'familiar' },
      { name: 'LLM Integration', slug: 'llm-integration', years: 2, level: 'proficient' },
      { name: 'Prompt Engineering', slug: 'prompt-engineering', years: 2, level: 'proficient' },
      { name: 'RAG / Embeddings', slug: 'rag-embeddings', years: 1, level: 'familiar' },
      { name: 'MCP (Model Context Protocol)', slug: 'mcp', years: 1, level: 'familiar' },
      { name: 'n8n', slug: 'n8n', years: 1, level: 'familiar' },
    ],
  },
  {
    name: 'ai-assisted dev',
    description: 'Tools I pair with daily to ship faster.',
    skills: [
      { name: 'Cursor', slug: 'cursor', years: 2, level: 'core' },
      { name: 'Claude Code', slug: 'claude-code', years: 1, level: 'core' },
      { name: 'GitHub Copilot', slug: 'github-copilot', years: 3, level: 'proficient' },
      { name: 'ChatGPT', slug: 'chatgpt', years: 2, level: 'core' },
      { name: 'v0 / Bolt', slug: 'v0-bolt', years: 1, level: 'familiar' },
    ],
  },
  {
    name: 'data & baas',
    description: 'Databases and backend-as-a-service platforms.',
    skills: [
      { name: 'SQL Server', slug: 'sql-server', years: 6, level: 'core' },
      { name: 'T-SQL', slug: 'tsql', years: 6, level: 'proficient' },
      { name: 'Supabase', slug: 'supabase', years: 2, level: 'proficient' },
      { name: 'PostgreSQL', slug: 'postgresql', years: 2, level: 'proficient' },
      { name: 'Xano', slug: 'xano', years: 5, level: 'core' },
    ],
  },
  {
    name: 'cloud & hosting',
    description: 'Platforms, deployment, and infrastructure.',
    skills: [
      { name: 'Azure', slug: 'azure', years: 2, level: 'proficient' },
      { name: 'AWS', slug: 'aws', years: 2, level: 'proficient' },
      { name: 'Digital Ocean', slug: 'digital-ocean', years: 2, level: 'proficient' },
      { name: 'Vercel', slug: 'vercel', years: 2, level: 'proficient' },
      { name: 'Cloudflare', slug: 'cloudflare', years: 1, level: 'familiar' },
      { name: 'Git', slug: 'git', years: 6, level: 'core' },
      { name: 'Azure DevOps', slug: 'azure-devops', years: 3, level: 'proficient' },
    ],
  },
  {
    name: 'practices',
    description: 'Methodology, quality, and collaboration.',
    skills: [
      { name: 'Agile / Scrum', slug: 'agile', years: 6, level: 'proficient' },
      { name: 'Code Review', slug: 'code-review', years: 5, level: 'proficient' },
      { name: 'Unit Testing', slug: 'unit-testing', years: 4, level: 'proficient' },
    ],
  },
];

export const topSkills: string[] = [
  'C#',
  'ASP.NET Core',
  'Angular',
  'TypeScript',
  'SQL Server',
  'Azure',
  'Xano',
  'Cursor',
  'Claude Code',
];
