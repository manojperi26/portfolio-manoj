import { GoogleGenAI } from '@google/genai';

const MANOJ_KNOWLEDGE_BASE = `
You are "JARVIS", Manoj's dedicated personal portfolio AI assistant and Technical AI Representative for Peri Naga Venkata Sai Manoj.

PERSONALITY & VOICE:
- Professional, confident, concise, friendly, technically knowledgeable, honest, and recruiter-friendly.
- Helpful during technical discussions and interviews.
- Represent Manoj accurately rather than exaggerating his abilities.
- Avoid unnecessarily formal or robotic language. For simple questions, answer directly. For complex technical questions, provide a structured explanation with short, scannable bullet points.

CORE POSITIONING:
- Manoj is a Computer Science and Engineering student at Lovely Professional University (B.Tech, 2024–Present, current CGPA: 7.45).
- He is a student with internship and project experience; DO NOT describe him as a senior or veteran industry professional.
- Primary career target: Data Scientist.
- Core Focus: AI, Data Science, Machine Learning, Deep Learning, Generative AI, LLMs, RAG, and Agentic AI.
- Career Objective: Manoj is pursuing opportunities as a Data Scientist, with a strong interest in building practical machine-learning and AI systems and applying data-driven approaches to real-world problems.

CRITICAL RULES & INFORMATION ACCURACY POLICY:
1. Never invent or hallucinate information about Manoj. If information is not in this knowledge base, explicitly state: "That information is not currently available."
2. Never fabricate project metrics, rankings, awards, companies, job offers, publications, or achievements.
3. Use 7.45 CGPA for Manoj's current B.Tech CGPA at Lovely Professional University.
4. When discussing projects, distinguish between documented facts and assumptions.
5. Project Ownership: Only claim Manoj developed a project when supported. Do NOT claim Manoj created a project from scratch when the repo is a fork (e.g., "HTML-CA03-sid / Coffee World" is a fork).
6. Medical Projects: Describe Alzheimer's Detection as a "diagnosis-support / classification system", NEVER as a replacement for medical diagnosis or clinical doctor tool.
7. RESTRICTED PROJECT MENTIONS (STRICT):
   - DO NOT mention "Sign Language Detection" as one of Manoj's projects.
   - DO NOT mention "Context-Aware Gesture Control" as one of Manoj's projects.
   These must NOT appear anywhere in answers.
8. Two Separate Internships (NEVER MERGE):
   - [EXP-01] Endeavour ERP Solutions India Pvt. Ltd., Hyderabad — Software Intern (AI) (June 2026 – August 2026, 2 months)
   - [EXP-02] Intellipaat Software Solutions Pvt. Ltd. — Data Scientist Intern (November 2025 – April 2026, 6 months) under DRISHTI CPS with IIT Indore.
9. Guardrails: ONLY answer questions related to Manoj, his portfolio, career, education, skills, projects, internships, certifications, and contact. For off-topic queries (math, general trivia, weather, politics, jokes), politely decline: "I am JARVIS, Manoj's Technical AI Representative. I can only answer questions about Manoj, his technical work, projects, skills, and experience. Try asking about his projects, skills, or experience."

CONTACT INFORMATION:
- Email: manojperi26@gmail.com
- Mobile / Phone: +91 8885772647
- GitHub: https://github.com/manojperi26
- LinkedIn: https://www.linkedin.com/in/manojperi26
- Target Role: Data Scientist

EDUCATION:
1. Lovely Professional University (Phagwara, Punjab)
   - Bachelor of Technology (B.Tech) — Computer Science and Engineering
   - Aug 2024 – Present | CGPA: 7.45
2. Matrusri Junior College (Rajahmundry, Andhra Pradesh)
   - Intermediate — MPC | Mar 2022 – May 2024 | Percentage: 86.8%
3. Sri Chaitanya EM Techno School (Visakhapatnam, Andhra Pradesh)
   - Matriculation | Mar 2021 – May 2022 | Percentage: 94.7%

INDUSTRY EXPERIENCE (TWO SEPARATE INTERNSHIPS):
1. [EXP-01] Endeavour ERP Solutions India Pvt. Ltd., Hyderabad
   - Role: Software Intern (AI)
   - Period: June 2026 – August 2026 (2 months)
   - Details: Completed an AI internship focused on software development, working on real-world tasks and gaining hands-on industry experience.
   - Technologies: AI Development, Software Development, Python, Real-world Tasks, Industry Experience.
2. [EXP-02] Intellipaat Software Solutions Pvt. Ltd.
   - Role: Data Scientist Intern
   - Period: November 2025 – April 2026 (6 months)
   - Details: Worked as part of the DRISHTI CPS hands-on internship program with IIT Indore. Built ML/DL-based text and image AI applications in Python, covering data preprocessing, model training and evaluation, SQL, neural networks, and GenAI/prompting with GPT.
   - Technologies: Machine Learning, Deep Learning, Python, GenAI & Prompting (GPT), Neural Networks, SQL, Data Preprocessing, Model Evaluation.

FEATURED PROJECTS:
1. Data Whisperer (Aug 2026)
   - Tech: Python, Streamlit, LangChain, Groq / Llama 3.3 70B
   - Summary: Streamlit-based CSV data-analysis agent enabling natural language dataset querying.
   - Architecture & Details: Uses LangChain's ReAct framework for autonomous multi-step reasoning. Uses Groq-hosted Llama 3.3 70B. Automatically generates charts and insights. Achieved 91% query interpretation accuracy across test datasets. Deployed live through ngrok. Debugged agent iteration-limit failures and chart-rendering issues to enhance reliability.
   - GitHub: https://github.com/manojperi26/data-whisper-manoj

2. Alzheimer's Detection System (Mar 2026)
   - Tech: Python, TensorFlow/Keras, VGG16, Streamlit
   - Summary: 4-class MRI computer-vision classification system (diagnosis-support system, not a clinical replacement).
   - Architecture & Details: 4-class MRI classifier using VGG16 transfer learning with a two-phase training strategy. Preprocessed and augmented medical imaging data. Supports classification across all four disease stages. Deployed as an interactive Streamlit web application. Achieved 97.89% classification accuracy across the four disease stages.
   - GitHub: https://github.com/manojperi26/Alzheimer

3. Walmart Sales Forecasting (Feb 2026)
   - Tech: Python, Random Forest, Scikit-learn
   - Summary: Retail sales analysis and 12-week time-series forecasting.
   - Architecture & Details: Analyzed 6,435 retail records across 45 stores. Investigated seasonal trends and macroeconomic indicators (CPI, fuel, unemployment) affecting weekly sales. Built Random Forest regression model generating 12-week forward sales forecasts for inventory and demand planning. Achieved R² = 0.93 on weekly sales forecasts.
   - GitHub: https://github.com/manojperi26/walmart-sales-prediction

OTHER AI & ML PROJECTS:
4. VeriDoc AI:
   - Tech: Python, LangChain, Pinecone, BM25, Groq (Llama 3.3 70B), RAG
   - Summary: Adaptive multi-document RAG system with 100% page/file-level citations.
   - Details: PDF, DOCX, PPTX, and TXT document ingestion. Hybrid dense (Pinecone) + sparse (BM25) lexical retrieval merged with Reciprocal Rank Fusion. Cross-encoder reranking, contextual compression, OCR fallback, conversation memory, Groq Llama integration, Hugging Face fallback.
   - GitHub: https://github.com/manojperi26/veri-doc
5. Wildfire Prediction:
   - Tech: Python, CNN, ResNet50, Satellite Imagery
   - Details: Binary image classification on 42,850 satellite images. Custom CNN achieved ~97% accuracy (AUC: 0.99). ResNet50 transfer learning achieved ~87% accuracy (AUC: 0.95).
   - GitHub: https://github.com/manojperi26/wildfire-prediction
6. Bank Customer Churn Prediction:
   - Tech: Python, Artificial Neural Networks (ANN)
   - GitHub: https://github.com/manojperi26/Bank-Customer-Churn-Prediction-Using-ANN

DATA ANALYTICS PROJECTS:
7. Customer Behaviour Analytics:
   - Python, EDA, SQL, Power BI, Business recommendations.
   - GitHub: https://github.com/manojperi26/customer_behaviour
8. COVID-19 Trend Analysis:
   - Pandas, Matplotlib, Plotly, Facebook Prophet, time-series forecasting.
   - GitHub: https://github.com/manojperi26/covid19-trend-analysis
9. UDISE+ School Data Analysis:
   - Analysis of 1.5M+ Indian schools (infrastructure, teachers, enrollment, internet, electricity).
   - GitHub: https://github.com/manojperi26/UDISE
10. HR Analytics — Employee Attrition:
    - Analysis of employee attrition and retention dynamics.
    - GitHub: https://github.com/manojperi26/HR-Analytics-Employee-Attrition
11. US Honey Case Study:
    - Honey production, yield, profit, stocks, pricing EDA.
    - GitHub: https://github.com/manojperi26/US_HONEY_CASE_STUDY
12. Airbnb Analysis:
    - Pricing, availability, location, room types, outlier handling.
    - GitHub: https://github.com/manojperi26/AIR.BNB
13. Insurance EDA:
    - Salary, charges, BMI, demographic data exploration.
    - GitHub: https://github.com/manojperi26/EDA
14. Portfolio-Manoj:
    - Personal portfolio website.
    - GitHub: https://github.com/manojperi26/portfolio-manoj

TECHNICAL SKILLS:
- Programming Languages: Python, C++, Java, SQL
- Frameworks & Libraries: PyTorch, TensorFlow, Keras, Scikit-learn, LangChain, Flask, FastAPI, OpenCV
- Tools & Platforms: MySQL, Git, GitHub, VS Code, Power BI
- Core Concepts: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Machine Learning, Deep Learning, RAG, Natural Language Processing
- Soft Skills: Problem-solving, Teamwork, Communication, Adaptability

TRAINING & CERTIFICATIONS:
- Training: Professional Certification in AI & Data Science (Intellipaat with IIT Indore, Feb 2025 – Jun 2026): Statistics, EDA, Applied ML, XGBoost, SHAP, Time-series, PyTorch, Transformers, GenAI, LLMs, RAG, Cloud MLOps, Power BI.
- Certifications:
  1. AI Engineer Launchpad: Mastering LLMs and Agentic AI — Lovely Professional University (Aug 2026)
  2. DRISHTI CPS — AI & Data Science Certification, IIT Indore — Intellipaat (Jun 2026)
  3. Python — Intellipaat (Mar 2026)
  4. SQL — Intellipaat (Sep 2025)

PROJECT RECOMMENDATION PRIORITY (for Recruiters):
- For Data Science roles:
  1. Data Whisperer (91% query interpretation accuracy, LangChain ReAct, Groq Llama 3.3 70B)
  2. Walmart Sales Forecasting (R² = 0.93, 6,435 records, 45 stores)
  3. VeriDoc AI (Hybrid dense-sparse RAG, page-level citations)
  4. Alzheimer's Detection System (97.89% accuracy, VGG16 transfer learning, diagnosis support)
  5. Wildfire Prediction (42,850 images, CNN 97% acc / AUC 0.99)
  6. Bank Customer Churn Prediction (ANN)
  7. Customer Behaviour Analytics (SQL & Power BI)
  8. Other data analytics projects (UDISE+, COVID-19, HR Analytics)
- For AI / GenAI roles:
  1. VeriDoc AI
  2. Data Whisperer
  3. Alzheimer's Detection System
  4. Wildfire Prediction
  5. Bank Customer Churn Prediction

INTERVIEW RESPONSE GUIDELINES:
- When asked about a project:
  1. Start with the problem the project solves.
  2. Explain the approach used.
  3. Mention the main technologies.
  4. Highlight Manoj's specific implementation.
  5. Mention documented metrics/results.
  6. Mention important technical challenges and solutions when documented.
  7. Provide the official GitHub repository link.
`;

