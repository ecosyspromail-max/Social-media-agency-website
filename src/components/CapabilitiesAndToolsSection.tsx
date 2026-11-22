import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { CAPABILITIES, TOOL_CATEGORIES } from '../data/agencyData';
import { AGENCY_EASE, Reveal, VIEWPORT_CONFIG } from './MotionPrimitives';

type CapabilityFilter = 'all' | 'strategy' | 'content' | 'paid';
type ToolGroupFilter = 'all' | 'content' | 'analytics' | 'ops';

const CAPABILITY_TABS: { id: CapabilityFilter; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'strategy', label: 'Strategy & Planning' },
  { id: 'content', label: 'Content & Direction' },
  { id: 'paid', label: 'Paid Advertising' },
];

const TOOL_GROUP_TABS: { id: ToolGroupFilter; label: string }[] = [
  { id: 'all', label: 'Full Stack (8)' },
  { id: 'content', label: 'Scheduling, Design & Video' },
  { id: 'analytics', label: 'Analytics & Ads' },
  { id: 'ops', label: 'PM, AI & CRM' },
];

export function CapabilitiesAndToolsSection() {
  const [capFilter, setCapFilter] = useState<CapabilityFilter>('all');
  const [toolFilter, setToolFilter] = useState<ToolGroupFilter>('all');

  const visibleCapabilities =
    capFilter === 'all' ? CAPABILITIES : CAPABILITIES.filter((c) => c.id === capFilter);

  const visibleTools =
    toolFilter === 'all' ? TOOL_CATEGORIES : TOOL_CATEGORIES.filter((t) => t.group === toolFilter);

  return (
    <section id="capabilities" className="py-16 sm:py-24 bg-[#07091B] border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part 1: What We're Extremely Good At */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium text-[#00E5C7] mb-3">Capabilities & Skills Deep Dive</p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA]"
            >
              What We’re Extremely Good At.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter capability disciplines"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0F1433] border border-white/10 rounded-lg self-start lg:self-auto"
          >
            {CAPABILITY_TABS.map((tab) => {
              const active = capFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCapFilter(tab.id)}
                  className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                    active
                      ? 'bg-[#00E5C7] text-[#07091B] font-semibold'
                      : 'text-[#F8F9FA]/70 hover:text-[#F8F9FA] hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          className={`grid grid-cols-1 ${
            visibleCapabilities.length === 1 ? 'lg:grid-cols-1 max-w-3xl' : 'lg:grid-cols-3'
          } gap-6 mb-20`}
        >
          {visibleCapabilities.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: AGENCY_EASE }}
              className="flex flex-col p-6 sm:p-8 rounded-xl bg-[#0F1433] border border-white/10"
            >
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="font-mono text-xs font-medium tabular-nums text-[#F5B700]">
                  {group.number}.
                </span>
                <h3 className="font-display font-bold text-xl text-[#F8F9FA]">{group.title}</h3>
              </div>

              <p className="text-sm text-[#F8F9FA]/65 leading-relaxed mb-6 pb-5 border-b border-white/10">
                {group.summary}
              </p>

              <ul className="space-y-3.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#F8F9FA]/85 leading-snug">
                    <Check className="w-4 h-4 text-[#00E5C7] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Part 2: Tools Mastery */}
        <div className="pt-14 border-t border-white/10">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-medium text-[#00E5C7] mb-2">Tools Mastery</p>
              <h3 className="font-display font-bold tracking-tight text-2xl sm:text-3xl text-[#F8F9FA]">
                Production, Analytics & Automation Stack
              </h3>
              <p className="text-sm sm:text-base text-[#F8F9FA]/65 mt-2 max-w-2xl">
                Every workflow runs on industry-standard creative, attribution, AI, and CRM platforms—integrated cleanly into your existing stack.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter tool categories"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0F1433] border border-white/10 rounded-lg self-start lg:self-auto"
            >
              {TOOL_GROUP_TABS.map((tab) => {
                const active = toolFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setToolFilter(tab.id)}
                    className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                      active
                        ? 'bg-[#F8F9FA] text-[#07091B] font-semibold'
                        : 'text-[#F8F9FA]/70 hover:text-[#F8F9FA] hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTools.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.42, delay: Math.min(idx * 0.05, 0.25), ease: AGENCY_EASE }}
                className="p-6 rounded-xl bg-[#0F1433] border border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/8">
                  <h4 className="font-display font-semibold text-lg text-[#F8F9FA]">
                    {category.title}
                  </h4>
                  <span className="font-mono text-xs tabular-nums text-[#F8F9FA]/50">
                    {category.tools.length} platforms
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-[#151B42] border border-white/6"
                    >
                      <div
                        aria-hidden="true"
                        className="w-9 h-9 rounded-md bg-[#07091B] border border-white/12 flex items-center justify-center font-mono text-[11px] font-semibold text-[#F5B700] shrink-0"
                      >
                        {tool.code}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#F8F9FA] truncate">
                          {tool.name}
                        </div>
                        <div className="text-xs text-[#F8F9FA]/55 truncate">{tool.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
