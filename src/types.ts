/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorTheme {
  primary: string;       // Hex e.g., "#8B5CF6" (Electric Purple)
  secondary: string;     // Hex e.g., "#06B6D4" (Cyan)
  accent: string;        // Hex e.g., "#EC4899" (Pink)
  background: string;    // Hex e.g., "#0F172A" (Slate-900)
  surface: string;       // Hex e.g., "#1E293B" (Slate-800)
  text: string;          // Hex e.g., "#F8FAFC" (Slate-50)
  textMuted: string;     // Hex e.g., "#94A3B8" (Slate-400)
  isDark: boolean;
}

export type SectionType =
  | 'hero'
  | 'features'
  | 'counter'
  | 'leadForm'
  | 'pricing'
  | 'testimonials'
  | 'faq'
  | 'footer';

export interface FeatureItem {
  id: string;
  icon: string; // Lucide icon identifier e.g., 'Zap', 'Target', 'Layers'
  title: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  period: 'month' | 'one-time';
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SectionHeroFields {
  badge?: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaActionType: 'leadForm' | 'pricing' | 'custom';
  ctaCustomUrl?: string;
  imageUrl?: string;
  showImage?: boolean;
}

export interface SectionFeaturesFields {
  headline: string;
  subheadline: string;
  items: FeatureItem[];
  layout: 'grid' | 'list' | 'bento';
}

export interface SectionCounterFields {
  headline: string;
  targetDate: string; // ISO string or YYYY-MM-DD string
  stats: { label: string; value: string }[];
}

export interface SectionLeadFormFields {
  headline: string;
  description: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
}

export interface SectionPricingFields {
  headline: string;
  description: string;
  plans: PricingPlan[];
}

export interface SectionTestimonialsFields {
  headline: string;
  description: string;
  items: TestimonialItem[];
}

export interface SectionFaqFields {
  headline: string;
  description: string;
  items: FaqItem[];
}

export interface SectionFooterFields {
  brandText: string;
  copyright: string;
  twitterUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface LandingPageSection {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  fields:
    | SectionHeroFields
    | SectionFeaturesFields
    | SectionCounterFields
    | SectionLeadFormFields
    | SectionPricingFields
    | SectionTestimonialsFields
    | SectionFaqFields
    | SectionFooterFields;
}

export interface ABVariant {
  id: string; // 'original' | 'variant-b' | 'variant-c'
  label: string; // e.g., "Original Headline", "Emotional Urgency", etc.
  value: string;
  views: number;
  conversions: number;
  reason?: string;
}

export interface ABTest {
  enabled: boolean;
  element: 'headline' | 'ctaText' | 'imageUrl';
  sectionId: string;
  originalValue: string;
  variants: ABVariant[];
  activeVariantId: string; // 'original' | 'variant-b' | 'variant-c'
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  targetAudience?: string;
  pagePurpose?: string;
  seoScore?: number; // 0-100
  suggestions?: string[];
  schemaType?: 'Organization' | 'SoftwareApplication' | 'Product' | 'LocalBusiness' | 'WebSite';
  schemaMarkup?: string;
}

export interface LandingPage {
  id: string;
  name: string;
  slug: string; // e.g. "my-startup"
  createdAt: string;
  status: 'draft' | 'published';
  theme: ColorTheme;
  fontFamily: string; // 'sans' | 'serif' | 'mono' | 'cyberpunk'
  sections: LandingPageSection[];
  views: number;
  conversions: number;
  leadsCollected: { email: string; timestamp: string; sectionId: string | undefined }[];
  revenueCollected: { amountINR: number; method: string; timestamp: string; description: string }[];
  abTest?: ABTest;
  customDomains?: string[];
  activePlanId?: string;
  seo?: SeoMetadata;
}

export interface ProjectAction {
  type: string;
  payload?: any;
}
