/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LandingPage, ColorTheme, LandingPageSection } from './types';

export const THEMES: Record<string, ColorTheme> = {
  modernGlass: {
    primary: '#FAFAFA',     // High contrast Cosmic White
    secondary: '#0B0B0F',   // Stellar Black
    accent: '#E4E4E7',      // Silver Dust
    background: '#040406',  // Pure Outer Space Void
    surface: '#0E0E14',     // Dark Star Panel
    text: '#FFFFFF',
    textMuted: '#A1A1AA',
    isDark: true,
  },
  minimalSoft: {
    primary: '#111827',     // Solid Charcoal
    secondary: '#4F46E5',   // Royal Indigo
    accent: '#10B981',      // Emerald Green
    background: '#FAFAFA',  // Clean Off-white
    surface: '#FFFFFF',     // Bright White Card
    text: '#111827',
    textMuted: '#4B5563',
    isDark: false,
  },
  cyberpunk: {
    primary: '#F000FF',     // Hot Magenta
    secondary: '#00F0FF',   // Neon Cyan Cyber
    accent: '#FFD700',      // Cyberpunk Gold
    background: '#05050A',  // Pitch Black
    surface: '#121225',     // Matte Tech Blue Card
    text: '#FDFEFE',
    textMuted: '#8E9BB0',
    isDark: true,
  },
  editorialGold: {
    primary: '#B45309',     // Amber Warm Gold
    secondary: '#1E293B',   // Slate Dark
    accent: '#C2410C',      // Burnt Orange
    background: '#FDFBF7',  // Vintage Cream
    surface: '#FFFFFF',     // Pure White
    text: '#1E293B',
    textMuted: '#57534E',
    isDark: false,
  },
  cosmicSaaS: {
    primary: '#6366F1',     // Indigo Glow
    secondary: '#EC4899',   // Tech Pink
    accent: '#3B82F6',      // Cobalt Blue
    background: '#090514',  // Celestial Dark
    surface: '#150E28',     // Cosmic Purple Surface
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    isDark: true,
  }
};

