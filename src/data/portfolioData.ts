import { Project, SkillItem, Certification, Internship } from '../types';

export const PERSONAL_INFO = {
  name: 'Peri Naga Venkata Sai Manoj',
  titles: ['AI & Data Science Engineer', 'Python', 'Machine Learning', 'Deep Learning'],
  roleSubtitle: 'AI & Data Science Engineer | Python | Machine Learning | Deep Learning',
  heroBadge: '',
  bio: "I am Peri Naga Venkata Sai Manoj, currently pursuing my B.Tech in Computer Science Engineering (AI & Data Science) at Lovely Professional University, alongside the DRISHTI CPS program in AI & Data Science at IIT Indore. I build AI/ML projects and I'm passionate about creating scalable, real-world solutions.",
  profileImage: '/portfolio/profile.png',
  email: 'manojperi26@gmail.com',
  phone: '+91 88857 72647',
  phoneRaw: '+918885772647',
  linkedin: 'https://www.linkedin.com/in/manojperi26/',
  github: 'https://github.com/manojperi26',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1v7TS9Fo_nFJ7VyfObNFY9mfm7HWfxXb0',
  resumePreview: '/portfolio/resume.pdf',
  location: 'Phagwara, Punjab, India',
  university: 'Lovely Professional University, Punjab',
  degree: 'B.Tech in Computer Science Engineering - AI & Data Science',
  batch: '2024 - 2028'
};

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'Python & Core Languages',
    description: 'Strong foundation in core programming paradigms, object-oriented architecture, data structures, and relational database querying.',
    iconName: 'Terminal',
    category: 'languages',
    level: 'Advanced',
    technologies: ['Python', 'C++', 'Java', 'SQL']
  },
  {
    name: 'Machine Learning & Deep Learning',
    description: 'Designing, training, evaluating, and deploying neural architectures, deep learning models, and predictive algorithms.',
    iconName: 'Brain',
    category: 'ai-ml',
    level: 'Expert',
    technologies: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn']
  },
  {
    name: 'LLMs & Agentic AI',
    description: 'Architecting autonomous AI agents, fine-tuning foundation models, and crafting vector-embedded Retrieval-Augmented Generation (RAG) systems.',
    iconName: 'Bot',
    category: 'ai-ml',
    level: 'Advanced',
    technologies: ['LangChain', 'HuggingFace', 'RAG pipelines']
  },
  {
    name: 'Computer Vision',
    description: 'Implementing real-time computer vision algorithms, facial landmark detection, gesture estimation, and image preprocessing.',
    iconName: 'Eye',
    category: 'vision-analytics',
    level: 'Proficient',
    technologies: ['OpenCV', 'MediaPipe']
  },
  {
    name: 'Backend Development',
    description: 'Building performant asynchronous APIs, microservices, and interactive machine learning web applications.',
    iconName: 'Server',
    category: 'languages',
    level: 'Advanced',
    technologies: ['Flask', 'FastAPI', 'Streamlit']
  },
  {
    name: 'Data Analysis & BI',
    description: 'Transforming raw multi-source datasets into dynamic executive dashboards, automated reporting models, and actionable visual intelligence.',
    iconName: 'BarChart3',
    category: 'vision-analytics',
    level: 'Proficient',
    technologies: ['Power BI', 'Excel']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'veridoc-ai',
    title: 'VeriDoc AI',
    subtitle: 'Python, LangChain, Pinecone, BM25, Groq (Llama 3.3 70B), RAG',
    description: "Built an adaptive multi-document RAG system that answers questions strictly from uploaded documents (PDF, DOCX, PPTX, TXT) with page-level citations. Implemented a pipeline combining hybrid dense (Pinecone) and sparse (BM25) retrieval, an adaptive LLM query router, cross-encoder reranking, contextual compression, and conversation memory, using Groq's Llama 3.3 70B as the answer LLM.",
    image: '/portfolio/veridoc-banner.png',
    tags: ['Python', 'LangChain', 'Pinecone', 'BM25', 'Groq (Llama 3.3 70B)', 'RAG'],
    githubUrl: 'https://github.com/manojperi26/veri-doc',
    featured: true,
    deepDive: {
      architectureTagline: 'Hybrid Dense-Sparse RAG with Page-Level Citations',
      pipelineSteps: [
        {
          step: '01',
          title: 'Document Ingestion',
          description: 'Handles PDF, DOCX, PPTX, and TXT uploads.'
        },
        {
          step: '02',
          title: 'Hybrid Retrieval',
          description: 'Pinecone dense + BM25 sparse search.'
        },
        {
          step: '03',
          title: 'Query Routing & Reranking',
          description: 'Adaptive LLM router with cross-encoder reranking.'
        },
        {
          step: '04',
          title: 'Contextual Compression & Synthesis',
          description: "Groq's Llama 3.3 70B generates answers anchored to page-level citations with conversation memory."
        }
      ]
    }
  },
  {
    id: 'data-whisperer',
    title: 'Data Whisperer',
    subtitle: 'Python, Streamlit, LangChain, Groq (Llama 3.3 70B)',
    description: "Built a Streamlit-based CSV data-analysis agent using LangChain's ReAct framework, enabling natural-language querying with autonomous multi-step reasoning. Integrated Groq-hosted Llama 3.3 70B to interpret user queries and auto-generate charts/insights in real time, achieving 91% query interpretation accuracy across test datasets, deployed live via ngrok. Debugged agent iteration-limit failures and chart-rendering errors, improving end-to-end query reliability for consistent output.",
    image: '/portfolio/data-whisperer-banner.png',
    tags: ['Python', 'Streamlit', 'LangChain', 'Groq (Llama 3.3 70B)', 'ReAct Framework', 'ngrok'],
    githubUrl: 'https://github.com/manojperi26/data-whisper-manoj',
    featured: true,
    deepDive: {
      architectureTagline: 'Conversational CSV Analysis Agent with Autonomous Multi-Step Reasoning',
      pipelineSteps: [
        {
          step: '01',
          title: 'Natural Language Query Input',
          description: 'Interactive natural language interface built with Streamlit.'
        },
        {
          step: '02',
          title: 'Autonomous Reasoning',
          description: "Multi-step reasoning driven by LangChain's ReAct framework."
        },
        {
          step: '03',
          title: 'LLM Query Interpretation',
          description: 'Query intent and code generation via Groq-hosted Llama 3.3 70B.'
        },
        {
          step: '04',
          title: 'Real-Time Chart & Insight Generation',
          description: 'Instant visualization generation and output delivery, deployed via ngrok.'
        }
      ],
      quantitativeResults: [
        '91% query interpretation accuracy across test datasets'
      ],
      engineeringNotes: [
        'Debugged agent iteration-limit failures',
        'Fixed chart-rendering errors',
        'Improved end-to-end query reliability'
      ]
    }
  },
  {
    id: 'alzheimers-detection',
    title: "Alzheimer's Detection System",
    subtitle: 'Python, TensorFlow/Keras, VGG16, Streamlit',
    description: "Engineered a 4-class Alzheimer's MRI classifier for automated early-stage disease detection, leveraging VGG16 transfer learning with a two-phase training strategy. Preprocessed and augmented medical imaging data across all four disease stages, then deployed the model as an interactive Streamlit web app for real-time predictions. Achieved 97.89% classification accuracy across all four disease stages, validating the model's reliability for early-stage diagnosis support.",
    image: '/portfolio/alzheimers-banner.png',
    tags: ['Python', 'TensorFlow/Keras', 'VGG16', 'Streamlit', 'Medical Imaging', 'Transfer Learning'],
    githubUrl: 'https://github.com/manojperi26/Alzheimer',
    featured: true,
    deepDive: {
      architectureTagline: "4-Class Alzheimer's MRI Classifier via VGG16 Transfer Learning",
      pipelineSteps: [
        {
          step: '01',
          title: 'Data Preprocessing & Augmentation',
          description: 'Image normalization and augmentation across all four disease stages.'
        },
        {
          step: '02',
          title: 'VGG16 Transfer Learning',
          description: 'Transfer learning leveraging pretrained VGG16 base architecture.'
        },
        {
          step: '03',
          title: 'Two-Phase Training Strategy',
          description: 'Staged training with custom classification head fine-tuning.'
        },
        {
          step: '04',
          title: 'Interactive Web Deployment',
          description: 'Real-time prediction interface deployed as a Streamlit web app.'
        }
      ],
      quantitativeResults: [
        "97.89% classification accuracy across all four disease stages",
        "4-class classification"
      ]
    }
  },
  {
    id: 'walmart-sales',
    title: 'Walmart Sales Forecasting',
    subtitle: 'Python, Random Forest, Scikit-learn',
    description: "Investigated 6,435 retail records across 45 stores to uncover seasonal trends and economic factors driving weekly sales. Constructed a Random Forest regression model to generate 12-week sales forecasts, enabling data-driven inventory planning. Delivered 93% prediction accuracy (R² = 0.93) on weekly sales forecasts, supporting reliable demand planning decisions.",
    image: '/portfolio/walmart-banner.png',
    tags: ['Python', 'Random Forest', 'Scikit-learn', 'Time-Series Forecasting', 'EDA'],
    githubUrl: 'https://github.com/manojperi26/walmart-sales-prediction',
    featured: true,
    deepDive: {
      architectureTagline: 'Random Forest Regression for 12-Week Retail Sales Forecasting',
      pipelineSteps: [
        {
          step: '01',
          title: 'Data Investigation',
          description: 'Exploration and ingestion across 6,435 historical records and 45 retail stores.'
        },
        {
          step: '02',
          title: 'Exploratory Data Analysis (EDA)',
          description: 'Analysis of seasonality, holiday indicators, and macroeconomic drivers.'
        },
        {
          step: '03',
          title: 'Random Forest Regression Modeling',
          description: 'Multi-tree ensemble regression trained with Scikit-learn.'
        },
        {
          step: '04',
          title: 'Forecast Output & Application',
          description: '12-week sales projections utilized for data-driven inventory and demand planning.'
        }
      ],
      quantitativeResults: [
        '93% prediction accuracy (R² = 0.93)',
        '6,435 retail records across 45 stores'
      ]
    }
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-lpu-ai',
    title: 'AI Engineer Launchpad: Mastering LLMs and Agentic AI',
    issuer: 'Lovely Professional University',
    date: "Aug'26",
    image: '/portfolio/cert-lpu-ai-real.jpg',
    verifyUrl: 'https://drive.google.com/file/d/1ElClhINEGdYyO5hA7_hhA1ejfXxYoLxp/view',
    skillsAcquired: ['LLMs', 'Agentic AI', 'Prompt Engineering', 'LangChain']
  },
  {
    id: 'cert-drishti-cps',
    title: 'DRISHTI CPS — AI & Data Science Certification, IIT Indore',
    issuer: 'Intellipaat',
    date: "Jun'26",
    image: '/portfolio/cert-drishti-real.jpg',
    verifyUrl: 'https://drive.google.com/file/d/1CiSAti8uVJ45r80QqKObREYLJbf1ix4B/view?usp=sharing',
    skillsAcquired: ['AI & Data Science', 'Deep Learning', 'IIT Indore DRISHTI CPS', 'Machine Learning']
  },
  {
    id: 'cert-python',
    title: 'Python',
    issuer: 'Intellipaat',
    date: "Mar'26",
    image: '/portfolio/cert-python-real.jpg',
    verifyUrl: 'https://lms.intellipaat.com/certificate-link/?Yz1jdXMtOTEyMzgwJnU9Mjg4OTg5JmV4dD0x',
    skillsAcquired: ['Python', 'Data Structures', 'OOPs', 'Algorithms']
  },
  {
    id: 'cert-sql',
    title: 'SQL',
    issuer: 'Intellipaat',
    date: "Sep'25",
    image: '/portfolio/cert-sql-real.jpg',
    verifyUrl: 'https://lms.intellipaat.com/certificate-link/?Yz1jdXMtNTY5NDc1NyZ1PTI4ODk4OSZleHQ9MQ==',
    skillsAcquired: ['SQL', 'Relational Databases', 'Queries & Joins', 'Database Design']
  }
];

