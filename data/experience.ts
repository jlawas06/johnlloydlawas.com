export interface Experience {
  id: string;
  position: string;
  company: string;
  location?: string;
  /** ISO month string: `YYYY-MM` */
  startDate: string;
  /** ISO month string `YYYY-MM`, or `null` for current roles */
  endDate: string | null;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'liftoff-2025',
    position: 'Software Developer',
    company: 'Liftoff Company Inc.',
    startDate: '2025-03',
    endDate: null,
    description:
      'Building and maintaining Chrome extensions and SaaS products with heavy AI integration. Daily driver on Cursor and Claude Code to ship faster.',
    responsibilities: [
      'Maintain and extend a suite of Chrome extensions used in production',
      'Design and ship features across several SaaS products',
      'Integrate LLM APIs (OpenAI, Claude, Gemini) into product workflows',
      'Work primarily with AI-native tooling — Cursor and Claude Code — for day-to-day development',
      'Collaborate async with a small, distributed team',
    ],
    technologies: [
      'TypeScript',
      'Chrome Extensions',
      'React',
      'Next.js',
      'Xano',
      'Supabase',
      'OpenAI',
      'Claude',
      'Cursor',
      'Claude Code',
    ],
    achievements: [
      'Shipped AI-powered features into production Chrome extensions',
      'Cut feature turnaround time significantly by adopting AI-assisted workflows',
    ],
  },
  {
    id: 'nowcom-2022',
    position: 'Mid Software Engineer III',
    company: 'Nowcom Global Services',
    startDate: '2022-12',
    endDate: '2025-03',
    description:
      'Led full-stack development initiatives for enterprise applications with a focus on .NET and Angular.',
    responsibilities: [
      'Collaborated with stakeholders to gather requirements and propose technical solutions',
      'Designed and developed .NET-based enterprise applications, integrating third-party and in-house systems',
      'Worked with Agile teams and performed code reviews',
      'Revamped an in-house legacy application using .NET and Angular',
      'Stayed current with cloud, .NET platform, and web development tooling',
    ],
    technologies: ['ASP.NET Core', 'Angular', 'C#', 'SQL Server', 'Azure', 'Git'],
    achievements: [
      'Modernized legacy applications, improving performance by ~40%',
      'Mentored junior developers on best practices and code reviews',
    ],
  },
  {
    id: 'yondu-2022',
    position: 'Software Engineer',
    company: 'Yondu Inc.',
    startDate: '2022-01',
    endDate: '2022-12',
    description:
      'Full-stack role delivering high-quality software on tight deadlines using industry-standard practices.',
    responsibilities: [
      'Translated technical designs into functional code for backend and frontend',
      'Consistently delivered projects on time and within budget',
      'Implemented efficient program logic and data manipulation',
      'Developed and maintained unit tests',
      'Diagnosed and resolved software issues promptly',
      'Managed project source code repositories',
    ],
    technologies: ['ASP.NET Core', 'Angular', 'C#', 'TypeScript', 'SQL Server', 'Git'],
    achievements: [
      'Maintained 100% on-time project delivery record',
      'Raised code coverage by ~60% through a unit testing strategy',
    ],
  },
  {
    id: 'osl-2019',
    position: 'Senior Application Developer',
    company: 'OSL International Inc.',
    startDate: '2019-11',
    endDate: '2022-01',
    description:
      'Senior role focused on modernizing web applications, maintaining high code quality, and mentoring team members.',
    responsibilities: [
      'Developed web applications using ASP.NET Core/Framework and Angular',
      'Modernized existing web applications with the latest frameworks',
      'Scoped requirements for website enhancement requests',
      'Maintained code and application quality standards',
      'Mentored colleagues and helped resolve development issues',
    ],
    technologies: [
      'ASP.NET Core',
      'ASP.NET Framework',
      'Angular',
      'C#',
      'SQL Server',
      'Bootstrap',
    ],
    achievements: [
      'Led modernization of 5+ legacy applications',
      'Established coding standards for the development team',
      'Reduced application load times by ~50% through optimization',
    ],
  },
  {
    id: 'sense-2019',
    position: 'Software Design & Development Engineer',
    company: 'Sense Software Solutions',
    startDate: '2019-05',
    endDate: '2019-10',
    description:
      'Specialized role for aviation and logistics applications, working with international teams under agile methodologies.',
    responsibilities: [
      'Designed and developed web applications using ASP.NET for aviation and logistics',
      'Created WCF web services and Web APIs',
      'Developed Angular web applications',
      'Collaborated with business architects in Singapore to coordinate requirements',
    ],
    technologies: ['ASP.NET', 'Angular', 'WCF', 'Web API', 'C#', 'SQL Server'],
    achievements: [
      'Delivered aviation logistics application used by multiple airlines',
      'Implemented robust WCF services handling high-volume transactions',
    ],
  },
  {
    id: 'lear-2018',
    position: 'Software Developer Intern',
    company: 'Lear Corporation',
    startDate: '2018-06',
    endDate: '2019-04',
    description:
      'Entry-level role where I gained foundational experience in enterprise web development using ASP.NET MVC.',
    responsibilities: [
      'Designed and developed in-house web applications using ASP.NET MVC',
      'Learned enterprise development practices and patterns',
      'Participated in code reviews and team development processes',
      'Assisted in maintaining existing applications',
    ],
    technologies: ['ASP.NET MVC', 'C#', 'SQL Server', 'JavaScript', 'HTML', 'CSS'],
    achievements: [
      'Transitioned from intern to full-time developer track',
      'Developed internal tools that improved team productivity',
    ],
  },
];
