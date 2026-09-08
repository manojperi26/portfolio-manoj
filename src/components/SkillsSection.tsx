import React, { useState } from 'react';
import { Terminal, Brain, Bot, Eye, Server, BarChart3, CheckCircle2, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SpotlightCard } from './SpotlightCard';

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-6 h-6 text-cyan-600" />;
      case 'Brain': return <Brain className="w-6 h-6 text-violet-600" />;
      case 'Bot': return <Bot className="w-6 h-6 text-cyan-600" />;
      case 'Eye': return <Eye className="w-6 h-6 text-sky-600" />;
      case 'Server': return <Server className="w-6 h-6 text-violet-700" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-cyan-700" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-600" />;
    }
  };

  const filteredSkills = activeFilter === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.category === activeFilter);

  return (
    <section id="skills" className="relative py-20 md:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/80 dark:from-[#070D18] dark:via-[#0B1528] dark:to-[#070D18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Heading */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-3 border border-violet-200 dark:border-violet-800/80">
            <Sparkles className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400" />
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Technical Skills
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Specialized in AI, Machine Learning, and Data Science.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Technologies' },
              { id: 'ai-ml', label: 'AI & Deep Learning' },
              { id: 'languages', label: 'Languages & Backend' },
              { id: 'vision-analytics', label: 'Vision & Analytics' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-sm shadow-cyan-500/25 scale-102'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SectionFade>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredSkills.map((skill, index) => (
            <SectionFade key={skill.name} delay={index * 0.08}>
              <SpotlightCard
                className="h-full bg-white dark:bg-[#0B1528] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/30 hover:-translate-y-1.5 hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:bg-cyan-50/80 dark:group-hover:bg-cyan-950/50 group-hover:border-cyan-200 dark:group-hover:border-cyan-800 transition-colors">
                      {getIcon(skill.iconName)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                    {skill.description}
                  </p>
                </div>

                {skill.technologies && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap gap-1.5">
                      {skill.technologies.map(tech => (
                        <span
                          key={tech}
                          className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 group-hover:border-cyan-200 dark:group-hover:border-cyan-700 transition-colors"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400 mr-1" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </SectionFade>
          ))}
        </div>
      </div>

      {/* Subtle organic section divider to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800 to-transparent" />
    </section>
  );
};
