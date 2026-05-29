import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Bot, Globe, FileText, Compass, Code, Image as ImageIcon, Cpu,
  Search, Play, Plus, Trash2, Send, Terminal, Eye, Layers, Check, AlertCircle,
  Clock, CheckCircle, RefreshCw, BarChart2, Shield, Heart, Network, ExternalLink,
  ChevronRight, Volume2, Maximize2, Settings, User, Database, ArrowRight, Table,
  Edit3, HelpCircle, Activity, Star, Shuffle, Download, EyeOff, Layout, ListTodo, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for our rich workspace platform state
interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system' | 'agent-research' | 'agent-seo' | 'agent-coder';
  text: string;
  timestamp: string;
  modelUsed?: string;
  citations?: { title: string; url: string }[];
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  avatar: string;
  currentTask?: string;
  color: string;
  logs: string[];
}

interface DocNode {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

interface GridCell {
  id: string;
  value: string;
  formula?: string;
}

interface KanbanTask {
  id: string;
  title: string;
  desc: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'backlog' | 'todo' | 'progress' | 'review' | 'done';
  aiTag?: string;
}

interface MemoryNode {
  id: string;
  text: string;
  category: string;
  vector: [number, number]; // 2D projection for vector database map visualization
  timestamp: string;
}

export function AiWorkspaceView() {
  // Current subsystem panel toggles
  const [subTab, setSubTab] = useState<'chat' | 'browser' | 'agents' | 'workspace' | 'search' | 'coder' | 'media' | 'memory'>('chat');
  const [loading, setLoading] = useState(false);

  // --- 1. CHAT ENGINE STATE ---
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      text: 'Establishing high-integrity connection with multi-model gateway. Gemini 3.5 Flash online.',
      timestamp: '11:59:33'
    },
    {
      id: '2',
      sender: 'assistant',
      text: 'Good afternoon. I am your high-performance workspace copilot. I have real-time parallel gateways ready. You can toggle models, compare outputs side-by-side, or configure automated agents.',
      timestamp: '11:59:45',
      modelUsed: 'gemini-3.5-flash'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>(['gemini-3.5-flash']);
  const [reasoningMode, setReasoningMode] = useState<'standard' | 'agent' | 'deep-thought' | 'coder' | 'creative'>('standard');
  const [compareMode, setCompareMode] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceWave, setVoiceWave] = useState<number[]>([10, 40, 20, 80, 50, 90, 30, 70, 40, 20]);

  // --- 2. LIVE BROWSER CONNECTED AI STATE ---
  const [browserUrl, setBrowserUrl] = useState('https://news.ycombinator.com');
  const [browserSearchQuery, setBrowserSearchQuery] = useState('');
  const [browserLog, setBrowserLog] = useState<string[]>([
    '🌐 SYSTEM: Built-in virtual browser sandbox initialized.',
    '🌐 SYSTEM: Secure Node proxy pipeline ready on port 3000.'
  ]);
  const [browserActiveTab, setBrowserActiveTab] = useState<'view' | 'analysis' | 'extracted'>('view');
  const [isCrawling, setIsCrawling] = useState(false);
  const [browserPayload, setBrowserPayload] = useState<{
    title: string;
    description: string;
    extractedKeywords: string[];
    sentiment: string;
    formInputs: string[];
    summary: string;
  }>({
    title: "Hacker News",
    description: "A social news website run by startup incubator and investment fund Y Combinator.",
    extractedKeywords: ["YCombinator", "Startup", "Tech Venture", "Hacker Culture", "Programming"],
    sentiment: "Optimistic / Forward-Looking (84% score)",
    formInputs: ["q (Search Input Field)"],
    summary: "Hacker News primary feed aggregates peer-reviewed tech articles. Key current trends showing high engagement are DeepSeek models, local server-side TypeScript running, and secure sandboxing."
  });

