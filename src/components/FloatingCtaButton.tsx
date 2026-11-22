import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AGENCY_EASE } from './MotionPrimitives';

export function FloatingCtaButton() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('top');
    if (!heroEl) {
      return;
    }

    const updateVisibility = () => {
      const rect = heroEl.getBoundingClientRect();
      // Show only once the hero section has scrolled above the sticky navbar
      setPastHero(rect.bottom <= 72);
    };

    const observer = new IntersectionObserver(
      () => {
        updateVisibility();
      },
      { threshold: [0, 0.05, 0.1] }
    );

    observer.observe(heroEl);
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  const handleClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.div
          key="floating-strategy-cta"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.24, ease: AGENCY_EASE }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            whileHover={{ y: -2, transition: { duration: 0.15, ease: AGENCY_EASE } }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 min-h-[44px] rounded-lg bg-[#F5B700] hover:bg-[#FFC72C] text-[#07091B] text-sm font-semibold shadow-lg shadow-black/50 border border-black/15 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
