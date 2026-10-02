import type {
  NavItem,
  Highlight,
  SocialLink,
  ServiceItem,
  FaqItem,
  SkillCategory,
  ExperienceItem,
  EducationItem,
} from "./types";

// Stated in the hero, the services section, the questions and the contact form. One place to
// change it, so the site never promises two different things.
const REPLY_WINDOW = "within two working days";

// The page runs in the order a client reads it: the work, what they get, their questions, then
// who is behind it. "Discuss your project" sits in the bar as a button, so Contact is not listed.
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Questions", href: "#questions" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];

export const CONTACT_CTA = { label: "Discuss your project", href: "#contact" };

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
    "I build websites, web applications and AI features, and I own the whole job: the screens people use, the API and database behind them, and getting it live. Right now I do that on UnTangler, a production app for students with ADHD.",
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
  paragraphs: [
    "I'm a full stack developer who likes owning a feature end to end: the React interface, the API behind it, and the database it depends on. Right now that means UnTangler, a voice-first app for students with ADHD, where I work everywhere from the database and API to voice, notifications and accessibility.",
    "Before that I was at TEJ Center, where I built React interfaces for two enterprise client applications inside Agile sprints and, through the fellowship, systems ranging from event-driven order processing to AI support agents. I started on the design side, as a web design intern turning Figma wireframes into responsive layouts, and I have freelanced as a front-end developer building dashboards for training platforms. I keep my foundations current through structured coursework, most recently the University of Helsinki's Full Stack Open and Anthropic's Claude Code in Action, and I care about readable code, disciplined Git workflows, and honest peer review.",
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
  intro:
    "Four kinds of work I take on, described by what you end up with. Each one points to a project where I have already done it.",
  items: [
    {
      title: "Website development",
      description:
        "A company site, a landing page or an online store that loads fast, reads well on a phone and is set up to be found on Google.",
      includes: [
        "Pages that work on every screen size, built from your design or mine",
        "Search basics done properly: titles, descriptions, a sitemap and structured data",
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
      description:
        "A product people sign in to and use every day: accounts, roles, dashboards and real data behind every screen.",
      includes: [
        "Sign-in, roles and permissions",
        "The database and the API behind the screens",
        "Installable on a phone like an app, with notifications",
      ],
      proof: [
        { label: "UnTangler", href: "/projects/untangler" },
        { label: "GyanSathi", href: "/projects/gyansathi" },
      ],
    },
    {
      title: "AI features",
      description:
        "AI added where it earns its place: an assistant that answers from your own documents, voice input, or summaries inside a product you already have.",
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
      description:
        "Work on a product you already have: connect it to another service, or fix what is slow, unreliable or hard to use.",
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
  cta: {
    heading: "Not sure which one you need?",
    body: `Tell me what you are building and what is in the way. I reply ${REPLY_WINDOW} with what it would take, in plain language.`,
  },
};

// The questions a client has before writing, answered with facts. The reply time, the hours and
// the pricing model are the owner's own answers (2026-10-02), so change them only with the owner.
export const FAQ_DATA = {
  heading: "Before you get in touch",
  intro: "Price, timing, availability and how the work runs, answered plainly.",
  items: [
    {
      question: "What happens after I send a message?",
      answer: `I reply by email ${REPLY_WINDOW}. If the project looks like a fit we have a short call, and then I send you a written scope: what will be built, what is left out, the timeline and the price. Nothing starts until you have agreed to it.`,
    },
    {
      question: "How do you charge?",
      answer:
        "A fixed price for a written scope, agreed before any work starts, so you know the cost up front. If you want to add something later, we scope and price that separately.",
    },
    {
      question: "When are you available?",
      answer:
        "I work full time as a developer and take freelance projects part-time, in the evenings and at weekends, with my employer’s agreement. I am in Kathmandu, Nepal (UTC+5:45). A 9 am call in New York is 6:45 pm here in the US summer and 7:45 pm in the US winter, so a regular call fits the hours I keep for freelance work.",
    },
    {
      question: "Can you work on a product that already exists?",
      answer:
        "Yes, that is what I do every day. On UnTangler I work inside an existing codebase with another developer and a product owner, in small changes that are each reviewed before they go in.",
      link: { label: "Read the UnTangler case study", href: "/projects/untangler" },
    },
    {
      question: "How will I know how the work is going?",
      answer:
        "You get written updates in plain language that say what changed for your users and what is next, not which files were edited. The work itself arrives in small pieces you can look at as they are finished.",
    },
    {
      question: "Do you work alone?",
      answer:
        "Yes. You deal with me directly and I do the work myself. Some projects shown here were built in teams, and each case study says which part was mine and which was a teammate’s.",
    },
    {
      question: "Are you open to a full-time role?",
      answer:
        "Yes. I am open to full-time roles as well as freelance projects. My resume is one page and opens in the browser.",
      link: { label: "View the resume", href: "/resume", external: true },
    },
  ] satisfies FaqItem[],
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Full-Stack Developer",
    company: "Compass Decisions Science LLC",
    period: "Jul 2026 – Present",
    bullets: [
      "Building UnTangler, a production voice-first PWA that turns an overwhelming task into small steps for students with ADHD and schedules them into Google Calendar, Tasks and Classroom.",
      "Built the Gemini Live voice-to-schedule pipeline, timezone-aware date handling, and Calendar, Tasks and Classroom sync.",
      "Designed the end-of-day check-in flow and its notifications: Web Push, an in-app notification bell, and a scheduled dispatch job.",
      "Ran an app-wide accessibility audit and fixed the findings to WCAG AA, and set up CI and versioned Supabase migrations.",
      "Work in a two-developer team with a product owner, tracked in Jira, with every change reviewed through a pull request.",
    ],
    link: { label: "Read the UnTangler case study", href: "/projects/untangler" },
  },
  {
    role: "Junior Software Developer",
    company: "TEJ Center Private Limited",
    period: "Jan 2026 – Jul 2026",
    bullets: [
      "Built responsive, cross-browser React interfaces for 2 enterprise client applications.",
      "Turned complex Figma mockups into modular, production-ready front-end code with Tailwind CSS. Strict peer reviews helped reduce UI rendering bugs.",
      "Worked directly with UI/UX designers and backend engineers in fast-paced Agile sprints.",
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
  description: `Tell me what you are building, what is in the way and when you need it. I reply by email ${REPLY_WINDOW}. Hiring for a full-time role? Use the same form.`,
  replyWindow: REPLY_WINDOW,
  // The short version of the first question in FAQ_DATA, for a visitor who came straight here.
  next: [
    `I reply by email ${REPLY_WINDOW}.`,
    "A short call, if the project looks like a fit.",
    "A written scope and a fixed price, before any work starts.",
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
