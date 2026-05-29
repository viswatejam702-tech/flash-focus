import React, { useState } from 'react';
import { 
  Cpu, Sparkles, RefreshCw, 
  AlertTriangle, AlertCircle, CheckCircle2, Info, Check, Eye,
  BookOpen, Layers, Calendar, Rocket, User
} from 'lucide-react';
import { LandingPage, LandingPageSection } from '../types';
import { LandingPageItem } from './LandingPageItem';
import { motion } from 'motion/react';
import { auditLandingPage, SeoIssue } from '../utils/seoAuditor';

// Predefined high-quality AI Prompts library for common use cases
export interface PredefinedPrompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: React.ComponentType<any>;
  tag: string;
  badgeColor: string;
  gradientFrom: string;
}

export const PREDEFINED_PROMPTS: PredefinedPrompt[] = [
  {
    id: 'saas-waitlist',
    name: 'SaaS Waitlist Page',
    description: 'Designed to drive hyper-growth launches with stats counters, countdown ticks, and responsive email lead captures.',
    prompt: "Create a high-converting SaaS waitlist page for 'QuantVibe AI'—a machine learning platform calculating real-time crypto wallet sentiment signals. Use a stunning dark obsidian theme with emerald glow, custom benefit grids, real-time lead counts, and an active signup waitlist widget.",
    icon: Layers,
    tag: 'SaaS & AI',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gradientFrom: 'hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
  },
  {
    id: 'event-registration',
    name: 'Event Registration Page',
    description: 'Perfect for tech summits, custom keynotes, interactive venue maps, and digital tier RSVPs.',
    prompt: "Build an event registration ticket hub for 'Web3 DevSummit Bengaluru 2026'. Embed neon-purple visual gradients, speaker card layouts with avatars, interactive seat remaining meters, professional RSVP lead generation forms, and digital pricing structures.",
    icon: Calendar,
    tag: 'Summit & RSVP',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    gradientFrom: 'hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]'
  },
  {
    id: 'product-launch',
    name: 'Product Launch Page',
    description: 'Maximize e-commerce conversion of single product drops with bullet specs grids and online UPI pay portals.',
    prompt: "Launch a gorgeous single-product drop page presenting 'Apex Chrono Active'—the ultimate rugged kinetic titanium sapphire smartwatch. Style utilizing flat slate obsidian spaces, dynamic orange command buttons, precise product feature listings, and direct UPI QR payments.",
    icon: Rocket,
    tag: 'Hardware Drop',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    gradientFrom: 'hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]'
  },
  {
    id: 'influencer-portfolio',
    name: 'Influencer Portfolio Page',
    description: 'Curate bespoke design packages, private fan vaults, and direct digital credential downloads.',
    prompt: "Create a modern creator portfolio space for 'Kira Design Lab'—a senior UI architect and preset creator. Opt for a beautiful brutalist clay warm sand palette, adding premium download vault links, customer review ratings with Unsplash avatars, and inline product checkouts.",
    icon: User,
    tag: 'Creator Hub',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    gradientFrom: 'hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]'
  }
];

interface AiGenerateViewProps {
  generatorPrompt: string;
  setGeneratorPrompt: (v: string) => void;
  activeSmartTool: string | null;
  setActiveSmartTool: (t: string | null) => void;
  isGenerating: boolean;
  generationStage: number;
  triggerOrbitalGenerationPipeline: () => void;
  selectedSubheadRole: 'saas' | 'events' | 'agencies' | 'creators' | 'ecommerce';
  setSelectedSubheadRole: (v: any) => void;
  viewportMode: 'desktop' | 'mobile';
  setViewportMode: (v: 'desktop' | 'mobile') => void;
  showHeatmap: boolean;
  setShowHeatmap: (v: boolean) => void;
  activePage: LandingPage;
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
  chatHistory: any[];
  assistantText: string;
  setAssistantText: (v: string) => void;
  handleCopilotMessage: (e: React.FormEvent) => void;
  copilotLoading: boolean;
  copilotStatusText: string;
  onLeadSubmit: (ev: { email: string; sectionId: string }) => void;
  onPayTrigger: (planName: string, priceINR: number) => void;
}

