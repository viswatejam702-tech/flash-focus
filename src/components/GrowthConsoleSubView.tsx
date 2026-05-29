import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart2, 
  Globe, 
  Users, 
  Cpu, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight, 
  Send, 
  Terminal, 
  Sliders, 
  Play, 
  Plus, 
  Trash2, 
  ListOrdered, 
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  Network,
  Share2
} from 'lucide-react';
import { LandingPage } from '../types';

interface GrowthConsoleSubViewProps {
  activePage: LandingPage;
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
  pagePurpose: string;
  targetAudience: string;
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
}

export const GrowthConsoleSubView: React.FC<GrowthConsoleSubViewProps> = ({
  activePage,
  updateActivePage,
  pagePurpose,
  targetAudience,
  metaTitle,
  metaDesc,
  metaKeywords
}) => {
  // Sub-tab state
  const [activeSubTab, setActiveSubTab] = useState<'serp', 'waitlist', 'agents'>('serp');

  // Search Console simulator state
  const [searchConsoleTimeframe, setSearchConsoleTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [searchConsoleStats, setSearchConsoleStats] = useState({ clicks: 1420, impressions: 28450, ctr: 4.99, pos: 12.4 });
  const [isConsoleRefreshing, setIsConsoleRefreshing] = useState(false);
  const [indexingRequested, setIndexingRequested] = useState(false);
  const [isRequestingIndex, setIsRequestingIndex] = useState(false);
  const [activeSitemapTab, setActiveSitemapTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [isOptimized, setIsOptimized] = useState(true);

  // Performance stats state
  const [cdnCaching, setCdnCaching] = useState(true);
  const [imageCompression, setImageCompression] = useState(true);
  const [networkSpeedThrottling, setNetworkSpeedThrottling] = useState<'none' | 'lte' | 'slow3g'>('none');

  // Keywords table state
  const [customRankKeyword, setCustomRankKeyword] = useState('');
  const [keywordsCollection, setKeywordsCollection] = useState([
    { kw: `${activePage.name.toLowerCase()} app platform`, vol: '4,500', diff: 'Low', intent: 'Commercial', pos: 3 },
    { kw: `${activePage.name.toLowerCase()} waitlist`, vol: '1,200', diff: 'Very Easy', intent: 'Transactional', pos: 1 },
    { kw: `${activePage.name.toLowerCase()} pricing drops`, vol: '850', diff: 'Easy', intent: 'Transactional', pos: 5 },
    { kw: 'autonomous seo optimizer', vol: '18,400', diff: 'Hard', intent: 'Commercial', pos: 18 },
    { kw: 'real-time growth engine', vol: '9,200', diff: 'Medium', intent: 'Commercial', pos: 24 }
  ]);

  // Viral Referrals state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [referralInput, setReferralInput] = useState('');
  const [referralsTier, setReferralsTier] = useState<'Elite Beta' | 'Growth Alpha' | 'General Pub'>('Elite Beta');
  const [referralCodes, setReferralCodes] = useState([
    { code: `VIP-${activePage.name.toUpperCase().replace(/\s+/g, '').substring(0, 4)}-88`, views: 420, convs: 112, cr: '26.6%', tier: 'Elite Beta' },
    { code: `ALPHA-${activePage.name.toUpperCase().replace(/\s+/g, '').substring(0, 4)}-77`, views: 210, convs: 48, cr: '22.8%', tier: 'Growth Alpha' },
    { code: `SHARE-${activePage.name.toUpperCase().replace(/\s+/g, '').substring(0, 4)}-01`, views: 95, convs: 15, cr: '15.7%', tier: 'General Pub' }
  ]);

  // Leaderboard data
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

  // Campaign copypwriter draft template
  const [emailCampaignGoal, setEmailCampaignGoal] = useState<'vip_beta' | 'milestone_alert' | 'discount_nudge'>('vip_beta');
  const [emailSubject, setEmailSubject] = useState(`🚀 Private invitation to join the exclusive beta of ${activePage.name}`);
  const [emailPreviewText, setEmailPreviewText] = useState(`Claim your early adopter spot and grab an exclusive discount voucher inside.`);
  const [emailBodyHtml, setEmailBodyHtml] = useState(`<p>Hello [Lead Name],</p>\n<p>We are officially kicking off private beta onboarding for <strong>${activePage.name}</strong> next week, and we would love for you to join us.</p>\n<p>Claim your spot below to secure 50% lifetime discount on our launch plans:</p>\n<div style="margin:20px 0;"><a href="#" style="background:#8B5CF6; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block;">Claim VIP Onboarding Ticket</a></div>\n<p>Warmest regards,<br>The ${activePage.name} Team</p>`);
  const [emailGrowthTip, setEmailGrowthTip] = useState(`💡 **CRO Tip**: Segment early signups and incentivize referrals with an extra 10% discount multiplier for maximum growth momentum.`);
  const [isDraftingEmail, setIsDraftingEmail] = useState(false);

  // Background AI Agents logs tracking database
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

  // Multi-Model Inference Comparison State
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

  // Action methods
  const handleSimulateRefreshStats = () => {
    setIsConsoleRefreshing(true);
    setTimeout(() => {
      const clicksInc = Math.floor(Math.random() * 85) + 25;
      const ImpsInc = Math.floor(Math.random() * 950) + 250;
      setSearchConsoleStats(prev => ({
        clicks: prev.clicks + clicksInc,
        impressions: prev.impressions + ImpsInc,
        ctr: parseFloat(((prev.clicks + clicksInc) / (prev.impressions + ImpsInc) * 100).toFixed(2)),
        pos: parseFloat((prev.pos + (Math.random() * 0.4 - 0.2)).toFixed(1))
      }));
      setAgentLogs(prev => [
        {
          timestamp: new Date().toTimeString().split(' ')[0],
          agent: 'Search Console Analyzer',
          action: `Sync completed: parsed clicks +${clicksInc}, impressions +${ImpsInc}.`,
          type: 'success' as const
        },
        ...prev
      ]);
      setIsConsoleRefreshing(false);
    }, 700);
  };

  const handleSimulateIndexingRequest = () => {
    setIsRequestingIndex(true);
    setTimeout(() => {
      setIndexingRequested(true);
      setIsRequestingIndex(false);
      setAgentLogs(prev => [
        {
          timestamp: new Date().toTimeString().split(' ')[0],
          agent: 'Crawler Indexer',
          action: `Dispatched instantaneous crawl verify token package to sitemaps queue.`,
          type: 'success' as const
        },
        ...prev
      ]);
    }, 1200);
  };

  const handleAddNewKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRankKeyword.trim()) return;
    const isHard = Math.random() > 0.6;
    const newKw = {
      kw: customRankKeyword.toLowerCase().trim(),
      vol: (Math.floor(Math.random() * 200) * 80 + 100).toLocaleString(),
      diff: isHard ? 'Hard' : Math.random() > 0.3 ? 'Medium' : 'Easy',
      intent: Math.random() > 0.5 ? 'Transactional' : 'Commercial',
      pos: Math.floor(Math.random() * 28) + 1
    };
    setKeywordsCollection(prev => [newKw, ...prev]);
    setAgentLogs(prev => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Rankings Tracker SDK',
        action: `Began monitoring "${customRankKeyword}". Current rank established at #${newKw.pos}.`,
        type: 'info' as const
      },
      ...prev
    ]);
    setCustomRankKeyword('');
  };

  const handleCreateReferralCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralInput.trim()) return;
    const codeStr = referralInput.toUpperCase().replace(/\s+/g, '-');
    setReferralCodes(prev => [
      { code: codeStr, views: 0, convs: 0, cr: '0%', tier: referralsTier },
      ...prev
    ]);
    setReferralInput('');
    setAgentLogs(prev => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Viral Referrals Controller',
        action: `Assigned click trackers to coupon "${codeStr}" under rule "${referralsTier}".`,
        type: 'success' as const
      },
      ...prev
    ]);
  };

  const handleAddNewLeadLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadEmail.trim() || !newLeadEmail.includes('@')) return;
    setLeaderboard(prev => {
      const invites = newLeadInvites || Math.floor(Math.random() * 15);
      const score = invites * 20;
      const tierStr = invites >= 20 ? 'Elite Beta' : invites >= 5 ? 'Growth Alpha' : 'General Pub';
      const person = {
        rank: 1,
        email: newLeadEmail.trim(),
        code: `${newLeadEmail.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 90) + 10}`,
        invites,
        score,
        tier: tierStr,
        addedAt: new Date().toISOString().split('T')[0]
      };
      const together = [...prev, person];
      return together
        .sort((a, b) => b.invites - a.invites)
        .map((itm, idx) => ({ ...itm, rank: idx + 1 }));
    });
    setAgentLogs(prev => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Waitlist Captain',
        action: `Subscribed user ${newLeadEmail} with ${newLeadInvites || 0} referral invites added.`,
        type: 'success' as const
      },
      ...prev
    ]);
    setNewLeadEmail('');
    setNewLeadInvites(0);
  };

  const handleCdnOptimizeToggleAndBoost = () => {
    setIsOptimized(prev => !prev);
    setAgentLogs(prev => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Autopilot Performance',
        action: !isOptimized ? 'Purged edge cold caches. Minified script tree. Google score set to 99.' : 'Disabled CDN edge delivery configurations. Returning to default network stack.',
        type: !isOptimized ? 'success' as const : 'warn' as const
      },
      ...prev
    ]);
  };

  const handleModelPromptOptimizeSubmit = () => {
    const val = modelPrompt.trim();
    if (!val) return;
    setModelCompareData({
      flash: {
        headline: `⚡ "Build & Scale ${activePage.name} With Multi-Model Integration."`,
        rationale: 'Appeals to developer speed metrics and immediate utility.',
        speedMs: 110,
        score: 9.4
      },
      pro: {
        headline: `🎯 "The Self-Healing Conversion Cloud Powered by ${activePage.name}."`,
        rationale: 'Establishes high-density corporate safety. Excellent for b2b niches.',
        speedMs: 510,
        score: 9.8
      },
      sonnet: {
        headline: `✨ "Scale organic rankings for ${activePage.name} starting from Day One."`,
        rationale: 'Focuses strictly on ranking performance. Removes marketing fluff.',
        speedMs: 340,
        score: 9.6
      }
    });
    setAgentLogs(prev => [
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        agent: 'Reasoning Arena Manager',
        action: `Analyzed "${val.substring(0, 30)}..." parallel outputs across 3 nodes.`,
        type: 'info' as const
      },
      ...prev
    ]);
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

      if (!resp.ok) throw new Error('Endpoints unconfigured. Resorting to smart backup compiler...');

      const data = await resp.json();
      setEmailSubject(data.subjectLine);
      setEmailPreviewText(data.previewText);
      setEmailBodyHtml(data.bodyHtml);
      setEmailGrowthTip(data.growthHacksTip);

      setAgentLogs(prev => [
        {
          timestamp: new Date().toTimeString().split(' ')[0],
          agent: 'Content Strategy Bot',
          action: 'Finished drafting campaign email featuring optimized sitemap anchor anchors.',
          type: 'success' as const
        },
        ...prev
      ]);
    } catch (e) {
      const capitalized = activePage.name;
      if (emailCampaignGoal === 'vip_beta') {
        setEmailSubject(`🚀 VIP Beta Access Opened: Initialize ${capitalized} Today`);
        setEmailPreviewText(`Be the very first to test drive the self-healing and sitemapping engines.`);
        setEmailBodyHtml(`<p>Hi [Lead Name],</p>\n<p>Early developer gates for <strong>${capitalized}</strong> are officially open. Start sitemapping, generating schemas and auditing core rankings on absolute autopilot.</p>\n<p><a href="#" style="background:#8B5CF6; color:#ffffff; padding:10px 20px; font-weight:bold; display:inline-block; text-decoration:none; border-radius:5px;">Claim VIP Beta Key &rarr;</a></p>`);
      } else if (emailCampaignGoal === 'milestone_alert') {
        setEmailSubject(`🎉 Celebration: ${capitalized} Waitlist hit massive heights!`);
        setEmailPreviewText(`We are unlocking premium tiers for active referral share coupon holders.`);
        setEmailBodyHtml(`<p>Hi [Lead Name],</p>\n<p>What a stellar week! <strong>${leaderboard.length * 15 + 120} users</strong> have joined our autonomous growth network at ${capitalized}. To celebrate, refer 2 friends to unlock a lifetime free premium tier pass.</p>\n<p>Your tracking link: <code>https://${activePage.slug}.flashfocus.app?ref=[Lead Link]</code></p>`);
      } else {
        setEmailSubject(`💡 Growth insights: Stop leaking conversion CTR at checkout`);
        setEmailPreviewText(`Get instant access to this week's technical audits and edge CDN caching.`);
        setEmailBodyHtml(`<p>Dear Growth Hacker,</p>\n<p>Most landing pipelines bleed conversions because of sub-optimal Web Vitals. Let ${capitalized} handle image compression, and edge caching automatically. Redeem 30% discount inside:</p>\n<p><a href="#" style="background:#10B981; color:#ffffff; padding:11px 22px; font-weight:bold; display:inline-block; text-decoration:none; border-radius:6px;">Activate 30% Lifetime Savings</a></p>`);
      }
      setEmailGrowthTip('💡 **Fallback Warning**: Simulated optimal layout conversion metrics using semantic heuristics.');
    } finally {
      setIsDraftingEmail(false);
    }
  };

  const handleCopyCodeClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2050);
  };

  // Files computed
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

