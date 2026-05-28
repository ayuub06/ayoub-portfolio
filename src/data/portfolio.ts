export const PROFILE = {
  name: 'Ayoub Imourigue',
  initials: 'AI',
  title: 'Full-Stack Developer',
  subtitle: 'Automation Enthusiast',
  location: 'Casablanca, Morocco',
  locationShort: 'Casablanca -> World',
  email: 'workayoub6@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayoub-imourigue',
  github: 'https://github.com/ayuub06',
  twitter: 'https://twitter.com/ayoub_imourigue',
  bio: [
    "There is energy inside me like the wind — it keeps pushing me forward, toward success, toward something bigger than where I started.",
    "I am a Computer Engineering student and full-stack developer based in Casablanca. I build real systems for real organizations — from exam management platforms used by universities to AI-powered automation tools that save hours of manual work.",
    "I hold a C1 English certificate, speak Arabic, French and English, and I am actively targeting international opportunities in software engineering.",
    "My stack is JavaScript-first: React, Next.js, Node.js, PHP, MySQL. My mindset is builder-first: I ship things that work, scale, and matter.",
  ],
  stats: [
    { value: '3+', label: 'Projects Shipped' },
    { value: '6+', label: 'Certifications' },
    { value: '3', label: 'Languages' },
    { value: '2+', label: 'Years Coding' },
  ],
  typingPhrases: [
    'Full-Stack Developer',
    'React & Next.js Engineer',
    'Node.js Builder',
    'AI Automation Builder',
    'Open Source Contributor',
  ],
};

export const SKILLS = [
  { category: 'Languages', icon: 'Code', color: 'rgba(91,106,240,0.15)', tags: ['JavaScript', 'PHP', 'SQL', 'C', 'C++'], featured: ['JavaScript'] },
  { category: 'Frontend', icon: 'Palette', color: 'rgba(6,182,212,0.12)', tags: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'], featured: ['React', 'Next.js'] },
  { category: 'Backend', icon: 'Server', color: 'rgba(124,58,237,0.12)', tags: ['Node.js', 'PHP', 'MySQL', 'REST APIs'], featured: ['Node.js'] },
  { category: 'Automation & AI', icon: 'Bot', color: 'rgba(16,185,129,0.12)', tags: ['n8n', 'Workflow Automation', 'AI APIs', 'Pipelines'], featured: ['n8n'] },
  { category: 'DevOps & Cloud', icon: 'Cloud', color: 'rgba(245,158,11,0.12)', tags: ['Git', 'Linux', 'AWS', 'Vercel', 'VS Code'], featured: ['AWS'] },
  { category: 'Languages Spoken', icon: 'Globe', color: 'rgba(91,106,240,0.1)', tags: ['Arabic (Native)', 'English (C1)', 'French'], featured: ['English (C1)'] },
];

export const PROJECTS = [
  {
    id: '01',
    title: 'AI Automation SaaS Platform',
    description: 'Built a productivity SaaS that connects AI tools with n8n automation pipelines. Users can set up workflows that run automatically — no manual work needed. Handles complex multi-step processes across different services.',
    tags: ['Node.js', 'JavaScript', 'n8n', 'AI APIs', 'Vercel'],
    image: '/images/project-ai-saas.png',
    liveUrl: 'https://ai-saas-platform-tan.vercel.app/',
    githubUrl: 'https://github.com/ayuub06',
    status: 'Live',
  },
  {
    id: '02',
    title: 'Exam Management System',
    description: 'Web platform for managing university examinations end-to-end. Handles room allocation, invigilator scheduling, conflict detection, and gives admins a real-time dashboard to manage everything without spreadsheets.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    image: '/images/project-exam.png',
    liveUrl: 'https://gestion-examens-frontend.vercel.app/',
    githubUrl: 'https://github.com/ayuub06',
    status: 'Live',
  },
  {
    id: '03',
    title: 'Internal Management App',
    description: 'Built during my ORMVA internship to replace paper-based administrative processes. Digitized workflows, added role-based access control, and gave the team a clean dashboard to manage operations.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Admin UI'],
    image: '/images/project-internal.png',
    liveUrl: '',
    githubUrl: '',
    status: 'Private',
  },
  {
    id: '04',
    title: 'Portfolio Website',
    description: 'This portfolio — designed and built from scratch with Next.js 14, Framer Motion animations, glassmorphism UI, a working contact form via Resend, and deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/project-portfolio.png',
    liveUrl: 'https://ayoub-portfolio-orcin.vercel.app/',
    githubUrl: 'https://github.com/ayuub06',
    status: 'Live',
  },
];

export const EXPERIENCE = [
  {
    date: '2023 - 2024',
    title: 'Software Development Intern',
    org: 'ORMVA - Office Regional de Mise en Valeur Agricole',
    type: 'Internship' as const,
    description: 'Joined the IT department of one of Morocco largest agricultural authorities. My job was to replace slow, paper-based admin workflows with a real web system.',
    bullets: [
      'Designed and built a full internal management application from scratch using PHP and MySQL',
      'Replaced paper forms and manual tracking with a digital dashboard used daily by staff',
      'Implemented login system with role-based access — admins, managers, and staff each see different views',
      'Added audit logs so every action is tracked and reversible',
      'Worked directly with non-technical staff to understand their real needs and translate them into features',
    ],
  },
  {
    date: '2022 - Present',
    title: 'Computer Engineering Student',
    org: 'Higher School of Technology - Casablanca',
    type: 'Education' as const,
    description: 'Studying Computer Engineering with a focus on software development, databases, and modern web technologies. Building real projects alongside coursework.',
    bullets: [
      'Full-stack development with JavaScript, PHP, React, Node.js',
      'Database architecture and advanced SQL (MySQL)',
      'Systems programming in C and C++',
      'Cloud fundamentals — AWS certified in progress',
      'Active member of the coding community — sharing knowledge and collaborating on projects',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: 'EF SET English Certificate C1',
    issuer: 'EF Education First',
    icon: '🌍',
    color: 'rgba(91,106,240,0.12)',
    status: 'earned' as const,
    image: '/images/EF SET English Certificate.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
  {
    title: 'Intro to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    icon: '🔐',
    color: 'rgba(16,185,129,0.12)',
    status: 'earned' as const,
    image: '/images/Cybersecurity Certificate.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
  {
    title: 'Big Data 101',
    issuer: 'IBM Skills Build',
    icon: '📊',
    color: 'rgba(6,182,212,0.12)',
    status: 'earned' as const,
    image: '/images/Big_Data_101__Certificate_page.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
  {
    title: 'SQL Advanced',
    issuer: 'HackerRank',
    icon: '🗄️',
    color: 'rgba(245,158,11,0.12)',
    status: 'earned' as const,
    image: '/images/sql_advanced certificate.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
  {
    title: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    icon: '⚛️',
    color: 'rgba(91,106,240,0.12)',
    status: 'earned' as const,
    image: '/images/frontend_developer_react certificate.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
  {
    title: 'Python Basic',
    issuer: 'HackerRank',
    icon: '🐍',
    color: 'rgba(16,185,129,0.12)',
    status: 'earned' as const,
    image: '/images/python_basic certificate.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: '☁️',
    color: 'rgba(245,158,11,0.12)',
    status: 'in-progress' as const,
    image: '/images/AWS Cloud Practitioner.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/ayoub-imourigue',
  },
];

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certs', href: '#certs' },
  { label: 'Contact', href: '#contact' },
];

export type NavLink = typeof NAV_LINKS[number];
export type ExperienceType = 'Internship' | 'Education';
