export interface ProjectDecision {
  title: string
  body: string
}

// One thing a visitor can check for themselves. Without a link it is a plain statement of what
// is private or estimated, which is as much part of the evidence as the links are.
export interface ProjectEvidence {
  label: string
  detail: string
  href?: string
}

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

export interface Project {
  slug: string
  title: string
  category: string
  badge: string
  summary: string
  featured?: boolean
  period?: string
  status: string
  role: string
  team?: string
  problem: string[]
  solution: string[]
  flow?: string[]
  myPart: string[]
  teamPart?: string
  decisions?: ProjectDecision[]
  outcome: string[]
  evidence: ProjectEvidence[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: ProjectImage
  highlights?: CaseStudyHighlight[]
  figures?: CaseStudyFigure[]
  figuresNote?: string
  practices?: CaseStudyPractice[]
}

export interface ServiceProof {
  label: string
  href: string
}

export interface ServiceItem {
  title: string
  description: string
  includes: string[]
  proof: ServiceProof[]
}

export interface FaqItem {
  question: string
  answer: string
  link?: { label: string; href: string; external?: boolean }
}

export interface SkillItem {
  name: string
}

export interface SkillCategory {
  title: string
  skills: SkillItem[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  handle?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Highlight {
  label: string
  value: string
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  bullets: string[]
  link?: { label: string; href: string }
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  details?: string
  certificateUrl?: string
  certificateImage?: string
  note?: string
}

export interface CaseStudyHighlight {
  label: string
  title: string
  body: string
  points?: string[]
}

export interface CaseStudyFigure {
  value: string
  label: string
}

export interface CaseStudyPractice {
  title: string
  body: string
}
