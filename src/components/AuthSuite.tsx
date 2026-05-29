import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  User,
  Mail,
  Shield,
  ShieldAlert,
  Key,
  Check,
  X,
  RefreshCw,
  Activity,
  Target,
  Sparkles,
  Eye,
  EyeOff,
  AlertTriangle,
  LogIn,
  LogOut,
  Clock,
  Globe,
  Laptop,
  Smartphone,
  HelpCircle,
  ArrowRight,
  UserPlus,
  Info,
  ChevronRight,
  Database,
  CheckSquare,
  FileText,
  CreditCard,
  RotateCcw,
  Zap,
  Building,
  UserCheck,
  Briefcase,
  Sliders,
  Bell,
  Heart,
  ChevronDown
} from 'lucide-react';

// Live simulated audit logs
interface AuditLog {
  id: string;
  time: string;
  event: string;
  category: 'security' | 'onboarding' | 'billing' | 'system';
  severity: 'low' | 'medium' | 'high';
}

interface LoginHistoryItem {
  timestamp: string;
  ip: string;
  location: string;
  status: 'success' | 'failed';
  device: string;
  details?: string;
}

// Live simulated registered customers
interface MockUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  plan: string;
  onboardingCompleted: boolean;
  bannedState: boolean;
  status: 'active' | 'suspended';
  lastLoginIp: string;
  lastLoginGeo: string;
  loginHistory: LoginHistoryItem[];
}

