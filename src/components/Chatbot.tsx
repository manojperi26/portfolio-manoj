import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Minimize2, 
  RotateCcw, 
  FileText, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useDragControls } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'local-knowledge-base';
  actions?: ('resume' | 'contact' | 'email')[];
}

interface ChatbotProps {
  onOpenContact: () => void;
  onOpenEmail: () => void;
}

const QUICK_PROMPT_CHIPS = [
  "JARVIS, explain VeriDoc's RAG pipeline",
  "JARVIS, what are Manoj's top ML & Python skills?",
  "JARVIS, tell me about the Alzheimer's CNN project",
  "JARVIS, how can I contact Manoj for hiring?",
];

const INITIAL_GREETING = `Hello! I am **JARVIS**, Manoj's dedicated personal portfolio AI assistant and Technical AI Representative.

Peri Naga Venkata Sai Manoj is a Computer Science and Engineering student at Lovely Professional University (current CGPA: 7.45) actively pursuing opportunities as a **Data Scientist**.

I can provide technical details on his featured projects (**Data Whisperer**, **Alzheimer's Detection System**, **Walmart Sales Forecasting**, **VeriDoc AI**), verified skills in Python, ML, GenAI & RAG, his two distinct internships, and contact info.

How can I assist your review today?`;

export const Chatbot: React.FC<ChatbotProps> = ({ onOpenContact, onOpenEmail }) => {
  const shouldReduceMotion = useReducedMotion();
  const windowDragControls = useDragControls();
  const isDraggingPillRef = useRef(false);
  const [dragBounds, setDragBounds] = useState({ top: -600, left: -800, right: 0, bottom: 0 });

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'assistant',
      text: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Compute screen drag constraints dynamically
  useEffect(() => {
    const updateBounds = () => {
      setDragBounds({
        top: -(window.innerHeight - 110),
        left: -(window.innerWidth - 240),
        right: 0,
        bottom: 0,
      });
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotification(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Detect appropriate actions based on query and reply
  const determineActions = (userQuery: string, botReply: string): ('resume' | 'contact' | 'email')[] => {
    const combined = `${userQuery} ${botReply}`.toLowerCase();
    const actions: ('resume' | 'contact' | 'email')[] = [];

    if (combined.includes('resume') || combined.includes('cv') || combined.includes('download') || combined.includes('experience') || combined.includes('internship') || combined.includes('education')) {
      actions.push('resume');
    }
    if (combined.includes('contact') || combined.includes('hire') || combined.includes('available') || combined.includes('opportunity') || combined.includes('collaborat')) {
      actions.push('contact');
    }
    if (combined.includes('email') || combined.includes('mail') || combined.includes('reach') || combined.includes('manojperi26@gmail.com')) {
      actions.push('email');
    }

    return actions;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-5).map(m => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || "I'm Manoj's Technical AI Representative. How can I help you regarding Manoj's technical background?";
      const actions = determineActions(query, replyText);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch {
      // Offline fallback
      const fallbackReply = getClientKnowledgeFallback(query);
      const actions = determineActions(query, fallbackReply);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-knowledge-base',
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `greeting-${Date.now()}`,
        role: 'assistant',
        text: INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    inputRef.current?.focus();
  };

  const handleActionClick = (action: 'resume' | 'contact' | 'email') => {
    if (action === 'resume') {
      window.open(PERSONAL_INFO.resumeUrl, '_blank', 'noopener,noreferrer');
    } else if (action === 'contact') {
      onOpenContact();
    } else if (action === 'email') {
      onOpenEmail();
    }
  };

  // Safe client-side fallback knowledge engine
  const getClientKnowledgeFallback = (query: string): string => {
    const q = query.trim().toLowerCase();

    // Clear domain deflections for non-Manoj inquiries
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

    return "I am JARVIS, Manoj's Technical AI Representative. I can only answer questions about Manoj, his technical work, projects, skills, and experience. If you have questions outside his verified portfolio, please reach out to Manoj directly at **manojperi26@gmail.com**.";
  };

  // Lightweight markdown formatter for formatted responses
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-semibold text-sm text-[#E05638] dark:text-[#E05638] mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }

      // Bullet points (- or * or numbered)
      const bulletMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
      if (bulletMatch) {
        const content = bulletMatch[3];
        return (
          <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed my-0.5 pl-1">
            <span className="text-[#E05638] font-bold mt-0.5">•</span>
            <div className="flex-1">{parseInlineMarkdown(content)}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="text-xs leading-relaxed my-1">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Inline markdown: **bold**, `code`, and [link](url)
  const parseInlineMarkdown = (text: string) => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining) {
      // Check for link [label](url)
      const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^)]+)\)([\s\S]*)$/);
      // Check for bold **text**
      const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)$/);
      // Check for code `code`
      const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`([\s\S]*)$/);

      // Find which comes first
      const matches = [
        linkMatch ? { type: 'link', index: linkMatch[1].length, match: linkMatch } : null,
        boldMatch ? { type: 'bold', index: boldMatch[1].length, match: boldMatch } : null,
        codeMatch ? { type: 'code', index: codeMatch[1].length, match: codeMatch } : null,
      ].filter(Boolean).sort((a, b) => a!.index - b!.index);

      if (matches.length > 0) {
        const first = matches[0]!;
        if (first.type === 'link') {
          const [, before, label, url, after] = first.match;
          if (before) parts.push(<span key={key++}>{before}</span>);
          parts.push(
            <a
              key={key++}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E05638] hover:underline font-medium inline-flex items-center gap-0.5"
            >
              {label}
              <ExternalLink className="w-2.5 h-2.5 inline" />
            </a>
          );
          remaining = after;
        } else if (first.type === 'bold') {
          const [, before, boldText, after] = first.match;
          if (before) parts.push(<span key={key++}>{before}</span>);
          parts.push(
            <strong key={key++} className="font-semibold text-[#0F172A] dark:text-white">
              {boldText}
            </strong>
          );
          remaining = after;
        } else if (first.type === 'code') {
          const [, before, codeText, after] = first.match;
          if (before) parts.push(<span key={key++}>{before}</span>);
          parts.push(
            <code key={key++} className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-[#E05638] rounded text-[11px] font-mono">
              {codeText}
            </code>
          );
          remaining = after;
        }
      } else {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }
    }

    return parts;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Floating Launcher Bar - Draggable and Movable Rectangle matching Intro size */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            id="chatbot-launcher-bar"
            drag
            dragMomentum={false}
            dragElastic={0.12}
            dragConstraints={dragBounds}
            onDragStart={() => {
              isDraggingPillRef.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDraggingPillRef.current = false;
              }, 120);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (isDraggingPillRef.current) return;
              setIsOpen(true);
            }}
            role="button"
            tabIndex={0}
            aria-label="Open JARVIS AI - Drag to move anywhere"
            className="group cursor-grab active:cursor-grabbing select-none flex items-center gap-2.5 px-3 h-9 bg-gradient-to-r from-[#D8583B] to-[#C8482E] hover:from-[#E05638] hover:to-[#D8583B] text-white shadow-lg shadow-[#D8583B]/20 rounded-none border border-[#B53B22]/80 focus:outline-none focus:ring-2 focus:ring-[#D8583B] focus:ring-offset-2 backdrop-blur-md"
          >
            {/* Drag Grip Handle */}
            <div 
              className="flex items-center text-white/70 group-hover:text-white transition-colors"
              title="Drag to reposition anywhere"
            >
              <GripVertical className="w-3.5 h-3.5" />
            </div>

            {/* Pulsing online indicator */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>

            {/* Monospace Branding */}
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider uppercase text-white">
              <span className="px-1.5 py-0.5 bg-white/20 rounded-none text-[10px] tracking-wide">JARVIS</span>
              <span className="text-white">MY AI</span>
            </div>

            {/* Arrow */}
            <span className="text-xs text-white font-bold transition-transform duration-200 group-hover:translate-x-0.5 leading-none">
              →
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Window - Movable by Header */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            ref={chatContainerRef}
            drag
            dragListener={false}
            dragControls={windowDragControls}
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={dragBounds}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="w-[calc(100vw-2.5rem)] sm:w-[430px] h-[590px] max-h-[85vh] bg-[#F8F9FA] dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#1E293B] shadow-2xl flex flex-col rounded-none overflow-hidden"
          >
            {/* Header - Grabbable to Drag Window */}
            <div 
              onPointerDown={(e) => windowDragControls.start(e)}
              className="cursor-grab active:cursor-grabbing px-4 py-3 bg-gradient-to-r from-[#D8583B] to-[#C8482E] text-white flex items-center justify-between shrink-0 select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-white/15 border border-white/30 flex items-center justify-center text-white rounded-none shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider uppercase text-white px-1.5 py-0.5 bg-white/20 rounded-none">
                      JARVIS AI
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-white/80 flex items-center gap-1.5 mt-0.5">
                    <span>Manoj's Technical AI</span>
                    <span className="text-white/50">•</span>
                    <span className="text-[9px] text-white/70">drag header to move</span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1" onPointerDown={(e) => e.stopPropagation()}>
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="w-7 h-7 bg-white/10 hover:bg-white/20 text-white/85 hover:text-white flex items-center justify-center transition-colors rounded-none"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chatbot"
                  aria-label="Minimize chatbot"
                  className="w-7 h-7 bg-white/10 hover:bg-white/20 text-white/85 hover:text-white flex items-center justify-center transition-colors rounded-none"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chatbot"
                  aria-label="Close chatbot"
                  className="w-7 h-7 bg-white/10 hover:bg-white/20 text-white/85 hover:text-white flex items-center justify-center transition-colors rounded-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips (Top Strip) */}
            <div className="px-3 py-2 bg-neutral-100/80 dark:bg-[#121824] border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] shrink-0">
              <span className="text-[#64748B] dark:text-[#94A3B8] shrink-0 font-mono text-[10px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D8583B]" /> Quick:
              </span>
              {QUICK_PROMPT_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(chip)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] hover:border-[#D8583B] text-[#334155] dark:text-[#CBD5E1] hover:text-[#D8583B] dark:hover:text-[#D8583B] rounded-none text-[11px] font-mono transition-all disabled:opacity-50 shadow-2xs"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message History */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-[#D8583B] text-white rounded-none shadow-xs'
                        : 'bg-white dark:bg-[#151D2A] text-[#1E293B] dark:text-[#E2E8F0] border border-[#E2E8F0] dark:border-[#1E293B] rounded-none shadow-xs'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div>{renderFormattedText(msg.text)}</div>
                    ) : (
                      <p className="leading-relaxed">{msg.text}</p>
                    )}

                    <div
                      className={`text-[10px] mt-1 text-right font-mono ${
                        msg.role === 'user'
                          ? 'text-white/70'
                          : 'text-[#94A3B8] dark:text-[#64748B]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Contextual Quick Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                      {msg.actions.includes('resume') && (
                        <button
                          onClick={() => handleActionClick('resume')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-[#D8583B]/50 hover:border-[#D8583B] text-[#D8583B] hover:bg-[#D8583B]/5 rounded-none text-[11px] font-mono transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          Download Resume
                        </button>
                      )}
                      {msg.actions.includes('contact') && (
                        <button
                          onClick={() => handleActionClick('contact')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-blue-500/50 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500/5 rounded-none text-[11px] font-mono transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Contact Manoj
                        </button>
                      )}
                      {msg.actions.includes('email') && (
                        <button
                          onClick={() => handleActionClick('email')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-emerald-500/50 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/5 rounded-none text-[11px] font-mono transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          Email Manoj
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing / Streaming indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] p-2 bg-white/70 dark:bg-[#151D2A]/70 border border-[#E2E8F0] dark:border-[#1E293B] rounded-none max-w-[240px] px-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-[#D8583B] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-[#D8583B] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[#D8583B] rounded-full animate-bounce" />
                  </div>
                  <span className="font-mono text-[11px]">JARVIS is analyzing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white dark:bg-[#0F172A] border-t border-[#E2E8F0] dark:border-[#1E293B] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-[#F8F9FA] dark:bg-[#151D2A] border border-[#CBD5E1] dark:border-[#1E293B] focus-within:border-[#D8583B] dark:focus-within:border-[#D8583B] px-3 py-1.5 rounded-none transition-colors"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask JARVIS about VeriDoc, ML skills, projects..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-xs text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:outline-none font-mono py-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="p-1.5 bg-[#D8583B] hover:bg-[#C8482E] disabled:opacity-30 disabled:hover:bg-[#D8583B] text-white rounded-none transition-colors flex items-center justify-center shrink-0 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Guardrail Disclaimer */}
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#94A3B8] dark:text-[#64748B] font-mono px-2">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                  JARVIS • Drag header to move
                </span>
                <span>Press Enter ↵</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