export const STARTER_PROJECTS: LandingPage[] = [
  {
    id: 'startup-waitlist',
    name: 'FlashFocus SaaS Waitlist',
    slug: 'saas-waitlist',
    createdAt: '2026-05-27T16:00:00Z',
    status: 'published',
    theme: THEMES.modernGlass,
    fontFamily: 'sans',
    views: 3120,
    conversions: 840,
    leadsCollected: [
      { email: 'innovator@launch.io', timestamp: '226-05-27T16:10:00Z', sectionId: 'waitlist-form' },
      { email: 'designer@pixel.com', timestamp: '2026-05-27T16:15:00Z', sectionId: 'waitlist-form' },
      { email: 'founder@saasbox.co', timestamp: '2026-05-27T16:20:00Z', sectionId: 'waitlist-form' }
    ],
    revenueCollected: [
      { amountINR: 2999, method: 'Stripe UPI', timestamp: '2026-05-27T16:05:00Z', description: 'Early Beta Adopter Plan' }
    ],
    sections: [
      {
        id: 'hero-sec',
        type: 'hero',
        title: 'Hero Splash',
        isVisible: true,
        fields: {
          badge: '⚡ Launching FlashFocus 1.0 Beta',
          headline: 'Launch Stunning Landing Pages in Minutes',
          subheadline: 'The AI-powered, beautiful visual builder for creators, SaaS waitlists, agencies, and micro-influencer product drops.',
          ctaText: 'Start Generating For Free',
          ctaActionType: 'leadForm',
          showImage: true,
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'
        }
      },
      {
        id: 'timer-sec',
        type: 'counter',
        title: 'Launch Countdown',
        isVisible: true,
        fields: {
          headline: 'Beta Closes Soon. Claim Lifetime Access Perks Now!',
          targetDate: '2026-06-30T10:00:00Z',
          stats: [
            { label: 'Waitlist Members', value: '4,500+' },
            { label: 'SaaS Score', value: '4.95/5' },
            { label: 'Avg Speed to Live', value: '3 mins' }
          ]
        }
      },
      {
        id: 'features-sec',
        type: 'features',
        title: 'Interactive Bento Features',
        isVisible: true,
        fields: {
          headline: 'Engineered for Viral Conversions',
          subheadline: 'Focus purely on your launch while our system structures, scales, and styles everything with AI.',
          layout: 'grid',
          items: [
            {
              id: 'ft1',
              icon: 'Zap',
              title: 'Instant AI Generation',
              description: 'Describe your launch idea in plain English and see a production-ready, beautiful page materialize instantly.'
            },
            {
              id: 'ft2',
              icon: 'Percent',
              title: 'Conversion Engineered',
              description: 'Stretching layout ratios, smart CTA placements, and interactive widgets keep visitors fully engaged and locked.'
            },
            {
              id: 'ft3',
              icon: 'TrendingUp',
              title: 'Unified Built-in Analytics',
              description: 'Watch your page metrics grow. Monitor bounce rates, conversion indices, and click heatmaps directly.'
            },
            {
              id: 'ft4',
              icon: 'DollarSign',
              title: 'UPI & Global Card Checkouts',
              description: 'Accept payments right inside your page with instant integration support for Razorpay, UPI QR, and Stripe.'
            }
          ]
        }
      },
      {
        id: 'form-sec',
        type: 'leadForm',
        title: 'Lead Waitlist Capturing',
        isVisible: true,
        fields: {
          headline: 'Secure Early Access Priority Spot',
          description: 'No credit card required. Get 10 free AI generation credits, instant custom domains, and zero-commission payments on signup.',
          placeholder: 'Enter your work email address...',
          buttonText: 'Join Priority Waitlist ⚡',
          successMessage: '🎉 Success! You have secured priority rank slot #451. We will alert you the moment we deploy!'
        }
      },
      {
        id: 'pricing-sec',
        type: 'pricing',
        title: 'Flexible Startup Pricing',
        isVisible: true,
        fields: {
          headline: 'Affordable, Creator-Friendly Pricing Plans',
          description: 'Select a custom tiered plan. Launch free with standard subdomains and scale upward as you generate viral loops.',
          plans: [
            {
              id: 'plan-free',
              name: 'Creator Free',
              priceINR: 0,
              priceUSD: 0,
              period: 'month',
              description: 'Perfect for initial hobby events or quick conceptual feedback.',
              features: ['3 published pages', 'FlashFocus watermark logo', 'Standard subdomains', 'Basic conversion tools', '100 Lead capture submissions/mo']
            },
            {
              id: 'plan-starter-99',
              name: 'Starter Plus Plan',
              priceINR: 99,
              priceUSD: 1.5,
              period: 'month',
              description: 'Budget-friendly plan for custom domain lovers.',
              features: ['3 domains published', 'Standard speed optimizations', 'Regular live updates', 'Secure SSL certificates']
            },
            {
              id: 'plan-basic',
              name: 'Basic Plan',
              priceINR: 200,
              priceUSD: 3,
              period: 'month',
              description: 'Great for rising creators and small brands needing custom domains.',
              features: ['2 domains published', 'No platform watermark', 'Standard speed optimizations', 'Regular live updates']
            },
            {
              id: 'plan-pro',
              name: 'Pro Launchpad',
              priceINR: 999,
              priceUSD: 12,
              period: 'month',
              description: 'Designed for active SaaS startups, premium local events, and marketers.',
              features: ['Unlimited custom pages', 'Completely white-labeled', 'Custom domain mapping', 'Full AI designer assistant access', 'Integrated Razorpay & Stripe checkouts', 'Detailed traffic analytics'],
              isPopular: true
            }
          ]
        }
      },
      {
        id: 'faq-sec',
        type: 'faq',
        title: 'Frequently Answered Questions',
        isVisible: true,
        fields: {
          headline: 'Got Questions? We Have Answers',
          description: 'Everything you need to know about setting up your custom templates, domains, and payment channels.',
          items: [
            {
              id: 'faq1',
              question: 'Do I need a separate web domain to launch?',
              answer: 'Nope! You can deploy instantly to a free safe subdirectory at `yourbrand.flashfocus.site`, or verify your personal custom customdomain.com inside our interface within seconds.'
            },
            {
              id: 'faq2',
              question: 'How do payments get set up on the generated pages?',
              answer: 'We support local Razorpay keys and Stripe webhook configuration. Once connected, visitors can click checkout to pay via standard Indian UPI, debit cards, or global standard currency options.'
            },
            {
              id: 'faq3',
              question: 'Can the AI re-write specific sections on request?',
              answer: 'Absolutely! Our built-in AI Design Copilot allows you to chat or highlight any section, adjust text tones, suggest alternate color schemes, or insert pricing configurations directly.'
            }
          ]
        }
      },
      {
        id: 'footer-sec',
        type: 'footer',
        title: 'Interactive Brand Footer',
        isVisible: true,
        fields: {
          brandText: 'FlashFocus AI',
          copyright: '© 2026 FlashFocus Platforms Inc. Beautifully crafted on Node.js.',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com'
        }
      }
    ]
  },
  {
    id: 'crypto-launch',
    name: 'Solana MemeCoin Launchpad',
    slug: 'solana-meme',
    createdAt: '2026-05-26T12:00:00Z',
    status: 'draft',
    theme: THEMES.cyberpunk,
    fontFamily: 'cyberpunk',
    views: 850,
    conversions: 180,
    leadsCollected: [],
    revenueCollected: [],
    sections: [
      {
        id: 'c-hero',
        type: 'hero',
        title: 'Cyberpunk Hero',
        isVisible: true,
        fields: {
          badge: '💎 PRESALE LIVE',
          headline: 'The Next Generation of Decentralized Speed',
          subheadline: 'Ride the cyberpunk wave with high speed execution, absolute security parameters, and automated liquid yields on Solana.',
          ctaText: 'Enter Pre-order Vault',
          ctaActionType: 'leadForm',
          showImage: true,
          imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200'
        }
      },
      {
        id: 'c-features',
        type: 'features',
        title: 'Token Features',
        isVisible: true,
        fields: {
          headline: 'Engineered for Decentralized Scale',
          subheadline: 'The safest meme utilities deployed entirely with vetted open audits.',
          layout: 'bento',
          items: [
            {
              id: 'c-p1',
              icon: 'Activity',
              title: 'Lightning Processing',
              description: 'Sub-second confirmation delays with robust Solana state pipelines.'
            },
            {
              id: 'c-p2',
              icon: 'Shield',
              title: 'Liquidity Locked',
              description: 'All initial pools automatically deployed into locked contract addresses for 5 years.'
            }
          ]
        }
      },
      {
        id: 'c-form',
        type: 'leadForm',
        title: 'Subscription Form',
        isVisible: true,
        fields: {
          headline: 'Claim Pre-sale Allocation Whitelist',
          description: 'Enter your compatible wallet address to receive standard airdrop notifications and priority token allotments.',
          placeholder: 'Enter your Solana wallet address or email...',
          buttonText: 'Request Allocation Token',
          successMessage: '✨ Wallet successfully whitelisted! Prepare for token launch.'
        }
      },
      {
        id: 'c-footer',
        type: 'footer',
        title: 'Footer',
        isVisible: true,
        fields: {
          brandText: 'PROTO-X Solana',
          copyright: '© 2026 Proto-X Decentralized Protocol.',
          twitterUrl: 'https://twitter.com'
        }
      }
    ]
  }
];

