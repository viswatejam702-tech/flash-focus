import React from 'react';
import { Activity, Sparkles, PauseCircle, PlayCircle, Zap, RefreshCw, TrendingUp } from 'lucide-react';
import { LandingPage } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface DashboardViewProps {
  activePage: LandingPage;
  setActiveTab: (tab: any) => void;
  copilotStatusText: string;
  chatHistory: any[];
  assistantText: string;
  setAssistantText: (v: string) => void;
  handleCopilotMessage: (e: React.FormEvent) => void;
}

interface TrafficPulsePoint {
  time: string;
  clicks: number;
  conversions: number;
  isSpike: boolean;
}

// Sleek Custom Tooltip for Recharts Line/Area Graph
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/95 border border-white/10 p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-[10.5px] font-mono leading-relaxed text-left">
        <div className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">Temporal Snapshot</div>
        <div className="text-white font-black mt-0.5">{data.time}</div>
        <div className="text-[#c084fc] flex items-center gap-1.5 mt-2 font-bold font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
          <span>Clicks: {data.clicks} uniques</span>
        </div>
        <div className="text-emerald-400 flex items-center gap-1.5 font-bold font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Conversions: {data.conversions} leads</span>
        </div>
        {data.isSpike && (
          <div className="mt-2 text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded text-[8.5px] uppercase font-mono font-extrabold text-center border border-rose-500/20">
            🔥 Viral Click Spike
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  activePage,
  setActiveTab,
  copilotStatusText,
  chatHistory,
  assistantText,
  setAssistantText,
  handleCopilotMessage
}) => {
  // 1. Core State for live simulated telemetry data loops
  const [pulseData, setPulseData] = React.useState<TrafficPulsePoint[]>(() => {
    // Scaffold beautiful initial historic data of 15 ticks so chart looks rich instantly
    const data: TrafficPulsePoint[] = [];
    const now = new Date();
    for (let i = 14; i >= 0; i--) {
      const timeSnap = new Date(now.getTime() - i * 3000);
      const timeStr = timeSnap.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const isSpike = i === 6; // Historical reference spike
      data.push({
        time: timeStr,
        clicks: isSpike ? 112 : Math.floor(Math.random() * 15) + 12,
        conversions: isSpike ? 8 : Math.floor(Math.random() * 3),
        isSpike
      });
    }
    return data;
  });

  const [isActive, setIsActive] = React.useState<boolean>(true);

  // 2. Telemetry setInterval Loop for traffic emulation
  React.useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPulseData((prev) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        // 15% probability of initiating a traffic spike naturally
        const isSpike = Math.random() < 0.15;
        const clicks = isSpike 
          ? Math.floor(Math.random() * 85) + 65 
          : Math.floor(Math.random() * 18) + 10;
        const conversions = isSpike 
          ? Math.floor(Math.random() * 10) + 4 
          : Math.floor(Math.random() * 2.5);

        const newPoint: TrafficPulsePoint = {
          time: timeStr,
          clicks,
          conversions,
          isSpike
        };

        // Keep the rolling history size strictly at 15 intervals
        return [...prev.slice(1), newPoint];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isActive]);

  // 3. Command manual trigger to instantly inject viral spike parameters
  const triggerManualSpike = () => {
    setPulseData((prev) => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const clicks = Math.floor(Math.random() * 110) + 130; // Extreme surge!
      const conversions = Math.floor(Math.random() * 14) + 8;

      const newPoint: TrafficPulsePoint = {
        time: timeStr,
        clicks,
        conversions,
        isSpike: true
      };

      return [...prev.slice(1), newPoint];
    });
  };

  return (
    <div id="dashboard-view-root" className="grid grid-cols-12 gap-5 w-full text-left">
      {/* LARGE MONOLITH WELCOME HERO */}
      <div id="dashboard-hero-card" className="col-span-12 lg:col-span-8 bg-white text-black rounded-3xl p-6 flex flex-col justify-between min-h-[220px] shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <span className="bg-black text-white text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
            Systems Operations Command
          </span>
          <h3 className="text-2xl font-black tracking-tight leading-none pt-2 font-display uppercase text-zinc-950">
            LAUNCHPAD CONTROL DESK
          </h3>
          <p className="text-zinc-700 text-xs leading-relaxed max-w-lg">
            Welcome to the central launchpad dashboard. Your active campaign slot <strong>{activePage.name}</strong> is live. Monitor real-time traffic REACH parameters, inspect regional conversions, download raw CSV lead lists, and audit SEO scores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-4 mt-4 border-t border-zinc-100 relative z-10">
          <button
            id="launch-studio-studio-btn"
            onClick={() => setActiveTab('ai-generate')}
            className="bg-black hover:bg-zinc-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold font-mono uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Launch Studio Engine
          </button>
        </div>
      </div>

      {/* ACTIVE CAMPAIGN METRICS PANEL */}
      <div id="dashboard-stats-card" className="col-span-12 lg:col-span-4 bg-[#0c0c10]/90 border border-white/10 rounded-3xl p-5 flex flex-col justify-between min-h-[220px]">
        <div className="space-y-1">
          <span className="text-[9px] text-[#0EA5E9] font-mono font-bold uppercase tracking-widest block">Active Slot Target</span>
          <p className="text-sm font-bold text-white truncate">{activePage.name}</p>
          <p className="text-[10px] text-zinc-500 font-mono">slug: https://{activePage.slug || 'active'}.site</p>
        </div>

        <div className="bg-black/50 border border-white/5 rounded-xl p-3 text-xs font-mono space-y-1">
          <div className="text-zinc-500 text-[9px] uppercase font-bold">Typography Vibe</div>
          <div className="text-white font-extrabold uppercase">{activePage.fontFamily || 'sans'} pairing</div>
        </div>

        <button
          id="fine-tune-stack-btn"
          onClick={() => setActiveTab('editor')}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] py-2 rounded-xl border border-white/10 cursor-pointer transition-all"
        >
          Fine-tune Section Stacks
        </button>
      </div>

      {/* REAL-TIME TRAFFIC ENGAGEMENT PULSE (USER RECHART ADDITION) */}
      <div id="engagement-pulse-card" className="col-span-12 bg-zinc-950 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Sleek background radial glow vectors */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 border-b border-white/5 pb-2.5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-[#c084fc]' : 'bg-zinc-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-[#c084fc]' : 'bg-zinc-500'}`}></span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A78BFA] font-black">
                ENGAGEMENT PULSE emulations
              </span>
            </div>
            <h4 className="text-base font-black font-semibold text-white uppercase tracking-tight">
              Live Click Activity Index
            </h4>
            <p className="text-[10px] text-zinc-500">
              Interactive workspace telemetry emulating traffic spikes on <strong>{activePage.name}</strong>. Line chart visualizes incoming clicks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Stream On/Off State Button */}
            <button
              id="toggle-pulse-stream-btn"
              onClick={() => setIsActive(!isActive)}
              className={`p-2 rounded-xl text-[9px] font-mono font-bold flex items-center gap-1.5 border cursor-pointer transition-all uppercase ${
                isActive 
                  ? 'bg-zinc-950 text-amber-400 border-amber-500/20 hover:bg-zinc-900 shadow' 
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20 hover:bg-emerald-950/80 shadow'
              }`}
            >
              {isActive ? (
                <>
                  <PauseCircle className="w-3.5 h-3.5" />
                  <span>Pause stream</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Resume Live</span>
                </>
              )}
            </button>

            {/* Simulated viral spike button */}
            <button
              id="trigger-pulse-spike-btn"
              onClick={triggerManualSpike}
              className="bg-[#a78bfa] hover:bg-[#8b5cf6] text-black font-mono text-[9px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-current shrink-0 animate-pulse" />
              <span>Simulate Spike</span>
            </button>
          </div>
        </div>

        {/* Real-time Tickers for Dynamic Monitoring */}
        <div id="pulse-metrics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 text-xs">
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
            <span className="text-[8.5px] font-mono uppercase text-zinc-500 tracking-wider">Latest Tick Clicks</span>
            <div className="flex items-baseline gap-1 mt-1 justify-between">
              <span className="text-xl font-black text-white font-mono tracking-tight">{pulseData[pulseData.length - 1]?.clicks || 0}</span>
              <span className="text-[8px] text-purple-400 font-mono font-bold uppercase">uniques</span>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
            <span className="text-[8.5px] font-mono uppercase text-zinc-500 tracking-wider">Session Peak Click</span>
            <div className="flex items-baseline gap-1 mt-1 justify-between">
              <span className="text-xl font-black text-white font-mono tracking-tight">
                {Math.max(...pulseData.map(d => d.clicks))}
              </span>
              <span className="text-[8px] text-zinc-400 font-mono font-bold uppercase">record high</span>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
            <span className="text-[8.5px] font-mono uppercase text-zinc-500 tracking-wider">Lead Conversion Stream</span>
            <div className="flex items-baseline gap-1 mt-1 justify-between">
              <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">
                {pulseData[pulseData.length - 1]?.conversions || 0}
              </span>
              <span className="text-[8px] text-emerald-500 font-mono font-bold uppercase">submits</span>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
            <span className="text-[8.5px] font-mono uppercase text-zinc-500 tracking-wider">Poll Interval</span>
            <div className="flex items-baseline gap-1 mt-1 justify-between">
              <span className="text-xl font-black text-sky-400 font-mono tracking-tight">~2.8s</span>
              <span className="text-[8px] text-zinc-400 font-mono font-bold uppercase">interval</span>
            </div>
          </div>
        </div>

        {/* Dynamic Recharts Chart Canvas Frame */}
        <div id="pulse-chart-container" className="bg-black/15 p-2.5 rounded-2xl border border-white/5 h-[160px] w-full relative z-10 flex flex-col justify-between">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pulseData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="glowClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C084FC" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#C084FC" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="glowLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.15)" 
                tick={{ fontSize: 8, fontFamily: 'monospace', fill: 'rgba(255,255,255,0.4)' }}
                tickLine={false}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.15)"
                tick={{ fontSize: 8, fontFamily: 'monospace', fill: 'rgba(255,255,255,0.4)' }}
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stroke="#c084fc" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#glowClicks)"
                activeDot={{ r: 5, strokeWidth: 0, fill: '#c084fc' }}
              />
              <Area 
                type="monotone" 
                dataKey="conversions" 
                stroke="#10b981" 
                strokeWidth={1} 
                fillOpacity={1} 
                fill="url(#glowLeads)" 
                activeDot={{ r: 4, strokeWidth: 0, fill: '#10b981' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STATIC TRAFFIC TREND HISTORICAL GRAPH */}
      <div id="dashboard-historical-card" className="col-span-12 lg:col-span-6 bg-[#0c0c10]/85 border border-white/10 rounded-3xl p-5 min-h-[230px] flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Total traffic uniques reach</span>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">+32.4% index</span>
        </div>

        <div className="my-4 flex items-end gap-2.5 h-20 pt-2">
          {[30, 45, 25, 60, 85, 50, 95].map((val, idx) => (
            <div
              key={idx}
              style={{ height: `${val}%` }}
              className="flex-1 bg-white/10 hover:bg-white rounded-t cursor-pointer transition-all shadow-[0_0_10px_rgba(255,255,255,0.02)]"
              title={`Day ${idx + 1}: ${val * 14} unique clicks`}
            />
          ))}
        </div>

        <div className="flex justify-between items-baseline pt-2 border-t border-white/5 font-mono">
          <div>
            <div className="text-xl font-bold text-white">{(activePage.views || 3412).toLocaleString()}</div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-wider block">Total Views</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">8.5%</div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-wider block">Avg conversions</span>
          </div>
        </div>
      </div>

      {/* QUICK CHAT LOG COPILOT ASSISTANT */}
      <div id="dashboard-copilot-card" className="col-span-12 lg:col-span-6 bg-[#0c0c10]/85 border border-white/10 rounded-3xl p-5 min-h-[230px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Copilot stream</span>
            <span className="text-[9px] font-mono text-white bg-white/10 px-2 rounded py-0.5">{copilotStatusText}</span>
          </div>
          <div className="text-xs space-y-1.5 max-h-24 overflow-y-auto pr-1">
            {chatHistory.slice(-2).map((ch, idx) => (
              <div key={idx} className="leading-relaxed">
                <span className="font-bold text-white">{ch.sender === 'user' ? 'You' : 'AI Assistant'}:</span>{' '}
                <span className="text-zinc-300">{ch.text}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleCopilotMessage} className="mt-2 flex gap-1.5 bg-black border border-white/10 rounded-xl p-1 shrink-0">
          <input
            id="dashboard-copilot-input"
            type="text"
            placeholder="Instruct: e.g. 'Use minimalist style' or 'Apply Mono fonts'"
            value={assistantText}
            onChange={(e) => setAssistantText(e.target.value)}
            className="flex-grow bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none placeholder-zinc-500"
          />
          <button type="submit" className="bg-white text-black hover:bg-zinc-200 px-4 rounded-lg text-xs font-bold font-mono cursor-pointer transition-colors shrink-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
