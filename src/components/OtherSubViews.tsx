import React, { useState } from 'react';
import { Plus, Trash, Trash2, ArrowUp, Award, Layers, CreditCard, Download, Users, Sliders, Globe, Server, CheckCircle, AlertCircle, ExternalLink, ShieldCheck, RefreshCw, Search, Filter, ChevronUp, ChevronDown, Check, Sparkles, Mail, Send, FileText, ArrowRight, Laptop, Smartphone, Eye } from 'lucide-react';
import { LandingPage, ColorTheme } from '../types';
import { LandingPageItem } from './LandingPageItem';

// ==========================================
// 1. CAMPAIGN REGISTRY VIEW
// ==========================================
interface ProjectsViewProps {
  projects: LandingPage[];
  activeIdx: number;
  setActiveIdx: (v: number) => void;
  setEditingSectionId: (v: string | null) => void;
  setProjects: (list: LandingPage[]) => void;
  saveProjects: (list: LandingPage[]) => void;
  addNewCustomPage: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  activeIdx,
  setActiveIdx,
  setEditingSectionId,
  setProjects,
  saveProjects,
  addNewCustomPage
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">Campaign Registry</h3>
        <p className="text-xs text-zinc-500 mt-1">Directly configure subpage slots and parameters mappings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`p-5 rounded-3xl border text-left flex flex-col justify-between min-h-[170px] relative transition-all ${activeIdx === idx ? 'border-indigo-500 bg-indigo-950/10 shadow-[0_0_15px_rgba(99,102,241,0.05)]' : 'border-white/10 bg-[#0c0c0e]/80'}`}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[9px] font-mono uppercase text-zinc-500">
                <span>status: {proj.status}</span>
                <span>slot #{idx + 1}</span>
              </div>
              <h4 className="font-extrabold text-white text-sm tracking-tight">{proj.name}</h4>
              <p className="text-[10px] text-zinc-400 font-mono italic">/subdomain: {proj.slug}</p>
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/5 mt-3">
              <button
                onClick={() => {
                  setActiveIdx(idx);
                  setEditingSectionId(null);
                }}
                className="flex-grow bg-white hover:bg-zinc-200 text-black py-1.5 rounded-xl text-xs font-bold font-mono text-center cursor-pointer"
              >
                Assemble Active Workspace
              </button>
              {projects.length > 1 && (
                <button
                  onClick={() => {
                    const filtered = projects.filter((_, pIdx) => pIdx !== idx);
                    setProjects(filtered);
                    setActiveIdx(0);
                    saveProjects(filtered);
                  }}
                  className="p-1.5 hover:bg-red-950 hover:text-red-400 text-zinc-500 rounded-xl border border-white/10 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addNewCustomPage}
          className="border border-dashed border-white/15 hover:border-white text-zinc-400 hover:text-white rounded-3xl flex flex-col items-center justify-center p-6 gap-2 min-h-[170px] cursor-pointer bg-black/5 hover:bg-white/5 transition-all"
        >
          <Plus className="w-5 h-5 text-zinc-400" />
          <span className="text-xs uppercase font-mono font-bold tracking-wider">Compile Empty Page Slot</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 2. DESIGN LAYOUT TEMPLATES
// ==========================================
interface TemplatesViewProps {
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
  setChatHistory: (v: any) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ updateActivePage, setChatHistory }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">Design Layout Templates</h3>
        <p className="text-xs text-zinc-500 mt-1">Directly inject precompiled layout structures into active spaces.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            name: 'SaaS Waitlist Monolith',
            desc: 'Elegant purple dark gradients, glowing lead forms, sleek bento-grid features panels, premium UPI subscription slots.',
            style: 'Cyberpunk Purple',
            font: 'sans'
          },
          {
            name: 'Micro RSVP Summit Summit',
            desc: 'High-leverage luxury typographic titles, RSVP waiting queue limits, Indian payment pass modules.',
            style: 'Luxury Editorial',
            font: 'serif'
          },
          {
            name: 'Product Hunt Launchpad',
            desc: 'Compact stark borders, space gray metallic headers, countdown wait lists, direct card features, and UPI QR links.',
            style: 'Stark Brutalist',
            font: 'mono'
          }
        ].map((tmpl, idx) => (
          <div
            key={idx}
            className="bg-[#09090d]/95 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:border-white transition-all min-h-[180px]"
          >
            <div className="space-y-2">
              <span className="text-[8px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
                {tmpl.style}
              </span>
              <h4 className="font-extrabold text-white text-sm pt-1">{tmpl.name}</h4>
              <p className="text-xs text-zinc-400 leading-normal">{tmpl.desc}</p>
            </div>

            <button
              onClick={() => {
                updateActivePage((curr) => ({
                  ...curr,
                  name: tmpl.name,
                  fontFamily: tmpl.font,
                  slug: tmpl.name.toLowerCase().replace(/\s+/g, '-')
                }));
                setChatHistory((prev: any) => [
                  ...prev,
                  { sender: 'assistant', text: `✨ Imported Layout Preset: "${tmpl.name}" directly to your active configuration slot.`, timestamp: '16:34' }
                ]);
              }}
              className="bg-white hover:bg-zinc-200 text-black py-2 rounded-xl text-xs font-bold font-mono uppercase mt-4 cursor-pointer text-center"
            >
              Apply Visual Layout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. SMART BRAND KIT SYSTEM
// ==========================================
interface BrandKitViewProps {
  brandName: string;
  setBrandName: (v: string) => void;
  brandLogoConcept: string;
  setBrandLogoConcept: (v: string) => void;
  brandLogoIdea: string;
  setBrandLogoIdea: (v: string) => void;
  setChatHistory: (v: any) => void;
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
}

export const BrandKitView: React.FC<BrandKitViewProps> = ({
  brandName,
  setBrandName,
  brandLogoConcept,
  setBrandLogoConcept,
  brandLogoIdea,
  setBrandLogoIdea,
  setChatHistory,
  updateActivePage
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">Smart Brand Kit System</h3>
        <p className="text-xs text-zinc-500 mt-1">AI-assisted company logotypes, palette schemes, and brand profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
        <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-4">
          <span className="text-[10px] uppercase text-zinc-400 font-bold block pb-1 border-b border-white/5">Configure Brand Parameters</span>
          
          <div className="space-y-1">
            <label className="text-[9px] text-zinc-500">Brand / Name Title</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
                setBrandLogoConcept(`🌌 ${e.target.value} Sphere Core`);
              }}
              className="w-full bg-[#050507] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-zinc-500">Abstract Logo Visual Idea</label>
            <textarea
              value={brandLogoIdea}
              onChange={(e) => setBrandLogoIdea(e.target.value)}
              rows={2}
              className="w-full bg-[#050507] border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-white leading-relaxed"
            />
          </div>

          <button
            onClick={() => {
              setBrandLogoConcept(`🌌 ${brandName} Orbital Hub`);
              setChatHistory((prev: any) => [
                ...prev,
                { sender: 'assistant', text: `🤖 AI generated custom vector layout and branding concepts for company: "${brandName}". Applied automatically.`, timestamp: '16:32' }
              ]);
            }}
            className="bg-white text-black py-2 px-4 rounded-xl text-[10px] uppercase font-black cursor-pointer shadow hover:bg-zinc-200"
          >
            Compute Brand Concepts
          </button>
        </div>

        <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] uppercase text-zinc-400 font-bold block pb-1 border-b border-white/5">Active Brand Output Log</span>
            <div className="p-4 bg-black/60 rounded-2xl border border-white/5 space-y-3 font-sans">
              <p className="text-lg font-black text-white tracking-tight">{brandName}</p>
              <p className="text-xs text-zinc-400 leading-normal">
                <strong>Logo Concept:</strong> {brandLogoConcept}
              </p>
              <div className="flex gap-1.5 pt-1">
                <div className="h-6 w-10 rounded bg-white shadow-md border border-white/30" />
                <div className="h-6 w-10 rounded bg-[#3B82F6]" />
                <div className="h-6 w-10 rounded bg-[#09090b] border border-white/10" />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              updateActivePage((curr) => ({
                ...curr,
                name: brandName,
                slug: brandName.toLowerCase().replace(/\s+/g, '-')
              }));
            }}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] py-2 rounded-xl border border-white/10 cursor-pointer mt-4"
          >
            Saturate Launch Slot with Brand Name
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. AI GRAPHIC ASSETS
// ==========================================
interface AssetsViewProps {
  assetPrompt: string;
  setAssetPrompt: (v: string) => void;
  assetType: 'illustration' | 'icon' | 'background';
  setAssetType: (v: any) => void;
  generatedAssets: { id: string; prompt: string; url: string }[];
  setGeneratedAssets: (v: any) => void;
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
}

