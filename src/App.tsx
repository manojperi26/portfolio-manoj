import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { InternshipsSection } from './components/InternshipsSection';
import { ResumeSection } from './components/ResumeSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { EmailModal } from './components/EmailModal';
import { ScrollProgressWidget } from './components/ScrollProgressWidget';

function AppContent() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0F17] text-[#0F172A] dark:text-[#F1F5F9] font-sans antialiased selection:bg-[#E05638]/20 selection:text-[#0F172A] dark:selection:text-white transition-colors duration-300">
      {/* Skip to Content for Keyboard/Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0F172A] dark:focus:bg-[#F1F5F9] focus:text-[#F1F5F9] dark:focus:text-[#0F172A] focus:font-mono focus:text-xs focus:rounded-none focus:border focus:border-[#E05638] focus:outline-none"
      >
        [SKIP TO CONTENT]
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
        <ResumeSection />
      </main>

      {/* Footer */}
      <Footer onOpenEmail={() => setEmailModalOpen(true)} />

      {/* Floating Scroll Progress & Back-to-Top Widget */}
      <ScrollProgressWidget />

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
