import type {
  NavItem,
  Highlight,
  SocialLink,
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
} from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: 'Ganesh Chaudhary',
  title: 'Full Stack Developer',
  description:
    'Recent Computer Engineering graduate with hands-on experience building production-grade web applications. Delivered 4+ real-world projects including microservices architectures and AI-integrated systems.',
  cta: {
    primary: { label: 'View My Work', href: '#projects' },
    secondary: { label: 'Get In Touch', href: '#contact' },
  },
  typingWords: [
    'Web Applications.',
    'Microservices.',
    'AI Integrations.',
    'Scalable Systems.',
  ],
} as const

export const ABOUT_DATA = {
  paragraphs: [
    "I'm a Full Stack Developer who thrives on building web applications that are both visually compelling and technically robust. With a strong foundation in frontend and backend technologies, I bring ideas to life through clean, maintainable code.",
    'I believe in continuous learning and staying current with industry best practices. Whether crafting pixel-perfect interfaces or architecting scalable backend systems, I approach every project with attention to detail and a commitment to excellence.',
  ],
  highlights: [
    { label: 'Projects Delivered', value: '5+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Years Building', value: '3+' },
  ] satisfies Highlight[],
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'database' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React.js', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Django', icon: 'django' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Pinecone', icon: 'pinecone' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Kafka', icon: 'kafka' },
      { name: 'npm', icon: 'npm' },
      { name: 'ESLint', icon: 'eslint' },
      { name: 'Prettier', icon: 'prettier' },
    ],
  },
  {
    title: 'AI / ML',
    skills: [
      { name: 'Gemini API', icon: 'gemini' },
      { name: 'YOLO', icon: 'yolo' },
      { name: 'TrOCR', icon: 'trocr' },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'shopify-agent',
    title: 'Shopify Merchant Support Agent',
    description:
      'AI-powered support agent for Shopify merchants using retrieval-augmented generation (RAG) with Pinecone vector database. Implemented MCP client-server architecture with tokenization for efficient context retrieval from merchant knowledge bases.',
    technologies: ['Node.js', 'Gemini API', 'Pinecone', 'MCP Architecture'],
    githubUrl:
      'https://github.com/TEJ-Fellowship/pbl/tree/main/PBL4/ShopifyMerchantSupportAgent',
    metric: 'Under 3s response time via RAG pipeline',
    featured: true,
  },
  {
    id: 'ecommerce-orders',
    title: 'E-commerce Order Management System',
    description:
      'Microservices-based order processing system with PostgreSQL primary/replica setup, Redis caching, and Kafka for event-driven order workflows. Implemented read/write splitting across database replicas and atomic inventory reservation.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    githubUrl:
      'https://github.com/TEJ-Fellowship/pbl/tree/Eganesh/PBL5/6_E-commerce_Orders',
    metric: '10K concurrent users with microservices architecture',
    featured: true,
  },
  {
    id: 'document-verification',
    title: 'Citizenship Verification System',
    description:
      'Real-time document verification system for Nepali citizenship cards and ID cards. Integrated YOLO for document classification, TrOCR for Nepali OCR text extraction, and face comparison for identity verification.',
    technologies: ['Python', 'Django', 'YOLO', 'TrOCR', 'OpenCV'],
    githubUrl: 'https://github.com/aachaltiwari/Document-Verification',
    metric: 'Real-time verification with Nepali OCR',
    featured: true,
  },
  {
    id: 'gyan-tapari',
    title: 'GyanTapari',
    description:
      'Gamified learning web platform for grades 1-9 with integrated leaderboard, learning streaks, and achievement systems to make education engaging and interactive.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Gamification'],
    githubUrl:
      'https://github.com/TEJ-Fellowship/pbl/tree/main/PBL3/Gyaan_Tapari',
    metric: 'Gamified learning for grades 1-9',
    featured: true,
  },
]

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Junior Software Developer',
    company: 'TEJ Center Private Limited',
    period: 'Jan 2026 – Present',
    bullets: [
      'Delivered custom React interfaces for 2 client projects, meeting 100% of sprint deliverables in Agile cycles.',
      'Built 5+ real-world projects covering RAG pipelines, microservices, and AI-integrated architectures.',
      'Minimized UI bugs by 40% through consistent unit testing and code reviews.',
      'Developed mobile-responsive applications fully integrated with MCP Client-Server Architecture, optimizing latency by 10%.',
    ],
  },
  {
    role: 'Software Developer Fellow',
    company: 'TEJ Center Private Limited',
    period: 'Jul 2025 – Dec 2025',
    bullets: [
      'Participated in a structured fellowship program delivering real-world software projects in cross-functional teams.',
      'Responsibilities spanned full-stack development, system design, technical presentations, and peer code reviews.',
      'Completed the University of Helsinki Full Stack Open certification (7 ECTS, Grade 5).',
    ],
  },
  {
    role: 'Front-End Developer (Remote)',
    company: 'Freelance',
    period: '2023 – 2025',
    bullets: [
      'Developed interactive dashboards using vanilla JavaScript, improving UX for training platforms.',
    ],
  },
]

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Engineering',
    institution: 'Institute of Engineering, Dharan',
    period: '2021 – 2025',
  },
  {
    degree: 'Full Stack Open Certificate',
    institution: 'University of Helsinki',
    period: '2025',
    details: '7 ECTS online course — Grade 5',
    certificateUrl:
      'https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/fba3bdf793a076746b18088b82237aca',
    certificateImage: '/images/helsinki-certificate.png',
  },
]

export const CONTACT_DATA = {
  heading: "Let's Work Together",
  description:
    "I'm currently open to new opportunities and exciting collaborations. Whether you have a project in mind or just want to connect, I'd love to hear from you.",
  email: 'ganesh98245.np@gmail.com',
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/ganesh-786',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ganesh-chaudhary-684843269',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      url: 'mailto:ganesh98245.np@gmail.com',
      icon: 'mail',
    },
  ] satisfies SocialLink[],
}

export const FOOTER_DATA = {
  text: `© ${new Date().getFullYear()} Ganesh Chaudhary. Crafted with passion.`,
}
