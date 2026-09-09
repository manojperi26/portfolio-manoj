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
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
  "Explain VeriDoc's RAG pipeline",
  "What are Manoj's top ML & Python skills?",
  "Tell me about the Alzheimer's CNN project",
  "How can I contact Manoj for hiring?",
];

const INITIAL_GREETING = `Hello! I'm **Manoj's Technical AI Representative**. 

I am domain-specialized in Manoj's technical background across **AI & Data Science Engineering, Machine Learning, Generative AI, and autonomous systems**.

I can provide technical breakdowns of his projects, verified skills, LPU academic background (8.07 CGPA), industry internships, or discuss his availability for engineering roles.

How can I assist your technical review?`;

export const Chatbot: React.FC<ChatbotProps> = ({ onOpenContact, onOpenEmail }) => {
  const shouldReduceMotion = useReducedMotion();
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
      return "I'm Manoj's Technical AI Representative, so I can only answer questions about Manoj, his technical work, projects, skills, and experience. Try asking about his projects, skills, or experience.";
    }

    if (q.includes('veridoc') || q.includes('rag') || q.includes('bm25') || q.includes('pinecone') || q.includes('reciprocal')) {
      return "### VeriDoc AI Architecture\n\nVeriDoc AI is Manoj's multi-document RAG system with verified page-level citation grounding:\n\n- **Hybrid Retrieval**: Combines dense vector retrieval via **Pinecone** with sparse lexical keyword matching via **BM25**.\n- **Reciprocal Rank Fusion (RRF)**: Merges ranked candidate documents from both retrievers to maximize recall and precision.\n- **Reranking & Compression**: Employs an adaptive LLM query router, cross-encoder reranker, and contextual compressor.\n- **Inference**: Powered by **Groq's Llama 3.3 70B** on LPUs, achieving sub-650ms answer latency with 100% page grounding across PDF, DOCX, PPTX, and TXT files.\n\n*Code repository:* [github.com/manojperi26/veri-doc](https://github.com/manojperi26/veri-doc)";
    }

    if (q.includes('whisper') || q.includes('csv') || q.includes('react agent') || q.includes('repl')) {
      return "### Data Whisperer (Autonomous Data Agent)\n\nData Whisperer is a conversational CSV analytics agent built on the **LangChain ReAct framework**:\n\n- **Autonomous Multi-Step Reasoning**: Dynamically introspects dataset schemas, decomposes user questions, and formulates step-by-step reasoning.\n- **Code Execution**: Formulates and runs Python REPL code to execute pandas aggregations and generate matplotlib/seaborn charts.\n- **Self-Correcting Execution**: Recovers from agent iteration limits and visualization syntax errors automatically.\n- **Performance**: Achieved **91% query interpretation accuracy** across benchmark datasets, deployed via ngrok.\n\n*Code repository:* [github.com/manojperi26/data-whisper](https://github.com/manojperi26/data-whisper)";
    }

    if (q.includes('alzheimer') || q.includes('mri') || q.includes('vgg16') || q.includes('grad-cam') || q.includes('brain')) {
      return "### Alzheimer's Detection System\n\nAn automated 4-class MRI neuroimaging diagnostic classifier:\n\n- **Architecture**: Leveraged pretrained **VGG16 transfer learning** with a customized classification head.\n- **Two-Phase Training**: Applied a two-stage training strategy with medical image preprocessing and augmentation across axial MRI slices.\n- **Clinical Explainability**: Integrated **Grad-CAM cortical attention heatmaps** to visually highlight hippocampal atrophy for medical interpretability.\n- **Diagnostic Accuracy**: Attained **97.89% classification accuracy** across all 4 stages (Non-Demented, Very Mild, Mild, Moderate Demented), deployed via Streamlit.\n\n*Code repository:* [github.com/manojperi26/Alzheimer](https://github.com/manojperi26/Alzheimer)";
    }

    if (q.includes('walmart') || q.includes('sales') || q.includes('forecast') || q.includes('time-series') || q.includes('time series') || q.includes('random forest')) {
      return "### Walmart Sales Forecasting\n\nAn ensemble time-series regression system for retail demand planning:\n\n- **Model**: Multi-tree **Random Forest regression** ensemble constructed using Scikit-learn.\n- **Dataset**: Analyzed **6,435 retail records** across 45 stores.\n- **Feature Engineering**: Incorporated holiday seasonal indicators and macroeconomic drivers including CPI, fuel prices, and regional unemployment rates.\n- **Performance**: Achieved an **R² = 0.93 (93% accuracy)** on weekly sales predictions with 12-week forward projections for inventory optimization.\n\n*Code repository:* [github.com/manojperi26/walmart-sales-prediction](https://github.com/manojperi26/walmart-sales-prediction)";
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('technolog') || q.includes('python') || q.includes('machine learning') || q.includes('deep learning') || q.includes('langchain') || q.includes('pytorch')) {
      return "### Manoj's Core Technical Skills\n\n- **Languages**: Python (Advanced), SQL, C++, Java\n- **AI & Deep Learning**: PyTorch, TensorFlow, Keras, scikit-learn, Neural Architectures\n- **LLMs & Agentic AI**: LangChain, LangGraph, RAG pipelines, Prompt Engineering, Groq LPU, Hugging Face\n- **Computer Vision**: OpenCV, MediaPipe, VGG16, Grad-CAM, Medical Image Preprocessing\n- **Time-Series Forecasting**: Random Forest Regression, Seasonal Decomposition, Macroeconomic Modeling\n- **Backend & Data**: Flask, FastAPI, Streamlit, Power BI, Pinecone (Vector DB), BM25, Docker";
    }

    if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('endeavour') || q.includes('company') || q.includes('job')) {
      return "### Manoj's Industry Experience\n\n1. **Software Intern (AI) — Endeavour ERP Solutions India Pvt. Ltd.** *(June 2026 - August 2026)*\n   - Completed an AI internship focused on software development and hands-on real-world task execution in Hyderabad.\n   - Stack: Python, AI development workflows, system integration.\n\n2. **Data Scientist Intern — Intellipaat Software Solutions** *(November 2025 - April 2026)*\n   - Completed under the DRISHTI CPS program with IIT Indore.\n   - Built ML/DL-based text and image applications in Python, covering data preprocessing, model evaluation, neural networks, and GenAI/GPT prompting.";
    }

    if (q.includes('certif') || q.includes('iit') || q.includes('indore') || q.includes('drishti') || q.includes('launchpad')) {
      return "### Verified Certifications\n\n1. **DRISHTI CPS — AI & Data Science Certification, IIT Indore** (Intellipaat, Jun'26): Deep Learning, Machine Learning, and Neural Networks.\n2. **AI Engineer Launchpad: Mastering LLMs and Agentic AI** (Lovely Professional University, Aug'26): LLMs, LangChain, and autonomous agents.\n3. **Python Certification** (Intellipaat, Mar'26): Advanced Python, OOPs, Data Structures & Algorithms.\n4. **SQL Certification** (Intellipaat, Sep'25): Relational database design, complex queries, and joins.";
    }

    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('lpu') || q.includes('cgpa') || q.includes('degree') || q.includes('gpa')) {
      return "### Manoj's Education\n\n- **Degree**: Bachelor of Technology (B.Tech) in Computer Science Engineering — AI & Data Science\n- **Institution**: Lovely Professional University (LPU), Phagwara, Punjab\n- **Batch**: 2024 - 2028\n- **Academic Performance**: Current **CGPA: 8.07 / 10**\n- **Additional Program**: DRISHTI CPS program in AI & Data Science with IIT Indore.";
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('available') || q.includes('email') || q.includes('reach') || q.includes('phone') || q.includes('opportunity') || q.includes('role')) {
      return "### Availability & Contact Information\n\nManoj is **actively open to AI/ML Engineer internships, research fellowships, and full-time software engineering roles**.\n\n- **Email**: [manojperi26@gmail.com](mailto:manojperi26@gmail.com)\n- **Phone**: +91 88857 72647 / +91 9390234710\n- **LinkedIn**: [linkedin.com/in/manojperi26](https://www.linkedin.com/in/manojperi26/)\n- **GitHub**: [github.com/manojperi26](https://github.com/manojperi26)\n\nYou can use the **[Contact Manoj]** or **[Email Manoj]** buttons right here to send a direct message, or **[Download Resume]** to review his credentials.";
    }

    if (q.includes('why') || q.includes('consider') || q.includes('best project') || q.includes('strongest')) {
      return "### Why Consider Manoj?\n\n- **Demonstrated Quantitative Outcomes**: Engineered VeriDoc AI (<650ms hybrid RAG with 100% citation grounding), Alzheimer's MRI CNN (97.89% accuracy with Grad-CAM), and Walmart Sales forecasting (R² = 0.93).\n- **Cutting-Edge Stack**: Hands-on expertise in Agentic AI, LangChain/LangGraph, PyTorch, Pinecone vector indexing, and Groq LPU inference.\n- **Verified Pedigree**: B.Tech CSE (AI & Data Science) at LPU (8.07 CGPA) + IIT Indore DRISHTI CPS certification + industry internship at Endeavour Technologies.\n- **Work Ethic**: Focused on building practical, scalable machine learning systems that solve genuine operational challenges.";
    }

    return "I'm Manoj's Technical AI Representative, so I can only answer questions about Manoj, his technical work, projects, skills, and experience. If you have questions outside his verified portfolio, please reach out to Manoj directly at **manojperi26@gmail.com**.";
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
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbot-launcher-button"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 15 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open Manoj's Technical AI Representative"
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0B0F17] dark:bg-[#1E293B] text-white border border-[#E05638]/40 hover:border-[#E05638] shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E05638] focus:ring-offset-2"
          >
            {/* Pulsing indicator dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>

            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#E05638] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-mono text-xs tracking-wider uppercase font-semibold">
                AI Representative
              </span>
            </div>

            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#E05638]/20 text-[#E05638] border border-[#E05638]/30 rounded">
              Recruiter Mode
            </span>

            {/* Subtle glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E05638]/20 to-emerald-500/20 rounded-full blur-xs -z-10 group-hover:opacity-100 opacity-40 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            ref={chatContainerRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="w-[calc(100vw-2.5rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#F8F9FA] dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#1E293B] shadow-2xl flex flex-col rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E05638]/10 border border-[#E05638]/30 flex items-center justify-center text-[#E05638]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-xs tracking-tight text-[#0F172A] dark:text-white">
                      Manoj's AI Representative
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[10px]">Online • AI Portfolio Agent</span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1E293B] rounded transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chatbot"
                  aria-label="Minimize chatbot"
                  className="p-1.5 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1E293B] rounded transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chatbot"
                  aria-label="Close chatbot"
                  className="p-1.5 text-[#64748B] hover:text-[#E05638] dark:text-[#94A3B8] dark:hover:text-[#E05638] hover:bg-neutral-100 dark:hover:bg-[#1E293B] rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips (Top Strip) */}
            <div className="px-3 py-2 bg-neutral-100/70 dark:bg-[#121824] border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] shrink-0">
              <span className="text-[#64748B] dark:text-[#94A3B8] shrink-0 font-mono text-[10px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E05638]" /> Quick:
              </span>
              {QUICK_PROMPT_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(chip)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] hover:border-[#E05638] text-[#334155] dark:text-[#CBD5E1] hover:text-[#E05638] dark:hover:text-[#E05638] rounded-full text-[11px] transition-all disabled:opacity-50"
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
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-[#E05638] text-white rounded-br-none shadow-xs'
                        : 'bg-white dark:bg-[#151D2A] text-[#1E293B] dark:text-[#E2E8F0] border border-[#E2E8F0] dark:border-[#1E293B] rounded-bl-none shadow-xs'
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-[#E05638]/40 hover:border-[#E05638] text-[#E05638] hover:bg-[#E05638]/5 rounded text-[11px] font-mono transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          Download Resume
                        </button>
                      )}
                      {msg.actions.includes('contact') && (
                        <button
                          onClick={() => handleActionClick('contact')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-blue-500/40 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500/5 rounded text-[11px] font-mono transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Contact Manoj
                        </button>
                      )}
                      {msg.actions.includes('email') && (
                        <button
                          onClick={() => handleActionClick('email')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1E293B] border border-emerald-500/40 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/5 rounded text-[11px] font-mono transition-colors"
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
                <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] p-2 bg-white/70 dark:bg-[#151D2A]/70 border border-[#E2E8F0] dark:border-[#1E293B] rounded-lg max-w-[240px]">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-[#E05638] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-[#E05638] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[#E05638] rounded-full animate-bounce" />
                  </div>
                  <span className="font-mono text-[11px]">Consulting knowledge base...</span>
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
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about VeriDoc, ML skills, experience, or hiring..."
                  disabled={isLoading}
                  className="flex-1 bg-[#F8F9FA] dark:bg-[#151D2A] border border-[#CBD5E1] dark:border-[#1E293B] focus:border-[#E05638] dark:focus:border-[#E05638] px-3 py-2 text-xs rounded-lg text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="p-2 bg-[#E05638] hover:bg-[#C9472B] disabled:opacity-40 disabled:hover:bg-[#E05638] text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Guardrail Disclaimer */}
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#94A3B8] dark:text-[#64748B] font-mono px-0.5">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                  Domain-restricted portfolio agent
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
