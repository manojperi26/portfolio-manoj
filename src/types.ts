export interface PipelineStep {
  step: string;
  title: string;
  description: string;
  tech?: string;
}

export interface ProjectDeepDive {
  architectureTagline: string;
  pipelineSteps: PipelineStep[];
  quantitativeResults?: string[];
  engineeringNotes?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  deepDive?: ProjectDeepDive;
}

export interface SkillItem {
  name: string;
  description: string;
  iconName: string;
  category: string;
  level?: string;
  technologies?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl: string;
  skillsAcquired?: string[];
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  period: string;
  image: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
}

export interface UniversityTab {
  id: string;
  label: string;
  content: {
    description: string;
    items: {
      title: string;
      desc: string;
      image?: string;
      icon?: string;
    }[];
  };
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  degree: string;
  period: string;
  grade?: string;
  description?: string;
  highlights?: string[];
  iconName?: string;
}

export interface SoftSkillItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  traits: string[];
}
