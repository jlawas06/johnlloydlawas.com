export interface Experience {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
  companyLogo?: string;
}

export const experiences: Experience[] = [
  {
    id: "nowcom-2022",
    position: "Mid Software Engineer III",
    company: "Nowcom Global Services",
    startDate: "December 2022",
    endDate: "March 2025",
    current: false,
    description: "Leading full-stack development initiatives for enterprise applications with focus on .NET technologies and Angular frontend solutions.",
    responsibilities: [
      "Collaborated with stakeholders to gather requirements and propose technical solutions",
      "Designed and developed .NET-based enterprise applications, integrating with third-party and in-house systems",
      "Worked with Agile teams, performed code reviews",
      "Stayed updated on cloud technologies, .NET platform, and web development tools",
      "Involved in revamping in-house legacy application using .NET and Angular"
    ],
    technologies: [
      "ASP.NET Core",
      "Angular",
      "C#",
      "SQL Server",
      "Azure",
      "Git"
    ],
    achievements: [
      "Successfully modernized legacy applications improving performance by 40%",
      "Led technical discussions with stakeholders resulting in improved solution architecture",
      "Mentored junior developers in best practices and code review processes"
    ]
  },
  {
    id: "yondu-2022",
    position: "Software Engineer",
    company: "Yondu Inc.",
    startDate: "January 2022",
    endDate: "December 2022",
    current: false,
    description: "Full-stack development role focusing on delivering high-quality software solutions within tight deadlines using industry-standard practices.",
    responsibilities: [
      "Translated technical designs into functional code for both backend and front-end",
      "Consistently delivered projects on time and within budget",
      "Implemented industry-standard programming techniques for efficient program logic and data manipulation",
      "Developed and maintained unit tests to ensure application quality",
      "Diagnosed and resolved software issues promptly",
      "Collaborated in project requirement reviews",
      "Managed project source code repositories"
    ],
    technologies: [
      "ASP.NET Core",
      "Angular",
      "C#",
      "TypeScript",
      "SQL Server",
      "Git"
    ],
    achievements: [
      "Maintained 100% on-time project delivery record",
      "Implemented comprehensive unit testing strategy increasing code coverage by 60%",
      "Resolved critical production issues reducing downtime by 30%"
    ]
  },
  {
    id: "osl-2019",
    position: "Senior Application Developer",
    company: "OSL International Inc.",
    startDate: "November 2019",
    endDate: "January 2022",
    current: false,
    description: "Senior development role focused on modernizing web applications and maintaining high code quality standards while mentoring team members.",
    responsibilities: [
      "Developed web applications using ASP.NET Core/Framework API and Angular",
      "Modernized existing web applications using the latest frameworks",
      "Conducted requirements scoping for website enhancement requests",
      "Maintained code and application quality standards",
      "Assisted colleagues in resolving development issues",
      "Actively participated in problem-solving to meet project requirements"
    ],
    technologies: [
      "ASP.NET Core",
      "ASP.NET Framework",
      "Angular",
      "C#",
      "SQL Server",
      "Bootstrap"
    ],
    achievements: [
      "Led modernization of 5+ legacy applications to modern frameworks",
      "Established coding standards and best practices for the development team",
      "Reduced application load times by 50% through optimization techniques"
    ]
  },
  {
    id: "sense-2019",
    position: "Software Design and Development Engineer",
    company: "Sense Software Solutions",
    startDate: "May 2019",
    endDate: "October 2019",
    current: false,
    description: "Specialized development role for aviation and logistics industry applications, working with international teams and agile methodologies.",
    responsibilities: [
      "Designed and developed web applications using ASP.NET for the aviation and logistics industries",
      "Created WCF web services",
      "Developed Angular web applications",
      "Built web API web services",
      "Participated in agile-driven development methodologies",
      "Collaborated with business architects in Singapore to coordinate software requirements"
    ],
    technologies: [
      "ASP.NET",
      "Angular",
      "WCF",
      "Web API",
      "C#",
      "SQL Server"
    ],
    achievements: [
      "Successfully delivered aviation logistics application used by multiple airlines",
      "Collaborated effectively with international teams across different time zones",
      "Implemented robust WCF services handling high-volume transactions"
    ]
  },
  {
    id: "lear-2018",
    position: "Software Developer Intern",
    company: "Lear Corporation",
    startDate: "June 2018",
    endDate: "April 2019",
    current: false,
    description: "Entry-level position where I gained foundational experience in enterprise web application development using ASP.NET MVC framework.",
    responsibilities: [
      "Designed and developed in-house web applications using ASP.NET MVC",
      "Learned enterprise development practices and patterns",
      "Participated in code reviews and team development processes",
      "Assisted in maintaining existing applications"
    ],
    technologies: [
      "ASP.NET MVC",
      "C#",
      "SQL Server",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    achievements: [
      "Successfully transitioned from intern to full-time developer track",
      "Developed internal tools that improved team productivity",
      "Gained solid foundation in enterprise application development"
    ]
  }
];

export const totalExperienceYears = () => {
  const startDate = new Date('2018-06-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
};
