import ContactForm from '@/components/ui/contact-form';
import ExperienceTimeline from '@/components/ui/experience-timeline';
import Hero from '@/components/ui/hero';
import SkillsShowcase from '@/components/ui/skills-showcase';

export default function Home() {
  return (
    <div className="transition-colors">
      <Hero />
      <SkillsShowcase />
      <ExperienceTimeline />
      <ContactForm />
    </div>
  );
}
