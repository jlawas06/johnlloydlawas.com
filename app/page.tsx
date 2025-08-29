import ContactForm from '@/components/ui/contact-form';
import ExperienceTimeline from '@/components/ui/experience-timeline';
import Hero from '@/components/ui/hero';
import SkillsShowcase from '@/components/ui/skills-showcase';

export default function Home() {
  return (
    <div className="transition-colors duration-300">
      <Hero />
      <SkillsShowcase />
      <ExperienceTimeline />
      <ContactForm />
    </div>
  );
}
