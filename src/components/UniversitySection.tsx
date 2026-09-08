import React, { useState } from 'react';
import { GraduationCap, MapPin, ExternalLink, BookOpen, Users, Award } from 'lucide-react';
import { UNIVERSITY_DATA } from '../data/portfolioData';
import { SectionFade } from './SectionFade';
import { SmoothImage } from './SmoothImage';

export const UniversitySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  return (
    <section id="university" className="relative py-20 md:py-24 bg-gradient-to-b from-cyan-50/20 via-slate-50/70 to-white dark:from-[#070D18] dark:via-[#091322] dark:to-[#070D18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <SectionFade className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-100/90 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 mb-3 border border-violet-200 dark:border-violet-800/80">
            <GraduationCap className="w-3.5 h-3.5 text-violet-700 dark:text-violet-400" />
            <span>Academic Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            My University Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Exploring my educational journey at Lovely Professional University, where I&apos;ve grown both academically and personally.
          </p>
        </SectionFade>

        {/* Institution Hero Card */}
        <SectionFade delay={0.1}>
          <div className="max-w-5xl mx-auto bg-white dark:bg-[#0B1528] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/40 hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 text-xs font-semibold mb-4">
                  <span>{UNIVERSITY_DATA.est}</span>
                  <span>•</span>
                  <span>One of India&apos;s largest universities</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {UNIVERSITY_DATA.institution}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-cyan-700 dark:text-cyan-400 font-medium mb-4">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{UNIVERSITY_DATA.location}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {UNIVERSITY_DATA.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {UNIVERSITY_DATA.stats.map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700 hover:border-cyan-100 dark:hover:border-cyan-800 transition-colors">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <a
                  href={UNIVERSITY_DATA.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-900 dark:text-cyan-200 bg-cyan-50 dark:bg-slate-800 hover:bg-cyan-100/90 dark:hover:bg-slate-700 hover:shadow-xs px-4 py-2.5 rounded-xl border border-cyan-300 dark:border-cyan-600 hover:border-cyan-400 dark:hover:border-cyan-500 hover:-translate-y-0.5 active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                >
                  <span>Visit University Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Campus Featured Visual */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <SmoothImage
                    key={UNIVERSITY_DATA.campusImages[activeImageIndex].src}
                    src={UNIVERSITY_DATA.campusImages[activeImageIndex].src}
                    alt={UNIVERSITY_DATA.campusImages[activeImageIndex].title}
                    width={480}
                    height={300}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://myportfolio-mauve-eta-63.vercel.app/college.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                    <div className="text-white">
                      <div className="text-xs font-bold">{UNIVERSITY_DATA.campusImages[activeImageIndex].title}</div>
                      <div className="text-[11px] text-slate-300">{UNIVERSITY_DATA.campusImages[activeImageIndex].desc}</div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {UNIVERSITY_DATA.campusImages.map((img, idx) => (
                    <button
                      key={img.title}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1 ${
                        activeImageIndex === idx
                          ? 'border-cyan-500 scale-95 shadow-xs'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:scale-102'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        width={120}
                        height={68}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://myportfolio-mauve-eta-63.vercel.app/lpu1.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionFade>

        {/* Academic Pillars */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {UNIVERSITY_DATA.academicPillars.map((pillar, idx) => {
            const icons = [
              <BookOpen key="1" className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
              <Users key="2" className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
              <Award key="3" className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            ];
            return (
              <SectionFade key={pillar.title} delay={0.15 + idx * 0.08}>
                <div
                  className="h-full bg-white dark:bg-[#0B1528] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl dark:hover:shadow-cyan-950/40 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50 group-hover:border-cyan-200 dark:group-hover:border-cyan-700 transition-colors">
                      {icons[idx % icons.length]}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
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
