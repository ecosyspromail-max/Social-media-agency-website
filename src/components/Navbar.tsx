import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_LOGOS } from '../data/agencyData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07091B]/92 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Emblem + Single-line Wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-[#F8F9FA] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] rounded"
        >
          <span className="w-8 h-8 rounded-full bg-white overflow-hidden border border-white/20 flex items-center justify-center shrink-0">
            <img
              src={BRAND_LOGOS.iconMark}
              alt="Zeed Management emblem"
              className="w-full h-full object-cover scale-125"
            />
          </span>
          <span>
            Zeed<span className="text-[#F5B700]">.</span>MGTS
          </span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#F8F9FA]/75"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#F8F9FA] border-b border-transparent hover:border-[#00E5C7] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2.5 min-h-[40px] text-sm font-semibold text-[#07091B] bg-[#F5B700] hover:bg-[#FFC72C] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
          >
            Book a Call
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/12 text-[#F8F9FA] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#0F1433] border-t border-white/10 px-4 py-4 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="px-3 py-3 min-h-[44px] flex items-center text-sm font-medium text-[#F8F9FA]/85 hover:text-[#00E5C7] hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
