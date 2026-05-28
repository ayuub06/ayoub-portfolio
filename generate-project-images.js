const fs = require('fs');
const path = require('path');

const projects = [
  {
    file: 'project-ai-saas.png',
    label: 'AI Automation SaaS',
    sub: 'ai-saas-platform-tan.vercel.app',
    c1: '#0e4f61', c2: '#1e1040',
    icon: `<text x="400" y="155" font-family="monospace" font-size="48" text-anchor="middle" fill="rgba(34,211,238,0.9)">⚡</text>`,
  },
  {
    file: 'project-exam.png',
    label: 'Exam Management System',
    sub: 'gestion-examens-frontend.vercel.app',
    c1: '#0a2d5e', c2: '#0e4f61',
    icon: `<text x="400" y="155" font-family="monospace" font-size="48" text-anchor="middle" fill="rgba(34,211,238,0.9)">📋</text>`,
  },
  {
    file: 'project-internal.png',
    label: 'Internal Management App',
    sub: 'ORMVA — Private deployment',
    c1: '#0a3d2e', c2: '#0e4f61',
    icon: `<text x="400" y="155" font-family="monospace" font-size="48" text-anchor="middle" fill="rgba(52,211,153,0.9)">🏢</text>`,
  },
  {
    file: 'project-portfolio.png',
    label: 'Portfolio Website',
    sub: 'ayoub-portfolio-orcin.vercel.app',
    c1: '#2d0a5e', c2: '#5e0a3d',
    icon: `<text x="400" y="155" font-family="monospace" font-size="48" text-anchor="middle" fill="rgba(167,139,250,0.9)">✦</text>`,
  },
];

projects.forEach(p => {
  const svg = `<svg width="800" height="440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${p.c1}" />
      <stop offset="100%" style="stop-color:${p.c2}" />
    </linearGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(34,211,238,0.8)" />
      <stop offset="100%" style="stop-color:rgba(124,58,237,0.8)" />
    </linearGradient>
  </defs>
  <rect width="800" height="440" fill="url(#bg)"/>

  <!-- Grid lines -->
  <line x1="0" y1="110" x2="800" y2="110" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <line x1="0" y1="220" x2="800" y2="220" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <line x1="0" y1="330" x2="800" y2="330" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <line x1="200" y1="0" x2="200" y2="440" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <line x1="400" y1="0" x2="400" y2="440" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="440" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

  <!-- Center circle -->
  <circle cx="400" cy="130" r="56" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  ${p.icon}

  <!-- Title -->
  <text x="400" y="230" font-family="sans-serif" font-size="26" font-weight="700" fill="rgba(255,255,255,0.92)" text-anchor="middle">${p.label}</text>

  <!-- Gradient line -->
  <rect x="280" y="250" width="240" height="2" fill="url(#line)" rx="1"/>

  <!-- Subtitle -->
  <text x="400" y="285" font-family="monospace" font-size="13" fill="rgba(255,255,255,0.35)" text-anchor="middle">${p.sub}</text>

  <!-- Corner dots -->
  <circle cx="48" cy="48" r="3" fill="rgba(34,211,238,0.4)"/>
  <circle cx="752" cy="48" r="3" fill="rgba(124,58,237,0.4)"/>
  <circle cx="48" cy="392" r="3" fill="rgba(124,58,237,0.4)"/>
  <circle cx="752" cy="392" r="3" fill="rgba(34,211,238,0.4)"/>

  <!-- Bottom label -->
  <text x="400" y="420" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.2)" text-anchor="middle">Add screenshot to replace this placeholder</text>
</svg>`;

  const outPath = path.join('public', 'images', p.file);
  fs.writeFileSync(outPath, svg);
  console.log('Created:', outPath);
});

console.log('\nDone! Replace these with real screenshots when ready.');