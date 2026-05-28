'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROFILE } from '@/data/portfolio';

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">About</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 }} className="section-heading mb-16">
          Builder. Learner.<br /><span className="text-gradient">Problem-solver.</span>
        </motion.h2>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="space-y-6">
            {PROFILE.bio.map((para: string, i: number) => (
              <p key={i} style={{ fontSize: i === 0 ? 20 : 16, lineHeight: 1.8, color: i === 0 ? '#e8eaf0' : 'rgba(232,234,240,0.6)', fontWeight: i === 0 ? 500 : 400 }}>{para}</p>
            ))}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {PROFILE.stats.map((stat: { value: string; label: string }, i: number) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 20 }}>
                  <div className="stat-number">{stat.value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)', marginTop: 6 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Full-Stack Development', body: 'I build complete products — front to back. React, Next.js, Node.js, PHP, MySQL. Whatever the project needs.' },
              { num: '02', title: 'AI & Workflow Automation', body: 'I use n8n and AI APIs to automate the boring stuff. Real pipelines, real time saved.' },
              { num: '03', title: 'Shipping Real Products', body: 'I have built for universities and government agencies. The code runs in production, used by real people.' },
            ].map((item, i) => (
              <motion.div key={item.num} initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }} className="glass-hover p-6">
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#22d3ee', opacity: 0.6, marginTop: 3, flexShrink: 0 }}>{item.num}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#f0f2f8', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(148,163,184,0.8)' }}>{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="flex gap-6 pt-2">
              {[{ label: 'GitHub', href: PROFILE.github }, { label: 'LinkedIn', href: PROFILE.linkedin }, { label: 'Email', href: `mailto:${PROFILE.email}` }].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, fontWeight: 600, color: 'rgba(148,163,184,0.6)', textDecoration: 'none', fontFamily: 'Syne, sans-serif', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.6)')}>
                  {l.label} →
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
