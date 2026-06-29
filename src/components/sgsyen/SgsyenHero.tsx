import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLocale } from '../../context/LocaleContext';
import { getSgsyenViewMode } from '../../lib/layoutMode';

type HeroSignalTarget = 'weeklyMemo' | 'latestGlobalEvent' | 'temporaFlip';

type HeroSignalLine = { title: string; path: string; target: HeroSignalTarget };

const regimeSignalLines: Record<'zh' | 'en', HeroSignalLine[]> = {
  zh: [
    { title: '全球事件进入模型：从日元 160 到世界风险权重重估', path: '事件 → 历史镜像 → 模型动作', target: 'weeklyMemo' },
    { title: '近期最重要事件 · 全球事件消化层', path: '最新事件 → regime 概率 → 风险预算', target: 'latestGlobalEvent' },
  ],
  en: [
    { title: 'Global Events Enter the Model: From JPY 160 to Risk-Weight Repricing', path: 'Event → Mirror → Model Action', target: 'weeklyMemo' },
    { title: 'Latest Critical Event · Global Event Digest', path: 'Latest Event → Regime Probability → Risk Budget', target: 'latestGlobalEvent' },
  ],
};

const projectSignalLines: Record<'zh' | 'en', HeroSignalLine[]> = {
  zh: [
    { title: '近期项目 · Tempora Flip 预览打磨', path: '字形 → 屏保 → 下载通道', target: 'temporaFlip' },
  ],
  en: [
    { title: 'Current Project · Tempora Flip Preview', path: 'Type → Screensaver → Download Path', target: 'temporaFlip' },
  ],
};

