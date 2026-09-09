import React, { useState } from 'react';
import { Github, Cpu, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';
import { SpotlightCard } from './SpotlightCard';
import { ProjectDeepDiveModal } from './ProjectDeepDiveModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-24 bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300 mb-3">
            <span className="w-1.5 h-1.5 bg-[#E05638]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">[PROJECTS // 02]</span>
            <span className="text-slate-400">ENGINEERING REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] dark:text-[#F1F5F9] tracking-tight mb-3">
            Featured Engineering Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-sans">
            End-to-end implementations in RAG systems, LLM reasoning agents, medical imaging classification, and time-series forecasting.
          </p>
        </SectionFade>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {PROJECTS_DATA.map((project, index) => {
            const stampNumber = (index + 1).toString().padStart(2, '0');

            return (
              <SectionFade key={project.id} delay={index * 0.08}>
                <SpotlightCard
                  id={`project-card-${project.id}`}
                  className="h-full bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] motion-safe:hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[#05080E]/70 transition-all duration-150 ease-out flex flex-col group"
                >
                  {/* Card Academic Header Metadata */}
                  <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50/70 dark:bg-[#070D18] border-b border-[#E2E8F0] dark:border-[#1E293B] font-mono text-[11px] text-slate-500 dark:text-slate-400 transition-colors duration-150 group-hover:border-[#E05638]/40">
                    <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#E05638]" />
                      [PRJ-{stampNumber}]
                    </span>
                    <span className="uppercase text-[10px] tracking-wider text-slate-400">
                      DEPLOYED PIPELINE
                    </span>
                  </div>

                  {/* Image Preview Container with Theme Inverted Background */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 dark:bg-white border-b border-[#E2E8F0] dark:border-[#1E293B] cursor-pointer flex items-center justify-center"
                    title="Click to view Architecture Deep-Dive"
                  >
                    <SmoothImage
                      src={project.image}
                      alt={project.title}
                      width={1280}
                      height={720}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300 ease-out"
                    />

                    {/* Monospaced corner stamp */}
                    <div className="absolute top-2 left-2 font-mono text-[10px] text-white/90 bg-black/80 px-2 py-0.5 border border-white/20">
                      FIG: 0{index + 1}.ARCH
                    </div>

                    {/* Deep-dive hint on hover */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                      <span className="font-mono text-[10px] font-bold text-white bg-[#E05638] px-2 py-1 shadow-sm">
                        [OPEN ARCHITECTURE FLOW]
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 font-mono text-[10px] bg-slate-50 dark:bg-[#0B0F17] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title with Underline Expansion on Hover */}
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-serif font-bold text-xl text-[#0F172A] dark:text-[#F1F5F9] mb-2 cursor-pointer group-hover:text-[#E05638] transition-colors duration-150 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#E05638] group-hover:after:w-full after:transition-all after:duration-150 after:ease-out"
                      >
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Buttons: Fast 150ms transitions */}
                    <div className="space-y-2 pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] font-mono text-xs">
                      {/* Primary Deep-Dive Trigger Button */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="group/btn w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 dark:bg-[#1E293B]/60 hover:bg-[#E05638] dark:hover:bg-[#E05638] text-[#0F172A] dark:text-[#F1F5F9] hover:text-white dark:hover:text-white border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#E05638] dark:hover:border-[#E05638] font-bold tracking-tight transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                      >
                        <Cpu className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:scale-110" />
                        <span>[INSPECT ARCHITECTURE &amp; PIPELINE]</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 ease-out motion-safe:group-hover/btn:translate-x-1" />
                      </button>

                      {/* Source Repository Link */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/git w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white dark:bg-[#0F172A] hover:bg-[#0F172A] hover:text-white dark:hover:bg-[#F1F5F9] dark:hover:text-[#0F172A] text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#0F172A] dark:hover:border-[#F1F5F9] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638]"
                      >
                        <Github className="w-3.5 h-3.5 transition-transform duration-150 ease-out group-hover/git:-translate-y-0.5" />
                        <span>[GITHUB REPO]</span>
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </SectionFade>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <ProjectDeepDiveModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 1px Hairline Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E2E8F0] dark:bg-[#1E293B]" />
    </section>
  );
};
