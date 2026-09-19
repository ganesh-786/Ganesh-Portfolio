import type {
  NavItem,
  Highlight,
  SocialLink,
  Project,
  ServiceItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
} from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const HERO_DATA = {
  greeting: "Hi, I'm",
  name: "Ganesh Chaudhary",
  title: "Full Stack Developer",
  status: "Open to full-time roles and freelance work",
  description:
    "Full stack developer working from React interfaces to the Node.js services and databases behind them, including AI features such as retrieval-augmented support agents.",
  cta: {
    primary: { label: "View My Work", href: "#projects" },
    secondary: { label: "Get In Touch", href: "#contact" },
  },
  resume: {
    label: "Download Resume",
    href: "/Ganesh_Chaudhary_CV_2026.pdf",
  } as { label: string; href: string } | null,
  typingWords: [
    "Web Applications.",
    "Microservices.",
    "AI Integrations.",
    "Scalable Systems.",
  ],
} as const;

export const ABOUT_DATA = {
  paragraphs: [
    "I'm a full stack developer who likes owning a feature end to end: the React interface, the API behind it, and the database it depends on. At TEJ Center I've built React interfaces for two enterprise client applications inside Agile sprints, and through the fellowship I built systems that range from event-driven order processing to AI support agents.",
    "I started on the design side, as a web design intern turning Figma wireframes into responsive layouts, and later worked as a freelance front-end developer building dashboards for training platforms. I keep my foundations current through structured coursework, most recently the University of Helsinki's Full Stack Open and Anthropic's Claude Code in Action, and I care about readable code, disciplined Git workflows, and honest peer review.",
  ],
  highlights: [
    { label: "Projects Built", value: "8" },
    { label: "Technologies", value: "20+" },
    { label: "Years Building", value: "3+" },
  ] satisfies Highlight[],
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript (ES6+)" },
      { name: "Python" },
      { name: "SQL" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Next.js" },
      { name: "Django" },
      { name: "Flask" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Pinecone" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Kafka" },
      { name: "npm" },
      { name: "ESLint" },
      { name: "Prettier" },
      { name: "Figma" },
    ],
  },
  {
    title: "Architecture & Practice",
    skills: [
      { name: "RESTful APIs" },
      { name: "Microservices" },
      { name: "Event-Driven Architecture" },
      { name: "Agile" },
      { name: "Responsive Design" },
      { name: "UX/UI Design" },
    ],
  },
  {
    title: "AI / ML",
    skills: [{ name: "Gemini API" }, { name: "YOLO" }, { name: "TrOCR" }],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "shambaad",
    title: "Shambaad",
    badge: "Team project",
    challenge:
      "Real-time chat that handles both text and voice messages, wrapped in an interface that feels premium.",
    approach:
      "A WebSocket chat system that supports messaging, voice chat, and editing or deleting your own messages. Voice recordings are stored on Microsoft Azure.",
    role: "Built the chat system over WebSockets and designed the UI and UX. Video calling was planned as a next step but put on hold.",
    technologies: ["WebSocket", "Microsoft Azure"],
    liveUrl: "https://shambad-d-5y84.vercel.app/",
  },
  {
    id: "shopify-agent",
    title: "Shopify Merchant Support Agent",
    badge: "TEJ Fellowship team project",
    challenge:
      "Give Shopify merchants fast, accurate support and insight into how their shop is doing.",
    approach:
      "A retrieval-augmented pipeline with semantic and logical search, Pinecone embeddings, and chunking, plus an MCP architecture with tools for web search, a calculator, and a clock. A real Shopify app integration lets the AI analyse the store. The team worked to keep responses under 4 seconds.",
    role: "Designed and built the merchant dashboard in Tailwind CSS and optimised the front end's async requests to keep the RAG round trips quick.",
    technologies: [
      "Node.js",
      "Gemini API",
      "Pinecone",
      "MCP Architecture",
      "Tailwind CSS",
    ],
    githubUrl:
      "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL4/ShopifyMerchantSupportAgent",
  },
  {
    id: "ecommerce-orders",
    title: "E-commerce Order Management System",
    badge: "TEJ Fellowship project",
    challenge:
      "Keep order processing correct and responsive across separate services, without overselling inventory.",
    approach:
      "Microservices with a PostgreSQL primary and replicas (reads and writes split across them), Redis for caching and state, and Kafka driving event-based order workflows. The whole stack runs in Docker, with a mobile-first Tailwind CSS interface.",
    role: "Engineered the system end to end: the event-driven order pipeline, the containerised environment, and the interface.",
    technologies: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "Tailwind CSS",
    ],
    githubUrl:
      "https://github.com/TEJ-Fellowship/pbl/tree/Eganesh/PBL5/6_E-commerce_Orders",
  },
  {
    id: "trihutbaba",
    title: "Trihutbaba",
    badge: "Solo project, in progress",
    challenge:
      "Give the Trihutbaba store a proper way to manage and sell machinery and tools online, the way larger marketplaces like Daraz do.",
    approach:
      "An e-commerce site for the store's machinery and tools, designed to be simple enough for farmers to use. Nepali language support and weather forecasts are planned.",
    role: "Started this on my own and am building it end to end.",
    technologies: [],
    githubUrl: "https://github.com/ganesh-786/TrihutBaba",
  },
  {
    id: "gyan-tapari",
    title: "Gyaan Tapari",
    badge: "Solo project, TEJ Fellowship",
    challenge: "Make learning more engaging for students in grades 8 and 9.",
    approach:
      "Gamified learning with progress tracking, typing games, hangman, and quizzes in mathematics, science, English, and social studies, plus AI-powered features.",
    role: "Built it solo during the fellowship, then presented it to seniors and alumni, who encouraged me to keep going.",
    technologies: ["React", "Vite", "Tailwind CSS", "Gamification"],
    githubUrl:
      "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL3/Gyaan_Tapari",
    liveUrl: "https://gyaan-tapari.vercel.app/",
  },
  {
    id: "gyan-sathi",
    title: "GyanSathi",
    challenge:
      "Give teachers a place to publish lessons and students a place to learn from them.",
    approach:
      "A learning platform with role-based authentication and authorization. Teachers post text lessons along with YouTube and other video links, and students learn from them.",
    role: "Core responsibility: role-based authentication and authorization for teachers and students.",
    technologies: ["Role-based access"],
    githubUrl: "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL2/GyanSathi",
    liveUrl: "https://gyaan-sathi-psrf.vercel.app/",
  },
  {
    id: "focusflow",
    title: "FocusFlow",
    badge: "Team project, with Rahul",
    challenge:
      "Build a simple to-do manager and use AI to make it more useful.",
    approach:
      "A task manager where AI summarises your to-do list and adds a quote to go with it.",
    role: "Our first project after joining the TEJ Fellowship. I integrated the AI summaries and the quotes, and Rahul built the front end.",
    technologies: ["AI integration"],
    githubUrl:
      "https://github.com/TEJ-Fellowship/pbl/tree/main/PBL1/FocusFlow-Project/frontend/focusflow",
    liveUrl: "https://focus-flow-tan.vercel.app/",
  },
  {
    id: "document-verification",
    title: "Citizenship Verification System",
    badge: "University capstone, team project",
    note: "The repository lives under a teammate's GitHub account.",
    challenge:
      "Verify Nepali citizenship and ID cards automatically and in real time, including reading Nepali text from the card.",
    approach:
      "YOLO classifies the document type, TrOCR extracts the Nepali text, and face comparison supports identity verification, all served through Django with OpenCV handling the image work.",
    role: "Developed the verification web application and integrated the YOLO and TrOCR models with the Django backend to give users instant, real-time validation feedback.",
    technologies: ["Python", "Django", "YOLO", "TrOCR", "OpenCV"],
    githubUrl: "https://github.com/aachaltiwari/Document-Verification",
  },
];

