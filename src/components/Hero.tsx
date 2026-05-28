'use client';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import TypingAnimation from '@/components/TypingAnimation';
import { PROFILE } from '@/data/portfolio';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <>
      <motion.div style={{ scaleX, transformOrigin: '0%' }} className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400" />
      <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/mein_Photo.jpg" alt="Ayoub Imourigue" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.65), #080c14)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,12,20,0.6), transparent, rgba(8,12,20,0.6))' }} />
        </div>
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center gap-8 py-32">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden float-animation"
            style={{ border: '2px solid rgba(34,211,238,0.4)', boxShadow: '0 0 0 6px rgba(34,211,238,0.08), 0 0 60px rgba(34,211,238,0.2)' }}>
            <Image src="/images/mein_Photo.jpg" alt="Ayoub" fill priority className="object-cover object-top" sizes="160px" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(48px, 9vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
              <span className="text-gradient">Ayoub Imourigue</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 18, color: 'rgba(232,234,240,0.6)', letterSpacing: '0.05em' }}>
              Casablanca, Morocco &nbsp;·&nbsp; Full-Stack Developer
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <TypingAnimation />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-wrap gap-3 justify-center">
            <a href="#projects" className="btn-primary">
              <span>View My Work</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 1 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="/myResumeEn.pdf" download className="btn-outline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
            <a href="#contact" className="btn-outline">Hire Me</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex gap-10 mt-4">
            {PROFILE.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number">{stat.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)', marginTop: 4, letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg className="w-5 h-5" style={{ color: 'rgba(34,211,238,0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>
    </>
  );
}
