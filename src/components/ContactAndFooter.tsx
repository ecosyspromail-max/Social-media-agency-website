import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Calendar, Check, Copy, Mail, MessageCircle } from 'lucide-react';
import {
  BRAND_LOGOS,
  ORGANIZATION_TIERS,
  SOCIAL_GOALS,
  type CustomScopePayload,
  type OrganizationTierId,
  type SocialGoalId,
} from '../data/agencyData';
import { Reveal } from './MotionPrimitives';

interface ContactAndFooterProps {
  selectedScope?: CustomScopePayload | null;
}

const SOCIAL_CHANNELS = [
  { name: 'Instagram', handle: '@Zeed.mgts', href: 'https://instagram.com/Zeed.mgts' },
  { name: 'TikTok', handle: '@Zeed.mgts', href: 'https://tiktok.com/@Zeed.mgts' },
  { name: 'LinkedIn', handle: '@Zeed.mgts', href: 'https://linkedin.com/company/zeed-mgts' },
  { name: 'Twitter / X', handle: '@Zeed.mgts', href: 'https://x.com/Zeed_mgts' },
];

const CALL_WINDOWS = [
  'Next Available (Within 24h)',
  'Weekday Morning (9am–12pm)',
  'Weekday Afternoon (1pm–4pm)',
  'Late Afternoon (4pm–6pm)',
];

