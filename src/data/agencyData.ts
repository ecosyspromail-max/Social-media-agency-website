export type OrganizationTierId =
  | 'startup'
  | 'ecommerce'
  | 'b2b'
  | 'nonprofit'
  | 'enterprise';

export type SocialGoalId =
  | 'all'
  | 'awareness'
  | 'leads'
  | 'sales'
  | 'community'
  | 'reputation';

export type ServiceIntensity = 'core' | 'accelerated' | 'dedicated';

export interface OrganizationTier {
  id: OrganizationTierId;
  label: string;
  rateMultiplier: number;
  rateNote: string;
  isCustomQuote?: boolean;
}

export interface SocialGoalOption {
  id: SocialGoalId;
  label: string;
  outcomeSummary: string;
}

export interface CustomScopePayload {
  organizationId: OrganizationTierId;
  organizationLabel: string;
  goalId: SocialGoalId;
  goalLabel: string;
  services: {
    id: string;
    title: string;
    intensityLabel: string;
    rateLabel: string;
  }[];
  estimatedSummary: string;
  customNotes: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'organic' | 'paid' | 'system';
  categoryLabel: string;
  goals: Exclude<SocialGoalId, 'all'>[];
  baseRate: number;
  rateUnit: 'mo' | 'one-time';
  description: string;
  deliverable: string;
  scopePresets: Record<ServiceIntensity, string>;
  featured?: boolean;
}

export interface CapabilityGroup {
  id: 'strategy' | 'content' | 'paid';
  number: string;
  title: string;
  summary: string;
  items: string[];
}

