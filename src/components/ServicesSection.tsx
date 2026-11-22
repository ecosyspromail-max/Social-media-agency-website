import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Clapperboard,
  PenTool,
  MessageSquare,
  Target,
  Users,
  BarChart2,
  BookOpen,
  ShieldCheck,
  Crown,
  ArrowUpRight,
  Check,
  Plus,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import {
  INTENSITY_OPTIONS,
  ORGANIZATION_TIERS,
  SERVICES,
  SOCIAL_GOALS,
  type CustomScopePayload,
  type OrganizationTierId,
  type ServiceIntensity,
  type ServiceItem,
  type SocialGoalId,
} from '../data/agencyData';
import { AGENCY_EASE, Reveal, VIEWPORT_CONFIG } from './MotionPrimitives';

type FilterCategory = 'all' | 'organic' | 'paid' | 'system';

const FILTER_OPTIONS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'organic', label: 'Organic & Content' },
  { id: 'paid', label: 'Paid & Growth' },
  { id: 'system', label: 'Systems & Takeover' },
];

const SERVICE_ICONS: Record<string, typeof Compass> = {
  'full-takeover': Crown,
  'strategy-audit': Compass,
  'content-creation': Clapperboard,
  'script-hook': PenTool,
  'paid-social': Target,
  'community-management': MessageSquare,
  'influencer-partnerships': Users,
  'analytics-reporting': BarChart2,
  'brand-voice': BookOpen,
  'crisis-management': ShieldCheck,
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ServicesSectionProps {
  onBookScope?: (payload: CustomScopePayload) => void;
}

export function ServicesSection({ onBookScope }: ServicesSectionProps) {
  const [orgTierId, setOrgTierId] = useState<OrganizationTierId>('ecommerce');
  const [goalFilter, setGoalFilter] = useState<SocialGoalId>('all');
  const [disciplineFilter, setDisciplineFilter] = useState<FilterCategory>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(['content-creation', 'paid-social']);
  const [serviceIntensities, setServiceIntensities] = useState<Record<string, ServiceIntensity>>({});
  const [customNotes, setCustomNotes] = useState('');

  const activeOrg = useMemo(
    () => ORGANIZATION_TIERS.find((t) => t.id === orgTierId) ?? ORGANIZATION_TIERS[1],
    [orgTierId]
  );

  const activeGoal = useMemo(
    () => SOCIAL_GOALS.find((g) => g.id === goalFilter) ?? SOCIAL_GOALS[0],
    [goalFilter]
  );

  const filteredServices: ServiceItem[] = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesDiscipline =
        disciplineFilter === 'all' || service.category === disciplineFilter;
      const matchesGoal = goalFilter === 'all' || service.goals.includes(goalFilter);
      return matchesDiscipline && matchesGoal;
    });
  }, [disciplineFilter, goalFilter]);

  const getIntensity = (serviceId: string): ServiceIntensity =>
    serviceIntensities[serviceId] ?? 'core';

  const getCalculatedRate = (service: ServiceItem, intensity: ServiceIntensity): number => {
    const intensityOpt =
      INTENSITY_OPTIONS.find((opt) => opt.id === intensity) ?? INTENSITY_OPTIONS[0];
    const raw = service.baseRate * activeOrg.rateMultiplier * intensityOpt.multiplier;
    return Math.round(raw / 50) * 50;
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const updateServiceIntensity = (serviceId: string, intensity: ServiceIntensity) => {
    setServiceIntensities((prev) => ({ ...prev, [serviceId]: intensity }));
    if (!selectedIds.includes(serviceId)) {
      setSelectedIds((prev) => [...prev, serviceId]);
    }
  };

  const selectedServicesData = useMemo(() => {
    return SERVICES.filter((s) => selectedIds.includes(s.id)).map((service) => {
      const intensity = getIntensity(service.id);
      const intensityObj =
        INTENSITY_OPTIONS.find((opt) => opt.id === intensity) ?? INTENSITY_OPTIONS[0];
      const amount = getCalculatedRate(service, intensity);
      const rateLabel = activeOrg.isCustomQuote
        ? `Custom (${formatCurrency(amount)}+/${service.rateUnit === 'mo' ? 'mo' : 'project'})`
        : `${formatCurrency(amount)}/${service.rateUnit === 'mo' ? 'mo' : 'one-time'}`;

      return {
        service,
        intensity,
        intensityLabel: intensityObj.label,
        amount,
        rateLabel,
      };
    });
  }, [selectedIds, serviceIntensities, activeOrg]);

  const { monthlyTotal, oneTimeTotal, estimatedSummary } = useMemo(() => {
    const monthly = selectedServicesData
      .filter((item) => item.service.rateUnit === 'mo')
      .reduce((sum, item) => sum + item.amount, 0);
    const oneTime = selectedServicesData
      .filter((item) => item.service.rateUnit === 'one-time')
      .reduce((sum, item) => sum + item.amount, 0);

    if (selectedServicesData.length === 0) {
      return {
        monthlyTotal: 0,
        oneTimeTotal: 0,
        estimatedSummary: 'Select services above to estimate your custom rate',
      };
    }

    if (activeOrg.isCustomQuote) {
      return {
        monthlyTotal: monthly,
        oneTimeTotal: oneTime,
        estimatedSummary: `Custom Enterprise Quote (Est. ${formatCurrency(monthly)}+/mo)`,
      };
    }

    const parts: string[] = [];
    if (monthly > 0) parts.push(`${formatCurrency(monthly)}/mo`);
    if (oneTime > 0) parts.push(`${formatCurrency(oneTime)} one-time setup`);

    return {
      monthlyTotal: monthly,
      oneTimeTotal: oneTime,
      estimatedSummary: parts.join(' + '),
    };
  }, [selectedServicesData, activeOrg]);

  const handleBookScope = (focusSingleService?: ServiceItem) => {
    let payloadServices = selectedServicesData.map((item) => ({
      id: item.service.id,
      title: item.service.title,
      intensityLabel: item.intensityLabel,
      rateLabel: item.rateLabel,
    }));

    let summary = estimatedSummary;

    if (focusSingleService && !selectedIds.includes(focusSingleService.id)) {
      const intensity = getIntensity(focusSingleService.id);
      const intensityObj =
        INTENSITY_OPTIONS.find((opt) => opt.id === intensity) ?? INTENSITY_OPTIONS[0];
      const amount = getCalculatedRate(focusSingleService, intensity);
      const rateLabel = activeOrg.isCustomQuote
        ? `Custom (${formatCurrency(amount)}+/${focusSingleService.rateUnit === 'mo' ? 'mo' : 'project'})`
        : `${formatCurrency(amount)}/${focusSingleService.rateUnit === 'mo' ? 'mo' : 'one-time'}`;

      payloadServices = [
        ...payloadServices,
        {
          id: focusSingleService.id,
          title: focusSingleService.title,
          intensityLabel: intensityObj.label,
          rateLabel,
        },
      ];
      setSelectedIds((prev) => [...prev, focusSingleService.id]);
      summary = activeOrg.isCustomQuote
        ? `Custom Enterprise Quote`
        : `${formatCurrency(
            (focusSingleService.rateUnit === 'mo' ? monthlyTotal + amount : monthlyTotal)
          )}/mo`;
    }

    if (onBookScope) {
      onBookScope({
        organizationId: activeOrg.id,
        organizationLabel: activeOrg.label,
        goalId: activeGoal.id,
        goalLabel: activeGoal.label,
        services: payloadServices,
        estimatedSummary: summary,
        customNotes: customNotes.trim(),
      });
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setGoalFilter('all');
    setDisciplineFilter('all');
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#0A0D24] border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-medium text-[#00E5C7] mb-3">
              Services, Goals & Custom Rate Configurator
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-[#F8F9FA] max-w-2xl"
            >
              Filter by Organization Type & Goal. Update Scope in Real Time.
            </h2>
          </div>

          <p className="text-sm text-[#F8F9FA]/65 max-w-md leading-relaxed">
            Every business, brand, and organization receives tailored service rates based on channel
            complexity. Filter by your primary growth objective and customize your active scope below.
          </p>
        </Reveal>

        {/* Multi-Dimensional Filter Controls */}
        <div className="space-y-6 pb-10 mb-10 border-b border-white/10">
          {/* 1. Organization / Brand Rate Tier Filter */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-[#F8F9FA]/80">
                01. Organization / Brand Type <span aria-hidden="true" className="text-white/30 mx-1">·</span>{' '}
                <span className="font-normal text-[#00E5C7]">{activeOrg.rateNote}</span>
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label="Select organization or brand type for tailored service rates"
              className="flex flex-wrap items-center gap-2"
            >
              {ORGANIZATION_TIERS.map((tier) => {
                const isActive = orgTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setOrgTierId(tier.id)}
                    className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                      isActive
                        ? 'bg-[#00E5C7] text-[#07091B] border-[#00E5C7] font-semibold'
                        : 'bg-[#0F1433] text-[#F8F9FA]/75 border-white/10 hover:text-[#F8F9FA] hover:border-white/25'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Social Media Goal Filter & Discipline Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="mb-3">
                <span className="text-xs font-semibold text-[#F8F9FA]/80">
                  02. Target Growth Goal <span aria-hidden="true" className="text-white/30 mx-1">·</span>{' '}
                  <span className="font-normal text-[#F8F9FA]/60">{activeGoal.outcomeSummary}</span>
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Filter services by target social media goal"
                className="flex flex-wrap items-center gap-2"
              >
                {SOCIAL_GOALS.map((goal) => {
                  const isActive = goalFilter === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setGoalFilter(goal.id)}
                      className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                        isActive
                          ? 'bg-[#F8F9FA] text-[#07091B] border-[#F8F9FA] font-semibold'
                          : 'bg-[#0F1433] text-[#F8F9FA]/75 border-white/10 hover:text-[#F8F9FA] hover:border-white/25'
                      }`}
                    >
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mb-3">
                <span className="text-xs font-semibold text-[#F8F9FA]/80">
                  03. Service Discipline
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Filter services by discipline"
                className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-[#0F1433] border border-white/10 rounded-lg"
              >
                {FILTER_OPTIONS.map((option) => {
                  const isActive = disciplineFilter === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setDisciplineFilter(option.id)}
                      className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                        isActive
                          ? 'bg-[#151B42] text-[#00E5C7] font-semibold'
                          : 'text-[#F8F9FA]/70 hover:text-[#F8F9FA] hover:bg-white/5'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        {filteredServices.length === 0 ? (
          <div className="p-10 rounded-xl bg-[#0F1433] border border-white/10 text-center space-y-4">
            <p className="text-base font-medium text-[#F8F9FA]">
              No services match that exact Goal and Discipline combination.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#00E5C7] text-[#07091B] text-sm font-semibold hover:bg-[#19f5d8] transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reset Goal & Discipline Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service, idx) => {
              const Icon = SERVICE_ICONS[service.id] ?? Compass;
              const isSelected = selectedIds.includes(service.id);
              const intensity = getIntensity(service.id);
              const rateAmount = getCalculatedRate(service, intensity);
              const spanClass =
                disciplineFilter === 'all' && goalFilter === 'all' && service.featured
                  ? 'lg:col-span-2'
                  : 'lg:col-span-1';

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.04, 0.25),
                    ease: AGENCY_EASE,
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.16, ease: AGENCY_EASE } }}
                  className={`${spanClass} flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[#0F1433] border transition-colors duration-150 ${
                    isSelected ? 'border-[#00E5C7]/60' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <div>
                    {/* Unboxed Metadata + Tailored Rate */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#F8F9FA]/60">
                        <span className="font-mono tabular-nums text-[#F5B700] font-semibold">
                          {service.number}
                        </span>
                        <span aria-hidden="true">/</span>
                        <span>{service.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums font-semibold text-[#F8F9FA]">
                          {activeOrg.isCustomQuote
                            ? `From ${formatCurrency(rateAmount)}/${service.rateUnit === 'mo' ? 'mo' : 'project'}`
                            : `${formatCurrency(rateAmount)}/${service.rateUnit === 'mo' ? 'mo' : 'one-time'}`}
                        </span>
                      </div>

                      <div className="w-10 h-10 rounded-lg bg-[#151B42] border border-white/10 flex items-center justify-center text-[#00E5C7] shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-xl text-[#F8F9FA] mb-2.5 leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#F8F9FA]/70 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Active Scope Tier Updater */}
                    <div className="pt-4 border-t border-white/8 mb-5">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-medium text-[#F8F9FA]/55">
                          Update Scope Tier
                        </span>
                        <span className="text-xs text-[#00E5C7] truncate">
                          {service.scopePresets[intensity]}
                        </span>
                      </div>

                      <div
                        role="group"
                        aria-label={`Update intensity tier for ${service.title}`}
                        className="grid grid-cols-3 gap-1.5"
                      >
                        {INTENSITY_OPTIONS.map((opt) => {
                          const activeTier = intensity === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => updateServiceIntensity(service.id, opt.id)}
                              className={`px-2 py-1.5 min-h-[34px] text-[11px] font-medium rounded-md border transition-colors whitespace-nowrap truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                                activeTier
                                  ? 'bg-[#151B42] border-[#00E5C7]/60 text-[#00E5C7] font-semibold'
                                  : 'bg-[#07091B] border-white/10 text-[#F8F9FA]/60 hover:text-[#F8F9FA]'
                              }`}
                            >
                              {opt.id === 'core'
                                ? 'Core'
                                : opt.id === 'accelerated'
                                ? 'Scale'
                                : 'Dedicated'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="pt-4 border-t border-white/8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleServiceSelection(service.id)}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] ${
                        isSelected
                          ? 'bg-[#00E5C7]/15 text-[#00E5C7] border border-[#00E5C7]/50 hover:bg-[#00E5C7]/25'
                          : 'bg-[#151B42] text-[#F8F9FA] border border-white/12 hover:border-white/30'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>In Custom Scope</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add to Scope</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookScope(service)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#F8F9FA]/80 hover:text-[#F5B700] transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7] rounded"
                    >
                      <span>Book for Info</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Live Custom Scope & Rate Summary Bar */}
        <Reveal className="mt-10 p-6 sm:p-8 rounded-xl bg-[#0F1433] border border-white/12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F8F9FA]">
                    Your Customized Scope & Organization Rate Estimate
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F8F9FA]/60 mt-1">
                    {activeOrg.label} <span aria-hidden="true">·</span> {activeGoal.label}{' '}
                    <span aria-hidden="true">·</span>{' '}
                    <span className="font-mono tabular-nums text-[#00E5C7]">
                      {selectedServicesData.length} active service
                      {selectedServicesData.length === 1 ? '' : 's'}
                    </span>
                  </p>
                </div>

                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="text-xs font-medium text-[#F8F9FA]/55 hover:text-[#FF6B6B] transition-colors py-1"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {selectedServicesData.length === 0 ? (
                <p className="text-sm text-[#F8F9FA]/60 py-2">
                  Select one or more services above to configure your tailored rate or book a custom
                  discovery call.
                </p>
              ) : (
                <div className="divide-y divide-white/8">
                  {selectedServicesData.map(({ service, intensityLabel, rateLabel }) => (
                    <div
                      key={service.id}
                      className="py-2.5 flex items-center justify-between gap-4 text-sm"
                    >
                      <div className="min-w-0">
                        <span className="font-medium text-[#F8F9FA] truncate block sm:inline">
                          {service.title}
                        </span>
                        <span className="text-xs text-[#F8F9FA]/55 sm:ml-2">
                          ({intensityLabel})
                        </span>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-mono text-xs sm:text-sm font-semibold tabular-nums text-[#00E5C7]">
                          {rateLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleServiceSelection(service.id)}
                          aria-label={`Remove ${service.title} from scope`}
                          className="text-xs text-[#F8F9FA]/45 hover:text-[#FF6B6B] transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label
                  htmlFor="scope-custom-notes"
                  className="block text-xs font-medium text-[#F8F9FA]/70 mb-2"
                >
                  Optional Deliverable Updates / Channel Requirements
                </label>
                <input
                  id="scope-custom-notes"
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g., Focus on TikTok + LinkedIn, 20 Reels/mo, or multi-region ad accounts..."
                  className="w-full px-4 py-2.5 min-h-[42px] rounded-lg bg-[#07091B] border border-white/12 text-sm text-[#F8F9FA] placeholder:text-[#F8F9FA]/35 focus:outline-none focus:border-[#00E5C7] transition-colors"
                />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-medium text-[#F8F9FA]/55 mb-1">
                  Estimated Investment ({activeOrg.label})
                </p>
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#F5B700] font-mono tabular-nums tracking-tight">
                  {estimatedSummary}
                </div>
                <p className="text-xs text-[#F8F9FA]/60 mt-2 leading-relaxed">
                  Final pricing is confirmed after a 30-minute channel audit. Multi-service
                  retainers qualify for bundled production efficiencies.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleBookScope()}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[50px] rounded-lg bg-[#F5B700] hover:bg-[#FFC72C] text-[#07091B] font-semibold text-sm sm:text-base transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Schedule Call for Exact Rate & Info</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