export const EMPTY_PROJECT: LandingPage = {
  id: '',
  name: 'New Custom Landing Page',
  slug: 'new-landing',
  createdAt: '',
  status: 'draft',
  theme: THEMES.modernGlass,
  fontFamily: 'sans',
  views: 0,
  conversions: 0,
  leadsCollected: [],
  revenueCollected: [],
  sections: [
    {
      id: 'h-1',
      type: 'hero',
      title: 'Splash Hero',
      isVisible: true,
      fields: {
        badge: '✨ Welcoming New Registrations',
        headline: 'Write a Compelling Headline Here',
        subheadline: 'Describe your core value proposal. Tell visitors why they should join your launch or buy your product, event passes, or waitlist.',
        ctaText: 'Get Started Today',
        ctaActionType: 'leadForm',
        showImage: true,
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200'
      }
    },
    {
      id: 'f-1',
      type: 'leadForm',
      title: 'Instant Acquisition',
      isVisible: true,
      fields: {
        headline: 'Join the Launch Circle',
        description: 'Leave your email address to secure an immediate spot when we release.',
        placeholder: 'Enter your email address...',
        buttonText: 'Notify Me First',
        successMessage: '🙌 Thank you for registering! You are on our official hot list.'
      }
    },
    {
      id: 'ft-1',
      type: 'footer',
      title: 'Footer',
      isVisible: true,
      fields: {
        brandText: 'BrandName',
        copyright: '© 2026 BrandName. Powered by FlashFocus.'
      }
    }
  ]
};
