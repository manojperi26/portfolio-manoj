import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Cpu, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';
import { SpotlightCard } from './SpotlightCard';
import { ProjectDeepDiveModal } from './ProjectDeepDiveModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-24 bg-gradient-to-b from-slate-50/80 via-cyan-50/15 to-white dark:from-[#070D18] dark:via-[#091322] dark:to-[#070D18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-3 border border-violet-200 dark:border-violet-800/80">
            <Layers className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Projects Portfolio
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Showcasing my expertise in AI, Machine Learning, Deep Learning, and intelligent data systems through real-world applications. Click any card or deep-dive button to explore technical architectures and benchmarks.
          </p>
        </SectionFade>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <SectionFade key={project.id} delay={index * 0.1}>
              <SpotlightCard
                id={`project-card-${project.id}`}
                className="h-full bg-white dark:bg-[#0B1528] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/40 hover:-translate-y-1.5 hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col group"
              >
                {/* Image Preview Container - Full clear 16:9 banner graphic */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-100 dark:border-slate-800/80 cursor-pointer"
                  title="Click to view Architecture Deep-Dive"
                >
                  <SmoothImage
                    src={project.image}
                    alt={project.title}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />

                  {/* Deep-dive badge hover hint */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-lg">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      <span>Explore Architecture</span>
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {/* Primary Deep-Dive Trigger Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl text-xs font-bold text-cyan-900 dark:text-cyan-200 bg-cyan-50/80 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/70 border border-cyan-200 dark:border-cyan-800/80 transition-all cursor-pointer shadow-xs active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    >
                      <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Architecture & Benchmark Deep-Dive</span>
                      <Sparkles className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                    </button>

                    {/* Secondary External Links */}
                    <div className="flex items-center gap-2.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                      >
                        <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                        <span>GitHub</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-sm transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </SectionFade>
          ))}
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <ProjectDeepDiveModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Subtle organic section divider to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800 to-transparent" />
    </section>
  );
};