export const AiGenerateView: React.FC<AiGenerateViewProps> = ({
  generatorPrompt,
  setGeneratorPrompt,
  activeSmartTool,
  setActiveSmartTool,
  isGenerating,
  generationStage,
  triggerOrbitalGenerationPipeline,
  selectedSubheadRole,
  setSelectedSubheadRole,
  viewportMode,
  setViewportMode,
  showHeatmap,
  setShowHeatmap,
  activePage,
  updateActivePage,
  chatHistory,
  assistantText,
  setAssistantText,
  handleCopilotMessage,
  copilotLoading,
  copilotStatusText,
  onLeadSubmit,
  onPayTrigger
}) => {
  const [heatmapType, setHeatmapType] = useState<'clicks' | 'seo'>('seo');
  const [hoveredIssueId, setHoveredIssueId] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<SeoIssue | null>(null);
  const [showFixSuccess, setShowFixSuccess] = useState<string | null>(null);
  const [fixingIssueId, setFixingIssueId] = useState<string | null>(null);
  const [selectedLibraryPromptId, setSelectedLibraryPromptId] = useState<string | null>(null);
  const [showAppliedAlert, setShowAppliedAlert] = useState<string | null>(null);

  const seoAuditResult = auditLandingPage(activePage);
  return (
    <div className="space-y-6">
      {/* HEADER SECTION WITH ROLE SWITCHING */}
      <div className="text-left space-y-2.5 pb-2">
        <span className="bg-white/5 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-[#FFF] border border-white/10 rounded-full">
          🌌 Orbital Launch Workspace
        </span>
        <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight text-white uppercase select-none mt-2 leading-none">
          Build Your Next <span className="bg-gradient-to-r from-neutral-200 via-white to-zinc-400 bg-clip-text text-transparent">Viral Launch</span> With AI
        </h1>

        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase mr-2">Adaptive Mode:</span>
          {(['saas', 'events', 'agencies', 'creators', 'ecommerce'] as const).map((rl) => (
            <button
              key={rl}
              onClick={() => setSelectedSubheadRole(rl)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer border ${selectedSubheadRole === rl ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-white/10 hover:text-white'}`}
            >
              {rl}
            </button>
          ))}
        </div>

        <motion.p
          key={selectedSubheadRole}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-sans text-zinc-400 leading-relaxed max-w-2xl mt-2 min-h-[35px]"
        >
          {selectedSubheadRole === 'saas' && "⚡ The perfect rocket launchpad for SaaS founders looking to collect 10k waitlist leads on day one through high-contrast component matrices."}
          {selectedSubheadRole === 'events' && "🎫 Instantly deploy tech summits, weddings, private RSVP trackers, and dynamic ticket pass checkouts with inclusive GST taxes."}
          {selectedSubheadRole === 'agencies' && "💼 Pitch client structures, high-density presentation briefs, visual grids, and custom vector graphic backdrops at scale."}
          {selectedSubheadRole === 'creators' && "💎 Create locked fan vaults, download keys, curated design presets, and direct UPI payment options."}
          {selectedSubheadRole === 'ecommerce' && "🛒 Deploy gorgeous targeted single-product drop pages with Indian Razorpay gateways, UPI QR codes, and quick payment loaders."}
        </motion.p>
      </div>

      {/* RICH PROMPT COMPILER PANEL */}
      <div className="bg-[#09090c]/90 border border-white/15 rounded-3xl p-5 text-left space-y-4 shadow-xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">Advanced Prompt Copilot System</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500 uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            <span>A/B active</span>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={generatorPrompt}
            onChange={(e) => setGeneratorPrompt(e.target.value)}
            placeholder="Instruct your creative direction: e.g. 'Build an Apple style landing page introducing micro crypto analytics system with dark neon glow'..."
            rows={2}
            className="w-full bg-[#050507] border border-white/10 rounded-2xl p-4 text-xs font-mono text-white focus:outline-none placeholder-zinc-600 focus:ring-1 focus:ring-zinc-400 leading-relaxed"
          />
          {activeSmartTool && (
            <div className="absolute top-2 right-2 bg-purple-950/90 text-purple-200 text-[9px] font-mono px-2.5 py-1 rounded border border-purple-800 animate-pulse">
              Active Module: {activeSmartTool}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
            <button
              onClick={() => {
                setActiveSmartTool('🎤 Voice Assistant');
                setGeneratorPrompt("Deploy a minimalist dark cybernetic fintech app featuring a countdown subscription block and a direct interactive UPI payment card.");
              }}
              className="px-2.5 py-1.5 hover:bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:text-white"
            >
              🎤 Voice Input
            </button>
            <button
              onClick={() => {
                setActiveSmartTool('📁 PDF Reader');
                setGeneratorPrompt("Construct a luxury real estate waitlist landing page named 'Helix Towers', styled with ivory cream backgrounds and golden typography pairings, including client testimonials.");
              }}
              className="px-2.5 py-1.5 hover:bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:text-white"
            >
              📁 Attach Brief (PDF/TXT)
            </button>
            <button
              onClick={() => {
                setActiveSmartTool('🖼️ UIscreenshot Cloner');
                setGeneratorPrompt("Make an Apple-inspired landing page introducing a physical mechanical timepiece. Contrast colors pure dark slate space grey and silver curves, centering a pricing pass.");
              }}
              className="px-2.5 py-1.5 hover:bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:text-white"
            >
              🖼️ Screenshot Analyzers
            </button>
          </div>

          <div>
            {isGenerating ? (
              <button disabled className="bg-zinc-850 text-zinc-500 px-6 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider animate-pulse uppercase">
                Compiling {Math.floor((generationStage / 6) * 100)}%
              </button>
            ) : (
              <button
                onClick={triggerOrbitalGenerationPipeline}
                className="bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01]"
              >
                Launch Compiler 🚀
              </button>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#a78bfa] shrink-0" />
              Predefined AI Prompts Library
            </span>
            <span className="text-[9.5px] text-zinc-500 font-mono">
              Click template below to instantly load prompt parameters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1.5">
            {PREDEFINED_PROMPTS.map((item) => {
              const IconComp = item.icon;
              const isSelected = selectedLibraryPromptId === item.id;
              const hasAlert = showAppliedAlert === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setGeneratorPrompt(item.prompt);
                    setSelectedLibraryPromptId(item.id);
                    setShowAppliedAlert(item.id);
                    setTimeout(() => {
                      setShowAppliedAlert((curr) => curr === item.id ? null : curr);
                    }, 4000);
                  }}
                  className={`bg-[#050507]/60 border rounded-2xl p-3 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isSelected 
                      ? 'border-[#a78bfa]/50 bg-indigo-950/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] ring-1 ring-[#a78bfa]/30' 
                      : 'border-white/5 hover:border-white/15 hover:bg-white/5'
                  } ${item.gradientFrom}`}
                >
                  {/* Decorative background aura on hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                  <div className="space-y-1.5 w-full">
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[8.5px] font-bold text-emerald-400">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          Applied Preset
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-start gap-2.5 pt-0.5">
                      <span className={`p-1.5 rounded-xl border bg-black/40 ${
                        isSelected ? 'border-[#a78bfa]/20 text-[#a78bfa]' : 'border-white/5 text-zinc-400 group-hover:text-white'
                      }`}>
                        <IconComp className="w-4 h-4 shrink-0" />
                      </span>
                      <div>
                        <h4 className="text-[11.5px] font-extrabold text-white group-hover:text-[#a78bfa] transition-colors leading-none">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notification/Indicator inside card */}
                  {hasAlert && (
                    <div className="mt-2 text-[9px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 rounded-lg px-2 py-1 text-center w-full animate-pulse">
                      ✨ Loaded successfully into Generator input above!
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CORE RENDER SPLIT CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COMPILER DETAILS AND COPILOT PANEL */}
        <div className="lg:col-span-5 flex flex-col space-y-4 text-left">
          
          <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-3">
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Artistic Style Engine</h4>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              {[
                { name: 'Minimal Stark', font: 'sans', bg: '#030303', text: '#FFFFFF', isDark: true },
                { name: 'Cyberpunk Neon', font: 'cyberpunk', bg: '#040d04', text: '#00ff00', isDark: true },
                { name: 'Ice Glassmorphic', font: 'sans', bg: '#101014', text: '#FFFFFF', isDark: true },
                { name: 'Sand Brutalist', font: 'mono', bg: '#f4f4f5', text: '#000000', isDark: false }
              ].map((st) => (
                <button
                  key={st.name}
                  onClick={() => {
                    updateActivePage(curr => ({
                      ...curr,
                      fontFamily: st.font,
                      theme: {
                        ...curr.theme,
                        primary: st.text,
                        background: st.bg,
                        text: st.isDark ? '#FFFFFF' : '#000000',
                        textMuted: st.isDark ? '#94A3B8' : '#4B5563',
                        surface: st.isDark ? '#0E0E14' : '#F4F4F5',
                        isDark: st.isDark
                      }
                    }));
                  }}
                  className="p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-xl cursor-pointer text-zinc-300 transition-colors truncate"
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#09090c]/90 p-5 border border-white/10 rounded-3xl flex-1 flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Copilot logs activity</span>
                <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">{copilotStatusText}</span>
              </div>
              <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1">
                {chatHistory.map((ch, idx) => (
                  <div key={idx} className="text-xs leading-relaxed">
                    <span className="font-bold text-white">{ch.sender === 'user' ? 'You' : 'Copilot'}:</span>{' '}
                    <span className="text-zinc-300 font-sans">{ch.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleCopilotMessage} className="mt-4 flex items-center gap-2 relative border-t border-white/5 pt-3 shrink-0">
              <input
                type="text"
                placeholder="Instruct: e.g. 'Add a countdown section' or 'swap image'"
                value={assistantText}
                onChange={(e) => setAssistantText(e.target.value)}
                className="w-full bg-[#050507] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none pr-12 font-mono"
              />
              <button
                type="submit"
                disabled={copilotLoading}
                className="absolute right-1 text-white hover:text-purple-400 p-1.5 bg-white/5 border border-white/10 rounded-lg cursor-pointer"
              >
                {copilotLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : '▶'}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PREVIEW SCREEN */}
        <div className="lg:col-span-7 flex flex-col space-y-4 text-left">
          
          <div className="flex items-center justify-between bg-black/40 border border-white/5 p-2 rounded-2xl flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">Live preview slot rendering</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setViewportMode(viewportMode === 'desktop' ? 'mobile' : 'desktop')}
                className="text-[9px] bg-white/5 border border-white/15 hover:border-[#FFF] text-zinc-300 px-3 py-1 rounded-lg cursor-pointer font-mono"
              >
                Viewport: {viewportMode.toUpperCase()}
              </button>
              
              <div className="flex border border-white/10 rounded-lg overflow-hidden bg-[#0a0a0c] font-mono text-[9px]">
                <button
                  type="button"
                  onClick={() => {
                    setShowHeatmap(true);
                    setHeatmapType('clicks');
                  }}
                  className={`px-2.5 py-1 transition-all cursor-pointer ${showHeatmap && heatmapType === 'clicks' ? 'bg-red-950/40 text-red-400 font-bold border-r border-red-800/40' : 'text-zinc-400 border-r border-white/5 hover:text-zinc-200'}`}
                >
                  🔥 Clicks Map
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowHeatmap(true);
                    setHeatmapType('seo');
                  }}
                  className={`px-2.5 py-1 transition-all cursor-pointer ${showHeatmap && heatmapType === 'seo' ? 'bg-indigo-950/40 text-[#a78bfa] font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  🔍 SEO Map
                </button>
                {showHeatmap && (
                  <button
                    type="button"
                    onClick={() => setShowHeatmap(false)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/15 text-white border-l border-white/10 font-bold transition-all cursor-pointer font-mono"
                    title="Disable overlay"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick status alerts for Auto-fixes achievements */}
          {showFixSuccess && (
            <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-2xl text-[11px] font-sans flex items-center justify-between shadow-lg animate-fadeIn">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                <span>AI Agent successfully optimized keyword alignments for: <strong>{showFixSuccess}</strong></span>
              </span>
              <button onClick={() => setShowFixSuccess(null)} className="text-emerald-500 hover:text-white font-bold ml-2">✕</button>
            </div>
          )}

          {/* SPLIT COLS VIEW FOR ADAPTIVE SEO SIDE PANEL SCORING */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            <div className={`${showHeatmap && heatmapType === 'seo' ? 'md:col-span-8' : 'md:col-span-12'} flex flex-col space-y-2 transition-all duration-300 w-full`}>
              <div className="border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative min-h-[440px] flex flex-col bg-black">
                <div className="bg-[#09090c] px-4 py-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="truncate max-w-[190px]">https://{activePage.slug}.flashfocus.site</span>
                  <span className="text-zinc-650 font-bold uppercase shrink-0 text-[10px]">{activePage.status}</span>
                </div>

                <div id="preview-scroll-container" className="flex-grow overflow-y-auto p-4 relative" style={{ maxHeight: '430px' }}>
                  
                  {/* CLICK HEATMAP SIMULATOR OVERLAYS */}
                  {showHeatmap && heatmapType === 'clicks' && (
                    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden opacity-90">
                      <div className="absolute top-[15%] left-[30%] w-14 h-14 bg-red-600 rounded-full filter blur-[15px] opacity-80" />
                      <div className="absolute top-[15%] left-[30%] text-[8px] font-mono text-white bg-red-600 px-1 py-0.5 rounded shadow">Hot focus slot (85% Click)</div>
                      
                      <div className="absolute top-[50%] right-[25%] w-10 h-10 bg-yellow-500 rounded-full filter blur-[12px] opacity-70" />
                      <div className="absolute top-[50%] right-[25%] text-[8px] font-mono text-white bg-yellow-600 px-1 py-0.5 rounded shadow">Pass clicks (42%)</div>
                    </div>
                  )}

                  <div
                    className="mx-auto rounded-3xl overflow-hidden border border-white/5 shadow-2xl text-left relative"
                    style={{
                      maxWidth: viewportMode === 'mobile' ? '330px' : '100%',
                      fontFamily:
                        activePage.fontFamily === 'serif' ? 'serif' :
                        activePage.fontFamily === 'mono' ? 'monospace' : 'sans-serif'
                    }}
                  >
                    {activePage.sections.length === 0 ? (
                      <div className="py-24 text-center text-zinc-500 font-mono text-xs">
                        Workspace empty. Set prompt parameters and tap "Launch Compiler" to compile custom segments.
                      </div>
                    ) : (
                      activePage.sections.map((sect) => {
                        const sectionAudit = seoAuditResult.sectionResults.find(r => r.sectionId === sect.id);
                        const sectionIssues = sectionAudit?.issues || [];
                        const hasErrors = sectionIssues.some(i => i.severity === 'error');
                        const hasWarnings = sectionIssues.some(i => i.severity === 'warning');

                        return (
                          <div 
                            key={sect.id} 
                            id={`preview-section-${sect.id}`}
                            className={`relative group/canvas transition-all duration-300 ${
                              showHeatmap && heatmapType === 'seo' 
                              ? 'border-2 border-dashed m-1.5 rounded-2xl overflow-hidden ' + (
                                  hasErrors 
                                    ? 'border-red-500/50 bg-red-950/5 shadow-[0_0_12px_rgba(239,68,68,0.15)]' 
                                    : hasWarnings 
                                      ? 'border-amber-500/50 bg-amber-950/5 shadow-[0_0_12px_rgba(245,158,11,0.15)]' 
                                      : 'border-emerald-500/30 bg-emerald-950/5 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                                )
                              : 'border border-transparent'
                            }`}
                          >
                            
                            {/* FLOATING ACTION OVERLAY INSTANT DESIGN REINITS */}
                            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/canvas:opacity-100 z-50 transition-all bg-black/95 px-2 py-1.5 rounded-lg border border-white/25 flex gap-1 text-[8px] font-mono">
                              <span className="text-zinc-500 uppercase font-bold py-0.5 px-1 shrink-0">AI Regen:</span>
                              <button
                                onClick={() => {
                                  updateActivePage(curr => {
                                    const updated = curr.sections.map(s => {
                                      if (s.id !== sect.id) return s;
                                      return {
                                        ...s,
                                        fields: {
                                          ...s.fields,
                                          headline: (s.fields as any).headline + " (AI Optimized Output)",
                                          badge: "🔥 DYNAMIC RE-COMPILE"
                                        }
                                      } as any;
                                    });
                                    return { ...curr, sections: updated };
                                  });
                                }}
                                className="bg-white text-black hover:bg-zinc-200 px-1.5 py-0.5 rounded uppercase font-bold cursor-pointer"
                              >
                                Headline
                              </button>
                            </div>

                            {/* SEO INTERACTIVE HOTSPOTS RING OVERLAYS */}
                            {showHeatmap && heatmapType === 'seo' && sectionIssues.length > 0 && (
                              <div className="absolute inset-0 z-30 pointer-events-none">
                                {sectionIssues.map((issue) => {
                                  const isHovered = hoveredIssueId === issue.id;
                                  const isSelected = selectedIssue?.id === issue.id;
                                  const bulletColor = 
                                    issue.severity === 'error' 
                                      ? 'bg-red-500 border-red-300 shadow-red-500/50' 
                                      : issue.severity === 'warning'
                                        ? 'bg-amber-500 border-amber-300 shadow-amber-500/50'
                                        : 'bg-cyan-500 border-cyan-300 shadow-cyan-500/50';

                                  return (
                                    <div
                                      key={issue.id}
                                      className="absolute pointer-events-auto"
                                      style={{
                                        left: `${issue.hotspotXY.x}%`,
                                        top: `${issue.hotspotXY.y}%`,
                                      }}
                                    >
                                      {/* Glowing pulsation backring */}
                                      <span className={`absolute inline-flex h-6 w-6 -left-3 -top-3 rounded-full opacity-75 animate-ping ${
                                        issue.severity === 'error' ? 'bg-red-500/40' : issue.severity === 'warning' ? 'bg-amber-500/40' : 'bg-cyan-500/40'
                                      }`} />
                                      
                                      <button
                                        type="button"
                                        onMouseEnter={() => setHoveredIssueId(issue.id)}
                                        onMouseLeave={() => setHoveredIssueId(null)}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedIssue(selectedIssue?.id === issue.id ? null : issue);
                                        }}
                                        className={`relative z-40 rounded-full w-4.5 h-4.5 border text-[9px] font-mono font-bold text-white flex items-center justify-center cursor-pointer shadow-xl outline-none transition-transform ${bulletColor} ${
                                          isHovered || isSelected ? 'scale-125 ring-2 ring-white/30' : 'scale-100 hover:scale-110'
                                        }`}
                                      >
                                        !
                                      </button>

                                      {/* Interactive detail card anchored on hotspot */}
                                      {(isHovered || isSelected) && (
                                        <div 
                                          className="absolute z-50 bg-zinc-950 text-white p-3 rounded-2xl border border-white/10 w-48 text-[9.5px] pointer-events-auto shadow-2xl space-y-1.5 text-left font-sans"
                                          style={{
                                            left: issue.hotspotXY.x > 50 ? '-195px' : '15px',
                                            top: issue.hotspotXY.y > 60 ? '-95px' : '10px'
                                          }}
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className={`font-mono text-[7.5px] uppercase font-extrabold ${
                                              issue.severity === 'error' ? 'text-red-400' : issue.severity === 'warning' ? 'text-amber-400' : 'text-cyan-400'
                                            }`}>
                                              [{issue.category.toUpperCase()}]
                                            </span>
                                            <span className="text-[7.5px] text-zinc-500 uppercase">{issue.elementLabel}</span>
                                          </div>
                                          <h5 className="font-bold text-zinc-100 leading-tight">{issue.title}</h5>
                                          <p className="text-zinc-400 leading-normal font-light">{issue.description}</p>
                                          <div className="text-[9px] text-indigo-300 italic">➔ {issue.suggestedAction}</div>
                                          
                                          {issue.canAutoFix && (
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateActivePage(curr => {
                                                  const updated = curr.sections.map(s => {
                                                    if (s.id !== sect.id) return s;
                                                    return issue.autoFixAction(s, curr.name);
                                                  });
                                                  return { ...curr, sections: updated };
                                                });
                                                setShowFixSuccess(issue.title);
                                                setSelectedIssue(null);
                                                setTimeout(() => setShowFixSuccess(null), 3500);
                                              }}
                                              className="w-full bg-white text-black hover:bg-zinc-200 py-1 mt-2 rounded-lg text-[8px] font-mono font-bold uppercase cursor-pointer text-center"
                                            >
                                              ⚡ AI Auto-Fix
                                            </button>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            <LandingPageItem
                              section={sect}
                              theme={activePage.theme}
                              fontFamily={activePage.fontFamily}
                              onLeadSubmit={onLeadSubmit}
                              onPayTrigger={(pName, prc) => onPayTrigger(pName, prc)}
                              showHeatmap={showHeatmap}
                              heatmapType={heatmapType}
                              seoIssues={sectionIssues}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR AUDITOR CHIP REPORT CARD */}
            {showHeatmap && heatmapType === 'seo' && (
              <div className="md:col-span-4 bg-[#09090c]/90 border border-white/10 rounded-3xl p-4 flex flex-col text-left space-y-4 shadow-xl max-h-[480px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <h4 className="text-xs font-bold font-mono text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    SEO Audit Feed
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">Live index</span>
                </div>

                {/* Score Dial Arc */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center space-y-1 relative">
                  <div className="text-[26px] font-black font-display text-white tracking-tighter leading-none">
                    {seoAuditResult.overallScore}<span className="text-zinc-650 text-sm font-normal">/100</span>
                  </div>
                  <div className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-500">Global Search Performance Score</div>
                  
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        seoAuditResult.overallScore >= 80 
                          ? 'bg-emerald-400' 
                          : seoAuditResult.overallScore >= 50 
                            ? 'bg-amber-400' 
                            : 'bg-red-400'
                      }`} 
                      style={{ width: `${seoAuditResult.overallScore}%` }}
                    />
                  </div>
                  
                  <p className="text-[9.5px] text-zinc-400 leading-normal pt-1 text-center font-sans">
                    {seoAuditResult.overallScore >= 80 
                      ? "✨ Excellent structural architecture. SEO indexing eligibility is optimal." 
                      : seoAuditResult.overallScore >= 50
                        ? "⚠️ Mild issues detected. Crawlers may experience partial limits."
                        : "❌ Immediate optimization needed! High threat of search penalties."}
                  </p>
                </div>

                {/* Counters badges */}
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
                  <div className="bg-red-950/30 border border-red-800/20 rounded-xl p-1.5 text-red-400 flex flex-col justify-center">
                    <span className="text-xs font-bold font-sans">{seoAuditResult.totalErrors}</span>
                    <span className="text-[7.5px] uppercase text-red-500">Errors</span>
                  </div>
                  <div className="bg-amber-950/30 border border-amber-800/20 rounded-xl p-1.5 text-amber-400 flex flex-col justify-center">
                    <span className="text-xs font-bold font-sans">{seoAuditResult.totalWarnings}</span>
                    <span className="text-[7.5px] uppercase text-amber-500">Warnings</span>
                  </div>
                  <div className="bg-cyan-950/30 border border-cyan-800/20 rounded-xl p-1.5 text-cyan-400 flex flex-col justify-center">
                    <span className="text-xs font-bold font-sans">{seoAuditResult.totalInfos}</span>
                    <span className="text-[7.5px] uppercase text-cyan-500">Infos</span>
                  </div>
                </div>

                {/* Issues mapped scroll list */}
                <div className="space-y-3 pt-1">
                  <div className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Identified Audit Threats:</div>
                  
                  {seoAuditResult.sectionResults.every(r => r.issues.length === 0) ? (
                    <div className="bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-2xl text-center space-y-1.5 text-emerald-400">
                      <div className="text-xs font-bold">💎 No Faults Found!</div>
                      <p className="text-[9px] text-zinc-400 leading-relaxed font-sans">This layout matches modern UX standards. Proceed with deployment!</p>
                    </div>
                  ) : (
                    seoAuditResult.sectionResults.map((sectRes) => {
                      if (sectRes.issues.length === 0) return null;
                      return (
                        <div key={sectRes.sectionId} className="space-y-1 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                          <span className="text-[8px] uppercase font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded-md block w-fit leading-none mb-1.5">
                            {sectRes.sectionTitle}
                          </span>
                          <div className="space-y-1.5">
                            {sectRes.issues.map((issue) => {
                              const isHovered = hoveredIssueId === issue.id;
                              const isSelected = selectedIssue?.id === issue.id;
                              return (
                                <div
                                  key={issue.id}
                                  onClick={() => {
                                    setSelectedIssue(selectedIssue?.id === issue.id ? null : issue);
                                    // Scroll context block to view
                                    const el = document.getElementById(`preview-section-${sectRes.sectionId}`);
                                    if (el) {
                                      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    }
                                  }}
                                  onMouseEnter={() => setHoveredIssueId(issue.id)}
                                  onMouseLeave={() => setHoveredIssueId(null)}
                                  className={`w-full text-left p-2 rounded-xl border text-[10.5px] font-sans transition-all flex select-none cursor-pointer ${
                                    isHovered || isSelected
                                      ? 'bg-indigo-950/40 border-indigo-500/50 text-white ring-1 ring-indigo-500/20' 
                                      : 'bg-black/30 border-white/5 hover:border-white/10 hover:bg-black/40 text-zinc-300'
                                  }`}
                                >
                                  <div className="w-full space-y-1 leading-normal">
                                    <div className="flex items-start justify-between gap-1">
                                      <span className="font-bold text-zinc-200">
                                        {issue.severity === 'error' && <span className="text-red-500 mr-1">●</span>}
                                        {issue.severity === 'warning' && <span className="text-amber-500 mr-1">●</span>}
                                        {issue.severity === 'info' && <span className="text-cyan-500 mr-1">●</span>}
                                        {issue.title}
                                      </span>
                                    </div>
                                    <p className="text-[9.5px] text-zinc-500 font-light leading-relaxed">
                                      {issue.description}
                                    </p>
                                    {isSelected && (
                                      <div className="pt-1.5 mt-1 border-t border-white/5 space-y-1.5 bg-black/40 p-1.5 rounded-lg animate-fadeIn">
                                        <div className="text-[9.5px] text-[#C084FC]">
                                          <strong className="text-emerald-400 font-medium">Suggestion:</strong> {issue.suggestedAction}
                                        </div>
                                        {issue.canAutoFix && (
                                          <button
                                            type="button"
                                            disabled={fixingIssueId === issue.id}
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              setFixingIssueId(issue.id);
                                              try {
                                                const resp = await fetch('/api/seo/autofix', {
                                                  method: 'POST',
                                                  headers: { 'Content-Type': 'application/json' },
                                                  body: JSON.stringify({
                                                    section: activePage.sections.find(s => s.id === sectRes.sectionId),
                                                    issue: issue,
                                                    keywords: activePage.seo?.keywords || activePage.name,
                                                    brandName: activePage.name,
                                                    purpose: activePage.seo?.pagePurpose || activePage.name
                                                  })
                                                });

                                                if (!resp.ok) {
                                                  throw new Error('Key missing or network error');
                                                }

                                                const data = await resp.json();
                                                if (data.fields) {
                                                  updateActivePage(curr => {
                                                    const updated = curr.sections.map(s => {
                                                      if (s.id !== sectRes.sectionId) return s;
                                                      return { ...s, fields: data.fields };
                                                    });
                                                    return { ...curr, sections: updated };
                                                  });
                                                  setShowFixSuccess(`AI Fixed: ${issue.title}`);
                                                } else {
                                                  throw new Error('Invalid JSON format');
                                                }
                                              } catch (err: any) {
                                                console.warn('AI background fix failed, running offline fallback:', err);
                                                updateActivePage(curr => {
                                                  const updated = curr.sections.map(s => {
                                                    if (s.id !== sectRes.sectionId) return s;
                                                    return issue.autoFixAction(s, curr.name);
                                                  });
                                                  return { ...curr, sections: updated };
                                                });
                                                setShowFixSuccess(issue.title);
                                              } finally {
                                                setFixingIssueId(null);
                                                setSelectedIssue(null);
                                                setTimeout(() => setShowFixSuccess(null), 3500);
                                              }
                                            }}
                                            className="w-full bg-white hover:bg-zinc-200 text-black py-1 rounded border border-white/10 text-[8.5px] font-mono font-extrabold uppercase transition-all text-center flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
                                          >
                                            {fixingIssueId === issue.id ? (
                                              <span>⚡ AI Copywriting...</span>
                                            ) : (
                                              <span>⚡ Quick AI Auto-Fix</span>
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

          </div>


          {generationStage > 0 && (
            <div className="bg-purple-950/25 text-purple-200 border border-purple-800/60 rounded-3xl p-5 text-xs font-mono text-left space-y-2 relative shadow-inner">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Live compiling sequence...</span>
              <div className="space-y-1.5">
                {[
                  "Analyzing brand niches & competitor demographics",
                  "Formulating cohesive palette harmonies & font grids",
                  "Structuring conversion copyright headers",
                  "Organizing visual grid component frames",
                  "Injecting inclusive GST calculation models",
                  "Optimizing core Speed Index analytics parameters"
                ].map((st, idx) => (
                  <div key={idx} className={`flex items-center gap-2 ${generationStage > idx ? 'text-emerald-400 font-bold' : generationStage === idx + 1 ? 'text-white font-black animate-pulse' : 'text-zinc-650'}`}>
                    <span>{generationStage > idx ? '✓' : generationStage === idx + 1 ? '⚡' : '●'}</span>
                    <span>Step {idx + 1}: {st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
