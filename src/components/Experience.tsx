'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EXPERIENCE } from '@/data/portfolio';

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section id="experience" ref={ref} className="relative py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">Experience</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 }} className="section-heading mb-20">
          Where I have<br /><span className="text-gradient">been building.</span>
        </motion.h2>
        <div className="relative">
          <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom, #22d3ee, rgba(124,58,237,0.3), transparent)' }} />
          <div style={{ paddingLeft: 40 }} className="space-y-16">
            {EXPERIENCE.map((item: { date: string; title: string; org: string; type: string; description: string; bullets: string[] }, i: number) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.15 }} className="relative">
                <div style={{ position: 'absolute', left: -46, top: 6, width: 12, height: 12, borderRadius: '50%', background: '#22d3ee', border: '2px solid #080c14', boxShadow: '0 0 0 4px rgba(34,211,238,0.15)' }} />
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.12em', color: '#22d3ee', opacity: 0.7, marginBottom: 12, textTransform: 'uppercase' }}>{item.date}</p>
                <div className="glass-hover" style={{ padding: '28px 32px' }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, color: '#f0f2f8' }}>{item.title}</h3>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, ...(item.type === 'Internship' ? { background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' } : { background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }) }}>{item.type}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(34,211,238,0.7)', fontWeight: 500, marginBottom: 12 }}>{item.org}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(148,163,184,0.8)', marginBottom: 20 }}>{item.description}</p>
                  <ul className="space-y-3">
                    {item.bullets.map((b: string) => (
                      <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'rgba(148,163,184,0.7)', lineHeight: 1.6 }}>
                        <span style={{ color: '#22d3ee', flexShrink: 0, marginTop: 2 }}>→</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