export function ContactAndFooter({ selectedScope }: ContactAndFooterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [handleOrSite, setHandleOrSite] = useState('');
  const [orgType, setOrgType] = useState<OrganizationTierId>('ecommerce');
  const [primaryGoal, setPrimaryGoal] = useState<SocialGoalId>('sales');
  const [preferredWindow, setPreferredWindow] = useState(CALL_WINDOWS[0]);
  const [goal, setGoal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!selectedScope) return;

    setOrgType(selectedScope.organizationId);
    if (selectedScope.goalId !== 'all') {
      setPrimaryGoal(selectedScope.goalId);
    }

    const serviceLines = selectedScope.services
      .map((s) => `- ${s.title} (${s.intensityLabel} · ${s.rateLabel})`)
      .join('\n');

    const notesLine = selectedScope.customNotes
      ? `\nCustom requirements: ${selectedScope.customNotes}`
      : '';

    setGoal(
      `Organization Tier: ${selectedScope.organizationLabel}\nTarget Goal: ${selectedScope.goalLabel}\nEstimated Scope: ${selectedScope.estimatedSummary}\nRequested Services:\n${serviceLines}${notesLine}`
    );
    setSubmitted(false);
  }, [selectedScope]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedGoal = goal.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      setErrorMsg('Please enter your name so we know who to address.');
      return;
    }
    if (!emailPattern.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid work or brand email address.');
      return;
    }
    if (!trimmedGoal) {
      setErrorMsg('Please share your primary social media goal for the next 90 days.');
      return;
    }

    setSubmitted(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('zeedmgt@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setHandleOrSite('');
    setGoal('');
    setErrorMsg('');
    setSubmitted(false);
  };

  const activeOrgLabel =
    ORGANIZATION_TIERS.find((t) => t.id === orgType)?.label ?? 'E-Commerce & DTC Brands';

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 bg-[#07091B] border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Headline & Direct Channels */}
            <Reveal className="lg:col-span-5">
              <p className="text-sm font-medium text-[#00E5C7] mb-3">Schedule & Book More Info</p>
              <h2
                style={{ textWrap: 'balance' }}
                className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] text-[#F8F9FA] mb-5"
              >
                Ready to Stop Guessing and Start Growing?
              </h2>
              <p className="text-base text-[#F8F9FA]/75 leading-relaxed mb-8">
                Schedule a strategy session tailored to your organization type, growth goal, and
                exact service scope. Our senior team responds within one business day with audit
                notes and custom pricing.
              </p>

              {/* Direct Contact Actions */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1433] border border-white/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#151B42] border border-white/10 flex items-center justify-center text-[#00E5C7] shrink-0">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-[#F8F9FA]/55">Direct Agency Email</div>
                      <a
                        href="mailto:zeedmgt@gmail.com"
                        className="text-sm font-semibold text-[#F8F9FA] hover:text-[#00E5C7] transition-colors truncate block"
                      >
                        zeedmgt@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy zeedmgt@gmail.com email address"
                    className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg border border-white/12 text-xs font-medium text-[#F8F9FA]/80 hover:text-[#F8F9FA] hover:bg-white/5 transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00E5C7]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp / Direct Scale CTA */}
                <a
                  href="mailto:zeedmgt@gmail.com?subject=Let%E2%80%99s%20Scale%20Your%20Brand%20%E2%80%94%20WhatsApp%20%2F%20Strategy%20Request"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 min-h-[48px] rounded-xl bg-[#0F1433] hover:bg-[#151B42] border border-[#00E5C7]/45 text-sm font-semibold text-[#00E5C7] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Let’s Scale Your Brand (WhatsApp & Direct Desk)</span>
                </a>
              </div>

              {/* Social Links (@Zeed.mgts) */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs font-medium text-[#F8F9FA]/55 mb-3">
                  Connect on Social <span aria-hidden="true">·</span>{' '}
                  <span className="text-[#F8F9FA]/85">@Zeed.mgts</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5">
                  {SOCIAL_CHANNELS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 min-h-[42px] rounded-lg bg-[#0F1433] border border-white/10 hover:border-[#00E5C7]/50 text-xs font-medium text-[#F8F9FA]/85 hover:text-[#F8F9FA] transition-colors"
                    >
                      <span>{social.name}</span>
                      <span className="font-mono text-[11px] text-[#00E5C7]">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right Column: Validated Strategy Session Scheduler & Form */}
            <Reveal
              delay={0.1}
              className="lg:col-span-7 p-6 sm:p-8 lg:p-10 rounded-xl bg-[#0F1433] border border-white/12"
            >
              {submitted ? (
                <div className="py-8 text-left space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/40 flex items-center justify-center text-[#00E5C7]">
                    <Check className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F8F9FA]">
                    Strategy Session Scheduled & Received.
                  </h3>
                  <p className="text-base text-[#F8F9FA]/75 leading-relaxed max-w-lg">
                    Thank you, <span className="text-[#F8F9FA] font-semibold">{name}</span>. A
                    senior Zeed.MGTS strategist is preparing custom rates for{' '}
                    <span className="text-[#00E5C7]">{activeOrgLabel}</span> and will send a
                    calendar invite to <span className="text-[#F8F9FA]">{email}</span> for your{' '}
                    <span className="text-[#F8F9FA]">{preferredWindow}</span> window.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 min-h-[44px] rounded-lg bg-[#151B42] hover:bg-[#1E265B] border border-white/12 text-sm font-medium text-[#F8F9FA] transition-colors"
                    >
                      Schedule Another Inquiry
                    </button>
                    <a
                      href="mailto:zeedmgt@gmail.com"
                      className="text-sm font-medium text-[#00E5C7] hover:underline"
                    >
                      Email zeedmgt@gmail.com directly
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-white/10">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F8F9FA]">
                      Book Your Free Strategy Session
                    </h3>
                    <p className="text-sm text-[#F8F9FA]/60 mt-1">
                      30-minute channel audit, custom rate breakdown & execution roadmap.
                    </p>
                  </div>

                  {selectedScope && selectedScope.services.length > 0 && (
                    <div className="pb-4 border-b border-white/10 text-xs text-[#F8F9FA]/75 flex flex-wrap items-center justify-between gap-2">
                      <span>
                        Synced Scope: <strong className="text-[#F8F9FA]">{selectedScope.organizationLabel}</strong>{' '}
                        <span aria-hidden="true">·</span> {selectedScope.services.length} service
                        {selectedScope.services.length === 1 ? '' : 's'}
                      </span>
                      <span className="font-mono tabular-nums font-semibold text-[#F5B700]">
                        {selectedScope.estimatedSummary}
                      </span>
                    </div>
                  )}

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-[#FF6B6B]/12 border border-[#FF6B6B]/40 text-sm text-[#FF6B6B]"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                        Name
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] placeholder:text-[#F8F9FA]/35 focus:outline-none focus:border-[#00E5C7] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                        Email
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@yourbrand.com"
                        className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] placeholder:text-[#F8F9FA]/35 focus:outline-none focus:border-[#00E5C7] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="lead-org-type" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                        Brand / Organization Type
                      </label>
                      <select
                        id="lead-org-type"
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value as OrganizationTierId)}
                        className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#00E5C7] transition-colors"
                      >
                        {ORGANIZATION_TIERS.map((tier) => (
                          <option key={tier.id} value={tier.id}>
                            {tier.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="lead-goal-type" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                        Primary Social Goal
                      </label>
                      <select
                        id="lead-goal-type"
                        value={primaryGoal}
                        onChange={(e) => setPrimaryGoal(e.target.value as SocialGoalId)}
                        className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#00E5C7] transition-colors"
                      >
                        {SOCIAL_GOALS.filter((g) => g.id !== 'all').map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="lead-handle" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                        Instagram / Website
                      </label>
                      <input
                        id="lead-handle"
                        type="text"
                        value={handleOrSite}
                        onChange={(e) => setHandleOrSite(e.target.value)}
                        placeholder="@yourbrand or https://yourbrand.com"
                        className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] placeholder:text-[#F8F9FA]/35 focus:outline-none focus:border-[#00E5C7] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-window" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                        Preferred Call Window
                      </label>
                      <div className="relative">
                        <select
                          id="lead-window"
                          value={preferredWindow}
                          onChange={(e) => setPreferredWindow(e.target.value)}
                          className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#00E5C7] transition-colors"
                        >
                          {CALL_WINDOWS.map((win) => (
                            <option key={win} value={win}>
                              {win}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-goal" className="block text-xs font-medium text-[#F8F9FA]/80 mb-2">
                      What’s your biggest social media goal? (or scope summary)
                    </label>
                    <textarea
                      id="lead-goal"
                      rows={5}
                      required
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="e.g., Scale Meta & TikTok ROAS, launch daily short-form Reels, or hand off full social media management..."
                      className="w-full px-4 py-3 rounded-lg bg-[#07091B] border border-white/15 text-sm text-[#F8F9FA] placeholder:text-[#F8F9FA]/35 focus:outline-none focus:border-[#00E5C7] transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[52px] rounded-lg bg-[#F5B700] hover:bg-[#FFC72C] text-[#07091B] font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C7]"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Book Your Free Strategy Session</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#050614] py-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <a
                href="#top"
                className="inline-flex items-center bg-white rounded-lg px-3 py-1.5 border border-white/20"
              >
                <img
                  src={BRAND_LOGOS.fullWordmark}
                  alt="Zeed Management (ZEED Mgt)"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </a>
              <p className="text-xs sm:text-sm text-[#F8F9FA]/60 mt-3">
                Zeed Management (Zeed.MGTS) <span aria-hidden="true">·</span> Strategic Social.
                Scalable Growth. Measurable Results.
              </p>
            </div>

            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-sm text-[#F8F9FA]/70">
              <a href="#about" className="hover:text-[#F8F9FA] transition-colors">
                About
              </a>
              <a href="#services" className="hover:text-[#F8F9FA] transition-colors">
                Services
              </a>
              <a href="#capabilities" className="hover:text-[#F8F9FA] transition-colors">
                Capabilities
              </a>
              <a href="#process" className="hover:text-[#F8F9FA] transition-colors">
                Process
              </a>
              <a href="#results" className="hover:text-[#F8F9FA] transition-colors">
                Results
              </a>
              <a href="#faq" className="hover:text-[#F8F9FA] transition-colors">
                FAQ
              </a>
            </nav>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#F8F9FA]/50">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:zeedmgt@gmail.com"
                className="text-[#F8F9FA]/75 hover:text-[#00E5C7] transition-colors"
              >
                zeedmgt@gmail.com
              </a>
              <span aria-hidden="true">·</span>
              <span>Instagram, TikTok, LinkedIn, X: @Zeed.mgts</span>
            </div>

            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} Zeed Management (Zeed.MGTS). All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
