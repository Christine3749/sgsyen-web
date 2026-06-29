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
  const nextMode: SgsyenViewMode = viewMode === 'classic' ? 'panorama' : 'classic';

  const switchViewMode = () => {
    const params = new URLSearchParams(location.search);
    params.set('view', nextMode);
    params.delete('layout');
    navigate({ pathname: location.pathname, search: `?${params.toString()}`, hash: location.hash });
  };

  const label = locale === 'zh'
    ? (viewMode === 'classic' ? '经典' : '全景')
    : (viewMode === 'classic' ? 'Classic' : 'Panorama');

  return (
    <button
      type="button"
      onClick={switchViewMode}
      title={locale === 'zh' ? '切换经典 / 全景' : 'Toggle classic / panorama'}
      className={`h-7 inline-flex items-center justify-center rounded border border-[#1D1D1B]/10 bg-white px-3 text-[9px] font-sans font-bold uppercase tracking-widest text-stone-600 hover:border-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-[#FDFCF9] transition-colors cursor-pointer shrink-0 ${className}`}
    >
      {label}
    </button>
  );
}
