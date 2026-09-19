import type {
  NavItem,
  Highlight,
  SocialLink,
  Project,
  ServiceItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
} from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: 'Ganesh Chaudhary',
  title: 'Full Stack Developer',
  status: 'Open to full-time roles and freelance work',
  description:
    'Full stack developer working from React interfaces to the Node.js services and databases behind them, including AI features such as retrieval-augmented support agents.',
  cta: {
    primary: { label: 'View My Work', href: '#projects' },
    secondary: { label: 'Get In Touch', href: '#contact' },
  },
  // Drop the PDF into /public and set this to { label: 'Download Resume', href: '/your-file.pdf' }
  resume: null as { label: string; href: string } | null,
  typingWords: [
    'Web Applications.',
    'Microservices.',
    'AI Integrations.',
    'Scalable Systems.',
  ],
} as const

export const ABOUT_DATA = {
  paragraphs: [
    "I'm a full stack developer who likes owning a feature end to end: the React interface, the API behind it, and the database it depends on. At TEJ Center I've delivered React interfaces for two client projects inside Agile sprints, and through the fellowship I built backend systems that range from event-driven order processing to AI support agents.",
    "Before that I worked as a freelance front-end developer, building interactive dashboards for training platforms. I keep my foundations current through structured coursework, most recently the University of Helsinki's Full Stack Open and Anthropic's Claude Code in Action, and I care about readable code, unit tests, and honest code review.",
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
      { name: 'JavaScript (ES6+)' },
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React.js' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Next.js' },
      { name: 'Django' },
      { name: 'Flask' },
      { name: 'Tailwind CSS' },
      { name: 'Bootstrap' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'Pinecone' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'Kafka' },
      { name: 'npm' },
      { name: 'ESLint' },
      { name: 'Prettier' },
    ],
  },
  {
    title: 'AI / ML',
    skills: [
      { name: 'Gemini API' },
      { name: 'YOLO' },
      { name: 'TrOCR' },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'shopify-agent',
    title: 'Shopify Merchant Support Agent',
    badge: 'TEJ Fellowship project',
    challenge:
      'Give Shopify merchants accurate answers from a large knowledge base without waiting on a human support agent.',
    approach:
      'Retrieval-augmented generation over a Pinecone vector index, with Gemini writing grounded answers. An MCP client-server architecture with tokenization keeps context retrieval efficient.',
    outcome: 'Under 3s response time through the RAG pipeline.',
    technologies: ['Node.js', 'Gemini API', 'Pinecone', 'MCP Architecture'],
    githubUrl:
      'https://github.com/TEJ-Fellowship/pbl/tree/main/PBL4/ShopifyMerchantSupportAgent',
  },
  {
    id: 'ecommerce-orders',
    title: 'E-commerce Order Management System',
    badge: 'TEJ Fellowship project',
    challenge:
      'Keep order processing correct and responsive under heavy concurrent load, without overselling inventory.',
    approach:
      'Microservices with a PostgreSQL primary and replicas (reads and writes split across them), Redis caching, and Kafka driving event-based order workflows. Inventory is reserved atomically.',
    outcome: 'Designed for 10K concurrent users on a microservices architecture.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    githubUrl:
      'https://github.com/TEJ-Fellowship/pbl/tree/Eganesh/PBL5/6_E-commerce_Orders',
  },
  {
    id: 'document-verification',
    title: 'Citizenship Verification System',
    badge: 'Team project',
    note: "The repository lives under a teammate's GitHub account.",
    challenge:
      'Verify Nepali citizenship and ID cards automatically and in real time, including reading Nepali text from the card.',
    approach:
      'YOLO classifies the document type, TrOCR extracts the Nepali text, and face comparison supports identity verification, all served through Django with OpenCV handling the image work.',
    outcome: 'Real-time verification with Nepali OCR.',
    technologies: ['Python', 'Django', 'YOLO', 'TrOCR', 'OpenCV'],
    githubUrl: 'https://github.com/aachaltiwari/Document-Verification',
  },
  {
    id: 'gyan-tapari',
    title: 'GyanTapari',
    badge: 'TEJ Fellowship project',
    challenge: 'Make learning more engaging for students in grades 1 to 9.',
    approach:
      'A React and Vite web app with a leaderboard, learning streaks, and an achievement system layered onto the lessons.',
    outcome: 'A gamified learning platform for grades 1 to 9.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Gamification'],
    githubUrl:
      'https://github.com/TEJ-Fellowship/pbl/tree/main/PBL3/Gyaan_Tapari',
  },
]

export const SERVICES_DATA = {
  heading: 'What I Can Help With',
  intro:
    'Whether you are hiring for a team or scoping a project, this is the work I can take on.',
  items: [
    {
      title: 'Front-end interfaces',
      description:
        'Responsive, accessible React and Next.js interfaces built to be maintained. Delivered for client projects at TEJ Center and as a freelance front-end developer.',
    },
    {
      title: 'Backend services and data',
      description:
        'Node.js and Python services on PostgreSQL, MongoDB, or Redis, including event-driven designs with Kafka, containerised with Docker.',
    },
    {
      title: 'AI-integrated features',
      description:
        'Retrieval-augmented assistants with Pinecone and Gemini, plus computer vision and OCR pipelines with YOLO and TrOCR.',
    },
  ] satisfies ServiceItem[],
  process: [
    'Work in Agile sprints with clear deliverables',
    'Cover changes with unit tests and code review',
    'Explain technical trade-offs in plain language',
  ],
}

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
    degree: 'Claude Code in Action',
    institution: 'Anthropic Academy',
    period: '2026',
    details:
      'Completed hands-on course on building with Claude Code — AI-assisted software engineering workflows.',
    certificateUrl: 'https://verify.skilljar.com/c/kw9drjq2b2d5',
    certificateImage: '/images/claude-code-certificate.png',
  },
  {
    degree: 'Full Stack Open Certificate',
    institution: 'University of Helsinki',
    period: '2025',
    details: '7 ECTS online course — Grade 5',
    certificateUrl:
      'https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/fba3bdf793a076746b18088b82237aca',
    certificateImage: '/images/helsinki-certificate.webp',
  },
  {
    degree: 'Bachelor of Computer Engineering',
    institution: 'Institute of Engineering, Dharan',
    period: '2021 – 2025',
  },
]

export const CONTACT_DATA = {
  heading: "Let's Work Together",
  description:
    "I'm open to full-time roles and freelance projects. If you have something in mind, send a few details and I'll get back to you.",
  email: 'ganesh98245.np@gmail.com',
  // Web3Forms access key (safe to expose by design). While empty, the section
  // falls back to the direct email button.
  formAccessKey: '',
  formSubject: 'New message from ganeshtharu.com.np',
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
  text: `© ${new Date().getFullYear()} Ganesh Chaudhary`,
}
