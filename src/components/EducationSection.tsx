import React from 'react';
import { GraduationCap, BookOpen, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SpotlightCard } from './SpotlightCard';

export const EducationSection: React.FC = () => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#E05638]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#E05638]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#E05638]" />;
      default:
        return <GraduationCap className="w-5 h-5 text-[#E05638]" />;
    }
  };

  return (
    <section id="education" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[ACADEMICS // TIMELINE]</span>
            <span className="text-slate-400">EDUCATIONAL MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Education &amp; Academic Background
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            Chronological academic foundation, progressing from distinction in secondary schooling to undergraduate engineering in Computer Science.
          </p>
        </SectionFade>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Guide Line */}
          <div
            className="hidden sm:block absolute left-8 md:left-9 top-4 bottom-4 w-[2px] bg-[#E2E8F0] dark:bg-[#1E293B]"
            aria-hidden="true"
          />

          <div className="space-y-6 sm:space-y-8">
            {EDUCATION_DATA.map((edu, index) => {
              const stampNumber = (index + 1).toString().padStart(2, '0');

              return (
                <SectionFade key={edu.id} delay={index * 0.1}>
                  <div className="relative sm:pl-20">
                    {/* Node Dot on Timeline (desktop/tablet) */}
                    <div
                      className="hidden sm:flex absolute left-6 md:left-7 top-6 -translate-x-1/2 w-6 h-6 rounded-none bg-white dark:bg-[#0F172A] border-2 border-[#E05638] items-center justify-center font-mono text-[10px] font-bold text-[#0F172A] dark:text-[#F1F5F9] z-10 group"
                      aria-hidden="true"
                    >
                      <span className="w-2 h-2 bg-[#E05638]" />
                    </div>

                    <SpotlightCard
                      className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] motion-safe:hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[#05080E]/70 transition-all duration-150 ease-out flex flex-col group"
                    >
                      {/* Top Stamp Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 bg-slate-50/80 dark:bg-[#070D18] border-b border-[#E2E8F0] dark:border-[#1E293B] font-mono text-xs transition-colors duration-150 group-hover:border-[#E05638]/40">
                        <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#E05638]" />
                          [EDU-{stampNumber}] // {edu.institution.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-3">
                          {edu.grade && (
                            <span className="inline-flex items-center font-mono text-[11px] font-semibold text-[#E05638] bg-slate-100 dark:bg-[#0B0F17] px-2 py-0.5 border border-[#E05638]/30">
                              {edu.grade}
                            </span>
                          )}
                          <span className="text-slate-500 dark:text-slate-400 text-[11px] inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#E05638]" />
                            [{edu.period}]
                          </span>
                        </div>
                      </div>

                      <div className="p-6 sm:p-7 flex flex-col sm:flex-row gap-5 items-start">
                        {/* Icon Monogram */}
                        <div className="shrink-0">
                          <div className="w-14 h-14 border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] flex items-center justify-center p-2 group-hover:border-[#E05638]/60 transition-colors duration-150">
                            {getIcon(edu.iconName)}
                          </div>
                        </div>

                        {/* Education Details */}
                        <div className="flex-1 w-full min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                            <h3 className="font-serif font-bold text-xl text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#E05638] transition-colors duration-150">
                              {edu.institution}
                            </h3>
                            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
                              <MapPin className="w-3 h-3 text-[#E05638]" />
                              {edu.location}
                            </span>
                          </div>

                          <div className="font-mono text-xs sm:text-sm font-bold text-[#E05638] mb-3">
                            {edu.degree}
                          </div>

                          {edu.description && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 font-sans">
                              {edu.description}
                            </p>
                          )}

                          {edu.highlights && edu.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                              {edu.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="inline-flex items-center font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-slate-50 dark:bg-[#070D18] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B] group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors"
                                >
                                  <CheckCircle2 className="w-2.5 h-2.5 text-[#E05638] mr-1" />
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </SectionFade>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1px Hairline Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E2E8F0] dark:bg-[#1E293B]" />
    </section>
  );
};
