export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github?: string;
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
  summary: "Full Stack Developer with 7+ years building production software — from enterprise ASP.NET Core/Angular platforms to AI-integrated Chrome extensions and SaaS products. Currently at Liftoff Company Inc., shipping LLM-backed features with Cursor and Claude Code in the daily loop.",
  bio: "Full-stack engineer who moved from enterprise .NET modernization into AI-integrated product work. I've shipped ERP, aviation logistics, and manufacturing platforms on ASP.NET and Angular, and now build Chrome extensions and SaaS tools wired into the OpenAI, Claude, and Gemini APIs. I care about shipped code, measurable impact, and tools that respect a maintainer's time.",
};
