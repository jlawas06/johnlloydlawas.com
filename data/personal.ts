export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  bio: string;
  avatar?: string;
}

export const personalInfo: PersonalInfo = {
  name: "John Lloyd Lawas",
  title: "Full Stack Developer",
  location: "Punta Princesa, Cebu City, Cebu 6000",
  phone: "+639626905612",
  email: "johnlloydlawas06@gmail.com",
  linkedin: "https://www.linkedin.com/in/john-lloyd-lawas/",
  summary: "Full Stack Developer with 6+ years of experience specializing in developing web applications using ASP.NET Core/Framework and Angular. Skilled in architecting and executing customized, data-driven solutions hosted both on-premise and in the cloud.",
  bio: "Experienced Full Stack Developer with expertise in requirements analysis, design, development, testing, maintenance, enhancement, and production support of business applications. Passionate about creating scalable, efficient solutions for enterprise environments using modern technologies and agile methodologies.",
};
