import { BRAND_LOGOS, IMAGES } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';
import { Reveal, StaggerGrid, StaggerItem } from './MotionPrimitives';

const CORE_VALUES = [
  {
    number: '01',
    title: 'Strategy First',
    description:
      'Every hook, shoot day, and ad dollar traces back to audience psychology, unit economics, and conversion intent.',
  },
  {
    number: '02',
    title: 'Creative Excellence',
    description:
      'Attention is earned in the first three seconds. We craft studio-caliber visuals and scripts built to stop the scroll.',
  },
  {
    number: '03',
    title: 'Transparent Reporting',
    description:
      'Zero vanity metrics or hidden retainers. Real-time attribution dashboards and honest weekly creative breakdowns.',
  },
  {
    number: '04',
    title: 'Obsessive Optimization',
    description:
      'Retention curves, thumb-stop ratios, and blended ROAS guide relentless weekly iteration across every channel.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#07091B] border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Studio Team Photography */}
          <Reveal className="lg:col-span-5 flex" delay={0.05}>
            <div className="relative w-full min-h-[320px] lg:h-full rounded-xl overflow-hidden border border-white/12 bg-[#0F1433]">
              <ResilientImage
                src={IMAGES.aboutTeam}
                alt="Zeed Management strategists and creative directors reviewing storyboards and social analytics"
                className="w-full h-full object-cover"
                fallbackLabel="Zeed Management Leadership & Creative Team"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#07091B]/90 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#00E5C7]">Who We Are</p>
                  <p className="text-sm font-semibold text-[#F8F9FA] mt-0.5">
                    Strategists, Directors & Media Buyers
                  </p>
                </div>
                <span className="font-mono text-xs tabular-nums text-[#F8F9FA]/75">Est. Zeed.MGTS</span>
              </div>
            </div>
          </Reveal>

          {/* Story & Core Values */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <p className="text-sm font-medium text-[#00E5C7]">About Zeed Management</p>
                <div className="inline-flex items-center bg-white rounded-lg px-3 py-1.5 border border-white/20">
                  <img
                    src={BRAND_LOGOS.fullWordmark}
                    alt="ZEED Mgt Official Logo"
                    className="h-6 sm:h-7 w-auto object-contain"
                  />
                </div>
              </div>

              <h2
                style={{ textWrap: 'balance' }}
                className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA] leading-tight mb-6"
              >
                Every Account Engineered Like a High-Performance Growth Engine.
              </h2>

              <p className="text-base sm:text-lg text-[#F8F9FA]/80 leading-relaxed max-w-[65ch] mb-10">
                Zeed Management is a results-obsessed social media agency that treats every account like a
                high-performance growth engine. We combine creative strategy, data-driven decision making, and
                flawless execution.
              </p>
            </Reveal>

            {/* 4 Core Values */}
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-white/10">
              {CORE_VALUES.map((value) => (
                <StaggerItem key={value.number} className="flex flex-col">
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span className="font-mono text-xs font-medium tabular-nums text-[#F5B700]">
                      {value.number}.
                    </span>
                    <h3 className="font-display font-semibold text-lg text-[#F8F9FA]">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#F8F9FA]/65 leading-relaxed">{value.description}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