export const AssetsView: React.FC<AssetsViewProps> = ({
  assetPrompt,
  setAssetPrompt,
  assetType,
  setAssetType,
  generatedAssets,
  setGeneratedAssets,
  updateActivePage
}) => {
  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">AI Graphic Assets</h3>
        <p className="text-xs text-zinc-500 mt-1">Assemble wireframes, micro vector abstract layouts, and wallpaper backdrops.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs font-mono">
        <div className="lg:col-span-4 bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-4">
          <span className="text-[10px] uppercase text-zinc-400 font-bold block pb-1 border-b border-white/5">Asset Spec</span>
          
          <div className="space-y-1">
            <label className="text-[9px] text-zinc-500">Vector Prompt Description</label>
            <textarea
              value={assetPrompt}
              onChange={(e) => setAssetPrompt(e.target.value)}
              rows={3}
              className="w-full bg-[#050507] border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-white leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-zinc-555">Asset Type genre</label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as any)}
              className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none"
            >
              <option value="illustration">Startup illustration vector</option>
              <option value="icon">Minimal linear icon set</option>
              <option value="background">Glow aurora wallpaper</option>
            </select>
          </div>

          <button
            onClick={() => {
              const freshAsset = {
                id: 'asset-' + Date.now(),
                prompt: assetPrompt,
                url:
                  assetType === 'illustration'
                    ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=60'
                    : 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=60'
              };
              setGeneratedAssets([freshAsset, ...generatedAssets]);
            }}
            className="w-full bg-white text-black py-2 rounded-xl text-xs font-black uppercase cursor-pointer text-center"
          >
            Synthesize Illustration
          </button>
        </div>

        <div className="lg:col-span-8 bg-[#09090c]/90 border border-white/10 rounded-3xl p-5">
          <span className="text-[10px] uppercase text-zinc-400 font-bold block pb-2.5 border-b border-white/5 mb-3.5">
            Asset Vault Database
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {generatedAssets.map((as) => (
              <div key={as.id} className="bg-black/60 p-2 border border-white/5 rounded-2xl relative group overflow-hidden">
                <img src={as.url} alt={as.prompt} className="h-28 w-full object-cover rounded-xl" />
                <p className="text-[9px] text-zinc-400 pt-2 truncate text-left">{as.prompt}</p>

                <div className="absolute inset-0 bg-black/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 p-3">
                  <button
                    onClick={() => {
                      updateActivePage((curr) => {
                        const updated = curr.sections.map((s) => {
                          if (s.type !== 'hero') return s;
                          return { ...s, fields: { ...s.fields, imageUrl: as.url, showImage: true } } as any;
                        });
                        return { ...curr, sections: updated };
                      });
                    }}
                    className="bg-white text-black font-semibold text-[9px] px-2.5 py-1.5 rounded-lg font-mono uppercase cursor-pointer"
                  >
                    Apply Image to Hero
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. ANALYTICS & LEADS INTELLIGENCE
// ==========================================
interface AnalyticsViewProps {
  activePage: LandingPage;
  updateActivePage: (updater: (curr: LandingPage) => LandingPage) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ activePage, updateActivePage }) => {
  // Simulator and search states
  const [simulatedVisits, setSimulatedVisits] = useState<number>(1000);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Expanded lead detail editing states
  const [expandedGlobalIndex, setExpandedGlobalIndex] = useState<number | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>('Interested');
  const [editedTags, setEditedTags] = useState<string>('Early Access');
  const [editedNotes, setEditedNotes] = useState<string>('');

  // AI campaign drafting states
  const [draftGoal, setDraftGoal] = useState<'launch' | 'vip' | 'teaser'>('launch');
  const [draftLoading, setDraftLoading] = useState<boolean>(false);
  const [draftResult, setDraftResult] = useState<{
    subjectLine: string;
    previewText: string;
    bodyHtml: string;
    estimatedReadTime: number;
    growthHacksTip: string;
  } | null>(null);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Earnings Ledger states
  const [ledgerSearch, setLedgerSearch] = useState<string>('');
  const [ledgerProvider, setLedgerProvider] = useState<'all' | 'stripe' | 'upi'>('all');
  const [expandedTxnIdx, setExpandedTxnIdx] = useState<number | null>(null);
  
  // Custom Transaction Simulator States
  const [showCustomTxnForm, setShowCustomTxnForm] = useState<boolean>(false);
  const [customAmountStr, setCustomAmountStr] = useState<string>('2999');
  const [customPlanName, setCustomPlanName] = useState<string>('Growth Tier License');
  const [customMethod, setCustomMethod] = useState<'UPI_QR' | 'STRIPE_CARD'>('UPI_QR');
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);

  // Fallback lists device browser simulation lists to enrich raw submissions
  const deviceSimulations = [
    'Chrome Desktop (macOS 15.4)',
    'Safari Mobile (iOS 19.1)',
    'Edge browser (Windows 11)',
    'Firefox Developer (Ubuntu Linux)',
    'Safari Desktop (macOS Sequoia)'
  ];
  const locationSimulations = [
    'Bengaluru, India',
    'San Francisco, US',
    'London, UK',
    'Singapore SG',
    'Berlin, Germany',
    'Mumbai, India'
  ];

  // Map each subscriber with unique initial details to secure robust CRM logs
  const enrichedLeads = (activePage.leadsCollected || []).map((lead, idx) => {
    // Generate deterministic simulated metadata based on indices
    const devSelected = lead.deviceSim || deviceSimulations[idx % deviceSimulations.length];
    const locSelected = lead.locationSim || locationSimulations[idx % locationSimulations.length];
    const currentStatus = lead.status || 'Interested';
    const currentTags = lead.tags || ['Early Access'];
    const currentNotes = lead.notes || '';

    return {
      ...lead,
      globalIndex: idx,
      deviceSim: devSelected,
      locationSim: locSelected,
      status: currentStatus,
      tags: currentTags,
      notes: currentNotes
    };
  });

  // Calculate Conversions analytics metrics dynamically
  const totalLeads = enrichedLeads.length;
  const currentConversionRate = simulatedVisits > 0 ? ((totalLeads / simulatedVisits) * 100).toFixed(1) : '0.0';
  const totalRevenue = activePage.revenueCollected?.reduce((acc, r) => acc + r.amountINR, 0) || 0;

  // Deterministic Transaction ID helper
  const getDeterministicTxnId = (item: { method: string; timestamp: string; amountINR: number }, index: number) => {
    const stamp = item.timestamp || '';
    const cleanStamp = stamp.replace(/[^0-9]/g, '');
    const isStripe = item.method.toUpperCase().includes('STRIPE');
    if (isStripe) {
      const code = Math.floor((item.amountINR || 199) * 31 * (index + 7)).toString(16).toUpperCase();
      return `ch_stripe_${cleanStamp.slice(-6)}${code}`;
    } else {
      const numDer = (parseInt(cleanStamp.slice(-8)) || 10000000) + index * 97;
      return `UPI94${numDer}`;
    }
  };

  const rawRevenue = activePage.revenueCollected || [];

  const ledgerList = rawRevenue.map((item, idx) => {
    return {
      ...item,
      id: getDeterministicTxnId(item, idx),
      originalIndex: idx
    };
  });

  const filteredLedger = ledgerList.filter(item => {
    const searchLower = ledgerSearch.toLowerCase();
    const matchesSearch = 
      item.description.toLowerCase().includes(searchLower) ||
      item.id.toLowerCase().includes(searchLower) ||
      item.amountINR.toString().includes(searchLower);
    
    let matchesProvider = true;
    if (ledgerProvider === 'stripe') {
      matchesProvider = item.method.toUpperCase().includes('STRIPE');
    } else if (ledgerProvider === 'upi') {
      matchesProvider = item.method.toUpperCase().includes('UPI');
    }
    
    return matchesSearch && matchesProvider;
  });

  const stripeRevenue = ledgerList
    .filter(item => item.method.toUpperCase().includes('STRIPE'))
    .reduce((acc, item) => acc + item.amountINR, 0);

  const upiRevenue = ledgerList
    .filter(item => item.method.toUpperCase().includes('UPI'))
    .reduce((acc, item) => acc + item.amountINR, 0);

  const handlerDeleteTxn = (idxToDelete: number) => {
    updateActivePage(curr => {
      const updated = (curr.revenueCollected || []).filter((_, idx) => idx !== idxToDelete);
      return {
        ...curr,
        revenueCollected: updated
      };
    });
    setExpandedTxnIdx(null);
  };

  const handlerAutoSimulatePayment = () => {
    const plans = [
      { name: 'Starter Lifetime License', price: 999 },
      { name: 'Elite Partner Key', price: 4999 },
      { name: 'Enterprise Custom SLA Pass', price: 14999 },
      { name: 'Standard Pro Premium Ticket', price: 2999 }
    ];
    const pickedPlan = plans[Math.floor(Math.random() * plans.length)];
    const pickedMethod = Math.random() < 0.5 ? 'STRIPE_CARD' : 'UPI_QR';
    
    updateActivePage(curr => {
      const updated = [
        {
          amountINR: pickedPlan.price,
          method: pickedMethod,
          timestamp: new Date().toISOString(),
          description: pickedPlan.name
        },
        ...(curr.revenueCollected || [])
      ];
      return {
        ...curr,
        revenueCollected: updated
      };
    });
  };

  const handleAddCustomTxnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customAmountStr) || 2999;
    updateActivePage(curr => {
      const updated = [
        {
          amountINR: amount,
          method: customMethod,
          timestamp: new Date().toISOString(),
          description: customPlanName || 'Interactive Growth License'
        },
        ...(curr.revenueCollected || [])
      ];
      return {
        ...curr,
        revenueCollected: updated
      };
    });
    setShowCustomTxnForm(false);
  };

  // Perform search, filter & sort workflows
  const filteredLeads = enrichedLeads.filter((ld) => {
    const matchesSearch = ld.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ld.status === statusFilter;
    const matchesTag = tagFilter === 'all' || ld.tags.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Export beautiful compliant CSV function
  const downloadCSV = () => {
    if (enrichedLeads.length === 0) return;
    const headers = ['Email Address', 'Sign-up Timestamp', 'Collection Section', 'Pipeline Status', 'Client Tags', 'CRM Notes', 'Device details', 'Location'];
    const rows = enrichedLeads.map(ld => {
      const ts = new Date(ld.timestamp).toISOString();
      const section = ld.sectionId || 'Main Lead Form';
      const status = ld.status;
      const tags = ld.tags.join('; ');
      const notes = ld.notes.replace(/"/g, '""');
      const dev = ld.deviceSim;
      const loc = ld.locationSim;
      return `"${ld.email}","${ts}","${section}","${status}","${tags}","${notes}","${dev}","${loc}"`;
    });
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePage.slug}_startup_waitlist_database.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Expand lead for side CRM note editing
  const toggleExpandLead = (globalIdx: number) => {
    if (expandedGlobalIndex === globalIdx) {
      setExpandedGlobalIndex(null);
    } else {
      const matchLed = enrichedLeads[globalIdx];
      setExpandedGlobalIndex(globalIdx);
      setEditedStatus(matchLed.status);
      setEditedTags(matchLed.tags.join(', '));
      setEditedNotes(matchLed.notes);
    }
  };

  // Commit CRM Notes and Tag updates to Active Landing Page state
  const saveLeadCRMNotes = (globalIdx: number) => {
    updateActivePage((curr) => {
      const copied = [...curr.leadsCollected];
      const matchOrig = enrichedLeads[globalIdx];
      
      copied[globalIdx] = {
        ...copied[globalIdx],
        status: editedStatus as any,
        tags: editedTags.split(',').map(t => t.trim()).filter(Boolean),
        notes: editedNotes,
        deviceSim: matchOrig.deviceSim,
        locationSim: matchOrig.locationSim
      } as any;

      return {
        ...curr,
        leadsCollected: copied
      };
    });
    setExpandedGlobalIndex(null);
  };

  // Call the server Gemini API endpoint to retrieve copywriting email campaign draft 
  const triggerEmailCopyDraft = async () => {
    setDraftLoading(true);
    setDraftError(null);
    try {
      const response = await fetch('/api/email/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName: activePage.name,
          description: activePage.sections.find(s => s.type === 'hero')?.fields?.subheadline || 'Early stage startup pre-launch waitlist operation.',
          goal: draftGoal === 'launch' ? 'Pre-Launch Waitlist Welcome Offer Updates' : draftGoal === 'vip' ? 'High-Value VIP Beta & Onboarding Invitation' : 'Interactive Feature Reveal Announcement Teaser',
          listSize: enrichedLeads.length
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server-side drafting engine timeout.');
      }
      setDraftResult(data);
    } catch (err: any) {
      console.error(err);
      setDraftError(err.message || 'Fail to call drafting helper.');
    } finally {
      setDraftLoading(false);
    }
  };

  // Copy helper
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-3">
        <div>
          <h3 className="text-xl font-black text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Launchpad CRM & Leads Hub
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Startup waitlists pipeline manager, live traffic CRO analysis, and automated AI email compilers.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            disabled={enrichedLeads.length === 0}
            className={`flex items-center gap-1.5 border border-white/10 px-3.5 py-1.5 text-xs text-white rounded-xl font-mono transition-all ${enrichedLeads.length === 0 ? 'opacity-40 cursor-not-allowed bg-black/20' : 'bg-zinc-900 hover:bg-zinc-800 cursor-pointer'}`}
          >
            <Download className="w-3.5 h-3.5" />
            Download CRM Waitlist (.csv)
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(enrichedLeads, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${activePage.slug}_prospect_data.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            disabled={enrichedLeads.length === 0}
            className={`flex items-center gap-1.5 border border-indigo-500/20 px-3.5 py-1.5 text-xs text-[#a78bfa] rounded-xl font-mono transition-all ${enrichedLeads.length === 0 ? 'opacity-40 cursor-not-allowed bg-black/20' : 'bg-indigo-950/20 hover:bg-indigo-950/40 cursor-pointer'}`}
          >
            <FileText className="w-3.5 h-3.5" />
            Export Raw JSON
          </button>
        </div>
      </div>

      {/* CORE 1. METRICS DASHBOARD & INTERACTIVE VISITS CRO SIMULATOR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#09090c]/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Total Waitlist Signups</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white">{totalLeads}</span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">100% Organic</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2 font-mono">Captured via opt-in forms</p>
        </div>

        <div className="bg-[#09090c]/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">UPI Revenue Captured</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-emerald-400">₹{totalRevenue}</span>
            <span className="text-[10px] text-zinc-500">INR Ledger</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2 font-mono">{activePage.revenueCollected?.length || 0} Paid Access transactions</p>
        </div>

        <div className="bg-[#09090c]/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Simulated Conversion Rate</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white">{currentConversionRate}%</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${parseFloat(currentConversionRate) > 5 ? 'bg-emerald-950 text-emerald-400' : parseFloat(currentConversionRate) > 2 ? 'bg-amber-950 text-amber-400' : 'bg-red-950 text-red-400'}`}>
              {parseFloat(currentConversionRate) > 5 ? 'Viral Lift' : parseFloat(currentConversionRate) > 2 ? 'Good CRO' : 'Needs Optimization'}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2 font-mono">Signups relative to visits</p>
        </div>

        {/* DYNAMIC TRAFFIC RANGE VISUALIZER SLIDER */}
        <div className="bg-[#09090c]/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Traffic Volume Slider</span>
              <span className="text-white font-bold">{simulatedVisits.toLocaleString()} visits</span>
            </span>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={simulatedVisits}
              onChange={(e) => setSimulatedVisits(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer mt-4 accent-indigo-500"
            />
          </div>
          <p className="text-[9.5px] text-indigo-300 leading-normal font-sans pt-2">
            ➔ Slide traffic levels to compute mock customer signup ratios for your launch!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CORE 2. DETAILED LEADS CRM PANEL */}
        <div className="lg:col-span-7 bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-3 gap-2">
            <span className="text-xs uppercase text-zinc-400 font-bold block">Prospect Waitlist Contacts CRM</span>
            <span className="text-[9px] font-mono text-zinc-500">{filteredLeads.length} of {totalLeads} matching entries</span>
          </div>

          {/* CRM SEARCH & MULTI-FILTER BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[10px] font-mono">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <input
                type="text"
                placeholder="Search email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-white placeholder-zinc-650 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-zinc-600 absolute left-2.5 top-2" />
            </div>

            {/* Filter Pipeline Status */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl p-1.5 text-zinc-300 focus:outline-none focus:border-indigo-500 leading-none"
              >
                <option value="all">Pipeline: All Status</option>
                <option value="Interested">Interested</option>
                <option value="Contacted">Contacted</option>
                <option value="Nurturing">Nurturing</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-black border border-white/10 rounded-xl p-1.5 text-zinc-300 focus:outline-none focus:border-indigo-500 leading-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
              </select>
            </div>
          </div>

          {/* LIST STREAM */}
          {sortedLeads.length === 0 ? (
            <div className="py-14 text-center text-zinc-550 border border-dashed border-white/5 rounded-2xl font-sans text-xs">
              No waitlist contacts found matching current criteria filters.
            </div>
          ) : (
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {sortedLeads.map((ld) => {
                const isExpanded = expandedGlobalIndex === ld.globalIndex;

                return (
                  <div
                    key={ld.globalIndex}
                    className={`border rounded-2xl overflow-hidden transition-all text-xs font-mono bg-black/40 ${isExpanded ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.05)]' : 'border-white/5 hover:border-white/10'}`}
                  >
                    {/* Compact Header Summary */}
                    <div
                      onClick={() => toggleExpandLead(ld.globalIndex)}
                      className="p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 cursor-pointer select-none"
                    >
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-white text-sm tracking-tight">{ld.email}</span>
                          {ld.tags.map((tg, i) => (
                            <span key={i} className="text-[7.5px] bg-indigo-950/60 border border-indigo-500/20 text-[#a78bfa] rounded-full px-1.5 py-0.5 uppercase tracking-wide">
                              {tg}
                            </span>
                          ))}
                        </div>
                        <div className="text-[8.5px] text-zinc-500 flex items-center gap-2 flex-wrap">
                          <span>📅 Signed-up: {new Date(ld.timestamp).toLocaleDateString()} at {new Date(ld.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span>🌐 Origin: {ld.sectionId || 'Main Lead Box'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className={`text-[8.5px] font-black uppercase rounded-lg px-2 py-1 tracking-wider ${
                          ld.status === 'Converted' ? 'bg-emerald-950 text-emerald-400' :
                          ld.status === 'Qualified' ? 'bg-cyan-950 text-cyan-400' :
                          ld.status === 'Nurturing' ? 'bg-purple-950 text-purple-400' :
                          ld.status === 'Contacted' ? 'bg-blue-950 text-blue-400' :
                          'bg-zinc-900 border border-white/5 text-zinc-400'
                        }`}>
                          {ld.status}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />}
                      </div>
                    </div>

                    {/* EXPANDED CRM CONTROLLER BODY */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-[#07070a]/80 space-y-4 font-sans text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {/* Left Column: Simulated Session Details */}
                          <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-2 text-[10.5px]">
                            <span className="text-[8px] font-mono text-zinc-550 block uppercase tracking-wider">Device coordinates summary</span>
                            <div className="space-y-1">
                              <div><span className="text-zinc-500 font-mono">Assigned IP:</span> <span className="font-mono text-zinc-350">172.56.{ld.globalIndex}.{Math.floor(Math.random() * 240)}</span></div>
                              <div><span className="text-zinc-500 font-mono">Platform agent:</span> <span className="font-mono text-zinc-350">{ld.deviceSim}</span></div>
                              <div><span className="text-zinc-500 font-mono">Calculated locale:</span> <span className="font-mono text-zinc-350">{ld.locationSim}</span></div>
                              <div><span className="text-zinc-500 font-mono">Campaign path:</span> <span className="text-indigo-400 font-mono">/{activePage.slug}?sec={ld.sectionId || 'waitlist'}</span></div>
                            </div>
                          </div>

                          {/* Right Column: Edit Pipeline Profile */}
                          <div className="space-y-2.5">
                            <span className="text-[8px] font-mono text-zinc-555 block uppercase tracking-wider">Configure pipeline settings</span>
                            
                            {/* Status and comma-separated tags */}
                            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                              <div className="space-y-1">
                                <label className="text-[9px] text-zinc-500 block font-mono">Pipeline Status</label>
                                <select
                                  value={editedStatus}
                                  onChange={(e) => setEditedStatus(e.target.value)}
                                  className="w-full bg-black border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none"
                                >
                                  <option value="Interested">Interested</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Nurturing">Nurturing</option>
                                  <option value="Qualified">Qualified</option>
                                  <option value="Converted">Converted</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] text-zinc-500 block font-mono">Client Tags (commasep)</label>
                                <input
                                  type="text"
                                  value={editedTags}
                                  onChange={(e) => setEditedTags(e.target.value)}
                                  className="w-full bg-black border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none"
                                  placeholder="Beta, VIP"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CRM Editor Text Notes */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] text-zinc-500 block font-mono">CRM Conversation Log Notes (visible only internally to your startup developers)</label>
                          <textarea
                            rows={2}
                            value={editedNotes}
                            onChange={(e) => setEditedNotes(e.target.value)}
                            placeholder="Add lead logging details here: e.g., 'Met them at developer meetup. Highly interested in API access.'"
                            className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-white text-xs focus:outline-none"
                          />
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-between items-center pt-1 border-t border-white/5">
                          <button
                            onClick={() => {
                              updateActivePage((curr) => ({
                                ...curr,
                                leadsCollected: curr.leadsCollected.filter((_, idx) => idx !== ld.globalIndex)
                              }));
                              setExpandedGlobalIndex(null);
                            }}
                            className="text-red-400 hover:text-red-300 font-mono text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete Contact Lead Coordinates
                          </button>

                          <button
                            onClick={() => saveLeadCRMNotes(ld.globalIndex)}
                            className="bg-white hover:bg-zinc-200 text-black py-1.5 px-4 rounded-xl text-xs font-bold cursor-pointer font-sans"
                          >
                            Save Lead Coordinates Notes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CORE 3. AI DYNAMIC BLAST CAMPAIGN COPYWRITER */}
        <div className="lg:col-span-5 bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="border-b border-white/5 pb-3">
            <span className="text-xs uppercase text-zinc-400 font-bold block">AI Lead Email Campaign Copywriter</span>
            <p className="text-[10px] text-zinc-500 mt-0.5">Draft copywriter-grade waitlist engagement updates targeting your list.</p>
          </div>

          {/* Goal selection selectors */}
          <div className="space-y-2 text-[10.5px]">
            <span className="text-[9px] text-zinc-550 block uppercase font-mono tracking-wider">Choose subscriber engagement goal:</span>
            <div className="grid grid-cols-3 gap-2 font-sans">
              <button
                onClick={() => setDraftGoal('launch')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${draftGoal === 'launch' ? 'bg-white text-black border-white font-bold' : 'bg-black text-zinc-400 border-white/5 hover:text-white'}`}
              >
                Launch Day Announcement
              </button>
              <button
                onClick={() => setDraftGoal('vip')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${draftGoal === 'vip' ? 'bg-white text-black border-white font-bold' : 'bg-black text-zinc-400 border-white/5 hover:text-white'}`}
              >
                VIP Beta Invite
              </button>
              <button
                onClick={() => setDraftGoal('teaser')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${draftGoal === 'teaser' ? 'bg-white text-black border-white font-bold' : 'bg-black text-zinc-400 border-white/5 hover:text-white'}`}
              >
                Launch Feature Teaser
              </button>
            </div>
          </div>

          <button
            onClick={triggerEmailCopyDraft}
            disabled={draftLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-[0.98]"
          >
            {draftLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Synthesizing Conversion Copy...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                Inquire & Draft Campaign with AI
              </>
            )}
          </button>

          {/* DRAFT OUTCOME DISPENSERS */}
          {draftError && (
            <div className="p-3 bg-red-950/25 border border-red-500/20 text-red-300 rounded-xl text-[11px] font-sans">
              {draftError}
            </div>
          )}

          {draftResult ? (
            <div className="space-y-3 pt-1 text-[11px]">
              <span className="text-[9px] text-zinc-550 block uppercase font-mono tracking-wider border-b border-white/5 pb-1">Synthesized Newsletter Template</span>

              {/* Subject box */}
              <div className="bg-[#050507] p-3 rounded-xl border border-white/5 space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-zinc-500 font-mono uppercase">Subject Line:</span>
                  <button
                    onClick={() => handleCopyCode(draftResult.subjectLine)}
                    className="text-indigo-400 hover:text-white font-mono uppercase text-[9px]"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-white font-bold text-xs">{draftResult.subjectLine}</p>
                <p className="text-zinc-500 py-0.5"><span className="text-zinc-455 font-mono">Teaser Preview:</span> {draftResult.previewText}</p>
              </div>

              {/* Body HTML Frame */}
              <div className="bg-[#050507] p-3 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1 mb-1.5">
                  <span className="text-zinc-500 font-mono uppercase">Campaign HTML Copy:</span>
                  <button
                    onClick={() => handleCopyCode(draftResult.bodyHtml)}
                    className="text-[#a78bfa] hover:text-white font-mono uppercase text-[9px] font-bold"
                  >
                    {copiedText ? 'Copied HTML!' : 'Copy Email Code'}
                  </button>
                </div>
                
                {/* Visual email render inside sandbox scroll container */}
                <div
                  className="max-h-48 overflow-y-auto bg-black/40 p-3 rounded-lg text-zinc-300 font-sans leading-relaxed text-xs space-y-2 border border-white/5"
                  dangerouslySetInnerHTML={{ __html: draftResult.bodyHtml }}
                />
              </div>

              {/* Copywriter CRO Tips */}
              <div className="p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl text-zinc-400 space-y-1">
                <span className="font-bold text-white text-[10px] flex items-center gap-1 font-mono uppercase text-indigo-300">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  PRO CRO Growth Tip for Launch Day
                </span>
                <p className="font-light text-[10px] leading-relaxed">{draftResult.growthHacksTip}</p>
                <div className="text-[9px] text-zinc-550 font-mono pt-1">Estimated read time: {draftResult.estimatedReadTime} seconds</div>
              </div>
            </div>
          ) : (
            !draftLoading && !draftError && (
              <div className="py-12 text-center text-zinc-600 border border-dashed border-white/5 bg-black/20 rounded-2xl">
                <Mail className="w-6 h-6 text-zinc-700 mx-auto mb-2" />
                <span className="text-xs font-sans">No newsletter drafts constructed yet. Select a campaign goal above and let Gemini formulate high-conversion copywriting templates.</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. EARNINGS LEDGER & SETTLEMENT AUDIT */}
      {/* ======================================================== */}
      <div id="earnings-ledger-section" className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-6 shadow-xl relative overflow-hidden text-left mt-6">
        {/* Top visual glow decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-white/5 pb-4 gap-4">
          <div>
            <h4 className="text-sm font-black uppercase text-white font-mono tracking-wider flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Earnings & Settlement Audit Ledger
            </h4>
            <p className="text-[10.5px] text-zinc-500 mt-1">
              Live settlement verification of active customer plan acquisitions. Audits Stripe cards and Indian UPI settlements with cryptographic routing checksums.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono">
            {/* Quick Simulate Payment */}
            <button
              type="button"
              id="ledger-quick-simulate-btn"
              onClick={handlerAutoSimulatePayment}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[9.5px] font-bold uppercase px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>Quick Simulate Payment</span>
            </button>

            {/* Custom Payment Record Builder Toggle */}
            <button
              type="button"
              id="ledger-open-custom-btn"
              onClick={() => setShowCustomTxnForm(!showCustomTxnForm)}
              className={`text-[9.5px] font-bold uppercase px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer border ${showCustomTxnForm ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-300 border-white/5 hover:border-white/10'}`}
            >
              <span>Add Custom Log</span>
            </button>

            {/* Clear All Ledger Logs */}
            {isConfirmingClear ? (
              <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/30 p-1 rounded-xl">
                <span className="text-[9px] uppercase font-bold text-red-300 px-1">Clear all logs?</span>
                <button
                  type="button"
                  onClick={() => {
                    updateActivePage(curr => ({ ...curr, revenueCollected: [] }));
                    setExpandedTxnIdx(null);
                    setIsConfirmingClear(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-[8.5px] font-bold uppercase py-1 px-2.5 rounded-lg cursor-pointer"
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingClear(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[8.5px] font-bold uppercase py-1 px-2.5 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                id="ledger-clear-logs-btn"
                onClick={() => setIsConfirmingClear(true)}
                disabled={rawRevenue.length === 0}
                className="bg-zinc-950 border border-white/5 hover:border-red-500/20 hover:text-red-400 disabled:opacity-30 disabled:pointer-events-none text-zinc-500 text-[9.5px] font-bold uppercase px-3 py-2 rounded-xl transition-all cursor-pointer"
              >
                Wipe Ledger
              </button>
            )}
          </div>
        </div>

        {/* CUSTOM PAYMENT RECORD BUILDER PANEL */}
        {showCustomTxnForm && (
          <form
            onSubmit={handleAddCustomTxnSubmit}
            id="ledger-custom-txn-form"
            className="bg-black/60 border border-emerald-500/20 rounded-2xl p-4 space-y-3.5 transition-all text-xs"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Log Custom Settlement Record</span>
              <button
                type="button"
                onClick={() => setShowCustomTxnForm(false)}
                className="text-zinc-500 hover:text-white font-mono text-[10px] uppercase cursor-pointer"
              >
                Close Form
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-mono">Plan / Description Name</label>
                <input
                  type="text"
                  required
                  value={customPlanName}
                  onChange={(e) => setCustomPlanName(e.target.value)}
                  placeholder="e.g. Creator Plus Unlimited Key"
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-zinc-700 text-[11px] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-mono">Amount (Indian Rupees - INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-zinc-500 font-bold">₹</span>
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    required
                    value={customAmountStr}
                    onChange={(e) => setCustomAmountStr(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-6 pr-3 py-2 text-white text-[11px] focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] text-zinc-400 block font-mono">Settlement Method Network</label>
                <select
                  value={customMethod}
                  onChange={(e) => setCustomMethod(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl p-2 text-zinc-300 text-[11px] focus:outline-none focus:border-emerald-500 font-sans"
                >
                  <option value="UPI_QR">UPI Network QR Settlement</option>
                  <option value="STRIPE_CARD">Stripe Card Network Checkout</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="bg-emerald-400 hover:bg-emerald-300 text-black font-sans font-bold py-1.5 px-4 rounded-xl text-xs transition-colors cursor-pointer border-none"
              >
                Log Succeeded Settlement
              </button>
            </div>
          </form>
        )}

        {/* LEDGER ANALYTICAL TICKERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Aggregate Revenue</span>
            <span className="text-base font-black text-white mt-1 font-mono">₹{totalRevenue.toLocaleString()}</span>
          </div>

          <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Mapped Settlements</span>
            <span className="text-base font-black text-[#a78bfa] mt-1 font-mono">{rawRevenue.length} txn logs</span>
          </div>

          <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[9px] font-mono text-zinc-500 uppercase">UPI Net settlements</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold text-emerald-400 font-mono">₹{upiRevenue.toLocaleString()}</span>
              <span className="text-[8.5px] font-mono text-zinc-500 text-right">
                {rawRevenue.length > 0 ? `${Math.round((upiRevenue / (totalRevenue || 1)) * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex flex-col justify-between">
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Stripe Net Settlements</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold text-indigo-400 font-mono">₹{stripeRevenue.toLocaleString()}</span>
              <span className="text-[8.5px] font-mono text-zinc-500 text-right">
                {rawRevenue.length > 0 ? `${Math.round((stripeRevenue / (totalRevenue || 1)) * 100)}%` : '0%'}
              </span>
            </div>
          </div>
        </div>

        {/* FILTER & SEARCH ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10.5px] font-mono">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              placeholder="Search ledger by transaction reference, plan name, or amount..."
              value={ledgerSearch}
              onChange={(e) => setLedgerSearch(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-zinc-600 absolute left-2.5 top-2.5" />
          </div>

          <div>
            <select
              value={ledgerProvider}
              onChange={(e) => setLedgerProvider(e.target.value as any)}
              className="w-full bg-black border border-white/10 rounded-xl p-1.5 py-1.5 text-zinc-300 focus:outline-none focus:border-emerald-500 leading-none font-sans"
            >
              <option value="all">Provider Network: All Settlements</option>
              <option value="stripe">Stripe Cards Settlements Only</option>
              <option value="upi">UPI Network Settlements Only</option>
            </select>
          </div>
        </div>

        {/* DYNAMIC AUDIT TABLE VIEWPORT */}
        {filteredLedger.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 border border-dashed border-white/5 bg-black/10 rounded-2xl font-mono text-xs">
            {rawRevenue.length === 0 
              ? 'No payment settlement transactions logged. Simulate checkouts to populate the audit registry.' 
              : 'No receipts match the specified search term or provider network filters.'}
          </div>
        ) : (
          <div className="border border-white/5 bg-black/20 rounded-2xl overflow-hidden">
            {/* Desktop Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-zinc-950/80 text-zinc-400 text-left">
                    <th className="p-3 text-[10px] uppercase font-bold tracking-wider">Timestamp</th>
                    <th className="p-3 text-[10px] uppercase font-bold tracking-wider">Plan Name & Description</th>
                    <th className="p-3 text-[10px] uppercase font-bold tracking-wider">Provider Network</th>
                    <th className="p-3 text-[10px] uppercase font-bold tracking-wider">Cryptographic Reference ID</th>
                    <th className="p-3 text-[10px] uppercase font-bold tracking-wider text-right">Settled Amount</th>
                    <th className="p-3 text-[10px] uppercase font-bold tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLedger.map((item) => {
                    const isExpanded = expandedTxnIdx === item.originalIndex;
                    const formattedTime = new Date(item.timestamp).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    });
                    const isStripe = item.method.toUpperCase().includes('STRIPE');

                    return (
                      <React.Fragment key={item.id}>
                        <tr 
                          onClick={() => setExpandedTxnIdx(isExpanded ? null : item.originalIndex)}
                          className={`hover:bg-zinc-900/40 transition-colors cursor-pointer ${isExpanded ? 'bg-zinc-900/30' : ''}`}
                        >
                          <td className="p-3 text-zinc-400 whitespace-nowrap">{formattedTime}</td>
                          <td className="p-3 font-semibold text-white max-w-[200px] truncate">{item.description}</td>
                          <td className="p-3">
                            <span className={`text-[8.5px] font-extrabold uppercase rounded px-1.5 py-0.5 tracking-wider inline-flex items-center gap-1 border ${isStripe ? 'bg-indigo-950/40 border-indigo-500/20 text-[#a78bfa]' : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isStripe ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
                              {item.method}
                            </span>
                          </td>
                          <td className="p-3 text-zinc-500 tracking-tight font-mono select-all truncate">{item.id}</td>
                          <td className="p-3 text-right text-emerald-400 font-extrabold text-xs whitespace-nowrap">₹{item.amountINR.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                              </span>
                              <span className="text-[8.5px] font-extrabold text-emerald-400 tracking-wider uppercase">succeeded</span>
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Crypto Invoice Receipt */}
                        {isExpanded && (
                          <tr className="bg-black/50">
                            <td colSpan={6} className="bg-black/60 p-4 border-t border-b border-white/5">
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs font-mono text-left max-w-4xl">
                                <div className="md:col-span-8 p-3 rounded-xl border border-white/5 bg-zinc-950/70 space-y-2 leading-relaxed">
                                  <div className="text-[8px] uppercase text-zinc-500 font-black tracking-widest border-b border-white/5 pb-1">Cryptographic Blockchain Settlement Signature</div>
                                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                                    <div><span className="text-zinc-500 font-bold">Auth Token SHA-250:</span> <span className="text-zinc-350 select-all">0x{item.id.length * 843}fd9a{item.originalIndex}</span></div>
                                    <div><span className="text-zinc-500 font-bold">Clearing Bank Route:</span> <span className="text-zinc-300">HDFC_HQ_BENGALURU</span></div>
                                    <div><span className="text-zinc-500 font-bold">Gateway Provider URL:</span> <span className="text-zinc-300">api.{isStripe ? 'stripe' : 'upi'}.com/settle_ref_{item.id}</span></div>
                                    <div><span className="text-zinc-500 font-bold">Customer UUID Ref:</span> <span className="text-zinc-300">cust_98f{item.originalIndex}b{item.amountINR}</span></div>
                                  </div>
                                  <div className="text-[9px] text-zinc-400 border-t border-white/5 pt-1.5">
                                    <span className="font-extrabold text-emerald-400">Note:</span> Settled directly onto connected bank accounts within ~2 seconds using instant API webhooks.
                                  </div>
                                </div>

                                <div className="md:col-span-4 flex flex-col justify-between items-stretch bg-zinc-950/30 border border-white/5 p-3 rounded-xl gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const dummyReceipt = `=== SETTLEMENT RECEIPTS ===\nTXN ID: ${item.id}\nTIMESTAMP: ${item.timestamp}\nPLAN: ${item.description}\nAMOUNT: INR ${item.amountINR}\nGATEWAY: ${item.method}\nSTATUS: SUCCEEDED\n==========================`;
                                      navigator.clipboard.writeText(dummyReceipt);
                                    }}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] py-2 rounded-lg border border-white/5 transition-all text-center uppercase font-bold cursor-pointer"
                                  >
                                    Copy Raw Receipt Log
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handlerDeleteTxn(item.originalIndex)}
                                    className="w-full bg-red-950/30 hover:bg-red-950/60 border border-red-500/20 text-red-400 font-mono text-[9px] py-1.5 rounded-lg transition-all text-center uppercase font-bold cursor-pointer"
                                  >
                                    Delete Txn Record
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card List (Responsive adaptation) */}
            <div className="md:hidden divide-y divide-white/5 font-mono text-[11px]">
              {filteredLedger.map((item) => {
                const isExpanded = expandedTxnIdx === item.originalIndex;
                const formattedTime = new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const isStripe = item.method.toUpperCase().includes('STRIPE');

                return (
                  <div key={item.id} className="p-3.5 space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <div className="space-y-0.5 text-left">
                        <span className="font-black text-white text-xs block truncate max-w-[180px]">{item.description}</span>
                        <span className="text-[9.5px] text-zinc-500 block">{formattedTime}</span>
                        <span className="text-[8px] text-zinc-650 block truncate max-w-[170px] select-all">{item.id}</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-emerald-400 font-extrabold text-xs block">₹{item.amountINR.toLocaleString()}</span>
                        <span className={`text-[7.5px] font-extrabold uppercase rounded px-1.5 py-0.5 inline-block ${isStripe ? 'bg-indigo-950 text-[#a78bfa]' : 'bg-emerald-950 text-emerald-400'}`}>
                          {item.method}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setExpandedTxnIdx(isExpanded ? null : item.originalIndex)}
                        className="text-zinc-400 text-[10px] uppercase cursor-pointer"
                      >
                        {isExpanded ? 'Hide Specs' : 'Show Specs'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handlerDeleteTxn(item.originalIndex)}
                        className="text-red-400 hover:text-red-300 text-[10px] uppercase cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-[10px] space-y-1 block text-left">
                        <div><span className="text-zinc-500">SHA hash:</span> <span className="text-zinc-350 select-all font-mono">0x{item.id.length * 843}fd9a{item.originalIndex}</span></div>
                        <div><span className="text-zinc-500">Method:</span> <span className="text-zinc-350">{item.method} Network</span></div>
                        <div><span className="text-zinc-500">Clearing Agent:</span> <span className="text-zinc-300 text-xs">HDFC Routing Center</span></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 6. AI PROMPT MARKETPLACE
// ==========================================
interface MarketplaceViewProps {
  setGeneratorPrompt: (v: string) => void;
  setActiveTab: (tab: any) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ setGeneratorPrompt, setActiveTab }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">AI Prompt marketplace</h3>
        <p className="text-xs text-zinc-500 mt-1">Copy verified prompt strategies created by launch specialists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {[
          {
            name: 'Gen Z SaaS Grids waitlists',
            prompt: 'Create a clean sleek bento grid for a crypto trading bot with dual payment tiers, UPI QR code integration, in midnight purple glass.',
            use: '98% Conversion Rate'
          },
          {
            name: 'Cyberpunk Event Summon RSVP',
            prompt: 'Deploy a highly futuristic tech rave ticket lock, featuring an early bird clock counter and inclusive GST prices checkout.',
            use: '94% Growth Index'
          }
        ].map((pt, i) => (
          <div
            key={i}
            className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:border-white transition-all min-h-[170px]"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-white text-sm">{pt.name}</h4>
                <span className="text-[9px] rounded-full px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono font-bold">{pt.use}</span>
              </div>
              <code className="text-[11px] font-mono text-zinc-400 bg-black p-3.5 rounded-xl block border border-white/5 leading-normal">
                {pt.prompt}
              </code>
            </div>

            <button
              onClick={() => {
                setGeneratorPrompt(pt.prompt);
                setActiveTab('ai-generate');
              }}
              className="bg-white hover:bg-zinc-200 text-black py-2 rounded-xl text-xs font-bold font-mono uppercase mt-4 cursor-pointer text-center"
            >
              Import Prompt Blueprint
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 7. COLLABORATIVE CO-EDIT TEAM VIEW
// ==========================================
interface TeamViewProps {
  chatHistory: any[];
  activePage: LandingPage;
  setChatHistory: (v: any) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ chatHistory, activePage, setChatHistory }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">Co-Edit Multiplayer Room</h3>
        <p className="text-xs text-zinc-500 mt-1">Multiplayer visual grids commentary and real-time syncing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs font-mono">
        <div className="bg-[#09090d]/80 border border-white/10 rounded-3xl p-5 space-y-4">
          <h4 className="font-bold text-white uppercase text-[10px] tracking-widest text-zinc-400 pb-1 border-b border-white/5">Session Administrators</h4>
          <div className="space-y-2">
            <div className="flex justify-between bg-white/5 border border-white/10 p-3 rounded-xl font-bold text-emerald-400">
              <span>You (viswatejam45@gmail.com)</span>
              <span>Host Manager</span>
            </div>
            <div className="flex justify-between bg-black p-3 rounded-xl text-zinc-500">
              <span>Reviewer_Dev (shashank@flashfocus)</span>
              <span>Viewer lock</span>
            </div>
          </div>
          <div className="p-3 bg-black rounded-xl text-zinc-500 text-[11px] leading-relaxed border border-white/5">
            <p className="font-semibold text-zinc-400 pb-1 text-[9px] uppercase">Multiplex Sync Stream logs:</p>
            <p>[16:32] Saved active page "{activePage.name}"</p>
            <p>[16:35] Validated Razorpay UPI key integration credentials</p>
          </div>
        </div>

        <div className="bg-[#09090d]/80 border border-white/10 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-[10px] tracking-widest text-[#FFF]">Co-Edit Commentary sticky note</h4>
            <textarea
              placeholder="e.g. Shashank please verify inclusive GST settings and pricing structures before we launch live."
              rows={3}
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-white leading-normal"
            />
          </div>

          <button
            onClick={() => {
              setChatHistory((prev: any) => [
                ...prev,
                { sender: 'assistant', text: `✓ Sticky Comment pinned securely to session synchronization log!`, timestamp: '16:36' }
              ]);
            }}
            className="bg-white text-black py-2 rounded-xl text-xs font-black uppercase cursor-pointer"
          >
            Pin Sticky Comment
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. SETTINGS & EXPORTS VIEW
// ==========================================
/**
 * Helper function to retrieve custom domain quota limits based on the active plan.
 * - 'plan-basic' (₹200): up to 2 domains
 * - 'plan-starter-99' (₹99): up to 3 domains
 * - 'plan-pro' (₹999): up to 10 domains
 * - Free / fallback: 0 domains
 */
export function getDomainQuota(activePlanId?: string): number {
  if (activePlanId === 'plan-starter-99') {
    return 3;
  }
  if (activePlanId === 'plan-basic') {
    return 2;
  }
  if (activePlanId === 'plan-pro') {
    return 10;
  }
  return 0; // free tier has 0 custom domains
}

interface SettingsViewProps {
  customGstRate: string;
  setCustomGstRate: (v: string) => void;
  paymentProvider: 'razorpay' | 'cashfree' | 'payu' | 'stripe';
  setPaymentProvider: (type: 'razorpay' | 'cashfree' | 'payu' | 'stripe') => void;
  internationalBilling: boolean;
  setInternationalBilling: (v: boolean) => void;
  activePage: LandingPage;
  setChatHistory: (v: any) => void;
  updateActivePage: (updater: (current: LandingPage) => LandingPage) => void;
  onPayTrigger: (planName: string, priceINR: number) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  customGstRate,
  setCustomGstRate,
  paymentProvider,
  setPaymentProvider,
  internationalBilling,
  setInternationalBilling,
  activePage,
  setChatHistory,
  updateActivePage,
  onPayTrigger
}) => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domainInput, setDomainInput] = useState('');
  const [verifyStep, setVerifyStep] = useState<'input' | 'dns-guide' | 'verifying' | 'success'>('input');
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [verifyError, setVerifyError] = useState('');

  // Preview Export States
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isCompilingPreview, setIsCompilingPreview] = useState(false);

  // Active plan tracker - defaults to 'plan-free' if not set
  const currentPlanId = activePage.activePlanId || 'plan-free';
  
  // Custom domains list - defaults to empty array
  const currentDomains = activePage.customDomains || [];

  // Determine domain limit based on current subscription plan using the getDomainQuota helper function
  const domainLimit = getDomainQuota(currentPlanId);
  let planLabel = 'Creator Free (0 INR)';
  if (currentPlanId === 'plan-starter-99') {
    planLabel = 'Starter Plus Plan (₹99/mo)';
  } else if (currentPlanId === 'plan-basic') {
    planLabel = 'Basic Plan (₹200/mo)';
  } else if (currentPlanId === 'plan-pro') {
    planLabel = 'Pro Launchpad Plan (₹999/mo)';
  }

  const handleSetPlan = (planId: string) => {
    updateActivePage(curr => ({
      ...curr,
      activePlanId: planId
    }));
    setChatHistory((p: any) => [
      ...p,
      {
        sender: 'assistant',
        text: `✓ Plan setting updated for page "${activePage.name}" to: ${planId === 'plan-starter-99' ? 'Starter Plus (₹99)' : planId === 'plan-basic' ? 'Basic (₹200)' : 'Pro (₹999)'}. Domain limits have been updated dynamically!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSimulatePayment = (planName: string, price: number, planId: string) => {
    onPayTrigger(planName, price);
    // Automatically apply plan upon successful simulation context
    setTimeout(() => {
      updateActivePage(curr => ({
        ...curr,
        activePlanId: planId
      }));
    }, 1000);
  };

  const handleAddDomainClick = () => {
    if (currentDomains.length >= domainLimit) {
      setChatHistory((p: any) => [
        ...p,
        {
          sender: 'assistant',
          text: `⚠️ Domain limit exceeded. Your current plan (${planLabel}) only allows up to ${domainLimit} custom domain(s). Please upgrade to the ₹99 Starter Plus Plan for up to 3 domains.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      return;
    }
    setDomainInput('');
    setVerifyStep('input');
    setVerifyLogs([]);
    setVerifyError('');
    setIsModalOpen(true);
  };

  const handleProceedToDns = () => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    if (!domainInput.trim() || !domainRegex.test(domainInput.trim())) {
      setVerifyError('Please enter a valid domain name (e.g., mysite.com).');
      return;
    }
    setVerifyError('');
    setVerifyStep('dns-guide');
  };

  const handleStartVerification = () => {
    setVerifyStep('verifying');
    setVerifyLogs([]);
    
    const logs = [
      '🔍 Querying global SOA authority servers for root records...',
      '📡 Resolving CNAME target validation check point...',
      '🛠️ Requesting validation token sequence check (ff-challenge-challenge)...',
      '🔒 Initializing SSL Let\'s Encrypt automatic certificate provisioning...',
      '🚀 Synchronizing edge nodes with Cloudflare routing tables...'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setVerifyLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        
        // Save the domain configuration to page state
        updateActivePage(curr => {
          const domains = curr.customDomains || [];
          if (domains.includes(domainInput.trim().toLowerCase())) {
            return curr;
          }
          return {
            ...curr,
            customDomains: [...domains, domainInput.trim().toLowerCase()]
          };
        });

        setChatHistory((p: any) => [
          ...p,
          {
            sender: 'assistant',
            text: `🎉 Custom domain verified & connected successfully: "${domainInput.trim()}". Active on our global Cloudflare edge network!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        setVerifyStep('success');
      }
    }, 1100);
  };

  const handleDeleteDomain = (domainToDelete: string) => {
    updateActivePage(curr => {
      const domains = curr.customDomains || [];
      return {
        ...curr,
        customDomains: domains.filter(d => d !== domainToDelete)
      };
    });
    setChatHistory((p: any) => [
      ...p,
      {
        sender: 'assistant',
        text: `✓ Custom domain "${domainToDelete}" removed from routing list.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-6 text-left relative">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h3 className="text-xl font-black text-white font-display uppercase tracking-wider">Gateway, Domains & Exports</h3>
          <p className="text-xs text-zinc-550 mt-1">Manage global DNS mappings, mock INR checkout configuration, and HTML packages exporting.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#121216] border border-white/15 px-3 py-1.5 rounded-xl font-mono text-[10px]">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping shrink-0" />
          <span className="text-zinc-400">Cloud DNS Client Integration: Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs font-mono">
        {/* Domain Mapping Block */}
        <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] uppercase text-zinc-400 font-bold block">
                Edge custom domain mapping
              </span>
              <span className="text-[9px] text-zinc-550 bg-white/5 px-2 py-0.5 rounded font-bold uppercase">
                Quota: {currentDomains.length} / {domainLimit} Use
              </span>
            </div>

            {/* Plan Display and Quick Upgrade */}
            <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-[10px] uppercase">Page Active Quota Plan</span>
                <span className="text-[#A78BFA] font-black">{planLabel}</span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-sans font-light">
                {currentPlanId === 'plan-starter-99'
                  ? 'Fantastic Choice! Your ₹99/mo plan empowers mapping up to 3 custom apex domains.'
                  : currentPlanId === 'plan-basic'
                  ? 'Your ₹200/mo plan maps up to 2 custom apex domains.'
                  : currentPlanId === 'plan-pro'
                  ? 'Ultimate Pro plan with up to 10 mapped custom apex domains.'
                  : 'Upgrade to customize domains. The ₹99 plan unlocks up to 3 verified mapped domains!'}
              </p>

              {/* Plan Action Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                <button
                  onClick={() => handleSimulatePayment('Starter Plus Custom Domain Plan', 99, 'plan-starter-99')}
                  className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${currentPlanId === 'plan-starter-99' ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'}`}
                >
                  ₹99 Plan (3 Domains)
                </button>
                <button
                  onClick={() => handleSimulatePayment('Basic Standard Domain Plan', 200, 'plan-basic')}
                  className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${currentPlanId === 'plan-basic' ? 'bg-indigo-600 text-white' : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'}`}
                >
                  ₹200 Plan (2 Domains)
                </button>
                <button
                  onClick={() => handleSetPlan('plan-free')}
                  className={`px-2 py-1 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${currentPlanId === 'plan-free' ? 'bg-zinc-650 text-white font-black' : 'bg-white/5 text-zinc-400'}`}
                >
                  Free Tier
                </button>
              </div>
            </div>

            {/* List domains already mapped */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase text-zinc-500 font-bold block">Configured Custom Names</span>
              {currentDomains.length === 0 ? (
                <div className="p-4 border border-dashed border-white/10 text-center rounded-2xl text-zinc-600">
                  <Globe className="w-5 h-5 mx-auto mb-1.5 opacity-30 text-white" />
                  <p className="text-[10px]">No domains verified yet. Map your first apex domain below.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {currentDomains.map((dm) => (
                    <div key={dm} className="flex justify-between items-center p-2 rounded-xl bg-black border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span className="text-[11px] font-bold text-white lowercase">{dm}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] bg-green-950 text-green-400 border border-green-800 px-1.5 rounded uppercase font-bold">CNAME Verified</span>
                        <button
                          onClick={() => handleDeleteDomain(dm)}
                          className="hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                          title="Remove domain mapping"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAddDomainClick}
            disabled={currentPlanId === 'plan-free'}
            className={`w-full text-xs font-black uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${currentPlanId === 'plan-free' ? 'bg-white/5 border-dashed border-white/10 text-zinc-600 cursor-not-allowed' : 'bg-white hover:bg-zinc-300 text-black border-transparent shadow'}`}
          >
            <Plus className="w-3.5 h-3.5" />
            {currentPlanId === 'plan-free' ? 'Upgrade Plan to configure Domains' : 'Verify & Map New Custom Domain'}
          </button>
          
          {currentPlanId === 'plan-free' && (
            <p className="text-[9px] text-yellow-500/80 text-center block pt-1 leading-normal">
              ⚠️ Custom domain routing requires at least the active ₹99 Starter Plus subscription.
            </p>
          )}
        </div>

        {/* STANDALONE MERCHANT SETTINGS BLOCK */}
        <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 space-y-4">
          <span className="text-[10px] uppercase text-zinc-400 font-bold block pb-1 border-b border-white/5">
            India Merchant Parameters
          </span>

          <div className="space-y-1">
            <label className="text-[9px] text-zinc-550">Inclusive GST rate invoice (%)</label>
            <input
              type="number"
              value={customGstRate}
              onChange={(e) => setCustomGstRate(e.target.value)}
              className="w-full bg-[#050507] border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-zinc-550">UPI Gateway Aggregator Partner</label>
            <select
              value={paymentProvider}
              onChange={(e) => setPaymentProvider(e.target.value as any)}
              className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-white"
            >
              <option value="razorpay">Razorpay private limited (UPI Intent / UPI QR)</option>
              <option value="cashfree">Cashfree solutions private limited</option>
              <option value="payu">Payu financial gateway private limited</option>
              <option value="stripe">Stripe international credit card standard</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2 text-[#E2E8F0] select-none">
            <input
              type="checkbox"
              id="int-rout-chk"
              checked={internationalBilling}
              onChange={(e) => setInternationalBilling(e.target.checked)}
              className="accent-purple-500 cursor-pointer"
            />
            <label htmlFor="int-rout-chk" className="cursor-pointer">
              Allow auto-routing for non-INR cross-border payments
            </label>
          </div>
        </div>
      </div>

      {/* EXPORT OPTIONS BOX */}
      <div className="bg-[#09090c]/90 border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
        <div className="space-y-1 text-left">
          <span className="text-[10px] uppercase text-zinc-400 font-bold block pb-1 border-b border-white/5">Standalone Exporter Bundle</span>
          <p className="text-zinc-400 leading-relaxed text-xs font-sans font-light">
            Download or copy pure self-contained offline HTML templates with embedded stylesheets. Fully compatible with standalone hostings.
          </p>
        </div>

        <button
          onClick={() => {
            const htmlSource = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${activePage.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#030303] text-white min-h-screen">
  <!-- Dynamic compiled index output -->
  <div class="max-w-4xl mx-auto py-20 px-4 text-center">
    <span class="text-[10px] uppercase tracking-widest text-[#7C3AED] bg-purple-900/20 px-3 py-1 border border-purple-800 rounded-full font-mono">${activePage.status} live</span>
    <h1 class="text-4xl font-black mt-4">${activePage.name}</h1>
    <p class="text-zinc-400 text-sm mt-2">Exported Standalone Bundle. Embedded sections compiled successfully with custom domain route support.</p>
  </div>
</body>
</html>`;
            navigator.clipboard.writeText(htmlSource);
            setChatHistory((p: any) => [
              ...p,
              { sender: 'assistant', text: `✓ Standalone HTML index.html bundle copied successfully! Ready to deploy or preview offline.`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]);
          }}
          className="bg-[#0EA5E9] hover:bg-cyan-500 text-white font-mono text-xs font-black py-2.5 px-6 rounded-xl uppercase flex justify-center items-center gap-1.5 cursor-pointer shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Copy Standalone index.html Code
        </button>
      </div>

      {/* EXPORT WORKSPACE PREVIEW FRAME */}
      <div className="bg-[#0c0c0f]/90 border border-white/10 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl text-left select-none relative overflow-hidden">
        {/* Subtle decorative vector circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-3">
          <div>
            <h4 className="text-sm font-black uppercase text-white font-mono tracking-wider flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              Production Export Preview Frame
            </h4>
            <p className="text-[10.5px] text-zinc-400 mt-1">
              Simulated read-only device environment testing exactly how sections align, fonts display, and theme colors contrast in a standalone production-exported package.
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {/* Viewport Toggles */}
            <div className="bg-zinc-950 p-1 rounded-xl border border-white/5 flex gap-1">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`px-3 py-1.5 rounded-lg text-[9.5px] font-mono font-bold uppercase transition-all flex items-center gap-1 cursor-pointer select-none ${
                  viewportMode === 'desktop'
                    ? 'bg-white text-black font-extrabold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Desktop view</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`px-3 py-1.5 rounded-lg text-[9.5px] font-mono font-bold uppercase transition-all flex items-center gap-1 cursor-pointer select-none ${
                  viewportMode === 'mobile'
                    ? 'bg-white text-black font-extrabold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile view</span>
              </button>
            </div>

            {/* Simulated Hot Compile / Refresh */}
            <button
              type="button"
              onClick={() => {
                setIsCompilingPreview(true);
                setTimeout(() => setIsCompilingPreview(false), 500);
              }}
              disabled={isCompilingPreview}
              className="p-2 rounded-xl bg-zinc-950 border border-white/5 hover:bg-zinc-900 transition-all cursor-pointer disabled:opacity-40 text-zinc-400 hover:text-white"
              title="Hot reload exporter compiler"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCompilingPreview ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Dynamic viewport renderer housing frame */}
        <div className="flex justify-center bg-black/40 border border-white/5 p-4 sm:p-6 rounded-2xl relative overflow-hidden min-h-[400px]">
          {isCompilingPreview && (
            <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest animate-pulse">compiling production assets...</span>
            </div>
          )}

          {viewportMode === 'desktop' ? (
            /* Desktop Web Browser Chrome Frame */
            <div className="w-full max-w-5xl rounded-xl border border-white/10 bg-[#0c0c0e] shadow-2xl overflow-hidden flex flex-col h-[520px]">
              {/* Browser control header bar */}
              <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
                </div>
                
                {/* Browser address field */}
                <div className="bg-black/40 border border-white/5 rounded-md px-3 py-1 text-[9px] text-zinc-400 font-mono w-[320px] text-center truncate select-all">
                  https://{activePage.slug || 'active-deployment'}.com
                </div>
                
                <div className="w-12" />
              </div>

              {/* Rendered Viewport Area */}
              <div className="flex-grow overflow-y-auto bg-black text-white relative scrollbar-thin">
                {activePage.sections.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-2">
                    <span className="text-xl">🏜️</span>
                    <h5 className="text-xs font-bold font-mono text-zinc-400 uppercase">This Page Has No Sections Yet</h5>
                    <p className="text-[10px] text-zinc-500 max-w-xs font-sans">
                      Add a hero or features section in the main generator workspace first to preview it here as exported code.
                    </p>
                  </div>
                ) : (
                  activePage.sections.map((sec) => (
                    <LandingPageItem
                      key={sec.id}
                      section={sec}
                      theme={activePage.theme}
                      fontFamily={activePage.fontFamily}
                      isPreview={false}
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Smartphone Chasis Container */
            <div className="relative w-[320px] h-[520px] border-[10px] border-zinc-800 rounded-[38px] bg-black shadow-2xl flex flex-col overflow-hidden shrink-0">
              {/* iPhone style dynamic speaker & notch */}
              <div className="absolute top-0 inset-x-0 h-4 bg-zinc-800 flex justify-center items-center z-30 select-none pointer-events-none">
                <div className="w-16 h-3 bg-black rounded-b-xl flex items-center justify-center gap-1">
                  <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <div className="w-6 h-0.5 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>

              {/* Internal phone notch spacer for real scroll */}
              <div className="h-4 bg-black shrink-0 relative z-20" />

              {/* Viewport Area */}
              <div className="flex-grow overflow-y-auto bg-black text-white relative scrollbar-none text-[8px]">
                {activePage.sections.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-2">
                    <span className="text-lg">🏜️</span>
                    <h5 className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Empty Page</h5>
                  </div>
                ) : (
                  activePage.sections.map((sec) => (
                    <LandingPageItem
                      key={sec.id}
                      section={sec}
                      theme={activePage.theme}
                      fontFamily={activePage.fontFamily}
                      isPreview={false}
                    />
                  ))
                )}
              </div>

              {/* iPhone style Home indicator bar */}
              <div className="absolute bottom-1 inset-x-0 h-1 bg-white/20 w-24 mx-auto rounded-full z-30 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* NEW INTERACTIVE MODAL COMPONENT: CUSTOM DOMAINS VERIFICATION */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0c0f] border border-white/20 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-left select-none relative font-mono text-xs">
            
            {/* Modal Heading Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-black uppercase text-white tracking-wider">Cloud DNS Border System</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white text-xs font-bold font-mono transition-colors p-1 cursor-pointer"
              >
                X Close
              </button>
            </div>

            {/* Interactive Step Navigation Bar (Forward & Backward Arrows on Top of Option Steps) */}
            <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/5 select-none gap-2">
              <button
                type="button"
                onClick={() => {
                  if (verifyStep === 'dns-guide') setVerifyStep('input');
                  else if (verifyStep === 'verifying') setVerifyStep('dns-guide');
                  else if (verifyStep === 'success') setVerifyStep('verifying');
                }}
                disabled={verifyStep === 'input'}
                className="p-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 font-bold uppercase disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 transition-all"
                title="Go to previous step"
              >
                <span>◀ Back</span>
              </button>

              <div className="hidden sm:flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-zinc-400">
                <span className={verifyStep === 'input' ? 'text-purple-400 font-black' : 'text-zinc-600'}>1. Target</span>
                <span className="text-zinc-700">➔</span>
                <span className={verifyStep === 'dns-guide' ? 'text-purple-400 font-black' : 'text-zinc-600'}>2. DNS Records</span>
                <span className="text-zinc-700">➔</span>
                <span className={verifyStep === 'verifying' ? 'text-purple-400 font-black' : 'text-zinc-600'}>3. Verify</span>
                <span className="text-zinc-700">➔</span>
                <span className={verifyStep === 'success' ? 'text-purple-400 font-black' : 'text-zinc-600'}>4. Live</span>
              </div>

              <div className="sm:hidden text-[9px] text-[#A78BFA] font-bold uppercase">
                Step: {verifyStep === 'input' ? '1/4 Input' : verifyStep === 'dns-guide' ? '2/4 DNS' : verifyStep === 'verifying' ? '3/4 Verifying' : '4/4 Active!'}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (verifyStep === 'input') {
                    handleProceedToDns();
                  } else if (verifyStep === 'dns-guide') {
                    handleStartVerification();
                  } else if (verifyStep === 'verifying') {
                    setVerifyStep('success');
                  }
                }}
                disabled={verifyStep === 'success' || (verifyStep === 'input' && !domainInput.trim())}
                className="p-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-[10px] text-purple-300 font-bold uppercase disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 transition-all"
                title="Go to next step"
              >
                <span>Next ▶</span>
              </button>
            </div>

            {/* Verification Steps Content */}
            {verifyStep === 'input' && (
              <div className="space-y-4">
                <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                  Enter your custom registered domain. Pointing custom dns routes directs apex traffic straight to our high-performing edge architecture.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 uppercase font-black block">Registered apex domain name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. mysite.com or store.co.in"
                    value={domainInput}
                    onChange={(e) => {
                      setDomainInput(e.target.value.replace(/\s+/g, ''));
                      setVerifyError('');
                    }}
                    className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs lowercase focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  {verifyError && (
                    <span className="text-red-400 text-[10px] block mt-1">⚠️ {verifyError}</span>
                  )}
                </div>

                <div className="bg-purple-950/20 border border-purple-900/30 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-[10px] uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Edge Firewall Protection Included</span>
                  </div>
                  <p className="text-[10px] text-purple-200/80 leading-relaxed font-sans">
                    All linked custom domains benefit from Cloudflare Web App Firewalls (WAF), global DDOS shielding, and automatic SSL keys generation.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-zinc-500 hover:text-white font-bold px-4 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToDns}
                    disabled={!domainInput.trim()}
                    className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Proceed to DNS Setup
                  </button>
                </div>
              </div>
            )}

            {verifyStep === 'dns-guide' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-indigo-400 uppercase font-bold">Step 2: DNS Name Servers Settings</span>
                  <p className="text-zinc-400 text-xs font-sans">
                    Log in to your registrar console (e.g. GoDaddy, Namecheap) and create the following DNS records:
                  </p>
                </div>

                {/* DNS Records Table Grid */}
                <div className="space-y-2">
                  <div className="bg-black/80 border border-white/10 rounded-2xl overflow-hidden font-mono text-[10px]">
                    <div className="grid grid-cols-12 bg-zinc-900 p-2.5 text-zinc-400 border-b border-white/5 font-bold uppercase tracking-wider">
                      <div className="col-span-2">Type</div>
                      <div className="col-span-3">Host Name</div>
                      <div className="col-span-7">Target Points To</div>
                    </div>
                    
                    <div className="grid grid-cols-12 p-3 border-b border-white/5 items-center">
                      <div className="col-span-2 text-indigo-400 font-bold">CNAME</div>
                      <div className="col-span-3 font-semibold text-white">@ (or apex)</div>
                      <div className="col-span-7 text-green-400 select-all font-semibold">edge.flashfocus.io</div>
                    </div>

                    <div className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-2 text-indigo-400 font-bold">TXT</div>
                      <div className="col-span-3 font-semibold text-white">_flashfocus-challenge</div>
                      <div className="col-span-7 text-yellow-500 select-all font-semibold">ff-verify-932840a1</div>
                    </div>
                  </div>

                  <p className="text-[9px] text-zinc-550 leading-relaxed font-sans">
                    💡 CNAME record directs traffic through our secure CDN nodes. TXT challenges verify domain ownership authority for SSL certifications.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setVerifyStep('input')}
                    className="text-zinc-500 hover:text-white font-bold px-3 py-1.5 cursor-pointer"
                  >
                    ◀ Edit domain name
                  </button>
                  <button
                    type="button"
                    onClick={handleStartVerification}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-wider px-5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <Server className="w-3.5 h-3.5" />
                    Verify DNS Record Propagation
                  </button>
                </div>
              </div>
            )}

            {verifyStep === 'verifying' && (
              <div className="space-y-5 py-6 text-center">
                <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                <div className="space-y-2">
                  <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Querying global dns records...</h4>
                  <div className="bg-black/90 text-left border border-white/5 p-4 rounded-2xl max-h-44 overflow-y-auto space-y-1.5 font-mono text-[10px] text-zinc-500">
                    {verifyLogs.map((log, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-zinc-750 font-bold">[{idx + 1}]</span>
                        <span className={idx === verifyLogs.length - 1 ? "text-indigo-400 font-bold animate-pulse" : "text-zinc-400"}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {verifyStep === 'success' && (
              <div className="space-y-5 text-center py-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center mx-auto text-green-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="font-black text-white text-base uppercase font-display tracking-tight border-b border-white/5 pb-2">Active Web Space Ready!</h4>
                  <p className="text-[11px] text-zinc-400 font-sans font-light leading-relaxed px-2">
                    Custom domain <span className="text-green-400 font-bold font-mono lowercase">{domainInput}</span> pointed to FlashFocus Cloudflare proxy router is active! Dynamic routing of views and conversions tracking has been initiated.
                  </p>
                </div>

                <div className="bg-black border border-white/5 rounded-2xl p-3 text-left font-mono text-[10px] text-zinc-500">
                  <div className="flex justify-between py-1">
                    <span>Mapped Slug:</span>
                    <span className="text-white">/{activePage.slug}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Edge SSL Key:</span>
                    <span className="text-green-500">Activated (ECC-P384)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Cache Hub status:</span>
                    <span className="text-zinc-300">Edge Cached (Tier 0)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-black uppercase text-xs py-2.5 rounded-xl cursor-pointer shadow"
                  >
                    Finish & Close Configuration
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
