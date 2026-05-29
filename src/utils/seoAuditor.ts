import { LandingPage, LandingPageSection, SectionType } from '../types';

export interface SeoIssue {
  id: string; // unique issue id
  severity: 'error' | 'warning' | 'info';
  category: 'altText' | 'keywords' | 'cta' | 'structure' | 'accessibility' | 'content';
  title: string;
  description: string;
  suggestedAction: string;
  elementLabel: string; // e.g. "H1 Headline", "Product Image", "Cta Button"
  hotspotXY: { x: number; y: number }; // Relative percentage coordinates for the visual hotspot overlay
  canAutoFix: boolean;
  autoFixAction: (sect: LandingPageSection, brandName: string) => LandingPageSection;
}

export interface SectionAuditResult {
  sectionId: string;
  sectionType: SectionType;
  sectionTitle: string;
  score: number; // 0-100
  issues: SeoIssue[];
}

export interface PageAuditResult {
  overallScore: number;
  totalErrors: number;
  totalWarnings: number;
  totalInfos: number;
  sectionResults: SectionAuditResult[];
  keywordsDetected: string[];
}

// Simple helper to count words
const countWords = (text: string): number => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
};

// Generic Keyword Analyzer
const checkKeywordDensity = (
  text: string, 
  keywords: string[]
): { density: number; found: string[] } => {
  if (!text || keywords.length === 0) return { density: 0, found: [] };
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const totalWords = words.length;
  if (totalWords === 0) return { density: 0, found: [] };

  const found: string[] = [];
  let kwCount = 0;

  keywords.forEach(kw => {
    const kwLower = kw.toLowerCase().trim();
    if (!kwLower) return;
    
    // Check whole phrases or individual words
    const regex = new RegExp(`\\b${kwLower}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      kwCount += matches.length;
      if (!found.includes(kw)) {
        found.push(kw);
      }
    }
  });

  return {
    density: totalWords > 0 ? (kwCount / totalWords) * 100 : 0,
    found
  };
};

export const auditLandingPage = (page: LandingPage): PageAuditResult => {
  // Extract configuration keywords
  const seoKwList = page.seo?.keywords 
    ? page.seo.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : [page.name, ...(page.slug ? page.slug.split('-') : [])].filter(Boolean);

  const sectionResults: SectionAuditResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfos = 0;
  const allKeywordsFound = new Set<string>();

  // Check H1 Count
  const heroSections = page.sections.filter(s => s.type === 'hero' && s.isVisible);
  const h1Count = heroSections.length;

  page.sections.forEach((sect, index) => {
    if (!sect.isVisible) return;

    const issues: SeoIssue[] = [];
    const fields = sect.fields as any;
    let wordCount = 0;

    // Accumulate word count for keywords density checks
    let combinedText = '';

    if (sect.type === 'hero') {
      combinedText += ` ${(fields.headline || '')} ${(fields.subheadline || '')} ${(fields.badge || '')}`;
    } else if (sect.type === 'features') {
      combinedText += ` ${(fields.headline || '')} ${(fields.subheadline || '')}`;
      fields.items?.forEach((it: any) => {
        combinedText += ` ${(it.title || '')} ${(it.description || '')}`;
      });
    } else if (sect.type === 'leadForm') {
      combinedText += ` ${(fields.headline || '')} ${(fields.description || '')}`;
    } else if (sect.type === 'pricing') {
      combinedText += ` ${(fields.headline || '')} ${(fields.description || '')}`;
      fields.plans?.forEach((p: any) => {
        combinedText += ` ${(p.name || '')} ${(p.description || '')} ${(p.features || []).join(' ')}`;
      });
    } else if (sect.type === 'testimonials') {
      combinedText += ` ${(fields.headline || '')} ${(fields.description || '')}`;
      fields.items?.forEach((t: any) => {
        combinedText += ` ${(t.quote || '')} ${(t.author || '')} ${(t.role || '')}`;
      });
    } else if (sect.type === 'faq') {
      combinedText += ` ${(fields.headline || '')} ${(fields.description || '')}`;
      fields.items?.forEach((f: any) => {
        combinedText += ` ${(f.question || '')} ${(f.answer || '')}`;
      });
    } else if (sect.type === 'footer') {
      combinedText += ` ${(fields.brandText || '')} ${(fields.copyright || '')}`;
    } else if (sect.type === 'counter') {
      combinedText += ` ${(fields.headline || '')}`;
      fields.stats?.forEach((st: any) => {
        combinedText += ` ${(st.label || '')} ${(st.value || '')}`;
      });
    }

    wordCount = countWords(combinedText);

    // Verify Keyword Density
    const { density, found } = checkKeywordDensity(combinedText, seoKwList);
    found.forEach(k => allKeywordsFound.add(k));

    // Audit Rule: Localized Keyword Density Checklist
    if (seoKwList.length > 0 && density === 0 && sect.type !== 'footer') {
      issues.push({
        id: `${sect.id}-kw-density`,
        severity: 'warning',
        category: 'keywords',
        title: 'Zero Keyword Density Match',
        description: `This section copy has zero mentions of focus audience keywords: [${seoKwList.join(', ')}].`,
        suggestedAction: `Inject descriptive keywords like "${seoKwList[0] || 'innovative product'}" naturally inside your header labels.`,
        elementLabel: 'Section Headline',
        hotspotXY: { x: 30, y: 15 },
        canAutoFix: true,
        autoFixAction: (s, brand) => {
          const fObj = { ...s.fields } as any;
          const kw = seoKwList[0] || brand;
          if (fObj.headline) {
            fObj.headline = `${fObj.headline} for ${kw}`;
          }
          return { ...s, fields: fObj };
        }
      });
    }

    // Audit Rule: Thin Content Check
    if (wordCount < 20 && sect.type !== 'footer' && sect.type !== 'counter') {
      issues.push({
        id: `${sect.id}-thin-content`,
        severity: 'info',
        category: 'content',
        title: 'Thin Copywriting Profile',
        description: `Total content of ${wordCount} words is skinny. Google penalizes thin landing page architectures.`,
        suggestedAction: 'Expand subheaders or introduce additional descriptive secondary paragraphs.',
        elementLabel: 'Section Body Text',
        hotspotXY: { x: 50, y: 35 },
        canAutoFix: true,
        autoFixAction: (s, brand) => {
          const fObj = { ...s.fields } as any;
          if (fObj.subheadline) {
            fObj.subheadline = `${fObj.subheadline} Crafted explicitly to handle high-performance industry workflows, maximizing your daily conversion output and customer engagement rates starting on day one.`;
          } else if (fObj.description) {
            fObj.description = `${fObj.description} Our professional solution is backed by enterprise-grade infrastructure built for speed, safety, and scalable utility.`;
          }
          return { ...s, fields: fObj };
        }
      });
    }

    // Section Specific Custom Audits
    if (sect.type === 'hero') {
      // Missing H1 Subject Checker
      if (!fields.headline || fields.headline.length < 12) {
        issues.push({
          id: `${sect.id}-h1-short`,
          severity: 'error',
          category: 'structure',
          title: 'H1 Headline Too Short / Raw',
          description: 'The primary H1 tag is critical for crawling indexing. Short or generic titles reduce domain trust.',
          suggestedAction: 'Increase headline text length to at least 25 characters to capture high-value ranking phrases.',
          elementLabel: 'H1 Headline',
          hotspotXY: { x: 15, y: 22 },
          canAutoFix: true,
          autoFixAction: (s, brand) => {
            const fObj = { ...s.fields } as any;
            fObj.headline = `Accelerate Your Workspace with Premium ${brand} Engine Today`;
            return { ...s, fields: fObj };
          }
        });
      }

      // H1 Count Warning
      if (h1Count > 1) {
        issues.push({
          id: `${sect.id}-multiple-h1`,
          severity: 'error',
          category: 'structure',
          title: 'Duplicate H1 Heading Nodes',
          description: `Detected ${h1Count} hero sections. Having multiple H1 tags per single-page application dilutes indexing power.`,
          suggestedAction: 'Convert duplicate hero elements to feature lists or standard landing blocks.',
          elementLabel: 'Global Page Rule',
          hotspotXY: { x: 75, y: 8 },
          canAutoFix: false,
          autoFixAction: (s) => s
        });
      }

      // Missing Image Alternate Checker (Since f.imageUrl is rendered)
      if (fields.showImage && fields.imageUrl) {
        const isPlaceholder = fields.imageUrl.includes('placeholder') || fields.imageUrl.includes('unsplash.com/photo-1542744094');
        if (isPlaceholder) {
          issues.push({
            id: `${sect.id}-generic-image`,
            severity: 'info',
            category: 'altText',
            title: 'Generic Unsplash Placeholder Asset ID URL',
            description: 'Your image tags rely on a standard placeholder URL. Search crawlers prefer custom distinct graphical source titles.',
            suggestedAction: 'Use the visual asset generator to compile a custom distinct logo/photo.',
            elementLabel: 'Graphic Media',
            hotspotXY: { x: 80, y: 50 },
            canAutoFix: false,
            autoFixAction: (s) => s
          });
        }
      }

      // CTA check
      const isGenericCta = ['learn more', 'go', 'submit', 'click here', 'get started', 'sign up'].includes((fields.ctaText || '').toLowerCase().trim());
      if (isGenericCta) {
        issues.push({
          id: `${sect.id}-generic-cta`,
          severity: 'warning',
          category: 'cta',
          title: 'Non-descriptive Generic Call-To-Action Link',
          description: `The button link text "${fields.ctaText}" is extremely generic. Non-distinct CTAs lower accessible screenreader conversions.`,
          suggestedAction: 'Change the button callout to describe exactly what is unlocked (e.g. "Join Waitlist Now").',
          elementLabel: 'CTA Button',
          hotspotXY: { x: 25, y: 70 },
          canAutoFix: true,
          autoFixAction: (s, brand) => {
            const fObj = { ...s.fields } as any;
            fObj.ctaText = `Unlock ${brand} Beta Launch Access`;
            return { ...s, fields: fObj };
          }
        });
      }
    }

    if (sect.type === 'features') {
      const itemsCount = fields.items?.length || 0;
      if (itemsCount < 3) {
        issues.push({
          id: `${sect.id}-few-features`,
          severity: 'warning',
          category: 'structure',
          title: 'Sparse Features Blueprint',
          description: `Found only ${itemsCount} items. Features layout grids expect 3-4 feature items to look visually balanced on desktop.`,
          suggestedAction: 'Append at least one more feature card containing high reliability or performance statistics.',
          elementLabel: 'Bento Grid Items',
          hotspotXY: { x: 50, y: 75 },
          canAutoFix: true,
          autoFixAction: (s) => {
            const fObj = { ...s.fields } as any;
            const current = fObj.items || [];
            const newFeature = {
              id: `feat-${Date.now()}`,
              icon: 'Shield',
              title: 'Secure Encrypted Operations',
              description: 'Enterprise secure cryptography protection standards guarding user information pipelines.'
            };
            fObj.items = [...current, newFeature];
            return { ...s, fields: fObj };
          }
        });
      }
    }

    if (sect.type === 'leadForm') {
      const btnText = fields.buttonText || '';
      if (!btnText || ['submit', 'send', 'ok'].includes(btnText.toLowerCase().trim())) {
        issues.push({
          id: `${sect.id}-plain-form-btn`,
          severity: 'warning',
          category: 'cta',
          title: 'Apathetic Lead Form Confirm Action Text',
          description: 'A standard "Submit" action fails to represent user intent benefits. This restricts registration rates.',
          suggestedAction: 'Upgrade button texts to conversion hooks like "Claim Free Account" or "Join Exclusive Beta Group".',
          elementLabel: 'Form Button Link',
          hotspotXY: { x: 60, y: 55 },
          canAutoFix: true,
          autoFixAction: (s, brand) => {
            const fObj = { ...s.fields } as any;
            fObj.buttonText = `Register for ${brand} Priority List`;
            return { ...s, fields: fObj };
          }
        });
      }
    }

    if (sect.type === 'testimonials') {
      const items = fields.items || [];
      const missingAvatars = items.some((it: any) => !it.avatarUrl);
      if (missingAvatars) {
        issues.push({
          id: `${sect.id}-missing-avatars`,
          severity: 'info',
          category: 'accessibility',
          title: 'Missing Reviewer Verification Avatars',
          description: 'Anonymous reviews without face avatar assets score lower in schema.org semantic authenticity.',
          suggestedAction: 'Inject high-contrast user faces placeholders inside reviewer cards.',
          elementLabel: 'Review Profile Photos',
          hotspotXY: { x: 45, y: 65 },
          canAutoFix: true,
          autoFixAction: (s) => {
            const fObj = { ...s.fields } as any;
            const updatedItems = (fObj.items || []).map((it: any, idx: number) => {
              if (it.avatarUrl) return it;
              return {
                ...it,
                avatarUrl: idx % 2 === 0 
                  ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' 
                  : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
              };
            });
            fObj.items = updatedItems;
            return { ...s, fields: fObj };
          }
        });
      }
    }

    if (sect.type === 'faq') {
      const items = fields.items || [];
      if (items.length < 3) {
        issues.push({
          id: `${sect.id}-sparse-faq`,
          severity: 'warning',
          category: 'structure',
          title: 'Sparse FAQ Schema Scope',
          description: 'Google Rich Cards FAQ snippets require at least 3 FAQ items to warrant rich display in Google results pages.',
          suggestedAction: 'Draft additional FAQ answers targeting common customer pricing or integration onboarding friction points.',
          elementLabel: 'FAQ Q&A Accordion',
          hotspotXY: { x: 50, y: 50 },
          canAutoFix: true,
          autoFixAction: (s) => {
            const fObj = { ...s.fields } as any;
            const current = fObj.items || [];
            const addedFaqs = [
              {
                id: `faq-${Date.now()}-1`,
                question: 'Can I integrate my custom domain endpoint?',
                answer: 'Yes! All workspace tiers feature immediate custom DNS records bindings so you can deploy your branding cleanly.'
              },
              {
                id: `faq-${Date.now()}-2`,
                question: 'Is user details storage compliant?',
                answer: 'Absolutely. We hold our active frameworks to modern standards, conducting offline backups continuously.'
              }
            ];
            // Take up to 3 total
            fObj.items = [...current, ...addedFaqs].slice(0, 4);
            return { ...s, fields: fObj };
          }
        });
      }
    }

    if (sect.type === 'footer') {
      const emptySocials = !fields.twitterUrl && !fields.githubUrl && !fields.linkedinUrl;
      if (emptySocials) {
        issues.push({
          id: `${sect.id}-missing-socials`,
          severity: 'info',
          category: 'accessibility',
          title: 'Empty Social Graph Signaling',
          description: 'Social handles linked in footers are crawl checkpoints verifying structural entity trust.',
          suggestedAction: 'Add placeholder handle URLs inside configuration values.',
          elementLabel: 'Footer Social Portals',
          hotspotXY: { x: 75, y: 40 },
          canAutoFix: true,
          autoFixAction: (s, brand) => {
            const fObj = { ...s.fields } as any;
            fObj.twitterUrl = 'https://twitter.com/flashfocus_app';
            fObj.githubUrl = 'https://github.com/flashfocus';
            fObj.linkedinUrl = 'https://linkedin.com/company/flashfocus';
            return { ...s, fields: fObj };
          }
        });
      }
    }

    // Calculate score
    let score = 100;
    issues.forEach(i => {
      if (i.severity === 'error') {
        score -= 25;
        totalErrors++;
      } else if (i.severity === 'warning') {
        score -= 10;
        totalWarnings++;
      } else {
        score -= 3;
        totalInfos++;
      }
    });

    sectionResults.push({
      sectionId: sect.id,
      sectionType: sect.type,
      sectionTitle: sect.title || sect.type,
      score: Math.max(0, score),
      issues
    });
  });

  // Calculate Overall Score
  const scoredCount = sectionResults.length;
  let overallScore = 100;
  
  if (scoredCount > 0) {
    const avgScore = sectionResults.reduce((acc, curr) => acc + curr.score, 0) / scoredCount;
    // Missing H1 penalty globally
    if (h1Count === 0) {
      overallScore = Math.max(0, avgScore - 20);
    } else {
      overallScore = Math.max(0, avgScore);
    }
  }

  // Cap scores between 0 and 100
  overallScore = Math.round(Math.min(100, Math.max(0, overallScore)));

  return {
    overallScore,
    totalErrors,
    totalWarnings,
    totalInfos,
    sectionResults,
    keywordsDetected: Array.from(allKeywordsFound)
  };
};
