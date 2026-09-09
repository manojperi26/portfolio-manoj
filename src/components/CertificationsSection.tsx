import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, ShieldCheck, ZoomIn } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { Certification } from '../types';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';
import { CertificationModal } from './CertificationModal';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCert = (cert: Certification) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  const handleCloseCert = () => {
    setModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <section id="certifications" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Heading */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[CERTIFICATIONS // 04]</span>
            <span className="text-slate-400">CERTIFICATIONS &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Certifications &amp; Credentials
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            Rigorous certifications in Large Language Models, Multi-Agent Systems, Machine Learning algorithms, Python scientific programming, and relational data architecture.
          </p>
        </SectionFade>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS_DATA.map((cert, index) => {
            const stampNumber = (index + 1).toString().padStart(2, '0');

            return (
              <SectionFade key={cert.id} delay={index * 0.08}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`View certificate preview for ${cert.title}`}
                  onClick={() => handleOpenCert(cert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenCert(cert);
                    }
                  }}
                  className="h-full bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] motion-safe:hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[#05080E]/70 transition-all duration-150 ease-out flex flex-col group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                >
                  {/* Stamp Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50/70 dark:bg-[#070D18] border-b border-[#E2E8F0] dark:border-[#1E293B] font-mono text-[10px] transition-colors duration-150 group-hover:border-[#E05638]/40">
                    <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#E05638]" />
                      [CERT-{stampNumber}]
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      [{cert.date}]
                    </span>
                  </div>

                  {/* Certificate Image Thumbnail */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-[#070D18] border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <SmoothImage
                      src={cert.image}
                      alt={cert.title}
                      width={360}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
                      onError={(e) => {
                        const map: Record<string, string> = {
                          'cert-lpu-ai': '/portfolio/cert-lpu-ai.svg',
                          'cert-drishti-cps': '/portfolio/cert-drishti.svg',
                          'cert-python': '/portfolio/cert-python.svg',
                          'cert-sql': '/portfolio/cert-sql.svg'
                        };
                        if (map[cert.id]) (e.currentTarget as HTMLImageElement).src = map[cert.id];
                      }}
                    />
                    
                    {/* Hover indicator */}
                    <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center pointer-events-none">
                      <span className="font-mono text-[10px] font-bold text-white bg-[#E05638] px-2 py-1">
                        [INSPECT CREDENTIAL]
                      </span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[11px] text-[#E05638] font-bold uppercase mb-1.5">
                        {cert.issuer}
                      </div>

                      <h3 className="font-serif font-bold text-sm text-[#0F172A] dark:text-[#F1F5F9] mb-3 leading-snug group-hover:text-[#E05638] transition-colors duration-150 line-clamp-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#E05638] group-hover:after:w-full after:transition-all after:duration-150 after:ease-out">
                        {cert.title}
                      </h3>

                      {cert.skillsAcquired && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {cert.skillsAcquired.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[9px] px-1.5 py-0.5 bg-slate-50 dark:bg-[#070D18] text-slate-600 dark:text-slate-400 border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] hover:border-[#0F172A] dark:hover:border-[#F1F5F9] transition-all duration-150 ease-out cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group/link mt-2 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-white dark:bg-[#0B0F17] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] font-mono text-[11px] text-slate-700 dark:text-slate-300 font-bold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E05638]" />
                      <span>[VERIFY CREDENTIAL]</span>
                      <ExternalLink className="w-3 h-3 opacity-60 transition-transform duration-150 ease-out motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </SectionFade>
            );
          })}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <CertificationModal
        certification={selectedCert}
        isOpen={modalOpen}
        onClose={handleCloseCert}
      />

      {/* 1px Hairline Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E2E8F0] dark:bg-[#1E293B]" />
    </section>
  );
};
