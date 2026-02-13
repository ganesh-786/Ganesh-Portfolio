export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export interface SkillItem {
  name: string
  icon: string
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