export const INTERNSHIPS_DATA: Internship[] = [
  {
    id: 'intern-1',
    role: 'Software Intern (AI)',
    company: 'Endeavour ERP Solutions India Pvt. Ltd., Hyderabad',
    period: 'June 2026 - August 2026 (2 months)',
    image: '/portfolio/endeavour.svg',
    description: 'Completed an AI internship focused on software development, working on real-world tasks and gaining hands-on industry experience.',
    skills: ['AI Development', 'Software Development', 'Python', 'Real-world Tasks', 'Industry Experience']
  },
  {
    id: 'intern-2',
    role: 'Data Scientist Intern',
    company: 'Intellipaat Software Solutions Pvt. Ltd.',
    period: 'November 2025 - April 2026 (6 months)',
    image: '/portfolio/intellipaat.svg',
    description: 'Worked as part of the DRISHTI CPS hands-on internship program with IIT Indore. Built ML/DL-based text and image AI applications in Python, covering data preprocessing, model training and evaluation, SQL, neural networks, and GenAI/prompting with GPT.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'GenAI & Prompting (GPT)', 'Neural Networks', 'SQL', 'Data Preprocessing', 'Model Evaluation']
  }
];

export const UNIVERSITY_DATA = {
  institution: 'Lovely Professional University',
  location: 'Phagwara, Punjab, India',
  degree: 'B.Tech in Computer Science Engineering - AI & Data Science',
  batch: '2024 - 2028',
  est: 'Est. 2005',
  stats: [
    { label: 'Campus Community', value: '30,000+ Students' },
    { label: 'Ranking', value: "Top Tier Indian University" },
    { label: 'Campus Area', value: '600+ Acres' },
    { label: 'Program', value: 'B.Tech CSE (AI & Data Science)' }
  ],
  description: "My journey at Lovely Professional University has been transformative, providing me with both academic excellence and practical experience in AI and Computer Science Engineering. The university's state-of-the-art facilities and curriculum have helped me develop a strong foundation in modern intelligent systems.",
  websiteUrl: 'https://www.lpu.in',
  campusImages: [
    { src: '/portfolio/college.jpeg', title: 'LPU Campus Main Building', desc: 'The iconic administrative and academic block' },
    { src: '/portfolio/lib.jpg', title: 'University Central Library', desc: 'Multi-storey knowledge repository with modern digital archives' },
    { src: '/portfolio/research.jpg', title: 'Research & Computing Labs', desc: 'Advanced infrastructure for cloud, AI, and hardware prototyping' },
    { src: '/portfolio/lpu1.jpg', title: 'Student Center & Green Quad', desc: 'Vibrant outdoor spaces hosting cultural festivals and hackathons' }
  ],
  academicPillars: [
    {
      title: 'Technical Knowledge',
      desc: 'Gained comprehensive understanding of computer engineering principles, programming languages, and distributed system design.'
    },
    {
      title: 'Teamwork & Leadership',
      desc: 'Developed strong collaboration skills through group projects, multi-disciplinary hackathons, and student organizations.'
    },
    {
      title: 'Industry Readiness',
      desc: 'Prepared for professional challenges through industry-focused curriculum, internships, live labs, and practical cloud deployments.'
    }
  ]
};
