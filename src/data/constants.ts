import type { Project, NavItem, Highlight, SocialLink } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: 'Ganesh Chaudhary',
  title: 'Full Stack Developer',
  description:
    'I craft modern, performant web applications with clean code and intuitive user experiences. Passionate about turning complex problems into elegant digital solutions.',
  cta: {
    primary: { label: 'View My Work', href: '#projects' },
    secondary: { label: 'Get In Touch', href: '#contact' },
  },
  typingWords: [
    'Web Applications.',
    'User Interfaces.',
    'Digital Experiences.',
    'Scalable Solutions.',
  ],
} as const

export const ABOUT_DATA = {
  paragraphs: [
    "I'm a dedicated Full Stack Developer who thrives on building web applications that are not only visually compelling but also technically robust. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean, maintainable code.",
    "I believe in the power of continuous learning and staying current with industry best practices. Whether it's crafting pixel-perfect interfaces or architecting scalable backend systems, I approach every project with attention to detail and a commitment to excellence.",
  ],
  highlights: [
    { label: 'Projects Completed', value: '10+' },
    { label: 'Technologies', value: '12+' },
    { label: 'Years Learning', value: '2+' },
  ] satisfies Highlight[],
}

export const SKILLS_DATA = {
  frontend: {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  backend: {
    title: 'Backend',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'Flask', icon: 'flask' },
      { name: 'Django', icon: 'django' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  tools: {
    title: 'Tools & Others',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Responsive Design', icon: 'responsive' },
      { name: 'UI/UX', icon: 'design' },
    ],
  },
} as const

export const PROJECTS: Project[] = [
  {
    id: 'swiftverify',
    title: 'SwiftVerify',
    description:
      'A document verification system powered by AI. Built a fully responsive, user-friendly interface for seamless document verification workflows — optimizing frontend performance and integrating with the YOLO model backend.',
    image: '/images/swift.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Python', 'YOLO'],
    githubUrl: 'https://github.com/aachaltiwari/Document-Verification',
    featured: true,
  },
  {
    id: 'ganesh-ecommerce',
    title: 'AgriConnect Nepal',
    description:
      'An e-commerce platform empowering Nepali farmers with a user-friendly interface in Nepali, real-time weather information, farming techniques, and AI-based disease identification to improve the local agricultural ecosystem.',
    image: '/images/myweb.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    liveUrl: 'https://ganesh-ecommerce-web-gaco.onrender.com',
    githubUrl: 'https://github.com/ganesh-786/Ganesh-Ecommerce_Web',
    featured: true,
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
