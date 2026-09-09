import React, { useState } from 'react';
import { Terminal, Brain, Bot, Eye, Server, BarChart3, CheckCircle2, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SpotlightCard } from './SpotlightCard';

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#E05638]" />;
      case 'Brain': return <Brain className="w-5 h-5 text-[#E05638]" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#E05638]" />;
      case 'Eye': return <Eye className="w-5 h-5 text-[#E05638]" />;
      case 'Server': return <Server className="w-5 h-5 text-[#E05638]" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#E05638]" />;
      default: return <Sparkles className="w-5 h-5 text-[#E05638]" />;
    }
  };

  const filteredSkills = activeFilter === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.category === activeFilter);

  return (
    <section id="skills" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Heading */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[TAXONOMY // 01]</span>
            <span className="text-slate-400">CORE COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Technical Methodology &amp; Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            Specialized in mathematical foundations, deep learning frameworks, and scalable data intelligence pipelines.
          </p>

          {/* Filter Tabs in Monospace Hairline Style */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-7 font-mono text-xs">
            {[
              { id: 'all', label: '[ALL DOMAINS]' },
              { id: 'ai-ml', label: '[AI & DEEP LEARNING]' },
              { id: 'languages', label: '[LANGUAGES & BACKEND]' },
              { id: 'vision-analytics', label: '[VISION & ANALYTICS]' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 transition-colors cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                  activeFilter === tab.id
                    ? 'bg-[#0F172A] text-[#F1F5F9] dark:bg-[#F1F5F9] dark:text-[#0F172A] font-bold border-[#0F172A] dark:border-[#F1F5F9]'
                    : 'bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-400 hover:text-[#E05638] hover:border-[#E05638] border-[#E2E8F0] dark:border-[#1E293B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SectionFade>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => {
            const stampNumber = (index + 1).toString().padStart(2, '0');
            return (
              <SectionFade key={skill.name} delay={index * 0.05}>
                <SpotlightCard
                  className="h-full bg-white dark:bg-[#0F172A] p-6 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                      <div className="p-2 bg-slate-50 dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-[#1E293B] group-hover:border-[#E05638] transition-colors">
                        {getIcon(skill.iconName)}
                      </div>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        [SKL-{stampNumber}]
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#0F172A] dark:text-[#F1F5F9] mb-2 group-hover:text-[#E05638] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      {skill.description}
                    </p>
                  </div>

                  {skill.technologies && (
                    <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                      <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mb-2 uppercase">
                        SPECIFIED ARTIFACTS:
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                        {skill.technologies.map(tech => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2 py-0.5 bg-slate-50 dark:bg-[#0B0F17] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B] group-hover:border-slate-400 dark:group-hover:border-slate-600 transition-colors"
                          >
                            <span className="w-1 h-1 bg-[#E05638] mr-1.5" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
