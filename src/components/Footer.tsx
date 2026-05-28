'use client';
import { motion } from 'framer-motion';
import { NAV_LINKS, PROFILE, type NavLink } from '@/data/portfolio';
import { scrollTo } from '@/utils/index';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px 40px' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #22d3ee, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 800, fontSize: 14, color: '#fff' }}>AI</div>
              <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: '#f0f2f8' }}>Ayoub<span style={{ color: '#22d3ee' }}>.</span></span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(148,163,184,0.6)', lineHeight: 1.7 }}>Full-Stack Developer & AI Automation Builder.<br />Based in Casablanca, building for the world.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} viewport={{ once: true }}>
            <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 13, color: '#f0f2f8', marginBottom: 16, letterSpacing: '0.05em' }}>Navigate</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV_LINKS.map((link: NavLink) => (
                <li key={link.href}>
                  <button onClick={() => scrollTo(link.href)} style={{ fontSize: 14, color: 'rgba(148,163,184,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s', fontFamily: 'DM Sans' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.5)')}>{link.label}</button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }} viewport={{ once: true }}>
            <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 13, color: '#f0f2f8', marginBottom: 16, letterSpacing: '0.05em' }}>Connect</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ label: PROFILE.email, href: `mailto:${PROFILE.email}` }, { label: 'GitHub', href: PROFILE.github }, { label: 'LinkedIn', href: PROFILE.linkedin }].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: 'rgba(148,163,184,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.5)')}>{l.label}</a>
              ))}
            </div>
          </motion.div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(148,163,184,0.35)', fontFamily: 'JetBrains Mono' }}>© {year} Ayoub Imourigue</p>
          <p style={{ fontSize: 12, color: 'rgba(148,163,184,0.35)', fontFamily: 'JetBrains Mono' }}>Built with Next.js & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
