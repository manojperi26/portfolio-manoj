import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { InternshipsSection } from './components/InternshipsSection';
import { UniversitySection } from './components/UniversitySection';
import { ResumeSection } from './components/ResumeSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { EmailModal } from './components/EmailModal';
import { AIChatAssistant } from './components/AIChatAssistant';
import { ScrollProgressWidget } from './components/ScrollProgressWidget';

function AppContent() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D18] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-cyan-100 dark:selection:bg-cyan-900/60 selection:text-cyan-900 dark:selection:text-cyan-100 transition-colors duration-300">
      {/* Skip to Content for Keyboard/Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-gradient-to-r focus:from-cyan-500 focus:to-violet-600 focus:text-white focus:font-semibold focus:text-sm focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Skip to main content
      </a>

      {/* Navigation Bar with Theme Switcher */}
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero 
          onOpenContact={() => setContactModalOpen(true)}
          onOpenEmail={() => setEmailModalOpen(true)}
        />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <InternshipsSection />
        <UniversitySection />
        <ResumeSection />
      </main>

      {/* Footer */}
      <Footer onOpenEmail={() => setEmailModalOpen(true)} />

      {/* Floating Scroll Progress & Back-to-Top Widget */}
      <ScrollProgressWidget />

      {/* Domain-Specific AI Portfolio Chat Assistant */}
      <AIChatAssistant />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Dedicated Direct Email Modal with Gmail / Webmail / Mailto / Copy */}
      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onOpenContactForm={() => setContactModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
