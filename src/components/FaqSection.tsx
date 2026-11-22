import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/agencyData';
import { AGENCY_EASE, Reveal, StaggerGrid, StaggerItem } from './MotionPrimitives';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#0A0D24] border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-sm font-medium text-[#00E5C7] mb-3">FAQ</p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA] mb-5"
            >
              Clear Answers Before We Kick Off.
            </h2>
            <p className="text-base text-[#F8F9FA]/70 leading-relaxed">
              Everything founders and marketing directors ask about pricing structure, ownership,
              reporting transparency, and paid ad testing.
            </p>
          </Reveal>

          <StaggerGrid className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <StaggerItem key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] rounded"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-[#F8F9FA] group-hover:text-[#00E5C7] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#00E5C7] shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: AGENCY_EASE }}
                        className="pb-6 pr-8 text-sm sm:text-base text-[#F8F9FA]/75 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
