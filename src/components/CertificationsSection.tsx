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
    <section id="certifications" className="relative py-20 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/70 dark:from-[#070D18] dark:via-[#0B1528] dark:to-[#070D18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Heading */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-3 border border-violet-200 dark:border-violet-800/80">
            <Award className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400" />
            <span>Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Certifications & Courses
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Continuous learning and verified professional certifications in LLMs, Agentic AI, Machine Learning, Python, and SQL. Click any card to expand the certificate preview.
          </p>
        </SectionFade>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {CERTIFICATIONS_DATA.map((cert, index) => (
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
                className="h-full bg-white dark:bg-[#0B1528] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/40 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
              >
                {/* Certificate Image Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <SmoothImage
                    src={cert.image}
                    alt={cert.title}
                    width={360}
                    height={176}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  
                  {/* Subtle Hover Overlay Indicator */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-900 dark:text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>View Certificate</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                      <span className="font-semibold text-violet-800 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 px-2.5 py-0.5 rounded-md border border-violet-200 dark:border-violet-800/60">
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3 leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    {cert.skillsAcquired && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skillsAcquired.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 group-hover:border-cyan-200 dark:group-hover:border-cyan-700 transition-colors"
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
                    className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-800 dark:hover:text-cyan-300 bg-slate-50 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500 shadow-2xs hover:shadow-xs transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Verify Certificate</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <CertificationModal
        certification={selectedCert}
        isOpen={modalOpen}
        onClose={handleCloseCert}
      />

      {/* Subtle organic section divider to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800 to-transparent" />
    </section>
  );
};
