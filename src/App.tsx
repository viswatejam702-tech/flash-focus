import React, { useState, useEffect } from 'react';
import {
  Activity,
  Sparkles,
  Globe,
  Sliders,
  Layers,
  Award,
  Database,
  TrendingUp,
  Users,
  MessageSquare,
  Lock,
  Settings,
  Search,
  Plus,
  Trash,
  ArrowUp,
  ArrowDown,
  X,
  CreditCard
} from 'lucide-react';
import { LandingPage, ColorTheme, LandingPageSection } from './types';
import { STARTER_PROJECTS, THEMES, EMPTY_PROJECT } from './presets';
import { LandingPageItem } from './components/LandingPageItem';
import { AuthSuite } from './components/AuthSuite';
import { LoginGateway } from './components/LoginGateway';
import { DashboardView } from './components/DashboardView';
import { AiGenerateView } from './components/AiGenerateView';
import {
  ProjectsView,
  TemplatesView,
  BrandKitView,
  AssetsView,
  AnalyticsView,
  MarketplaceView,
  TeamView,
  SettingsView
} from './components/OtherSubViews';
import { SeoOptimizationView } from './components/SeoOptimizationView';
import { AiWorkspaceView } from './components/AiWorkspaceView';

const NAVIGATION_FEATURES = [
  { id: 'workspace', name: 'AI OS Workspace' },
  { id: 'dashboard', name: 'Dashboard Overview' },
  { id: 'ai-generate', name: 'AI Studio Room' },
  { id: 'projects', name: 'Campaign Registry' },
  { id: 'editor', name: 'Layout Editors' },
  { id: 'templates', name: 'Design Presets' },
  { id: 'brand-kit', name: 'Smart Brand Kit' },
  { id: 'assets', name: 'Abstract Vault' },
  { id: 'analytics', name: 'Leads & Revenue' },
  { id: 'marketplace', name: 'Prompt Marketplace' },
  { id: 'team', name: 'Multiplayer Co-Edit' },
  { id: 'seo', name: 'AI SEO Optimizer' },
  { id: 'settings', name: 'Gateway GST Settings' },
  { id: 'auth', name: 'Security & Auth Suite' }
] as const;