export default function SgsyenHero() {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const viewMode = getSgsyenViewMode(location.search);
  const signalLines = locale === 'zh' ? regimeSignalLines.zh : regimeSignalLines.en;
  const projectLines = locale === 'zh' ? projectSignalLines.zh : projectSignalLines.en;

  const openSignal = (target: HeroSignalTarget) => {
    if (target === 'weeklyMemo') {
      navigate(`/research?view=${viewMode}&article=weekly-memo#weekly-event-frame`);
      return;
    }
    if (target === 'latestGlobalEvent') {
      navigate(`/research?view=${viewMode}#latest-global-events`);
      return;
    }
    navigate(`/workspace/tempora-flip?view=${viewMode}`);
  };

  return (
    <section
      id="sgsyen-hero-section"
      className="min-h-[85vh] flex flex-col justify-end relative overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20 text-[#FDFCF9]"
      style={{
        background: 'linear-gradient(165deg, #111110 0%, #151520 100%)',
      }}
    >
      {/* Dynamic light glows */}
      <div
        id="sgsyen-hero-ambient-glows"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(165, 130, 97, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(200, 62, 62, 0.06) 0%, transparent 50%)',
        }}
      />

      {/* Decorative text banner on the left */}
      <div
        id="sgsyen-vertical-tagline"
        className="absolute left-[2.4%] top-[55%] -translate-y-1/2 pointer-events-none select-none hidden xl:block z-10"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.25rem',
          fontWeight: 600,
          letterSpacing: '0.4em',
          color: 'rgba(253, 252, 249, 0.055)',
        }}
      >
        {t('sgsyenHeroVertical')}
      </div>

      {/* Watermark character in background */}
      <div
        id="sgsyen-bg-watermark"
        className="absolute left-[-7.5%] -bottom-[14%] pointer-events-none select-none hidden lg:block text-[45vw] font-serif leading-none"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 900,
          color: 'rgba(253, 252, 249, 0.011)',
          letterSpacing: '-0.05em',
        }}
      >
        {locale === 'zh' ? '策' : 'S'}
      </div>

      {/* System signal: the page's visual eye */}
      <motion.aside
        id="sgsyen-regime-engine-stamp"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
        className="absolute left-[13.5%] top-[41.5%] z-20 hidden xl:block w-[320px] select-none"
      >
        <div className="flex items-center gap-3 text-[9px] font-sans font-bold uppercase tracking-[0.28em] text-[#C4A35A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C4A35A] shadow-[0_0_12px_rgba(196,163,90,0.55)]" />
          <span>REGIME ENGINE ACTIVE</span>
          <span className="h-px w-16 bg-gradient-to-r from-[#C4A35A]/35 to-transparent" />
        </div>
        <div className="mt-4 space-y-3">
          {signalLines.map((line) => (
            <button
              key={line.title}
              type="button"
              onClick={() => openSignal(line.target)}
              className="block w-full rounded-sm text-left cursor-pointer transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C4A35A]/60"
            >
              <div className="text-[12px] font-sans font-semibold tracking-[0.16em] text-[#FDFCF9]/88 transition-colors group-hover:text-[#FDFCF9]">
                {line.title}
              </div>
              <div className="mt-1.5 text-[10px] font-sans tracking-[0.18em] text-[#8F8A92] transition-colors group-hover:text-[#C4A35A]">
                {line.path}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-7 pt-5 border-t border-[#C4A35A]/10">
          <div className="flex items-center gap-3 text-[9px] font-sans font-bold uppercase tracking-[0.28em] text-[#C4A35A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4A35A]/90" />
            <span>PROJECT FORGE ACTIVE</span>
            <span className="h-px w-16 bg-gradient-to-r from-[#C4A35A]/35 to-transparent" />
          </div>
          <div className="mt-4 space-y-3">
            {projectLines.map((line) => (
              <button
                key={line.title}
                type="button"
                onClick={() => openSignal(line.target)}
                className="block w-full rounded-sm text-left cursor-pointer transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C4A35A]/60"
              >
                <div className="text-[12px] font-sans font-semibold tracking-[0.16em] text-[#FDFCF9]/88 transition-colors group-hover:text-[#FDFCF9]">
                  {line.title}
                </div>
                <div className="mt-1.5 text-[10px] font-sans tracking-[0.18em] text-[#8F8A92] transition-colors group-hover:text-[#C4A35A]">
                  {line.path}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.aside>
      {/* Hero content aligned in column */}
      <div 
        id="sgsyen-hero-content-bag" 
        className="relative z-10 ml-auto w-full max-w-[820px] xl:mr-10 2xl:mr-14 text-right"
      >
        <motion.div
          id="sgsyen-hero-meta"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-row-reverse items-center gap-4 mb-8"
        >
          <p
            id="sgsyen-hero-badge"
            className="text-[9px] tracking-[0.45em] uppercase text-[#C4A35A] font-sans font-semibold"
          >
            {t('sgsyenHeroBadge')}
          </p>
          <span 
            id="sgsyen-hero-badge-line" 
            className="block w-16 md:w-24 h-px" 
            style={{ background: 'linear-gradient(270deg, rgba(196,163,90,0.3), transparent)' }} 
          />
        </motion.div>

        <motion.h1
          id="sgsyen-hero-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-white text-4xl md:text-6xl lg:text-[6.5rem] font-serif font-black leading-[1.1] tracking-tight mb-10"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {t('sgsyenHeroTitleStart')}
          <em id="sgsyen-style-italic-era" className="not-italic relative inline-block text-[#FDFCF9]">
            {t('sgsyenHeroTitleHighlight')}
            <span 
              id="sgsyen-era-highlight-bar" 
              className="absolute bottom-1 md:bottom-2 left-0 w-full h-[3px] md:h-[5px]" 
              style={{ background: '#C83E3E' }} 
            />
          </em>
          {locale === 'zh' ? <br /> : ' '}
          {t('sgsyenHeroTitleEnd')}
        </motion.h1>

        <motion.hr
          id="sgsyen-hero-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-[480px] h-px mb-8 border-0 origin-right ml-auto"
          style={{ background: 'linear-gradient(270deg, rgba(196,163,90,0.30), rgba(196,163,90,0.08), transparent)' }}
        />

        <motion.p
          id="sgsyen-hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="leading-[1.9] text-sm md:text-base max-w-[760px] ml-auto font-light tracking-wide text-[#B9B4BC] text-right [text-align-last:right]"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {t('sgsyenHeroDescription')}
        </motion.p>
      </div>
    </section>
  );
}
