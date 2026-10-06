import type { Project } from './types'

// Every project has its own page at /projects/<slug>. The page is built from this file, so a
// case study only says what a source backs up: the repository and its commit history, a
// published report, or my own record of the work. Where a figure is an estimate, or something
// cannot be checked from outside, the evidence list says so. Team projects name my part and the
// teammates' part, without naming people.
//
// Keep it short. A reader scans a case study: one or two sentences per paragraph, and a list
// wherever the text is a list. scripts/verify-build.mjs fails the build on a long paragraph.
//
// Order matters: featured projects lead the home page in this order, the rest follow.

const PBL = 'https://github.com/TEJ-Fellowship/pbl/tree'

export const PROJECTS: Project[] = [
  {
    slug: 'untangler',
    title: 'UnTangler',
    category: 'Web application',
    badge: 'Production product, my current role',
    featured: true,
    summary:
      'A voice-first app that helps students with ADHD turn an overwhelming task into small steps, then puts those steps on their Google Calendar.',
    period: 'Jul 2026 to present',
    status: 'In production and in active development',
    role: 'Full-stack developer at Compass Decisions Science LLC',
    team: 'Two developers and a product owner, with Jira and pull request review',
    problem: [
      'UnTangler is for students with ADHD who are facing a task that feels too big to start.',
    ],
    needs: [
      'Turn that task into small steps, scheduled where the student already looks',
      'Make adding a task as easy as saying it out loud',
      'Land a spoken time such as “tomorrow at 5” on the right day, in the student’s own timezone',
      'Reach the phone with the reminder, including an iPhone with the app installed',
    ],
    solution: [
      'An installable web app (a PWA): a React and TypeScript front end, an Express API and a Supabase Postgres database.',
    ],
    flow: [
      'The student says a task out loud and refines it by talking, with no restart.',
      'Spoken dates and times are resolved in the student’s real timezone, and can be corrected by hand.',
      'The steps sync to Google Calendar, Tasks and Classroom. Finishing a step is written back to the Calendar event.',
      'An end-of-day check-in asks what got done. Reminders arrive as push notifications and in an in-app bell.',
    ],
    myPart: [
      'The Gemini Live voice-to-schedule pipeline and the timezone-aware date handling.',
      'Google Calendar, Tasks and Classroom sync, including the stuck and broken-connection cases.',
      'The whole end-of-day check-in flow and its notifications.',
      'Installable app behaviour on iOS and Android, an app-wide accessibility audit fixed to WCAG AA, and the CI workflow.',
    ],
    teamPart:
      'One other developer and a product owner, who writes the specs in plain language. Every change of mine is reviewed in a pull request before it merges.',
    highlights: [
      {
        label: 'Voice',
        title: 'Speak a to-do, refine it by talking',
        points: [
          'Gemini Live: say a task and adjust it in conversation, with no restart',
          'Short-lived, single-use, model-locked tokens issued by the backend',
          'No WebSocket proxy: the backend is one Vercel serverless function',
        ],
      },
      {
        label: 'Dates',
        title: 'Spoken times that land on the right day',
        points: [
          'A timezone-aware converter from wall-clock time to UTC',
          'The student’s real timezone threaded through every date-resolution path',
          'A resolved due date can be corrected by hand',
        ],
      },
      {
        label: 'Google',
        title: 'Calendar, Tasks and Classroom sync',
        points: [
          'Task completion written back to the real Calendar event',
          'Sync states that got stuck silently, fixed',
          'An unreadable Google connection is recovered from, not a crash',
        ],
      },
      {
        label: 'Check-ins',
        title: 'The end-of-day check-in',
        points: [
          'Finish-time entry, snooze, daily confirmation and catch-up',
          'Web Push and an in-app notification bell',
          'A scheduled job (GitHub Actions and a Supabase cron migration) that dispatches due check-ins',
        ],
      },
      {
        label: 'PWA',
        title: 'Installable on iOS and Android',
        points: [
          'iOS and standalone-mode detection, install metadata and an install option in the app',
          'Fixes for service worker and manifest caching problems',
          'Microphone permission fixed in the installed iPhone app, and a mic that connects but never captures audio is detected',
          'A real-browser end-to-end suite for iOS and Android push',
        ],
      },
      {
        label: 'Accessibility',
        title: 'An app-wide audit, fixed to WCAG AA',
        points: [
          'Very Major, Major and Minor findings resolved',
          'WCAG AA colour contrast, ARIA landmarks and touch-target sizes',
          'aria-live and role=alert on async status text',
          'Consistent focus and disabled states',
        ],
      },
      {
        label: 'Reliability',
        title: 'Security and stability',
        points: [
          'The Live token endpoint requires authentication',
          'Voice sessions are guarded against re-entry',
          'Supabase calls are wrapped in error handling',
          'Flaky tests fixed: a time-dependent scheduling test and an extraction test that made real network calls',
        ],
      },
      {
        label: 'Delivery',
        title: 'CI, deploys and migrations',
        points: [
          'Set up the CI workflow',
          'Sped up deploys by installing frontend and backend dependencies in parallel',
          'Fixed production build failures',
          'Schema changes go through versioned Supabase migrations',
        ],
      },
    ],
    decisions: [
      {
        title: 'The browser talks to Gemini directly',
        body: 'The backend hands the browser a token that is short-lived, single-use and locked to one model. There is no WebSocket proxy to run or pay for, and the real API key never leaves the server.',
      },
      {
        title: 'Reminder times live in the database',
        body: 'Saved per user, not held in the server’s memory. A value in memory is shared by everyone and disappears whenever a serverless function restarts.',
      },
      {
        title: 'A broken Google connection is something to recover from',
        body: 'The app treats it as a state to repair and tells the student, instead of crashing or leaving a sync silently stuck.',
      },
    ],
    outcome: [
      'UnTangler is in production and I am still building it. Every feature above shipped through a reviewed pull request.',
    ],
    figures: [
      { value: '160 of 286', label: 'non-merge commits are mine' },
      { value: '~190', label: 'pull requests merged' },
      { value: '19', label: 'database migrations' },
      { value: '77', label: 'test files' },
      { value: '2', label: 'CI workflows' },
      { value: '88 of 89', label: 'Jira tickets assigned to me are done' },
    ],
    figuresNote:
      'From the project’s git history and Jira board on 17 September 2026, covering 17 July to 17 September. Both are private, so there is no public link to check them against.',
    practices: [
      {
        title: 'Specs become software',
        body: 'I work from the product owner’s plain-language specs and break each epic into stories and subtasks. I am the reporter on 128 of the project’s 181 tickets.',
      },
      {
        title: 'Ask before building',
        body: 'On the weekly summary feature I posted my starting plan and asked for a decision first. When a ticket leaves out a priority or an estimate, I ask instead of guessing.',
      },
      {
        title: 'Two audiences, two registers',
        body: 'Technical status goes to the engineers. A plain-language note closes the ticket for the product owner: what changed for the student, not which files.',
      },
      {
        title: 'Own the gaps',
        body: 'On a push-reliability ticket I wrote that my first comment only covered half the spec, then reported the rest. I also flagged and fixed a gap my own cleanup could cause.',
      },
      {
        title: 'Small, reviewable changes',
        body: 'One pull request holds one coherent change, on a branch off main, with a named reviewer.',
      },
    ],
    evidence: [
      {
        label: 'Employer and product',
        detail: 'Compass Decisions Science LLC and UnTangler are named with the company’s permission.',
      },
      {
        label: 'The numbers',
        detail:
          'The repository and the Jira board are private, so the figures cannot be linked. They were read on 17 September 2026.',
      },
      {
        label: 'What is left out',
        detail: 'Colleague names, ticket numbers and internal quotes, on purpose.',
      },
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS 4',
      'Express 5',
      'Zod',
      'Supabase (Postgres, Auth, RLS)',
      'Gemini Live',
      'Google Calendar, Tasks and Classroom APIs',
      'Web Push',
      'Vercel',
      'GitHub Actions',
      'Vitest',
    ],
  },
  {
    slug: 'shopify-support-agent',
    title: 'Shopify Merchant Support Agent',
    category: 'AI assistant',
    badge: 'TEJ Fellowship team project',
    featured: true,
    summary:
      'An assistant that answers Shopify merchants’ questions from Shopify’s own documentation, and can look at the merchant’s real store data.',
    period: 'Oct to Nov 2025',
    status: 'Completed. The code is public, there is no hosted demo',
    role: 'AI pipeline, tools and merchant dashboard',
    team: 'Small fellowship team. 40 of the project’s 49 commits are mine',
    problem: [
      'Shopify merchants ask the same questions again and again. The answers exist, spread across the help centre, the manual and the developer documentation.',
    ],
    needs: [
      'Answer from Shopify’s own documentation',
      'Be fast enough to feel like a conversation',
      'See how the merchant’s own shop is doing',
    ],
    solution: [
      'A chat assistant that answers from a knowledge base built out of Shopify’s documentation. It reads real store data through a Shopify app connection, and a dashboard shows how it is being used.',
    ],
    flow: [
      'Shopify’s documentation is scraped, cut into chunks and stored as embeddings in Pinecone.',
      'A question is classified by intent: fast rules first, the model only when the rules are unsure.',
      'The knowledge base is searched by meaning (Pinecone) and by keyword (FlexSearch) in parallel, and the results are merged.',
      'Gemini writes the answer from the passages that were found, using the conversation so far.',
      'When the answer’s confidence is low, the matching tool is called before replying.',
      'Embeddings and answers are cached, so a repeated or similar question comes back at once.',
    ],
    myPart: [
      'Most of the AI side: scraping, chunking and embedding the knowledge base into Pinecone.',
      'Hybrid search, conversation history, intent routing and caching.',
      'The tools the assistant can call, built on the Model Context Protocol: a calculator, web search, date and time, currency conversion, Shopify’s status page, theme compatibility and code validation.',
      'The merchant dashboard in Tailwind CSS.',
      'The latency analysis, then caching and running the slow steps in parallel.',
    ],
    teamPart: 'A teammate connected the Shopify Admin API, so the assistant can read real store data.',
    decisions: [
      {
        title: 'Search by meaning and by keyword together',
        body: 'Product names and API terms need an exact keyword match, a loosely worded question needs a search by meaning. Both run at once and the results are merged.',
      },
      {
        title: 'Rules first, the model second',
        body: 'The analysis put the model call that works out what a question is about at roughly 0.8 seconds. Clear cases now go through fast rules, and the model is called only when the rules are unsure.',
      },
      {
        title: 'Measure before optimising',
        body: 'A step-by-step breakdown of one answer showed which steps were waiting on each other for no reason. Those are the ones I ran in parallel or cached.',
      },
    ],
    outcome: [
      'A working assistant, with its architecture, data pipeline and caching documented in the repository.',
      'The repository’s latency analysis puts one uncached answer at about 3.5 seconds, and expects 1.2 to 1.8 seconds after the changes. Both are estimates from per-step timings, not a measured benchmark.',
    ],
    evidence: [
      {
        label: 'Code',
        detail: 'The project folder on the branch that holds the finished work.',
        href: `${PBL}/latency/PBL4/ShopifyMerchantSupportAgent`,
      },
      {
        label: 'Latency analysis',
        detail: 'The step-by-step breakdown the timing figures come from.',
        href: 'https://github.com/TEJ-Fellowship/pbl/blob/latency/PBL4/ShopifyMerchantSupportAgent/docs/analysis/LATENCY_ANALYSIS_REPORT.md',
      },
      {
        label: 'Who did what',
        detail: 'The folder’s commit history: which commits are mine and which are my teammates’.',
        href: 'https://github.com/TEJ-Fellowship/pbl/commits/latency/PBL4/ShopifyMerchantSupportAgent',
      },
    ],
    technologies: [
      'Node.js',
      'Express',
      'Gemini API',
      'Pinecone',
      'FlexSearch',
      'MongoDB',
      'Model Context Protocol',
      'React',
      'Tailwind CSS',
    ],
    githubUrl: `${PBL}/latency/PBL4/ShopifyMerchantSupportAgent`,
  },
  {
    slug: 'ecommerce-order-system',
    title: 'E-commerce Order Management System',
    category: 'Backend system',
    badge: 'TEJ Fellowship team project',
    featured: true,
    summary:
      'An order system built so a busy store does not sell the same last item twice or freeze at checkout while a payment goes through.',
    period: 'Nov to Dec 2025',
    status: 'Completed. The code is public and runs locally',
    role: 'System design and most of the code',
    team: 'Small fellowship team',
    problem: [
      'A busy online store fails in two expensive ways: it sells the same last item to two people, or checkout hangs while a payment is processed.',
    ],
    needs: ['Stay correct and responsive under load', 'Never oversell inventory'],
    solution: [
      'An Express API that sends writes to a PostgreSQL primary and spreads reads across two replicas, with Redis for caching and for the shopping cart.',
      'Redis and Kafka run in Docker Compose. The storefront is a mobile-first React and Tailwind CSS interface, and the payment gateway is simulated.',
    ],
    flow: [
      'Browsing: product pages are read from the replicas and cached in Redis.',
      'Cart: each shopper’s cart is kept in Redis.',
      'Checkout: stock is reserved in Redis in one atomic step, so two shoppers cannot take the same last item.',
      'The order is written to the primary database and the payment is queued on Kafka. The shopper gets an answer straight away.',
      'A payment worker processes the payment and updates the order. If the payment fails, the reserved stock is released.',
      'The storefront checks the payment status and shows the result.',
    ],
    myPart: [
      'The system design, including the plan for how it grows.',
      'The API with its primary and replica databases, and the Redis caching.',
      'The Kafka payment worker.',
      'The React storefront.',
      'The k6 load test scripts.',
    ],
    teamPart: 'A teammate fixed inventory reservation and tuned the system for the load tests.',
    decisions: [
      {
        title: 'Reads and writes go to different databases',
        body: 'Most of a store’s traffic is people looking, not buying. Reads are spread across two replicas and only writes touch the primary. If a replica is unhealthy, reads fall back to the primary.',
      },
      {
        title: 'The payment runs after the response, not during it',
        body: 'Checkout queues the payment and answers at once. A slow payment no longer holds the shopper on a spinner, and it is not lost if the worker restarts, because it stays on the queue.',
      },
      {
        title: 'Stock is reserved in one atomic step',
        body: 'Checking the stock and reducing it happen as a single step in Redis, so there is no gap in which a second shopper can reserve the same last item.',
      },
    ],
    outcome: [
      'The system runs end to end on a local machine: browse, cart, checkout, payment in the background and order history.',
      'The repository holds the system design and k6 scripts that ramp up to 500 simulated shoppers, with pass and fail limits. No measured load test result is published there, so I quote none here.',
    ],
    evidence: [
      {
        label: 'Code',
        detail: 'The project folder on the branch that holds my work.',
        href: `${PBL}/Eganesh/PBL5/6_E-commerce_Orders`,
      },
      {
        label: 'System design',
        detail: 'The design documents, from a first thousand daily users upward.',
        href: `${PBL}/Eganesh/PBL5/6_E-commerce_Orders/docs/07-system-design`,
      },
      {
        label: 'Load test scripts',
        detail: 'The k6 scripts and the limits they check.',
        href: `${PBL}/Eganesh/PBL5/6_E-commerce_Orders/k6`,
      },
    ],
    technologies: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Docker Compose',
      'React',
      'Tailwind CSS',
      'k6',
    ],
    githubUrl: `${PBL}/Eganesh/PBL5/6_E-commerce_Orders`,
  },
  {
    slug: 'trihutbaba-store',
    title: 'Trihutbaba',
    category: 'Online store',
    badge: 'Solo project, in progress',
    summary:
      'An online store for an agriculture supply shop in Nepal, in English and Nepali, with local payment methods and an admin area for the owner.',
    period: 'Started Apr 2026',
    status: 'In progress. Not launched yet',
    role: 'Everything, end to end',
    team: 'Solo',
    problem: [
      'The Trihutbaba store sells farm machinery and tools, and needed a proper way to manage and sell them online.',
    ],
    needs: [
      'Be simple to use, because its customers are farmers',
      'Be readable in Nepali',
      'Take the payment methods people in Nepal already have',
    ],
    solution: [
      'A storefront in English and Nepali with products, categories, a cart and checkout, and an admin area where the owner manages products, categories, orders and customers.',
      'Checkout supports eSewa, Khalti and cash on delivery. An order moves through pending, paid, processing, shipped and delivered.',
      'It has not launched: there is no public address yet, so no real orders or payments have gone through it. Weather forecasts for farmers are planned.',
    ],
    myPart: ['I started this on my own and am building it end to end.'],
    decisions: [
      {
        title: 'Two languages from the start',
        body: 'Every page exists under an English and a Nepali address, with each language’s wording in its own file. Adding Nepali later would have meant touching every screen again.',
      },
      {
        title: 'The browser is never trusted on price',
        body: 'The order is created on the server first. When a payment comes back, the server checks its signature and the amount, asks the provider to confirm it, and refuses to mark an order paid twice.',
      },
    ],
    outcome: [
      'The storefront, admin area and payment code are in the public repository. It is still in progress and has not launched.',
    ],
    evidence: [
      {
        label: 'Code',
        detail: 'The whole project, including the payment routes and both languages.',
        href: 'https://github.com/ganesh-786/TrihutBaba',
      },
      {
        label: 'Not live',
        detail: 'There is no public address yet, so there is nothing to click through.',
      },
    ],
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Supabase (Postgres, Auth, Storage)',
      'Drizzle ORM',
      'next-intl',
      'Tailwind CSS',
      'eSewa',
      'Khalti',
    ],
    githubUrl: 'https://github.com/ganesh-786/TrihutBaba',
  },
  {
    slug: 'shambaad',
    title: 'Shambaad',
    category: 'Real-time chat',
    badge: 'Team project',
    summary:
      'Real-time chat with text and voice messages, wrapped in an interface designed to feel premium.',
    period: 'Sep 2025',
    status: 'Front end online. The chat backend is no longer running',
    role: 'Chat system, UI and UX design',
    problem: [
      'Real-time chat that handles both text and voice messages, wrapped in an interface that feels premium.',
    ],
    solution: [
      'WebSocket chat with friend requests, live messaging, recorded voice notes, and editing or deleting your own messages.',
      'A React front end talks to an Express and MongoDB backend, and messages travel over Socket.IO. Voice recordings are stored on Microsoft Azure.',
    ],
    myPart: [
      'I built the chat system over WebSockets.',
      'I designed the UI and UX.',
      'Video calling was planned as a next step and put on hold.',
    ],
    outcome: [
      'The front end of the demo is still online. Its backend is no longer deployed, so signing up and chatting do not work there today. The code for both is public.',
    ],
    evidence: [
      {
        label: 'Live demo',
        detail:
          'The front end only. Signing up needs the backend, which is no longer deployed, so you can look at the pages but not chat.',
        href: 'https://shambad-d-5y84.vercel.app/',
      },
      {
        label: 'Code',
        detail:
          'My repository, with the front end and the backend. Its 11 commits, from 18 to 21 September 2025, are mine.',
        href: 'https://github.com/ganesh-786/Shambaad',
      },
    ],
    technologies: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Azure Blob Storage'],
    githubUrl: 'https://github.com/ganesh-786/Shambaad',
    liveUrl: 'https://shambad-d-5y84.vercel.app/',
    image: {
      src: '/images/projects/shambaad.webp',
      alt: 'The Shambaad landing page, headed “Where Voices Connect”, with Log In and Sign Up buttons.',
      width: 1440,
      height: 900,
      caption: 'The landing page of the demo, captured on 2 October 2026.',
    },
  },
  {
    slug: 'gyaan-tapari',
    title: 'Gyaan Tapari',
    category: 'Learning app',
    badge: 'Solo project, TEJ Fellowship',
    summary:
      'Learning turned into a game for students in grades 8 and 9: quizzes, a typing race and hangman, with points, levels and streaks.',
    period: 'Aug 2025',
    status: 'Live demo online',
    role: 'Everything, end to end',
    team: 'Solo',
    problem: ['Make learning more engaging for students in grades 8 and 9.'],
    solution: [
      'Quizzes in mathematics, science, English and social studies, typing games and hangman, with progress tracking and an AI helper built on Gemini.',
      'A student can start as a guest, without an account. Points, levels, streaks and achievements are kept in the browser.',
    ],
    myPart: [
      'I built it solo during the fellowship.',
      'I presented it to seniors and alumni, who encouraged me to keep going.',
    ],
    outcome: ['The demo is online and can be used without signing in.'],
    evidence: [
      {
        label: 'Live demo',
        detail: 'The running application.',
        href: 'https://gyaan-tapari.vercel.app/',
      },
      {
        label: 'Code',
        detail: 'The project folder in the fellowship repository.',
        href: `${PBL}/main/PBL3/Gyaan_Tapari`,
      },
      {
        label: 'Who built it',
        detail:
          'The commit history in my own repository. All 12 commits are mine, from 11 to 14 August 2025.',
        href: 'https://github.com/ganesh-786/GyaanTapari/commits/main',
      },
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Gemini API'],
    githubUrl: `${PBL}/main/PBL3/Gyaan_Tapari`,
    liveUrl: 'https://gyaan-tapari.vercel.app/',
    image: {
      src: '/images/projects/gyaan-tapari.webp',
      alt: 'The Gyaan Tapari dashboard: level, points, achievements and day streak at the top, subject cards for Mathematics and Science below, and a weekly goal on the right.',
      width: 1440,
      height: 900,
      caption: 'The live demo, captured on 2 October 2026.',
    },
  },
  {
    slug: 'gyansathi',
    title: 'GyanSathi',
    category: 'Learning platform',
    badge: 'TEJ Fellowship team project',
    summary:
      'A learning platform where educators publish courses and lessons, and students enrol and learn from them.',
    period: 'Aug to Sep 2025',
    status: 'Front end online. Its backend is no longer running',
    role: 'Sign-in, roles and permissions, and most of the code',
    team: 'Small fellowship team. 18 of the project’s 21 commits are mine',
    problem: ['Give teachers a place to publish lessons and students a place to learn from them.'],
    needs: [
      'Let an educator create and manage courses',
      'Let a student enrol in them',
      'Stop either one from doing the other’s job',
    ],
    solution: [
      'A learning platform with role-based sign-in. Educators post text lessons and video links, and students enrol and learn from them. An AI guide built on Gemini answers questions.',
    ],
    myPart: [
      'Role-based authentication and authorization for students and educators, my core responsibility.',
      'The Express and MongoDB backend: sign-in with JSON Web Tokens, the role checks, and the course and lesson API.',
      'Much of the React front end, including the AI guide and the light and dark themes.',
    ],
    teamPart: 'A teammate built the course management page and other front-end screens.',
    decisions: [
      {
        title: 'Permissions are checked on the server',
        body: 'What a student or an educator may do is decided by the API on every request, not by which buttons the page shows.',
      },
    ],
    outcome: [
      'The front end of the demo is still online and shows the separate registration for students and educators.',
      'Its backend is no longer deployed, so creating an account does not work there today. The code for both is public.',
    ],
    evidence: [
      {
        label: 'Live demo',
        detail:
          'The front end only. Signing in needs the backend, which is no longer deployed, so you can look at the pages but not create an account.',
        href: 'https://gyaan-sathi-psrf.vercel.app/',
      },
      {
        label: 'Code',
        detail: 'The project folder, with the backend and the front end.',
        href: `${PBL}/main/PBL2/GyanSathi`,
      },
      {
        label: 'Who did what',
        detail: 'The commit history of that folder.',
        href: 'https://github.com/TEJ-Fellowship/pbl/commits/main/PBL2/GyanSathi',
      },
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JSON Web Tokens', 'Gemini API'],
    githubUrl: `${PBL}/main/PBL2/GyanSathi`,
    liveUrl: 'https://gyaan-sathi-psrf.vercel.app/',
    image: {
      src: '/images/projects/gyansathi.webp',
      alt: 'The GyanSathi registration form, with an account type field set to Student and the note that students can enrol in courses while educators can create and manage them.',
      width: 1440,
      height: 900,
      caption: 'The registration page of the live demo, captured on 2 October 2026.',
    },
  },
  {
    slug: 'focusflow',
    title: 'FocusFlow',
    category: 'Productivity app',
    badge: 'TEJ Fellowship team project',
    summary:
      'A to-do manager that uses AI to summarise your task list and adds a quote to go with it.',
    period: 'Jul to Aug 2025',
    status: 'Live demo online',
    role: 'AI summary, quotes, task list and filters',
    team: 'Two developers',
    problem: [
      'Build a simple to-do manager and use AI to make it more useful. It was our first project after joining the TEJ Fellowship.',
    ],
    solution: [
      'A task manager with categories and filters, where Gemini summarises your to-do list and a quote banner adds a line to go with it.',
    ],
    myPart: [
      'I integrated the Gemini summary and the quotes.',
      'I worked on the task list and the category filter.',
    ],
    teamPart: 'A teammate built the first version of the interface.',
    outcome: ['The demo is online and can be used without signing in.'],
    evidence: [
      {
        label: 'Live demo',
        detail: 'The running application.',
        href: 'https://focus-flow-tan.vercel.app/',
      },
      {
        label: 'Code',
        detail: 'The project folder.',
        href: `${PBL}/main/PBL1/FocusFlow-Project/frontend/focusflow`,
      },
    ],
    technologies: ['React', 'Vite', 'Gemini API'],
    githubUrl: `${PBL}/main/PBL1/FocusFlow-Project/frontend/focusflow`,
    liveUrl: 'https://focus-flow-tan.vercel.app/',
    image: {
      src: '/images/projects/focusflow.webp',
      alt: 'The FocusFlow page: a quote card with a Next Quote button at the top, and the quick task entry form below.',
      width: 1440,
      height: 900,
      caption: 'The live demo, captured on 2 October 2026.',
    },
  },
  {
    slug: 'citizenship-verification',
    title: 'Citizenship Verification System',
    category: 'Document verification',
    badge: 'University capstone, team of four',
    summary:
      'A web application that checks a Nepali citizenship or ID card against what a person typed and against their photo, instead of a clerk doing it by hand.',
    period: 'Dec 2024 to Mar 2025',
    status: 'Completed and submitted in March 2025',
    role: 'Front-end developer',
    team: 'Four students',
    problem: [
      'In Nepal, people and businesses can wait more than a week for a document to be verified by hand, which holds up things like opening a bank account.',
    ],
    needs: [
      'Read the Nepali and English text on the card',
      'Compare it with what the person entered',
      'Compare the face on the card with their photo',
    ],
    solution: [
      'A Django web application. A person fills in a form and uploads their citizenship card, ID card and a passport-sized photo, and three checks together decide whether the identity is verified.',
    ],
    flow: [
      'The person fills in the form and uploads the citizenship card, the ID card and a photo.',
      'The faces on the documents are compared with the photo.',
      'A ResNet-50 classifier checks that each upload really is a citizenship card or an ID card.',
      'A fine-tuned TrOCR model reads the Nepali text from the citizenship card and the English text from the ID card.',
      'The text that was read is compared with what the person typed.',
      'The three results together decide whether the identity is verified.',
    ],
    myPart: [
      'The web interface in HTML, CSS, JavaScript and Bootstrap: the landing page and the verification page with its forms and upload step.',
      'On the form, what a person types in English is translated into Nepali for them to confirm, since the citizenship card itself is in Nepali.',
    ],
    teamPart:
      'Teammates trained the text and classification models and built the Django backend that connects them to the interface.',
    outcome: [
      'The project report gives a character error rate of 4.28% for the Nepali text model on 1,000 test images, and 99% accuracy for the document classifier across its four classes. These are the team’s reported results.',
    ],
    evidence: [
      {
        label: 'Project report',
        detail: 'The full report submitted to the university, with the method and the results.',
        href: 'https://github.com/aachaltiwari/Document-Verification/blob/master/Major_Project.pdf',
      },
      {
        label: 'Code',
        detail:
          'The repository lives under a teammate’s GitHub account. My commits there are the front-end ones.',
        href: 'https://github.com/aachaltiwari/Document-Verification',
      },
    ],
    technologies: ['Python', 'Django', 'TrOCR', 'ResNet-50', 'OpenCV', 'Bootstrap', 'JavaScript'],
    githubUrl: 'https://github.com/aachaltiwari/Document-Verification',
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured)
export const OTHER_PROJECTS = PROJECTS.filter((project) => !project.featured)

export const projectPath = (slug: string) => `/projects/${slug}`

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}
