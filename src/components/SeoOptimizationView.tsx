import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  Layers, 
  Tag, 
  HelpCircle, 
  FileText, 
  ArrowRight,
  Code,
  Copy,
  Check,
  Globe,
  Coins,
  PhoneCall,
  Settings,
  TrendingUp,
  Users,
  Share2,
  Send,
  Cpu,
  BarChart2,
  ShieldCheck,
  Terminal,
  Sliders,
  Play,
  Plus,
  Trash2,
  ListOrdered
} from 'lucide-react';
import { LandingPage, SeoMetadata } from '../types';
import { auditLandingPage, SeoIssue } from '../utils/seoAuditor';
import { GrowthConsoleSubView } from './GrowthConsoleSubView';

interface SeoOptimizationViewProps {
  activePage: LandingPage;
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
}

export const SeoOptimizationView: React.FC<SeoOptimizationViewProps> = ({
  activePage,
  updateActivePage
}) => {
  // Sub-tab switching between core tags and advanced analytics
  const [seoSubTab, setSeoSubTab] = useState<'on-page' | 'growth'>('on-page');

  // Live computed SEO audit results
  const pageAuditResult = auditLandingPage(activePage);

  // Current values
  const currentSeo = activePage.seo || {
    title: '',
    description: '',
    keywords: '',
    targetAudience: '',
    pagePurpose: '',
    seoScore: 0,
    suggestions: [],
    schemaType: 'SoftwareApplication',
    schemaMarkup: ''
  };

  const [pagePurpose, setPagePurpose] = useState(currentSeo.pagePurpose || '');
  const [targetAudience, setTargetAudience] = useState(currentSeo.targetAudience || '');
  
  // Local state for meta tag outputs
  const [metaTitle, setMetaTitle] = useState(currentSeo.title || '');
  const [metaDesc, setMetaDesc] = useState(currentSeo.description || '');
  const [metaKeywords, setMetaKeywords] = useState(currentSeo.keywords || '');
  const [seoScore, setSeoScore] = useState(currentSeo.seoScore || 35);
  const [suggestions, setSuggestions] = useState<string[]>(currentSeo.suggestions || [
    'No analysis has been triggered for this subpage slot yet.',
    'Enter page purpose & target audience to generate custom keyword sets.',
    'Verify character counts are in the recommended optimal range (Title: 50-60, Desc: 120-155 characters).'
  ]);

  // JSON-LD Structured Data Schema State
  const [schemaType, setSchemaType] = useState<'Organization' | 'SoftwareApplication' | 'Product' | 'LocalBusiness' | 'WebSite'>(
    currentSeo.schemaType || 'SoftwareApplication'
  );

  // Dynamic parameters for Local Template Generator
  const [customPrice, setCustomPrice] = useState('29.00');
  const [customCurrency, setCustomCurrency] = useState('USD');
  const [customPhone, setCustomPhone] = useState('+1-800-555-1234');
  const [customAddress, setCustomAddress] = useState('100 Silicon Way, Palo Alto, CA 94301');

  // Generator callback
  const generateTemplateSchema = (
    type: 'Organization' | 'SoftwareApplication' | 'Product' | 'LocalBusiness' | 'WebSite',
    pVal = customPrice,
    currVal = customCurrency,
    phVal = customPhone,
    adrVal = customAddress
  ) => {
    const brand = activePage.name || 'FlashFocus Startup';
    const desc = metaDesc || 'High-performance AI generated landing experience.';
    const url = `https://${brand.toLowerCase().replace(/[^a-z0-9]/g, '') || 'app'}.flashfocus.app`;
    
    let json: any = {
      "@context": "https://schema.org"
    };

    if (type === 'SoftwareApplication') {
      json = {
        ...json,
        "@type": "SoftwareApplication",
        "name": brand,
        "description": desc,
        "operatingSystem": "All, Web Browser",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": pVal || "29.00",
          "priceCurrency": currVal || "USD"
        }
      };
    } else if (type === 'Product') {
      json = {
        ...json,
        "@type": "Product",
        "name": brand,
        "description": desc,
        "brand": {
          "@type": "Brand",
          "name": brand
        },
        "offers": {
          "@type": "Offer",
          "price": pVal || "49.00",
          "priceCurrency": currVal || "USD",
          "availability": "https://schema.org/InStock"
        }
      };
    } else if (type === 'Organization') {
      json = {
        ...json,
        "@type": "Organization",
        "name": brand,
        "description": desc,
        "url": url,
        "logo": `${url}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": phVal || "+1-800-555-0199",
          "contactType": "customer service"
        }
      };
    } else if (type === 'LocalBusiness') {
      const parts = adrVal.split(',');
      const street = parts[0] ? parts[0].trim() : '100 Silicon Way';
      const city = parts[1] ? parts[1].trim() : 'Palo Alto';
      const stateZip = parts[2] ? parts[2].trim() : 'CA 94301';

      json = {
        ...json,
        "@type": "LocalBusiness",
        "name": brand,
        "description": desc,
        "telephone": phVal || "+1-555-201-3004",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": street,
          "addressLocality": city,
          "addressRegion": stateZip.split(' ')[0] || 'CA',
          "postalCode": stateZip.split(' ')[1] || '94301',
          "addressCountry": "US"
        }
      };
    } else {
      // WebSite
      json = {
        ...json,
        "@type": "WebSite",
        "name": brand,
        "url": url,
        "description": desc,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${url}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
    }
    return JSON.stringify(json, null, 2);
  };

  const [schemaMarkup, setSchemaMarkup] = useState<string>(() => {
    return currentSeo.schemaMarkup || generateTemplateSchema(currentSeo.schemaType || 'SoftwareApplication');
  });

  // Real-time Schema Validator States
  const [isValidatingSchema, setIsValidatingSchema] = useState(false);
  const [schemaValidationResult, setSchemaValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    info?: { detectedType: string; detectedContext: string; keysCheckedCount: number };
  } | null>(null);

  const handleValidateSchemaMarkup = async (markupToValidate = schemaMarkup) => {
    setIsValidatingSchema(true);
    try {
      const resp = await fetch('/api/seo/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ schemaMarkup: markupToValidate })
      });
      if (resp.ok) {
        const data = await resp.json();
        setSchemaValidationResult({
          isValid: data.isValid,
          errors: data.errors || [],
          warnings: data.warnings || [],
          info: data.info
        });
      } else {
        const errText = await resp.text();
        setSchemaValidationResult({
          isValid: false,
          errors: [`HTTP validator error: ${errText || 'Unreadable backend response'}`],
          warnings: []
        });
      }
    } catch (err: any) {
      setSchemaValidationResult({
        isValid: false,
        errors: [`Connection failed: ${err.message || 'Server check timed out'}`],
        warnings: []
      });
    } finally {
      setIsValidatingSchema(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (schemaMarkup.trim()) {
        handleValidateSchemaMarkup(schemaMarkup);
      }
    }, 450);

    return () => {
      clearTimeout(handler);
    };
  }, [schemaMarkup]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // AI auto-fix specific tracking
  const [fixingIssueId, setFixingIssueId] = useState<string | null>(null);
  const [fixSuccessMsg, setFixSuccessMsg] = useState<string | null>(null);

  const handleTriggerAutoFix = async (sectId: string, issue: SeoIssue) => {
    setFixingIssueId(issue.id);
    setApiError(null);
    setFixSuccessMsg(null);

    const section = activePage.sections.find(s => s.id === sectId);
    if (!section) {
      setFixingIssueId(null);
      return;
    }

    try {
      // Background update trigger calling Gemini /api/seo/autofix
      const resp = await fetch('/api/seo/autofix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section: section,
          issue: issue,
          keywords: metaKeywords || currentSeo.keywords || activePage.name,
          brandName: activePage.name,
          purpose: pagePurpose || activePage.name
        })
      });

      if (!resp.ok) {
        throw new Error('API Key missing or expired. Falling back to offline local heuristic fixer.');
      }

      const data = await resp.json();
      if (data.fields) {
        // Successful Gemini response! Update the active page section fields in background
        updateActivePage((curr) => {
          const updatedSections = curr.sections.map(s => {
            if (s.id === sectId) {
              return {
                ...s,
                fields: data.fields
              };
            }
            return s;
          });
          return {
            ...curr,
            sections: updatedSections
          };
        });
        setFixSuccessMsg(`AI Auto-Fixed: Successfully rewrote copy for the ${section.title || section.type} section with Optimized SEO keywords!`);
      } else {
        throw new Error('Invalid JSON format received from AI. Falling back to offline fixer.');
      }
    } catch (err: any) {
      console.warn('AI Auto-Fix background endpoint warning:', err.message);
      
      // Smart Fallback pattern: use offline heuristic rule when Gemini API is unconfigured! This guarantees the button ALWAYS works.
      updateActivePage((curr) => {
        const updatedSections = curr.sections.map(s => {
          if (s.id === sectId) {
            return issue.autoFixAction(s, curr.name);
          }
          return s;
        });
        return {
          ...curr,
          sections: updatedSections
        };
      });

      setFixSuccessMsg(`Heuristic Auto-Fixed: Upgraded ${section.title || section.type} copy parameters via local rules.`);
    } finally {
      setFixingIssueId(null);
      setTimeout(() => setFixSuccessMsg(null), 4000);
    }
  };

  // Synchronize generated custom states
  useEffect(() => {
    // If we have dynamic state changes, update fallback schema if user hasn't gotten custom AI ones
    if (!currentSeo.schemaMarkup) {
      setSchemaMarkup(generateTemplateSchema(schemaType));
    }
  }, [customPrice, customCurrency, customPhone, customAddress]);

  // Quick Preset Templates
  const presets = [
    { name: 'SaaS Crypto App', purpose: 'Futuristic real-time Web3 DeFi tracker and GenZ portfolio builder.', audience: 'Young high-intensity retail portfolio managers and risk traders' },
    { name: 'AI Copywriting tool', purpose: 'SaaS prompt playground for marketing agencies generating 10x organic hooks.', audience: 'Indie builders, digital design creators, and copy writers' },
    { name: 'Indie Coffee Roast', purpose: 'Single-source micro-batch roasted coffee preorder subscription launch.', audience: 'Artisanal culinary critics and premium caffeine enthusiasts' },
    { name: 'Digital Design Assets', purpose: 'Curated library download gateway for minimalist responsive website layouts.', audience: 'UI engineers, agency founders, and Figma designers' }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setPagePurpose(preset.purpose);
    setTargetAudience(preset.audience);
    setSuccessMsg(`Applied Quick Focus Profile: "${preset.name}"`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const resp = await fetch('/api/seo/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          landingPage: activePage,
          pagePurpose,
          targetAudience
        })
      });

      if (!resp.ok) {
        throw new Error('AI Server is establishing local endpoints. Ensure your API key is configured correctly.');
      }

      const data = await resp.json();
      setMetaTitle(data.title);
      setMetaDesc(data.description);
      setMetaKeywords(data.keywords);
      setSeoScore(data.seoScore);
      setSuggestions(data.suggestions);
      
      // Update template schema as well
      const updatedSchema = generateTemplateSchema(schemaType);
      setSchemaMarkup(updatedSchema);

      setSuccessMsg('SEO structural review completed! Hit "Apply to Active Workspace" below to save.');
    } catch (err: any) {
      setApiError(err.message || 'An error occurred during content evaluation.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    if (!pagePurpose.trim() || !targetAudience.trim()) {
      setApiError('Page purpose and target audience description are required to compile an optimized SEO profile.');
      return;
    }

    setIsGenerating(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const resp = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pagePurpose,
          targetAudience,
          brandName: activePage.name
        })
      });

      if (!resp.ok) {
        throw new Error('Failed to generate SEO parameters. Check console logs or settings.');
      }

      const data = await resp.json();
      setMetaTitle(data.title);
      setMetaDesc(data.description);
      setMetaKeywords(data.keywords);
      setSeoScore(data.seoScore || 90);
      setSuggestions(data.suggestions || []);

      const updatedSchema = generateTemplateSchema(schemaType);
      setSchemaMarkup(updatedSchema);

      setSuccessMsg('New conversion-focused SEO metadata successfully drafted!');
    } catch (err: any) {
      setApiError(err.message || 'Error occurred while drafting metadata.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAIGenerateSchema = async () => {
    setIsGeneratingSchema(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const resp = await fetch('/api/seo/schema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brandName: activePage.name,
          pagePurpose: pagePurpose || activePage.name,
          targetAudience: targetAudience || 'Search crawler web spiders',
          schemaType: schemaType,
          metaDescription: metaDesc
        })
      });

      if (!resp.ok) {
        throw new Error('AI Schema generation failed. Please configure your key in Secrets.');
      }

      const data = await resp.json();
      if (data.schemaJson) {
        setSchemaMarkup(JSON.stringify(data.schemaJson, null, 2));
        setSuccessMsg('Gemini AI successfully built premium schema.org metadata specifications!');
      } else {
        throw new Error('Invalid JSON structure drafted by Gemini.');
      }
    } catch (err: any) {
      setApiError(err.message || 'Error executing Schema generation pipeline.');
    } finally {
      setIsGeneratingSchema(false);
    }
  };

  const handleTypeChange = (type: 'Organization' | 'SoftwareApplication' | 'Product' | 'LocalBusiness' | 'WebSite') => {
    setSchemaType(type);
    const updated = generateTemplateSchema(type, customPrice, customCurrency, customPhone, customAddress);
    setSchemaMarkup(updated);
  };

  const handleCopySchema = () => {
    const fullScript = `<script type="application/ld+json">\n${schemaMarkup}\n</script>`;
    navigator.clipboard.writeText(fullScript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleApplyToWorkspace = () => {
    updateActivePage((curr) => ({
      ...curr,
      seo: {
        title: metaTitle,
        description: metaDesc,
        keywords: metaKeywords,
        pagePurpose,
        targetAudience,
        seoScore,
        suggestions,
        schemaType,
        schemaMarkup
      }
    }));
    setSuccessMsg('Successfully saved SEO Tags and Structured Schema Markup to active Campaign workspace!');
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // Advanced Growth & SEO Engine State Stores
  const [activeSubTab, setActiveSubTab] = useState<'on-page' | 'serp-console' | 'waitlist-referrals' | 'growth-agents'>('on-page');
  const [searchConsoleTimeframe, setSearchConsoleTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [searchConsoleStats, setSearchConsoleStats] = useState({ clicks: 1420, impressions: 28450, ctr: 4.99, pos: 12.4 });
  const [isConsoleRefreshing, setIsConsoleRefreshing] = useState(false);
  const [indexingRequested, setIndexingRequested] = useState(false);
  const [isRequestingIndex, setIsRequestingIndex] = useState(false);
  const [activeSitemapTab, setActiveSitemapTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [isOptimized, setIsOptimized] = useState(true);

  // Core Web Vitals variables
  const [cdnCaching, setCdnCaching] = useState(true);
  const [imageCompression, setImageCompression] = useState(true);
  const [networkSpeedThrottling, setNetworkSpeedThrottling] = useState<'none' | 'lte' | 'slow3g'>('none');

  // Interactive Keyword registry
  const [customRankKeyword, setCustomRankKeyword] = useState('');
  const [keywordsCollection, setKeywordsCollection] = useState([
    { kw: `${activePage.name.toLowerCase()} app platform`, vol: '4,500', diff: 'Low', intent: 'Commercial', pos: 3 },
    { kw: `${activePage.name.toLowerCase()} waitlist`, vol: '1,200', diff: 'Very Easy', intent: 'Transactional', pos: 1 },
    { kw: `${activePage.name.toLowerCase()} pricing drops`, vol: '850', diff: 'Easy', intent: 'Transactional', pos: 5 },
    { kw: 'autonomous seo optimizer', vol: '18,400', diff: 'Hard', intent: 'Commercial', pos: 18 },
    { kw: 'real-time growth engine', vol: '9,200', diff: 'Medium', intent: 'Commercial', pos: 24 }
  ]);

  // Viral Waitlist Referral systems
  const [referralInput, setReferralInput] = useState('');
  const [referralsTier, setReferralsTier] = useState<'Elite Beta' | 'Growth Alpha' | 'General Pub'>('Elite Beta');
  const [referralCodes, setReferralCodes] = useState([
    { code: `VIP-${activePage.name.toUpperCase().replace(/\s+/g, '').substring(0, 4)}-88`, views: 420, convs: 112, cr: '26.6%', tier: 'Elite Beta' },
    { code: `ALPHA-${activePage.name.toUpperCase().replace(/\s+/g, '').substring(0, 4)}-77`, views: 210, convs: 48, cr: '22.8%', tier: 'Growth Alpha' },
    { code: `SHARE-${activePage.name.toUpperCase().replace(/\s+/g, '').substring(0, 4)}-01`, views: 95, convs: 15, cr: '15.7%', tier: 'General Pub' }
  ]);

  // Waitlist Leaderboard State
  const [waitlistSearch, setWaitlistSearch] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadInvites, setNewLeadInvites] = useState(0);
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, email: 'founder@stripe.com', code: 'STRP-90', invites: 45, score: 920, tier: 'Elite Beta', addedAt: '2026-05-28' },
    { rank: 2, email: 'growth@vercel.com', code: 'VRCL-01', invites: 32, score: 680, tier: 'Elite Beta', addedAt: '2026-05-29' },
    { rank: 3, email: 'viswatejam45@gmail.com', code: 'VISW-44', invites: 28, score: 560, tier: 'Growth Alpha', addedAt: '2026-05-15' },
    { rank: 4, email: 'ceo@midjourney.com', code: 'MJNY-52', invites: 19, score: 380, tier: 'Growth Alpha', addedAt: '2026-05-22' },
    { rank: 5, email: 'beta-tester@gmail.com', code: 'GMAL-12', invites: 8, score: 160, tier: 'General Pub', addedAt: '2026-05-29' }
  ]);

  // Campaign copywriter inputs
  const [emailCampaignGoal, setEmailCampaignGoal] = useState<'vip_beta' | 'milestone_alert' | 'discount_nudge'>('vip_beta');
  const [emailSubject, setEmailSubject] = useState(`🚀 Private invitation to join the exclusive beta of ${activePage.name}`);
  const [emailPreviewText, setEmailPreviewText] = useState(`Claim your early adopter spot and grab an exclusive discount voucher inside.`);
  const [emailBodyHtml, setEmailBodyHtml] = useState(`<p>Hello [Lead Name],</p>\n<p>We are officially kicking off private beta onboarding for <strong>${activePage.name}</strong> next week, and we would love for you to join us.</p>\n<p>Claim your spot below to secure 50% lifetime discount on our launch plans:</p>\n<div style="margin:20px 0;"><a href="[Direct Link]" style="background:#8B5CF6; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:8px; font-weight:bold;">Claim VIP Onboarding Ticket</a></div>\n<p>Warmest regards,<br>The ${activePage.name} Team</p>`);
  const [emailGrowthTip, setEmailGrowthTip] = useState(`💡 **CRO Tip**: Segment early signups and incentivize referrals with an extra 10% discount multiplier for maximum growth momentum.`);
  const [isDraftingEmail, setIsDraftingEmail] = useState(false);

  // Background AI Agents Telemetry Registry
  const [agentsRunning, setAgentsRunning] = useState(true);
  const [agentLogs, setAgentLogs] = useState([
    { timestamp: '12:15:02', agent: 'SEO Optimizer Log', action: 'Finished dynamic robots.txt compilation. Sitemap sitemap.xml generated.', type: 'success' },
    { timestamp: '12:15:40', agent: 'Competitive Intelligence', action: 'Scouting similar startup landing formats. Found 1 potential keyword density gap: "real-time growth engine".', type: 'info' },
    { timestamp: '12:16:11', agent: 'CRO Conversion Master', action: 'Recommended applying social proof modules below the primary waitlist form to reduce cart bouncing.', type: 'warn' },
    { timestamp: '12:17:34', agent: 'Content Strategy Bot', action: 'Auto-scouting Google Trends: verified search volume for "AI workflow optimization" grew 45% this week.', type: 'success' }
  ]);

  // Self-Healing Core configurations
  const [selfHealingConfig, setSelfHealingConfig] = useState({
    autoBrokenRedirect: true,
    rollbackOnSitePerformanceDrop: true,
    canonicalIndexAlertRepair: true
  });

  // Parallel Model Reasoning Comparison State
  const [multiModelMode, setMultiModelMode] = useState<'gemini-flash' | 'gemini-pro' | 'claude-sonnet' | 'parallel'>('parallel');
  const [modelPrompt, setModelPrompt] = useState('Write an urgent headline copy targeting SaaS startups trying to rank fast.');
  const [modelCompareData, setModelCompareData] = useState({
    flash: {
      headline: '⚡ "Launch, Rank, and Scale Your Startup Automatically."',
      rationale: 'Hyper-focused on automation benefits, captures short attention spans immediately.',
      speedMs: 140,
      score: 9.2
    },
    pro: {
      headline: '🎯 "The Autonomous Growth Suite That Puts Your SEO on Absolute Autopilot."',
      rationale: 'Uses high-authority branding adjectives. Establishes serious credibility for enterprise readers.',
      speedMs: 580,
      score: 9.6
    },
    sonnet: {
      headline: '✨ "Stop Burning Ads cash. Let AI Drive High-Intent Traffic to Your Landing Page."',
      rationale: 'Addresses the core advertiser pain points head-on. High emotional conversion multiplier.',
      speedMs: 410,
      score: 9.5
    }
  });

  // Interactive handler methods
  const handleSimulateRefreshStats = () => {
    setIsConsoleRefreshing(true);
    setTimeout(() => {
      const incrementClicks = Math.floor(Math.random() * 80) + 20;
      const incrementImpressions = Math.floor(Math.random() * 800) + 200;
      setSearchConsoleStats(prev => ({
        clicks: prev.clicks + incrementClicks,
        impressions: prev.impressions + incrementImpressions,
        ctr: parseFloat(((prev.clicks + incrementClicks) / (prev.impressions + incrementImpressions) * 100).toFixed(2)),
        pos: parseFloat((prev.pos + (Math.random() * 0.4 - 0.2)).toFixed(1))
      }));
      
      const newLog = {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Search Console Real-Time Sync',
        action: `Sync completed. Clicks increased by +${incrementClicks}, Impressions grew by +${incrementImpressions}.`,
        type: 'success' as const
      };
      setAgentLogs(prev => [newLog, ...prev]);
      setIsConsoleRefreshing(false);
    }, 800);
  };

  const handleSimulateIndexingRequest = () => {
    setIsRequestingIndex(true);
    setTimeout(() => {
      setIndexingRequested(true);
      setIsRequestingIndex(false);
      const newLog = {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Google Ingress Indexer',
        action: `Successfully dispatched URL verification request for /campaign/${activePage.slug}. Standby for crawling.`,
        type: 'success' as const
      };
      setAgentLogs(prev => [newLog, ...prev]);
    }, 1500);
  };

  const handleAddNewKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRankKeyword.trim()) return;
    const isMedium = Math.random() > 0.4;
    const newKw = {
      kw: customRankKeyword.toLowerCase().trim(),
      vol: (Math.floor(Math.random() * 150) * 100).toLocaleString(),
      diff: isMedium ? 'Medium' : 'Easy',
      intent: Math.random() > 0.5 ? 'Commercial' : 'Transactional',
      pos: Math.floor(Math.random() * 30) + 1
    };
    setKeywordsCollection(prev => [newKw, ...prev]);
    const newLog = {
      timestamp: new Date().toTimeString().split(' ')[0],
      agent: 'Ahrefs Scraper Mimic',
      action: `Scraped target parameters for keyword "${customRankKeyword}": Rank position estimated at #${newKw.pos}.`,
      type: 'info' as const
    };
    setAgentLogs(prev => [newLog, ...prev]);
    setCustomRankKeyword('');
  };

  const handleCreateReferralCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralInput.trim()) return;
    const codeStr = referralInput.toUpperCase().replace(/\s+/g, '-');
    const newCode = {
      code: codeStr,
      views: 0,
      convs: 0,
      cr: '0%',
      tier: referralsTier
    };
    setReferralCodes(prev => [newCode, ...prev]);
    setReferralInput('');
    const newLog = {
      timestamp: new Date().toTimeString().split(' ')[0],
      agent: 'Waitlist Referral Engine',
      action: `Activated referral coupon track for code: ${codeStr} [Tier: ${referralsTier}].`,
      type: 'success' as const
    };
    setAgentLogs(prev => [newLog, ...prev]);
  };

  const handleAddNewLeadLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadEmail.trim() || !newLeadEmail.includes('@')) return;
    
    setLeaderboard(prev => {
      const invites = newLeadInvites || Math.floor(Math.random() * 10);
      const score = invites * 20;
      const tier = invites >= 20 ? 'Elite Beta' : invites >= 5 ? 'Growth Alpha' : 'General Pub';
      const addedLeader = {
        rank: 1, // recalculated below
        email: newLeadEmail.trim(),
        code: `${newLeadEmail.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 90) + 10}`,
        invites,
        score,
        tier,
        addedAt: new Date().toISOString().split('T')[0]
      };
      
      const newArray = [...prev, addedLeader];
      // Sort and map rank
      return newArray
        .sort((a, b) => b.invites - a.invites)
        .map((itm, index) => ({ ...itm, rank: index + 1 }));
    });

    const newLog = {
      timestamp: new Date().toTimeString().split(' ')[0],
      agent: 'Waitlist Referral Engine',
      action: `Incoming referral subscriber logged: ${newLeadEmail} with ${newLeadInvites || 0} referral invites recorded.`,
      type: 'success' as const
    };
    setAgentLogs(prev => [newLog, ...prev]);

    setNewLeadEmail('');
    setNewLeadInvites(0);
  };

  const handleAIGenerateCampaignCampaignEmail = async () => {
    setIsDraftingEmail(true);
    try {
      const resp = await fetch('/api/email/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName: activePage.name,
          description: pagePurpose || activePage.name,
          goal: emailCampaignGoal,
          listSize: leaderboard.length
        })
      });

      if (!resp.ok) throw new Error('Endpoints offline. Dispatching local backup compiler...');
      
      const data = await resp.json();
      setEmailSubject(data.subjectLine);
      setEmailPreviewText(data.previewText);
      setEmailBodyHtml(data.bodyHtml);
      setEmailGrowthTip(data.growthHacksTip);

      const newLog = {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Content Strategy Bot',
        action: `Synthesized CTR optimized newsletter with dynamic placeholders using gemini-3.5-flash.`,
        type: 'success' as const
      };
      setAgentLogs(prev => [newLog, ...prev]);

    } catch (err: any) {
      console.warn("API drafted fallback:", err);
      // Hard Fallback triggers beautifully
      const capitalized = activePage.name;
      if (emailCampaignGoal === 'vip_beta') {
        setEmailSubject(`🔥 Official VIP Beta access for ${capitalized} has opened!`);
        setEmailPreviewText(`Be one of the early pioneers to secure lifetime discounted pricing slots.`);
        setEmailBodyHtml(`<p>Hi [Lead Name],</p>\n<p>It's official: the wait is over. We are opening ${capitalized} Private Dev Gates to our elite subscribers.</p>\n<p>Click the secure portal below to initialize your project credentials:</p>\n<div style="margin:20px 0;"><a href="[Direct Link]" style="background:#6366F1; color:#fff; padding:11px 22px; text-decoration:none; border-radius:6px; font-weight:bold;">Initialize Core License &rarr;</a></div>\n<p>Best,<br>The ${capitalized} Team</p>`);
      } else if (emailCampaignGoal === 'milestone_alert') {
        setEmailSubject(`🎉 Look what we did together! ${capitalized} waitlist hit milestones`);
        setEmailPreviewText(`Join us in celebrating early organic ranking records and unlock referral prizes.`);
        setEmailBodyHtml(`<p>Hi [Lead Name],</p>\n<p>We've just crossed a marvelous milestones at ${capitalized}: <strong>450+ early developer adopters</strong> have registered for our launch!</p>\n<p>To celebrate, we are unlocking free standard tiers for anyone who refers 3 colleagues using their exclusive code:</p>\n<p style="font-size:16px; font-weight:bold; color:#A78BFA; background:#1e1e2d; padding:10px; display:inline-block; border-radius:5px;">Your Code: [Lead Referral Link]</p>\n<p>Keep referring and scale the leaderboards!</p>`);
      } else {
        setEmailSubject(`💡 Growth Hack insight: optimize landing velocity now with ${capitalized}`);
        setEmailPreviewText(`Take a peek at this weeks conversions analysis and score lifetime access savings.`);
        setEmailBodyHtml(`<p>Dear [Lead Name],</p>\n<p>Most landing sites bleed 60% conversion potential because of sluggish Cold-Caches. At <strong>${capitalized}</strong>, we solved that with Edge delivery.</p>\n<p>We are offering 30% savings for early growth adopters this week only:</p>\n<div style="margin:20px 0;"><a href="[Direct Link]" style="background:#059669; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">Save 30% Lifetime Core &rarr;</a></div>\n<p>Grow faster,<br>The ${capitalized} Team</p>`);
      }
      setEmailGrowthTip(`💡 **Heuristic Fallback Enabled**: Calculated high conversion templates based on selected ${emailCampaignGoal} focus vectors.`);
    } finally {
      setIsDraftingEmail(false);
    }
  };

  const handleModelPromptOptimizeSubmit = () => {
    // Generate simulated optimized headline versions according to model
    const val = modelPrompt.trim();
    if (!val) return;
    
    setModelCompareData({
      flash: {
        headline: `⚡ "Scale ${activePage.name} With Autonomous Conversion Firepower."`,
        rationale: `Integrates user search query focused on immediate ROI metrics. Yields higher CTR.`,
        speedMs: 120,
        score: 9.3
      },
      pro: {
        headline: `🎯 "The Future of Organic Growth — Build Beautiful Conversions for ${activePage.name}."`,
        rationale: `Adds structural authority. Evokes exclusive elite founder community feelings.`,
        speedMs: 520,
        score: 9.7
      },
      sonnet: {
        headline: `✨ "Your Startup Deserves Real Search Traffic. Give ${activePage.name} Absolute SEO Dominance."`,
        rationale: `Emotional leverage. Addresses ad-fatigue with pain point friction relief copy.`,
        speedMs: 380,
        score: 9.6
      }
    });

    const newLog = {
      timestamp: new Date().toTimeString().split(' ')[0],
      agent: 'Parallel Model Reasoning Orchestrator',
      action: `Completed parallel reasoning query on ${val.substring(0, 30)}... Evaluated 3 models.`,
      type: 'info' as const
    };
    setAgentLogs(prev => [newLog, ...prev]);
  };

  const handleCdnOptimizeToggleAndBoost = () => {
    setIsOptimized(prev => !prev);
    const newLog = {
      timestamp: new Date().toTimeString().split(' ')[0],
      agent: 'Edge Delivery CDN Optimizer',
      action: !isOptimized ? 'Purged browser cold cache. Render-blocking scripts minified. Web vitals boosted.' : 'CDN bypass enabled. Returning to non-cached server-side queries.',
      type: !isOptimized ? 'success' : 'warn'
    };
    setAgentLogs(prev => [newLog, ...prev]);
  };

  // Automated Robots.txt and Live XML Sitemap templates
  const computedSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${activePage.slug}.flashfocus.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${activePage.sections.map(s => `  <url>
    <loc>https://${activePage.slug}.flashfocus.app/#${s.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  const computedRobotsTxt = `# robots.txt generated dynamically for ${activePage.name}
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Sitemap index
Sitemap: https://${activePage.slug}.flashfocus.app/sitemap.xml`;

  // Dynamic Live Core Web Vitals Calculator based on toggles
  const lcpScoreValue = isOptimized ? (cdnCaching ? (imageCompression ? 0.9 : 1.5) : 2.1) : (networkSpeedThrottling === 'slow3g' ? 5.2 : networkSpeedThrottling === 'lte' ? 3.4 : 2.6);
  const fidScoreValue = isOptimized ? 45 : (networkSpeedThrottling === 'slow3g' ? 210 : networkSpeedThrottling === 'lte' ? 115 : 75);
  const clsScoreValue = isOptimized ? 0.02 : 0.18;

  const lcpColor = lcpScoreValue <= 1.2 ? 'text-emerald-450' : lcpScoreValue <= 2.5 ? 'text-amber-400' : 'text-rose-400';
  const fidColor = fidScoreValue <= 100 ? 'text-emerald-450' : fidScoreValue <= 300 ? 'text-amber-400' : 'text-rose-400';
  const clsColor = clsScoreValue <= 0.1 ? 'text-emerald-450' : clsScoreValue <= 0.25 ? 'text-amber-400' : 'text-rose-400';

  const titleLength = metaTitle.length;
  const descLength = metaDesc.length;

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto font-sans">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-white font-display uppercase tracking-widest flex items-center gap-2">
            <Search className="w-5 h-5 text-[#A78BFA]" />
            AI SEO Optimizer + JSON-LD Schema
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Optimize meta keywords density, descriptions, and generate schema.org structured JSON-LD payloads.
          </p>
        </div>
        
        {/* Active Target Banner */}
        <div className="bg-zinc-900/60 border border-white/5 py-1 px-3 rounded-full text-[10px] text-zinc-400 font-mono flex items-center gap-2 max-w-sm truncate self-start md:self-center">
          <span className="w-1.5 h-1.5 bg-[#A78BFA] rounded-full animate-ping" />
          <span>Active Campaign: <b className="text-white">{activePage.name}</b></span>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex bg-[#0c0c0e] border border-white/5 p-1 rounded-xl gap-1">
        <button
          onClick={() => setSeoSubTab('on-page')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 select-none ${
            seoSubTab === 'on-page'
              ? 'bg-zinc-900 border border-white/10 text-white shadow-lg'
              : 'text-zinc-500 hover:text-zinc-350'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#A78BFA]" />
          On-Page Metadata Tags & Schemas
        </button>
        <button
          onClick={() => setSeoSubTab('growth')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 select-none ${
            seoSubTab === 'growth'
              ? 'bg-zinc-900 border border-white/10 text-white shadow-lg'
              : 'text-zinc-500 hover:text-zinc-350'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 animate-pulse animate-duration-2000" />
          Real-Time Growth & Autonomous AI Engine (Active)
        </button>
      </div>

      {seoSubTab === 'on-page' ? (
        <>
          {/* Grid Layout of Optimization controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn pb-2">
        
        {/* LEFT COLUMN: Inputs & Focus profiles (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2 border-b border-white/5 pb-2">
              <Layers className="w-3.5 h-3.5 text-[#A78BFA]" />
              SEO Focus Profile
            </h4>

            {/* QUICK PRESET BENTO SELECTOR */}
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Quick Niche Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="p-2 text-left bg-white/2 hover:bg-white/5 border border-white/5 hover:border-white/15 focus:border-[#A78BFA] rounded-xl text-[10.5px] transition-all cursor-pointer group"
                  >
                    <span className="font-extrabold text-zinc-300 block truncate group-hover:text-white">{p.name}</span>
                    <span className="text-[8.5px] text-zinc-550 block truncate capitalize font-mono">{p.audience}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PURPOSE INPUT */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider flex justify-between">
                <span>Core Theme / Description</span>
                <span className="text-zinc-650 text-[9px] font-mono capitalize">What are you offering?</span>
              </label>
              <textarea
                value={pagePurpose}
                onChange={(e) => setPagePurpose(e.target.value)}
                placeholder="Describe your product core metrics (e.g. A fast decentralized crypto tracker for retail day traders)..."
                rows={3}
                className="w-full bg-black border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#A78BFA] transition-colors leading-relaxed font-mono"
              />
            </div>

            {/* AUDIENCE INPUT */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider flex justify-between">
                <span>Target Search Audience</span>
                <span className="text-zinc-650 text-[9px] font-mono capitalize">Who is searching?</span>
              </label>
              <input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. digital agency founders, cryptocurrency early adopters"
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#A78BFA] transition-colors font-mono"
              />
            </div>

            {/* ACTION TRIGGERS */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || isGenerating || isGeneratingSchema}
                className="flex-1 bg-white hover:bg-zinc-200 text-black text-[11px] font-black uppercase font-mono py-2.5 rounded-xl cursor-pointer disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Audit Content</span>
                  </>
                )}
              </button>

              <button
                onClick={handleGenerate}
                disabled={isAnalyzing || isGenerating || isGeneratingSchema}
                className="flex-1 bg-[#1E1B4B]/80 hover:bg-[#1E1B4B] text-[#C084FC] border border-purple-500/30 text-[11px] font-black uppercase font-mono py-2.5 rounded-xl cursor-pointer disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Drafting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI SEO Booster</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* STATUS CONTEXT BOX (Error/Success logging warnings) */}
          <AnimatePresence mode="wait">
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-red-950/20 border border-red-500/20 rounded-2xl flex items-start gap-2 text-xs text-red-300 leading-normal"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div>
                  <h5 className="font-extrabold font-mono text-[10px] uppercase text-red-400">Gateway Boundary Warning</h5>
                  <p className="mt-0.5 font-sans font-light text-red-200">{apiError}</p>
                </div>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl flex items-start gap-2 text-xs text-indigo-300 leading-normal"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                <div>
                  <h5 className="font-extrabold font-mono text-[10px] uppercase text-indigo-400">Security Gate Callback</h5>
                  <p className="mt-0.5 font-sans font-medium text-emerald-400">{successMsg}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Results & Optimization Dashboard (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-6">
            
            {/* Realtime Score Meter & Visual Headings */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 gap-4 flex-wrap">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#A78BFA]" />
                  SERP Metadata Output
                </h4>
                <p className="text-[10px] text-zinc-500">Live indicators reflect optimal search bot scan limits.</p>
              </div>

              {/* Dynamic Score Indicator Ring */}
              <div className="flex items-center gap-3 bg-[#050507] py-2 px-4 rounded-2xl border border-white/5 shadow-inner">
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="22" cy="22" r="18" fill="transparent" stroke="#27272a" strokeWidth="4" />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="transparent"
                      stroke={seoScore >= 80 ? '#10B981' : seoScore >= 50 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="4"
                      strokeDasharray="113.1"
                      strokeDashoffset={113.1 - (113.1 * seoScore) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="font-mono text-xs font-black text-white">{seoScore}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider block font-bold text-zinc-550">SEO Health</span>
                  <span className={`text-[10px] font-extrabold uppercase ${seoScore >= 80 ? 'text-emerald-400' : seoScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                    {seoScore >= 80 ? 'Excellent' : seoScore >= 50 ? 'Medium Warning' : 'Needs Optimization'}
                  </span>
                </div>
              </div>
            </div>

            {/* OUTPUT PREVIEW SLOTS */}
            <div className="space-y-4">
              
              {/* META TITLE CARD */}
              <div className="space-y-1 bg-black/40 p-4 rounded-xl border border-white/5 relative">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-zinc-500">
                  <span className="font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Meta Title Tag
                  </span>
                  <span className={`font-mono text-[9px] font-bold ${titleLength >= 50 && titleLength <= 60 ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {titleLength} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Optimized landing page title tags..."
                  className="w-full bg-transparent border-none p-0 mt-1 pb-1 text-xs text-white placeholder-zinc-800 font-bold uppercase select-all focus:outline-none focus:ring-0"
                />
                
                {/* Visual optimal scale progress block */}
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${titleLength >= 50 && titleLength <= 60 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
                  />
                </div>
              </div>

              {/* META DESCRIPTION CARD */}
              <div className="space-y-1 bg-black/40 p-4 rounded-xl border border-white/5 relative">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-zinc-500">
                  <span className="font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Meta Description Tag
                  </span>
                  <span className={`font-mono text-[9px] font-bold ${descLength >= 120 && descLength <= 155 ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {descLength} / 155 characters
                  </span>
                </div>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Draft descriptive click hook containing core features..."
                  rows={2}
                  className="w-full bg-transparent border-none p-0 mt-1.5 text-[11px] text-zinc-300 placeholder-zinc-800 font-sans leading-relaxed select-all resize-none focus:outline-none focus:ring-0"
                />
                
                {/* Visual progress bar */}
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${descLength >= 120 && descLength <= 155 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    style={{ width: `${Math.min(100, (descLength / 155) * 100)}%` }}
                  />
                </div>
              </div>

              {/* KEYWORDS TAGS DISPLAY */}
              <div className="space-y-1 bg-black/30 p-4 rounded-xl border border-white/5">
                <label className="text-[10px] text-zinc-500 uppercase font-black block tracking-wider font-mono flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-400 shrink-0" />
                  Primary Indexing Keywords
                </label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="e.g. analytics saas, crypto trackers, trading tools"
                  className="w-full bg-transparent border-none p-0 mt-1.5 text-[11px] text-[#A78BFA] font-mono focus:outline-none focus:ring-0"
                />
                
                {/* Renders interactive tags from split logic */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 mt-2">
                  {metaKeywords.split(',').map((kw, i) => kw.trim() && (
                    <span key={i} className="text-[8.5px] font-bold uppercase py-0.5 px-2 rounded-full border border-zinc-800 bg-[#050507] text-zinc-400 hover:text-white transition-colors">
                      #{kw.trim()}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* DYNAMIC ACTION CONVERSION SUGGESTIONS SECTION */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-left">
              <span className="text-[10px] uppercase tracking-wider font-black font-mono text-zinc-500 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Actionable SEO Enhancements (Gemini Audit)
              </span>
              <ul className="space-y-1.5">
                {suggestions.map((sug, i) => (
                  <li key={i} className="text-[10.5px] text-zinc-400 hover:text-zinc-200 transition-colors flex items-start gap-2.5 font-sans leading-relaxed">
                    <span className="text-[#A78BFA] shrink-0 font-extrabold mt-0.5">➔</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PERSISTENCE TRIGGER */}
            <div className="pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={handleApplyToWorkspace}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-extrabold tracking-wider rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Save Standard Meta Tags</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* SECTION CONTENT AUDIT & AI AUTO-FIX CENTER */}
      <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
          <div>
            <h4 className="text-sm font-black uppercase text-white font-mono tracking-widest flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C084FC]" />
              Startup Copywriting Deficit & AI Auto-Fix Center
            </h4>
            <p className="text-[10.5px] text-zinc-500 mt-1">
              Google crawler bots scan your live headlines and body paragraphs. Fix copywriting issues (like short H1 text or low keyword density) instantly in the background with Gemini AI models.
            </p>
          </div>
          <div className="bg-emerald-950/40 text-emerald-400 font-mono text-[9px] font-extrabold uppercase py-1 px-2.5 rounded border border-emerald-500/30 flex items-center gap-1.5 self-start md:self-center">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span>AI Real-time Auditor Live</span>
          </div>
        </div>

        {/* List of threats detected */}
        {pageAuditResult.sectionResults.every(r => r.issues.length === 0) ? (
          <div className="bg-emerald-950/20 border border-emerald-500/10 p-5 rounded-2xl text-center space-y-2 text-emerald-400">
            <div className="text-sm font-extrabold flex items-center justify-center gap-2">
              <span>🎉</span>
              <span>All Workspace Copywriting Constraints Fully Satisfied!</span>
            </div>
            <p className="text-[10.5px] text-zinc-500 leading-relaxed font-sans max-w-lg mx-auto">
              Your landing page copywriting currently scores a perfect evaluation across all focus areas. Crawlers and search bots can index your unique domain optimally. Zero deficits detected!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pageAuditResult.sectionResults.map((sectRes) => {
              if (sectRes.issues.length === 0) return null;
              return (
                <div key={sectRes.sectionId} className="bg-black/35 border border-white/5 hover:border-white/10 p-4 rounded-xl space-y-3 transition-all relative overflow-hidden group">
                  {/* Section tag */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/20 px-2.5 py-0.5 rounded border border-purple-500/15">
                      {sectRes.sectionTitle} Section
                    </span>
                    <span className="text-[8.5px] font-mono text-zinc-500 font-bold">
                      Score: {sectRes.score}/100
                    </span>
                  </div>

                  <div className="space-y-3">
                    {sectRes.issues.map((issue) => {
                      const isFixing = fixingIssueId === issue.id;
                      return (
                        <div key={issue.id} className="space-y-2 p-3 bg-zinc-950/40 rounded-xl border border-white/5 relative">
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[11px] font-bold text-zinc-200 block">
                              {issue.severity === 'error' && <span className="text-red-500 mr-1.5">●</span>}
                              {issue.severity === 'warning' && <span className="text-amber-500 mr-1.5">●</span>}
                              {issue.severity === 'info' && <span className="text-cyan-500 mr-1.5">●</span>}
                              {issue.title}
                            </span>
                            <span className="text-[8.5px] px-1.5 py-0.5 bg-zinc-900 text-zinc-500 rounded font-mono border border-white/5 leading-none shrink-0">
                              {issue.elementLabel}
                            </span>
                          </div>

                          <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                            {issue.description}
                          </p>

                          <div className="mt-1 bg-black/40 p-2 rounded-lg border border-white/5">
                            <span className="text-[8.5px] uppercase font-bold text-emerald-400 block tracking-wider font-mono">Suggested Audit Corrective Action:</span>
                            <span className="text-[9.5px] text-zinc-300 block mt-0.5 font-light leading-snug">{issue.suggestedAction}</span>
                          </div>

                          {/* Dynamic Action Trigger Button */}
                          <div className="pt-2">
                            {issue.canAutoFix ? (
                              <button
                                type="button"
                                disabled={isFixing || isAnalyzing}
                                onClick={() => handleTriggerAutoFix(sectRes.sectionId, issue)}
                                className={`w-full py-1.5 px-3 rounded-lg text-[9.5px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 select-none ${
                                  isFixing 
                                    ? 'bg-purple-950 text-[#C084FC] border border-[#A78BFA]/30' 
                                    : 'bg-[#A78BFA] hover:bg-[#8B5CF6] text-black shadow-md'
                                }`}
                              >
                                {isFixing ? (
                                  <>
                                    <RefreshCw className="w-3 h-3 animate-spin animate-infinite" />
                                    <span>Background AI Copywriting...</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3 h-3 shrink-0 text-current" />
                                    <span>Run AI Auto-Fix (Gemini)</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <div className="text-[8.5px] text-zinc-500 italic font-mono flex items-center gap-1 pl-1">
                                <span>ℹ</span>
                                <span>Manual adjustments required for structural changes.</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Status Alerts Feedback inside the panel */}
        {fixSuccessMsg && (
          <div className="p-3 bg-emerald-950/20 border border-emerald-400/20 rounded-xl flex items-center gap-2 text-[10.5px] text-emerald-300 font-sans font-medium animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 animate-pulse animate-duration-2000" />
            <span>{fixSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* DETAILED ADDITION: NEW JSON-LD SCHEMA SECURE ENGINE CARD */}
      <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-black uppercase text-white font-mono tracking-widest flex items-center gap-2">
              <Code className="w-5 h-5 text-[#A78BFA]" />
              JSON-LD SCHEMA STRUCTURED MARKUP DEVELOPER CORE
            </h4>
            <p className="text-[10.5px] text-zinc-500 max-w-2xl leading-relaxed">
              Inject schema.org script blocks into your HTML metadata tree. This informs Google spider-bots about software pricing models, corporate details, or local contacts, qualifying the page for **Rich Search Snippets** and star reviews.
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 self-start md:self-center">
            <span className="bg-indigo-950 text-indigo-400 font-mono text-[8px] font-extrabold uppercase py-1 px-2.5 rounded border border-indigo-500/30">
              SCHEMA.ORG VALID
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CONFIGURATION CONTROLS (Left side) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] text-zinc-500 uppercase font-black block tracking-widest font-mono">
              1. Select Target Schema Category
            </span>
            
            {/* Category tabs */}
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'SoftwareApplication', name: 'Software/SaaS Application', desc: 'Indicates cloud solutions, apps & tools.' },
                { id: 'Product', name: 'Commercial Product Offering', desc: 'E-commerce goods or physical items.' },
                { id: 'Organization', name: 'Corporate Organization', desc: 'Branding logo, contact numbers, portals.' },
                { id: 'LocalBusiness', name: 'Brick-and-Mortar Business', desc: 'Addresses, phone parameters, localized SEO.' },
                { id: 'WebSite', name: 'Sitemapped Searchable WebSite', desc: 'Site structure with search box routing.' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleTypeChange(category.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    schemaType === category.id 
                    ? 'bg-purple-950/20 border-[#A78BFA] text-white shadow-[0_0_12px_rgba(167,139,250,0.1)]' 
                    : 'bg-black/35 hover:bg-black/55 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold">{category.name}</span>
                    {schemaType === category.id && <span className="text-[9px] text-[#A78BFA] font-mono">● ACTIVE</span>}
                  </div>
                  <span className="text-[9px] text-zinc-550 block mt-0.5 leading-normal capitalize font-mono">
                    {category.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic Attributes based on selected category */}
            <div className="space-y-3 pt-3 border-t border-white/5 bg-black/25 p-3 rounded-xl">
              <span className="text-[9.5px] uppercase font-black text-zinc-400 flex items-center gap-1 font-mono">
                <Settings className="w-3 h-3 text-emerald-400" />
                Customize Schema Parameters
              </span>

              {/* Price / Currency inputs for Software or Product */}
              {(schemaType === 'SoftwareApplication' || schemaType === 'Product') && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[8px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                      Offer Price
                    </label>
                    <div className="relative">
                      <Coins className="w-3 h-3 text-zinc-600 absolute left-2 top-2" />
                      <input
                        type="text"
                        value={customPrice}
                        onChange={(e) => {
                          setCustomPrice(e.target.value);
                          const updated = generateTemplateSchema(schemaType, e.target.value, customCurrency, customPhone, customAddress);
                          setSchemaMarkup(updated);
                        }}
                        className="w-full bg-black border border-white/10 rounded-lg pl-6 pr-2 py-1 text-[11px] text-white font-mono focus:outline-none focus:border-[#A78BFA]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                      Currency Code
                    </label>
                    <input
                      type="text"
                      value={customCurrency}
                      onChange={(e) => {
                        setCustomCurrency(e.target.value);
                        const updated = generateTemplateSchema(schemaType, customPrice, e.target.value, customPhone, customAddress);
                        setSchemaMarkup(updated);
                      }}
                      className="w-full bg-black border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white font-mono uppercase focus:outline-none focus:border-[#A78BFA]"
                    />
                  </div>
                </div>
              )}

              {/* Telephone input for Organization / LocalBusiness */}
              {(schemaType === 'Organization' || schemaType === 'LocalBusiness') && (
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[8px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <PhoneCall className="w-3 h-3 text-zinc-600 absolute left-2 top-2" />
                      <input
                        type="text"
                        value={customPhone}
                        onChange={(e) => {
                          setCustomPhone(e.target.value);
                          const updated = generateTemplateSchema(schemaType, customPrice, customCurrency, e.target.value, customAddress);
                          setSchemaMarkup(updated);
                        }}
                        className="w-full bg-black border border-white/10 rounded-lg pl-6 pr-2 py-1 text-[11px] text-white font-mono focus:outline-none focus:border-[#A78BFA]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address input for LocalBusiness */}
              {schemaType === 'LocalBusiness' && (
                <div className="space-y-1">
                  <label className="text-[8px] text-zinc-500 uppercase tracking-widest font-black font-mono">
                    Street Address, City, State ZIP
                  </label>
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => {
                      setCustomAddress(e.target.value);
                      const updated = generateTemplateSchema('LocalBusiness', customPrice, customCurrency, customPhone, e.target.value);
                      setSchemaMarkup(updated);
                    }}
                    placeholder="e.g. 100 Silicon Way, Palo Alto, CA 94301"
                    className="w-full bg-black border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white font-mono focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              )}

              {/* WebSite indicator */}
              {schemaType === 'WebSite' && (
                <div className="space-y-1">
                  <label className="text-[8px] text-zinc-500 uppercase tracking-widest font-light">
                    Auto-Configured URL
                  </label>
                  <div className="text-[9.5px] text-[#A78BFA] font-mono select-all truncate">
                    https://{activePage.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'domain'}.flashfocus.app
                  </div>
                </div>
              )}
            </div>

            {/* AI polish action */}
            <button
              onClick={handleAIGenerateSchema}
              disabled={isGeneratingSchema || isAnalyzing}
              className="w-full bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-500/20 text-[#C084FC] py-2 px-4 rounded-xl font-extrabold uppercase font-mono text-[10.5px] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              {isGeneratingSchema ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Polishing custom schema...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Complete AI Schema</span>
                </>
              )}
            </button>
          </div>

          {/* IDE-STYLE LIVE CODE PREVIEW & COPY ACTIONS (Right side - Col span 8) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] uppercase font-mono text-zinc-400 bg-[#060608] px-4 py-2.5 border-t border-x border-white/5 rounded-t-xl gap-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                Real-Time Compiled LD JSON Output
              </span>
              
              {/* Dual Active Badge and Manual Validate Controls */}
              <div className="flex items-center gap-2">
                {isValidatingSchema ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 animate-pulse">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    Validating...
                  </span>
                ) : schemaValidationResult ? (
                  schemaValidationResult.isValid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      Valid Schema.org
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                      <AlertTriangle className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                      Invalid Structure
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Unchecked
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleValidateSchemaMarkup()}
                  disabled={isValidatingSchema}
                  className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 hover:border-[#A78BFA]/30 text-white font-mono hover:text-[#A78BFA] transition-all cursor-pointer text-[8px]"
                  title="Run instant validation check"
                >
                  Verify Now
                </button>
              </div>
            </div>

            {/* Editor Textarea with syntax coloration style */}
            <div className="relative flex-1 group">
              <textarea
                value={schemaMarkup}
                onChange={(e) => setSchemaMarkup(e.target.value)}
                placeholder="Compiled schema.org JSON data is structured here..."
                className="w-full h-80 bg-[#020204]/90 border border-white/10 rounded-b-xl leading-relaxed p-4 font-mono text-[11px] text-emerald-400 select-all font-light resize-none focus:outline-none focus:border-[#A78BFA] focus:ring-0 transition-colors"
                style={{ tabSize: 2 }}
              />

              {/* Code tags banner overlay inside editor */}
              <div className="absolute right-3.5 top-3.5 opacity-60 pointer-events-none text-[9px] uppercase tracking-wider text-zinc-700 bg-black py-0.5 px-2 rounded border border-white/5 font-mono">
                Raw JSON
              </div>
            </div>

            {/* Real-time Schema Validation Diagnostics Drawer */}
            {schemaValidationResult && (
              <div className="bg-[#0b0c10] border border-white/5 rounded-xl p-3 space-y-2 text-left font-mono text-[10.5px]">
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                    <Settings className="w-3 h-3 text-[#A78BFA]" />
                    Schema.org Integrity Audit Report
                  </span>
                  <span className="text-[8px] text-zinc-600">
                    CRAWLER COMPLIANCE SIMULATOR
                  </span>
                </div>

                {/* Audit summary indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                  <div className="p-1.5 bg-zinc-950 border border-white/5 rounded-lg">
                    <span className="text-[7.5px] uppercase text-zinc-500 block">Identified Entity Type</span>
                    <span className="font-extrabold text-indigo-400 text-[10px] truncate block">
                      {schemaValidationResult.info?.detectedType || 'Unknown Entity'}
                    </span>
                  </div>
                  <div className="p-1.5 bg-zinc-950 border border-white/5 rounded-lg">
                    <span className="text-[7.5px] uppercase text-zinc-500 block">Checklist Assertions</span>
                    <span className="font-extrabold text-emerald-400 text-[10px] block truncate">
                      {schemaValidationResult.info?.keysCheckedCount || 0} fields verified
                    </span>
                  </div>
                  <div className="p-1.5 bg-zinc-950 border border-white/5 rounded-lg col-span-2 sm:col-span-1">
                    <span className="text-[7.5px] uppercase text-zinc-500 block">Overall Score</span>
                    <span className={`font-black text-[10px] block ${schemaValidationResult.isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {schemaValidationResult.isValid ? '100% Structural Match' : `${Math.max(10, 100 - schemaValidationResult.errors.length * 30)}% Core Score`}
                    </span>
                  </div>
                </div>

                {/* Error/Warning Messages display list */}
                {schemaValidationResult.errors.length > 0 && (
                  <div className="space-y-1 bg-red-950/20 border border-red-500/20 rounded-lg p-2.5">
                    <div className="text-[8.5px] uppercase font-black text-rose-400 tracking-wider">
                      CRITICAL SCHEMA ERRORS ({schemaValidationResult.errors.length})
                    </div>
                    <ul className="list-disc pl-3.5 space-y-1 text-zinc-300 text-[9.5px] leading-relaxed">
                      {schemaValidationResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {schemaValidationResult.warnings.length > 0 && (
                  <div className="space-y-1 bg-amber-955/15 border border-amber-500/20 rounded-lg p-2.5">
                    <div className="text-[8.5px] uppercase font-black text-amber-400 tracking-wider">
                      RECOMMENDED CRAWLER OPTIMIZATIONS ({schemaValidationResult.warnings.length})
                    </div>
                    <ul className="list-disc pl-3.5 space-y-1 text-zinc-300 text-[9.5px] leading-relaxed">
                      {schemaValidationResult.warnings.map((warn, i) => (
                        <li key={i}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {schemaValidationResult.isValid && schemaValidationResult.errors.length === 0 && (
                  <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-lg flex items-center gap-2">
                    <span className="text-xs">🎉</span>
                    <span className="text-emerald-350 text-[10px] leading-normal">
                      Excellent structural integrity! This compliant JSON-LD representation satisfies exactly what standard Googlebot and schema.org web crawlers inspect to trigger rich snippet search results.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Micro Trigger Action panel */}
            <div className="flex flex-col md:flex-row gap-3 pt-2">
              {/* Copy Script tag */}
              <button
                type="button"
                onClick={handleCopySchema}
                className="flex-1 py-2.5 bg-black hover:bg-zinc-950 border border-white/10 text-zinc-200 hover:text-white rounded-xl text-xs uppercase font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400">LD-JSON SCRIPT COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" />
                    <span>Copy Full Script Wrapper</span>
                  </>
                )}
              </button>

              {/* Persist all Schema block to Page state */}
              <button
                type="button"
                onClick={handleApplyToWorkspace}
                className="flex-1 py-2.5 bg-[#A78BFA] hover:bg-[#8B5CF6] text-black rounded-xl text-xs uppercase font-black tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(167,139,250,0.1)] active:scale-[0.99]"
              >
                <span>Save Schema to Page</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

        </div>

        {/* Structured Schema Audit criteria list */}
        <div className="border-t border-white/5 pt-4">
          <span className="text-[10px] uppercase tracking-widest text-[#FFF] font-black block font-mono">
            Structured Data Crawler Eligibility Checklist
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-3">
            {[
              { bullet: "✓ Target Valid", title: "Rich Snippet Preview Ready", text: "JSON data utilizes exact property names (offers, contactPoint) conformed perfectly to Schema standards." },
              { bullet: "✓ Crawl Optimized", title: "Asynchronous Parser Proof", text: "Structured script wrappers block no layout reflow pathways, allowing immediate client browser parsing." },
              { bullet: "✓ Scope Qualified", title: "High Search Authority", text: "Direct corporate alignment matches custom domains or subdomains automatically. Enhances local page click-through triggers." }
            ].map((check, idx) => (
              <div key={idx} className="p-3 bg-black/30 border border-white/5 rounded-xl space-y-1 text-left">
                <span className="text-emerald-400 text-xs font-black font-mono block leading-none">{check.bullet}</span>
                <h5 className="text-[10.5px] font-bold text-white mt-1 capitalize font-mono leading-tight">{check.title}</h5>
                <p className="text-[9.5px] text-zinc-500 leading-normal">{check.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
        </>
      ) : (
        <GrowthConsoleSubView
          activePage={activePage}
          updateActivePage={updateActivePage}
          pagePurpose={pagePurpose}
          targetAudience={targetAudience}
          metaTitle={metaTitle}
          metaDesc={metaDesc}
          metaKeywords={metaKeywords}
        />
      )}

      {/* SEO ACCORDION / HELP BOT */}
      <div className="bg-[#09090c]/40 border border-white/5 p-4 rounded-2xl flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
        <div className="text-[10.5px] text-zinc-500 leading-normal space-y-1">
          <p className="font-extrabold uppercase text-zinc-400 font-mono tracking-wider text-left">How to leverage organic launch traffic</p>
          <p className="font-sans font-light text-left">
            Once saved, Google crawler bots evaluate metadata tags instantly. For optimal indexation, place the primary keyword within the hero section headline and ensure the main waitlist registration form uses clear schema structures matching accessibility rules.
          </p>
        </div>
      </div>

    </div>
  );
};
