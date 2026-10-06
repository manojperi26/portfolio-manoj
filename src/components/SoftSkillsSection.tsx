import React from 'react';
import { Puzzle, Users, MessageSquare, Compass, Sparkles } from 'lucide-react';
import { SOFT_SKILLS_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SpotlightCard } from './SpotlightCard';

export const SoftSkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Puzzle':
        return <Puzzle className="w-5 h-5 text-[#E05638]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#E05638]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[#E05638]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#E05638]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#E05638]" />;
    }
  };

  return (
    <section id="soft-skills" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[ATTRIBUTES // CORE]</span>
            <span className="text-slate-400">INTERPERSONAL COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Soft Skills &amp; Behavioral Attributes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            Interpersonal, collaborative, and cognitive traits that reinforce technical problem-solving and cross-functional execution.
          </p>
        </SectionFade>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {SOFT_SKILLS_DATA.map((skill, index) => {
            const stampNumber = (index + 1).toString().padStart(2, '0');

            return (
              <SectionFade key={skill.id} delay={index * 0.08}>
                <SpotlightCard
                  className="h-full bg-white dark:bg-[#0F172A] p-6 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] motion-safe:hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[#05080E]/70 transition-all duration-150 ease-out flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Stamp Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                      <div className="p-2.5 bg-slate-50 dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] group-hover:border-[#E05638] transition-colors">
                        {getIcon(skill.iconName)}
                      </div>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        [SOFT-{stampNumber}]
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#0F172A] dark:text-[#F1F5F9] mb-2 group-hover:text-[#E05638] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      {skill.description}
                    </p>
                  </div>

                  {/* Specified Traits */}
                  <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                    <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mb-2 uppercase">
                      CORE MANIFESTATIONS:
                    </div>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {skill.traits.map((trait) => (
                        <span
                          key={trait}
                          className="inline-flex items-center px-2 py-0.5 bg-slate-50 dark:bg-[#0B0F17] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B] group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors"
                        >
                          <span className="w-1 h-1 bg-[#E05638] mr-1.5" />
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
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
