export interface PipelineStep {
  step: string;
  title: string;
  description: string;
  tech: string;
}

export interface EngineeringChallenge {
  problem: string;
  solution: string;
}

export interface BenchmarkMetric {
  metric: string;
  value: string;
  notes: string;
}

export interface ProjectDeepDive {
  architectureTagline: string;
  pipelineSteps: PipelineStep[];
  keyDecisions: string[];
  challenges: EngineeringChallenge[];
  benchmarks: BenchmarkMetric[];
  datasetInfo: string;
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