export const SERVICES_DATA = {
  heading: "What I Can Help With",
  intro:
    "Whether you are hiring for a team or scoping a project, this is the work I can take on.",
  items: [
    {
      title: "Front-end interfaces",
      description:
        "Responsive, cross-browser React interfaces built from Figma designs into modular, maintainable code. Delivered for enterprise client applications at TEJ Center and as a freelance front-end developer.",
    },
    {
      title: "Backend services and data",
      description:
        "Node.js and Python services on PostgreSQL, MongoDB, or Redis, including event-driven designs with Kafka, real-time features over WebSockets, and containerised delivery with Docker.",
    },
    {
      title: "AI-integrated features",
      description:
        "Retrieval-augmented assistants with Pinecone and Gemini, plus computer vision and OCR pipelines with YOLO and TrOCR.",
    },
  ] satisfies ServiceItem[],
  process: [
    "Work in Agile sprints with clear deliverables",
    "Keep changes reviewable with clean Git workflows and peer review",
    "Explain technical trade-offs in plain language",
  ],
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Junior Software Developer",
    company: "TEJ Center Private Limited",
    period: "Jan 2026 – Present",
    bullets: [
      "Built responsive, cross-browser React interfaces for 2 enterprise client applications.",
      "Turned complex Figma mockups into modular, production-ready front-end code with Tailwind CSS. Strict peer reviews contributed to a 40% reduction in UI rendering bugs.",
      "Worked directly with UI/UX designers and backend engineers in fast-paced Agile sprints, completing every cross-functional milestone on time.",
      "Kept the codebase stable with disciplined Git and GitHub workflows, npm dependency management, and reusable component patterns.",
    ],
  },
  {
    role: "Software Developer Fellow",
    company: "TEJ Center Private Limited",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "Worked in an intensive, project-driven program covering full-stack development, distributed system design, code reviews, and technical presentations.",
      "Built real-world projects in cross-functional teams, including a RAG-based support agent and an event-driven order system.",
      "Completed the University of Helsinki Full Stack Open certification (7 ECTS, Grade 5).",
    ],
  },
  {
    role: "Web Design Intern",
    company: "Nobel PBC Learning",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Designed and refined user interfaces and page layouts, bridging visual mockups and semantic, performant web pages.",
      "Ran user flow research and accessibility audits to sharpen layout hierarchy on landing pages.",
      "Created high-fidelity wireframes and responsive UI designs in Figma, iterating on feedback from internal stakeholders.",
    ],
  },
  {
    role: "Front-End Developer (Remote)",
    company: "Freelance",
    period: "2023 – 2025",
    bullets: [
      "Developed interactive dashboards using vanilla JavaScript, improving UX for training platforms.",
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Claude Code in Action",
    institution: "Anthropic Academy",
    period: "2026",
    details:
      "Completed hands-on course on building with Claude Code — AI-assisted software engineering workflows.",
    certificateUrl: "https://verify.skilljar.com/c/kw9drjq2b2d5",
    certificateImage: "/images/claude-code-certificate.png",
  },
  {
    degree: "Full Stack Open Certificate",
    institution: "University of Helsinki",
    period: "2025",
    details: "7 ECTS online course — Grade 5",
    certificateUrl:
      "https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/fba3bdf793a076746b18088b82237aca",
    certificateImage: "/images/helsinki-certificate.webp",
  },
  {
    degree: "Bachelor of Computer Engineering",
    institution: "Institute of Engineering, Dharan",
    period: "2021 – 2025",
  },
];

export const CONTACT_DATA = {
  heading: "Let's Work Together",
  description:
    "I'm open to full-time roles and freelance projects. If you have something in mind, send a few details and I'll get back to you.",
  email: "ganesh98245.np@gmail.com",
  // Web3Forms access key (safe to expose by design). While empty, the section
  // falls back to the direct email button.
  formAccessKey: "83bf2e7b-a7b7-408a-a9a1-9a3e030c4f3e",
  formSubject: "New message from ganeshtharu.com.np",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/ganesh-786",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ganesh-chaudhary-684843269",
      icon: "linkedin",
    },
    {
      name: "Email",
      url: "mailto:ganesh98245.np@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],
};

export const FOOTER_DATA = {
  text: `© ${new Date().getFullYear()} Ganesh Chaudhary`,
};
