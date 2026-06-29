import { useLocale } from '../../context/LocaleContext';

type LanguageSwitchProps = {
  className?: string;
};

export default function LanguageSwitch({ className = '' }: LanguageSwitchProps) {
  const { locale, setLocale } = useLocale();
  const nextLocale = locale === 'zh' ? 'en' : 'zh';

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
      className={`h-7 inline-flex items-center justify-center rounded border border-[#1D1D1B]/10 bg-white px-3 text-[9px] font-sans font-bold uppercase tracking-widest text-stone-600 hover:border-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-[#FDFCF9] transition-colors cursor-pointer shrink-0 ${className}`}
    >
      {locale === 'zh' ? '中文' : 'EN'}
    </button>
  );
}
