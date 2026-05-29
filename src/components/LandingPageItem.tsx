/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPageSection, ColorTheme } from '../types';
import { ConfettiCanvas } from './ConfettiCanvas';

import { SeoIssue } from '../utils/seoAuditor';

interface LandingPageItemProps {
  section: LandingPageSection;
  theme: ColorTheme;
  fontFamily: string;
  onLeadSubmit?: (email: string, sectionId: string) => void;
  onPayTrigger?: (planName: string, amountINR: number) => void;
  isPreview?: boolean; // if true, disables navigation and highlights editing hooks
  showHeatmap?: boolean;
  heatmapType?: 'clicks' | 'seo';
  seoIssues?: SeoIssue[];
}

// Interactive SEO highlight component
const ElementOverlay: React.FC<{
  issue?: SeoIssue;
  children: React.ReactNode;
}> = ({ issue, children }) => {
  if (!issue) return <>{children}</>;

  const borderColor = 
    issue.severity === 'error' 
      ? 'border-red-500/50 hover:border-red-400' 
      : issue.severity === 'warning'
        ? 'border-amber-500/50 hover:border-amber-400'
        : 'border-cyan-500/50 hover:border-cyan-400';

  const badgeBg = 
    issue.severity === 'error' 
      ? 'bg-red-500 text-white' 
      : issue.severity === 'warning'
        ? 'bg-amber-500 text-black'
        : 'bg-cyan-500 text-black';

  return (
    <div className={`relative p-1 my-1 border border-dashed ${borderColor} rounded-2xl group/seo-overlay transition-all duration-300 w-full`}>
      <div className={`absolute top-0 left-4 -translate-y-1/2 z-50 text-[8.5px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-lg pointer-events-none select-none flex items-center gap-1 ${badgeBg}`}>
        <span>{issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <span>{issue.category.toUpperCase()}: {issue.title}</span>
      </div>
      
      {/* Tooltip on hovering the element */}
      <div className="absolute left-4 bottom-2 opacity-0 group-hover/seo-overlay:opacity-100 transition-opacity duration-200 z-50 bg-black/95 text-white border border-white/10 p-2.5 rounded-xl pointer-events-none max-w-xs text-[10px] font-sans shadow-xl">
        <div className="font-bold text-[#a78bfa]">💡 Suggested Audit Action:</div>
        <div className="text-zinc-300 mt-1 font-light leading-relaxed">{issue.suggestedAction}</div>
      </div>
      
      {children}
    </div>
  );
};

// Icon renderer helper
const DynamicIcon = ({ name, className, ...props }: { name: string; className?: string; [key: string]: any }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} {...props} />;
};

