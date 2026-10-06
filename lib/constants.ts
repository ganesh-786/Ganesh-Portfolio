import type {
  NavItem,
  Highlight,
  SocialLink,
  ServiceItem,
  TermItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
} from "./types";

// The reply time, the pricing model and the hours are the owner's own answers (2026-10-02), so
// change them only with the owner. The reply time and the scope and price line are repeated
// across the pages, so each is written once here and the site never promises two different things.
const REPLY_WINDOW = "within two working days";
const SCOPE_AND_PRICE = "a written scope and a fixed price before any work starts";

const sentence = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}.`;

// The page runs in the order a client reads it: the work, what they get, then who is behind it.
// "Discuss your project" sits in the bar as a button, so Contact is not listed.
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];

export const CONTACT_CTA = { label: "Discuss your project", href: "#contact" };

// The line beside the call to action under the project list and at the end of every case study.
export const PROJECT_CTA_BODY = `Tell me what you are building. You get ${SCOPE_AND_PRICE}.`;

export const HERO_DATA = {
  name: "Ganesh Chaudhary",
  title: "Full Stack Developer",
  status: "Open to freelance projects and full-time roles",
  // The line under the name types these out one after another (components/ui/TypedLine.tsx).
  // Each phrase names something built and the tools it was built with, and each one is backed
  // by a case study in lib/projects.ts. Keep them short: the longest sets the space reserved.
  typed: {
    prefix: "Full-stack developer building",
    phrases: [
      "web apps with React and TypeScript",
      "APIs with Node.js and PostgreSQL",
      "AI features with Gemini and RAG",
      "voice interfaces with Gemini Live",
      "Google Calendar and Tasks sync",
      "installable apps for iOS and Android",
    ],
  },
  description:
    "I own the whole job: the screens people use, the API and database behind them, and getting it live. Right now that is UnTangler, a production app for students with ADHD.",
  cta: {
    primary: CONTACT_CTA,
    secondary: { label: "See the work", href: "#work" },
  },
  // Opens in the browser's own PDF viewer. /resume (app/resume) forwards here, so a shared
  // /resume link keeps working when the file is renamed. scripts/verify-build.mjs checks both.
  // When you rename the file, add the old address to RETIRED_RESUME_PATHS below.
  resume: {
    label: "View Resume",
    href: "/Ganesh_Chaudhary_Resume2026Oct.pdf",
  } as { label: string; href: string } | null,
  facts: [
    { label: "Role", value: "Full-Stack Developer, Compass Decisions Science LLC" },
    { label: "I build", value: "Websites, web applications, AI features" },
    { label: "Based in", value: "Kathmandu, Nepal (UTC+5:45)" },
    {
      label: "Freelance",
      value: `Part-time, evenings and weekends. I reply ${REPLY_WINDOW}`,
    },
    {
      label: "Certified",
      value: "Full Stack Open, University of Helsinki (Grade 5)",
    },
    { label: "Also known as", value: "Ganesh Tharu" },
  ],
} as const;

// Addresses the CV used to live at. They may already be in applications and messages, so the
// 404 page (app/not-found.tsx) sends them on to /resume instead of showing "not found".
export const RETIRED_RESUME_PATHS = ["/Ganesh_Chaudhary_CV_2026.pdf"];

export const ABOUT_DATA = {
  // The roles, the dates and the courses are in Experience and Education right below, so this
  // only says what those lists cannot: how I like to work and where I started.
  paragraphs: [
    "I like owning a feature end to end: the React interface, the API behind it and the database it depends on.",
    "I started on the design side, turning Figma wireframes into responsive layouts. I care about readable code, disciplined Git workflows and honest peer review.",
  ],
  highlights: [
    { label: "Projects Built", value: "9" },
    { label: "Technologies", value: "20+" },
    { label: "Years Building", value: "3+" },
  ] satisfies Highlight[],
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript (ES6+)" },
      { name: "TypeScript" },
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
      { name: "Supabase" },
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
      { name: "Vercel" },
      { name: "GitHub Actions" },
      { name: "Vitest" },
      { name: "Jira" },
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
      { name: "Progressive Web Apps" },
      { name: "Accessibility (WCAG AA)" },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Gemini API" },
      { name: "Gemini Live" },
      { name: "YOLO" },
      { name: "TrOCR" },
    ],
  },
];

// Named by what the client ends up with, not by layer of the stack. Each offer points at a
// project where the same work is already done, so nothing here is a promise without a precedent.
export const SERVICES_DATA = {
  heading: "What you get when we work together",
  intro: "Four kinds of work. Each one links to a project where it is already done.",
  items: [
    {
      title: "Website development",
      description:
        "A company site, landing page or online store that loads fast and is set up to be found on Google.",
      includes: [
        "Works on every screen size, from your design or mine",
        "Titles, descriptions, a sitemap and structured data",
        "Accessibility checked against WCAG AA",
      ],
      proof: [
        {
          label: "This site, source on GitHub",
          href: "https://github.com/ganesh-786/Ganesh-Portfolio",
        },
        { label: "Trihutbaba store", href: "/projects/trihutbaba-store" },
      ],
    },
    {
      title: "Web applications",
      description: "A product people sign in to and use every day.",
      includes: [
        "Sign-in, roles and permissions",
        "The database and the API behind the screens",
        "Installable on a phone, with notifications",
      ],
      proof: [
        { label: "UnTangler", href: "/projects/untangler" },
        { label: "GyanSathi", href: "/projects/gyansathi" },
      ],
    },
    {
      title: "AI features",
      description: "AI added to a product where it earns its place.",
      includes: [
        "Assistants that answer from your own documents",
        "Voice input and spoken conversation",
        "API keys kept on the server, never in the browser",
      ],
      proof: [
        { label: "Shopify support agent", href: "/projects/shopify-support-agent" },
        { label: "UnTangler voice", href: "/projects/untangler" },
      ],
    },
    {
      title: "Integrations and fixes",
      description: "Work on a product you already have.",
      includes: [
        "Google Calendar, Tasks and Classroom sync",
        "Push notifications and scheduled jobs",
        "Accessibility audits fixed to WCAG AA, tests and automated checks",
      ],
      proof: [
        { label: "UnTangler", href: "/projects/untangler" },
        { label: "Shopify agent speed-up", href: "/projects/shopify-support-agent" },
      ],
    },
  ] satisfies ServiceItem[],
  // What a client asks before writing, as four facts. They replaced the questions section on
  // 2026-10-06 and keep the owner's answers from it, in the owner's words.
  terms: {
    label: "On every project",
    items: [
      { label: "Reply", value: `By email, ${REPLY_WINDOW}` },
      { label: "Price", value: "Fixed, for a written scope agreed before work starts" },
      { label: "Hours", value: "Part-time, evenings and weekends, Nepal time (UTC+5:45)" },
      { label: "Updates", value: "Written, in plain language. You deal with me directly" },
    ] satisfies TermItem[],
  },
  cta: {
    heading: "Not sure which one you need?",
    body: "Tell me what you are building and what is in the way.",
  },
};

// Short on purpose: one fact per line, the way the resume states them. The detail behind the
// current role is its case study.
export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Full-Stack Developer",
    company: "Compass Decisions Science LLC",
    period: "Jul 2026 – Present",
    bullets: [
      "Building UnTangler, a production voice-first PWA for students with ADHD.",
      "Built the Gemini Live voice-to-schedule pipeline, timezone-aware dates, and Calendar, Tasks and Classroom sync.",
      "Designed the end-of-day check-in flow: Web Push, an in-app bell and a scheduled dispatch job.",
      "Ran an app-wide accessibility audit, fixed to WCAG AA. Set up CI and versioned Supabase migrations.",
      "Two developers and a product owner, Jira, every change reviewed in a pull request.",
    ],
    link: { label: "Read the UnTangler case study", href: "/projects/untangler" },
  },
  {
    role: "Junior Software Developer",
    company: "TEJ Center Private Limited",
    period: "Jan 2026 – Jul 2026",
    bullets: [
      "Built responsive, cross-browser React interfaces for 2 enterprise client applications.",
      "Turned Figma mockups into modular Tailwind CSS components. Strict peer review helped reduce UI rendering bugs.",
      "Worked in Agile sprints with UI/UX designers and backend engineers, with disciplined Git workflows.",
    ],
  },
  {
    role: "Software Developer Fellow",
    company: "TEJ Center Private Limited",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "A project-driven program: full-stack development, distributed system design, code reviews and technical presentations.",
      "Built team projects, including a RAG-based support agent and an event-driven order system.",
      "Completed the University of Helsinki Full Stack Open certificate (7 ECTS, Grade 5).",
    ],
  },
  {
    role: "Web Design Intern",
    company: "Nobel PBC Learning",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Designed user interfaces and page layouts in Figma, from wireframes to semantic web pages.",
      "Ran user flow research and accessibility audits on landing pages.",
    ],
  },
  {
    role: "Front-End Developer (Remote)",
    company: "Freelance",
    period: "2023 – 2025",
    bullets: ["Built interactive dashboards in vanilla JavaScript for training platforms."],
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
    note: "Issued under the name Ganesh Tharu.",
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

// One place to change the address, for example when a mailbox on the site's own domain is ready.
const EMAIL = "ganesh98245.np@gmail.com";

export const CONTACT_DATA = {
  heading: "Discuss your project",
  description:
    "Tell me what you are building and when you need it. Hiring for a full-time role? Use the same form.",
  replyWindow: REPLY_WINDOW,
  // What a client can count on after pressing send. The reply time is the first step, so the
  // description above does not repeat it.
  next: [
    `I reply by email ${REPLY_WINDOW}.`,
    "A short call, if the project looks like a fit.",
    sentence(SCOPE_AND_PRICE),
  ],
  // What the message is about. It is sent with the form, so the subject line says it at a glance.
  topics: [
    "A website",
    "A web application",
    "An AI feature",
    "Work on an existing product",
    "A full-time role",
    "Something else",
  ],
  email: EMAIL,
  // Web3Forms access key (safe to expose by design). While empty, the section
  // falls back to the direct email button.
  formAccessKey: "83bf2e7b-a7b7-408a-a9a1-9a3e030c4f3e",
  formSubject: "New message from ganeshtharu.com.np",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/ganesh-786",
      icon: "github",
      handle: "github.com/ganesh-786",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ganesh-chaudhary",
      icon: "linkedin",
      handle: "Ganesh Chaudhary on LinkedIn",
    },
    {
      name: "Email",
      url: `mailto:${EMAIL}`,
      icon: "mail",
    },
  ] satisfies SocialLink[],
};

export const FOOTER_DATA = {
  text: `© ${new Date().getFullYear()} Ganesh Chaudhary`,
};