export const AuthSuite: React.FC<{
  userEmail: string;
  onSystemMessage: (msg: string) => void;
}> = ({ userEmail, onSystemMessage }) => {
  // Current active chosen page of the 14 required auth pages
  const [activePageId, setActivePageId] = useState<string>('signup');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');

  // Interactive Live Input States
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: userEmail || 'viswatejam45@gmail.com',
    password: '',
    confirmPassword: '',
    companyName: '',
    referrerCode: '',
    role: 'Product Owner',
    agreeToTerms: false
  });

  const [signInData, setSignInData] = useState({
    email: userEmail || 'viswatejam45@gmail.com',
    password: '',
    rememberMe: true,
    otpCode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpValue, setOtpValue] = useState<string[]>(['', '', '', '', '', '']);
  const otpRefs = useRef<HTMLInputElement[]>([]);

  // Simulation parameters for fraud detection and dynamic state
  const [simulationState, setSimulationState] = useState({
    isUserLoggedIn: false,
    isAccountBanned: false,
    isSessionExpired: false,
    showSuspiciousIpAlert: false,
    lastGeoTriggered: 'Mumbai, MH (India)',
    securityCaptchaTriggered: false,
    captchaSolved: false,
    captchaInput: '',
    captchaTarget: 'FF89Y',
    mfaCompleted: false,
    activeDevicesCount: 3,
    billingMethod: 'UPI AutoPay (Razorpay)',
    includeGST: true
  });

  // Welcome Onboarding Wizard State
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [onboardingData, setOnboardingData] = useState({
    niche: 'SaaS Waitlist',
    goals: [] as string[],
    templateChoice: 'Electric Neon Glassmorphism',
    colorThemeChoice: 'Cyberpunk Purple & Toxic Yellow',
    brandStyle: 'Bold, urgent, Conversions-focused'
  });

  // Cookie settings preferences states
  const [cookieConsentSettings, setCookieConsentSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    performance: true,
    showBanner: true
  });

  // State for pop-up modals (Terms & Conditions, Privacy Policy, Cookie Preferences)
  const [activeLegalModal, setActiveLegalModal] = useState<'none' | 'terms' | 'privacy' | 'cookies'>('none');

  // Track expanded user login logs in dashboard
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});

  // List of simulated users
  const [mockDatabase, setMockDatabase] = useState<MockUser[]>([
    {
      id: 'usr-101',
      fullName: 'Viswa Teja',
      email: userEmail || 'viswatejam45@gmail.com',
      role: 'Growth Lead',
      plan: 'Growth Pro',
      onboardingCompleted: true,
      bannedState: false,
      status: 'active',
      lastLoginIp: '157.45.188.92',
      lastLoginGeo: 'Mumbai, India',
      loginHistory: [
        { timestamp: '2026-05-27 17:15:30', ip: '157.45.188.92', location: 'Mumbai, India', status: 'success', device: 'Desktop Chrome' },
        { timestamp: '2026-05-27 16:11:02', ip: '185.220.101.5', location: 'Frankfurt, DE', status: 'failed', device: 'Firefox (Tor Node)', details: 'Blocked: suspicious Geo exit IP' },
        { timestamp: '2026-05-27 11:22:45', ip: '157.45.188.92', location: 'Mumbai, India', status: 'failed', device: 'Desktop Chrome', details: 'Invalid MFA verification code' }
      ]
    },
    {
      id: 'usr-102',
      fullName: 'Sarah Jenkins',
      email: 's.jenkins@framerlaunch.io',
      role: 'Agency Founder',
      plan: 'Enterprise Platinum',
      onboardingCompleted: true,
      bannedState: false,
      status: 'active',
      lastLoginIp: '72.33.1.20',
      lastLoginGeo: 'San Francisco, US',
      loginHistory: [
        { timestamp: '2026-05-27 15:40:11', ip: '72.33.1.20', location: 'San Francisco, US', status: 'success', device: 'Macbook Safari' },
        { timestamp: '2026-05-27 14:02:18', ip: '72.33.1.20', location: 'San Francisco, US', status: 'failed', device: 'Macbook Safari', details: 'Password Expired policy limit match' }
      ]
    },
    {
      id: 'usr-103',
      fullName: 'Marcus Aurelius',
      email: 'marcus@stoicapps.com',
      role: 'Indie Hacker',
      plan: 'Free Tier',
      onboardingCompleted: false,
      bannedState: true,
      status: 'suspended',
      lastLoginIp: '185.220.101.5',
      lastLoginGeo: 'Frankfurt, DE',
      loginHistory: [
        { timestamp: '2026-05-27 17:10:00', ip: '185.220.101.5', location: 'Frankfurt, DE', status: 'failed', device: 'Headless Chrome bot', details: 'Suspicious bot signature trigger' },
        { timestamp: '2026-05-27 17:05:12', ip: '185.34.11.23', location: 'Frankfurt, DE', status: 'failed', device: 'Python network request', details: 'Rate limit - rate trigger warning' },
        { timestamp: '2026-05-27 17:01:04', ip: '185.34.11.23', location: 'Frankfurt, DE', status: 'failed', device: 'Python network request', details: 'Incorrect SHA-256 database password' }
      ]
    }
  ]);

  // Simulated live event logger/audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: '1', time: '17:15:30', event: 'SMTP Mailer Service connected', category: 'system', severity: 'low' },
    { id: '2', time: '17:16:04', event: 'UPI Autopay integration verified successfully on Razorpay payload', category: 'billing', severity: 'low' },
    { id: '3', time: '17:16:48', event: 'GDPR legal standard checks enforced on client connection', category: 'security', severity: 'low' },
    { id: '4', time: '17:17:12', event: 'IP 185.220.101.5 flagged for automated template scraping limits', category: 'security', severity: 'high' }
  ]);

  const addLog = (text: string, category: 'security' | 'onboarding' | 'billing' | 'system', severity: 'low' | 'medium' | 'high' = 'low') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAuditLogs(prev => [
      { id: Date.now().toString(), time, event: text, category, severity },
      ...prev
    ]);
  };

  // Timer simulation for OTP Resend Code
  const [otpResendSeconds, setOtpResendSeconds] = useState(45);
  useEffect(() => {
    let interval: any;
    if (otpResendSeconds > 0) {
      interval = setInterval(() => {
        setOtpResendSeconds(s => s - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpResendSeconds]);

  // Form validations
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const getPasswordStrengthDetails = (pass: string) => {
    const score = getPasswordStrength(pass);
    if (!pass) return { label: 'Not entered', color: 'bg-gray-800 text-gray-400', percent: 0 };
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500 text-red-100', percent: 25 };
    if (score <= 4) return { label: 'Moderate', color: 'bg-yellow-500 text-yellow-900', percent: 65 };
    return { label: 'Elite Security Perfect Check', color: 'bg-emerald-500 text-emerald-900', percent: 100 };
  };

  // 14 Pages Definition and Titles
  const authPages = [
    { id: 'signin', title: '1. Sign In Page', icon: LogIn, category: 'Core Auth' },
    { id: 'signup', title: '2. Sign Up Page', icon: UserPlus, category: 'Core Auth' },
    { id: 'forgot', title: '3. Forgot Password', icon: Key, category: 'Core Auth' },
    { id: 'reset', title: '4. Reset Password', icon: RotateCcw, category: 'Core Auth' },
    { id: 'verifyemail', title: '5. Verify Email Prompt', icon: Mail, category: 'Verification' },
    { id: 'otp', title: '6. Live OTP Verification', icon: Clock, category: 'Verification' },
    { id: 'onboarding', title: '7. Welcome Onboarding', icon: Sparkles, category: 'Onboarding' },
    { id: 'recovery', title: '8. Account Recovery Method', icon: Shield, category: 'Onboarding' },
    { id: 'terms', title: '9. Terms & Conditions', icon: FileText, category: 'Legal Policies' },
    { id: 'privacy', title: '10. Privacy Policy Specs', icon: ShieldAlert, category: 'Legal Policies' },
    { id: 'cookieview', title: '11. Preference Cookie Console', icon: Heart, category: 'Legal Policies' },
    { id: 'suspended', title: '12. Account Suspended View', icon: AlertTriangle, category: 'Exceptions' },
    { id: 'expired', title: '13. Session Expired View', icon: Clock, category: 'Exceptions' },
    { id: 'errorpage', title: '14. 404 Auth Access Error', icon: HelpCircle, category: 'Exceptions' }
  ];

  // Quick state actions
  const triggerFormSuccess = (msg: string) => {
    onSystemMessage(msg);
    addLog(msg, 'system', 'low');
  };

  // Keyboard Navigation Support
  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otpValue];
    newOtp[index] = val;
    setOtpValue(newOtp);

    // Auto focus next
    if (val && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTPCode = () => {
    const code = otpValue.join('');
    if (code.length < 6) {
      triggerFormSuccess('⚠️ Please fill out the full 6-digit OTP code before proceeding.');
      return;
    }
    triggerFormSuccess('✅ OTP code 2FA payload successfully authenticated! IP limits registered.');
    setActivePageId('onboarding');
  };

  // Handle simulations
  const simulateBanToggle = (id: string) => {
    setMockDatabase(prev => prev.map(u => {
      if (u.id === id) {
        const nextState = !u.bannedState;
        addLog(`Mock administrative action: Toggled Block Status of ${u.email} to ${nextState}`, 'security', nextState ? 'high' : 'low');
        if (nextState && u.email.includes('gmail')) {
          setActivePageId('suspended');
        }
        return {
          ...u,
          bannedState: nextState,
          status: nextState ? 'suspended' : 'active'
        };
      }
      return u;
    }));
  };

  const revokeActiveSessions = (id: string) => {
    const selectedUser = mockDatabase.find(user => user.id === id);
    if (!selectedUser) return;

    addLog(`🚫 Administrative token revocation: Active session tokens invalidated instantly for ${selectedUser.fullName}`, 'security', 'high');
    triggerFormSuccess(`🚫 Instantly revoked all active session tokens for ${selectedUser.fullName}. User has been forced out of active devices!`);

    // If targeted user represents our mock user, redirect sandbox preview to suspended to demonstrate active revocation
    if (selectedUser.email === signUpData.email || selectedUser.email === signInData.email) {
      setActivePageId('suspended');
    }

    setMockDatabase(prev => prev.map(user => {
      if (user.id === id) {
        return {
          ...user,
          bannedState: true,
          status: 'suspended',
          loginHistory: [
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
              ip: 'SEC_ACTION',
              location: 'Admin Session Guard',
              status: 'failed',
              device: 'Token Blacklist daemon',
              details: 'Forced session token revocation triggered. All active JWT/Redis tokens invalidated.'
            },
            ...user.loginHistory
          ]
        };
      }
      return user;
    }));
  };

  const simulateSessionExpiration = () => {
    addLog(`Simulated Redis cache token cancellation on device fingerprint`, 'security', 'medium');
    setActivePageId('expired');
  };

  const triggerGeoSpoofAlert = () => {
    setSimulationState(prev => ({
      ...prev,
      showSuspiciousIpAlert: true,
      lastGeoTriggered: 'Frankfurt, Germany - Tor Node Node'
    }));
    addLog(`🚨 Warning: Login from unrecognized Tor IP Geo location flagged via bot defense limits`, 'security', 'high');
  };

  return (
    <div className="grid grid-cols-12 gap-6 p-4 md:p-6 text-gray-300 select-none bg-black/10 min-h-screen relative z-10">
      
      {/* 1. COMPREHENSIVE CONTROL PANEL SIDEBAR: Stark High-Contrast White Monolith Grid */}
      <div className="col-span-12 lg:col-span-4 white-monolith rounded-3xl p-5 flex flex-col justify-between space-y-5 transition-all">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <h4 className="text-zinc-950 font-black text-base leading-tight flex items-center gap-1.5 font-display">
                <Shield className="w-4 h-4 text-black" /> Identity Operations
              </h4>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">14 Custom Auth State Flows</p>
            </div>
            <span className="text-[9px] font-mono bg-black text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow">
              Secure Auth
            </span>
          </div>
 
          {/* Core Auth View Selectors grouped by category */}
          <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
            {['Core Auth', 'Verification', 'Onboarding', 'Legal Policies', 'Exceptions'].map((cat) => (
              <div key={cat} className="space-y-1">
                <span className="text-[9px] font-extrabold font-mono text-zinc-400 uppercase tracking-widest block ml-2 mb-1">
                  {cat}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {authPages.filter(p => p.category === cat).map((page) => {
                    const Icon = page.icon;
                    const isActive = activePageId === page.id;
                    return (
                      <button
                        id={`auth-btn-${page.id}`}
                        key={page.id}
                        onClick={() => {
                          setActivePageId(page.id);
                          addLog(`Evaluator swapped preview focal viewport element to: ${page.title}`, 'system', 'low');
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-black text-white border-black font-extrabold shadow-lg'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-650 hover:text-black border-zinc-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                          <span>{page.title}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-zinc-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Live System Simulated Controllers */}
        <div className="space-y-4 border-t border-zinc-200 pt-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              ⚙️ Security Simulation Controllers
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="ctrl-expire-session"
                onClick={simulateSessionExpiration}
                className="bg-black hover:bg-zinc-900 text-white text-[10px] font-mono font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Clock className="w-3 h-3 text-orange-400 animate-pulse" /> Expire Session
              </button>
 
              <button
                id="ctrl-trigger-geoip"
                onClick={triggerGeoSpoofAlert}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-[10px] font-mono font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-zinc-300 cursor-pointer"
              >
                <ShieldAlert className="w-3 h-3 text-red-650" /> Spoof Threat IP
              </button>
            </div>
          </div>
 
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-[11px] leading-relaxed text-zinc-700">
            <span className="text-[9px] font-mono text-zinc-400 uppercase block font-semibold">Database Sync (Orbit Client):</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-zinc-900 font-bold">Admin Email:</span>
              <span className="text-zinc-600 font-mono truncate max-w-[150px] font-medium">{signUpData.email}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-zinc-900 font-bold">State:</span>
              <span className="text-emerald-600 font-mono font-bold">Verified Guard Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HIGH-FIDELITY LIVE INTERACTIVE CANVAS PREVIEW AREA: 5-Span Grid */}
      <div className="col-span-12 lg:col-span-5 glass-panel rounded-3xl overflow-hidden relative shadow-2xl flex flex-col justify-between">
        
        {/* Top bar with styling controls */}
        <div className="bg-[#101014] px-4 py-3 border-b border-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-[10px] font-mono text-gray-500 ml-2">https://flashfocus.studio/auth/{activePageId}</span>
          </div>

          {/* Theme switcher toggle inside preview to support dark/light experience easily */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setPreviewTheme('dark');
                addLog('Evaluator switched preview card canvas theme to: Onyx Dark', 'system', 'low');
              }}
              className={`text-[9px] font-mono px-2 py-1 rounded transition-all cursor-pointer ${
                previewTheme === 'dark' ? 'bg-[#312E81] text-indigo-300 border border-indigo-700/50' : 'text-gray-500'
              }`}
            >
              Dark Theme
            </button>
            <button
              id="theme-btn-light"
              onClick={() => {
                setPreviewTheme('light');
                addLog('Evaluator switched preview card canvas theme to: Polar Light', 'system', 'low');
              }}
              className={`text-[9px] font-mono px-2 py-1 rounded transition-all cursor-pointer ${
                previewTheme === 'light' ? 'bg-[#7C3AED]/20 text-indigo-400 border border-indigo-300/30 font-bold' : 'text-gray-500'
              }`}
            >
              Light Option
            </button>
          </div>
        </div>

        {/* Dynamic Warning Banners or Anti-Spam alerts */}
        {simulationState.showSuspiciousIpAlert && (
          <div className="bg-red-950/30 border-b border-red-900/60 p-3 flex items-start gap-2 text-[11px] text-red-200">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-grow">
              <span className="font-bold">Automated Threat Mitigation Active!</span> Suspicious login attempt bypassed regional limits.
              An emergency OTP challenge was dispatched to <span className="font-mono underline font-bold">{signUpData.email}</span>.
            </div>
            <button
              onClick={() => setSimulationState(p => ({ ...p, showSuspiciousIpAlert: false }))}
              className="text-red-400 hover:text-red-300 font-bold ml-1 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* PREVIEW CONTAINER BODY (Switches light context and displays exact views) */}
        <div className={`p-6 flex-grow flex items-center justify-center transition-all ${
          previewTheme === 'light' ? 'bg-[#FAFAFA] text-gray-800' : 'bg-[#0E0E12] text-gray-200'
        }`}>
          <div className="w-full max-w-sm mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePageId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`w-full rounded-2xl p-6 sm:p-7 relative select-text ${
                  previewTheme === 'light'
                    ? 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100'
                    : 'bg-[#15151C] shadow-2xl shadow-indigo-950/10 border border-gray-800'
                }`}
              >
                {/* 1. SIGN IN SCREEN VIEW */}
                {activePageId === 'signin' && (
                  <div className="space-y-5">
                    <div className="text-center space-y-1">
                      <h4 className={`text-xl font-extrabold font-display ${previewTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Welcome Back
                      </h4>
                      <p className={`text-xs ${previewTheme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Sign in to edit your viral high-converting landing sheets
                      </p>
                    </div>

                    {/* Social OAuth Options */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => triggerFormSuccess('🔌 Simulated Google OAuth popup initiated')}
                        className={`py-2 rounded-xl text-[10px] font-bold border flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white/5 ${
                          previewTheme === 'light' ? 'border-gray-200 text-gray-700 bg-white shadow-sm' : 'border-gray-800 text-gray-300 bg-[#1A1A24]'
                        }`}
                      >
                        Google
                      </button>
                      <button
                        onClick={() => triggerFormSuccess('🔌 Simulated GitHub authentication context opened')}
                        className={`py-2 rounded-xl text-[10px] font-bold border flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white/5 ${
                          previewTheme === 'light' ? 'border-gray-200 text-gray-700 bg-white shadow-sm' : 'border-gray-800 text-gray-300 bg-[#1A1A24]'
                        }`}
                      >
                        GitHub
                      </button>
                    </div>

                    <div className="relative flex py-1.5 items-center">
                      <div className="flex-grow border-t border-gray-900/10 dark:border-gray-800" />
                      <span className="flex-shrink mx-3 text-[10px] font-mono text-gray-500 uppercase">Or secure password</span>
                      <div className="flex-grow border-t border-gray-900/10 dark:border-gray-800" />
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); triggerFormSuccess('🔑 Logging in simulated user locally!'); }} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono uppercase text-gray-400">Secure Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input
                            required
                            type="email"
                            value={signInData.email}
                            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                            className={`w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                              previewTheme === 'light' ? 'bg-gray-55 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-[10px] font-mono uppercase text-gray-400">Password</label>
                          <button
                            type="button"
                            onClick={() => setActivePageId('forgot')}
                            className="text-[10px] text-indigo-500 hover:underline cursor-pointer"
                          >
                            Reset Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={signInData.password}
                            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                            placeholder="••••••••"
                            className={`w-full text-xs pl-9 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                              previewTheme === 'light' ? 'bg-gray-55 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-1 text-[11px] text-gray-400">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={signInData.rememberMe}
                            onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                            className="accent-indigo-505"
                          />
                          Remember device
                        </label>
                        <button
                          type="button"
                          onClick={() => triggerFormSuccess('🪄 Magic link code emailed to: ' + signInData.email)}
                          className="hover:underline text-indigo-400 font-bold"
                        >
                          Use Magic Link
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <LogIn className="w-4 h-4" /> Log In Safely
                      </button>
                    </form>

                    <div className="text-center text-[11px] text-gray-400 pt-1">
                      New to FlashFocus?{' '}
                      <button onClick={() => setActivePageId('signup')} className="font-bold text-indigo-400 hover:underline">
                        Create Account
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. SIGN UP SCREEN VIEW */}
                {activePageId === 'signup' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className={`text-xl font-extrabold font-display ${previewTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Create Premium Account
                      </h4>
                      <p className={`text-[11px] mt-0.5 ${previewTheme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Empower your landing pages with 2FA protection
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!signUpData.agreeToTerms) {
                          setActiveLegalModal('terms');
                          triggerFormSuccess('⚠️ Legal Terms Consent must be checked before account issuance!');
                          return;
                        }
                        if (getPasswordStrength(signUpData.password) < 4) {
                          triggerFormSuccess('⚠️ Password strength must qualify elite guidelines before registration.');
                          return;
                        }
                        triggerFormSuccess('🎉 Account registered! Dispatched verification email link!');
                        setActivePageId('verifyemail');
                      }}
                      className="space-y-2.5"
                    >
                      <div className="space-y-0.5">
                        <label className="block text-[9px] font-mono uppercase text-gray-500">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input
                            required
                            type="text"
                            placeholder="Viswa Teja"
                            value={signUpData.fullName}
                            onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                            className={`w-full text-xs pl-9 pr-3.5 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                              previewTheme === 'light' ? 'bg-gray-55 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <label className="block text-[9px] font-mono uppercase text-gray-500">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input
                            required
                            type="email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                            className={`w-full text-xs pl-9 pr-3.5 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                              previewTheme === 'light' ? 'bg-gray-55 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <label className="block text-[9px] font-mono uppercase text-gray-500">Secure Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Min 8 chars, Alphanumeric"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                            className={`w-full text-xs pl-9 pr-10 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                              previewTheme === 'light' ? 'bg-gray-55 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Live Password Strength Meter */}
                        {signUpData.password && (
                          <div className="space-y-1 pt-1">
                            <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono">
                              <span>Password Strength Check:</span>
                              <span className={`px-1.5 rounded font-bold ${getPasswordStrengthDetails(signUpData.password).color}`}>
                                {getPasswordStrengthDetails(signUpData.password).label}
                              </span>
                            </div>
                            <div className="w-full bg-gray-850 rounded-full h-1 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  getPasswordStrength(signUpData.password) >= 4 ? 'bg-emerald-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${getPasswordStrengthDetails(signUpData.password).percent}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Optional metadata specs */}
                      <div className="grid grid-cols-2 gap-2 py-0.5">
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-mono uppercase text-gray-500">Company (Optional)</label>
                          <input
                            type="text"
                            placeholder="Framer Agency"
                            value={signUpData.companyName}
                            onChange={(e) => setSignUpData({ ...signUpData, companyName: e.target.value })}
                            className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none ${
                              previewTheme === 'light' ? 'bg-gray-50 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                        </div>
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-mono uppercase text-gray-500">Referral Code</label>
                          <input
                            type="text"
                            placeholder="VIP_FLASH"
                            value={signUpData.referrerCode}
                            onChange={(e) => setSignUpData({ ...signUpData, referrerCode: e.target.value })}
                            className={`w-full text-xs px-2.5 py-1.5 rounded-lg focus:outline-none ${
                              previewTheme === 'light' ? 'bg-gray-50 border border-gray-200' : 'bg-[#1D1D27] border border-gray-800 text-white'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Trust terms acceptance */}
                      <div className="pt-1.5">
                        <label className="flex items-start gap-2 cursor-pointer text-[10px] text-gray-400 leading-tight">
                          <input
                            type="checkbox"
                            checked={signUpData.agreeToTerms}
                            onChange={(e) => setSignUpData({ ...signUpData, agreeToTerms: e.target.checked })}
                            className="mt-0.5 accent-indigo-500"
                          />
                          <span>
                            I agree to the{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveLegalModal('terms');
                                addLog('User requested Terms modal from Sign Up form', 'system');
                              }}
                              className="text-indigo-400 font-bold hover:underline"
                            >
                              Terms of Service
                            </button>{' '}
                            &{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveLegalModal('privacy');
                                addLog('User requested Privacy Policy modal from Sign Up form', 'system');
                              }}
                              className="text-indigo-400 font-bold hover:underline"
                            >
                              Cookie Policy
                            </button>
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-650 to-purple-650 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950/20 cursor-pointer pt-2 mt-2"
                      >
                        <Shield className="w-3.5 h-3.5" /> Initialize Protection & Register
                      </button>
                    </form>

                    <div className="text-center text-[11px] text-gray-400">
                      Already have an account?{' '}
                      <button onClick={() => setActivePageId('signin')} className="font-bold text-indigo-400 hover:underline">
                        Sign In
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. FORGOT PASSWORD VIEW */}
                {activePageId === 'forgot' && (
                  <div className="space-y-4">
                    <div className="text-center space-y-1">
                      <div className="mx-auto w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                        <Key className="w-5 h-5" />
                      </div>
                      <h4 className={`text-lg font-bold ${previewTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Forgot Password?
                      </h4>
                      <p className="text-[11px] text-gray-400 px-1">
                        We will send recovery tokens instantly. Please specify your account email address.
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        triggerFormSuccess('📬 Dispatched emergency Password Reset key! Check Inbox.');
                        setActivePageId('reset');
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <label className="block text-[9px] font-mono uppercase text-gray-500">Account Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input
                            required
                            type="email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                            className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1D1D27] border border-gray-800 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2.5 rounded-xl text-xs mt-2"
                      >
                        Dispatch Reset Token
                      </button>
                    </form>

                    <button
                      onClick={() => setActivePageId('signin')}
                      className="w-full text-center text-xs text-gray-400 hover:underline"
                    >
                      ← Back to secure Sign In
                    </button>
                  </div>
                )}

                {/* 4. RESET PASSWORD VIEW */}
                {activePageId === 'reset' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-black text-white font-display uppercase tracking-wide">
                        <span className="text-gradient-bw text-glow-white">Conceive New Password</span>
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Token confirmed securely. Enter your supreme new password constraints below.
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (signUpData.password !== signUpData.confirmPassword) {
                          triggerFormSuccess('⚠️ Passwords do not match. Please copy precisely.');
                          return;
                        }
                        triggerFormSuccess('✅ Password reset accomplished! Login freshly with new constraints.');
                        setActivePageId('signin');
                      }}
                      className="space-y-3.5"
                    >
                      <div className="space-y-1">
                        <label className="block text-[9px] font-mono uppercase text-gray-500">New Password</label>
                        <input
                          required
                          type="password"
                          placeholder="Min 8 characters code"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#1D1D27] border border-gray-800 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-mono uppercase text-gray-500">Confirm Password</label>
                        <input
                          required
                          type="password"
                          placeholder="Re-type code"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#1D1D27] border border-gray-800 text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2.5 rounded-xl text-xs"
                      >
                        Confirm New Policy Password
                      </button>
                    </form>
                  </div>
                )}

                {/* 5. VERIFY EMAIL VIEW */}
                {activePageId === 'verifyemail' && (
                  <div className="space-y-5 text-center">
                    <div className="mx-auto w-12 h-12 bg-indigo-550/10 rounded-full flex items-center justify-center text-indigo-400 animate-bounce">
                      <Mail className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-lg font-bold text-white">Check Your Inbox</h4>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto">
                        We sent a secure validation key link to:
                        <br />
                        <strong className="text-indigo-400 font-mono text-[11px] block mt-1">{signUpData.email}</strong>
                      </p>
                    </div>

                    <div className="bg-[#111115] border border-gray-850 p-3 rounded-xl text-[11px] text-gray-400 leading-relaxed text-left">
                      💡 Didn't receive the verify code? Check your SPAM box or bypass manually to see OTP verification screens.
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          addLog('Evaluator bypassed verification page to Live OTP', 'system');
                          setActivePageId('otp');
                        }}
                        className="bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 rounded-xl text-xs w-full flex items-center justify-center gap-1.5"
                      >
                        Verify with OTP Code instead <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => triggerFormSuccess('📧 Re-sent email verification envelope.')}
                        className="text-gray-400 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1 py-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Resend Verification Link
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. OTP VERIFICATION VIEW */}
                {activePageId === 'otp' && (
                  <div className="space-y-5">
                    <div className="text-center space-y-1">
                      <div className="mx-auto w-10 h-10 bg-[#06B6D4]/10 rounded-full flex items-center justify-center text-[#06B6D4]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Enter 6-Digit Code</h4>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto">
                        OTP dispatched to phone & <span className="font-mono text-indigo-400 text-[10px] underline">{signUpData.email}</span>
                      </p>
                    </div>

                    <div className="flex justify-between gap-1.5">
                      {otpValue.map((char, index) => (
                        <input
                          id={`otp-box-${index}`}
                          key={index}
                          ref={(el) => { otpRefs.current[index] = el!; }}
                          type="text"
                          maxLength={1}
                          pattern="[0-9]"
                          inputMode="numeric"
                          value={char}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-10 h-12 text-center text-lg font-mono font-bold text-white bg-[#1D1D27] border border-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-500">Resend Code in:</span>
                      {otpResendSeconds > 0 ? (
                        <span className="text-[#06B6D4] font-bold">{otpResendSeconds}s Cooldown</span>
                      ) : (
                        <button
                          onClick={() => {
                            setOtpResendSeconds(45);
                            addLog('OTP Code dispatchedfreshly by developer', 'system', 'low');
                            triggerFormSuccess('⚡ Sent fresh OTP code payload!');
                          }}
                          className="text-[#06B6D4] hover:underline font-bold"
                        >
                          Resend OTP Code
                        </button>
                      )}
                    </div>

                    <button
                      id="otp-verify-submit"
                      onClick={verifyOTPCode}
                      className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2.5 rounded-xl text-xs"
                    >
                      Authenticate Code & Open Onboarding
                    </button>
                  </div>
                )}

                {/* 7. WELCOME ONBOARDING WIZARD */}
                {activePageId === 'onboarding' && (
                  <div className="space-y-5">
                    <div className="text-center relative">
                      <div className="absolute top-0 right-0">
                        <span className="font-mono text-gray-500 text-[10px]">Step {onboardingStep}/4</span>
                      </div>
                      <h4 className="text-lg font-black text-white font-display uppercase tracking-wide">
                        <span className="text-gradient-bw text-glow-white">Welcome to FlashFocus 🚀</span>
                      </h4>
                      <p className="text-[11px] text-indigo-300 mt-1">Let's coordinate your adaptive launch layouts</p>
                    </div>

                    {/* Progress tracker bar */}
                    <div className="flex justify-between gap-1">
                      {[1, 2, 3, 4].map((stepNum) => (
                        <div
                          key={stepNum}
                          className={`h-1 flex-grow rounded-full transition-all duration-300 ${
                            onboardingStep >= stepNum ? 'bg-indigo-500' : 'bg-gray-800'
                          }`}
                        />
                      ))}
                    </div>

                    {/* STEP 1: SPECIFY DOMAIN */}
                    {onboardingStep === 1 && (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-300">What best labels the business or campaign you are launching?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'SaaS Waitlist', label: 'SaaS Tool waitlist' },
                            { id: 'Product Launch', label: 'Innovative Retail product' },
                            { id: 'Ticket Event', label: 'Ticketed Tech Concert' },
                            { id: 'Agency Portfolio', label: 'Creative Design Agency' }
                          ].map((nich) => (
                            <button
                              key={nich.id}
                              onClick={() => setOnboardingData({ ...onboardingData, niche: nich.id })}
                              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                onboardingData.niche === nich.id ? 'border-indigo-500 bg-indigo-950/20' : 'border-gray-800 hover:bg-white/5'
                              }`}
                            >
                              {nich.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: CAMPAIGN OBJECTIVE GOALS */}
                    {onboardingStep === 2 && (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-300">Select Campaign Objectives (Check multiples):</p>
                        <div className="space-y-2">
                          {[
                            { id: 'leads', val: 'Collect Verified Email Leads & Waitlists' },
                            { id: 'pay', val: 'Direct Pay checkout via UPI/Stripe' },
                            { id: 'viral', val: 'Referral sharing loop incentives' }
                          ].map((gl) => {
                            const isIncluded = onboardingData.goals.includes(gl.id);
                            return (
                              <label
                                key={gl.id}
                                className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                                  isIncluded ? 'border-indigo-500 bg-indigo-950/20' : 'border-gray-800'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isIncluded}
                                  onChange={() => {
                                    const next = isIncluded
                                      ? onboardingData.goals.filter(g => g !== gl.id)
                                      : [...onboardingData.goals, gl.id];
                                    setOnboardingData({ ...onboardingData, goals: next });
                                  }}
                                  className="mt-0.5 accent-indigo-500"
                                />
                                <span>{gl.val}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: BRAND PERSONALITY CHOICE */}
                    {onboardingStep === 3 && (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-300">Choose Aesthetic Brand Persona:</p>
                        <div className="space-y-2">
                          {[
                            { id: 'cyberpunk', n: 'Cyberpunk Neon', desc: 'Edgy slates with neon accents & monospace fonts' },
                            { id: 'editorial', n: 'Serene Editorial Luxury', desc: 'Classic off-whites, serif fonts, elegant spaces' },
                            { id: 'minimalist', n: 'Corporate Minimalist', desc: 'Clean charcoal grays, Inter sans typography' }
                          ].map((pers) => (
                            <button
                              key={pers.id}
                              onClick={() => setOnboardingData({ ...onboardingData, templateChoice: pers.n, brandStyle: pers.desc })}
                              className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex flex-col cursor-pointer ${
                                onboardingData.templateChoice === pers.n ? 'border-indigo-500 bg-indigo-950/20' : 'border-gray-800'
                              }`}
                            >
                              <span className="font-bold text-white">{pers.n}</span>
                              <span className="text-[10px] text-gray-500 mt-0.5">{pers.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: AI SUMMARY RECOMMENDATION GENERATION */}
                    {onboardingStep === 4 && (
                      <div className="space-y-3 bg-[#111115] border border-gray-850 p-4 rounded-xl text-left">
                        <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-900 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                          🤖 Gemini Instant Recommendation Profile
                        </span>
                        <div className="space-y-2 text-xs pt-1">
                          <p className="text-gray-300">
                            Based on your objective to launch a <strong className="text-white">{onboardingData.niche}</strong>, the AI recommends:
                          </p>
                          <div className="text-[11px] space-y-1 font-mono text-gray-400">
                            <div>• Style: <span className="text-emerald-400 font-bold">{onboardingData.templateChoice}</span></div>
                            <div>• Accent Color: <span className="text-indigo-400">Neon Cyan and Slate Violet</span></div>
                            <div>• Recommended Layout Modules: <span className="text-white">Hero Splash With Counter, Features Grid, Testimonials Card, Fixed Pricing Slider</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {onboardingStep > 1 && (
                        <button
                          onClick={() => setOnboardingStep(s => s - 1)}
                          className="bg-white/5 border border-gray-800 hover:text-white px-4 py-2 text-xs font-bold rounded-xl cursor-pointer"
                        >
                          Back
                        </button>
                      )}
                      
                      {onboardingStep < 4 ? (
                        <button
                          onClick={() => setOnboardingStep(s => s + 1)}
                          className="flex-grow bg-indigo-650 hover:bg-indigo-600 text-white px-5 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Next Step <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addLog('Onboarding completed. Initialized fresh user database', 'onboarding');
                            triggerFormSuccess('🚀 Onboarding completed successfully!');
                            setActivePageId('signin');
                          }}
                          className="flex-grow bg-emerald-650 hover:bg-emerald-600 text-white px-5 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Initialize Campaign
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 8. ACCOUNT RECOVERY */}
                {activePageId === 'recovery' && (
                  <div className="space-y-4">
                    <div className="text-center space-y-1">
                      <div className="mx-auto w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Emergency Key Recovery</h4>
                      <p className="text-[11px] text-gray-400">
                        Enter your 24-word security key or backup key to safely repossess your customized account profile.
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        triggerFormSuccess('🔑 Master backup key validated successfully. Password restored to default.');
                        setActivePageId('signin');
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-gray-500 mb-1">Backup Key Sequence</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="word1 word2 word3 word4..."
                          className="w-full text-xs font-mono p-3 rounded-xl bg-[#1D1D27] border border-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2.5 rounded-xl text-xs"
                      >
                        Restore Identity Access
                      </button>
                    </form>
                  </div>
                )}

                {/* 9. TERMS & CONDITIONS DEDICATED PREVIEW ELEMENT */}
                {activePageId === 'terms' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 border-b border-gray-800 pb-2">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-bold text-white">FlashFocus terms of Service</h4>
                    </div>

                    <div className="text-[11px] text-gray-400 space-y-2.5 max-h-[220px] overflow-y-auto pr-1 leading-relaxed text-left">
                      <p>
                        <strong>1. User Agreement:</strong> By accessing or using the FlashFocus visual builder system, you signify that you have read, understood, and agree to copy strictly legally binding regulations.
                      </p>
                      <p>
                        <strong>2. Account Security & Ethics:</strong> You agree to protect your 2FA credentials. Any creation of phishing templates, malware, scam URLs, or unauthorized adult templates will prompt instant irrevocable termination.
                      </p>
                      <p>
                        <strong>3. AI Content Disclaimer:</strong> FlashFocus utilizes advanced Gemini AI layout adaptation systems. Adapted elements are for optimization support; verify accuracy prior to public publishing.
                      </p>
                      <p>
                        <strong>4. Payments & commissions:</strong> Subscription plans support global cards, Razorpay, and direct UPI Autopay billing. Refund options belong exclusively within 14 calendar days of payment issuance.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSignUpData({ ...signUpData, agreeToTerms: true });
                        setActivePageId('signup');
                        triggerFormSuccess('✅ Accepted legal terms of service');
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept & Return to SignUp
                    </button>
                  </div>
                )}

                {/* 10. PRIVACY POLICY VIEW */}
                {activePageId === 'privacy' && (
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-1.5 border-b border-gray-800 pb-2">
                      <Shield className="w-4 h-4 text-[#06B6D4]" />
                      <h4 className="text-sm font-bold text-white">Privacy & Compliance Policies</h4>
                    </div>

                    <div className="text-[11px] text-gray-400 space-y-2 max-h-[2250px] overflow-y-auto pr-1 leading-relaxed">
                      <p>
                        <strong>GDPR & Indian IT Act Compliance:</strong> Data stored cleanly in partitioned tables. User telemetry records are encrypted natively on REST nodes.
                      </p>
                      <p>
                        <strong>AI Telemetry Processing:</strong> Prompts sent via server-side secure endpoints. No raw API keys are ever sent or exposed to client browser nodes.
                      </p>
                    </div>

                    <button
                      onClick={() => setActivePageId('signup')}
                      className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 rounded-xl text-xs text-center"
                    >
                      Return to SignUp Section
                    </button>
                  </div>
                )}

                {/* 11. COOKIE CONSENT CONFIRMATION */}
                {activePageId === 'cookieview' && (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-1.5 border-b border-gray-800 pb-2">
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-bold text-white">Cookie Console Configuration</h4>
                    </div>

                    <p className="text-[11px] text-gray-400">
                      Configure tracking rules according to your GDPR regional requirements.
                    </p>

                    <div className="space-y-2 text-[11px]">
                      {[
                        { id: 'essential', label: 'Essential System Nodes', required: true, desc: 'Handles sessions & security tokens securely' },
                        { id: 'analytics', label: 'Framer / Analytics cookies', required: false, desc: 'Triggers demographic metrics split testing' },
                        { id: 'marketing', label: 'Marketing Pixels', required: false, desc: 'Adapts promotional launch recommendations' }
                      ].map((cook) => {
                        const isChecked = (cookieConsentSettings as any)[cook.id];
                        return (
                          <div key={cook.id} className="flex items-start justify-between p-2 bg-black/20 rounded-lg border border-gray-900">
                            <div>
                              <span className="font-bold text-gray-200 block">{cook.label}</span>
                              <span className="text-[10px] text-gray-500">{cook.desc}</span>
                            </div>
                            <input
                              type="checkbox"
                              disabled={cook.required}
                              checked={isChecked}
                              onChange={(e) => setCookieConsentSettings({ ...cookieConsentSettings, [cook.id]: e.target.checked })}
                              className="mt-1 accent-indigo-500 cursor-pointer"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        setCookieConsentSettings({ ...cookieConsentSettings, showBanner: false });
                        triggerFormSuccess('✅ Customized cookie consent preferences applied!');
                      }}
                      className="w-full bg-indigo-650 hover:bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs text-center cursor-pointer"
                    >
                      Store Privacy Settings
                    </button>
                  </div>
                )}

                {/* 12. ACCOUNT SUSPENDED */}
                {activePageId === 'suspended' && (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-red-950/20 text-red-500 rounded-full flex items-center justify-center border border-red-900/60 animate-pulse">
                      <ShieldAlert className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-lg font-bold text-red-400">Account Access Suspended</h4>
                      <p className="text-xs text-gray-400 leading-normal max-w-xs mx-auto">
                        Your account has been flagged for a violation of the{' '}
                        <span className="text-red-300 font-semibold underline">Acceptable Use Policy (Section 3)</span> on IP node scraping bounds.
                      </p>
                    </div>

                    <div className="bg-[#1C1212] border border-red-950/40 p-3 rounded-xl text-[11px] text-red-300/90 leading-relaxed text-left">
                      📋 Flag reason: <strong>Spam/Phishing Risk Detected</strong>. Rapid creation of 3 duplicated bank landing layouts on unauthorized endpoint.
                    </div>

                    <button
                      onClick={() => triggerFormSuccess('📨 Support tickets generated. Identity Team will verify within 4 hours.')}
                      className="w-full bg-red-950/40 hover:bg-red-950/60 text-red-200 border border-red-900 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                    >
                      Appeal Ban Suspension
                    </button>
                  </div>
                )}

                {/* 13. SESSION EXPIRED */}
                {activePageId === 'expired' && (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto w-10 h-10 bg-orange-950/20 text-orange-400 rounded-full flex items-center justify-center border border-orange-900/30">
                      <Clock className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">Session Timer Suspended</h4>
                      <p className="text-xs text-gray-400">
                        Inactivity limit (30 minutes) reached. Login freshly to synchronize current campaign drafts.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActivePageId('signin');
                        addLog('User restarted expired session', 'system');
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                    >
                      Re-Authenticate Now
                    </button>
                  </div>
                )}

                {/* 14. 404 AUTH ACCESS ERROR */}
                {activePageId === 'errorpage' && (
                  <div className="space-y-5 text-center">
                    <div className="text-[2.2rem] font-extrabold text-indigo-400 font-mono tracking-widest animate-pulse">
                      404 AUTH
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-white">Unauthorized Endpoints Challenge</h4>
                      <p className="text-xs text-gray-400">
                        The requested authentication token does not align with your browser partition session values.
                      </p>
                    </div>

                    <div className="bg-[#111115] border border-gray-850 p-2.5 rounded-xl text-[10px] text-gray-500 font-mono px-3">
                      Token Payload: [EXP-403_SEC_REVOKED_SHA256]
                    </div>

                    <button
                      onClick={() => setActivePageId('signin')}
                      className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 rounded-xl text-xs cursor-pointer"
                    >
                      ← Return to Secure Base Sign In
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global SSL Secured / Trust elements in preview footer */}
        <div className="bg-[#101014] px-4 py-3 border-t border-gray-900 flex justify-between items-center text-[10px] text-gray-500 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
            <Shield className="w-3.5 h-3.5" /> SSL SHA-256 SECURED
          </span>
          <span>99.98% AUTH UPTIME PROVEN</span>
        </div>
      </div>

      {/* 3. SIMULATED SYSTEM LOGS & AUDIT PANEL: 3-Span Grid */}
      <div className="col-span-12 lg:col-span-3 glass-panel rounded-3xl p-5 flex flex-col justify-between space-y-5 shadow-2xl text-left">
        
        {/* User Account List and Ban Controller */}
        <div className="space-y-4">
          <div className="border-b border-gray-900 pb-3 flex items-center justify-between">
            <div>
              <h4 className="text-white font-bold text-xs flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" /> PostgreSQL User Mock DB
              </h4>
              <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">Dynamic identity table states</p>
            </div>
            <span className="text-[9px] font-mono bg-purple-500/10 text-purple-400 font-bold px-1.5 py-0.5 rounded border border-purple-500/20">
              User Row Table
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {mockDatabase.map((u) => (
              <div key={u.id} className="p-2.5 bg-[#141418] border border-gray-850 rounded-xl space-y-1.5 transition-all">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white truncate max-w-[120px]">{u.fullName}</span>
                  <span className={`text-[9.5px] px-1.5 rounded font-mono uppercase ${
                    u.bannedState ? 'bg-red-950 text-red-400 border border-red-900/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-900/40'
                  }`}>
                    {u.status}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono truncate">{u.email}</div>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="text-[9px] text-gray-400 font-mono">{u.lastLoginGeo}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setExpandedLogs(prev => ({ ...prev, [u.id]: !prev[u.id] }));
                        addLog(`Admin checked login history metrics for ${u.fullName}`, 'security', 'low');
                      }}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-950/40 hover:bg-indigo-900/30 text-indigo-300 border border-indigo-900/50 transition-all cursor-pointer flex items-center gap-1"
                      title="Inspect user login attempts log"
                      id={`btn-history-${u.id}`}
                    >
                      <span>History</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-250 ${expandedLogs[u.id] ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={() => revokeActiveSessions(u.id)}
                      className="text-[9.5px] font-mono px-2 py-0.5 rounded border border-rose-900 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40 transition-all cursor-pointer font-bold"
                      title="Instantly revoke all active session tokens with Token Blacklist daemon"
                      id={`btn-block-${u.id}`}
                    >
                      Block
                    </button>
                    <button
                      onClick={() => simulateBanToggle(u.id)}
                      className={`text-[9.5px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer ${
                        u.bannedState
                          ? 'border-emerald-900 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/50'
                          : 'border-red-900 bg-red-950/20 text-red-400 hover:bg-red-950/50'
                      }`}
                    >
                      {u.bannedState ? 'Unban' : 'Lock'}
                    </button>
                  </div>
                </div>

                {/* Login History Dropdown */}
                {expandedLogs[u.id] && (
                  <div className="mt-2 pt-2 border-t border-gray-850 space-y-2">
                    <div className="text-[9px] text-indigo-300 font-mono font-bold uppercase tracking-widest flex items-center justify-between">
                      <span>Audit Trail Table</span>
                      <span className="text-gray-500">{u.loginHistory.length} Sessions</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-900 bg-black/40">
                      <table className="w-full text-left font-mono text-[9px] border-collapse">
                        <thead>
                          <tr className="bg-zinc-950 text-gray-400 border-b border-gray-850">
                            <th className="p-1 px-1.5 font-bold uppercase tracking-wider">Timestamp</th>
                            <th className="p-1 px-1.5 font-bold uppercase tracking-wider">IP Address</th>
                            <th className="p-1 px-1.5 font-bold uppercase tracking-wider">Device</th>
                            <th className="p-1 px-1.5 font-bold uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-900">
                          {u.loginHistory.map((h, hIdx) => (
                            <React.Fragment key={hIdx}>
                              <tr className="hover:bg-zinc-900/40">
                                <td className="p-1 px-1.5 text-gray-300 whitespace-nowrap">{h.timestamp}</td>
                                <td className="p-1 px-1.5 text-gray-400 font-bold">{h.ip}</td>
                                <td className="p-1 px-1.5 text-gray-400 max-w-[100px] truncate" title={h.device}>{h.device}</td>
                                <td className="p-1 px-1.5">
                                  <span className={`px-1 rounded text-[8px] font-extrabold uppercase ${
                                    h.status === 'success' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/30' : 'bg-red-950/80 text-red-400 border border-red-900/30'
                                  }`}>
                                    {h.status}
                                  </span>
                                </td>
                              </tr>
                              {h.status === 'failed' && h.details && (
                                <tr className="bg-red-950/5">
                                  <td colSpan={4} className="p-1 px-1.5 text-red-300/80 text-[8.5px] border-t border-red-950/20">
                                    <div className="flex items-center gap-1">
                                      <span className="text-red-400">🚨</span>
                                      <span className="italic">{h.details}</span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security / SMTP Verification simulator indicators */}
        <div className="space-y-4">
          <div className="border-b border-gray-900 pb-2">
            <h4 className="text-white font-bold text-xs flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Indian / Global Gateways
            </h4>
            <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">Mock transactions & invoice generation</p>
          </div>

          <div className="bg-[#141418] p-3 rounded-xl space-y-2 text-[11px] leading-relaxed">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={simulationState.includeGST}
                onChange={(e) => setSimulationState({ ...simulationState, includeGST: e.target.checked })}
                className="accent-indigo-500"
              />
              <span>Generate GST Compliant invoices (18% GST)</span>
            </label>

            <div className="space-y-1 bg-black/40 p-2 rounded border border-gray-900 text-[10px] font-mono">
              <div className="flex justify-between text-gray-500">
                <span>Billing:</span>
                <span className="text-indigo-300">{simulationState.billingMethod}</span>
              </div>
              <div className="flex justify-between text-gray-505 text-gray-500">
                <span>Tax System:</span>
                <span>{simulationState.includeGST ? 'Central SGST+CGST Applied' : 'Standard International'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                triggerFormSuccess('🧾 Sample GST invoice PDF payload successfully generated for ' + signUpData.email);
              }}
              className="w-full bg-[#111115] hover:bg-black text-[10px] border border-gray-850 text-gray-300 font-mono py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3 text-indigo-400" /> Export Demo GST Receipt
            </button>
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="space-y-3 flex-grow overflow-hidden flex flex-col justify-end">
          <div className="border-b border-gray-900 pb-2 flex items-center justify-between">
            <h4 className="text-white font-bold text-xs flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Security Audit Log Stream
            </h4>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="text-[10px] font-mono flex items-start gap-1 text-gray-400">
                <span className="text-gray-600 shrink-0">[{log.time}]</span>
                <span className={`shrink-0 font-bold ${
                  log.category === 'security' ? 'text-rose-400' : 'text-gray-400'
                }`}>
                  [{log.category}]
                </span>
                <span className="truncate flex-grow">{log.event}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. LEGAL CONTENT DRAWER MODAL OVERLAYS */}
      {activeLegalModal !== 'none' && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0c0c10] border border-gray-850 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-left space-y-6"
          >
            <div className="flex items-center justify-between border-b border-gray-900 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-black text-white font-display uppercase tracking-wide">
                  <span className="text-gradient-bw text-glow-white">
                    {activeLegalModal === 'terms' ? 'Terms & Conditions Policy Requirements' : 'GDPR & Indian Information Act Privacy Protocol'}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setActiveLegalModal('none')}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-400 overflow-y-auto max-h-[400px] pr-2 leading-relaxed">
              {activeLegalModal === 'terms' ? (
                <>
                  <p className="border-l-2 border-indigo-500 pl-3 italic text-[11px] bg-indigo-950/10 p-2 rounded-r-lg">
                    This document establishes absolute compliance for users, templates, AI adaptation policies, and regional billing settings inside the visual platform workspace.
                  </p>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">1. User Account Ownership & Care</h5>
                    <p>Users maintain responsibility for credentials. You explicitly agree to enforce 2FA verification. Failure containing weak credentials lies exclusively with the account holder.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">2. Acceptable Use Safeguards</h5>
                    <p>You may not configure spam lists, phishy domains, brand impersonators, malware, or coordinate adult abuse. Advanced automated node checkers verify each template against blacklists continuously.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">3. AI-Adapting Content Warranty</h5>
                    <p>Adapted templates via Gemini model configurations are optimized helper files. Inspect layout results before assigning custom domains.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">4. Payment, Razorpay & International Renewals</h5>
                    <p>Pricing packages support GST billing and UPI AutoPay settings. Annual cycles auto-renew. Cancellations can be issued on the user billing dashboard instantly.</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="border-l-2 border-[#06B6D4] pl-3 italic text-[11px] bg-[#06B6D4]/5 p-2 rounded-r-lg">
                    FlashFocus complies strictly with GDPR frameworks and Indian Information Technology (IT) Act data protection rules.
                  </p>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">Information We Securely Track</h5>
                    <p>We preserve encrypted passwords, full names, verified emails, IP access fingerprinting locations, and campaign views. Absolutely no raw client financial keys are handled directly; Stripe and Cashfree manage gateways.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">AI Processor Processing Disclosures</h5>
                    <p>Campaign specs are proxy-processed on server-side nodes anonymously. Your telemetry records are protected with SHA-256 protocols and never sold to downstream brokers.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[13px] mb-1">GDPR Right to Be Erased</h5>
                    <p>Users can request absolute deletion of template rows, credential logs, and leads collected at any time by mailing viswatejam45@gmail.com.</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-900 gap-3">
              <button
                onClick={() => {
                  setSignUpData({ ...signUpData, agreeToTerms: true });
                  setActiveLegalModal('none');
                  triggerFormSuccess('✅ Accepted terms & agreements securely in modal!');
                }}
                className="bg-indigo-650 hover:bg-indigo-650 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-md"
              >
                Concur & I Agree
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Cookie Consent Banner (Bottom of the viewport if enabled) */}
      {cookieConsentSettings.showBanner && (
        <div className="fixed bottom-6 right-6 z-40 bg-gray-900/95 backdrop-blur border border-indigo-950 p-4 rounded-2xl shadow-2xl max-w-sm text-left space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="p-1.5 rounded-xl bg-indigo-950/40 text-indigo-400">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h5 className="text-white text-xs font-bold leading-tight">GDPR Cookie Preference</h5>
              <p className="text-[10.5px] text-gray-400 mt-1 leading-normal">
                We utilize essential performance and metrics cookies to optimize split A/B tests. Configure settings safely.
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              onClick={() => {
                setActivePageId('cookieview');
                setCookieConsentSettings({ ...cookieConsentSettings, showBanner: false });
                addLog('User configured cookie settings from banner', 'system');
              }}
              className="text-[10px] font-mono hover:text-white text-gray-400 px-2 cursor-pointer"
            >
              Preferences
            </button>
            <button
              id="cookie-btn-accept"
              onClick={() => {
                setCookieConsentSettings({ ...cookieConsentSettings, showBanner: false, analytics: true, marketing: true });
                addLog('GDPR policy cookies stored', 'security');
                triggerFormSuccess('✅ Dispatched cookies credentials globally.');
              }}
              className="bg-indigo-600 hover:bg-indigo-550 text-white px-3.5 py-1.5 text-[10px] font-bold rounded-xl cursor-pointer"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