export const LandingPageItem: React.FC<LandingPageItemProps> = ({
  section,
  theme,
  fontFamily,
  onLeadSubmit,
  onPayTrigger,
  isPreview = false,
  showHeatmap = false,
  heatmapType = 'seo',
  seoIssues = [],
}) => {
  const { type, fields, isVisible } = section;

  if (!isVisible) return null;

  // Query helper for section-specific issue matching
  const getIssue = (suffix: string) => {
    if (!showHeatmap || heatmapType !== 'seo' || !seoIssues) return undefined;
    return seoIssues.find(i => i.id.endsWith(suffix));
  };

  // Determine font family class
  const getFontClass = (weight: 'display' | 'body') => {
    if (fontFamily === 'serif') return weight === 'display' ? 'font-serif' : 'font-sans';
    if (fontFamily === 'mono') return 'font-mono';
    if (fontFamily === 'cyberpunk') return 'font-mono tracking-wide uppercase';
    return weight === 'display' ? 'font-display select-none' : 'font-sans';
  };

  // Section theme wrapper helper
  const sectionStyle = {
    backgroundColor: theme.background,
    color: theme.text,
  };

  // 1. --- HERO SECTION ---
  if (type === 'hero') {
    const f = fields as any;
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={sectionStyle}
        className="relative py-20 px-6 md:px-12 overflow-hidden transition-all duration-300"
      >
        {/* Dynamic backdrop gradients helper */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full filter blur-[120px]"
            style={{ backgroundColor: theme.primary }}
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[50%] rounded-full filter blur-[100px]"
            style={{ backgroundColor: theme.secondary }}
          />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <ElementOverlay issue={getIssue('-kw-density')}>
              {f.badge && (
                <span
                  style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}40` }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border mb-2 inline-block"
                >
                  {f.badge}
                </span>
              )}
            </ElementOverlay>

            <ElementOverlay issue={getIssue('-h1-short') || getIssue('-multiple-h1')}>
              <h1
                className={`${getFontClass('display')} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight`}
                style={{ color: theme.text }}
              >
                {f.headline}
              </h1>
            </ElementOverlay>

            <ElementOverlay issue={getIssue('-thin-content')}>
              <p
                className={`${getFontClass('body')} text-lg md:text-xl`}
                style={{ color: theme.textMuted }}
              >
                {f.subheadline}
              </p>
            </ElementOverlay>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <ElementOverlay issue={getIssue('-generic-cta')}>
                <button
                  onClick={() => {
                    if (isPreview) return;
                    if (f.ctaActionType === 'leadForm' && onLeadSubmit) {
                      const el = document.getElementById('lead-form-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else if (f.ctaActionType === 'pricing' && onPayTrigger) {
                      const el = document.getElementById('pricing-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else if (f.ctaCustomUrl) {
                      window.open(f.ctaCustomUrl, '_blank');
                    }
                  }}
                  style={{ backgroundColor: theme.primary, color: theme.isDark ? '#000000' : '#FFFFFF' }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-purple-500/10 hover:opacity-95 transition-all text-center"
                >
                  {f.ctaText || 'Get Started Now'}
                </button>
              </ElementOverlay>
            </div>
          </div>

          {f.showImage && f.imageUrl && (
            <div className="lg:col-span-5 relative w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900/40">
              <ElementOverlay issue={getIssue('-generic-image')}>
                <img
                  src={f.imageUrl}
                  alt={f.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-750 hover:scale-105"
                />
              </ElementOverlay>
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  // 2. --- FEATURES BENTO / GRID ---
  if (type === 'features') {
    const f = fields as any;
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ ...sectionStyle, backgroundColor: theme.surface }}
        className="py-20 px-6 md:px-12 border-t border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <ElementOverlay issue={getIssue('-kw-density')}>
              <h2 className={`${getFontClass('display')} text-3xl md:text-4xl font-bold`} style={{ color: theme.text }}>
                {f.headline}
              </h2>
            </ElementOverlay>
            {f.subheadline && (
              <p className={`${getFontClass('body')} text-base md:text-lg`} style={{ color: theme.textMuted }}>
                {f.subheadline}
              </p>
            )}
          </div>

          <ElementOverlay issue={getIssue('-few-features')}>
            <div className={`grid gap-6 ${f.layout === 'bento' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
            {f.items?.map((item: any, idx: number) => {
              const isBentoSpan = f.layout === 'bento' && (idx === 0 || idx === 3);
              return (
                <div
                  key={item.id || idx}
                  style={{
                    backgroundColor: theme.background,
                    borderColor: `${theme.primary}15`,
                  }}
                  className={`p-6 rounded-2xl border bg-opacity-40 transition-all hover:-translate-y-1 ${
                    isBentoSpan ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div
                    style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                    className="p-3.5 rounded-xl w-12 h-12 flex items-center justify-center mb-6"
                  >
                    <DynamicIcon name={item.icon} className="w-6 h-6" />
                  </div>
                  <h3 className={`${getFontClass('display')} text-lg font-bold mb-2`} style={{ color: theme.text }}>
                    {item.title}
                  </h3>
                  <p className={`${getFontClass('body')} text-sm`} style={{ color: theme.textMuted }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          </ElementOverlay>
        </div>
      </motion.section>
    );
  }

  // 3. --- TIMER / COUNTER ---
  if (type === 'counter') {
    const f = fields as any;
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      if (!f.targetDate) return;

      const calculateTimeLeft = () => {
        const difference = +new Date(f.targetDate) - +new Date();
        let tl = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
          tl = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        setTimeLeft(tl);
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }, [f.targetDate]);

    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={sectionStyle}
        className="py-16 px-6 md:px-12 relative overflow-hidden text-center"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <ElementOverlay issue={getIssue('-kw-density')}>
            <h2 className={`${getFontClass('display')} text-2xl md:text-3xl font-semibold`} style={{ color: theme.text }}>
              {f.headline}
            </h2>
          </ElementOverlay>

          {/* Countdown Boxes */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((box, bIdx) => (
              <div
                key={bIdx}
                style={{ backgroundColor: theme.surface, borderColor: `${theme.primary}20` }}
                className="w-20 sm:w-28 py-4 rounded-2xl border flex flex-col justify-center items-center shadow-md shadow-black/20"
              >
                <span className="text-3xl sm:text-4xl font-extrabold" style={{ color: theme.primary }}>
                  {box.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1 opacity-70">
                  {box.label}
                </span>
              </div>
            ))}
          </div>

          {/* Statistics Grid */}
          {f.stats && f.stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-white/5">
              {f.stats.map((stat: any, sIdx: number) => (
                <div key={sIdx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: theme.secondary }}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm tracking-wide" style={{ color: theme.textMuted }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  // 4. --- LEAD FORM WAITLIST ---
  if (type === 'leadForm') {
    const f = fields as any;
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      
      if (onLeadSubmit && !isPreview) {
        onLeadSubmit(email, section.id);
      }
      
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    };

    return (
      <motion.section
        id="lead-form-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ ...sectionStyle, backgroundColor: theme.surface }}
        className="py-20 px-6 md:px-12 border-t border-b border-white/5 relative overflow-hidden"
      >
        <ConfettiCanvas active={submitted} colorTheme={theme.secondary} />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 select-none relative z-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <ElementOverlay issue={getIssue('-kw-density')}>
              <h2 className={`${getFontClass('display')} text-3xl md:text-4xl font-bold`} style={{ color: theme.text }}>
                {f.headline}
              </h2>
            </ElementOverlay>
            <p className={`${getFontClass('body')} text-base opacity-90`} style={{ color: theme.textMuted }}>
              {f.description}
            </p>
          </div>

          <div className="max-w-md mx-auto pt-4 relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ backgroundColor: `${theme.secondary}15`, borderColor: theme.secondary }}
                  className="p-5 rounded-2xl border text-sm text-center"
                >
                  <p style={{ color: theme.text }} className="font-medium">
                    {f.successMessage || '🎉 Success! You have joined our list.'}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleFormSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    required
                    placeholder={f.placeholder || 'Enter your email...'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ backgroundColor: theme.background, color: theme.text, borderColor: `${theme.primary}20` }}
                    className="flex-1 px-5 py-4 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-sans"
                  />
                  <ElementOverlay issue={getIssue('-plain-form-btn')}>
                    <button
                      type="submit"
                      style={{ backgroundColor: theme.secondary, color: theme.isDark ? '#000000' : '#FFFFFF' }}
                      className="px-8 py-4 rounded-xl text-sm font-semibold hover:opacity-95 shadow-md shadow-cyan-500/10 transition-all whitespace-nowrap cursor-pointer hover:scale-102"
                    >
                      {f.buttonText || 'Join Waitlist'}
                    </button>
                  </ElementOverlay>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    );
  }

  // 5. --- PRICING ---
  if (type === 'pricing') {
    const f = fields as any;
    return (
      <motion.section
        id="pricing-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={sectionStyle}
        className="py-20 px-6 md:px-12 select-none"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <ElementOverlay issue={getIssue('-kw-density')}>
              <h2 className={`${getFontClass('display')} text-3xl md:text-4xl font-bold`} style={{ color: theme.text }}>
                {f.headline}
              </h2>
            </ElementOverlay>
            {f.description && (
              <p className={`${getFontClass('body')} text-base opacity-80`} style={{ color: theme.textMuted }}>
                {f.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
            {f.plans?.map((plan: any, pIdx: number) => {
              const isPopular = plan.isPopular;
              return (
                <div
                  key={plan.id || pIdx}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: isPopular ? theme.primary : `${theme.primary}15`,
                  }}
                  className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular ? 'shadow-xl md:-translate-y-2' : 'shadow-md shadow-black/10'
                  }`}
                >
                  {isPopular && (
                    <span
                      style={{ backgroundColor: theme.primary, color: theme.isDark ? '#000000' : '#FFFFFF' }}
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    >
                      Most Popular ⚡
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className={`${getFontClass('display')} text-xl font-bold`} style={{ color: theme.text }}>
                        {plan.name}
                      </h3>
                      <p className={`${getFontClass('body')} text-xs mt-1.5`} style={{ color: theme.textMuted }}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2 pt-2 border-b border-white/5 pb-4">
                      <span className="text-4xl font-extrabold" style={{ color: theme.text }}>
                        ₹{plan.priceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm opacity-60" style={{ color: theme.textMuted }}>
                        / {plan.period === 'one-time' ? 'lifetime' : plan.period}
                      </span>
                      {plan.priceUSD > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded ml-2 bg-white/5 opacity-80" style={{ color: theme.textMuted }}>
                          ~ ${plan.priceUSD} USD
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3.5">
                      {plan.features?.map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                          <DynamicIcon name="Check" className="w-4 h-4 mt-0.5 shrink-0" style={{ color: theme.secondary }} />
                          <span style={{ color: theme.text }}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => {
                        if (isPreview) return;
                        if (onPayTrigger) onPayTrigger(plan.name, plan.priceINR);
                      }}
                      style={{
                        backgroundColor: isPopular ? theme.primary : 'transparent',
                        color: isPopular ? (theme.isDark ? '#000000' : '#FFFFFF') : theme.text,
                        borderColor: isPopular ? 'transparent' : `${theme.primary}50`,
                      }}
                      className="w-full py-3.5 rounded-xl text-sm font-bold border hover:opacity-95 transition-all text-center cursor-pointer"
                    >
                      {plan.priceINR === 0 ? 'Secure Free Pass' : 'Select Plan & Checkout 💳'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    );
  }

  // 6. --- TESTIMONIALS ---
  if (type === 'testimonials') {
    const f = fields as any;
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={sectionStyle}
        className="py-20 px-6 md:px-12 select-none border-t border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <ElementOverlay issue={getIssue('-kw-density')}>
              <h2 className={`${getFontClass('display')} text-3xl md:text-4xl font-bold`} style={{ color: theme.text }}>
                {f.headline}
              </h2>
            </ElementOverlay>
            {f.description && (
              <p className={`${getFontClass('body')} text-base opacity-80`} style={{ color: theme.textMuted }}>
                {f.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {f.items?.map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                style={{ backgroundColor: theme.surface, borderColor: `${theme.primary}10` }}
                className="p-6 rounded-2xl border bg-opacity-70 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(item.rating || 5)].map((_, sIdx) => (
                      <DynamicIcon key={sIdx} name="Star" className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className={`${getFontClass('body')} text-sm leading-relaxed`} style={{ color: theme.text }}>
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
                  <ElementOverlay issue={getIssue('-missing-avatars')}>
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.author}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div
                        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      >
                        {item.author?.[0] || 'U'}
                      </div>
                    )}
                  </ElementOverlay>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: theme.text }}>
                      {item.author}
                    </div>
                    <div className="text-xs" style={{ color: theme.textMuted }}>
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  // 7. --- FAQ ---
  if (type === 'faq') {
    const f = fields as any;
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ ...sectionStyle, backgroundColor: theme.background }}
        className="py-20 px-6 md:px-12 select-none"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <ElementOverlay issue={getIssue('-kw-density')}>
              <h2 className={`${getFontClass('display')} text-3xl md:text-4xl font-bold`} style={{ color: theme.text }}>
                {f.headline}
              </h2>
            </ElementOverlay>
            {f.description && (
              <p className={`${getFontClass('body')} text-base opacity-80`} style={{ color: theme.textMuted }}>
                {f.description}
              </p>
            )}
          </div>

          <ElementOverlay issue={getIssue('-sparse-faq')}>
            <div className="space-y-4">
            {f.items?.map((item: any, idx: number) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={item.id || idx}
                  style={{ backgroundColor: theme.surface, borderColor: isOpen ? theme.primary : `${theme.primary}10` }}
                  className="rounded-2xl border overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className={`${getFontClass('display')} text-base font-bold`} style={{ color: theme.text }}>
                      {item.question}
                    </span>
                    <DynamicIcon
                      name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      className="w-4 h-4 opacity-70 shrink-0"
                      style={{ color: theme.primary }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-sm border-t border-white/5 leading-relaxed" style={{ color: theme.textMuted }}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          </ElementOverlay>
        </div>
      </motion.section>
    );
  }

  // 8. --- FOOTER ---
  if (type === 'footer') {
    const f = fields as any;
    return (
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ ...sectionStyle, backgroundColor: theme.surface }}
        className="py-12 px-6 md:px-12 border-t border-white/5 select-none"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className={`${getFontClass('display')} text-lg font-bold tracking-tight`} style={{ color: theme.text }}>
              {f.brandText || 'FlashFocus Builder'}
            </h4>
            <p className="text-xs" style={{ color: theme.textMuted }}>
              {f.copyright || '© 2026 FlashFocus. Launched visually.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ElementOverlay issue={getIssue('-missing-socials')}>
              <div className="flex items-center gap-4">
                {f.twitterUrl && (
                  <a
                    href={f.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: theme.textMuted }}
                    className="hover:scale-110 transition-transform"
                  >
                    <DynamicIcon name="Twitter" className="w-5 h-5 hover:text-white" />
                  </a>
                )}
                {f.githubUrl && (
                  <a
                    href={f.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: theme.textMuted }}
                    className="hover:scale-110 transition-transform"
                  >
                    <DynamicIcon name="Github" className="w-5 h-5 hover:text-white" />
                  </a>
                )}
                {f.linkedinUrl && (
                  <a
                    href={f.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: theme.textMuted }}
                    className="hover:scale-110 transition-transform"
                  >
                    <DynamicIcon name="Linkedin" className="w-5 h-5 hover:text-white" />
                  </a>
                )}
              </div>
            </ElementOverlay>
          </div>
        </div>
      </motion.footer>
    );
  }

  return null;
};
