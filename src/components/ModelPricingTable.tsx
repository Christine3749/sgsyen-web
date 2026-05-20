import { ModelPricing, GEMINI_MODELS } from '../types';
import { HelpCircle, Layers, Cpu } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

interface ModelPricingTableProps {
  onSelectModel?: (id: string) => void;
  selectedModelId?: string;
}

export default function ModelPricingTable({ onSelectModel, selectedModelId }: ModelPricingTableProps) {
  const { locale, t } = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-[#1D1D1B] pb-4">
        <div>
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#A58261]">
            {t('tableHeroTitle')}
          </span>
          <h2 className="text-3xl font-serif font-medium mt-1">{t('tableTitle')}</h2>
        </div>
        <div className="text-xs text-stone-500 font-sans mt-2 md:mt-0 italic select-none">
          {t('tableDisclaimer')}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#1D1D1B]/20 text-[10px] tracking-widest uppercase font-bold text-stone-500">
              <th className="py-3 px-2">{t('tableThModel')}</th>
              <th className="py-3 px-2 text-right">{t('tableThInputLess')}</th>
              <th className="py-3 px-2 text-right">{t('tableThInputMore')}</th>
              <th className="py-3 px-2 text-right">{t('tableThOutputLess')}</th>
              <th className="py-3 px-2 text-right">{t('tableThOutputMore')}</th>
              <th className="py-3 px-2 text-right">{t('tableThContextLimit')}</th>
              <th className="py-3 px-2 text-right">{t('tableThMultimodal')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D1D1B]/10">
            {GEMINI_MODELS.map((model) => {
              const isSelected = selectedModelId === model.id;
              return (
                <tr 
                  key={model.id}
                  onClick={() => onSelectModel?.(model.id)}
                  className={`group cursor-pointer transition-colors duration-200 ${
                    isSelected 
                      ? 'bg-[#A58261]/10 border-l-2 border-[#A58261]' 
                      : 'hover:bg-[#1D1D1B]/2 border-l-2 border-transparent'
                  }`}
                >
                  <td className="py-4 px-2 select-all">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-medium text-base text-[#1D1D1B]">
                        {isZh ? model.name : model.nameEn}
                      </span>
                      {isSelected && (
                        <span className="text-[8px] bg-[#A58261] text-[#FDFCF9] font-sans font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
                          {t('tableCurrentlySelected')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 font-sans max-w-sm mt-1 leading-relaxed">
                      {isZh ? model.description : model.descriptionEn}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-[#1D1D1B]">
                    ${model.inputCostPerMillionLess128k.toFixed(3)}
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-stone-600">
                    {model.inputCostPerMillionMore128k !== model.inputCostPerMillionLess128k ? (
                      <span className="text-[#A58261] font-semibold">
                        ${model.inputCostPerMillionMore128k.toFixed(2)}
                      </span>
                    ) : (
                      <span className="opacity-40">-</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-[#1D1D1B]">
                    ${model.outputCostPerMillionLess128k.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-stone-600">
                    {model.outputCostPerMillionMore128k !== model.outputCostPerMillionLess128k ? (
                      <span className="text-[#A58261] font-semibold">
                        ${model.outputCostPerMillionMore128k.toFixed(2)}
                      </span>
                    ) : (
                      <span className="opacity-40">-</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-right font-mono">
                    {(model.maxContext / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-xs text-stone-500 space-y-1 select-none">
                    <div>🖼️ <span className="text-[#1D1D1B]">{model.multimodal.images}</span> {t('tableTokenPerImage')}</div>
                    <div>🎙️ <span className="text-[#1D1D1B]">{model.multimodal.audioPerSecond}</span> {t('tableTokenPerAudio')}</div>
                    <div>🎥 <span className="text-[#1D1D1B]">{model.multimodal.videoPerSecond}</span> {t('tableTokenPerVideo')}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-[12px] text-stone-600 font-sans leading-relaxed">
        <div className="border border-[#1D1D1B]/10 p-4 rounded bg-[#F9F7F2] space-y-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-[#A58261]">
            <Layers className="w-3.5 h-3.5" />
            {t('tableWhyProOver128kTitle')}
          </div>
          <p>{t('tableWhyProOver128kDesc')}</p>
        </div>

        <div className="border border-[#1D1D1B]/10 p-4 rounded bg-[#F9F7F2] space-y-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-[#A58261]">
            <Cpu className="w-3.5 h-3.5" />
            {t('tableFlashOptimizationTitle')}
          </div>
          <p>{t('tableFlashOptimizationDesc')}</p>
        </div>

        <div className="border border-[#1D1D1B]/10 p-4 rounded bg-[#F9F7F2] space-y-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-[#A58261]">
            <HelpCircle className="w-3.5 h-3.5" />
            {t('tableCacheRulesTitle')}
          </div>
          <p>{t('tableCacheRulesDesc')}</p>
        </div>
      </div>
    </div>
  );
}
