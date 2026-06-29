import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';
import { getSgsyenViewMode, type SgsyenViewMode } from '../../lib/layoutMode';

type ViewModeSwitchProps = {
  className?: string;
};

export default function ViewModeSwitch({ className = '' }: ViewModeSwitchProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale } = useLocale();
  const viewMode = getSgsyenViewMode(location.search);

  const switchViewMode = (mode: SgsyenViewMode) => {
    const params = new URLSearchParams(location.search);
    params.set('view', mode);
    params.delete('layout');
    navigate({ pathname: location.pathname, search: `?${params.toString()}`, hash: location.hash });
  };

  return (
    <div className={`h-7 inline-flex items-center overflow-hidden rounded border border-[#1D1D1B]/10 bg-white text-[9px] font-sans font-bold uppercase tracking-widest shrink-0 ${className}`}>
      {(['classic', 'panorama'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => switchViewMode(mode)}
          className={`h-full px-2.5 transition-colors cursor-pointer ${viewMode === mode ? 'bg-[#1D1D1B] text-[#FDFCF9]' : 'text-stone-400 hover:text-[#1D1D1B]'}`}
        >
          {locale === 'zh'
            ? (mode === 'classic' ? '经典' : '全景')
            : (mode === 'classic' ? 'Classic' : 'Panorama')}
        </button>
      ))}
    </div>
  );
}