  // --- 3. AUTONOMOUS AGENTS STATE ---
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'research',
      name: 'Dr. Orion Research',
      role: 'Deep Web Search & Paper Synthesizer',
      status: 'idle',
      avatar: '🔬',
      color: 'from-blue-500 to-indigo-600',
      logs: ['[09:30] Orion Research Agent online.', '[09:31] Awaiting research synthesis task.']
    },
    {
      id: 'seo',
      name: 'Vesper SEO',
      role: 'Keyword, Core Web Vitals & Snippets Guard',
      status: 'idle',
      avatar: '📈',
      color: 'from-emerald-400 to-teal-600',
      logs: ['[09:30] Vesper SEO monitor started.', '[09:30] A/B crawl trackers configured successfully.']
    },
    {
      id: 'coder',
      name: 'Nix Coder',
      role: 'TypeScript Architecture & System Compiler',
      status: 'idle',
      avatar: '💻',
      color: 'from-purple-500 to-pink-600',
      logs: ['[09:30] Nix Coder VM terminal listening.', '[09:30] Port 3000 hot reload listening.']
    }
  ]);
  const [agentInput, setAgentInput] = useState('');
  const [collaborativeConsole, setCollaborativeConsole] = useState<string[]>([
    '🤖 Agents group channel opened.',
    '✨ State sync configured.'
  ]);
  const [isAgentsWorking, setIsAgentsWorking] = useState(false);

  // --- 4. WORKSPACE DOCUMENTS & CANVAS STATE ---
  const [docs, setDocs] = useState<DocNode[]>([
    { id: '1', title: 'Product Launch Manifesto', content: '# Product Launch Plan\n\nFlashFocus represents a paradigm shift. We deploy real-time server-side compiled landing pages targeting exact user demographics.\n\n## Action Items\n- Run SEO crawler verify loops\n- Collect local waitlist leads\n- Integrate Razorpay/Stripe QR gateways\n- Secure API keys' },
    { id: '2', title: 'Competitor Intelligence', content: '# Competitor Benchmark Analysis\n\nOur service is 35x faster than basic templates. Standard builders provide poor speed scores. FlashFocus produces light JSON schemas with perfect performance audits.' }
  ]);
  const [activeDocId, setActiveDocId] = useState('1');
  const [activeDocContent, setActiveDocContent] = useState('');
  const [activeDocTitle, setActiveDocTitle] = useState('');

  // Spreadsheet cells state
  const [sheetData, setSheetData] = useState<{ [key: string]: GridCell }>({
    'A1': { id: 'A1', value: 'Month' },
    'B1': { id: 'B1', value: 'Leads' },
    'C1': { id: 'C1', value: 'Conversion Rate' },
    'D1': { id: 'D1', value: 'Value (INR)' },
    'A2': { id: 'A2', value: 'January' },
    'B2': { id: 'B2', value: '540' },
    'C2': { id: 'C2', value: '12%' },
    'D2': { id: 'D2', value: '64800', formula: '=B2 * 120' },
    'A3': { id: 'A3', value: 'February' },
    'B3': { id: 'B3', value: '820' },
    'C3': { id: 'C3', value: '14%' },
    'D3': { id: 'D3', value: '114800', formula: '=B3 * 140' },
    'A4': { id: 'A4', value: 'March' },
    'B4': { id: 'B4', value: '1250' },
    'C4': { id: 'C4', value: '18%' },
    'D4': { id: 'D4', value: '225000', formula: '=B4 * 180' },
  });
  const [selectedCell, setSelectedCell] = useState<string | null>('D2');
  const [cellEditValue, setCellEditValue] = useState('');

  // Whiteboard SVG paths state
  const [boardShapes, setBoardShapes] = useState<{ id: string; type: string; x: number; y: number; w: number; h: number; label: string; color: string }[]>([
    { id: '1', type: 'rect', x: 50, y: 50, w: 120, h: 60, label: 'Waitlist Form UI', color: 'border-blue-500 bg-blue-500/10' },
    { id: '2', type: 'arrow', x: 200, y: 80, w: 60, h: 2, label: 'Lead Trigger', color: 'bg-zinc-500' },
    { id: '3', type: 'circle', x: 280, y: 50, w: 100, h: 60, label: 'Gemini Agent API', color: 'border-purple-500 bg-purple-500/10' },
    { id: '4', type: 'arrow', x: 400, y: 80, w: 60, h: 2, label: 'Response', color: 'bg-zinc-500' },
    { id: '5', type: 'rect', x: 480, y: 50, w: 140, h: 60, label: 'Database Storage', color: 'border-emerald-500 bg-emerald-500/10' }
  ]);

  // Kanban Tasks
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    { id: 'k1', title: 'Audit SEO Schema.org microdata', desc: 'Ensure JSON-LD structure matches crawler expectations.', priority: 'high', status: 'progress', aiTag: 'AI Audited 98%' },
    { id: 'k2', title: 'Integrate UPI/PayTM QR gateway', desc: 'Allow instant direct merchant payments without card fees.', priority: 'critical', status: 'todo' },
    { id: 'k3', title: 'Set up multi-model token optimization', desc: 'Reduce token costs by caching repeated system prompts.', priority: 'low', status: 'backlog', aiTag: 'Token Optimizer' },
    { id: 'k4', title: 'Pre-fill AI Waitlist design preset', desc: 'Draft responsive high-converting hero screen copy.', priority: 'medium', status: 'done', aiTag: 'Finished' }
  ]);

  // --- 5. ADVANCED RESEARCH ENGINE STATE ---
  const [researchTopic, setResearchTopic] = useState('DeepSeek-R1 reasoning models vs Gemini 3.5 pro performance parameters');
  const [researchDeepMode, setResearchDeepMode] = useState(true);
  const [researchResult, setResearchResult] = useState<string>('');
  const [researchCitations, setResearchCitations] = useState<{ title: string; url: string }[]>([]);
  const [researchLog, setResearchLog] = useState<string[]>([]);

  // --- 6. AI CODING STUDIO STATE ---
  const [codeContent, setCodeContent] = useState(`import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HighConvertingHero() {
  return (
    <div className="bg-zinc-950 text-white min-h-[400px] flex flex-col justify-center items-center px-6 relative overflow-hidden border border-white/5 rounded-3xl p-12">
      <div className="absolute top-0 left-12 w-72 h-72 bg-[#A78BFA]/10 rounded-full blur-[80px]" />
      <span className="text-[10px] font-mono font-extrabold uppercase bg-indigo-500/10 text-[#A78BFA] border border-indigo-500/20 px-3 py-1 rounded-full mb-4">
        Now Operational
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center max-w-2xl leading-tight">
        Scale Your Multi-Agent Workspaces Automatically
      </h1>
      <p className="text-zinc-400 text-sm md:text-base text-center max-w-lg mt-4 leading-relaxed">
        Let autonomies synthesize documents, optimize schemas, and draft emails from one seamless system.
      </p>
      <button className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2 text-xs">
        Get Started Instantly
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}`);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'nix@workspace:~$ npm install lucide-react',
    'added 42 packages, and audited 43 packages in 12s',
    'nix@workspace:~$ npm run dev',
    '🚀 Dev server launched successfully! Listening on post 3000'
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // --- 7. CONTENT LAB STATE ---
  const [blogTopic, setBlogTopic] = useState('How Multi-Agent Autonomous OS increases enterprise leverage by 450%');
  const [audioVoice, setAudioVoice] = useState<'Kore' | 'Zephyr' | 'Puck' | 'Charon'>('Zephyr');
  const [blogGenerated, setBlogGenerated] = useState('');
  const [voicePlaybackActive, setVoicePlaybackActive] = useState(false);

  // --- 8. AI MEMORY DATABASE STATE ---
  const [memories, setMemories] = useState<MemoryNode[]>([
    { id: 'm1', text: 'Brand is ASTROSPHERE, using dark obsidian layout theme with neon indicators.', category: 'branding', vector: [0.15, 0.65], timestamp: '11:59:01' },
    { id: 'm2', text: 'Prefer Razorpay gateway for South Asian regional INR invoice currency payments.', category: 'billing', vector: [0.72, 0.23], timestamp: '11:59:03' },
    { id: 'm3', text: 'SEO focus is high-speed core Web Vitals matches with structured LD microdata tags.', category: 'seo', vector: [0.34, 0.45], timestamp: '11:59:15' }
  ]);
  const [memorySearch, setMemorySearch] = useState('');
  const [newMemoryText, setNewMemoryText] = useState('');

  // Initial document mount
  useEffect(() => {
    const activeDoc = docs.find(d => d.id === activeDocId);
    if (activeDoc) {
      setActiveDocContent(activeDoc.content);
      setActiveDocTitle(activeDoc.title);
    }
  }, [activeDocId]);

  // Voice wave effect generator
  useEffect(() => {
    if (isVoiceActive) {
      const interval = setInterval(() => {
        setVoiceWave(Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 15));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVoiceActive]);

  // Handle standard workspace user message
  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const inputToSync = chatInput;
    setChatInput('');
    setLoading(true);

    try {
      // Query server copilot to feel immediately interactive and real!
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputToSync,
          landingPage: {
            id: 'ws-simulation',
            name: 'AstroSphere AI',
            slug: 'astrosphere',
            fontFamily: 'sans',
            theme: {
              primary: '#A78BFA', secondary: '#06B6D4', accent: '#EC4899',
              background: '#0B0C10', surface: '#12131C', text: '#FFFFFF',
              textMuted: '#94A3B8', isDark: true
            },
            sections: []
          }
        })
      });

      const data = await response.json();
      if (data.reply) {
        setChatMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModels[0] || 'gemini-3.5-flash'
        }]);
      } else {
        throw new Error('Fallback response generated');
      }
    } catch (err) {
      // Fallback response with simulated comparison if necessary
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `Highly analytical multi-model synthesis response of prompt: "${inputToSync}". Connected to sandboxed agents. Workspaces are matching variables correctly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModels.join(' + ') || 'gemini-3.5-flash'
        }]);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  // Run Real Perplexity-grade Research with Citation system linked server-side
  const runDeepResearchQuery = async () => {
    if (!researchTopic.trim()) return;
    setLoading(true);
    setResearchLog([
      `🔍 [${new Date().toLocaleTimeString()}] Accessing web grounding proxy gateway...`,
      `🔍 [${new Date().toLocaleTimeString()}] Fetching live googleSearch credentials...`
    ]);

    // Let's create an incremental delay simulator to represent Perplexity steps
    const timer1 = setTimeout(() => {
      setResearchLog(prev => [...prev, `🔍 [${new Date().toLocaleTimeString()}] Aggregating peer academic papers & tech docs index...`]);
    }, 1200);

    const timer2 = setTimeout(() => {
      setResearchLog(prev => [...prev, `🔍 [${new Date().toLocaleTimeString()}] Cross-referencing 5 citation domains to optimize score...`]);
    }, 2400);

    try {
      const response = await fetch('/api/workspace/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: researchTopic })
      });

      const data = await response.json();
      
      clearTimeout(timer1);
      clearTimeout(timer2);

      if (data.text) {
        setResearchResult(data.text);
        setResearchCitations(data.citations || []);
        setResearchLog(prev => [...prev, `✅ [${new Date().toLocaleTimeString()}] Synthetic Multi-Source Report assembled successfully.`]);
      } else {
        throw new Error('Missing text content from API response');
      }
    } catch (err: any) {
      // Offline fallback simulation
      clearTimeout(timer1);
      clearTimeout(timer2);
      setResearchResult(`### Deep Research Report: ${researchTopic}

The reasoning architectural landscapes of the modern AI ecosystem show a massive paradigm shift. 
Recent tests highlight that model parameters of high-performance reasoning tokens differ significantly:

1. **System Compute Leverage**: Comparing deep context pipelines indicates high correlation in multi-turn consistency.
2. **Key Strengths**:
   - **Modern Reasoners**: Exceptional multi-step chain-of-thought calculation patterns. Excellent for complex math, structured algorithms, and raw layout optimization.
   - **Gemini Live Systems**: Ultra-low latency voice-to-voice stream, direct multimodal screen-capture processing, and instant Google Search citations.
3. **Optimized Integration Recommendation**: Deploy full-stack server-side proxies on Node.js / Express backing frontends with clean Tailwind templates. This guarantees secure API keys storage.`);
      setResearchCitations([
        { title: 'Google DeepMind Research Portal', url: 'https://deepmind.google' },
        { title: 'Perplexity AI Blog Updates', url: 'https://perplexity.ai' },
        { title: 'Notion Engineering Architecture', url: 'https://notion.so' }
      ]);
      setResearchLog(prev => [...prev, `⚠️ [${new Date().toLocaleTimeString()}] Grounding returned simulated content due to server sync status.`]);
    } finally {
      setLoading(false);
    }
  };

  // Launch Simulated Crawler Agent for Browser tab
  const triggerBrowserCrawl = () => {
    if (isCrawling) return;
    setIsCrawling(true);
    setBrowserLog(prev => [...prev, `📡 [${new Date().toLocaleTimeString()}] GET ${browserUrl} - Initiating AI secure web proxy...`]);

    setTimeout(() => {
      setBrowserLog(prev => [...prev, `📡 [${new Date().toLocaleTimeString()}] 200 OK - Parsing semantic nodes, DOM elements & headers...`]);
    }, 1000);

    setTimeout(() => {
      setBrowserLog(prev => [...prev, `📡 [${new Date().toLocaleTimeString()}] Scraped completed: Detected text body (${Math.floor(Math.random() * 4000) + 1500} words).`]);
      setBrowserPayload({
        title: browserUrl.replace('https://', '').split('/')[0].toUpperCase() + ' - Enterprise AI Portal',
        description: `This web resource contains optimized layouts, structured schemas, and active subscription conversion forms corresponding with URL parameters from ${browserUrl}.`,
        extractedKeywords: ['Production', 'Proxy', 'Security', 'Waitlist', 'StripeQR', 'LeadForms'],
        sentiment: 'Analytical & Tech-Focused (91% confidence score)',
        formInputs: ['email', 'submit', 'referrer_id'],
        summary: `Successfully completed deep semantic scraping crawl of ${browserUrl}. The current landing page utilizes standard dark-mode gradients, interactive Lucide icon bullet features, and a waitlist list form.`
      });
      setIsCrawling(false);
    }, 2500);
  };

  // Multi-Agent Task Orchestration Planner
  const handleTriggerAgentWorkflow = () => {
    if (!agentInput.trim() || isAgentsWorking) return;

    const task = agentInput;
    setIsAgentsWorking(true);
    setCollaborativeConsole(prev => [...prev, `🚀 CUSTOM COMMAND SIGNED: "${task}"`]);

    setAgents(prev => prev.map(a => {
      if (a.id === 'research') {
        return {
          ...a,
          status: 'running',
          currentTask: 'Synthesizing competitive keyword benchmarks',
          logs: [...a.logs, `🕒 [${new Date().toLocaleTimeString()}] Triggered task: "${task}"`, `🔬 Analyzing web context links...`]
        };
      }
      return a;
    }));

    setTimeout(() => {
      setCollaborativeConsole(prev => [...prev, '🔍 Dr. Orion Research: Google Search query compiled. Found 12 distinct lead categories.']);
      setAgents(prev => prev.map(a => {
        if (a.id === 'research') return { ...a, status: 'completed', logs: [...a.logs, `✅ Found 12 seed concepts. Passing to Vesper SEO...`] };
        if (a.id === 'seo') {
          return {
            ...a,
            status: 'running',
            currentTask: 'Assembling schema.org high-converting JSON microcode',
            logs: [...a.logs, `📈 Received seed domains. Optimizing rich schema metadata.`, `📈 Ranking keywords targets...`]
          };
        }
        return a;
      }));
    }, 2000);

    setTimeout(() => {
      setCollaborativeConsole(prev => [...prev, '💹 Vesper SEO: Assembled compliant ApplicationSchema structure for search crawlers. Sending to Nix Coder agent...']);
      setAgents(prev => prev.map(a => {
        if (a.id === 'seo') return { ...a, status: 'completed', logs: [...a.logs, `✅ Organized SEO titles & schema headers. Passed to Nix Coder.`] };
        if (a.id === 'coder') {
          return {
            ...a,
            status: 'running',
            currentTask: 'Deploying React interactive view components',
            logs: [...a.logs, `💻 Booting terminal sandbox to insert components...`, `💻 Running live test suites...`]
          };
        }
        return a;
      }));
    }, 4500);

    setTimeout(() => {
      setCollaborativeConsole(prev => [...prev, '💻 Nix Coder: Integrated landing page layouts perfectly. Simulated server hot-reload running on Port 3000.']);
      setAgents(prev => prev.map(a => {
        if (a.id === 'coder') return { ...a, status: 'completed', logs: [...a.logs, `✅ Render checked. Code updated inside dynamic workspaces.`] };
        return a;
      }));
      setCollaborativeConsole(prev => [...prev, '✨ WORKFLOW COMPLETE: Combined multi-agent task reports summarized successfully inside AI Notebook doc system.']);
      setIsAgentsWorking(false);
      setAgentInput('');
    }, 7000);
  };

  // Notion-style slash editor command simulators
  const applyNotionFormatting = (formatType: 'heading' | 'bold' | 'list' | 'ai-improve') => {
    if (formatType === 'heading') {
      setActiveDocContent(prev => prev + '\n\n## Custom AI Curated Subhead\n');
    } else if (formatType === 'bold') {
      setActiveDocContent(prev => prev + ' **Enhanced Parameters** ');
    } else if (formatType === 'list') {
      setActiveDocContent(prev => prev + '\n- Optimized Step A\n- Structured Compliance B\n- Verified Citation C\n');
    } else if (formatType === 'ai-improve') {
      setLoading(true);
      setTimeout(() => {
        setActiveDocContent(prev => prev + '\n\n*(AI IMPROVED PERSUASION SCORE)* \n"Leverage our autonomous system proxy nodes to automatically scale waitlists, compile structured JSON-LD schemas, and capture high-intent leads instantly without visual designer overhead." \n');
        setLoading(false);
      }, 1200);
    }
  };

  // Whiteboard drawing simulator
  const handleAddWhiteboardNode = (type: 'rect' | 'circle' | 'arrow') => {
    const newShape = {
      id: Date.now().toString(),
      type,
      x: 100 + Math.random() * 200,
      y: 80 + Math.random() * 100,
      w: type === 'arrow' ? 80 : 120,
      h: type === 'arrow' ? 2 : 60,
      label: type === 'arrow' ? 'Workflow Arc' : `New AI Node ${boardShapes.length + 1}`,
      color: type === 'rect' ? 'border-indigo-400 bg-indigo-500/10' : type === 'circle' ? 'border-pink-400 bg-pink-500/10' : 'bg-zinc-400'
    };
    setBoardShapes(prev => [...prev, newShape]);
  };

  // Cursor Terminal command executing simulation
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput;
    setTerminalHistory(prev => [...prev, `nix@workspace:~$ ${cmd}`]);
    setTerminalInput('');

    setTimeout(() => {
      if (cmd.includes('npm run') || cmd.includes('test')) {
        setTerminalHistory(prev => [...prev, 
          '🧪 RUNNING FLASHFOCUS INTEGRATED WORKSPACE TEST SUITES...',
          '✓ [TEST URL EXPORT] Semantic URL parameters parsing is active (0s)',
          '✓ [TEST CRAWLER] Proxy server routing response on port 3000 (0s)',
          '✓ [TEST SEQUENCER] High-integrity A/B models comparison loaded (0s)',
          '🎉 ALL 3 MAIN WORKSPACE SUITES COMPILING EXCELLENTLY - 100% SUCCESS'
        ]);
      } else if (cmd.includes('ls') || cmd.includes('dir')) {
        setTerminalHistory(prev => [...prev, 'App.tsx   components/   types.ts   presets.ts   index.css   server.ts   package.json']);
      } else if (cmd.includes('clear')) {
        setTerminalHistory([]);
      } else {
        setTerminalHistory(prev => [...prev, `Command '${cmd}' evaluated. Action logged inside nix container workspace backend gateway.`]);
      }
    }, 450);
  };

  // AI Semantic Vector Memory search add
  const handleAddMemory = () => {
    if (!newMemoryText.trim()) return;

    const categories = ['branding', 'billing', 'seo', 'automation', 'user-preference'];
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];

    const newMemValue: MemoryNode = {
      id: Date.now().toString(),
      text: newMemoryText,
      category: selectedCategory,
      vector: [Math.random() * 0.9, Math.random() * 0.9],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMemories(prev => [...prev, newMemValue]);
    setNewMemoryText('');
  };

  const filteredMemories = memories.filter(m => 
    m.text.toLowerCase().includes(memorySearch.toLowerCase()) ||
    m.category.toLowerCase().includes(memorySearch.toLowerCase())
  );

  return (
    <div className="bg-[#040507] text-zinc-100 min-h-screen font-sans border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* GLAMOUR AURA BACKDROP GRADIENTS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[600px] h-[600px] bg-[#EC4899]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* CORE PLATFORM HEADER RAIL */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-[#A78BFA] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10">
            <Cpu className="w-5 h-5 text-black animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-tight text-white uppercase font-mono">FLASHFOCUS</h1>
              <span className="text-[9px] font-black tracking-widest text-[#A78BFA] bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-md uppercase">WORKSPACE OS</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">AUTONOMOUS MULTI-AGENT PRODUCTIVITY HUB • v2.6</p>
          </div>
        </div>

        {/* TOP STATUS LIGHTS */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-[#0A0D14] border border-white/5 px-2.5 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase text-zinc-400 font-bold uppercase">GATEWAY CONNECTED</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0A0D14] border border-white/5 px-2.5 py-1 rounded-full">
            <Database className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span className="text-[10px] uppercase text-zinc-400 font-bold font-mono">ACTIVE PIXEL STORAGE: SECURE</span>
          </div>
        </div>
      </header>

      {/* SYSTEM OPERATIONS NAVIGATION GRID */}
      <div className="grid grid-cols-12 min-h-[calc(100vh-80px)]">
        
        {/* LEFT COMPACT COMMAND RACK */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-white/5 bg-black/40 p-3 space-y-1">
          <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-2.5 pb-2">COMMAND CENTERS</div>

          {([
            { id: 'chat', label: 'Multi-Model Chat', icon: botIcon },
            { id: 'browser', label: 'Live AI Browser', icon: globeIcon },
            { id: 'agents', label: 'Agents Orchestrator', icon: networkIcon },
            { id: 'workspace', label: 'Rich Document Hub', icon: editIcon },
            { id: 'search', label: 'Deep Research Cite', icon: compassIcon },
            { id: 'coder', label: 'Interactive Cursor', icon: codeIcon },
            { id: 'media', label: 'Content Media Lab', icon: mediaIcon },
            { id: 'memory', label: 'Vector Recollect', icon: databaseIcon }
          ] as const).map((sub) => {
            const isSelected = subTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSubTab(sub.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all relative group cursor-pointer ${
                  isSelected 
                    ? 'bg-gradient-to-r from-indigo-500/10 to-transparent border-l-2 border-[#A78BFA] text-white font-bold' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`p-1.5 rounded-lg border text-xs ${
                    isSelected ? 'bg-indigo-500/10 border-indigo-500/20 text-[#A78BFA]' : 'bg-[#0E0F16] border-white/5 text-zinc-500 group-hover:text-white'
                  }`}>
                    {sub.icon()}
                  </span>
                  <span className="text-xs font-semibold">{sub.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-zinc-600 transition-transform ${isSelected ? 'translate-x-1 text-[#A78BFA]' : 'group-hover:translate-x-0.5'}`} />
              </button>
            );
          })}

          {/* Quick Stats Grid widget */}
          <div className="pt-4 mt-4 border-t border-white/5 text-left pl-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">TELEMETRY STATS</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2 bg-[#090A0F] border border-white/5 rounded-xl">
                <span className="text-[8.5px] font-mono text-zinc-500 block">API LATENCY</span>
                <span className="text-xs font-black text-emerald-400 font-mono">18ms</span>
              </div>
              <div className="p-2 bg-[#090A0F] border border-white/5 rounded-xl">
                <span className="text-[8.5px] font-mono text-zinc-500 block">GPU SHARDS</span>
                <span className="text-xs font-black text-indigo-400 font-mono">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAJOR DISPLAY STAGE */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4 lg:p-6 pb-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. MULTI-MODEL CHAT & COMPARE ENGINE */}
            {subTab === 'chat' && (
              <motion.div
                key="chat-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#A78BFA]" />
                      Multi-Model AI Chat & Reasoner Deck
                    </h2>
                    <p className="text-xs text-zinc-400">Run parallel reasoning processes, compare outputs, and leverage long-term memory sync nodes.</p>
                  </div>

                  {/* Mode configurations */}
                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Aura Mode:</span>
                    <select
                      value={reasoningMode}
                      onChange={(e: any) => setReasoningMode(e.target.value)}
                      className="bg-zinc-950 border border-white/5 rounded-lg px-2.5 py-1.5 focus:outline-none text-white focus:border-[#A78BFA] transition-all text-xs"
                    >
                      <option value="standard">Standard Conversational</option>
                      <option value="agent">Autonomous Agent Executor</option>
                      <option value="deep-thought">Deep Thought Reasoning</option>
                      <option value="coder">Precision Web Software Engineer</option>
                      <option value="creative">Creative Copy & Storyteller</option>
                    </select>
                  </div>
                </div>

                {/* Model select controllers */}
                <div className="p-3 bg-zinc-950/60 border border-white/5 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9.5px] font-mono text-zinc-400 font-bold uppercase">Target Model:</span>
                    {['gemini-3.5-flash', 'gpt-4o-concept', 'claude-3.5-sonnet', 'grok-3-live', 'deepseek-r1-thought'].map((model) => {
                      const isChecked = selectedModels.includes(model);
                      return (
                        <button
                          key={model}
                          onClick={() => {
                            if (compareMode) {
                              setSelectedModels(prev => 
                                isChecked ? prev.filter(m => m !== model) : [...prev, model]
                              );
                            } else {
                              setSelectedModels([model]);
                            }
                          }}
                          className={`px-3 py-1 rounded-lg border font-mono text-[9.5px] uppercase font-bold transition-all relative ${
                            isChecked 
                              ? 'bg-indigo-500/10 text-white border-indigo-500/30' 
                              : 'bg-black text-zinc-500 border-white/5 hover:border-white/10'
                          }`}
                        >
                          {model === 'gemini-3.5-flash' ? '💎 Gemini 3.5' : model === 'claude-3.5-sonnet' ? '🍊 Claude 3.5' : model === 'deepseek-r1-thought' ? '🌀 DeepSeek R1' : model === 'gpt-4o-concept' ? '🟢 GPT-4o' : '☣️ Grok 3'}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCompareMode(!compareMode);
                        if (!compareMode && selectedModels.length < 2) {
                          setSelectedModels(['gemini-3.5-flash', 'claude-3.5-sonnet']);
                        } else if (compareMode) {
                          setSelectedModels(['gemini-3.5-flash']);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                        compareMode ? 'bg-[#EC4899]/10 border-[#EC4899]/30 text-[#EC4899]' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                      }`}
                    >
                      <Shuffle className="w-3 h-3" />
                      {compareMode ? 'Dual Model Stream ACTIVE' : 'Toggle Comparison Mode'}
                    </button>
                  </div>
                </div>

                {/* Main conversation pane */}
                <div className="bg-[#050508]/80 border border-white/5 rounded-3xl p-4 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Streaming comparison split layout visualization */}
                  <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                    {chatMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                      >
                        <div className={`p-2 rounded-xl text-lg shrink-0 flex items-center justify-center ${
                          msg.sender === 'user' ? 'bg-[#A78BFA]/10 text-[#A78BFA]' : msg.sender === 'assistant' ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {msg.sender === 'user' ? '👤' : msg.sender === 'assistant' ? '🤖' : '⚙️'}
                        </div>
                        <div>
                          {msg.modelUsed && (
                            <span className="text-[8.5px] font-mono bg-zinc-900 border border-white/5 px-2 py-0.5 rounded text-[#06B6D4] block mb-1 w-max">
                              {msg.modelUsed.toUpperCase()}
                            </span>
                          )}
                          <div className={`rounded-2xl p-3.5 text-xs text-left leading-relaxed ${
                            msg.sender === 'user' 
                              ? 'bg-[#A78BFA] text-black font-medium rounded-tr-none shadow shadow-purple-500/5' 
                              : msg.sender === 'assistant'
                                ? 'bg-zinc-950 border border-white/5 text-zinc-155 rounded-tl-none font-sans'
                                : 'bg-[#080910] border border-white/5 text-zinc-400 font-mono text-[10px]'
                          }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          </div>
                          <span className="text-[8.5px] font-mono text-zinc-650 mt-1 block">{msg.timestamp}</span>
                        </div>
                      </div>
                    ))}

                    {loading && (
                      <div className="flex gap-3 items-center text-zinc-400 text-xs font-mono bg-zinc-950 border border-white/5 rounded-2xl p-4 w-max">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#A78BFA]" />
                        Synthesizing intelligence matrix...
                      </div>
                    )}
                  </div>

                  {/* Built-in Voice simulator indicator overlay */}
                  {isVoiceActive && (
                    <div className="absolute inset-0 bg-[#040509]/95 backdrop-blur-md flex flex-col items-center justify-center space-y-6 z-10 p-6 text-center">
                      <div className="p-4 rounded-full bg-indigo-500/15 border border-indigo-500/25 relative">
                        <Volume2 className="w-12 h-12 text-[#A78BFA] animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-extrabold text-white">AI Voice Mode ACTIVE</h4>
                        <p className="text-xs text-zinc-400 max-w-sm leading-normal">
                          Speak naturally to your workspace copilot. Highly synchronized audio stream on PCM rate 16000Hz is listening.
                        </p>
                      </div>

                      {/* Equalizer waves */}
                      <div className="flex items-end justify-center gap-1.5 h-16 w-64 pt-4">
                        {voiceWave.map((val, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ height: `${val}%` }}
                            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                            className="bg-gradient-to-t from-indigo-500 to-[#EC4899] w-3 rounded-full"
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setIsVoiceActive(false)}
                        className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold font-mono transition-all cursor-pointer"
                      >
                        Disconnect Audio Channel
                      </button>
                    </div>
                  )}

                  {/* Input form */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                        placeholder={`Query multi-model registry using reasoning mode [${reasoningMode}]...`}
                        className="flex-1 bg-zinc-950 border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#A78BFA] transition-all text-xs text-white placeholder-zinc-500 font-sans"
                      />
                      
                      <button
                        type="button"
                        onClick={() => setIsVoiceActive(true)}
                        className="p-3 rounded-xl bg-[#090A12] border border-white/5 text-zinc-400 hover:text-[#A78BFA] hover:border-indigo-500/20 active:scale-95 transition-all text-xs cursor-pointer"
                        title="Start low-latency Voice chat"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleSendChatMessage}
                        disabled={loading}
                        className="px-4 py-3 bg-white hover:bg-zinc-200 text-black font-extrabold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Execute
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
                      <span>Pro-tip: Type "/improve" to optimize copy inside the notebook Doc editor</span>
                      <span>Token usage: 1042 / 200,000 max context</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. LIVE BROWSER CONNECTED SUBSYSTEM */}
            {subTab === 'browser' && (
              <motion.div
                key="browser-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left font-mono"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2 font-sans">
                    <Globe className="w-5 h-5 text-indigo-400" />
                    Live Browser Connected AI Sandbox
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">Let real-time autonomous processes browse websites, translate copy, parse leads, and fill forms automatically.</p>
                </div>

                {/* Virtual Browser Window Header */}
                <div className="bg-[#050508]/80 border border-white/5 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center gap-3 bg-[#0A0B10] px-4 py-2.5 rounded-2xl border border-white/5 gap-2">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                    </div>

                    <div className="flex-1 flex items-center gap-2 bg-zinc-950 px-3.5 py-1.5 border border-white/5 rounded-lg text-xs leading-none text-zinc-300">
                      <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <input
                        type="text"
                        value={browserUrl}
                        onChange={(e) => setBrowserUrl(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white font-mono text-xs select-all text-left"
                      />
                    </div>

                    <button
                      onClick={triggerBrowserCrawl}
                      disabled={isCrawling}
                      className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-[10px] font-bold uppercase transition-all flex items-center gap-1 border border-indigo-600 hover:bg-indigo-600 disabled:opacity-50 cursor-pointer text-left font-sans"
                    >
                      {isCrawling ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3.5 h-3.5 shrink-0 text-amber-300" />}
                      Crawl & Analyz
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    {/* Log Terminal Screen (left side - span 4) */}
                    <div className="col-span-12 md:col-span-4 bg-[#09090E] rounded-2xl border border-white/5 p-4 space-y-3 flex flex-col justify-between max-h-[350px]">
                      <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Crawler Session Terminal</span>
                        <span className="text-[8.5px] text-zinc-650">PROXY STREAM AUDITOR</span>
                      </div>
                      
                      <div className="space-y-1.5 overflow-y-auto max-h-[200px] text-[10px] pr-1 scrollbar-thin">
                        {browserLog.map((log, idx) => (
                          <div key={idx} className="text-zinc-400 text-left truncate leading-tight">
                            {log}
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[8.5px] text-zinc-500 block uppercase">SANDBOX AGENT PORT</span>
                        <span className="text-[10px] font-bold text-[#EC4899]">LOCAL:3000 {"->"} WORKSPACE_PIPE</span>
                      </div>
                    </div>

                    {/* Extracted payload window (right side - span 8) */}
                    <div className="col-span-12 md:col-span-8 bg-[#09090E] rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-3">
                          {['view', 'analysis', 'extracted'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setBrowserActiveTab(tab as any)}
                              className={`text-[10px] font-bold uppercase tracking-wider ${browserActiveTab === tab ? 'text-[#06B6D4] border-b border-[#06B6D4] pb-1' : 'text-zinc-500 hover:text-zinc-350'} font-sans cursor-pointer`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-[#A78BFA] px-1.5 py-0.5 rounded-md">VIRTUAL SIMULATOR</span>
                      </div>

                      <div className="p-1 space-y-3 min-h-[180px] text-zinc-300 text-xs">
                        {browserActiveTab === 'view' && (
                          <div className="space-y-2 text-left">
                            <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                              <span className="text-[8.5px] text-zinc-500 block">WEBPAGE TITLE</span>
                              <span className="text-[12.5px] font-bold text-white font-sans">{browserPayload.title}</span>
                            </div>
                            <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                              <span className="text-[8.5px] text-zinc-500 block">META DESCRIPTION COPY</span>
                              <span className="text-[11px] leading-relaxed text-zinc-300 font-sans mt-1 block">{browserPayload.description}</span>
                            </div>
                          </div>
                        )}

                        {browserActiveTab === 'analysis' && (
                          <div className="space-y-2 text-left">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                                <span className="text-[8.5px] text-zinc-500 block">EMOTIONAL SENTIMENT</span>
                                <span className="text-xs font-bold text-emerald-400 font-mono mt-1 block">{browserPayload.sentiment}</span>
                              </div>
                              <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                                <span className="text-[8.5px] text-zinc-500 block font-sans">DETECTED FORM FIELDS</span>
                                <span className="text-xs font-bold text-[#A78BFA] font-mono mt-1 block">{browserPayload.formInputs.join(', ')}</span>
                              </div>
                            </div>
                            <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                              <span className="text-[8.5px] text-zinc-500 block">AI SYNTHETIC SUMMARY</span>
                              <span className="text-[11px] leading-relaxed text-zinc-350 font-sans mt-1 block">{browserPayload.summary}</span>
                            </div>
                          </div>
                        )}

                        {browserActiveTab === 'extracted' && (
                          <div className="p-3 bg-zinc-950 border border-white/5 rounded-2xl text-left space-y-2">
                            <span className="text-[8.5px] text-zinc-500 block uppercase font-mono">SEGMENTED EXTRACTED KEYWORDS</span>
                            <div className="flex flex-wrap gap-1.5">
                              {browserPayload.extractedKeywords.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[#06B6D4] text-[10px] font-mono">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <blockquote className="p-2.5 border-l-2 border-indigo-500/40 bg-zinc-900/40 rounded-r-xl text-[10.5px] leading-relaxed text-zinc-400 font-sans mt-3">
                              "The browser crawler captures exactly what standard search engines like Google and DuckDuckGo inspect to formulate relevance scoring calculations."
                            </blockquote>
                          </div>
                        )}
                      </div>

                      {/* Web actions strip */}
                      <div className="pt-3 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-2 text-[9px] font-sans">
                        <button className="p-1 px-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 rounded-lg text-emerald-400 uppercase font-mono cursor-pointer truncate">
                          Fill Smart Forms
                        </button>
                        <button className="p-1 px-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 rounded-lg text-[#06B6D4] uppercase font-mono cursor-pointer truncate">
                          Grab Mail Leads
                        </button>
                        <button className="p-1 px-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 rounded-lg text-indigo-400 uppercase font-mono cursor-pointer truncate">
                          Check SEO Rank
                        </button>
                        <button className="p-1 px-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 rounded-lg text-pink-400 uppercase font-mono cursor-pointer truncate">
                          Translate Page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. AUTONOMOUS AGENTS OPERATIONS */}
            {subTab === 'agents' && (
              <motion.div
                key="agents-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <BotsIcon className="w-5 h-5 text-emerald-400" />
                    Autonomous Multi-Agent Orchestrator
                  </h2>
                  <p className="text-xs text-zinc-400">Delegate tasks and let distinct model agents plan, communicate, code, and optimize workflows in parallel.</p>
                </div>

                {/* Grid of registered Agents */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {agents.map((agent) => (
                    <div 
                      key={agent.id} 
                      className={`p-4 rounded-3xl border ${
                        agent.status === 'running' 
                          ? 'border-[#A78BFA] shadow-[0_0_15px_rgba(168,85,247,0.1)] bg-indigo-950/10' 
                          : 'border-white/5 bg-[#050508]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${agent.color} flex items-center justify-center text-lg`}>
                            {agent.avatar}
                          </span>
                          <div>
                            <h4 className="text-xs font-black text-white">{agent.name}</h4>
                            <span className="text-[9.5px] text-zinc-500 font-mono italic block mt-0.5">{agent.role}</span>
                          </div>
                        </div>

                        {agent.status === 'idle' ? (
                          <span className="inline-flex h-2 w-2 rounded-full bg-zinc-650" />
                        ) : agent.status === 'running' ? (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Current action text */}
                      <div className="p-2.5 bg-zinc-950 border border-white/5 rounded-xl font-mono text-[9px] mt-4">
                        <span className="text-zinc-600 block">CURRENT MISSION</span>
                        <span className={`font-bold block mt-0.5 truncate ${agent.status === 'running' ? 'text-indigo-400 animate-pulse' : 'text-zinc-400'}`}>
                          {agent.currentTask || 'Idle - awaiting task dispatch'}
                        </span>
                      </div>

                      {/* Recent Agent operations logs */}
                      <div className="mt-3.5 text-[9px] font-mono text-zinc-550 space-y-1 bg-black/30 p-2 rounded-lg max-h-[80px] overflow-y-auto">
                        {agent.logs.map((log, i) => (
                          <div key={i} className="truncate">{log}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agent collaboration command console box */}
                <div className="bg-zinc-950 border border-white/5 rounded-3xl p-4 flex flex-col justify-between max-h-[300px]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" />
                      Inter-Agent Shared Protocol Console
                    </span>
                    <span className="text-[8.5px] font-mono text-zinc-600">SYMMETRIC SYNC</span>
                  </div>

                  {/* Logs stream */}
                  <div className="py-3 font-mono text-[10.5px] space-y-1.5 overflow-y-auto min-h-[100px] text-zinc-400 max-h-[150px] scrollbar-thin">
                    {collaborativeConsole.map((line, idx) => (
                      <div key={idx} className="leading-normal">
                        {line.startsWith('✓') || line.startsWith('✨') || line.startsWith('✅') ? (
                          <span className="text-emerald-400">{line}</span>
                        ) : line.startsWith('🚀') || line.includes('CUSTOM') ? (
                          <span className="text-indigo-300 font-bold">{line}</span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    ))}

                    {isAgentsWorking && (
                      <div className="flex items-center gap-2 text-[9.5px] text-indigo-400 animate-pulse py-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Dr. Orion, Vesper & Nix Coder collaborating on optimization loop...
                      </div>
                    )}
                  </div>

                  {/* Input system command form */}
                  <div className="pt-3 border-t border-white/5 flex gap-2">
                    <input
                      type="text"
                      value={agentInput}
                      onChange={(e) => setAgentInput(e.target.value)}
                      placeholder="Enter workflow e.g. 'Optimize AstroSphere brand SEO headlines and output react container code'..."
                      className="flex-1 bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-indigo-500/30 font-mono"
                      onKeyDown={(e) => e.key === 'Enter' && handleTriggerAgentWorkflow()}
                    />
                    <button
                      onClick={handleTriggerAgentWorkflow}
                      disabled={isAgentsWorking}
                      className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-xl text-xs transition-all uppercase font-sans cursor-pointer disabled:opacity-50"
                    >
                      Dispatch
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. WORKSPACE RICH DOCUMENTS & WHITEBOARD CANVAS & Formula spreadsheets */}
            {subTab === 'workspace' && (
              <motion.div
                key="workspace-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <Layout className="w-5 h-5 text-amber-400" />
                    Bento Notion AI Workspace & Documents Vault
                  </h2>
                  <p className="text-xs text-zinc-400">Manage rich-document campaigns, collaborative spreadsheets, and interact with free-form whiteboards directly.</p>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  
                  {/* Left Notes Doc Area (Span 7) */}
                  <div className="col-span-12 lg:col-span-7 bg-[#050508]/85 border border-white/5 p-4 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <select
                          value={activeDocId}
                          onChange={(e) => setActiveDocId(e.target.value)}
                          className="bg-zinc-950 border border-white/5 rounded px-2 py-1 text-xs font-bold text-white focus:outline-none"
                        >
                          {docs.map(d => (
                            <option key={d.id} value={d.id}>{d.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newDoc = {
                              id: Date.now().toString(),
                              title: `SaaS Draft Node #${docs.length + 1}`,
                              content: `# New campaign blueprint Draft\nWrite custom conversion metrics here...`
                            };
                            setDocs(prev => [...prev, newDoc]);
                            setActiveDocId(newDoc.id);
                          }}
                          className="px-2 py-1 bg-zinc-950 border border-white/5 rounded text-[10px] uppercase font-mono hover:text-white cursor-pointer"
                        >
                          New Document
                        </button>
                      </div>
                    </div>

                    {/* Notion style controls */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 border border-white/5 rounded-xl text-[9px] font-mono">
                      <button onClick={() => applyNotionFormatting('heading')} className="p-1 px-2 hover:bg-white/5 rounded text-zinc-450 hover:text-white cursor-pointer">Title H2</button>
                      <button onClick={() => applyNotionFormatting('bold')} className="p-1 px-2 hover:bg-white/5 rounded text-zinc-450 hover:text-white cursor-pointer">BoldText</button>
                      <button onClick={() => applyNotionFormatting('list')} className="p-1 px-2 hover:bg-white/5 rounded text-zinc-450 hover:text-white cursor-pointer">Bulletリスト</button>
                      
                      <span className="w-px h-3 bg-white/5 mx-1" />

                      <button
                        onClick={() => applyNotionFormatting('ai-improve')}
                        disabled={loading}
                        className="p-1 px-2.5 bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] font-bold rounded flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#A78BFA] shrink-0" />
                        AI Copy Enhancer
                      </button>
                    </div>

                    {/* Rich text block */}
                    <textarea
                      value={activeDocContent}
                      onChange={(e) => setActiveDocContent(e.target.value)}
                      className="w-full h-64 bg-transparent focus:outline-none text-zinc-300 text-xs font-sans placeholder-zinc-600 leading-relaxed font-mono whitespace-pre-wrap select-all border border-transparent focus:border-white/5 p-2 rounded-xl"
                      placeholder="Use / commands or select quick markdown tags to design..."
                    />

                    {/* Save or sync indicators */}
                    <div className="flex items-center justify-between text-[10px] text-zinc-650 font-mono border-t border-white/5 pt-3">
                      <span>DOC ID: doc_id_{activeDocId} • Char count: {activeDocContent.length}</span>
                      <span className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                        ✓ Sync Auto-Persistent
                      </span>
                    </div>
                  </div>

                  {/* Right modules (Spreadsheet & Whiteboard tab splits - Span 5) */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                    
                    {/* Matrix spreadsheet widget */}
                    <div className="bg-[#050508]/85 border border-white/5 rounded-3xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#06B6D4] flex items-center gap-1.5">
                          <Table className="w-3.5 h-3.5" />
                          Formula Spreadsheet Engine
                        </span>
                        <span className="text-[8px] font-mono text-zinc-600">IN-MEMORY CALCULATOR</span>
                      </div>

                      {/* Formula bar */}
                      <div className="flex items-center gap-2 bg-transparent text-[10px] font-mono">
                        <span className="bg-zinc-900 border border-white/5 rounded px-2.5 py-1 text-zinc-400 font-extrabold uppercase shrink-0">
                          {selectedCell || 'None'}
                        </span>
                        <input
                          type="text"
                          value={selectedCell ? (sheetData[selectedCell]?.formula || sheetData[selectedCell]?.value || '') : ''}
                          onChange={(e) => {
                            if (!selectedCell) return;
                            const val = e.target.value;
                            setSheetData(prev => ({
                              ...prev,
                              [selectedCell]: {
                                ...prev[selectedCell],
                                value: val.startsWith('=') ? (evalSimulatedFormula(val, prev) || prev[selectedCell]?.value || '0') : val,
                                formula: val.startsWith('=') ? val : undefined
                              }
                            }));
                          }}
                          className="flex-1 bg-zinc-950 border border-white/5 rounded px-2 py-1 focus:outline-none text-zinc-200"
                          placeholder="Select cell below or input formula e.g. =B2 * 120"
                          disabled={!selectedCell}
                        />
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px] font-mono border-collapse">
                          <thead>
                            <tr className="bg-zinc-950 text-zinc-600 text-left border-b border-white/5">
                              <th className="p-1 px-2 border-r border-white/5 w-12">CELL</th>
                              <th className="p-1 px-2 border-r border-white/5">A (Key)</th>
                              <th className="p-1 px-2 border-r border-white/5">B (Leads)</th>
                              <th className="p-1 px-2">D (Revenue INR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-zinc-400">
                            {['2', '3', '4'].map((row) => (
                              <tr key={row} className="hover:bg-white/5">
                                <td className="p-1 px-2 text-zinc-600 border-r border-white/5 text-center font-bold">{row}</td>
                                <td 
                                  onClick={() => setSelectedCell(`A${row}`)}
                                  className={`p-1 px-2 border-r border-white/5 cursor-pointer hover:text-white ${selectedCell === `A${row}` ? 'bg-indigo-500/10 text-white' : ''}`}
                                >
                                  {sheetData[`A${row}`]?.value}
                                </td>
                                <td 
                                  onClick={() => setSelectedCell(`B${row}`)}
                                  className={`p-1 px-2 border-r border-white/5 cursor-pointer hover:text-white ${selectedCell === `B${row}` ? 'bg-indigo-500/10 text-white' : ''}`}
                                >
                                  {sheetData[`B${row}`]?.value}
                                </td>
                                <td 
                                  onClick={() => setSelectedCell(`D${row}`)}
                                  className={`p-1 px-2 cursor-pointer font-bold hover:text-[#06B6D4] ${selectedCell === `D${row}` ? 'bg-indigo-500/10 text-[#06B6D4]' : 'text-emerald-400'}`}
                                >
                                  {sheetData[`D${row}`]?.value} {sheetData[`D${row}`]?.formula && <span className="text-[7.5px] text-zinc-600 font-normal block italic">{sheetData[`D${row}`]?.formula}</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Whiteboard Interactive Sketch area */}
                    <div className="bg-[#050508]/85 border border-white/5 rounded-3xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#EC4899] flex items-center gap-1.5 font-sans">
                          <Compass className="w-3.5 h-3.5 text-[#EC4899]" />
                          Whiteboard Wireframe Stage
                        </span>
                        
                        <div className="flex gap-1.5 text-[8.5px] font-sans">
                          <button onClick={() => handleAddWhiteboardNode('rect')} className="px-1.5 py-0.5 bg-zinc-950 border border-white/5 rounded text-white font-mono hover:text-[#EC4899] cursor-pointer">Add Rect</button>
                          <button onClick={() => handleAddWhiteboardNode('circle')} className="px-1.5 py-0.5 bg-zinc-950 border border-white/5 rounded text-white font-mono hover:text-[#EC4899] cursor-pointer">Add Circle</button>
                        </div>
                      </div>

                      <div className="w-full h-44 border border-dashed border-white/5 bg-[#08090E] rounded-2xl relative overflow-hidden select-none p-3 space-y-1 scrollbar-thin overflow-y-auto">
                        <span className="text-[8px] text-zinc-650 absolute top-2 right-2">ACTIVE VECTOR WIREFRAME CANVAS</span>
                        
                        <div className="space-y-1.5 pt-1">
                          {boardShapes.map((shape) => (
                            <div 
                              key={shape.id} 
                              className={`p-2 border rounded-xl text-[9px] font-mono flex items-center justify-between gap-15 ${shape.color}`}
                            >
                              <span>
                                {shape.type === 'rect' ? '▮' : shape.type === 'circle' ? '●' : '→'} <strong>{shape.label}</strong>
                              </span>
                              <button 
                                onClick={() => setBoardShapes(prev => prev.filter(s => s.id !== shape.id))}
                                className="text-[8.5px] text-zinc-650 hover:text-rose-450 cursor-pointer"
                              >
                                [del]
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Whiteboard visual intelligence tip */}
                      <div className="p-3 bg-indigo-950/15 border border-indigo-500/20 rounded-xl relative flex justify-between items-center">
                        <p className="text-[10px] font-sans text-zinc-400 max-w-xs leading-normal">
                          🎉 <strong>AI Sketch Enhancer</strong> ready to compile conceptual wires into full-stack Tailwind widgets.
                        </p>
                        <button
                          onClick={() => {
                            setBoardShapes(prev => [
                              ...prev,
                              { id: 'enh1', type: 'circle', x: 0, y: 0, w: 0, h: 0, label: '★ SEO Auto Crawler Node Compliant', color: 'border-emerald-500 bg-emerald-500/15 text-emerald-400' }
                            ]);
                          }}
                          className="px-2 py-0.5 rounded bg-indigo-500 text-white font-semibold text-[8px] font-mono cursor-pointer shrink-0"
                        >
                          Compile Schema
                        </button>
                      </div>
                    </div>

                    {/* Kanban Kanban Tasks Column widget */}
                    <div className="bg-[#050508]/85 border border-white/5 rounded-3xl p-4 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="text-[10.5px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5 font-sans">
                          <ListTodo className="w-3.5 h-3.5" />
                          Waitlist Kanban Planner
                        </span>
                        <button 
                          onClick={() => {
                            const newTask: KanbanTask = {
                              id: Date.now().toString(),
                              title: `SaaS Feature #${kanbanTasks.length + 1}`,
                              desc: 'Determine layout metric and target tracking hooks.',
                              priority: 'medium',
                              status: 'todo'
                            };
                            setKanbanTasks(prev => [...prev, newTask]);
                          }}
                          className="px-2 py-0.5 rounded bg-zinc-950 border border-white/5 font-mono text-[8px] hover:text-white cursor-pointer"
                        >
                          + Task
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-left">
                        {['todo', 'progress'].map((colStatus) => (
                          <div key={colStatus} className="p-2 bg-zinc-950 rounded-2xl border border-white/5 space-y-2">
                            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block border-b border-white/5 pb-1">
                              {colStatus === 'todo' ? '✏️ BACKLOG/TODO' : '⚡ ACTIVE WORK'}
                            </span>
                            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-0.5 scrollbar-thin">
                              {kanbanTasks.filter(k => k.status === colStatus).map(task => (
                                <div key={task.id} className="p-2 bg-[#090A0E] border border-white/5 rounded-xl text-[9.5px] space-y-1 relative group">
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="font-extrabold text-[#A78BFA] leading-none truncate block max-w-[120px]">
                                      {task.title}
                                    </span>
                                    <span className={`text-[7px] px-1 rounded uppercase font-bold ${
                                      task.priority === 'critical' ? 'bg-rose-500/10 text-rose-400' : 'bg-zinc-800 text-zinc-500'
                                    }`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                  <p className="text-zinc-500 leading-tight font-sans text-[8.5px]">{task.desc}</p>
                                  {task.aiTag && (
                                    <span className="inline-flex px-1 bg-indigo-500/10 text-indigo-400 text-[7px] font-mono rounded">
                                      {task.aiTag}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. ADVANCED RESEARCH ENGINE WITH CITES */}
            {subTab === 'search' && (
              <motion.div
                key="research-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-400" />
                    Copernicus AI Deep Research & Cite Engine
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">Query real-time Google Search grounding. Generates structured academic reports with fully verifiable citations.</p>
                </div>

                <div className="bg-[#050508]/85 border border-white/5 rounded-3xl p-5 space-y-4">
                  {/* Research search input block */}
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="flex-1 flex items-center gap-2.5 bg-black px-4 py-3 rounded-2xl border border-white/5">
                      <Search className="w-4 h-4 text-zinc-500 shrink-0" />
                      <input
                        type="text"
                        value={researchTopic}
                        onChange={(e) => setResearchTopic(e.target.value)}
                        placeholder="Type any deep-intelligence topic to research on the active Web..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-xs text-white placeholder-zinc-500"
                        onKeyDown={(e) => e.key === 'Enter' && runDeepResearchQuery()}
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs">
                      <button
                        onClick={() => setResearchDeepMode(!researchDeepMode)}
                        className={`px-3 py-2.5 rounded-xl border font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                          researchDeepMode ? 'bg-[#A78BFA]/10 border-[#A78BFA]/30 text-[#A78BFA]' : 'bg-zinc-950 text-zinc-550 border-white/5'
                        }`}
                      >
                        Deep thought Mode: {researchDeepMode ? 'ON' : 'OFF'}
                      </button>

                      <button
                        onClick={runDeepResearchQuery}
                        disabled={loading}
                        className="px-5 py-3 bg-white text-black font-extrabold rounded-2xl flex items-center gap-1.5 text-xs uppercase cursor-pointer disabled:opacity-50"
                      >
                        {loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                        Synthesize Report
                      </button>
                    </div>
                  </div>

                  {/* Research activity logs */}
                  {researchLog.length > 0 && (
                    <div className="p-3.5 bg-zinc-950 rounded-2xl border border-white/5 space-y-0.5 text-[9px] font-mono text-zinc-500 leading-normal">
                      <span className="text-white block pb-1 border-b border-white/5 mb-1.5 uppercase tracking-wider font-extrabold">Active Synthesis Monitor</span>
                      {researchLog.map((log, idx) => (
                        <div key={idx} className={log.includes('✅') ? 'text-emerald-400' : log.includes('⚠️') ? 'text-amber-400 font-bold' : ''}>
                          {log}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Major structured report render block */}
                  <div className="grid grid-cols-12 gap-4">
                    
                    {/* Rendered report pane (Span 8) */}
                    <div className="col-span-12 md:col-span-8 bg-[#090A0E] rounded-2xl border border-white/5 p-4.5 min-h-[300px] text-zinc-155 text-xs select-all">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                        <span className="text-[10px] font-mono uppercase font-bold text-indigo-400">RESEARCH STATEMENT REPORT</span>
                        <span className="text-[8.5px] font-mono text-zinc-650">CRAWLED COMPILER</span>
                      </div>

                      {researchResult ? (
                        <div className="font-sans leading-relaxed space-y-3 prose prose-invert overflow-y-auto max-h-[380px] text-zinc-300 pr-1 scrollbar-thin">
                          <p className="whitespace-pre-wrap">{researchResult}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center min-h-[220px] text-center space-y-2">
                          <HelpCircle className="w-9 h-9 text-zinc-700" />
                          <p className="text-zinc-650 text-xs font-mono">No research loaded. Type a question and click synthesis above.</p>
                        </div>
                      )}
                    </div>

                    {/* Sources citation list (Span 4) */}
                    <div className="col-span-12 md:col-span-4 bg-[#090A0E] rounded-2xl border border-white/5 p-4 flex flex-col justify-between max-h-[350px]">
                      <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Indexed Sources & Citations</span>
                        <span className="text-[8.5px] text-zinc-650 font-mono">VERIFIABLE REAL-TIME URLS</span>
                      </div>

                      <div className="space-y-2.5 overflow-y-auto max-h-[240px] pr-1 py-2 scrollbar-thin">
                        {researchCitations.length > 0 ? (
                          researchCitations.map((cite, idx) => (
                            <a
                              key={idx}
                              href={cite.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 bg-black/40 border border-white/5 rounded-xl flex items-start gap-2 text-[10px] leading-tight hover:border-indigo-400/30 transition-all text-zinc-300 hover:text-white group block"
                            >
                              <span className="w-5 h-5 bg-indigo-500/10 text-indigo-400 font-mono font-bold flex items-center justify-center rounded-lg text-[9.5px]">
                                {idx + 1}
                              </span>
                              <div className="flex-1 truncate">
                                <span className="font-extrabold block truncate font-sans">{cite.title}</span>
                                <span className="text-[8.5px] text-zinc-600 block truncate group-hover:text-indigo-400">{cite.url}</span>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-700 group-hover:text-white shrink-0 mt-0.5" />
                            </a>
                          ))
                        ) : (
                          <div className="text-center py-12 text-zinc-650 text-[10px] font-mono">
                            No source citations generated yet.
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-zinc-600">
                        TRUST SCORE INDEX: 100% MATCH
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. AI CODING STUDIO & TERMINAL PREVIEW */}
            {subTab === 'coder' && (
              <motion.div
                key="coder-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    Cursor-Style IDE & Terminal Sandbox
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">Simulate production container compilation. Edit React TypeScript, run local terminal environments, and render live preview results.</p>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  
                  {/* Left Code Editor pane (Span 7) */}
                  <div className="col-span-12 lg:col-span-7 flex flex-col space-y-4 bg-zinc-950 rounded-3xl border border-white/5 p-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
                        <Terminal className="w-4 h-4 text-[#A78BFA]" />
                        HighConvertingHero.tsx
                      </div>
                      <span className="text-[8.5px] font-mono text-zinc-650 px-2 py-0.5 rounded border border-white/5 bg-black">TYPESCRIPT REACT</span>
                    </div>

                    <textarea
                      value={codeContent}
                      onChange={(e) => setCodeContent(e.target.value)}
                      className="w-full h-[320px] bg-transparent text-zinc-300 font-mono text-[11px] leading-relaxed select-all border-none focus:outline-none focus:ring-0 p-1 resize-y"
                    />

                    {/* Editor actions bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px]">
                      <span className="text-zinc-650">Lines: {codeContent.split('\n').length} • UTF-8</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTerminalHistory(prev => [...prev, '✓ Compiling build bundle...', '✓ Hot reload success inside preview frame!']);
                          }}
                          className="px-3 py-1 bg-[#A78BFA] text-black font-extrabold rounded-lg text-[9px] uppercase cursor-pointer"
                        >
                          Trigger Complier Dev
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right preview and Terminal execution (Span 5) */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                    
                    {/* Live HTML view rendering */}
                    <div className="bg-[#050510] border border-white/5 rounded-3xl p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#A78BFA] flex items-center gap-1.5 font-sans">
                          <Eye className="w-4 h-4 text-emerald-400 animate-pulse" />
                          Reactive Live Browser Frame
                        </span>
                        <span className="text-[8.5px] font-mono text-zinc-600">PORT:3000 VIEW</span>
                      </div>

                      {/* We can construct a minimal sandbox display */}
                      <div className="w-full min-h-[160px] bg-zinc-950 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center text-center relative overflow-hidden mt-3 font-sans pb-6">
                        <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-[#A78BFA] px-1.5 py-0.5 rounded uppercase font-black tracking-wider absolute top-2.5 left-2.5">FRAME PREVIEW</span>
                        <h4 className="text-zinc-200 font-black text-sm max-w-sm">Scale Your Multi-Agent Workspaces Automatically</h4>
                        <p className="text-zinc-550 text-[10.5px] max-w-xs leading-relaxed mt-2">Let autonomies optimize schemas, persistent invoices, and collect waitlist leads.</p>
                        <button className="p-1 px-4.5 bg-white text-black font-extrabold text-[10px] rounded-lg mt-4 shadow-xl hover:bg-zinc-200 transition-all cursor-pointer">
                          Join Waitlist Now
                        </button>
                      </div>
                    </div>

                    {/* Integrated simulator bash Terminal panel */}
                    <div className="bg-black border border-white/5 rounded-3xl p-4 flex flex-col justify-between h-[210px] font-mono">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                        <span className="text-[9.5px] font-mono font-bold text-zinc-400 flex items-center gap-1.5 uppercase">
                          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                          Terminal VM Console Sandbox
                        </span>
                        <span className="text-[8px] text-zinc-650">nix_node_v1.2</span>
                      </div>

                      {/* Command output */}
                      <div className="flex-1 py-1 overflow-y-auto text-[10px] text-zinc-400 gap-1 space-y-1 mt-2 max-h-[110px] scrollbar-thin pl-0.5">
                        {terminalHistory.map((line, idx) => (
                          <div key={idx} className={line.startsWith('✓') ? 'text-emerald-400' : line.startsWith('nix@workspace') ? 'text-indigo-400' : ''}>
                            {line}
                          </div>
                        ))}
                      </div>

                      {/* Terminal action input */}
                      <form onSubmit={handleTerminalSubmit} className="pt-2 border-t border-zinc-900 flex gap-2">
                        <span className="text-emerald-500 text-[11px] font-bold shrink-0">$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="Type command e.g. 'npm run test' or 'ls'..."
                          className="flex-1 bg-transparent border-none text-[11.5px] text-zinc-100 placeholder-zinc-700 font-mono focus:outline-none"
                        />
                      </form>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 7. CONTENT CREATION STUDIO LAB */}
            {subTab === 'media' && (
              <motion.div
                key="media-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-teal-400" />
                    AI Multimedia Copywriting & TTS Narration Lab
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans font-medium">Compose hyper-converting articles and trigger speech-to-audio narration with customizable prebuilt speakers.</p>
                </div>

                <div className="bg-[#050508]/85 border border-white/5 rounded-3xl p-5 space-y-4 font-mono text-xs">
                  <div className="flex flex-col md:flex-row gap-4">
                    
                    {/* Write text panel (Span 6) */}
                    <div className="flex-1 space-y-3">
                      <div className="p-3 bg-zinc-950 border border-white/5 rounded-2xl">
                        <span className="text-[8.5px] text-zinc-550 block font-mono">CAMPAIGN ARTICLE TOPIC</span>
                        <input
                          type="text"
                          value={blogTopic}
                          onChange={(e) => setBlogTopic(e.target.value)}
                          className="w-full bg-transparent border-none focus:outline-none text-zinc-100 font-sans text-xs mt-1"
                        />
                      </div>

                      {/* Tone and speech parameters */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-zinc-950 border border-white/5 rounded-2xl text-left">
                          <span className="text-[8.5px] text-zinc-550 block">CHOSEN INTENSITY SPEAKER</span>
                          <select
                            value={audioVoice}
                            onChange={(e: any) => setAudioVoice(e.target.value)}
                            className="bg-transparent border-none text-white text-xs mt-1 w-full focus:outline-none"
                          >
                            <option value="Zephyr">Zephyr (Deep Male Cinematic)</option>
                            <option value="Kore">Kore (Clear Professional Female)</option>
                            <option value="Puck">Puck (Cheerful Enthusiastic)</option>
                            <option value="Charon">Charon (Calm Conversationalist)</option>
                          </select>
                        </div>

                        <div className="p-3 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col justify-between">
                          <span className="text-[8.5px] text-zinc-550 block">CRAWLER OPTIMIZATION</span>
                          <span className="text-xs font-black text-emerald-400 mt-1">SEO Compliant (100%)</span>
                        </div>
                      </div>

                      {/* Generation trigger */}
                      <button
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => {
                            setBlogGenerated(`### Unleashing Leverage: Multi-Agent Systems inside ASTROSPHERE

The modern operational system for work demands next-generation autonomy. Inside the AstroSphere framework, a research agent identifies keywords, a designer plans typography layout configurations, and a software compiler writes React code to save teams 16+ hours every week.

#### Essential Takeaways
- **Instant Parallelization**: Run GPT and Gemini together to contrast answers.
- **Zero Friction Billing**: UPI QR payment structures trigger direct conversions without card-checkout bounce rates.`);
                            setLoading(false);
                          }, 1400);
                        }}
                        disabled={loading}
                        className="p-3 bg-gradient-to-tr from-teal-400 to-indigo-500 hover:from-teal-500 hover:to-indigo-600 text-black font-extrabold rounded-xl w-full text-xs font-sans transition-all cursor-pointer disabled:opacity-50"
                      >
                        {loading ? 'Assembling campaign metrics...' : '✨ Autoconfigure Landing Article & Audio Script'}
                      </button>
                    </div>

                    {/* Result outputs area */}
                    <div className="flex-1 bg-[#090A0E] rounded-2xl border border-white/5 p-4.5 space-y-3">
                      <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">Structured Media Draft Output</span>
                        <span className="text-[8.5px] text-zinc-650">GENERATED LAYOUT COPY</span>
                      </div>

                      <div className="min-h-[140px] text-zinc-350 bg-black/40 border border-white/5 rounded-xl p-3 font-sans leading-relaxed text-xs max-h-[180px] overflow-y-auto scrollbar-thin">
                        {blogGenerated ? (
                          <p className="whitespace-pre-wrap">{blogGenerated}</p>
                        ) : (
                          <div className="text-zinc-700 italic font-mono text-[10.5px]">Awaiting media compiler task trigger...</div>
                        )}
                      </div>

                      {/* Simulated Audio Narration Deck with voice list */}
                      <div className="p-3 bg-zinc-950 border border-[#A78BFA]/20 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 rounded-xl bg-indigo-500/10 text-[#A78BFA]">
                            <Volume2 className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-[9.5px] font-extrabold text-white block">AI AUDIO NARRATOR PORT</span>
                            <span className="text-[8px] text-zinc-600 uppercase">VoiceName: {audioVoice} • SampleRate 24000 PCM</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (voicePlaybackActive) {
                              setVoicePlaybackActive(false);
                            } else {
                              setVoicePlaybackActive(true);
                              setTimeout(() => setVoicePlaybackActive(false), 5000);
                            }
                          }}
                          disabled={!blogGenerated}
                          className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] uppercase font-bold transition-all cursor-pointer ${
                            voicePlaybackActive 
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                              : 'bg-zinc-900 border-white/5 text-zinc-300 hover:text-[#A78BFA] disabled:opacity-50'
                          }`}
                        >
                          {voicePlaybackActive ? 'Playing [PCM]' : 'Narrate Article'}
                        </button>
                      </div>

                      {voicePlaybackActive && (
                        <div className="text-[8px] font-mono text-zinc-500 text-center animate-pulse">
                          🔊 Dynamic speech synthesizing stream returning base64 packets...
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 8. AI PERSONALIZED SEMANTIC MEMORY DATABASE */}
            {subTab === 'memory' && (
              <motion.div
                key="memory-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left font-mono text-xs"
              >
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2 font-sans text-left">
                    <Database className="w-5 h-5 text-indigo-400" />
                    Vector Semantic Recollection Map Database
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">Manage customized agent recollections, filter vector tokens, and observe spatial projection coordinate anchors.</p>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  
                  {/* Left Vector Projection Scatter Map (Span 5) */}
                  <div className="col-span-12 md:col-span-5 bg-[#09090E] border border-white/5 rounded-3xl p-4.5 flex flex-col justify-between">
                    <div className="border-b border-white/5 pb-2 mb-3">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-sans">2D Spatial Memory Vector Coordinates</span>
                      <span className="text-[8.5px] text-zinc-650">SELECTION MAPPED ANCHORS</span>
                    </div>

                    {/* Coordinates chart vector box mockup */}
                    <div className="w-full h-52 bg-black border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
                      
                      {/* Grid lines */}
                      <div className="absolute inset-0 bg-transparent grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="border-t border-l border-zinc-700" />
                        ))}
                      </div>

                      {/* Projected nodes */}
                      {filteredMemories.map((mem) => {
                        const styleX = `${mem.vector[0] * 80 + 10}%`;
                        const styleY = `${mem.vector[1] * 80 + 10}%`;
                        return (
                          <div
                            key={mem.id}
                            style={{ left: styleX, bottom: styleY }}
                            className="absolute p-1 bg-gradient-to-tr from-indigo-500 to-[#EC4899] rounded-lg cursor-pointer transform -translate-x-1/2 translate-y-1/2 hover:scale-125 transition-transform border border-white/20 shadow-lg text-[8.5px] font-extrabold text-black group"
                            title={`${mem.category.toUpperCase()}: ${mem.text}`}
                          >
                            ● {mem.category.slice(0, 3).toUpperCase()}

                            {/* Label popup */}
                            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-zinc-950 border border-[#A78BFA]/20 text-white p-2 rounded-lg font-mono text-[7.5px] hidden group-hover:block whitespace-nowrap z-30 leading-none">
                              {mem.text.slice(0, 32)}...
                            </span>
                          </div>
                        );
                      })}

                      <span className="text-[8.5px] text-zinc-750 absolute top-2 right-2">[X: Dimension Alpha]</span>
                      <span className="text-[8.5px] text-zinc-750 absolute bottom-2 left-2 rotate-90 transform origin-bottom-left">[Y: Dimension Beta]</span>
                    </div>

                    <div className="pt-3 text-[9px] text-zinc-600 leading-normal font-sans">
                      🛸 <strong>Recollection Projections</strong> auto-map conversation metrics to coordinate weights via Gemini embeddings.
                    </div>
                  </div>

                  {/* Right memories controller list (Span 7) */}
                  <div className="col-span-12 md:col-span-7 bg-[#09090E] border border-white/5 rounded-3xl p-4.5 flex flex-col justify-between">
                    <div className="space-y-3">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                        <span className="text-[10px] font-bold text-zinc-300 uppercase block font-sans">Active Memory Cells Ledger</span>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[8.5px] text-zinc-650">FILTER SECURE RECORD:</span>
                          <input
                            type="text"
                            value={memorySearch}
                            onChange={(e) => setMemorySearch(e.target.value)}
                            placeholder="Search vector cell data..."
                            className="bg-black border border-white/5 rounded px-2 py-0.5 text-[9.5px] font-mono text-zinc-300 focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                      </div>

                      {/* Memory cells rendering */}
                      <div className="space-y-2 overflow-y-auto max-h-[190px] pr-1 py-1.5 scrollbar-thin">
                        {filteredMemories.map((mem) => (
                          <div 
                            key={mem.id} 
                            className="p-3 bg-black border border-white/5 rounded-2xl flex items-start justify-between gap-3 text-left group"
                          >
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-[7.5px] font-black uppercase border rounded px-1.5 py-0.2 ${
                                  mem.category === 'branding' ? 'bg-indigo-500/10 text-[#A78BFA] border-[#A78BFA]/20' : mem.category === 'seo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500'
                                }`}>
                                  {mem.category}
                                </span>
                                <span className="text-[8.5px] text-zinc-600 font-mono italic">Identified {mem.timestamp}</span>
                              </div>
                              <p className="text-zinc-300 leading-normal text-[10.5px] group-hover:text-white transition-colors">{mem.text}</p>
                            </div>

                            <button
                              onClick={() => setMemories(prev => prev.filter(m => m.id !== mem.id))}
                              className="text-[10px] text-zinc-700 hover:text-rose-450 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer block"
                              title="Delete from memory space"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Add memory form */}
                    <div className="pt-3.5 border-t border-white/5 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMemoryText}
                          onChange={(e) => setNewMemoryText(e.target.value)}
                          placeholder="Inject custom persistent variable node to force model context recall..."
                          className="flex-1 bg-black border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddMemory()}
                        />
                        <button
                          onClick={handleAddMemory}
                          className="p-2.5 bg-indigo-500 text-white font-extrabold text-[10.5px] font-sans px-4 rounded-xl uppercase transition-all cursor-pointer shrink-0"
                        >
                          Inject Node
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}

// Simulated formula calculator helper for spreadsheet cells
function evalSimulatedFormula(formula: string, currentData: { [key: string]: GridCell }) {
  try {
    const rawExpression = formula.replace('=', '').toUpperCase();
    
    // Simple B2 * 120 or similar parsing
    if (rawExpression.includes('*')) {
      const parts = rawExpression.split('*').map(p => p.trim());
      const cellVal = currentData[parts[0]] ? parseFloat(currentData[parts[0]].value) : 0;
      const factor = parseFloat(parts[1]);
      return (cellVal * factor).toString();
    }
    return '0';
  } catch (err) {
    return 'Err!';
  }
}

// Icon sub-components mapping
function botIcon() {
  return <Bot className="w-4 h-4 text-inherit" />;
}

function globeIcon() {
  return <Globe className="w-4 h-4 text-inherit" />;
}

function networkIcon() {
  return <Network className="w-4 h-4 text-inherit" />;
}

function editIcon() {
  return <Edit3 className="w-4 h-4 text-inherit" />;
}

function compassIcon() {
  return <Compass className="w-4 h-4 text-inherit" />;
}

function codeIcon() {
  return <Code className="w-4 h-4 text-inherit" />;
}

function mediaIcon() {
  return <ImageIcon className="w-4 h-4 text-inherit" />;
}

function databaseIcon() {
  return <Database className="w-4 h-4 text-inherit" />;
}

function BotsIcon(props: any) {
  return <Cpu {...props} />;
}
