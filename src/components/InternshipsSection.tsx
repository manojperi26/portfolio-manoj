import React, { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, Cpu, Brain } from 'lucide-react';
import { INTERNSHIPS_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';

export const InternshipsSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="internships" className="relative py-20 md:py-24 bg-gradient-to-b from-white via-slate-50/60 to-slate-50 dark:from-[#070D18] dark:via-[#091322] dark:to-[#070D18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-3 border border-violet-200 dark:border-violet-800/80">
            <Briefcase className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400" />
            <span>Work & Practical Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Internships & Training
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Hands-on professional engineering experience across AI development, machine learning systems, and software solutions.
          </p>
        </SectionFade>

        {/* Internships List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {INTERNSHIPS_DATA.map((intern, index) => {
            const hasError = imageErrors[intern.id];

            return (
              <SectionFade key={intern.id} delay={index * 0.12}>
                <div
                  className="bg-white dark:bg-[#0B1528] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/40 hover:-translate-y-1 hover:scale-[1.015] hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group"
                >
                  {/* Company Logo Thumbnail / Icon */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-xs bg-white dark:bg-slate-800 flex items-center justify-center p-2 group-hover:border-cyan-200 dark:group-hover:border-cyan-600 transition-colors">
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
                        <div className="flex flex-col items-center justify-center p-1 text-center">
                          {intern.id === 'intern-1' ? (
                            <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                          ) : (
                            <Brain className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                          )}
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 mt-1 tracking-tight leading-none">
                            {intern.id === 'intern-1' ? 'Endeavour' : 'Intellipaat'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                        {intern.role}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-800 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-full border border-violet-200 dark:border-violet-800/60">
                        <Calendar className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                        <span>{intern.period}</span>
                      </div>
                    </div>

                    <div className="text-cyan-700 dark:text-cyan-400 font-semibold text-sm mb-3">
                      {intern.company}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                      {intern.description}
                    </p>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {intern.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 group-hover:border-cyan-200 dark:group-hover:border-cyan-700 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 mr-1" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionFade>
            );
          })}
        </div>
      </div>

      {/* Subtle organic section divider to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800 to-transparent" />
    </section>
  );
};
