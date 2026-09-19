export interface Project {
  id: string
  title: string
  badge?: string
  note?: string
  challenge: string
  approach: string
  outcome: string
  technologies: string[]
  githubUrl: string
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
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  details?: string
  certificateUrl?: string
  certificateImage?: string
}
