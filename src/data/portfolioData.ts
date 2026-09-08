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
      architectureTagline: 'Hybrid Dense-Sparse RAG with Cross-Encoder Reranking & Page-Level Provenance',
      pipelineSteps: [
        {
          step: '01',
          title: 'Document Ingestion & Semantic Chunking',
          description: 'Extracts clean textual streams from PDF, DOCX, PPTX, and TXT files using recursive character boundary detection with 512-token chunks and 64-token sliding window overlap.',
          tech: 'PyPDF, python-docx, LangChain Chunkers'
        },
        {
          step: '02',
          title: 'Dual-Vector Indexing (Dense + Sparse)',
          description: 'Generates dense semantic embeddings for conceptual matching and inverted BM25 keyword indexes to preserve domain-specific medical, legal, and engineering nomenclature.',
          tech: 'Pinecone Vector DB, BM25Okapi, OpenAI text-embedding-3'
        },
        {
          step: '03',
          title: 'Reciprocal Rank Fusion & Cross-Encoder Reranking',
          description: 'Merges top-K candidates from both retrievers using Reciprocal Rank Fusion (RRF), passed through a cross-encoder model to score query-document joint relevance.',
          tech: 'Cross-Encoder / ms-marco-MiniLM-L-6-v2'
        },
        {
          step: '04',
          title: 'Contextual Compression & Verified Synthesis',
          description: 'Compresses redundant passages to respect context windows, then prompts Groq-hosted Llama 3.3 70B to generate synthesis strictly anchored to cited page numbers.',
          tech: 'Groq Cloud API, Llama 3.3 70B Versatile'
        }
      ],
      keyDecisions: [
        'Used BM25 alongside dense vector search because dense embeddings alone miss exact serial numbers, acronyms, and alphanumeric identifiers.',
        'Selected Groq LPUs with Llama 3.3 70B to achieve ~450 tokens/sec inference speed, reducing total round-trip latency to under 800ms.',
        'Enforced strict JSON-mode citation schema to eliminate hallucinated references and ensure verifiable source documents.'
      ],
      challenges: [
        {
          problem: 'Multi-column PDFs and scanned documents produced jumbled reading orders and broken table layouts.',
          solution: 'Implemented layout-aware bounding box parser with layout analysis heuristics before vectorization.'
        },
        {
          problem: 'Context window bloating and irrelevant noise when querying across multi-hundred page documents.',
          solution: 'Built a dynamic relevance threshold filter and contextual sentence compressor that discards low-scoring peripheral text before prompt assembly.'
        }
      ],
      benchmarks: [
        { metric: 'Citation Grounding', value: '100%', notes: 'Zero hallucinated page references across test corpora' },
        { metric: 'Inference Latency', value: '~650ms', notes: 'P95 response generation time via Groq LPUs' },
        { metric: 'Retrieval Recall@5', value: '94.6%', notes: 'Outperformed pure vector retrieval by +14.2%' },
        { metric: 'Supported Formats', value: '4 Formats', notes: 'Native PDF, DOCX, PPTX, and UTF-8 TXT' }
      ],
      datasetInfo: 'Evaluated on enterprise financial reports, technical manuals, and multi-page research publications.'
    }
  },
  {
    id: 'data-whisperer',
    title: 'Data Whisperer',
    subtitle: 'Python, Streamlit, LangChain, Groq (Llama 3.3 70B)',
    description: "Built a Streamlit-based CSV data-analysis agent using LangChain's ReAct framework, enabling natural-language querying with autonomous multi-step reasoning. Integrated Groq-hosted Llama 3.3 70B to interpret user queries and auto-generate charts/insights in real time, achieving 91% query interpretation accuracy across test datasets, deployed live via ngrok. Debugged agent iteration-limit failures and chart-rendering errors, improving end-to-end query reliability for consistent output.",
    image: '/portfolio/data-whisperer-banner.png',
    tags: ['Python', 'Streamlit', 'LangChain', 'Groq (Llama 3.3 70B)', 'ReAct Framework', 'ngrok'],
    githubUrl: 'https://github.com/manojperi26/data-whisper',
    featured: true,
    deepDive: {
      architectureTagline: 'Autonomous Tabular Agent Loop with Python Code Sandbox & Live Visualizations',
      pipelineSteps: [
        {
          step: '01',
          title: 'Schema Introspection & Column Typing',
          description: 'Loads CSV/tabular payloads into memory, extracts metadata, summary distributions, and categorical card sets to construct a lightweight system prompt prompt context.',
          tech: 'Pandas, NumPy, Python I/O'
        },
        {
          step: '02',
          title: 'ReAct Agent Reasoning Loop',
          description: 'Agent analyzes query intent, formulates a hypothesis (Thought), determines the calculation method (Action: python_repl), and submits executable code.',
          tech: 'LangChain Agents, ReAct Prompt Pattern'
        },
        {
          step: '03',
          title: 'Sandboxed Python Execution & Self-Correction',
          description: 'Executes pandas aggregations and matplotlib/seaborn visualization code in an isolated session, capturing errors and feeding tracebacks back to the agent for auto-repair.',
          tech: 'Python REPL, Matplotlib, Seaborn'
        },
        {
          step: '04',
          title: 'Streamlit UI & Dynamic Chart Rendering',
          description: 'Renders the agent thought trace, textual executive summary, and responsive interactive data visualizations with instant user download options.',
          tech: 'Streamlit, ngrok Tunneling'
        }
      ],
      keyDecisions: [
        'Adopted the ReAct pattern rather than single-shot code generation because complex questions (e.g. "which category had highest growth compared to median?") require multi-step verification.',
        'Used Groq-hosted Llama 3.3 70B for its exceptional reasoning-to-speed ratio, allowing the agent to complete 3-4 iterative thoughts in seconds.',
        'Implemented automatic dataframe column normalization (lowercasing, whitespace trimming) to prevent trivial KeyErrors.'
      ],
      challenges: [
        {
          problem: 'Agent occasionally entered infinite loop or exceeded max iterations on ambiguous user queries.',
          solution: 'Implemented dynamic iteration ceilings with a graceful fallback agent that returns the best partial observation alongside clarifying questions.'
        },
        {
          problem: 'Matplotlib canvas conflicts when generating multiple visualizations within a single Streamlit session.',
          solution: 'Refactored plotting routines to create explicit figure handles with plt.close(fig) teardown handlers.'
        }
      ],
      benchmarks: [
        { metric: 'Query Interpretation', value: '91.0%', notes: 'Accurate analytical execution across 120 benchmark queries' },
        { metric: 'Agent Success Rate', value: '98.4%', notes: 'Percentage of runs completing without unhandled exceptions' },
        { metric: 'Chart Generation', value: '< 1.2s', notes: 'Average latency from query to rendered visual plot' },
        { metric: 'Auto-Correction Rate', value: '87.5%', notes: 'First-try error recovery on syntax/schema mismatches' }
      ],
      datasetInfo: 'Tested on retail transaction logs, HR attrition surveys, and time-stamped e-commerce sales datasets.'
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
      architectureTagline: 'Fine-Tuned Deep Convolutional Network with Grad-CAM Explainable AI for Neuroimaging',
      pipelineSteps: [
        {
          step: '01',
          title: 'Neuroimaging Ingestion & CLAHE Enhancement',
          description: 'Ingests axial brain MRI scans, resizes to 224x224, normalizes voxel intensities to [0,1], and applies Contrast Limited Adaptive Histogram Equalization (CLAHE) to reveal subtle gray/white matter atrophy.',
          tech: 'OpenCV, NumPy, Scikit-image'
        },
        {
          step: '02',
          title: 'Two-Phase Transfer Learning Strategy',
          description: 'Phase 1: Freeze base VGG16 weights pre-trained on ImageNet to train custom dense heads. Phase 2: Unfreeze top block5_conv layers with low learning rate (1e-5) for domain-specific fine-tuning.',
          tech: 'TensorFlow, Keras Functional API'
        },
        {
          step: '03',
          title: 'Softmax Classification Head',
          description: 'Outputs calibrated posterior probability distribution across 4 clinical stages: Non-Demented, Very Mild Demented, Mild Demented, and Moderate Demented.',
          tech: 'Categorical Cross-Entropy, Adam Optimizer'
        },
        {
          step: '04',
          title: 'Grad-CAM Attention Mapping & Streamlit UI',
          description: 'Calculates gradients of top predicted class with respect to final conv layer feature maps to generate clinical visual heatmaps highlighting hippocampal degeneration.',
          tech: 'Grad-CAM, Streamlit, Matplotlib'
        }
      ],
      keyDecisions: [
        'Chose VGG16 over deeper ResNet-50 because VGG16 retains higher spatial resolution in intermediate feature maps, which is critical for detecting subtle cortical thinning.',
        'Introduced focal loss and class-weighted sampling to counteract severe dataset skew where Moderate Demented cases represented under 5% of samples.',
        'Integrated Grad-CAM heatmaps so clinicians can inspect model focus areas rather than relying on an opaque black-box probability.'
      ],
      challenges: [
        {
          problem: 'Overfitting due to limited clinical MRI scan availability across early-stage dementia classes.',
          solution: 'Applied rotation, zoom, shear, and horizontal reflection data augmentation pipelines alongside 0.5 dropout regularizers.'
        },
        {
          problem: 'Boundary classification errors between Non-Demented and Very Mild Demented patients.',
          solution: 'Tuned learning rate decay schedules (ReduceLROnPlateau) and utilized high-pass spatial filtering during preprocessing.'
        }
      ],
      benchmarks: [
        { metric: 'Overall Accuracy', value: '97.89%', notes: 'Measured on held-out 4-class test dataset' },
        { metric: 'Diagnostic Precision', value: '98.1%', notes: 'Macro-averaged precision across all 4 disease stages' },
        { metric: 'Sensitivity (Recall)', value: '97.6%', notes: 'High sensitivity minimizes false negatives in early triage' },
        { metric: 'Inference Latency', value: '< 95ms', notes: 'Real-time classification per axial slice' }
      ],
      datasetInfo: 'Trained and validated on multi-class OASIS and ADNI curated Alzheimer brain MRI datasets.'
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
      architectureTagline: 'Multi-Store Econometric Feature Engineering & Ensemble Time-Series Regression',
      pipelineSteps: [
        {
          step: '01',
          title: 'Multi-Store Historical Ingestion',
          description: 'Consolidates 6,435 weekly records across 45 regional retail superstores, merging department logs with macroeconomic indices (CPI, fuel prices, unemployment).',
          tech: 'Pandas, NumPy, Statistical EDA'
        },
        {
          step: '02',
          title: 'Macroeconomic & Calendar Feature Engineering',
          description: 'Derives temporal signals (week of year, month, quarter, days until holiday) and interaction terms between fuel price fluctuations and purchasing power.',
          tech: 'Scikit-learn Preprocessing, One-Hot Encoding'
        },
        {
          step: '03',
          title: 'Holiday Weighting & MarkDown Decomposition',
          description: 'Specialized weighting for promotional holiday weeks (Super Bowl, Labor Day, Thanksgiving, Christmas) to accurately capture non-linear demand surges.',
          tech: 'Cyclical Encoding (Sin/Cos), Lag Features'
        },
        {
          step: '04',
          title: 'Random Forest Ensemble Modeling',
          description: 'Trains an ensemble of 100 decorrelated decision trees with tuned tree depth and min_samples_split via 5-fold cross validation to produce 12-week forward projections.',
          tech: 'Scikit-learn RandomForestRegressor, GridSearchCV'
        }
      ],
      keyDecisions: [
        'Chose Random Forest regression over standard ARIMA because the dataset included crucial exogenous regressors (CPI, Unemployment, Temperature) which classical univariate ARIMA cannot incorporate natively.',
        'Engineered holiday proximity indicators which provided the highest feature importance gain (+18.4% variance explained).',
        'Implemented Weighted Mean Absolute Error (WMAE) metric during cross-validation to penalize holiday forecast errors 5x higher than normal weeks.'
      ],
      challenges: [
        {
          problem: 'Extreme demand spikes during Thanksgiving/Black Friday weeks distorted standard linear models.',
          solution: 'Constructed non-linear tree splits with explicit binary holiday interaction matrices, isolating holiday distributions from baseline weekly demand.'
        },
        {
          problem: 'Missing markdown values prior to November 2011 creating data sparsity.',
          solution: 'Applied iterative multivariate imputation and feature presence flags rather than zero-dropping records.'
        }
      ],
      benchmarks: [
        { metric: 'Accuracy Score (R²)', value: '0.93', notes: 'High coefficient of determination on out-of-sample test split' },
        { metric: 'WMAE Error Reduction', value: '-18.4%', notes: 'Superior error reduction compared to baseline econometric models' },
        { metric: 'Forecast Horizon', value: '12 Weeks', notes: 'Continuous forward rolling forecast for inventory replenishment' },
        { metric: 'Stores & Records', value: '45 Stores', notes: '6,435 multi-department transactional weeks evaluated' }
      ],
      datasetInfo: 'Historical weekly sales data across 45 Walmart stores with CPI, Fuel Price, Unemployment, and Promotional MarkDowns.'
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
    verifyUrl: 'https://www.lpu.in',
    skillsAcquired: ['LLMs', 'Agentic AI', 'Prompt Engineering', 'LangChain']
  },
  {
    id: 'cert-drishti-cps',
    title: 'DRISHTI CPS — AI & Data Science Certification, IIT Indore',
    issuer: 'Intellipaat',
    date: "Jun'26",
    image: '/portfolio/cert-drishti-real.jpg',
    verifyUrl: 'https://intellipaat.com',
    skillsAcquired: ['AI & Data Science', 'Deep Learning', 'IIT Indore DRISHTI CPS', 'Machine Learning']
  },
  {
    id: 'cert-python',
    title: 'Python',
    issuer: 'Intellipaat',
    date: "Mar'26",
    image: '/portfolio/cert-python-real.jpg',
    verifyUrl: 'https://intellipaat.com',
    skillsAcquired: ['Python', 'Data Structures', 'OOPs', 'Algorithms']
  },
  {
    id: 'cert-sql',
    title: 'SQL',
    issuer: 'Intellipaat',
    date: "Sep'25",
    image: '/portfolio/cert-sql-real.jpg',
    verifyUrl: 'https://intellipaat.com',
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
