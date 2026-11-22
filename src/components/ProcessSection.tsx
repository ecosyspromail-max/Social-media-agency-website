import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/agencyData';
import { AGENCY_EASE, Reveal, StaggerGrid, StaggerItem } from './MotionPrimitives';

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeIndex];

  return (
    <section id="process" className="py-16 sm:py-24 bg-[#0A0D24] border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#00E5C7] mb-3">Our Process</p>
          <h2
            style={{ textWrap: 'balance' }}
            className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA]"
          >
            From Audit to Predictable Scale in Seven Disciplined Phases.
          </h2>
        </Reveal>

        {/* 7-Step Interactive Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Vertical Stepper Timeline */}
          <StaggerGrid className="lg:col-span-7 space-y-3" staggerDelay={0.05}>
            {PROCESS_STEPS.map((step, index) => {
              const isSelected = index === activeIndex;
              return (
                <StaggerItem key={step.number}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={isSelected ? 'step' : undefined}
                    className={`w-full text-left p-5 rounded-xl border transition-colors duration-150 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                      isSelected
                        ? 'bg-[#151B42] border-[#00E5C7]/60'
                        : 'bg-[#0F1433] border-white/8 hover:border-white/20'
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-semibold tabular-nums pt-0.5 shrink-0 ${
                        isSelected ? 'text-[#F5B700]' : 'text-[#F8F9FA]/45'
                      }`}
                    >
                      {step.number}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display font-semibold text-base sm:text-lg text-[#F8F9FA]">
                          {step.title}
                        </h3>
                        <span className="font-mono text-xs tabular-nums text-[#F8F9FA]/50 shrink-0">
                          {step.cadence}
                        </span>
                      </div>
                      <p className="text-sm text-[#F8F9FA]/65 mt-1.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerGrid>

          {/* Right: Active Phase Deep Dive Card */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:sticky lg:top-24 p-6 sm:p-8 rounded-xl bg-[#0F1433] border border-white/12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.number}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: AGENCY_EASE }}
              >
                <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#F5B700]">
                    Phase {activeStep.number} of 07
                  </span>
                  <span className="font-mono text-xs tabular-nums text-[#F8F9FA]/60">
                    {activeStep.cadence}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#F8F9FA] mb-4">
                  {activeStep.title}
                </h3>

                <p className="text-sm sm:text-base text-[#F8F9FA]/75 leading-relaxed mb-6">
                  {activeStep.description}
                </p>

                <div className="pt-5 border-t border-white/10">
                  <p className="text-xs font-medium text-[#F8F9FA]/55 mb-3.5">
                    Phase Deliverables & Outputs
                  </p>
                  <ul className="space-y-3">
                    {activeStep.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#F8F9FA]/90">
                        <CheckCircle2 className="w-4 h-4 text-[#00E5C7] shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                className="px-3.5 py-2 min-h-[40px] text-xs font-medium rounded-lg border border-white/12 text-[#F8F9FA]/80 hover:bg-white/5 disabled:opacity-35 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
              >
                Previous Step
              </button>
              <button
                type="button"
                disabled={activeIndex === PROCESS_STEPS.length - 1}
                onClick={() => setActiveIndex((i) => Math.min(PROCESS_STEPS.length - 1, i + 1))}
                className="px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg bg-[#00E5C7] text-[#07091B] hover:bg-[#19f5d8] disabled:opacity-35 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
              >
                Next Step
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
