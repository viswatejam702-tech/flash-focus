import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, User, ShieldCheck, Key, Orbit, Sparkles, AlertCircle } from 'lucide-react';

interface LoginGatewayProps {
  userEmail: string;
  onLoginSuccess: (email: string) => void;
}

export const LoginGateway: React.FC<LoginGatewayProps> = ({ userEmail, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState(userEmail || 'viswatejam45@gmail.com');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up inputs
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status logs
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signInEmail)) {
      setValidationError('Please specify a valid, fully qualified email (e.g., mail@example.com).');
      return;
    }

    if (!signInPassword) {
      setValidationError('Please input your password.');
      return;
    }

    if (signInPassword.length < 5) {
      setValidationError('Passwords must contain at least 5 alphanumeric characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(signInEmail);
    }, 900);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!signUpName.trim()) {
      setValidationError('Full Name parameter is required for account enrollment.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
      setValidationError('Please specify a valid, fully qualified email (e.g., mail@example.com).');
      return;
    }

    if (signUpPassword.length < 6) {
      setValidationError('Password is too short. Choose a password with at least 6 characters for maximum edge network security.');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setValidationError('Passwords do not match. Please verify your credentials again.');
      return;
    }

    if (!agreeTerms) {
      setValidationError('To host domains, you must agree to the FlashFocus service agreement constraints.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(signUpEmail);
    }, 1100);
  };

  return (
    <div className="min-h-screen w-full bg-[#030304] text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Dynamic Cosmic Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      
      {/* Ambient Twinkling Stars */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-ping opacity-35 pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50 pointer-events-none" />

      {/* Main Core Form Card Container */}
      <div className="w-full max-w-md bg-[#09090c]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 font-mono text-xs">
        
        {/* Banner Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 shadow-inner">
            <Orbit className="w-6 h-6 text-[#A78BFA] animate-spin shrink-0" style={{ animationDuration: '60s' }} />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-[#FFF] uppercase leading-none font-display">
              FLASHFOCUS <span className="text-[8px] bg-white text-black px-1 rounded-sm font-mono tracking-normal ml-0.5">ORBIT</span>
            </h1>
            <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono mt-1.5 block">AI OPERATING SYSTEM</span>
          </div>
        </div>

        {/* Auth Toggle Tabs */}
        <div className="grid grid-cols-2 bg-black border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => {
              setMode('signin');
              setValidationError(null);
            }}
            className={`py-2 rounded-lg text-center font-bold font-sans transition-all cursor-pointer ${mode === 'signin' ? 'bg-white text-black shadow' : 'text-zinc-500 hover:text-white'}`}
          >
            Sign In Account
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setValidationError(null);
            }}
            className={`py-2 rounded-lg text-center font-bold font-sans transition-all cursor-pointer ${mode === 'signup' ? 'bg-white text-black shadow' : 'text-zinc-500 hover:text-white'}`}
          >
            Create Space Pass
          </button>
        </div>

        {/* Visual Feedback Alerts */}
        <AnimatePresence mode="wait">
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 bg-red-950/20 border border-red-500/20 rounded-2xl flex items-start gap-2.5 text-red-300 leading-normal"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <p>{validationError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login or Register Form Fields */}
        <AnimatePresence mode="wait">
          {mode === 'signin' ? (
            <motion.form
              key="signin-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSignInSubmit}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-black block">Security Email Access</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-650">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Enter connected email..."
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-black block">Authorization PIN Code</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-650">
                    <Key className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="Input security password Code..."
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-40"
              >
                {isLoading ? 'Re-Routing Gateway...' : 'Initialize Console Gateway'}
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="signup-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleSignUpSubmit}
              className="space-y-3.5"
            >
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-black block">Apex Spaceholder Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-650">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name..."
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-black block">Unique Target Email</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-650">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="e.g. founder@domain.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-black block">New Space Encryption PIN</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-650">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters..."
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-500 uppercase font-black block">Verify Encryption PIN</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-650">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="Repeat password pin..."
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-[#A78BFA]"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 font-sans text-[10px] text-zinc-400">
                <input
                  type="checkbox"
                  id="agree-chk"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="accent-[#A78BFA] cursor-pointer mt-0.5"
                />
                <label htmlFor="agree-chk" className="cursor-pointer leading-tight select-none">
                  I accept the automated edge proxy network policies, service boundaries, and GDPR terms of service tracking guidelines.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-40"
              >
                {isLoading ? 'Creating Sandbox Profile...' : 'Spawn Orbit Console Member'}
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-[9px] text-zinc-600 text-center leading-normal font-sans pt-2">
          🛡️ Securing 1.2M+ dynamic subdomains directly through military-grade ECC and high-contrast dual encryption headers. All transactions are completely sandboxed.
        </p>

      </div>
    </div>
  );
};
