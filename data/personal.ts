export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  /** Short (~150 chars) version of summary for SERP meta descriptions. */
  metaDescription: string;
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
  github: "https://github.com/jlawas06",
  metaDescription:
    "Full-stack engineer. I modernise slow enterprise systems on ASP.NET Core and Angular, and ship AI-integrated products in React and Next.js. Remote from Cebu City, PH.",
  summary:
    "Full-stack engineer who makes aging software fast again and builds AI products that hold up in production. Enterprise ASP.NET Core and Angular platforms through to Chrome extensions and SaaS wired into the OpenAI, Claude and Gemini APIs. Remote from Cebu City, working across every timezone.",
  bio: "I moved from enterprise .NET modernisation into AI-integrated product work. I've shipped ERP, aviation logistics and manufacturing platforms on ASP.NET and Angular, and now build Chrome extensions and SaaS tools wired into the OpenAI, Claude and Gemini APIs. I care about shipped code, measurable impact, and tools that respect a maintainer's time.",
};