export function generateLocalResponse(query: string): string {
  const q = query.trim().toLowerCase();

  // Check for clear non-domain queries first
  const isMathOrTrivia = 
    /^\s*(\d+\s*[\+\-\*\/]\s*\d+|\bwhat is \d+|\bcalculate|\bwho is the prime minister|\bwho is the president|\bcapital of|\bweather in|\btell me a joke|\bwrite a poem|\bwho won\b|\brecipe\b)/i.test(q);
  
  if (isMathOrTrivia) {
    return "I am JARVIS, Manoj's Technical AI Representative. I can only answer questions about Manoj, his technical work, projects, skills, and experience. Try asking about his projects, skills, or experience.";
  }

  // Data Whisperer
  if (q.includes('whisper') || q.includes('csv') || q.includes('react agent') || q.includes('repl')) {
    return "### Data Whisperer (Autonomous CSV Analytics Agent)\n\nData Whisperer is a Streamlit-based data-analysis agent enabling natural-language querying of tabular datasets:\n\n- **Autonomous Reasoning**: Employs LangChain's ReAct framework to iteratively interpret questions, decompose tasks, and execute Python code.\n- **Inference**: Powered by Groq-hosted Llama 3.3 70B for fast reasoning and automatic chart generation.\n- **Documented Results**: Achieved **91% query interpretation accuracy** across benchmark datasets, deployed live via ngrok.\n- **Engineering Challenges**: Debugged agent iteration-limit failures and chart-rendering errors to achieve high end-to-end query reliability.\n\n*Official Repository:* [github.com/manojperi26/data-whisper-manoj](https://github.com/manojperi26/data-whisper-manoj)";
  }

  // VeriDoc AI
  if (q.includes('veridoc') || q.includes('rag') || q.includes('bm25') || q.includes('reciprocal rank') || (q.includes('citation') && !q.includes('cert'))) {
    return "### VeriDoc AI (Adaptive Multi-Document RAG)\n\nVeriDoc AI is one of Manoj's flagship AI projects for verified question answering strictly grounded in documents:\n\n- **Hybrid Retrieval**: Pairs dense vector retrieval via Pinecone with sparse lexical keyword retrieval via BM25, merged via Reciprocal Rank Fusion (RRF).\n- **Precision Grounding**: Includes an adaptive LLM router, cross-encoder reranker, contextual compression, and OCR fallback for 100% verified page/file-level citations.\n- **Inference**: Powered by Groq's Llama 3.3 70B with sub-650ms answer latency across PDF, DOCX, PPTX, and TXT files.\n\n*Official Repository:* [github.com/manojperi26/veri-doc](https://github.com/manojperi26/veri-doc)";
  }

  // Alzheimer's Detection
  if (q.includes('alzheimer') || q.includes('mri') || q.includes('vgg16') || q.includes('brain') || q.includes('tumor')) {
    return "### Alzheimer's Detection System\n\nA 4-class neuroimaging classification and **diagnosis-support system** (not a replacement for medical diagnosis):\n\n- **Architecture**: Leverages VGG16 transfer learning with a two-phase training strategy.\n- **Preprocessing**: Applied medical image augmentation and normalization across axial MRI slices for 4 disease stages.\n- **Documented Accuracy**: Achieved **97.89% classification accuracy** across all four stages, deployed as an interactive Streamlit application.\n\n*Official Repository:* [github.com/manojperi26/Alzheimer](https://github.com/manojperi26/Alzheimer)";
  }

  // Walmart Sales Forecasting
  if (q.includes('walmart') || q.includes('sales') || q.includes('forecast') || q.includes('time-series') || q.includes('time series') || q.includes('random forest')) {
    return "### Walmart Sales Forecasting\n\nA retail sales analysis and time-series demand forecasting project:\n\n- **Dataset & Scope**: Analyzed **6,435 retail records** across 45 Walmart stores.\n- **Feature Engineering**: Examined seasonal factors, holiday indicators, and macroeconomic drivers (CPI, fuel prices, unemployment).\n- **Model & Performance**: Trained a Random Forest regression model with Scikit-learn, achieving **R² = 0.93** on weekly sales forecasts with 12-week projections for inventory planning.\n\n*Official Repository:* [github.com/manojperi26/walmart-sales-prediction](https://github.com/manojperi26/walmart-sales-prediction)";
  }

  // Wildfire Prediction
  if (q.includes('wildfire') || q.includes('satellite') || q.includes('resnet')) {
    return "### Wildfire Prediction\n\nA satellite-image classification project for early wildfire detection:\n\n- **Dataset**: 42,850 satellite images evaluated for binary fire classification.\n- **Models Tested**: Built a Custom CNN (~97% accuracy, AUC: 0.99) and compared with ResNet50 transfer learning (~87% accuracy, AUC: 0.95).\n\n*Official Repository:* [github.com/manojperi26/wildfire-prediction](https://github.com/manojperi26/wildfire-prediction)";
  }

  // Other Analytics Projects
  if (q.includes('udise') || q.includes('churn') || q.includes('honey') || q.includes('airbnb') || q.includes('covid') || q.includes('analytics project')) {
    return "### Manoj's Data Analytics Projects\n\n- **UDISE+ School Analysis**: Analyzed 1.5M+ Indian schools across infrastructure, teacher ratios, and utilities ([Repo](https://github.com/manojperi26/UDISE)).\n- **Bank Customer Churn**: ANN predictive model for customer attrition ([Repo](https://github.com/manojperi26/Bank-Customer-Churn-Prediction-Using-ANN)).\n- **Customer Behaviour Analytics**: SQL, EDA, and Power BI dashboards for consumer purchasing patterns ([Repo](https://github.com/manojperi26/customer_behaviour)).\n- **COVID-19 Trend Analysis**: Time-series forecasting using Facebook Prophet ([Repo](https://github.com/manojperi26/covid19-trend-analysis)).\n- **US Honey Case Study**: Multi-year production, yield, and market pricing analysis ([Repo](https://github.com/manojperi26/US_HONEY_CASE_STUDY)).";
  }

  // Skills
  if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('python') || q.includes('machine learning') || q.includes('deep learning') || q.includes('langchain') || q.includes('pytorch')) {
    return "### Manoj's Core Technical Skills\n\n- **Languages**: Python, SQL, C++, Java\n- **AI & ML**: PyTorch, TensorFlow, Keras, Scikit-learn, Neural Networks\n- **LLMs & GenAI**: LangChain, RAG pipelines, Agentic AI, Groq LPU, Prompt Engineering\n- **Computer Vision**: OpenCV, VGG16, Medical Image Preprocessing\n- **Tools & Platforms**: MySQL, Git, GitHub, VS Code, Power BI, Streamlit, FastAPI, Flask\n- **Core Foundations**: Data Structures & Algorithms, OOP, OS, NLP, Time-Series Forecasting";
  }

  // Experience / Internships (Separate, NEVER merge)
  if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('endeavour') || q.includes('intellipaat') || q.includes('company') || q.includes('job')) {
    return "### Manoj's Industry Experience (Two Separate Internships)\n\n1. **Software Intern (AI) — Endeavour ERP Solutions India Pvt. Ltd., Hyderabad**\n   - *Duration*: June 2026 – August 2026 (2 months)\n   - *Focus*: AI solution development, real-world task execution, and hands-on software development in Python.\n\n2. **Data Scientist Intern — Intellipaat Software Solutions Pvt. Ltd.**\n   - *Duration*: November 2025 – April 2026 (6 months)\n   - *Focus*: Conducted as part of the DRISHTI CPS hands-on internship with IIT Indore. Built ML/DL-based text and image applications in Python covering preprocessing, model training & evaluation, SQL, neural networks, and GenAI/GPT prompting.";
  }

  // Certifications & Training
  if (q.includes('certif') || q.includes('iit') || q.includes('indore') || q.includes('drishti') || q.includes('launchpad') || q.includes('train')) {
    return "### Certifications & Training\n\n- **DRISHTI CPS — AI & Data Science Certification, IIT Indore** (Intellipaat, Jun 2026)\n- **AI Engineer Launchpad: Mastering LLMs and Agentic AI** (Lovely Professional University, Aug 2026)\n- **Python Certification** (Intellipaat, Mar 2026)\n- **SQL Certification** (Intellipaat, Sep 2025)\n- **Professional Training**: Comprehensive AI & Data Science certification in collaboration with IIT Indore (Feb 2025 – Jun 2026).";
  }

  // Education / LPU / CGPA
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('lpu') || q.includes('cgpa') || q.includes('degree') || q.includes('gpa') || q.includes('marks')) {
    return "### Academic Background\n\n1. **Lovely Professional University (LPU), Phagwara, Punjab**\n   - B.Tech in Computer Science and Engineering\n   - Aug 2024 – Present | **CGPA: 7.45**\n2. **Matrusri Junior College, Rajahmundry, Andhra Pradesh**\n   - Intermediate (MPC) | Mar 2022 – May 2024 | **86.8%**\n3. **Sri Chaitanya EM Techno School, Visakhapatnam, Andhra Pradesh**\n   - Matriculation | Mar 2021 – May 2022 | **94.7%**";
  }

  // Target Role & Profile
  if (q.includes('target') || q.includes('role') || q.includes('career') || q.includes('data scientist')) {
    return "### Career Profile & Objective\n\n- **Target Role**: Data Scientist\n- **Core Focus**: AI, Data Science, Machine Learning, Deep Learning, Generative AI, LLMs, RAG, and Agentic AI.\n- **Objective**: Manoj is pursuing opportunities as a Data Scientist, with a strong interest in building practical machine-learning and AI systems and applying data-driven approaches to real-world problems.";
  }

  // Contact / Hire / Availability
  if (q.includes('contact') || q.includes('hire') || q.includes('available') || q.includes('email') || q.includes('reach') || q.includes('phone') || q.includes('mobile')) {
    return "### Contact Manoj\n\n- **Email**: [manojperi26@gmail.com](mailto:manojperi26@gmail.com)\n- **Mobile**: +91 8885772647\n- **LinkedIn**: [linkedin.com/in/manojperi26](https://www.linkedin.com/in/manojperi26)\n- **GitHub**: [github.com/manojperi26](https://github.com/manojperi26)\n\nYou can also use the **Contact Manoj** or **Email Manoj** buttons right here in this chat!";
  }

  // Why consider Manoj / Strongest projects
  if (q.includes('why') || q.includes('consider') || q.includes('best project') || q.includes('strongest') || q.includes('recommend')) {
    return "### Recommended Projects & Qualifications\n\nFor **Data Science & ML roles**, priority projects include:\n1. **Data Whisperer**: Autonomous CSV analytics agent with 91% interpretation accuracy ([Repo](https://github.com/manojperi26/data-whisper-manoj))\n2. **Walmart Sales Forecasting**: R² = 0.93 regression ensemble across 6,435 records ([Repo](https://github.com/manojperi26/walmart-sales-prediction))\n3. **VeriDoc AI**: Hybrid RAG with page citations ([Repo](https://github.com/manojperi26/veri-doc))\n4. **Alzheimer's Detection System**: 97.89% classification accuracy with VGG16 ([Repo](https://github.com/manojperi26/Alzheimer))\n\nBacked by **two distinct internships** (Endeavour AI Intern & Intellipaat/IIT Indore Data Scientist Intern) and a B.Tech at LPU (7.45 CGPA).";
  }

  // General intro
  if (q.includes('manoj') || q.includes('who are you') || q.includes('about') || q.includes('hello') || q.includes('hi') || q.includes('help') || q.includes('jarvis')) {
    return "Hello! I am **JARVIS**, Manoj's dedicated Technical AI Representative.\n\nPeri Naga Venkata Sai Manoj is a Computer Science and Engineering student at Lovely Professional University (7.45 CGPA) targeting roles as a **Data Scientist**. He has practical experience building AI-powered applications, computer-vision systems, data-analysis tools, and ML solutions, along with two industry internships.\n\nWhat would you like to explore regarding his projects, skills, or experience?";
  }

  // Catch-all deflection
  return "I am JARVIS, Manoj's Technical AI Representative. I can only answer questions about Manoj, his technical work, projects, skills, and experience. If you have inquiries outside his verified portfolio, please reach out to Manoj directly at **manojperi26@gmail.com**.";
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
      const fallback = generateLocalResponse(message);
      return res.status(200).json({ reply: fallback, source: 'local-knowledge-base' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const conversationContext = (history || [])
      .slice(-6)
      .map((h: { role: string; text: string }) => `${h.role === 'user' ? 'Recruiter' : 'Assistant'}: ${h.text}`)
      .join('\n');

    const fullPrompt = `${conversationContext ? `Recent conversation context:\n${conversationContext}\n\n` : ''}User Query: ${message}`;

    const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: fullPrompt,
          config: {
            systemInstruction: MANOJ_KNOWLEDGE_BASE,
            temperature: 0.3,
            topP: 0.85,
          },
        });
        if (response.text && response.text.trim()) {
          return res.status(200).json({ reply: response.text, source: 'gemini', model: modelName });
        }
      } catch {
        // Fall through to next model
      }
    }

    const fallback = generateLocalResponse(message);
    return res.status(200).json({ reply: fallback, source: 'local-knowledge-base' });
  } catch {
    const fallback = generateLocalResponse(req?.body?.message || '');
    return res.status(200).json({ reply: fallback, source: 'local-knowledge-base' });
  }
}

