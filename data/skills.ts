export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 1-100
  icon?: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Backend Development",
    description: "Server-side technologies and frameworks",
    skills: [
      {
        name: "C#",
        category: "Backend",
        proficiency: 95,
        description: "Advanced proficiency in C# with 7+ years of experience"
      },
      {
        name: "ASP.NET Core",
        category: "Backend",
        proficiency: 90,
        description: "Extensive experience building enterprise applications"
      },
      {
        name: "ASP.NET Framework",
        category: "Backend",
        proficiency: 88,
        description: "Legacy framework experience for modernization projects"
      },
      {
        name: "Web API",
        category: "Backend",
        proficiency: 85,
        description: "RESTful API design and development"
      },
      {
        name: "WCF",
        category: "Backend",
        proficiency: 75,
        description: "Windows Communication Foundation services"
      }
    ]
  },
  {
    name: "Frontend Development",
    description: "Client-side technologies and frameworks",
    skills: [
      {
        name: "Angular",
        category: "Frontend",
        proficiency: 85,
        description: "Modern Angular applications with TypeScript"
      },
      {
        name: "TypeScript",
        category: "Frontend",
        proficiency: 82,
        description: "Strongly-typed JavaScript development"
      },
      {
        name: "JavaScript",
        category: "Frontend",
        proficiency: 80,
        description: "Modern ES6+ JavaScript development"
      },
      {
        name: "HTML",
        category: "Frontend",
        proficiency: 90,
        description: "Semantic HTML and accessibility best practices"
      },
      {
        name: "CSS",
        category: "Frontend",
        proficiency: 85,
        description: "Modern CSS with responsive design"
      },
      {
        name: "jQuery",
        category: "Frontend",
        proficiency: 75,
        description: "Legacy JavaScript framework experience"
      },
      {
        name: "Ionic",
        category: "Frontend",
        proficiency: 70,
        description: "Mobile application development"
      }
    ]
  },
  {
    name: "UI Frameworks & Libraries",
    description: "Design systems and component libraries",
    skills: [
      {
        name: "Bootstrap",
        category: "UI",
        proficiency: 85,
        description: "Responsive design framework"
      },
      {
        name: "TailwindCSS",
        category: "UI",
        proficiency: 80,
        description: "Utility-first CSS framework"
      },
      {
        name: "Kendo UI",
        category: "UI",
        proficiency: 75,
        description: "Enterprise UI component library"
      }
    ]
  },
  {
    name: "Database & Data",
    description: "Database technologies and data management",
    skills: [
      {
        name: "SQL Server",
        category: "Database",
        proficiency: 85,
        description: "Database design, optimization, and management"
      }
    ]
  },
  {
    name: "Development Practices",
    description: "Methodologies and development practices",
    skills: [
      {
        name: "Agile Development",
        category: "Methodology",
        proficiency: 85,
        description: "Scrum and agile development methodologies"
      },
      {
        name: "Code Reviews",
        category: "Practice",
        proficiency: 80,
        description: "Peer code review and quality assurance"
      },
      {
        name: "Unit Testing",
        category: "Testing",
        proficiency: 75,
        description: "Test-driven development practices"
      },
      {
        name: "Git",
        category: "Tools",
        proficiency: 85,
        description: "Version control and collaboration"
      }
    ]
  }
];

export const topSkills = [
  "C#",
  "ASP.NET Core",
  "Angular",
  "TypeScript",
  "SQL Server",
  "Agile Development"
];
