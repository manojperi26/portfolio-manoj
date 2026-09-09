import React, { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, Cpu, Brain } from 'lucide-react';
import { INTERNSHIPS_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';

export const InternshipsSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="internships" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[EXPERIENCE // 04]</span>
            <span className="text-slate-400">PRACTICAL INTERNSHIPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Internships &amp; Practical Training
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            Hands-on software development and data science internship experience building and testing real systems.
          </p>
        </SectionFade>

        {/* Internships List */}
        <div className="max-w-4xl mx-auto space-y-5">
          {INTERNSHIPS_DATA.map((intern, index) => {
            const hasError = imageErrors[intern.id];
            const stampNumber = (index + 1).toString().padStart(2, '0');

            return (
              <SectionFade key={intern.id} delay={index * 0.1}>
                <div
                  className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] motion-safe:hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[#05080E]/70 transition-all duration-150 ease-out flex flex-col group"
                >
                  {/* Top Stamp Header */}
                  <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50/80 dark:bg-[#070D18] border-b border-[#E2E8F0] dark:border-[#1E293B] font-mono text-xs transition-colors duration-150 group-hover:border-[#E05638]/40">
                    <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#E05638]" />
                      [EXP-{stampNumber}] // {intern.company.toUpperCase()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      [{intern.period}]
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-start">
                    {/* Company Logo Thumbnail / Icon */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0B0F17] flex items-center justify-center p-2 group-hover:border-[#E05638]/60 transition-colors duration-150">
                        {intern.image && !hasError ? (
                          <SmoothImage
                            src={intern.image}
                            alt={intern.company}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                            onError={() => {
                              setImageErrors((prev) => ({ ...prev, [intern.id]: true }));
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-1 text-center font-mono text-[10px]">
                            {intern.id === 'intern-1' ? (
                              <Cpu className="w-6 h-6 text-[#E05638]" />
                            ) : (
                              <Brain className="w-6 h-6 text-[#E05638]" />
                            )}
                            <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 uppercase">
                              {intern.id === 'intern-1' ? 'Endeavour' : 'Intellipaat'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="font-serif font-bold text-xl text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#E05638] transition-colors duration-150 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#E05638] group-hover:after:w-full after:transition-all after:duration-150 after:ease-out">
                          {intern.role}
                        </h3>
                      </div>

                      <div className="font-mono text-xs text-[#E05638] font-bold mb-3">
                        {intern.company} &bull; APPOINTMENT RECORD
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 font-sans">
                        {intern.description}
                      </p>

                      {/* Skills tags with hover contrast inversion */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                        {intern.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center font-mono text-[10px] px-2 py-0.5 bg-slate-50 dark:bg-[#070D18] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B] hover:bg-[#0F172A] hover:text-[#F1F5F9] dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] hover:border-[#0F172A] dark:hover:border-[#F1F5F9] transition-all duration-150 ease-out cursor-default"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-[#E05638] mr-1" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionFade>
            );
          })}
        </div>
      </div>

      {/* 1px Hairline Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E2E8F0] dark:bg-[#1E293B]" />
    </section>
  );
};
