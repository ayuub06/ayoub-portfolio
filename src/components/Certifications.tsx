'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CERTIFICATIONS } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/animations/variants';

export default function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="certs" ref={ref} className="relative py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">Certifications</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 }} className="section-heading mb-4">
          Validated.<br /><span className="text-gradient">On paper.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }} style={{ fontSize: 15, color: 'rgba(148,163,184,0.6)', marginBottom: 56 }}>Click any certificate to view it.</motion.p>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert: { title: string; issuer: string; icon: string; color: string; status: string; image: string; linkedinUrl: string }, i: number) => (
            <motion.div key={cert.title} variants={staggerItem} onClick={() => setSelected(i)} className="group cursor-pointer overflow-hidden"
              style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s, transform 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              <div style={{ position: 'relative', height: 140, background: cert.color, overflow: 'hidden' }}>
                <Image src={cert.image} alt={cert.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, ...(cert.status === 'earned' ? { background: 'rgba(16,185,129,0.8)', color: '#fff' } : { background: 'rgba(245,158,11,0.8)', color: '#fff' }) }}>
                    {cert.status === 'earned' ? 'Earned' : 'In Progress'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{cert.icon}</span>
                  <div>
                    <h4 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 13, color: '#f0f2f8', lineHeight: 1.3 }}>{cert.title}</h4>
                    <p style={{ fontSize: 11, color: 'rgba(148,163,184,0.6)', marginTop: 2 }}>{cert.issuer}</p>
                  </div>
                </div>
                <a href={cert.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(148,163,184,0.5)', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.5)')}>
                  <svg style={{ width: 12, height: 12 }} fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
                  View on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }} onClick={e => e.stopPropagation()}
              style={{ maxWidth: 680, width: '100%', borderRadius: 20, overflow: 'hidden', background: 'rgba(8,12,20,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'relative', height: 400 }}>
                <Image src={CERTIFICATIONS[selected].image} alt={CERTIFICATIONS[selected].title} fill className="object-contain" style={{ padding: 20 }} />
              </div>
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: '#f0f2f8' }}>{CERTIFICATIONS[selected].title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)', marginTop: 4 }}>{CERTIFICATIONS[selected].issuer}</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={CERTIFICATIONS[selected].linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 13, padding: '8px 18px' }}><span>LinkedIn</span></a>
                  <button onClick={() => setSelected(null)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', fontSize: 20 }}>x</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