Sitemap: https://${activePage.slug}.flashfocus.app/sitemap.xml`;

  // Core Web Vitals calculated properties
  const lcpScoreValue = isOptimized ? (cdnCaching ? (imageCompression ? 0.9 : 1.5) : 2.1) : (networkSpeedThrottling === 'slow3g' ? 5.2 : networkSpeedThrottling === 'lte' ? 3.4 : 2.6);
  const fidScoreValue = isOptimized ? 45 : (networkSpeedThrottling === 'slow3g' ? 210 : networkSpeedThrottling === 'lte' ? 115 : 75);
  const clsScoreValue = isOptimized ? 0.02 : 0.18;

  const lcpColor = lcpScoreValue <= 1.2 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : lcpScoreValue <= 2.5 ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 'text-rose-450 border-rose-500/20 bg-rose-500/10';
  const fidColor = fidScoreValue <= 100 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : fidScoreValue <= 300 ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 'text-rose-450 border-rose-500/20 bg-rose-500/10';
  const clsColor = clsScoreValue <= 0.1 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : clsScoreValue <= 0.25 ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 'text-rose-450 border-rose-500/20 bg-rose-500/10';

  // Filters leaderboard database
  const filteredLeaderboard = leaderboard.filter(person => 
    person.email.toLowerCase().includes(waitlistSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tab bar header */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
        {[
          { id: 'serp', name: 'SERP & Tech Audit', icon: Globe, desc: 'Rankings, Crawlers, Core Web Vitals & Sitemaps' },
          { id: 'waitlist', name: 'Viral Waitlist & Referrals', icon: Users, desc: 'Leaderboards, Invite coupon track & News drafts' },
          { id: 'agents', name: 'Autonomous Growth AI', icon: Cpu, desc: 'Self-healing settings, parallel inference, logs telemetry' }
        ].map((btn) => {
          const Icon = btn.icon;
          const isSel = activeSubTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveSubTab(btn.id as any)}
              className={`flex-1 min-w-[210px] p-3 text-left rounded-2xl border transition-all cursor-pointer group ${
                isSel 
                  ? 'bg-gradient-to-br from-indigo-950/40 to-[#0e0e15] border-[#9333ea]/50 text-white shadow-[0_0_20px_rgba(147,51,234,0.1)]' 
                  : 'bg-zinc-950/50 border-white/5 text-zinc-400 hover:border-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isSel ? 'text-[#c084fc]' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
                <span className="text-xs font-black uppercase font-mono tracking-wider">{btn.name}</span>
              </div>
              <span className="text-[9.5px] text-zinc-500 block mt-1 line-clamp-1 truncate">{btn.desc}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: SERP ENGINE & TECHNICAL AUDITS */}
        {activeSubTab === 'serp' && (
          <motion.div
            key="serp-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 animate-fadeIn text-left"
          >
            {/* Search Console simulator */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#C084FC]" />
                    GOOGLE SEARCH CONSOLE SYNC EMULATION
                  </h4>
                  <p className="text-[10px] text-zinc-500">Review indexing status, clicks, impressions on absolute autopilot.</p>
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={searchConsoleTimeframe}
                    onChange={(e) => setSearchConsoleTimeframe(e.target.value as any)}
                    className="bg-black border border-white/10 text-[10.5px] font-mono rounded-lg px-2.5 py-1 text-zinc-400 focus:outline-none"
                  >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>

                  <button
                    onClick={handleSimulateRefreshStats}
                    disabled={isConsoleRefreshing}
                    className="bg-white hover:bg-zinc-200 text-black font-mono text-[9.5px] font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer select-none transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isConsoleRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isConsoleRefreshing ? 'Syncing...' : 'Sync Live GSC'}</span>
                  </button>
                </div>
              </div>

              {/* Grid indices stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Organic Clicks', value: searchConsoleStats.clicks.toLocaleString(), change: '+18.4% WoW', color: 'text-indigo-400' },
                  { label: 'Crawl Impressions', value: searchConsoleStats.impressions.toLocaleString(), change: '+24.1% WoW', color: 'text-purple-400' },
                  { label: 'Average Click CTR', value: `${searchConsoleStats.ctr}%`, change: 'Optimal CTR', color: 'text-emerald-400' },
                  { label: 'Average Rank Position', value: `#${searchConsoleStats.pos}`, change: '#1 Goal', color: 'text-amber-400' }
                ].map((st, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-[8.5px] text-zinc-500 uppercase font-mono block tracking-wider">{st.label}</span>
                    <span className={`text-lg font-black font-mono block ${st.color}`}>{st.value}</span>
                    <span className="text-[8px] text-zinc-600 block font-mono">{st.change}</span>
                  </div>
                ))}
              </div>

              {/* URL Index checking status */}
              <div className="p-3 bg-[#0a0a0d] border border-white/5 rounded-xl flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${indexingRequested ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="text-[10px] font-mono text-zinc-400">
                    Live Crawl Index: <b className="text-white">https://{activePage.slug}.flashfocus.app</b> - {indexingRequested ? 'Successfully indexed & searchable' : 'Discovery pending indexing queue'}
                  </span>
                </div>
                <button
                  onClick={handleSimulateIndexingRequest}
                  disabled={isRequestingIndex || indexingRequested}
                  className="bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 font-mono text-[9px] py-1 px-2.5 rounded border border-indigo-500/20"
                >
                  {isRequestingIndex ? 'Dispatching crawl API...' : indexingRequested ? 'Verified XML indexed' : 'Trigger Google Crawl Request'}
                </button>
              </div>
            </div>

            {/* Keyword Explorer and SERP preview dual column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Keywords Explorer */}
              <div className="lg:col-span-7 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-indigo-400" />
                    TARGET KEYWORD SERP RANKINGS
                  </h4>
                  <p className="text-[10px] text-zinc-500">Monitor priority search metrics and organic click positions.</p>
                </div>

                <form onSubmit={handleAddNewKeyword} className="flex gap-2">
                  <input
                    type="text"
                    value={customRankKeyword}
                    onChange={(e) => setCustomRankKeyword(e.target.value)}
                    placeholder="Search phrase e.g., 'no-code analytics suite'..."
                    className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-900 hover:bg-indigo-800 text-white font-mono text-[10px] px-3.5 rounded-xl uppercase font-extrabold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Track keyword
                  </button>
                </form>

                {/* Keywords listing table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[10.5px]">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 text-[8.5px] uppercase tracking-wider">
                        <th className="py-2">Search Term Keyword</th>
                        <th className="py-2 text-center">Avg Vol</th>
                        <th className="py-2 text-center">Intent</th>
                        <th className="py-2 text-center">SEO Diff</th>
                        <th className="py-2 text-right">GSC Pos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                      {keywordsCollection.map((k, index) => (
                        <tr key={index} className="hover:bg-white/2">
                          <td className="py-2 text-zinc-200 font-sans font-light flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            {k.kw}
                          </td>
                          <td className="py-2 text-center text-zinc-400">{k.vol}</td>
                          <td className="py-2 text-center">
                            <span className={`text-[8.5px] px-1.5 py-0.5 rounded-full capitalize font-black ${k.intent === 'Transactional' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'}`}>
                              {k.intent}
                            </span>
                          </td>
                          <td className="py-2 text-center">
                            <span className={`text-[8.5px] font-extrabold capitalize ${k.diff === 'Hard' ? 'text-rose-450' : k.diff === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {k.diff}
                            </span>
                          </td>
                          <td className="py-2 text-right font-black text-[#C084FC]">#{k.pos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SERP Search Preview mockup */}
              <div className="lg:col-span-5 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-emerald-450" />
                    LIVE SEARCH ENGINE RESULTS PREVIEW
                  </h4>
                  <p className="text-[10px] text-zinc-500">Click preview displays interactive rich schema snippets.</p>
                </div>

                {/* Google Search Snippet Card Design */}
                <div className="bg-[#030304] border border-white/5 rounded-xl p-4 space-y-1.5 text-left font-sans">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                    <div className="w-4 h-4 bg-zinc-800 rounded-full flex items-center justify-center text-white text-[7px] font-extrabold uppercase font-mono">
                      G
                    </div>
                    <div>
                      <span className="text-zinc-200 text-[10px]">https://{activePage.slug}.flashfocus.app</span>
                      <span className="text-zinc-500 mx-1">&rsaquo;</span>
                      <span className="text-zinc-500">campaign</span>
                    </div>
                  </div>

                  <a href="#" className="block hover:underline text-indigo-400 text-sm font-semibold leading-tight capitalize">
                    {metaTitle || `${activePage.name} - Exclusive Launch Waitlist`}
                  </a>

                  <p className="text-[11.5px] text-zinc-400 leading-normal font-light">
                    {metaDesc || `Register early to secure VIP beta invites for the ${activePage.name} platform. Track referrals and claim lifetime 50% discount vouchers.`}
                  </p>

                  {/* Rich schema stars rating metadata display */}
                  <div className="flex items-center gap-2 pt-1 border-t border-white/5 mt-1.5 text-[9.5px] text-zinc-500 font-mono">
                    <span className="text-amber-400 font-black">★★★★★ 4.9</span>
                    <span>(42 votes)</span>
                    <span>·</span>
                    <span>In Stock / Software Category</span>
                  </div>
                </div>

                {/* SEO indexing score card */}
                <div className="p-3 bg-[#0a0a0d] border border-white/5 rounded-xl space-y-1.5">
                  <span className="text-[8.5px] uppercase tracking-wider block font-bold text-zinc-500 font-mono">Organic Index Checklist</span>
                  <div className="text-[10px] leading-relaxed text-zinc-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>✓ Meta Title is optimized (50-60 char)</span>
                      <span className="text-emerald-400 font-mono">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✓ XML Sitemap declaration initialized</span>
                      <span className="text-emerald-400 font-mono">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✓ JSON-LD Schema structures injected</span>
                      <span className="text-emerald-400 font-mono">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Technical site files: code generator and copy paste playground */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 flex-wrap gap-3 text-left">
                <div>
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest">
                    AUTONOMOUS TECHNICAL SITE FILE CREATOR
                  </h4>
                  <p className="text-[10px] text-zinc-500">Crawler instructions sitemap and robots.txt compiled automatically.</p>
                </div>

                {/* Workspace tab selectors */}
                <div className="flex bg-black border border-white/5 rounded-lg p-0.5 font-mono text-[9px] uppercase font-bold">
                  <button 
                    onClick={() => setActiveSitemapTab('sitemap')}
                    className={`px-3 py-1 rounded cursor-pointer ${activeSitemapTab === 'sitemap' ? 'bg-[#9333ea]/30 text-white border border-[#9333ea]/30' : 'text-zinc-500'}`}
                  >
                    sitemap.xml
                  </button>
                  <button 
                    onClick={() => setActiveSitemapTab('robots')}
                    className={`px-3 py-1 rounded cursor-pointer ${activeSitemapTab === 'robots' ? 'bg-[#9333ea]/30 text-white border border-[#9333ea]/30' : 'text-zinc-500'}`}
                  >
                    robots.txt
                  </button>
                </div>
              </div>

              {/* Terminal-like output */}
              <div className="relative">
                <textarea
                  readOnly
                  value={activeSitemapTab === 'sitemap' ? computedSitemapXml : computedRobotsTxt}
                  className="w-full h-44 bg-[#030304] border border-white/5 rounded-xl p-4 font-mono text-[10.5px] text-indigo-400 select-all font-light leading-relaxed focus:outline-none resize-none"
                />
                
                {/* Copy overlay */}
                <button
                  type="button"
                  onClick={() => handleCopyCodeClipboard(
                    activeSitemapTab === 'sitemap' ? computedSitemapXml : computedRobotsTxt,
                    activeSitemapTab === 'sitemap' ? 'sitemap' : 'robots'
                  )}
                  className="absolute right-3.5 bottom-3.5 bg-zinc-900/90 hover:bg-black text-zinc-300 hover:text-white py-1.5 px-3 rounded-lg border border-white/5 text-[9px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedCode === (activeSitemapTab === 'sitemap' ? 'sitemap' : 'robots') ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Google Lighthouse scorecard & sliders panel */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-450" />
                    GOOGLE LIGHTHOUSE CORE WEB VITALS TESTING LAB
                  </h4>
                  <p className="text-[10px] text-zinc-500">Simulate network conditions dynamically to inspect critical loading budgets.</p>
                </div>

                <button
                  onClick={handleCdnOptimizeToggleAndBoost}
                  className={`font-mono text-[9.5px] py-1 px-3 rounded-lg font-bold border uppercase transition-colors select-none ${
                    isOptimized 
                      ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20' 
                      : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {isOptimized ? '⚡ Edge Boost: ACTIVE' : '⚡ Boost Edge CDN now'}
                </button>
              </div>

              {/* Sliders layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Left column config */}
                <div className="space-y-3.5">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono font-black block">Lab Settings</span>
                  
                  {/* CDN Cache checkbox */}
                  <label className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 cursor-pointer select-none">
                    <div className="text-[10px] space-y-0.5">
                      <span className="text-zinc-200 font-bold block">CDN Edge Caching</span>
                      <span className="text-[8px] text-zinc-550 font-light block">Minimizes TTFB request lags</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={cdnCaching}
                      onChange={(e) => setCdnCaching(e.target.checked)}
                      className="rounded border-zinc-800 bg-black text-purple-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                    />
                  </label>

                  {/* Image compression check */}
                  <label className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 cursor-pointer select-none">
                    <div className="text-[10px] space-y-0.5">
                      <span className="text-zinc-200 font-bold block">Next-Gen WebP Images</span>
                      <span className="text-[8px] text-zinc-550 font-light block">Compresses responsive weights</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={imageCompression}
                      onChange={(e) => setImageCompression(e.target.checked)}
                      className="rounded border-zinc-800 bg-black text-purple-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                    />
                  </label>

                  {/* Network throttling select */}
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono block">Network Throttling</label>
                    <select
                      value={networkSpeedThrottling}
                      onChange={(e) => setNetworkSpeedThrottling(e.target.value as any)}
                      className="bg-black border border-white/10 text-[10.5px] font-mono text-zinc-300 w-full rounded-lg px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="none">No throttling (Infinite fiber connection)</option>
                      <option value="lte">Fast LTE (4G Wireless SIM emulation)</option>
                      <option value="slow3g">Slow 3G Network (High Latency Cell)</option>
                    </select>
                  </div>
                </div>

                {/* Right column: scores gauges */}
                <div className="md:col-span-2 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Largest Contentful Paint (LCP)', score: `${lcpScoreValue}s`, indicator: lcpScoreValue <= 1.2 ? 'Good (Green)' : lcpScoreValue <= 2.5 ? 'Moderate' : 'Unacceptable', colorClass: lcpColor, metrics: 'Optimal limits < 1.2s' },
                    { label: 'First Input Delay (FID)', score: `${fidScoreValue}ms`, indicator: fidScoreValue <= 100 ? 'Excellent' : fidScoreValue <= 300 ? 'Average' : 'Diligence needed', colorClass: fidColor, metrics: 'Optimal limits < 100ms' },
                    { label: 'Cumulative Layout Shift (CLS)', score: clsScoreValue, indicator: clsScoreValue <= 0.1 ? 'Great' : 'Needs tuning', colorClass: clsColor, metrics: 'Optimal limits < 0.10' }
                  ].map((gauge, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between text-left space-y-1.5 ${gauge.colorClass}`}>
                      <span className="text-[8px] uppercase tracking-wider block font-bold text-zinc-400 leading-tight truncate" title={gauge.label}>{gauge.label}</span>
                      <span className="text-xl font-black font-mono block leading-none">{gauge.score}</span>
                      <div>
                        <span className="text-[8.5px] font-black uppercase block leading-none">{gauge.indicator}</span>
                        <span className="text-[7.5px] opacity-60 block mt-1 font-mono">{gauge.metrics}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lighthouse results diagnostics summary */}
              <div className="p-3 bg-indigo-950/20 border border-indigo-500/10 rounded-xl text-[10px] text-indigo-400 font-mono text-left leading-normal">
                🤖 <b>Self-Healing Performance Engine Summary:</b> Simulated site accessibility and loading speed factors. With <b>Edge Delivery and WebP checks</b> turned on, loading velocity gains up to <b>84% higher caching efficiency</b>, securing instant mobile indexes under Search Console crawler checks.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: VIRAL WAITLIST & REFERRAL NETWORKS */}
        {activeSubTab === 'waitlist' && (
          <motion.div
            key="waitlist-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 animate-fadeIn text-left"
          >
            {/* Dashboard counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Waitlist Subscribers', value: (leaderboard.length * 15 + 120).toLocaleString(), change: '+44.2% YoY growth', color: 'text-indigo-400' },
                { label: 'Referral Coefficient', value: '2.58x multiplier', change: 'Extremely viral loop', color: 'text-purple-405' },
                { label: 'Invite conversion CTR', value: '28.42%', change: 'Optimization peak', color: 'text-emerald-400' },
                { label: 'Average User Score', value: '380 points', change: 'High activation index', color: 'text-amber-400' }
              ].map((co, idx) => (
                <div key={idx} className="bg-[#0b0c10]/80 border border-white/10 p-4 rounded-xl text-left space-y-1">
                  <span className="text-[8.5px] text-zinc-500 uppercase font-mono block tracking-wider">{co.label}</span>
                  <span className={`text-lg font-black font-mono block ${co.color}`}>{co.value}</span>
                  <span className="text-[8px] text-zinc-650 block font-mono">{co.change}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* invite coupon creator */}
              <div className="lg:col-span-5 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C084FC]" />
                    VIRAL REFERRAL COUPON TRACKER
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-sans">Build invitation passes to trigger immediate social click-through ratios.</p>
                </div>

                {/* Form fields */}
                <form onSubmit={handleCreateReferralCodeSubmit} className="space-y-3 font-mono text-[10.5px]">
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase text-zinc-550 block">Referral Pass Token Code</label>
                    <input
                      type="text"
                      value={referralInput}
                      onChange={(e) => setReferralInput(e.target.value)}
                      placeholder="e.g., 'ASTRO-VIP-ONBOARD'"
                      className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#9333ea]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] uppercase text-zinc-550 block">Associated waitlist tier privileges</label>
                    <select
                      value={referralsTier}
                      onChange={(e) => setReferralsTier(e.target.value as any)}
                      className="w-full bg-black border border-white/10 text-xs px-2.5 py-1.5 focus:outline-none text-zinc-300 rounded-lg"
                    >
                      <option value="Elite Beta">Elite Beta Privileges (500 points)</option>
                      <option value="Growth Alpha">Growth Alpha Access (300 points)</option>
                      <option value="General Pub">General Pub Entry (100 points)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-zinc-200 text-black font-mono font-black text-[10.5px] uppercase py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Activate Coupon Code
                  </button>
                </form>

                {/* referral code map list */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-mono block">Active Referral Coupon Registry</span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {referralCodes.map((ref, idx) => (
                      <div key={idx} className="p-2 bg-black/40 border border-white/5 rounded-lg flex items-center justify-between text-[10px] font-mono hover:border-white/10">
                        <div>
                          <span className="font-black text-indigo-400 block">{ref.code}</span>
                          <span className="text-[8px] text-zinc-500 block">Privileges: <b className="text-zinc-400">{ref.tier}</b></span>
                        </div>
                        <div className="text-right text-[9.5px]">
                          <span className="text-zinc-200 block">CR: <b className="text-emerald-450">{ref.cr}</b></span>
                          <span className="text-[8.5px] text-zinc-650 block">Convs: {ref.convs} / {ref.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* waitlist database leaderboard directory */}
              <div className="lg:col-span-7 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-emerald-400" />
                      SUBMITTER DIRECTORY & WAITLIST LEADERBOARD
                    </h4>
                    <p className="text-[10px] text-zinc-500">Live sorting monitors referrals hierarchy inside active spreadsheets.</p>
                  </div>

                  <input
                    type="text"
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                    placeholder="Search sitemapped leads email..."
                    className="bg-black border border-white/10 text-[10px] font-mono text-zinc-300 rounded-lg px-2 py-1 focus:outline-none"
                  />
                </div>

                {/* Leaderboard table */}
                <div className="overflow-x-auto max-h-56">
                  <table className="w-full text-left font-mono text-[10px] text-zinc-300">
                    <thead>
                      <tr className="border-b border-white/5 text-[8px] text-zinc-500 uppercase tracking-wider">
                        <th className="py-2 text-center">Rank</th>
                        <th className="py-2">Email Address</th>
                        <th className="py-2 text-center">Tracking Coupon</th>
                        <th className="py-2 text-center">Invited Leads</th>
                        <th className="py-2 text-center">Growth Score</th>
                        <th className="py-2 text-right">Registered At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                      {filteredLeaderboard.map((item, id) => (
                        <tr key={id} className="hover:bg-white/2">
                          <td className="py-2 text-center">
                            {item.rank === 1 ? (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-[9px]">1</span>
                            ) : item.rank === 2 ? (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-zinc-400/20 text-zinc-300 font-extrabold text-[9px]">2</span>
                            ) : (
                              <span>#{item.rank}</span>
                            )}
                          </td>
                          <td className="py-2 font-sans text-zinc-200 select-all truncate max-w-[120px]" title={item.email}>{item.email}</td>
                          <td className="py-2 text-center text-indigo-400 font-bold font-mono">{item.code}</td>
                          <td className="py-2 text-center text-zinc-405">{item.invites}</td>
                          <td className="py-2 text-center text-emerald-450 font-extrabold">{item.score} pts</td>
                          <td className="py-2 text-right text-zinc-500">{item.addedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredLeaderboard.length === 0 && (
                    <div className="text-center text-zinc-550 text-[10px] py-6">No matching email lead found in active campaigns databases.</div>
                  )}
                </div>

                {/* Submitter manual lead injector */}
                <form onSubmit={handleAddNewLeadLeaderboard} className="p-3 bg-zinc-950/60 border border-white/5 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-end text-left font-mono">
                  <div className="md:col-span-12 text-[8px] uppercase tracking-wider text-zinc-500 font-black flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-emerald-450" />
                    Simulated Lead Submitter Core (Manual Injector)
                  </div>

                  <div className="md:col-span-5 space-y-1 text-[10px]">
                    <span className="text-[7.5px] uppercase text-zinc-500">Submitter Email Address</span>
                    <input
                      required
                      type="email"
                      placeholder="e.g., customer@stripe.co"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="bg-black border border-white/10 rounded-lg p-1.5 w-full text-white font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-4 space-y-1 text-[10px]">
                    <span className="text-[7.5px] uppercase text-zinc-500">Invitations Count</span>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={newLeadInvites || ''}
                      onChange={(e) => setNewLeadInvites(parseInt(e.target.value) || 0)}
                      placeholder="e.g. 15 (auto-calculates points)"
                      className="bg-black border border-white/10 rounded-lg p-1.5 w-full text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-mono font-bold text-[10px] uppercase py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Inject Lead
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Campaign newsletter copywriter */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-3">
                <div className="text-left">
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C084FC]" />
                    AI WAITLIST EMAIL CAMPAIGNS COPYWRITER
                  </h4>
                  <p className="text-[10px] text-zinc-500">Write optimized, high CTR templates and news announcements using gemini-3.5-flash.</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={emailCampaignGoal}
                    onChange={(e) => setEmailCampaignGoal(e.target.value as any)}
                    className="bg-black border border-white/10 text-[10.5px] font-mono text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="vip_beta">VIP Announcement Goals (CTR Nudge)</option>
                    <option value="milestone_alert">Waitlist Milestone Celebration</option>
                    <option value="discount_nudge">Early Adopter Discount Offer</option>
                  </select>

                  <button
                    onClick={handleAIGenerateCampaignCampaignEmail}
                    disabled={isDraftingEmail}
                    className="bg-violet-900/50 hover:bg-violet-900 text-[#C084FC] border border-violet-500/20 font-mono text-[9.5px] font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    {isDraftingEmail ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Drafting...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>AI Draft email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Email draft envelope look */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 sm:p-5 space-y-3 font-sans text-left text-xs leading-relaxed">
                <div className="space-y-1.5 border-b border-white/5 pb-2.5">
                  <div className="grid grid-cols-12 gap-1 font-mono text-[10px] text-zinc-500">
                    <span className="col-span-3 sm:col-span-2 text-zinc-650 font-bold uppercase">Subject Line:</span>
                    <span className="col-span-9 sm:col-span-10 text-zinc-200 select-all font-bold">{emailSubject}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 font-mono text-[10px] text-zinc-500">
                    <span className="col-span-3 sm:col-span-2 text-zinc-650 font-bold uppercase">Teaser Link:</span>
                    <span className="col-span-9 sm:col-span-10 text-indigo-400 select-all truncate">{emailPreviewText}</span>
                  </div>
                </div>

                {/* Simulated email body markup */}
                <div 
                  className="pt-2 text-zinc-300 border border-dashed border-white/5 p-4 rounded-lg bg-[#020202] text-[11px]"
                  dangerouslySetInnerHTML={{ __html: emailBodyHtml }}
                />

                {/* growth hack tip footer inside email */}
                <div className="p-3 bg-zinc-950/80 border border-white/5 rounded-xl text-[10px] text-zinc-450 font-mono italic leading-normal">
                  {emailGrowthTip}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: AUTONOMOUS GROWTH AGENTS & MULTI-MODEL REASONER */}
        {activeSubTab === 'agents' && (
          <motion.div
            key="agents-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 animate-fadeIn text-left animate-duration-300"
          >
            {/* Orchestrated cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'SEO Optimizer agent', status: 'CRAWLING_LIVE_DOMAINS', role: 'Fixes titles, descriptions sitemaps, robots sitemaps automatically.', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { name: 'Copywriter copy specialist', status: 'SYNTHESIZING_HOOK', role: 'Optimizes headlines and news blasts using Gemini prompt arrays.', badgeColor: 'bg-indigo-505/10 text-indigo-400 border-indigo-500/20' },
                { name: 'Competitor intel engine', status: 'SEARCHING_TRENDS', role: 'Scrapers and checks search volume spikes via trends tracking.', badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
                { name: 'CRO Optimizer Specialist', status: 'A_B_VARIANT_ANALYSIS', role: 'Evaluates CTR rates and signup buttons flow to double conversions.', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
              ].map((ag, i) => (
                <div key={i} className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] text-white font-mono font-black uppercase block">{ag.name}</span>
                    <span className="text-[9px] text-zinc-500 block leading-relaxed">{ag.role}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 font-mono text-[8.5px]">
                    <span className="text-zinc-600 uppercase font-black">Status badge:</span>
                    <span className={`px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${ag.badgeColor} flex items-center gap-1`}>
                      <span className="w-1 h-1 bg-current rounded-full animate-ping" />
                      {ag.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Config controls and Multi model playground dual column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* configurations system self repair */}
              <div className="lg:col-span-5 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                    SELF-HEALING OPTIMIZATION CORES
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-sans">Automated rollbacks prevent layout broken deployments on index alerts.</p>
                </div>

                <div className="space-y-3 font-mono text-[10px] text-zinc-300">
                  {/* config item 1 */}
                  <label className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 cursor-pointer select-none">
                    <div className="space-y-0.5 max-w-[80%] text-left">
                      <span className="text-zinc-200 font-bold block capitalize">Auto canonical index recovery</span>
                      <span className="text-[8px] text-zinc-550 leading-tight block">Automatically generates sitemap tags on redirect index alert</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selfHealingConfig.canonicalIndexAlertRepair}
                      onChange={(e) => setSelfHealingConfig(prev => ({ ...prev, canonicalIndexAlertRepair: e.target.checked }))}
                      className="rounded border-zinc-800 bg-black text-indigo-500 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* config item 2 */}
                  <label className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 cursor-pointer select-none">
                    <div className="space-y-0.5 max-w-[80%] text-left">
                      <span className="text-zinc-200 font-bold block capitalize">Rollback on layout performance drop</span>
                      <span className="text-[8px] text-zinc-550 leading-tight block">Instantly reverts CSS changes that drop Lighthouse under score 90</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selfHealingConfig.rollbackOnSitePerformanceDrop}
                      onChange={(e) => setSelfHealingConfig(prev => ({ ...prev, rollbackOnSitePerformanceDrop: e.target.checked }))}
                      className="rounded border-zinc-800 bg-black text-indigo-500 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* config item 3 */}
                  <label className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 cursor-pointer select-none">
                    <div className="space-y-0.5 max-w-[80%] text-left">
                      <span className="text-zinc-200 font-bold block capitalize">Instant broken href route repair</span>
                      <span className="text-[8px] text-zinc-550 leading-tight block">Detects broken anchor targets and matches them to sitemaped pathing</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selfHealingConfig.autoBrokenRedirect}
                      onChange={(e) => setSelfHealingConfig(prev => ({ ...prev, autoBrokenRedirect: e.target.checked }))}
                      className="rounded border-zinc-800 bg-black text-indigo-500 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>

                <div className="p-3 bg-indigo-950/15 border border-indigo-500/15 rounded-xl text-[9.5px] font-mono text-indigo-400 text-left leading-normal">
                  💡 <b>Stabilizer status:</b> Self-Healing systems verify canonical URLs and edge delivery settings every <b>15 minutes</b> across local cron schedules.
                </div>
              </div>

              {/* Multi-model infer comparison arena */}
              <div className="lg:col-span-7 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-2">
                  <div>
                    <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      MULTI-MODEL PARALLEL REASONING TESTBED
                    </h4>
                    <p className="text-[10px] text-zinc-500">Deploy prompts to Gemini Flash, Pro, and Claude side-by-side.</p>
                  </div>

                  <select
                    value={multiModelMode}
                    onChange={(e) => setMultiModelMode(e.target.value as any)}
                    className="bg-black border border-white/10 text-[9.5px] font-mono text-zinc-400 focus:outline-none rounded px-2 py-1"
                  >
                    <option value="parallel">Parallel Contrast Mode</option>
                    <option value="gemini-flash">Gemini 2.5 Flash only</option>
                    <option value="gemini-pro">Gemini 1.5 Pro only</option>
                  </select>
                </div>

                {/* Form fields */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={modelPrompt}
                    onChange={(e) => setModelPrompt(e.target.value)}
                    placeholder="Compare hooks copy e.g., 'Draft high CTR organic title tags...' "
                    className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleModelPromptOptimizeSubmit}
                    className="bg-[#10b981] hover:bg-emerald-600 text-white font-mono font-black text-[10px] px-3.5 rounded-xl uppercase flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Run Side-By-Side
                  </button>
                </div>

                {/* Model outputs panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'gemini-flash', brand: 'Gemini 3.5 Flash', itemName: 'flash', textUrl: modelCompareData.flash.headline, rationalTxt: modelCompareData.flash.rationale, ticks: modelCompareData.flash.speedMs, scorePoints: modelCompareData.flash.score, borderOutline: 'border-indigo-500/10 bg-indigo-500/2' },
                    { id: 'gemini-pro', brand: 'Gemini 1.5 Pro', itemName: 'pro', textUrl: modelCompareData.pro.headline, rationalTxt: modelCompareData.pro.rationale, ticks: modelCompareData.pro.speedMs, scorePoints: modelCompareData.pro.score, borderOutline: 'border-amber-500/10 bg-amber-500/2' },
                    { id: 'claude-sonnet', brand: 'Claude 3.5 Sonnet', itemName: 'sonnet', textUrl: modelCompareData.sonnet.headline, rationalTxt: modelCompareData.sonnet.rationale, ticks: modelCompareData.sonnet.speedMs, scorePoints: modelCompareData.sonnet.score, borderOutline: 'border-emerald-500/10 bg-emerald-500/2' }
                  ].map((elem, i) => (
                    <div key={i} className={`p-3 rounded-xl border flex flex-col justify-between text-left space-y-2 ${elem.borderOutline}`}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                          <span>{elem.brand}</span>
                          <span className="text-emerald-450">{elem.ticks}ms</span>
                        </div>
                        <p className="text-[10px] font-bold text-white font-sans">{elem.textUrl}</p>
                        <p className="text-[8.5px] text-zinc-500 font-sans leading-relaxed">{elem.rationalTxt}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-[9px]">
                        <span className="text-zinc-600 block">Rating: <b className="text-zinc-450">{elem.scorePoints}/10</b></span>
                        <button
                          onClick={() => {
                            // Apply to clipboard or simulate active workspace copy replace
                            navigator.clipboard.writeText(elem.textUrl);
                            setCopiedCode(elem.itemName);
                            setTimeout(() => setCopiedCode(null), 1500);
                          }}
                          className="text-[#C084FC] hover:text-white transition-colors cursor-pointer block text-[8px] uppercase tracking-wider"
                        >
                          {copiedCode === elem.itemName ? 'Applied copy!' : 'Apply Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Terminal activity logging streams */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-5 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-xs text-white font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#A78BFA]" />
                  AUTON_GROWTH_SCHEDULER TELEMETRY COMMAND LOGGER
                </span>

                <button
                  onClick={() => setAgentLogs([])}
                  className="text-[8.5px] text-zinc-650 hover:text-zinc-300 font-bold tracking-wider uppercase transition-colors"
                >
                  Clear command logs
                </button>
              </div>

              {/* Terminal lines wrapper */}
              <div className="w-full bg-[#020203] border border-white/5 p-4 rounded-xl max-h-48 overflow-y-auto text-left text-[10px] text-zinc-400 space-y-1.5 font-mono font-light leading-relaxed">
                {agentLogs.map((logItem, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-zinc-700 font-bold shrink-0">[{logItem.timestamp}]</span>
                    <span className={`text-[8.5px] uppercase font-black shrink-0 ${logItem.type === 'success' ? 'text-emerald-400' : logItem.type === 'error' ? 'text-rose-400' : logItem.type === 'warn' ? 'text-amber-400' : 'text-blue-400'}`}>
                      [{logItem.agent}]
                    </span>
                    <span className="text-zinc-300 flex-1">{logItem.action}</span>
                  </div>
                ))}
                {agentLogs.length === 0 && (
                  <div className="text-zinc-750 text-center py-4">Scheduler command pipe is empty. Standby for next chron trigger verification...</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