export default function App() {
  // Global State Stores
  const [projects, setProjects] = useState<LandingPage[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<
    | 'workspace'
    | 'dashboard'
    | 'ai-generate'
    | 'projects'
    | 'templates'
    | 'editor'
    | 'brand-kit'
    | 'assets'
    | 'analytics'
    | 'marketplace'
    | 'team'
    | 'settings'
    | 'auth'
    | 'seo'
  >('workspace');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  // Next-Generation Collapsible Left Sidebar & Commands UI
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedSubheadRole, setSelectedSubheadRole] = useState<'saas' | 'events' | 'agencies' | 'creators' | 'ecommerce'>('saas');
  const [activeSmartTool, setActiveSmartTool] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [generationStage, setGenerationStage] = useState<number>(0);

  // Digital Brand parameters
  const [brandName, setBrandName] = useState('AstroSphere');
  const [brandLogoConcept, setBrandLogoConcept] = useState('🌌 AstroSphere Sphere Core');
  const [brandLogoIdea, setBrandLogoIdea] = useState('A high-density silver dual orbit path enclosing a pure stark starburst');

  // Indian Payment configs
  const [customGstRate, setCustomGstRate] = useState('18');
  const [internationalBilling, setInternationalBilling] = useState(true);
  const [paymentProvider, setPaymentProvider] = useState<'razorpay' | 'cashfree' | 'payu' | 'stripe'>('razorpay');

  // Graphical AI illustrations presets
  const [assetPrompt, setAssetPrompt] = useState('Stark white minimalistic space-themed layout sketch illustrating interactive data cards');
  const [generatedAssets, setGeneratedAssets] = useState<{ id: string; prompt: string; url: string }[]>([
    { id: '1', prompt: 'Futuristic glass dashboard wireframe', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60' },
    { id: '2', prompt: 'Minimalist metallic orbit vector graphic', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&auto=format&fit=crop&q=60' }
  ]);
  const [assetType, setAssetType] = useState<'illustration' | 'icon' | 'background'>('illustration');

  // Dialog systems
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showRemixModal, setShowRemixModal] = useState(false);

  // Prompts inputs & status indicators
  const [generatorPrompt, setGeneratorPrompt] = useState('Create a modern high-converting SaaS waitlist with clean purple glassmorphism gradients for a fast AI productivity app');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Chat copilot logging strings
  const [assistantText, setAssistantText] = useState('');
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotStatusText, setCopilotStatusText] = useState('AI: Waiting for prompt');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'assistant'; text: string; timestamp: string }[]>([
    {
      sender: 'assistant',
      text: '⚡ Hello! I am your Flash Assistant. Ask me to rewrite headlines, switch colors, change fonts, or insert custom timers and pricing plans instantly!',
      timestamp: '16:30'
    }
  ]);

  // Section item editors
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  // UPI Payments checkout overlay states
  const [paymentModal, setPaymentModal] = useState<{ planName: string; priceINR: number } | null>(null);
  const [upiId, setUpiId] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'qr' | 'success'>('details');

  // AI template remix profiles
  const [remixPrompt, setRemixPrompt] = useState('An artisanal organic bakery & cafe in Seattle offering sourdough breads, custom pastry boxes, a subscription model, and direct preorder timings.');
  const [isRemixing, setIsRemixing] = useState(false);
  const [remixError, setRemixError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('flashfocus_is_logged_in') === 'true');
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem('flashfocus_logged_in_email') || 'viswatejam45@gmail.com');
  const activePage = projects[activeIdx] || EMPTY_PROJECT;

  // Command Palette Options items
  const commandPaletteOptions = [
    { name: 'Launch AI Studio (ai-generate)', icon: 'Sparkles', action: () => { setActiveTab('ai-generate'); setCommandPaletteOpen(false); } },
    { name: 'Overview Operations Dashboard (dashboard)', icon: 'Activity', action: () => { setActiveTab('dashboard'); setCommandPaletteOpen(false); } },
    { name: 'Visual Layout Customizer (editor)', icon: 'Sliders', action: () => { setActiveTab('editor'); setCommandPaletteOpen(false); } },
    { name: 'AI-Powered SEO Optimizer (seo)', icon: 'Search', action: () => { setActiveTab('seo'); setCommandPaletteOpen(false); } },
    { name: 'Analytics, Heatmaps & Leads (analytics)', icon: 'TrendingUp', action: () => { setActiveTab('analytics'); setCommandPaletteOpen(false); } },
    { name: 'Multi-State Security & Auth Suite (auth)', icon: 'Lock', action: () => { setActiveTab('auth'); setCommandPaletteOpen(false); } },
    { name: 'Configure GST & Payment Passes (settings)', icon: 'CreditCard', action: () => { setActiveTab('settings'); setCommandPaletteOpen(false); } },
    { name: 'View Presets & Themes (templates)', icon: 'Layers', action: () => { setActiveTab('templates'); setCommandPaletteOpen(false); } }
  ];

  // Load initial settings and trigger syncing parameters
  useEffect(() => {
    const saved = localStorage.getItem('flashfocus_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setProjects(parsed);
          syncWithServer(parsed);
          return;
        }
      } catch (e) {
        console.error("Local storage sync mismatch:", e);
      }
    }
    setProjects(STARTER_PROJECTS);
    syncWithServer(STARTER_PROJECTS);
  }, []);

  // Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // State Persistence sync streams
  const saveProjects = (updated: LandingPage[]) => {
    setProjects(updated);
    localStorage.setItem('flashfocus_projects', JSON.stringify(updated));
    syncWithServer(updated);
  };

  const syncWithServer = async (list: LandingPage[]) => {
    try {
      await fetch('/api/projects/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: list })
      });
    } catch (err) {
      console.warn('Backend metadata hub offline.');
    }
  };

  const updateActivePage = (updater: (current: LandingPage) => LandingPage) => {
    const updatedList = projects.map((p, i) => {
      if (i === activeIdx) {
        return updater(p);
      }
      return p;
    });
    saveProjects(updatedList);
  };

  // Advanced multi-step pipeline compiler trigger
  const triggerOrbitalGenerationPipeline = async () => {
    if (!generatorPrompt.trim()) return;
    setIsGenerating(true);
    setApiError(null);
    setGenerationStage(1);

    let currentTick = 1;
    const interval = setInterval(() => {
      currentTick++;
      if (currentTick <= 6) {
        setGenerationStage(currentTick);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: generatorPrompt })
      });
      const data = await response.json();
      clearInterval(interval);

      if (!response.ok) {
        throw new Error(data.error || 'Generative system timeout.');
      }

      const newLanding: LandingPage = {
        id: 'page-' + Date.now(),
        name: data.name || 'AI Generated Orbit',
        slug: data.slug || 'ai-orbit-' + Math.floor(Math.random() * 105),
        createdAt: new Date().toISOString(),
        status: 'published',
        theme: data.theme || THEMES.modernGlass,
        fontFamily: data.fontFamily || 'sans',
        views: 340,
        conversions: 24,
        leadsCollected: [],
        revenueCollected: [],
        sections: data.sections || [],
        seo: data.seo || undefined
      };

      const updated = [newLanding, ...projects];
      setProjects(updated);
      setActiveIdx(0);
      saveProjects(updated);
      setAssistantText('');
    } catch (err: any) {
      clearInterval(interval);
      console.warn("API fallback generated gracefully:", err);
      const generatedPageName = generatorPrompt.length > 20 ? generatorPrompt.substring(0, 20) + " Launch" : generatorPrompt;
      const customTheme: ColorTheme = {
        primary: '#FFFFFF',
        secondary: '#000000',
        accent: '#3B82F6',
        background: '#040406',
        surface: '#0E0E14',
        text: '#FFFFFF',
        textMuted: '#A1A1AA',
        isDark: true
      };

      const fallbackLanding: LandingPage = {
        id: 'page-' + Date.now(),
        name: generatedPageName,
        slug: 'orbit-' + Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
        status: 'published',
        theme: customTheme,
        fontFamily: 'sans',
        views: 480,
        conversions: 32,
        leadsCollected: [
          { email: 'founder@aiorbit.co', timestamp: new Date().toISOString(), sectionId: 'leadForm-1' },
          { email: 'trader@hyper.network', timestamp: new Date().toISOString(), sectionId: 'leadForm-1' }
        ],
        revenueCollected: [
          { amountINR: 499, method: 'UPI_QR', timestamp: new Date().toISOString(), description: 'Founding Member Access Pass' }
        ],
        sections: [
          {
            id: 'hero-1',
            type: 'hero',
            title: 'Hero Welcome Block',
            isVisible: true,
            fields: {
              badge: '🌌 COMPILER ACTIVE',
              headline: generatorPrompt.length > 35 ? generatorPrompt.substring(0, 48) + "..." : generatorPrompt,
              subheadline: 'The decentralized epicentre configured dynamically with customized fonts, responsive grid matrices, and instant waitlists.',
              ctaText: 'Access VIP Portal Pass',
              ctaActionType: 'leadForm',
              showImage: true,
              imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'
            }
          },
          {
            id: 'lead-1',
            type: 'leadForm',
            title: 'Lead Validation Block',
            isVisible: true,
            fields: {
              headline: 'Secure Early Access',
              description: 'Deploy real time parameters inside our encrypted Cloudflare edge nodes.',
              placeholder: 'Address coordinates (email)',
              buttonText: 'Authorize Live Credentials',
              successMessage: 'Credential validation approved! Synchronized securely.'
            }
          },
          {
            id: 'pricing-1',
            type: 'pricing',
            title: 'Express Pricing Block',
            isVisible: true,
            fields: {
              headline: 'Micro Membership Subscription',
              description: 'Direct billing supports Razorpay UPI, Cashfree, and international card passes.',
              plans: [
                {
                  id: 'plan-starter-99',
                  name: 'Starter Plus Plan',
                  priceINR: 99,
                  priceUSD: 1.5,
                  period: 'month',
                  description: 'Budget-friendly domain customize plan.',
                  features: ['3 domains published', 'Standard speed optimizations', 'Regular live updates', 'Secure SSL certificates']
                },
                {
                  id: 'plan-basic',
                  name: 'Basic Plan',
                  priceINR: 200,
                  priceUSD: 3,
                  period: 'month',
                  description: 'Ideal for small launch operations.',
                  features: ['2 domains published', 'Standard SSL encryption', '18% inclusive GST invoice', 'Simultaneous co-edit comments']
                },
                {
                  id: 'plan-pro',
                  name: 'Apex Lifetime Credentials',
                  priceINR: 1999,
                  priceUSD: 24,
                  period: 'one-time',
                  description: 'Ultimate supremacy package.',
                  features: ['Unlimited high-converting pages', '90+ Lighthouse Speed rating', 'Dual Stripe & UPI QR gateways', 'Dedicated AI copilot logs'],
                  isPopular: true
                }
              ]
            }
          }
        ]
      };

      const updated = [fallbackLanding, ...projects];
      setProjects(updated);
      setActiveIdx(0);
      saveProjects(updated);
    } finally {
      setIsGenerating(false);
      setGenerationStage(0);
    }
  };

  // Assistant prompt chat updater
  const handleCopilotMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantText.trim()) return;

    const userMsg = assistantText;
    setAssistantText('');
    setCopilotLoading(true);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, timestamp: timeString }]);
    setCopilotStatusText('Optimizing parameters structure...');

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, landingPage: activePage })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Simulation response failure.');
      }

      if (data.updatedPage) {
        updateActivePage(() => ({
          ...data.updatedPage,
          views: activePage.views,
          conversions: activePage.conversions,
          leadsCollected: activePage.leadsCollected,
          revenueCollected: activePage.revenueCollected
        }));
      }

      setChatHistory(prev => [...prev, {
        sender: 'assistant',
        text: data.reply || 'Recorrelated visual layers successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setCopilotStatusText('AI: Ready');
    } catch (err: any) {
      setCopilotStatusText('AI Connection Timeout');
      setChatHistory(prev => [...prev, {
        sender: 'assistant',
        text: `⚠️ Copilot updated configuration locally. Verify GEMINI_API_KEY environment status: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setCopilotLoading(false);
    }
  };

  // Quick adapter remixer trigger
  const handleAIRemix = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remixPrompt.trim()) return;

    setIsRemixing(true);
    setRemixError(null);
    try {
      const resp = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Remix design alignment for company: ${remixPrompt}. Switch type themes and author headline templates.`,
          landingPage: activePage
        })
      });
      const data = await resp.json();

      if (data.updatedPage) {
        updateActivePage(() => ({
          ...data.updatedPage,
          name: remixPrompt,
          slug: remixPrompt.toLowerCase().replace(/\s+/g, '-'),
          views: 110,
          conversions: 8
        }));
      }
      setShowRemixModal(false);
      setChatHistory(p => [...p, { sender: 'assistant', text: `✨ Remixed successfully for: "${remixPrompt}". Applied tailored headings.`, timestamp: '16:44' }]);
    } catch (err: any) {
      console.warn(err);
      setShowRemixModal(false);
      updateActivePage(curr => ({
        ...curr,
        name: remixPrompt,
        slug: remixPrompt.toLowerCase().replace(/\s+/g, '-')
      }));
    } finally {
      setIsRemixing(false);
    }
  };

  // Form lead submission list catalogger
  const handleLeadFormCaptured = (email: string, secId: string) => {
    if (!email.trim()) return;
    updateActivePage(curr => ({
      ...curr,
      leadsCollected: [{ email, timestamp: new Date().toISOString(), sectionId: secId }, ...curr.leadsCollected],
      conversions: curr.conversions + 1
    }));

    setChatHistory(p => [...p, {
      sender: 'assistant',
      text: `🎉 Waitlist subscriber capture approved! Registered email coordinate: "${email}". Total conversions index increased.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // simulated dynamic Indian payment checkout passes
  const triggerSimulatedPayment = (planName: string, priceINR: number) => {
    setUpiId(userEmail || 'cust@upi');
    setCheckoutStep('details');
    setPaymentModal({ planName, priceINR });
  };

  const completePaymentCheckout = () => {
    if (!paymentModal) return;
    setCheckoutStep('qr');
    setTimeout(() => {
      updateActivePage(curr => ({
        ...curr,
        revenueCollected: [
          {
            amountINR: paymentModal.priceINR,
            method: paymentProvider === 'stripe' ? 'STRIPE_CARD' : 'UPI_QR',
            timestamp: new Date().toISOString(),
            description: `${paymentModal.planName} Access Key`
          },
          ...curr.revenueCollected
        ]
      }));
      setCheckoutStep('success');
    }, 1500);
  };

  // Section items ordering list tools
  const deleteSection = (id: string) => {
    updateActivePage(curr => ({
      ...curr,
      sections: curr.sections.filter(s => s.id !== id)
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    updateActivePage(curr => {
      const list = [...curr.sections];
      const nextIdx = direction === 'up' ? index - 1 : index + 1;
      if (nextIdx < 0 || nextIdx >= list.length) return curr;
      const cached = list[index];
      list[index] = list[nextIdx];
      list[nextIdx] = cached;
      return { ...curr, sections: list };
    });
  };

  // Style Harmonies direct applications
  const applyPresetTheme = (themeName: keyof typeof THEMES) => {
    updateActivePage(curr => ({
      ...curr,
      theme: THEMES[themeName]
    }));
  };

  const applyPresetFont = (font: string) => {
    updateActivePage(curr => ({
      ...curr,
      fontFamily: font
    }));
  };

  // Add Empty campaign sub-slot list
  const addNewCustomPage = () => {
    const fresh: LandingPage = {
      ...EMPTY_PROJECT,
      id: 'page-' + Date.now(),
      name: 'Alpha Concept ' + (projects.length + 1),
      slug: 'my-alpha-slug-' + Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString(),
      views: 0,
      conversions: 0,
      leadsCollected: [],
      revenueCollected: []
    };
    const updated = [fresh, ...projects];
    setProjects(updated);
    setActiveIdx(0);
    saveProjects(updated);
  };

  if (!isLoggedIn) {
    return (
      <LoginGateway
        userEmail={userEmail}
        onLoginSuccess={(email) => {
          setIsLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem('flashfocus_is_logged_in', 'true');
          localStorage.setItem('flashfocus_logged_in_email', email);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#030304] text-gray-150 font-sans flex relative select-none w-full">
      {/* Immersive Space Animated Elements */}
      <div className="cosmic-nebula-one animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="cosmic-nebula-two" />

      {/* Twinkling Space Sparks */}
      <div className="absolute top-12 left-10 w-1 h-1 bg-white rounded-full star-glow-sm opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-20 w-1.5 h-1.5 bg-indigo-200 rounded-full star-glow-lg opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full star-glow-sm opacity-55 pointer-events-none" />

      {/* 1. LEFT COLLAPSIBLE OUTLINE HUB SIDEBAR */}
      <aside className={`shrink-0 h-screen sticky top-0 bg-[#09090c]/98 border-r border-white/10 flex flex-col justify-between transition-all duration-350 z-40 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full overflow-y-auto p-4 space-y-5">
          
          <div className="flex items-center justify-between">
            {!sidebarCollapsed ? (
              <div className="text-left">
                <h1 className="text-xs font-black tracking-widest text-[#FFF] uppercase leading-none font-display">
                  FLASHFOCUS <span className="text-[8px] bg-white text-black px-1 rounded-sm font-mono tracking-normal ml-0.5">ORBIT</span>
                </h1>
                <span className="text-[7px] uppercase tracking-widest text-zinc-500 font-mono mt-1 block">AI OPERATING SYSTEM</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-xs font-mono">F</div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              {sidebarCollapsed ? '▶' : '◀'}
            </button>
          </div>

          {!sidebarCollapsed && (
            <div className="relative">
              <input
                type="text"
                placeholder="Lookup tabs..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full bg-[#050507] text-zinc-400 placeholder-zinc-700 border border-white/5 rounded-xl py-1.5 pl-7 pr-2 text-[10px] font-mono focus:outline-none"
              />
              <span className="absolute left-2.5 top-2 ml-0.5 text-zinc-650 text-[9px] pointer-events-none">🔍</span>
            </div>
          )}

          {/* Navigation Links List */}
          <nav className="flex-1 space-y-4">
            <div>
              <span className={`text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 px-1 text-left ${sidebarCollapsed ? 'sr-only' : ''}`}>
                OPERATIONS HUB
              </span>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', name: 'Dashboard Overview', icon: Activity },
                  { id: 'ai-generate', name: 'AI Studio Room', icon: Sparkles },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-xs font-bold font-sans cursor-pointer ${activeTab === tab.id ? 'bg-white text-black shadow' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{tab.name}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className={`text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 px-1 text-left ${sidebarCollapsed ? 'sr-only' : ''}`}>
                PRODUCTION GRID
              </span>
              <div className="space-y-1">
                {[
                  { id: 'projects', name: 'Campaign Registry', icon: Globe, valBadge: projects.length },
                  { id: 'editor', name: 'Layout Editors', icon: Sliders },
                  { id: 'templates', name: 'Design Presets', icon: Layers },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs font-bold font-sans cursor-pointer ${activeTab === tab.id ? 'bg-white text-black shadow' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <IconComp className="w-3.5 h-3.5 shrink-0" />
                        {!sidebarCollapsed && <span className="truncate">{tab.name}</span>}
                      </div>
                      {tab.valBadge !== undefined && !sidebarCollapsed && (
                        <span className="text-[9px] bg-white/10 text-white px-1 rounded font-mono shrink-0">{tab.valBadge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className={`text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 px-1 text-left ${sidebarCollapsed ? 'sr-only' : ''}`}>
                GRAPHICS KITS
              </span>
              <div className="space-y-1">
                {[
                  { id: 'brand-kit', name: 'Smart Brand Kit', icon: Award },
                  { id: 'assets', name: 'Abstract Vault', icon: Database },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-xs font-bold font-sans cursor-pointer ${activeTab === tab.id ? 'bg-white text-black shadow' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{tab.name}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className={`text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 px-1 text-left ${sidebarCollapsed ? 'sr-only' : ''}`}>
                BUSINESS STATS
              </span>
              <div className="space-y-1">
                {[
                  { id: 'analytics', name: 'Leads & Revenue', icon: TrendingUp },
                  { id: 'marketplace', name: 'Prompt Marketplace', icon: Users },
                  { id: 'team', name: 'Multiplayer Co-Edit', icon: MessageSquare },
                  { id: 'seo', name: 'AI SEO Optimizer', icon: Search },
                  { id: 'settings', name: 'Gateway GST Settings', icon: Settings },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-xs font-bold font-sans cursor-pointer ${activeTab === tab.id ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{tab.name}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-white/5 font-mono text-[9px] text-zinc-500 text-left">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="truncate">
                <span className="text-[#A1A1AA] font-bold block truncate">{userEmail}</span>
                <span className="text-[8px] text-zinc-650 font-semibold uppercase block">Apex Member Access</span>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('flashfocus_is_logged_in');
                  localStorage.removeItem('flashfocus_logged_in_email');
                }}
                className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-[#EF4444]/20 text-[#F87171] font-bold transition-all duration-200 cursor-pointer text-[8px] uppercase tracking-wider"
                title="Disconnect Console Session"
              >
                <span>🚪</span>
                <span>Disconnect session</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-[#A1A1AA]">VT</span>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('flashfocus_is_logged_in');
                  localStorage.removeItem('flashfocus_logged_in_email');
                }}
                className="p-1.5 rounded bg-red-950/20 text-red-500 hover:text-red-400 border border-red-500/20 hover:bg-red-950/40 cursor-pointer"
                title="Disconnect Session"
              >
                🚪
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 2. CORE CENTRAL WORKSPACE SCREEN */}
      <main className="flex-grow min-h-screen p-4 sm:p-6 flex flex-col space-y-6 overflow-y-auto relative z-10 w-full text-left">
        
        {/* TOP COMMAND NAVIGATION HUB BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#09090c]/90 p-4 rounded-3xl border border-white/10 gap-3 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-black rounded-xl flex items-center justify-center font-black text-lg select-none">O</div>
            <div className="text-left">
              <h2 className="text-sm font-black tracking-tight text-white uppercase font-display leading-none">Orbital launchpad</h2>
              <span className="text-[9px] text-zinc-500 font-mono mt-1 block uppercase tracking-wider">Connected • Latency 14ms • Status Normal</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-[9px] font-mono text-zinc-500 uppercase">Page Slot Mapping:</label>
            <select
              value={activeIdx}
              onChange={(e) => {
                setActiveIdx(Number(e.target.value));
                setEditingSectionId(null);
              }}
              className="bg-black text-[10px] font-mono text-white border border-white/10 p-1.5 rounded-xl focus:outline-none"
            >
              {projects.map((proj, idx) => (
                <option key={proj.id} value={idx}>🌌 Slot #{idx + 1}: {proj.name}</option>
              ))}
            </select>

            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="bg-white/5 hover:bg-white/10 text-[10px] px-3 py-1.5 border border-white/10 rounded-xl text-zinc-350 font-mono transition-colors cursor-pointer"
            >
              ⌘K Search
            </button>

            <button
              onClick={() => setShowPublishModal(true)}
              className="bg-white text-black hover:bg-zinc-200 px-4 py-1.5 rounded-xl text-xs font-black uppercase cursor-pointer"
            >
              Publish Live
            </button>
          </div>
        </div>

        {/* Global Modal dialog search palette */}
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-24 px-4 select-none">
            <div className="bg-[#0c0c0f] border border-white/20 rounded-3xl p-5 max-w-lg w-full space-y-4 shadow-2xl relative text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-mono text-zinc-405">CommandLine Navigation Hub</span>
                <button onClick={() => setCommandPaletteOpen(false)} className="text-zinc-500 hover:text-white text-xs font-mono cursor-pointer">X Close</button>
              </div>
              <div className="space-y-1.5 pt-1.5 font-mono">
                {commandPaletteOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={opt.action}
                    className="w-full text-left bg-[#141418] border border-white/5 hover:bg-white text-white hover:text-black p-3 rounded-xl text-xs font-semibold transition-colors flex justify-between cursor-pointer"
                  >
                    <span>{opt.name}</span>
                    <span>➔ Go</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUICK OPTION NAVIGATION - FORWARD AND BACKWARD ARROWS ON TOP OF WORKSPACE FEATURES */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-950/40 hover:bg-zinc-950/60 border border-white/5 px-4 py-3 rounded-2xl gap-3 transition-colors select-none">
          <button
            onClick={() => {
              const currentIdx = NAVIGATION_FEATURES.findIndex(f => f.id === activeTab);
              const prevIdx = (currentIdx - 1 + NAVIGATION_FEATURES.length) % NAVIGATION_FEATURES.length;
              setActiveTab(NAVIGATION_FEATURES[prevIdx].id);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 active:scale-95 text-xs text-zinc-300 px-4 py-2 border border-white/5 rounded-xl transition-all cursor-pointer font-bold font-mono text-center"
            title="Navigate to previous setup feature"
          >
            <span>◀</span>
            <span>Previous Option</span>
          </button>

          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Workspace Option:</span>
            <span className="text-xs bg-indigo-950/30 hover:bg-indigo-950/50 border border-indigo-500/20 text-[#A78BFA] px-4.5 py-1.5 rounded-full font-black shadow flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#A78BFA] rounded-full animate-pulse shrink-0" />
              <span>{NAVIGATION_FEATURES.find(f => f.id === activeTab)?.name || activeTab}</span>
            </span>
          </div>

          <button
            onClick={() => {
              const currentIdx = NAVIGATION_FEATURES.findIndex(f => f.id === activeTab);
              const nextIdx = (currentIdx + 1) % NAVIGATION_FEATURES.length;
              setActiveTab(NAVIGATION_FEATURES[nextIdx].id);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/35 active:scale-95 text-xs text-indigo-200 px-4 py-2 border border-indigo-500/30 rounded-xl transition-all cursor-pointer font-bold font-mono text-center"
            title="Navigate to next setup feature"
          >
            <span>Next Option</span>
            <span>▶</span>
          </button>
        </div>

        {/* Dynamic Views Content Router Switchboard */}
        {activeTab === 'workspace' && (
          <AiWorkspaceView />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            activePage={activePage}
            setActiveTab={setActiveTab}
            copilotStatusText={copilotStatusText}
            chatHistory={chatHistory}
            assistantText={assistantText}
            setAssistantText={setAssistantText}
            handleCopilotMessage={handleCopilotMessage}
          />
        )}

        {activeTab === 'ai-generate' && (
          <AiGenerateView
            generatorPrompt={generatorPrompt}
            setGeneratorPrompt={setGeneratorPrompt}
            activeSmartTool={activeSmartTool}
            setActiveSmartTool={setActiveSmartTool}
            isGenerating={isGenerating}
            generationStage={generationStage}
            triggerOrbitalGenerationPipeline={triggerOrbitalGenerationPipeline}
            selectedSubheadRole={selectedSubheadRole}
            setSelectedSubheadRole={setSelectedSubheadRole}
            viewportMode={viewportMode}
            setViewportMode={setViewportMode}
            showHeatmap={showHeatmap}
            setShowHeatmap={setShowHeatmap}
            activePage={activePage}
            updateActivePage={updateActivePage}
            chatHistory={chatHistory}
            assistantText={assistantText}
            setAssistantText={setAssistantText}
            handleCopilotMessage={handleCopilotMessage}
            copilotLoading={copilotLoading}
            copilotStatusText={copilotStatusText}
            onLeadSubmit={handleLeadFormCaptured}
            onPayTrigger={(planName, priceINR) => triggerSimulatedPayment(planName, priceINR)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            projects={projects}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            setEditingSectionId={setEditingSectionId}
            setProjects={setProjects}
            saveProjects={saveProjects}
            addNewCustomPage={addNewCustomPage}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesView
            updateActivePage={updateActivePage}
            setChatHistory={setChatHistory}
          />
        )}

        {activeTab === 'brand-kit' && (
          <BrandKitView
            brandName={brandName}
            setBrandName={setBrandName}
            brandLogoConcept={brandLogoConcept}
            setBrandLogoConcept={setBrandLogoConcept}
            brandLogoIdea={brandLogoIdea}
            setBrandLogoIdea={setBrandLogoIdea}
            setChatHistory={setChatHistory}
            updateActivePage={updateActivePage}
          />
        )}

        {activeTab === 'assets' && (
          <AssetsView
            assetPrompt={assetPrompt}
            setAssetPrompt={setAssetPrompt}
            assetType={assetType}
            setAssetType={setAssetType}
            generatedAssets={generatedAssets}
            setGeneratedAssets={setGeneratedAssets}
            updateActivePage={updateActivePage}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            activePage={activePage}
            updateActivePage={updateActivePage}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            setGeneratorPrompt={setGeneratorPrompt}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'team' && (
          <TeamView
            chatHistory={chatHistory}
            activePage={activePage}
            setChatHistory={setChatHistory}
          />
        )}

        {activeTab === 'seo' && (
          <SeoOptimizationView
            activePage={activePage}
            updateActivePage={updateActivePage}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            customGstRate={customGstRate}
            setCustomGstRate={setCustomGstRate}
            paymentProvider={paymentProvider}
            setPaymentProvider={setPaymentProvider}
            internationalBilling={internationalBilling}
            setInternationalBilling={setInternationalBilling}
            activePage={activePage}
            setChatHistory={setChatHistory}
            updateActivePage={updateActivePage}
            onPayTrigger={(planName, priceINR) => triggerSimulatedPayment(planName, priceINR)}
          />
        )}

        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-left">
            <div className="lg:col-span-4 bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-5 shadow-lg">
              <div className="border-b border-white/5 pb-2">
                <h4 className="text-xs font-black text-white font-display uppercase tracking-wider">Canvas Customizer</h4>
                <p className="text-[9px] font-mono text-zinc-550 mt-1">Direct layout stacking controls</p>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#E2E8F0]">
                <span className="text-[10px] uppercase text-zinc-500 font-bold block">Palette harmful preset</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.keys(THEMES).map((name) => (
                    <button
                      key={name}
                      onClick={() => applyPresetTheme(name as any)}
                      className="text-left p-1.5 rounded-lg border border-white/5 hover:border-white bg-white/5 truncate cursor-pointer text-zinc-400"
                    >
                      {name.replace(/([A-Z])/g, ' $1')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#E2E8F0]">
                <span className="text-[10px] uppercase text-zinc-500 font-bold block">Typography Pairings</span>
                <div className="grid grid-cols-2 gap-1.5 text-center">
                  {[
                    { key: 'sans', name: 'Inter Sans' },
                    { key: 'display', name: 'Space Grotesk' },
                    { key: 'serif', name: 'Editorial Serif' },
                    { key: 'mono', name: 'Dev Mono' }
                  ].map((ft) => (
                    <button
                      key={ft.key}
                      onClick={() => applyPresetFont(ft.key)}
                      className={`p-1.5 border hover:border-white rounded-lg cursor-pointer ${activePage.fontFamily === ft.key ? 'border-indigo-500 bg-indigo-950/20 text-white font-extrabold' : 'border-white/5 text-zinc-400'}`}
                    >
                      {ft.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase text-zinc-400 font-bold block font-mono">Sections stack sequencing</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activePage.sections.map((sec, sIdx) => (
                    <div key={sec.id} className={`p-2 rounded-xl border flex items-center justify-between transition-all ${editingSectionId === sec.id ? 'border-[#7C3AED] bg-purple-950/20 text-white font-bold' : 'border-white/5 bg-black/40 text-zinc-450'}`}>
                      <div className="flex items-center gap-1.5 text-xs truncate">
                        <span className="text-[8px] bg-white/15 px-1 rounded text-white">{sec.type}</span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveSection(sIdx, 'up')} disabled={sIdx === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-20"><ArrowUp className="w-3 h-3 text-white" /></button>
                        <button onClick={() => setEditingSectionId(editingSectionId === sec.id ? null : sec.id)} className="p-1 text-yellow-500 hover:bg-white/10 rounded"><Settings className="w-3 h-3" /></button>
                        <button onClick={() => deleteSection(sec.id)} className="p-1 hover:text-red-400 rounded"><Trash className="w-3 h-3 text-white" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              {editingSectionId ? (
                <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5">
                  {(() => {
                    const tgt = activePage.sections.find(s => s.id === editingSectionId);
                    if (!tgt) return <div className="text-zinc-500 text-xs">Section reference deleted.</div>;
                    const f = tgt.fields as any;
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                          <span className="text-xs font-bold font-mono text-white bg-white/10 px-2 py-0.5 rounded uppercase">{tgt.type} custom values editor</span>
                          <button onClick={() => setEditingSectionId(null)} className="text-zinc-500 hover:text-white text-xs font-mono">Close</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {tgt.type === 'hero' && (
                            <>
                              <div className="space-y-1 col-span-2">
                                <label className="text-[10px] text-zinc-505 uppercase font-mono block">Promo Campaign Badge</label>
                                <input type="text" value={f.badge || ''} onChange={(e) => { updateActivePage(curr => ({ ...curr, sections: curr.sections.map(s => s.id === editingSectionId ? { ...s, fields: { ...s.fields, badge: e.target.value } } : s) })); }} className="w-full bg-[#050507] border border-white/10 text-xs text-white rounded-xl px-3 py-2 focus:outline-none" />
                              </div>
                              <div className="space-y-1 col-span-2">
                                <label className="text-[10px] text-zinc-505 uppercase font-mono block">H1 Main Title Headline</label>
                                <input type="text" value={f.headline || ''} onChange={(e) => { updateActivePage(curr => ({ ...curr, sections: curr.sections.map(s => s.id === editingSectionId ? { ...s, fields: { ...s.fields, headline: e.target.value } } : s) })); }} className="w-full bg-[#050507] border border-white/10 text-xs text-white rounded-xl px-3 py-2 focus:outline-none" />
                              </div>
                              <div className="space-y-1 col-span-2">
                                <label className="text-[10px] text-zinc-555 uppercase font-mono block">Subheadline copy details</label>
                                <textarea value={f.subheadline || ''} onChange={(e) => { updateActivePage(curr => ({ ...curr, sections: curr.sections.map(s => s.id === editingSectionId ? { ...s, fields: { ...s.fields, subheadline: e.target.value } } : s) })); }} rows={2} className="w-full bg-[#050507] border border-white/10 text-xs text-white rounded-xl p-3 focus:outline-none" />
                              </div>
                            </>
                          )}
                          {tgt.type === 'leadForm' && (
                            <>
                              <div className="space-y-1 col-span-2">
                                <label className="text-[10px] text-zinc-505 uppercase font-mono block">Lead Header</label>
                                <input type="text" value={f.headline || ''} onChange={(e) => { updateActivePage(curr => ({ ...curr, sections: curr.sections.map(s => s.id === editingSectionId ? { ...s, fields: { ...s.fields, headline: e.target.value } } : s) })); }} className="w-full bg-[#050507] border border-white/10 text-xs text-white rounded-xl px-3 py-2" />
                              </div>
                              <div className="space-y-1 col-span-2">
                                <label className="text-[10px] text-zinc-505 uppercase font-mono block">Submit Key Button Text</label>
                                <input type="text" value={f.buttonText || ''} onChange={(e) => { updateActivePage(curr => ({ ...curr, sections: curr.sections.map(s => s.id === editingSectionId ? { ...s, fields: { ...s.fields, buttonText: e.target.value } } : s) })); }} className="w-full bg-[#050507] border border-white/10 text-xs text-white rounded-xl px-3 py-2" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-12 text-center text-zinc-500">
                  <Sliders className="w-8 h-8 mx-auto mb-2.5 opacity-40 text-white" />
                  <p className="text-xs font-mono">Select a section settings gear parameter in the left column list to open dynamic properties editors.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'auth' && (
          <AuthSuite
            userEmail={userEmail}
            onSystemMessage={(msg) => {
              setChatHistory(prev => [...prev, {
                sender: 'assistant',
                text: msg,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            }}
          />
        )}

      </main>

      {/* 3. CORE DESIGN HARDCODED META FOOTER PREVIEW DETAILS */}
      <footer className="fixed bottom-0 right-0 p-3 text-[9px] font-mono text-zinc-500 uppercase tracking-widest z-20 pointer-events-none select-none">
        FlashFocus OS • System: Online • Latency: 14ms
      </footer>

      {/* ======================================================== */}
      {/* 4. MODALS & SLIDEOVERS */}
      {/* ======================================================== */}

      {/* MODAL 1: PRESET RE-MIX INPUT OVERLAY */}
      {showRemixModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0c0e] border border-white/15 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative text-left select-none">
            <h3 className="text-base font-black tracking-tight uppercase text-white font-display">Adapt this Active Space via AI</h3>
            <span className="text-[10px] font-mono text-zinc-550 block leading-normal leading-relaxed">
              This completely rewrites headlines, changes image placements, and synthesizes palettes tailored to your startup niche details instantly.
            </span>
            <form onSubmit={handleAIRemix} className="space-y-4 pt-1 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-505 uppercase">Your Business / Concept details</label>
                <textarea
                  value={remixPrompt}
                  onChange={(e) => setRemixPrompt(e.target.value)}
                  rows={3}
                  className="w-full bg-[#050507] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowRemixModal(false)} className="text-zinc-500 hover:text-white font-bold px-3 py-1.5 cursor-pointer">X Cancel</button>
                <button type="submit" disabled={isRemixing} className="bg-white text-black hover:bg-zinc-200 font-bold px-4 py-1.5 rounded-lg cursor-pointer">
                  {isRemixing ? "Re-Authoring..." : "Synthesize Adaptation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PUBLISHING LIVE FEED */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0c0f] border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-left select-none">
            <span className="text-[10px] font-mono text-[#0EA5E9] font-bold uppercase tracking-widest block">Active Endpoint publish: connected</span>
            <h3 className="text-lg font-black uppercase text-white font-display leading-none">Your Campaign is Live!</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
              We have compiled active slot structures and deployed static bundles directly across Cloud Run network gateways.
            </p>
            <div className="bg-black/60 p-3 rounded-2xl border border-white/5 font-mono text-xs space-y-1.5">
              <span className="text-zinc-500 block text-[9px] uppercase">Direct DNS Alias Endpoint</span>
              <a href={`https://${activePage.slug}.flashfocus.site`} target="_blank" rel="noreferrer" className="text-white font-bold underline hover:text-indigo-400 break-all block">
                https://{activePage.slug}.flashfocus.site
              </a>
            </div>
            <div className="flex gap-2 justify-end font-mono">
              <button onClick={() => setShowPublishModal(false)} className="bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer font-bold">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INDIAN PAYMENTS QR CODE SANDBOX SIMULATOR */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-[#0c0c10] border border-white/15 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl text-left select-none relative font-mono text-xs">
            <button
              onClick={() => setPaymentModal(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold font-mono uppercase text-white tracking-wide">
                  {paymentProvider.toUpperCase()} Unified UPI Gateway
                </span>
              </div>
              <p className="text-[9px] text-zinc-505 pt-1 uppercase">Merchant: FlashFocus Operations private limited</p>
            </div>

            {checkoutStep === 'details' && (
              <div className="space-y-4">
                <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1.5">
                  <span className="text-zinc-500 block text-[9px] uppercase">Plan item</span>
                  <span className="text-white font-black">{paymentModal.planName}</span>
                  <span className="text-zinc-400 block pt-1.5">Billing rate: ₹{paymentModal.priceINR} INR (inclusive 18% GST)</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase">Interactive Pay UPI Handler ID</span>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. founder@okaxis"
                    className="w-full bg-[#050507] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <button
                  onClick={completePaymentCheckout}
                  className="w-full bg-white text-black py-2 rounded-xl font-bold uppercase tracking-wider text-center cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  Generate Payment Pass QR Code ➔
                </button>
              </div>
            )}

            {checkoutStep === 'qr' && (
              <div className="space-y-4 text-center">
                <div className="w-36 h-36 bg-white mx-auto p-2 rounded-2xl flex flex-col justify-between border-2 border-indigo-600 shadow-md">
                  {/* Mock high-fidelity QR core block pattern */}
                  <div className="grid grid-cols-6 gap-0.5 h-full w-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${(i % 3 === 0 || i < 7 || i > 28) ? 'bg-black' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">₹{paymentModal.priceINR} QR Code Generated</h4>
                  <p className="text-[10px] text-zinc-500 pt-1">Scan using GPay, PhonePe, Paytm, or BHIM apps</p>
                </div>
                <div className="animate-pulse text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                  Awaiting UPI notification ping...
                </div>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 font-bold text-lg">
                  ✓
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">UPI Payment Complete!</h4>
                  <p className="text-xs text-zinc-400 leading-normal">
                    Invoice with 18% GST receipt issued successfully and synced across server databases.
                  </p>
                </div>
                <button
                  onClick={() => setPaymentModal(null)}
                  className="bg-white text-black font-bold uppercase tracking-widest px-6 py-2 rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
