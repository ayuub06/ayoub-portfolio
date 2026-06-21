'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  status: string;
  order: number;
}

const GRADIENTS = [
  'linear-gradient(135deg, #0e4f61 0%, #1e1040 100%)',
  'linear-gradient(135deg, #0a2d5e 0%, #0e4f61 100%)',
  'linear-gradient(135deg, #0a3d2e 0%, #0e4f61 100%)',
  'linear-gradient(135deg, #2d0a5e 0%, #5e0a3d 100%)',
  'linear-gradient(135deg, #0e4f61 0%, #2d0a5e 100%)',
  'linear-gradient(135deg, #0a5e2e 0%, #0a2d5e 100%)',
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Live: { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  Private: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8' },
  'In Progress': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
};

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="section-label mb-4">Work</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 }} className="section-heading mb-4">
          Things I have<br /><span className="text-gradient">actually built.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }} style={{ fontSize: 16, color: 'rgba(148,163,184,0.7)', marginBottom: 56 }}>
          Not exercises. Real applications, deployed and used.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const gradient = GRADIENTS[i % GRADIENTS.length];
            const s = statusStyle[project.status] ?? statusStyle['Private'];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group overflow-hidden"
                style={{ borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div className="relative overflow-hidden" style={{ height: 220, background: gradient }}>
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'rgba(8,12,20,0.75)', backdropFilter: 'blur(4px)' }}
                  >
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
                        <span>Open Live</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 13, padding: '9px 20px' }}>GitHub</a>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: 6 }}>#{project.id}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 20, border: `1px solid ${s.color}30` }}>{project.status}</span>
                  </div>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <h3 className="group-hover:text-cyan-400" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#f0f2f8', marginBottom: 10, transition: 'color 0.2s' }}>{project.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(148,163,184,0.75)', marginBottom: 16 }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
