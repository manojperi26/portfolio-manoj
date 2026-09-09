import React from 'react';

interface ResumeDocumentProps {
  interactive?: boolean;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ interactive = true }) => {
  return (
    <div 
      className="bg-white text-black font-serif p-6 sm:p-10 md:p-14 w-full max-w-[880px] mx-auto shadow-sm select-text leading-snug text-[12px] sm:text-[13px] md:text-[14px]"
      style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
    >
      {/* HEADER */}
      <header className="mb-5">
        <h1 className="text-2xl sm:text-3xl md:text-[30px] font-bold text-black tracking-normal mb-1.5 font-serif">
          Peri Naga Venkata Sai Manoj
        </h1>
        <div className="flex flex-wrap justify-between items-start text-[12px] sm:text-[13.5px] leading-snug font-sans">
          <div>
            <div>
              LinkedIn:{' '}
              <a 
                href="https://www.linkedin.com/in/manojperi26/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#E05638] underline hover:text-[#0F172A] font-medium"
              >
                www.linkedin.com/in/manojperi26
              </a>
            </div>
            <div>
              Github:{' '}
              <a 
                href="https://github.com/manojperi26/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#E05638] underline hover:text-[#0F172A] font-medium"
              >
                https://github.com/manojperi26/
              </a>
            </div>
          </div>
          <div className="text-right">
            <div>
              Email:{' '}
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=manojperi26@gmail.com&su=Inquiry%20from%20Resume%20-%20Manoj%20Peri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#E05638] underline hover:text-[#0F172A] font-medium"
                title="Send email via Gmail / Webmail (opens in new tab)"
              >
                manojperi26@gmail.com
              </a>
            </div>
            <div>Mobile: +91 8885772647</div>
          </div>
        </div>
      </header>

      {/* SKILLS */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black border-b border-black pb-0.5 mb-1.5">
          SKILLS
        </h2>
        <div className="space-y-1 text-[11.5px] sm:text-[13px] leading-relaxed">
          <p><span className="font-bold">Languages:</span> Python, C++, Java, SQL</p>
          <p><span className="font-bold">Frameworks:</span> PyTorch, TensorFlow, Keras, scikit-learn, LangChain, Flask, FastAPI, OpenCV</p>
          <p><span className="font-bold">Tools/Platforms:</span> MySQL, Git, Github, VS Code, PowerBI</p>
          <p><span className="font-bold">Core Concepts:</span> Data Structures &amp; Algorithms, OOPs, Operating Systems, Machine Learning, Deep Learning, RAG, NLP</p>
          <p><span className="font-bold">Soft Skills:</span> Problem-Solving, Teamwork, Communication, Adaptability</p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black border-b border-black pb-0.5 mb-1.5">
          EXPERIENCE
        </h2>
        <div>
          <div className="flex justify-between items-baseline font-bold text-[12px] sm:text-[13.5px]">
            <span>
              <span className="text-[#E05638] underline hover:text-[#0F172A]">Software Intern | Endeavour Technologies</span> (Offer Letter)
            </span>
            <span className="italic font-normal text-[11.5px] sm:text-[13px]">Jun&apos;26 - Aug&apos;26</span>
          </div>
          <ul className="list-disc ml-5 space-y-1 text-[11px] sm:text-[12.5px] leading-snug mt-1 text-neutral-900">
            <li>Researched and preprocessed data for ML model development, contributing to model design decisions.</li>
            <li>Trained, evaluated, and debugged machine learning models; documented technical processes and issue resolutions.</li>
            <li>Collaborated with the team to deliver AI-driven solutions end-to-end.</li>
          </ul>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black border-b border-black pb-0.5 mb-1.5">
          PROJECTS
        </h2>
        <div className="space-y-3">
          {/* Project 1 */}
          <div>
            <div className="flex justify-between items-baseline font-bold text-[12px] sm:text-[13.5px]">
              <span>
                <span className="text-[#E05638] underline hover:text-[#0F172A]">Data Whisperer</span> | Python, Streamlit, LangChain, Groq (Llama 3.3 70B)
              </span>
              <span className="italic font-normal text-[11.5px] sm:text-[13px]">Aug&apos;26</span>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-[11px] sm:text-[12.5px] leading-snug mt-1 text-neutral-900">
              <li>Built a Streamlit-based CSV data-analysis agent using LangChain&apos;s ReAct framework, enabling natural-language querying with autonomous multi-step reasoning.</li>
              <li>Integrated Groq-hosted Llama 3.3 70B to interpret user queries and auto-generate charts/insights in real time, achieving 91% query interpretation accuracy across test datasets, deployed live via ngrok.</li>
              <li>Debugged agent iteration-limit failures and chart-rendering errors, improving end-to-end query reliability for consistent output.</li>
            </ul>
          </div>

          {/* Project 2 */}
          <div>
            <div className="flex justify-between items-baseline font-bold text-[12px] sm:text-[13.5px]">
              <span>
                <span className="text-[#E05638] underline hover:text-[#0F172A]">Alzheimer&apos;s Detection System</span> | Python, TensorFlow/Keras, VGG16, Streamlit
              </span>
              <span className="italic font-normal text-[11.5px] sm:text-[13px]">Mar&apos;26</span>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-[11px] sm:text-[12.5px] leading-snug mt-1 text-neutral-900">
              <li>Engineered a 4-class Alzheimer&apos;s MRI classifier for automated early-stage disease detection, leveraging VGG16 transfer learning with a two-phase training strategy.</li>
              <li>Preprocessed and augmented medical imaging data across all four disease stages, then deployed the model as an interactive Streamlit web app for real-time predictions.</li>
              <li>Achieved 97.89% classification accuracy across all four disease stages, validating the model&apos;s reliability for early-stage diagnosis support.</li>
            </ul>
          </div>

          {/* Project 3 */}
          <div>
            <div className="flex justify-between items-baseline font-bold text-[12px] sm:text-[13.5px]">
              <span>
                <span className="text-[#E05638] underline hover:text-[#0F172A]">Walmart Sales Forecasting</span> | Python, Random Forest, Scikit-learn
              </span>
              <span className="italic font-normal text-[11.5px] sm:text-[13px]">Feb&apos;26</span>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-[11px] sm:text-[12.5px] leading-snug mt-1 text-neutral-900">
              <li>Investigated 6,435 retail records across 45 stores to uncover seasonal trends and economic factors driving weekly sales.</li>
              <li>Constructed a Random Forest regression model to generate 12-week sales forecasts, enabling data-driven inventory planning.</li>
              <li>Delivered 93% prediction accuracy (R² = 0.93) on weekly sales forecasts, supporting reliable demand planning decisions.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black border-b border-black pb-0.5 mb-1.5">
          TRAINING
        </h2>
        <div>
          <div className="flex justify-between items-baseline font-bold text-[12px] sm:text-[13.5px]">
            <span>Professional Certification in AI &amp; Data Science</span>
            <span className="italic font-normal text-[11.5px] sm:text-[13px]">Feb&apos;25 – Jun&apos;26</span>
          </div>
          <p className="italic text-[11.5px] sm:text-[13px] text-neutral-800">Intellipaat (in collaboration with IIT Indore)</p>
          <ul className="list-disc ml-5 space-y-1 text-[11px] sm:text-[12.5px] leading-snug mt-1 text-neutral-900">
            <li>Established a foundation in statistics, EDA, and applied ML (XGBoost, SHAP, time-series forecasting) using AI-assisted coding, SQL, Excel, and modern Python.</li>
            <li>Implemented Deep Learning architectures with PyTorch and Transformers, and applied Generative AI, LLM, and RAG concepts to hands-on exercises.</li>
            <li>Executed real-world industry projects, deploying ML models via cloud MLOps and performing data analysis with Power BI and Copilot.</li>
          </ul>
        </div>
      </section>

      {/* COURSES & CERTIFICATES */}
      <section className="mb-4">
        <h2 className="text-[13px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black border-b border-black pb-0.5 mb-1.5">
          COURSES &amp; CERTIFICATES
        </h2>
        <div className="space-y-1.5 text-[11.5px] sm:text-[13px]">
          <div className="flex justify-between items-baseline">
            <span>
              <span className="font-bold">AI Engineer Launchpad: Mastering LLMs and Agentic AI</span> | <span className="text-[#E05638] underline hover:text-[#0F172A]">Lovely Professional University</span>
            </span>
            <span className="italic text-[11px] sm:text-[12.5px]">Aug&apos;26</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>
              <span className="font-bold">DRISHTI CPS — AI &amp; Data Science Certification, IIT Indore</span> | <span className="text-[#E05638] underline hover:text-[#0F172A]">Intellipaat</span>
            </span>
            <span className="italic text-[11px] sm:text-[12.5px]">Jun&apos;26</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>
              <span className="font-bold">Python</span> | <span className="text-[#E05638] underline hover:text-[#0F172A]">Intellipaat</span>
            </span>
            <span className="italic text-[11px] sm:text-[12.5px]">Mar&apos;26</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>
              <span className="font-bold">SQL</span> | <span className="text-[#E05638] underline hover:text-[#0F172A]">Intellipaat</span>
            </span>
            <span className="italic text-[11px] sm:text-[12.5px]">Sep&apos;25</span>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <h2 className="text-[13px] sm:text-[14.5px] font-bold tracking-wide uppercase text-black border-b border-black pb-0.5 mb-1.5">
          EDUCATION
        </h2>
        <div className="space-y-2.5 text-[11.5px] sm:text-[13px]">
          <div>
            <div className="flex justify-between items-baseline font-bold">
              <span>Lovely Professional University</span>
              <span className="font-normal text-[11px] sm:text-[12.5px]">Phagwara, Punjab</span>
            </div>
            <div className="flex justify-between items-baseline text-[11px] sm:text-[12.5px] text-neutral-800">
              <span>Bachelor of Technology - Computer Science and Engineering</span>
              <span className="italic">Aug&apos;24 – Present</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline font-bold">
              <span>Matrusri Junior College</span>
              <span className="font-normal text-[11px] sm:text-[12.5px]">Rajahmundry, AP</span>
            </div>
            <div className="flex justify-between items-baseline text-[11px] sm:text-[12.5px] text-neutral-800">
              <span>Intermediate – MPC (Percentage: 86.8%)</span>
              <span className="italic">Mar&apos;22 – May&apos;24</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline font-bold">
              <span>Sri Chaitanya EM Techno School</span>
              <span className="font-normal text-[11px] sm:text-[12.5px]">Visakhapatnam, AP</span>
            </div>
            <div className="flex justify-between items-baseline text-[11px] sm:text-[12.5px] text-neutral-800">
              <span>Matriculation (Percentage: 94.7%)</span>
              <span className="italic">Mar&apos;21 – May&apos;22</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
