import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

const MANOJ_KNOWLEDGE_BASE = `
You are the dedicated AI Portfolio Assistant for Peri Naga Venkata Sai Manoj.
Your job is to represent Manoj professionally, accurately, and enthusiastically to technical recruiters, engineering hiring managers, and prospective collaborators.

Profile Summary:
- Name: Peri Naga Venkata Sai Manoj
- Role: AI & Data Science Engineer / Machine Learning Engineer
- Education: Bachelor of Technology (B.Tech) in Computer Science & Engineering at Lovely Professional University (LPU), Punjab, India (2022 - 2026). Current CGPA: 8.07 / 10.
- Location: Punjab / Andhra Pradesh, India
- Email: manojperi26@gmail.com
- Phone: +91 9390234710
- LinkedIn: https://linkedin.com/in/peri-manoj
- GitHub: https://github.com/manojperi26
- Availability: Actively open to AI/ML Engineer internships, research fellowships, and full-time software engineering roles.

Key Core Projects:
1. VeriDoc AI (Hybrid RAG with Page Citations):
   - Tech: Python, LangChain, Pinecone, BM25, Groq (Llama 3.3 70B), Cross-Encoder reranking
   - Highlights: Multi-document QA across PDF, DOCX, PPTX, TXT. Dual dense (Pinecone) + sparse (BM25) vector retrieval merged with Reciprocal Rank Fusion. Page-level grounding with 100% citation accuracy, <650ms latency via Groq LPUs.
2. Data Whisperer (Autonomous Data Analysis Agent):
   - Tech: Python, Streamlit, LangChain, Groq (Llama 3.3 70B), ReAct Framework, ngrok
   - Highlights: Conversational CSV query agent. Uses LangChain ReAct loop to generate and execute pandas aggregations and matplotlib/seaborn charts autonomously with self-correcting REPL execution. 91% query interpretation accuracy.
3. Alzheimer's Detection System (Neuroimaging Diagnostic CNN):
   - Tech: Python, TensorFlow/Keras, VGG16, Streamlit, Grad-CAM
   - Highlights: 4-class MRI classifier (Non-Demented, Very Mild, Mild, Moderate Demented). Two-phase transfer learning on axial scans. Grad-CAM visual heatmaps for clinical explainability. Achieved 97.89% diagnostic accuracy.
4. Walmart Sales Forecasting (Time-Series Ensemble):
   - Tech: Python, Random Forest Regression, Scikit-learn, EDA
   - Highlights: 6,435 records across 45 stores. Macroeconomic features (CPI, fuel, unemployment, holiday spikes). R² = 0.93 weekly sales accuracy with 12-week forward projections.

Core Technical Skills:
- Languages: Python (Advanced), SQL, C++, TypeScript, JavaScript
- Frameworks: PyTorch, TensorFlow, Keras, LangChain, LangGraph, Scikit-learn, OpenCV, MediaPipe
- Web & APIs: Flask, FastAPI, Streamlit, Express, React, Tailwind CSS
- Databases & Tools: Pinecone, ChromaDB, BM25, Git, GitHub, Docker, Power BI

Experience & Certifications:
- Machine Learning Intern at Endeavour Technologies (June 2024 - Aug 2024): Built and deployed predictive regression models, improved feature selection, optimized inference pipelines.
- Executive Advanced Certification in AI & Data Science from E&ICT Academy, IIT Indore & Intellipaat.
- AI Engineer Launchpad: Mastering LLMs and Agentic AI (Lovely Professional University).

Guidelines:
- Keep answers concise, highly technical, and recruiter-ready (under 3-4 short paragraphs or bullet points).
- Emphasize quantitative metrics (97.89% accuracy, 91.0% query interpretation, R² = 0.93, 100% page grounding).
- Direct users to Manoj's email (manojperi26@gmail.com) or the resume download if they express hiring interest.
`;

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Deterministic offline knowledge fallback generator
function generateLocalResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('veridoc') || q.includes('rag') || q.includes('document')) {
    return "VeriDoc AI is Manoj's adaptive multi-document RAG system. It pairs dense vector retrieval (Pinecone) with lexical keyword matching (BM25) via Reciprocal Rank Fusion (RRF), cross-encoder reranking, and contextual compression. Using Groq's Llama 3.3 70B, it answers questions with verified page-level citations at ~650ms latency with zero hallucinations.";
  }

  if (q.includes('whisper') || q.includes('csv') || q.includes('data whisperer') || q.includes('react')) {
    return "Data Whisperer is an autonomous CSV data-analysis agent built with LangChain's ReAct framework and Groq Llama 3.3 70B. It introspects dataset schemas, formulates multi-step reasoning thoughts, dynamically executes Python REPL aggregations, and renders interactive charts with a 91.0% query accuracy rate.";
  }

  if (q.includes('alzheimer') || q.includes('mri') || q.includes('brain') || q.includes('medical')) {
    return "The Alzheimer's Detection System is a 4-class neuroimaging diagnostic classifier leveraging VGG16 transfer learning. It achieves 97.89% classification accuracy across Non-Demented, Very Mild, Mild, and Moderate Demented stages. It features Grad-CAM attention heatmaps to provide clinical explainability of hippocampal cortical atrophy.";
  }

  if (q.includes('walmart') || q.includes('sales') || q.includes('forecast')) {
    return "The Walmart Sales Forecasting project analyzed 6,435 historical records across 45 stores. Manoj developed an ensemble Random Forest regression model incorporating macroeconomic indices (CPI, fuel prices, unemployment) and promotional holiday weights to achieve an R² = 0.93 accuracy score across 12-week forward projections.";
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone')) {
    return "You can reach Manoj directly at **manojperi26@gmail.com** or call **+91 9390234710**. He is currently seeking AI Engineer / ML Engineer roles and internships! You can also connect on LinkedIn at https://linkedin.com/in/peri-manoj.";
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('tools')) {
    return "Manoj's core technical stack includes:\n- **AI/ML & LLMs**: LangChain, LangGraph, RAG, PyTorch, TensorFlow, Hugging Face, OpenCV\n- **Languages**: Python (Advanced), SQL, C++, TypeScript\n- **Backend & Deployment**: Flask, FastAPI, Streamlit, Express, Docker\n- **Databases & Vector DBs**: Pinecone, ChromaDB, PostgreSQL";
  }

  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('cgpa')) {
    return "Manoj is pursuing his B.Tech in Computer Science & Engineering at Lovely Professional University (LPU), graduating in 2026. He maintains an **8.07 CGPA** and holds an Advanced Executive Certification in AI & Data Science from E&ICT Academy, IIT Indore.";
  }

  return "Manoj is an AI & Data Science Engineer specialized in Agentic AI, LLMs/RAG, and Deep Learning. His flagship work includes VeriDoc AI (hybrid RAG with page citations), Data Whisperer (autonomous data agent), an Alzheimer's MRI diagnostic classifier (97.89% accuracy), and Walmart Sales Forecasting (R²=0.93). Feel free to ask about any specific project or get in touch at manojperi26@gmail.com!";
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const genAI = getGenAI();

      if (!genAI) {
        // Safe local intelligence fallback
        const fallbackAnswer = generateLocalResponse(message);
        return res.json({ reply: fallbackAnswer, source: 'local-knowledge-base' });
      }

      // Format conversation prompt
      const conversationContext = (history || [])
        .slice(-6)
        .map((h: { role: string; text: string }) => `${h.role === 'user' ? 'Recruiter' : 'Assistant'}: ${h.text}`)
        .join('\n');

      const fullPrompt = `${conversationContext ? `Recent conversation:\n${conversationContext}\n\n` : ''}Recruiter Query: ${message}`;

      // Prioritize high-availability, low-latency models
      const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
      let reply: string | null = null;

      for (const modelName of modelsToTry) {
        try {
          const response = await genAI.models.generateContent({
            model: modelName,
            contents: fullPrompt,
            config: {
              systemInstruction: MANOJ_KNOWLEDGE_BASE,
              temperature: 0.4,
              topP: 0.9,
            },
          });
          if (response.text && response.text.trim()) {
            reply = response.text;
            return res.json({ reply, source: 'gemini', model: modelName });
          }
        } catch {
          // Model temporarily busy or unavailable; continue to next fallback
        }
      }

      // If cloud models hit temporary capacity limits (e.g. 503 high demand), deliver instant verified response
      const fallback = generateLocalResponse(message);
      return res.json({ reply: fallback, source: 'local-knowledge-base' });
    } catch (err: any) {
      // Seamless fallback so the user always gets an accurate response
      const fallback = generateLocalResponse(req.body?.message || '');
      return res.json({ reply: fallback, source: 'local-knowledge-base' });
    }
  });

  // Vite middleware in dev; static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
