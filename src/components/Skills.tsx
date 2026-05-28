'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '@/data/portfolio';

const proficiencies = [
  { name: 'React & Next.js', level: 92 },
  { name: 'JavaScript / Node.js', level: 88 },
  { name: 'PHP & MySQL', level: 85 },
  { name: 'AI Automation (n8n)', level: 78 },
  { name: 'Cloud / DevOps', level: 65 },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">Stack</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 }} className="section-heading mb-16">
          Tools I use<br /><span className="text-gradient">every day.</span>
        </motion.h2>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            {SKILLS.map((group: { category: string; icon: string; color: string; tags: string[]; featured: string[] }, i: number) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.12em', color: '#22d3ee', opacity: 0.7, marginBottom: 12, textTransform: 'uppercase' }}>{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag: string) => (
                    <span key={tag} className="tag" style={group.featured.includes(tag) ? { background: 'rgba(34,211,238,0.08)', borderColor: 'rgba(34,211,238,0.3)', color: '#22d3ee' } : {}}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, color: '#f0f2f8', marginBottom: 32 }}>Proficiency</motion.p>
            <div className="space-y-8">
              {proficiencies.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#e8eaf0' }}>{skill.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#22d3ee' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }} transition={{ duration: 1.2, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                      style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #22d3ee, #7c3aed)' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
