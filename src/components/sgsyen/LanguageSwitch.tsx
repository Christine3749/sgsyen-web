import { useLocale } from '../../context/LocaleContext';

type LanguageSwitchProps = {
  className?: string;
};

export default function LanguageSwitch({ className = '' }: LanguageSwitchProps) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`h-7 inline-flex items-center overflow-hidden rounded border border-[#1D1D1B]/10 bg-white text-[9px] font-sans font-bold uppercase tracking-widest shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setLocale('zh')}
        className={`h-full px-2.5 transition-colors cursor-pointer ${
          locale === 'zh' ? 'bg-[#1D1D1B] text-[#FDFCF9]' : 'text-stone-400 hover:text-[#1D1D1B]'
        }`}
      >
        中文 (ZH)
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`h-full px-2.5 transition-colors cursor-pointer ${
          locale === 'en' ? 'bg-[#1D1D1B] text-[#FDFCF9]' : 'text-stone-400 hover:text-[#1D1D1B]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