export interface ToolCategory {
  id: string;
  group: 'content' | 'analytics' | 'ops';
  title: string;
  tools: {
    name: string;
    code: string;
    role: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  cadence: string;
  description: string;
  deliverables: string[];
}

export interface CaseStudy {
  id: string;
  industry: string;
  clientType: string;
  timeframe: string;
  headlineMetric: string;
  headlineLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  challenge: string;
  whatWeDid: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  outcome: string;
  quote: string;
  image: string;
  initials: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BRAND_LOGOS = {
  iconMark: '/assets/aistudio/20261121_033421_0000_ada4bdcd.png',
  fullWordmark: '/assets/aistudio/Untitled_design_20261121_033647_0000_df4eccca.png',
} as const;

export const IMAGES = {
  heroStudio: '/src/assets/images/hero_agency_studio_1795328390521.jpg',
  aboutTeam: '/src/assets/images/about_team_studio_1795328392472.jpg',
  caseDashboard: '/src/assets/images/case_study_dashboard_1795328391363.jpg',
  elena: '/src/assets/images/testimonial_elena_1795328391538.jpg',
  marcus: '/src/assets/images/testimonial_marcus_1795328391871.jpg',
  sophia: '/src/assets/images/testimonial_sophia_1795328391535.jpg',
  david: '/src/assets/images/testimonial_david_1795328392184.jpg',
} as const;

export const ORGANIZATION_TIERS: OrganizationTier[] = [
  {
    id: 'startup',
    label: 'Startups & Creators',
    rateMultiplier: 0.85,
    rateNote: 'Lean founder-led growth tier (15% launch-stage rate)',
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce & DTC Brands',
    rateMultiplier: 1.0,
    rateNote: 'Standard commercial creative & ROAS scaling rate',
  },
  {
    id: 'b2b',
    label: 'B2B SaaS & Companies',
    rateMultiplier: 1.25,
    rateNote: 'Multi-stakeholder pipeline, LinkedIn & executive alignment',
  },
  {
    id: 'nonprofit',
    label: 'Non-Profits & Orgs',
    rateMultiplier: 0.75,
    rateNote: '25% mission-aligned organization & NGO partner rate',
  },
  {
    id: 'enterprise',
    label: 'Enterprise & Agencies',
    rateMultiplier: 1.6,
    rateNote: 'Dedicated multi-brand pod, SLA governance & custom scopes',
    isCustomQuote: true,
  },
];

export const SOCIAL_GOALS: SocialGoalOption[] = [
  {
    id: 'all',
    label: 'All Goals',
    outcomeSummary: 'Full-spectrum capabilities across brand reach, pipeline, sales, and retention.',
  },
  {
    id: 'awareness',
    label: 'Brand Awareness & Reach',
    outcomeSummary: 'Short-form video velocity, viral hook engineering, and creator distribution.',
  },
  {
    id: 'leads',
    label: 'Lead Gen & Pipeline',
    outcomeSummary: 'High-intent B2B and service funnels via LinkedIn, TikTok, and DM capture.',
  },
  {
    id: 'sales',
    label: 'Direct Sales & ROAS',
    outcomeSummary: 'Full-funnel Meta & TikTok media buying engineered for profitable conversion.',
  },
  {
    id: 'community',
    label: 'Community & Retention',
    outcomeSummary: 'Daily inbox stewardship, comment engagement, and loyal customer ecosystems.',
  },
  {
    id: 'reputation',
    label: 'Reputation & Authority',
    outcomeSummary: 'Executive voice systems, crisis readiness, and category-defining positioning.',
  },
];

export const INTENSITY_OPTIONS: {
  id: ServiceIntensity;
  label: string;
  multiplier: number;
}[] = [
  { id: 'core', label: 'Core Cadence', multiplier: 1.0 },
  { id: 'accelerated', label: 'Accelerated Scale', multiplier: 1.35 },
  { id: 'dedicated', label: 'Full Dedicated Pod', multiplier: 1.75 },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-takeover',
    number: '01',
    title: 'Full Social Media Takeover (Done-For-You)',
    category: 'system',
    categoryLabel: 'End-to-End Growth',
    goals: ['awareness', 'leads', 'sales', 'community', 'reputation'],
    baseRate: 4800,
    rateUnit: 'mo',
    description:
      'Complete ownership of your organic presence, creative direction, publishing cadence, community growth, and paid acquisition under one dedicated team.',
    deliverable: 'Strategy, production, daily management, paid scaling & executive reporting',
    scopePresets: {
      core: '2 channels · 16 deliverables/mo · Weekly sprint sync',
      accelerated: '4 channels · 28 deliverables/mo · Bi-weekly creative testing',
      dedicated: 'Omni-channel · Daily publishing · Dedicated creative director + buyer',
    },
    featured: true,
  },
  {
    id: 'strategy-audit',
    number: '02',
    title: 'Social Media Strategy & Audit',
    category: 'system',
    categoryLabel: 'Architecture',
    goals: ['awareness', 'leads', 'sales', 'reputation'],
    baseRate: 1500,
    rateUnit: 'one-time',
    description:
      'Deep forensic audit of your existing channels, competitor white space, audience psychology, and platform positioning to build an actionable growth roadmap.',
    deliverable: '90-day growth blueprint, content pillars & KPI forecast',
    scopePresets: {
      core: '2 channels audited · Competitor teardown · 90-day pillar map',
      accelerated: '4 channels audited · Full funnel & creative gap matrix',
      dedicated: 'Multi-brand audit · Executive workshop & quarterly board roadmap',
    },
  },
  {
    id: 'content-creation',
    number: '03',
    title: 'Content Creation & Direction',
    category: 'organic',
    categoryLabel: 'Production',
    goals: ['awareness', 'community', 'sales'],
    baseRate: 2400,
    rateUnit: 'mo',
    description:
      'High-retention vertical video and editorial carousels engineered for Reels, TikTok, Stories, and YouTube Shorts with cinema-grade pacing.',
    deliverable: 'Reels, TikToks, Carousels, Stories & YouTube Shorts',
    scopePresets: {
      core: '12 short-form videos + 4 carousels/mo',
      accelerated: '20 short-form videos + 8 carousels + story sequences/mo',
      dedicated: '30+ studio-finished videos + bespoke motion graphics/mo',
    },
  },
  {
    id: 'script-hook',
    number: '04',
    title: 'Script Writing & Hook Engineering',
    category: 'organic',
    categoryLabel: 'Retention Copy',
    goals: ['awareness', 'leads', 'sales'],
    baseRate: 1400,
    rateUnit: 'mo',
    description:
      'Pattern-interrupt opening 3-second hooks, narrative pacing, and conversion-tested scripts built around retention drop-off telemetry.',
    deliverable: 'Hook banks, shot-by-shot scripts & retention storyboards',
    scopePresets: {
      core: '12 scripted concepts + 30 hook variations/mo',
      accelerated: '24 scripted concepts + storyboards + CTA split tests/mo',
      dedicated: 'Unlimited weekly scripting sprint + founder interview extraction',
    },
  },
  {
    id: 'paid-social',
    number: '05',
    title: 'Paid Social Advertising',
    category: 'paid',
    categoryLabel: 'Performance Media',
    goals: ['leads', 'sales', 'awareness'],
    baseRate: 2600,
    rateUnit: 'mo',
    description:
      'Full-funnel media buying and structured creative testing across Meta Ads, TikTok Ads, LinkedIn Ads, and Pinterest Ads built for profitable scale.',
    deliverable: 'Meta, TikTok, LinkedIn & Pinterest campaign scaling',
    scopePresets: {
      core: 'Up to $15k/mo ad spend · 1 primary ad platform',
      accelerated: 'Up to $50k/mo ad spend · Multi-channel Meta + TikTok/LinkedIn',
      dedicated: '$50k+/mo ad spend · Daily pacing & dynamic creative lab',
    },
    featured: true,
  },
  {
    id: 'community-management',
    number: '06',
    title: 'Community Management & Engagement',
    category: 'organic',
    categoryLabel: 'Audience Equity',
    goals: ['community', 'leads', 'reputation'],
    baseRate: 1200,
    rateUnit: 'mo',
    description:
      'Proactive comment conversations, DM triage, outbound creator engagement, and brand-voice interaction that turn passive viewers into buyers.',
    deliverable: 'Daily inbox stewardship, comment sprints & DM qualification',
    scopePresets: {
      core: '5-day coverage · Comment replies + DM routing',
      accelerated: '7-day coverage · Outbound engagement + lead qualification flows',
      dedicated: 'Real-time SLA coverage · VIP community & CRM pipeline sync',
    },
  },
  {
    id: 'influencer-partnerships',
    number: '07',
    title: 'Influencer & Creator Partnerships',
    category: 'paid',
    categoryLabel: 'Distribution',
    goals: ['awareness', 'sales', 'community'],
    baseRate: 2000,
    rateUnit: 'mo',
    description:
      'Creator sourcing, brief direction, usage-rights negotiation, and whitelisting pipelines that feed authentic UGC directly into paid acquisition.',
    deliverable: 'Creator casting, UGC briefs & Spark/Whitelisting ads',
    scopePresets: {
      core: '5 vetted creators/mo · Briefs & usage rights management',
      accelerated: '12 vetted creators/mo · Whitelisting + Spark Ads integration',
      dedicated: '25+ creator seeding engine · Ambassador cohort management',
    },
  },
  {
    id: 'analytics-reporting',
    number: '08',
    title: 'Social Media Analytics & Reporting',
    category: 'paid',
    categoryLabel: 'Attribution',
    goals: ['leads', 'sales', 'reputation'],
    baseRate: 950,
    rateUnit: 'mo',
    description:
      'Live KPI visibility across hook hold-rate, organic reach velocity, CAC, blended MER, and attribution paths without vanity fluff.',
    deliverable: 'Live reporting dashboards & weekly executive briefs',
    scopePresets: {
      core: 'Monthly executive deck + Looker/Metricool dashboard',
      accelerated: 'Weekly Loom telemetry + live MER & retention tracking',
      dedicated: 'Custom multi-touch attribution + weekly board-ready review',
    },
  },
  {
    id: 'brand-voice',
    number: '09',
    title: 'Brand Voice & Content System Development',
    category: 'system',
    categoryLabel: 'Identity Systems',
    goals: ['reputation', 'awareness', 'community'],
    baseRate: 1800,
    rateUnit: 'one-time',
    description:
      'Repeatable visual templates, editorial tone rules, and Notion content operating systems so your brand stays unmistakable at scale.',
    deliverable: 'Visual design system, voice playbook & modular templates',
    scopePresets: {
      core: 'Voice playbook + 10 modular Canva/Figma social templates',
      accelerated: 'Full Notion Content OS + 25 templates + motion title kit',
      dedicated: 'Enterprise brand architecture + multi-team training workshop',
    },
  },
  {
    id: 'crisis-management',
    number: '10',
    title: 'Crisis Management & Reputation Protection',
    category: 'system',
    categoryLabel: 'Brand Defense',
    goals: ['reputation', 'community'],
    baseRate: 1600,
    rateUnit: 'mo',
    description:
      'Rapid-response moderation protocols, comment sentiment monitoring, and executive communication playbooks to protect brand equity under pressure.',
    deliverable: 'Escalation matrix, comment defense & response playbooks',
    scopePresets: {
      core: 'Escalation playbook + daily sentiment audit',
      accelerated: '24/7 alert monitoring + rapid PR response drafting',
      dedicated: 'Dedicated reputation war-room + executive comms counsel',
    },
  },
];

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: 'strategy',
    number: '01',
    title: 'Strategy & Planning',
    summary:
      'Every piece of content and every ad dollar starts with market intelligence, clear buyer positioning, and a measurable funnel.',
    items: [
      'Audience research & buyer persona development',
      'Competitor analysis & content gap identification',
      'Content pillars & monthly content calendars',
      'Platform-specific growth strategies (Instagram, TikTok, LinkedIn, YouTube, X, Pinterest)',
      'Funnel building (Awareness → Engagement → Conversion)',
    ],
  },
  {
    id: 'content',
    number: '02',
    title: 'Content Creation & Direction',
    summary:
      'We engineer thumb-stopping creative assets designed to win the first three seconds and hold attention through the call to action.',
    items: [
      'Viral hook writing & pattern interrupts',
      'Short-form video scripting (Reels, TikTok, Shorts)',
      'Long-form content strategy',
      'Visual direction & mood boarding',
      'Storyboarding for video content',
      'Caption writing that converts',
      'Hashtag research & SEO for social',
    ],
  },
  {
    id: 'paid',
    number: '03',
    title: 'Paid Advertising Expertise',
    summary:
      'Data-backed creative testing and disciplined media buying that convert organic winners into scalable, predictable revenue channels.',
    items: [
      'Full-funnel Meta Ads campaigns (Awareness, Traffic, Leads, Sales)',
      'TikTok Ads creative testing & scaling',
      'LinkedIn Ads for B2B lead generation',
      'Advanced audience targeting & lookalike audiences',
      'Creative testing frameworks (hooks, offers, CTAs)',
      'ROAS optimization & budget scaling',
      'Retargeting & abandoned cart recovery',
      'Pixel & conversion tracking setup',
    ],
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'scheduling',
    group: 'content',
    title: 'Content & Scheduling',
    tools: [
      { name: 'Later', code: 'LT', role: 'Visual Grid & Auto-Publish' },
      { name: 'Buffer', code: 'BF', role: 'Multi-Channel Queueing' },
      { name: 'Hootsuite', code: 'HS', role: 'Enterprise Social Streams' },
      { name: 'Metricool', code: 'MC', role: 'Planner & Best-Time Telemetry' },
      { name: 'Planoly', code: 'PL', role: 'IG & Pinterest Curation' },
    ],
  },
  {
    id: 'design',
    group: 'content',
    title: 'Design',
    tools: [
      { name: 'Canva Pro', code: 'CV', role: 'Scalable Carousel Kits' },
      { name: 'Adobe Photoshop', code: 'Ps', role: 'Ad Key Visuals & Retouch' },
      { name: 'CapCut', code: 'CC', role: 'Motion Typography' },
      { name: 'Premiere Pro', code: 'Pr', role: 'Commercial Finishing' },
      { name: 'After Effects', code: 'Ae', role: 'Bespoke Motion Graphics' },
    ],
  },
  {
    id: 'video',
    group: 'content',
    title: 'Video',
    tools: [
      { name: 'CapCut', code: 'CC', role: 'Native Short-Form Pacing' },
      { name: 'VN', code: 'VN', role: 'Rapid Mobile Cutdowns' },
      { name: 'DaVinci Resolve', code: 'DR', role: 'Cinema Color Grading' },
      { name: 'Descript', code: 'DS', role: 'Transcript-Driven Editing' },
    ],
  },
  {
    id: 'analytics',
    group: 'analytics',
    title: 'Analytics',
    tools: [
      { name: 'Meta Business Suite', code: 'MB', role: 'IG & FB Retention Audits' },
      { name: 'TikTok Analytics', code: 'TT', role: 'Watch-Time Diagnostics' },
      { name: 'Google Analytics', code: 'GA', role: 'Cross-Channel Attribution' },
      { name: 'Sprout Social', code: 'SS', role: 'Executive Social BI' },
      { name: 'Iconosquare', code: 'IQ', role: 'Competitor Benchmarking' },
    ],
  },
  {
    id: 'ads',
    group: 'analytics',
    title: 'Ads',
    tools: [
      { name: 'Meta Ads Manager', code: 'MA', role: 'Full-Funnel Scaling' },
      { name: 'TikTok Ads Manager', code: 'TA', role: 'Spark & Creative Testing' },
      { name: 'Google Ads', code: 'GAd', role: 'High-Intent Capture' },
      { name: 'LinkedIn Campaign Manager', code: 'LI', role: 'B2B Account Targeting' },
    ],
  },
  {
    id: 'pm',
    group: 'ops',
    title: 'Project Management',
    tools: [
      { name: 'Notion', code: 'NT', role: 'Client OS & Content Hubs' },
      { name: 'ClickUp', code: 'CU', role: 'Production Sprint Tracking' },
      { name: 'Asana', code: 'AS', role: 'Approval Workflows' },
      { name: 'Trello', code: 'TR', role: 'Editorial Kanban Boards' },
    ],
  },
  {
    id: 'ai',
    group: 'ops',
    title: 'AI Tools',
    tools: [
      { name: 'ChatGPT', code: 'GPT', role: 'Research Synthesis' },
      { name: 'Claude', code: 'CL', role: 'Long-Form Voice Modeling' },
      { name: 'Midjourney', code: 'MJ', role: 'Moodboards & Concept Art' },
      { name: 'Runway', code: 'RW', role: 'AI Video B-Roll & VFX' },
      { name: 'ElevenLabs', code: '11L', role: 'Studio Voiceovers' },
    ],
  },
  {
    id: 'crm',
    group: 'ops',
    title: 'CRM & Email',
    tools: [
      { name: 'GoHighLevel', code: 'GHL', role: 'DM-to-Booking Pipelines' },
      { name: 'Klaviyo', code: 'KL', role: 'E-Commerce Lifecycle Flows' },
      { name: 'Mailchimp', code: 'MC', role: 'Audience Nurture Campaigns' },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Deep Dive Audit',
    cadence: 'Days 1–5',
    description:
      'We dissect your past 12 months of creative performance, unit economics, ad account tracking, and competitor gaps to isolate immediate leverage points.',
    deliverables: ['Account & Pixel Diagnostic', 'Competitor Teardown', 'Offer & Funnel Alignment'],
  },
  {
    number: '02',
    title: 'Strategy Blueprint & Content Pillars',
    cadence: 'Week 1–2',
    description:
      'We architect your channel-by-channel growth roadmap, buyer personas, messaging angles, and core content pillars built to drive qualified demand.',
    deliverables: ['90-Day Growth Roadmap', '4–5 Core Content Pillars', 'Platform Format Matrix'],
  },
  {
    number: '03',
    title: 'Content Production System Setup',
    cadence: 'Week 2',
    description:
      'We build your shared Notion approval workspace, design templates, filming briefs, and creator sourcing pipeline so production never stalls.',
    deliverables: ['Notion Command Workspace', 'Visual Template Kit', 'Shoot & Lighting Guides'],
  },
  {
    number: '04',
    title: 'Creative Direction & Script Writing',
    cadence: 'Weekly Sprint',
    description:
      'Our strategists write hook variations, retention scripts, and shot-by-shot storyboards ready for studio capture or rapid creator turnaround.',
    deliverables: ['Hook & Angle Bank', 'Word-for-Word Video Scripts', 'Storyboards & Shot Lists'],
  },
  {
    number: '05',
    title: 'Publishing, Community Management & Optimization',
    cadence: 'Daily Execution',
    description:
      'Consistent cross-platform publishing at peak engagement windows paired with active comment and DM management to turn reach into pipeline.',
    deliverables: ['Scheduled Omni-Channel Publishing', 'Active Comment & DM Engagement', 'Social SEO Optimization'],
  },
  {
    number: '06',
    title: 'Paid Ads Launch & Scaling',
    cadence: 'Bi-Weekly Cycles',
    description:
      'We amplify top-performing organic concepts inside structured Meta, TikTok, and LinkedIn ad campaigns with ruthless creative iteration.',
    deliverables: ['Dynamic Creative Testing', 'Retargeting Funnel Architecture', 'ROAS & CPA Budget Scaling'],
  },
  {
    number: '07',
    title: 'Weekly/Monthly Performance Reviews & Iteration',
    cadence: 'Every Friday & Month-End',
    description:
      'Transparent telemetry reviews covering hold rates, ROAS, pipeline attribution, and next month’s winning creative hypotheses.',
    deliverables: ['Weekly Loom & Metric Brief', 'Monthly Executive Deck', 'Next-Cycle Creative Iteration'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ecommerce',
    industry: 'E-Commerce / DTC Apparel',
    clientType: 'Direct-to-Consumer Brand',
    timeframe: '6 Months',
    headlineMetric: '+412%',
    headlineLabel: 'Instagram Engagement',
    secondaryMetric: '7.8x ROAS',
    secondaryLabel: 'Blended Meta Ads Return',
    challenge:
      'Stagnant organic reach under 1.2% engagement and rising Meta acquisition costs caused by fatigued static product ads.',
    whatWeDid:
      'Rebuilt the creative engine around founder-led Reels, 3-second hook testing sprints, UGC whitelisting, and a 3-tier Meta retargeting funnel.',
  },
  {
    id: 'coach',
    industry: 'Personal Brand / Executive Coach',
    clientType: 'High-Ticket Education',
    timeframe: '9 Months',
    headlineMetric: '0 → 85K',
    headlineLabel: 'Organic Followers',
    secondaryMetric: '$180K',
    secondaryLabel: 'Attributed Course Sales',
    challenge:
      'Zero short-form video footprint and complete reliance on cold outreach and sporadic referrals for flagship cohort launches.',
    whatWeDid:
      'Engineered daily authority Reels and YouTube Shorts scripted from client interviews, paired with automated ManyChat-to-Klaviyo lead capture.',
  },
  {
    id: 'local',
    industry: 'Local Service Business',
    clientType: 'Multi-Location Aesthetic Clinic',
    timeframe: '4 Months',
    headlineMetric: '100%',
    headlineLabel: 'Booked Consult Calendar',
    secondaryMetric: '3.4x',
    secondaryLabel: 'Lower Cost Per Booking',
    challenge:
      'Inconsistent walk-in volume and wasted local boost spend with zero conversion tracking or automated follow-up.',
    whatWeDid:
      'Produced hyper-local treatment breakdown videos, deployed geo-fenced Meta Lead Ads, and connected GoHighLevel SMS booking reminders.',
  },
  {
    id: 'saas',
    industry: 'B2B SaaS Startup',
    clientType: 'Series A Workflow Platform',
    timeframe: '6 Months',
    headlineMetric: '1,200+',
    headlineLabel: 'Qualified Pipeline Leads',
    secondaryMetric: '-42%',
    secondaryLabel: 'Customer Acquisition Cost',
    challenge:
      'High search CPCs and generic corporate LinkedIn posts failing to resonate with technical buyers and ops leaders.',
    whatWeDid:
      'Launched dual-channel LinkedIn executive thought leadership plus sharp TikTok product teardowns backed by LinkedIn Conversation Ads.',
  },
];

export const WHY_ZEED = [
  {
    number: '01',
    title: 'Full-stack capability (organic + paid under one roof)',
    description:
      'Your organic social team and media buyers sit at the same table. Winning organic hooks immediately fuel paid creative tests without agency silos.',
  },
  {
    number: '02',
    title: 'Obsessive attention to creative quality',
    description:
      'We treat every 30-second Reel and static ad like a flagship commercial asset—tight pacing, sharp typography, and zero filler frames.',
  },
  {
    number: '03',
    title: 'Transparent dashboards & real-time reporting',
    description:
      'You never have to chase an account manager for numbers. Inspect live ad spend, MER, retention curves, and upcoming content calendars 24/7.',
  },
  {
    number: '04',
    title: 'We think like owners, not freelancers',
    description:
      'We care about contribution margin, booked calls, and lifetime value—not vanity likes. If an offer or landing page leaks conversions, we flag and fix it.',
  },
  {
    number: '05',
    title: 'Proven systems that scale',
    description:
      'From Notion approval pipelines to structured hook-testing matrices, our operating system delivers predictable output week after week.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'elena',
    name: 'Elena Vance',
    role: 'Founder & CEO',
    company: 'Kova Studio Apparel',
    outcome: '7.8x Meta ROAS & +412% Engagement',
    quote:
      'Before Zeed.MGTS, we burned budget on static ads while our Instagram sat flat. Within 90 days their hook-testing system turned Reels into our #1 acquisition channel and lifted Meta ROAS to 7.8x.',
    image: IMAGES.elena,
    initials: 'EV',
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'Co-Founder & VP Growth',
    company: 'MetricFlow SaaS',
    outcome: '1,200+ Qualified Leads in 6 Months',
    quote:
      'Most agencies hand you a junior coordinator and generic Canva quotes. Zeed rebuilt our LinkedIn and TikTok engine from the ground up—generating over 1,200 demo-qualified leads while cutting CAC by 42%.',
    image: IMAGES.marcus,
    initials: 'MC',
  },
  {
    id: 'sophia',
    name: 'Sophia Alverez',
    role: 'Executive Coach & Author',
    company: 'Alverez Advisory',
    outcome: '0 to 85K Followers & $180K Sales',
    quote:
      'I spent two hours a month recording scripts Zeed wrote for me, and they handled every edit, caption, DM flow, and launch ad. We crossed 85,000 followers in nine months and added $180K in course revenue.',
    image: IMAGES.sophia,
    initials: 'SA',
  },
  {
    id: 'david',
    name: 'David Mercer',
    role: 'Managing Partner',
    company: 'Apex Wellness Clinics',
    outcome: 'Waitlist Booked 6 Weeks Out',
    quote:
      'We used to guess what to post and boost random photos. Zeed connected hyper-local short-form video to Meta Lead Ads and automated SMS booking—keeping all three clinic calendars completely full.',
    image: IMAGES.david,
    initials: 'DM',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'pricing',
    question: 'How does your pricing model work?',
    answer:
      'We operate on transparent monthly retainers tailored to your channel count, monthly content volume, and paid media ad spend tier. Every engagement includes dedicated strategy, creative direction, production/editing, publishing, and live reporting—with zero hidden production markups.',
  },
  {
    id: 'commitment',
    question: 'What is the minimum commitment?',
    answer:
      'Our standard initial commitment is 90 days. Building compound organic momentum, gathering statistically significant creative testing data, and optimizing paid ad pixels requires a disciplined 3-month runway. After 90 days, partnerships continue on flexible rolling agreements.',
  },
  {
    id: 'ownership',
    question: 'Who owns the content, raw footage, and ad accounts?',
    answer:
      'You retain 100% ownership of everything—all raw and edited video files, design templates, custom audiences, pixel data, and Meta/TikTok/LinkedIn ad accounts. We operate as your embedded partner inside your own business assets.',
  },
  {
    id: 'reporting',
    question: 'How often do we receive reports and strategy updates?',
    answer:
      'You receive live 24/7 dashboard access, a concise weekly performance & creative test brief every Friday, and a full executive growth review at the end of every month to map the next sprint.',
  },
  {
    id: 'ads-management',
    question: 'How are paid ads and creative testing managed?',
    answer:
      'We separate testing from scaling. Every two weeks we launch structured hook, visual, and offer variations in dedicated testing campaigns, then graduate statistical winners into high-budget scaling and retargeting campaigns while monitoring blended ROAS daily.',
  },
  {
    id: 'launch-speed',
    question: 'How quickly can Zeed.MGTS take over and launch?',
    answer:
      'Onboarding takes 7–10 business days from kickoff. In Week 1 we complete your deep-dive audit and strategy blueprint; by Week 2 your Notion workspace, scripts, and first batch of deliverables are ready for approval.',
  },
];
