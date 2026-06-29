import React from 'react';
import { motion } from 'motion/react';
import { useLocale } from '../../context/LocaleContext';

export default function SgsyenHero() {
  const { t, locale } = useLocale();

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

      {/* Decorative text banner on the right */}
      <div
        id="sgsyen-vertical-tagline"
        className="absolute right-[6%] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block z-10"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.25rem',
          fontWeight: 600,
          letterSpacing: '0.4em',
          color: 'rgba(253, 252, 249, 0.08)',
        }}
      >
        {t('sgsyenHeroVertical')}
      </div>

      {/* Watermark character in background */}
      <div
        id="sgsyen-bg-watermark"
        className="absolute right-[1%] -bottom-[12%] pointer-events-none select-none hidden lg:block text-[45vw] font-serif leading-none"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 900,
          color: 'rgba(253, 252, 249, 0.012)',
          letterSpacing: '-0.05em',
        }}
      >
        {locale === 'zh' ? '策' : 'S'}
      </div>

      {/* System status stamp: the page's visual eye */}
      <motion.aside
        id="sgsyen-regime-engine-stamp"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
        className="absolute left-[8%] top-[42%] z-20 hidden xl:block w-[230px] select-none border border-[#C4A35A]/25 bg-[#111110]/35 px-5 py-4 backdrop-blur-[2px]"
      >
        <div className="flex items-center gap-2 text-[9px] font-sans font-bold uppercase tracking-[0.26em] text-[#C4A35A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C4A35A] shadow-[0_0_12px_rgba(196,163,90,0.55)]" />
          REGIME ENGINE ACTIVE
        </div>
        <div className="mt-3 text-[11px] font-sans font-semibold tracking-[0.18em] text-[#FDFCF9]/82">
          {locale === 'zh' ? '周更 · 大事即时' : 'Weekly · Event Triggered'}
        </div>

      </motion.aside>
      {/* Hero content aligned in column */}
      <div 
        id="sgsyen-hero-content-bag" 
        className="relative z-10 ml-auto w-full max-w-[820px]"
      >
        <motion.div
          id="sgsyen-hero-meta"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-4 mb-8"
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
            style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.3), transparent)' }} 
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
          className="w-full max-w-[480px] h-px mb-8 border-0 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(253,252,249,0.15), transparent)' }}
        />

        <motion.p
          id="sgsyen-hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="leading-[1.9] text-sm md:text-base max-w-2xl font-light tracking-wide text-[#FDFCF9]/70"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {t('sgsyenHeroDescription')}
        </motion.p>
      </div>
    </section>
  );
}
