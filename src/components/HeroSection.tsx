import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingUp, BarChart3, Share2, Video } from 'lucide-react';
import { BRAND_LOGOS, IMAGES } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';
import { AGENCY_EASE } from './MotionPrimitives';

const TRUST_METRICS = [
  { value: '50+', label: 'Brands Scaled', context: 'DTC, B2B SaaS, Coaching & Local' },
  { value: '8-Figure', label: 'Ad Spend Managed', context: 'Meta, TikTok, LinkedIn & Pinterest' },
  { value: '300%+', label: 'Average Engagement Growth', context: 'Measured within first 90 days' },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#07091B] border-b border-white/10 pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Subtle atmospheric teal and sovereign gold gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[640px] h-[640px] rounded-full bg-[#00E5C7]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-32 w-[480px] h-[480px] rounded-full bg-[#F5B700]/6 blur-3xl"
      />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: AGENCY_EASE }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-sm font-medium text-[#00E5C7] tracking-wide mb-5">
              Strategic Social <span aria-hidden="true" className="text-white/30 mx-1.5">·</span> Scalable Growth{' '}
              <span aria-hidden="true" className="text-white/30 mx-1.5">·</span> Measurable Results
            </p>

            <h1
              style={{ textWrap: 'balance' }}
              className="font-display font-bold tracking-tight text-[#F8F9FA] text-[clamp(2.25rem,4.3vw,3.85rem)] leading-[1.06] mb-6"
            >
              We Don’t Just Manage Social Media. We Build Brands That Dominate.
            </h1>

            <p className="text-base sm:text-lg text-[#F8F9FA]/75 leading-relaxed max-w-[60ch] mb-8">
              Full-service social media management, content direction, paid ads, and growth systems for ambitious brands.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-semibold text-[#07091B] bg-[#F5B700] hover:bg-[#FFC72C] rounded-lg transition-transform duration-150 active:scale-[0.99] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#results"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-medium text-[#F8F9FA] bg-[#0F1433] hover:bg-[#151B42] border border-white/15 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
              >
                <Play className="w-4 h-4 text-[#00E5C7]" aria-hidden="true" />
                <span>View Our Work</span>
              </a>
            </div>
          </motion.div>

          {/* Visual Carrier (16:9 / Stretched Architectural Studio Frame) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: AGENCY_EASE }}
            className="lg:col-span-5 relative flex flex-col"
          >
            <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] lg:min-h-full rounded-xl overflow-hidden border border-white/12 bg-[#0F1433]">
              <ResilientImage
                src={IMAGES.heroStudio}
                alt="Zeed Management creative command studio showing social growth analytics and cinema production gear"
                className="w-full h-full object-cover"
                fallbackLabel="Zeed.MGTS Creative Studio"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#07091B]/90 via-[#07091B]/25 to-transparent"
              />

              {/* Subtle floating social channel glyphs (compositor-only transforms) */}
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute top-4 right-4 items-center gap-2.5 animate-float-slow"
              >
                <div className="w-10 h-10 rounded-lg bg-[#07091B]/85 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#00E5C7]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#07091B]/85 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#F5B700]">
                  <Video className="w-4 h-4" />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="hidden sm:flex absolute bottom-20 left-4 items-center gap-2.5 animate-float-reverse"
              >
                <div className="w-10 h-10 rounded-lg bg-[#07091B]/85 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#00E5C7]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#07091B]/85 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#F8F9FA]">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>

              {/* Clean bottom caption inside studio frame */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-xs text-[#F8F9FA]/85">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-white overflow-hidden border border-white/25 shrink-0">
                    <img
                      src={BRAND_LOGOS.iconMark}
                      alt=""
                      className="w-full h-full object-cover scale-125"
                    />
                  </span>
                  <span className="font-medium">Zeed.MGTS Performance Lab</span>
                </div>
                <span className="font-mono tabular-nums text-[#00E5C7]">Organic + Paid Under One Roof</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 3-Column Trust Strip Below Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: AGENCY_EASE }}
          className="mt-12 lg:mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {TRUST_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col justify-between ${
                idx < TRUST_METRICS.length - 1 ? 'md:border-r md:border-white/10 md:pr-6' : ''
              }`}
            >
              <div className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F5B700] font-mono tabular-nums">
                {metric.value}
              </div>
              <div className="text-base font-semibold text-[#F8F9FA] mt-1.5">{metric.label}</div>
              <div className="text-xs text-[#F8F9FA]/60 mt-1">{metric.context}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
