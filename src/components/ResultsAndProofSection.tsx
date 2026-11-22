import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, IMAGES, TESTIMONIALS, WHY_ZEED } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';
import { AGENCY_EASE, Reveal, StaggerGrid, StaggerItem, VIEWPORT_CONFIG } from './MotionPrimitives';

export function ResultsAndProofSection() {
  return (
    <section id="results" className="bg-[#07091B] border-b border-white/10">
      {/* Case Studies Block */}
      <div className="py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-14">
            <Reveal className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-sm font-medium text-[#00E5C7] mb-3">Results & Case Studies</p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA] mb-5"
              >
                Proof Over Promises. Measured Across Organic Reach and Paid Return.
              </h2>
              <p className="text-base text-[#F8F9FA]/75 leading-relaxed max-w-[62ch] mb-6">
                Every growth engagement is tracked against real business outcomes—qualified pipeline,
                booked consultations, course revenue, and blended ROAS across Meta, TikTok, and LinkedIn.
              </p>
              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5B700] hover:text-[#00E5C7] transition-colors py-1"
                >
                  <span>Request a custom audit for your brand</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5 flex">
              <div className="relative w-full min-h-[240px] lg:h-full rounded-xl overflow-hidden border border-white/12 bg-[#0F1433]">
                <ResilientImage
                  src={IMAGES.caseDashboard}
                  alt="Zeed.MGTS creative director desk showing social growth and Meta Ads ROAS analytics"
                  className="w-full h-full object-cover"
                  fallbackLabel="Zeed.MGTS Live Attribution Dashboard"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#07091B]/90 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F8F9FA]/85">
                  <span>Real-Time Creative & ROAS Attribution</span>
                  <span className="font-mono tabular-nums text-[#00E5C7]">24/7 Client View</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 4 Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((study, idx) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: AGENCY_EASE }}
                whileHover={{ y: -3, transition: { duration: 0.16, ease: AGENCY_EASE } }}
                className="p-6 sm:p-8 rounded-xl bg-[#0F1433] border border-white/10 hover:border-[#00E5C7]/40 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs text-[#F8F9FA]/60 pb-4 mb-6 border-b border-white/10">
                    <span className="font-medium text-[#F8F9FA]/85">{study.industry}</span>
                    <span className="font-mono tabular-nums">
                      {study.clientType} <span aria-hidden="true">·</span> {study.timeframe}
                    </span>
                  </div>

                  {/* Quantified Big Numbers */}
                  <div className="grid grid-cols-2 gap-6 mb-7">
                    <div>
                      <div className="font-display font-bold text-3xl sm:text-4xl text-[#F5B700] font-mono tabular-nums tracking-tight">
                        {study.headlineMetric}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#F8F9FA]/75 mt-1">
                        {study.headlineLabel}
                      </div>
                    </div>

                    <div className="pl-5 border-l border-white/10">
                      <div className="font-display font-bold text-3xl sm:text-4xl text-[#00E5C7] font-mono tabular-nums tracking-tight">
                        {study.secondaryMetric}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#F8F9FA]/75 mt-1">
                        {study.secondaryLabel}
                      </div>
                    </div>
                  </div>

                  {/* Challenge & Execution */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-[#F8F9FA]/50 mb-1">Challenge</h3>
                      <p className="text-sm text-[#F8F9FA]/75 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-[#00E5C7] mb-1">What We Did</h3>
                      <p className="text-sm text-[#F8F9FA]/85 leading-relaxed">{study.whatWeDid}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Why Brands Choose Zeed */}
      <div className="py-16 sm:py-24 bg-[#0A0D24] border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <p className="text-sm font-medium text-[#00E5C7] mb-3">Why Brands Choose Zeed</p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA] mb-5"
              >
                Built Like an Embedded Growth Partner, Not an Outsourced Vendor.
              </h2>
              <p className="text-base text-[#F8F9FA]/70 leading-relaxed">
                Serious brands partner with Zeed.MGTS because fragmented freelancers and slow legacy
                agencies cannot connect creative velocity with paid media accountability.
              </p>
            </Reveal>

            <StaggerGrid className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
              {WHY_ZEED.map((item) => (
                <StaggerItem key={item.number} className="py-5 sm:py-6 flex items-start gap-5">
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#F5B700] pt-0.5 shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[#F8F9FA] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#F8F9FA]/70 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 sm:py-24 bg-[#07091B]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-medium text-[#00E5C7] mb-3">Client Proof</p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA]"
              >
                What Founders & Growth Leaders Say.
              </h2>
            </div>
            <p className="text-sm text-[#F8F9FA]/60">
              Verified outcomes across DTC, B2B SaaS, Coaching & Multi-Location Services
            </p>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.07}>
            {TESTIMONIALS.map((item) => (
              <StaggerItem key={item.id}>
                <blockquote className="h-full p-6 sm:p-8 rounded-xl bg-[#0F1433] border border-white/10 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-xs font-medium tabular-nums text-[#F5B700] mb-4">
                      {item.outcome}
                    </p>
                    <p className="text-base text-[#F8F9FA]/85 leading-relaxed mb-8">
                      “{item.quote}”
                    </p>
                  </div>

                  <footer className="flex items-center gap-4 pt-5 border-t border-white/10">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/15 shrink-0 bg-[#151B42]">
                      <ResilientImage
                        src={item.image}
                        alt={`${item.name}, ${item.role} at ${item.company}`}
                        className="w-full h-full object-cover"
                        fallbackMonogram={item.initials}
                        fallbackLabel={item.name}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-base text-[#F8F9FA] truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-[#F8F9FA]/60 truncate">
                        {item.role} <span aria-hidden="true">·</span> {item.company}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
