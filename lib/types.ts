export interface Project {
  id: string
  title: string
  badge?: string
  note?: string
  challenge: string
  approach: string
  role: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface ServiceItem {
  title: string
  description: string
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
