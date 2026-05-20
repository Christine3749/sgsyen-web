import React, { useState, useEffect } from 'react';
import { WORKLOAD_PRESETS, GEMINI_MODELS, ModelPricing, WorkloadPreset } from '../types';
import { HelpCircle, Sparkles, FileText, Image as ImageIcon, Video, Mic } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

interface CostCalculatorProps {
  initialModelId?: string;
}

export default function CostCalculator({ initialModelId }: CostCalculatorProps) {
  const { locale, t } = useLocale();
  const isZh = locale === 'zh';

  // Calculator state variables
  const [selectedPreset, setSelectedPreset] = useState<string>('分析 200 页财务年报 PDF');
  const [textTokens, setTextTokens] = useState<number>(180000);
  const [imagesCount, setImagesCount] = useState<number>(20);
  const [audioMinutes, setAudioMinutes] = useState<number>(0);
  const [videoMinutes, setVideoMinutes] = useState<number>(0);
  const [outputTokens, setOutputTokens] = useState<number>(4000);
  const [useCaching, setUseCaching] = useState<boolean>(true);
  
  // Custom presets change handler
  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName === 'custom') return;
    
    const preset = WORKLOAD_PRESETS.find(p => p.name === presetName || p.nameEn === presetName);
    if (preset) {
      setTextTokens(preset.textTokens);
      setImagesCount(preset.imagesCount);
      setAudioMinutes(preset.audioMinutes);
      setVideoMinutes(preset.videoMinutes);
      setOutputTokens(preset.outputTokens);
      setUseCaching(preset.useCaching);
    }
  };

  // Calculated tokens values
  const [totalInputTokens, setTotalInputTokens] = useState<number>(0);
  const [breakdown, setBreakdown] = useState({
    text: 0,
    images: 0,
    audio: 0,
    video: 0,
  });

  // Calculate tokens whenever inputs change (using standard 1.5 Pro equivalents as standard)
  useEffect(() => {
    const textT = textTokens;
    const imageT = imagesCount * 258;
    const audioT = audioMinutes * 60 * 25;
    const videoT = videoMinutes * 60 * 263;
    
    setBreakdown({
      text: textT,
      images: imageT,
      audio: audioT,
      video: videoT,
    });

    setTotalInputTokens(textT + imageT + audioT + videoT);
  }, [textTokens, imagesCount, audioMinutes, videoMinutes]);

  // Pricing engine helper
  const calculateCost = (model: ModelPricing): {
    inputCost: number;
    outputCost: number;
    cachingSavings: number;
    totalCost: number;
    isOverLimit: boolean;
  } => {
    const contextSize = totalInputTokens + outputTokens;
    const isOverLimit = contextSize > model.maxContext;

    const usePremiumRates = contextSize > 128000;
    
    const inputRatePerMillion = usePremiumRates 
      ? model.inputCostPerMillionMore128k 
      : model.inputCostPerMillionLess128k;

    const outputRatePerMillion = usePremiumRates
      ? model.outputCostPerMillionMore128k
      : model.outputCostPerMillionLess128k;

    // Standard input cost
    let baseInputCost = (totalInputTokens / 1000000) * inputRatePerMillion;
    let cachingSavings = 0;

    // Apply caching discount if toggled
    if (useCaching) {
      if (totalInputTokens >= 32768) {
        cachingSavings = baseInputCost * model.cachingDiscount;
      }
    }

    const finalInputCost = baseInputCost - cachingSavings;
    const finalOutputCost = (outputTokens / 1000000) * outputRatePerMillion;

    return {
      inputCost: parseFloat(finalInputCost.toFixed(6)),
      outputCost: parseFloat(finalOutputCost.toFixed(6)),
      cachingSavings: parseFloat(cachingSavings.toFixed(6)),
      totalCost: parseFloat((finalInputCost + finalOutputCost).toFixed(6)),
      isOverLimit
    };
  };

  const presetsList = [...WORKLOAD_PRESETS];

  return (
    <div className="bg-[#FAF9F5] border border-[#1D1D1B] p-6 md:p-8 space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#1D1D1B]/25 pb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#A58261] font-bold">
            {t('calcHeroTitle')}
          </span>
          <h3 className="text-3xl font-serif font-medium mt-1">{t('calcTitle')}</h3>
          <p className="font-sans text-xs text-stone-500 mt-2 max-w-2xl leading-relaxed">
            {t('calcDesc')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#A58261] block shrink-0">{t('calcPresetLabel')}</label>
          <select
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="text-xs bg-white border border-[#1D1D1B]/20 rounded px-2.5 py-1.5 focus:border-[#A58261] focus:outline-none font-sans"
          >
            {presetsList.map((preset) => (
              <option key={preset.name} value={preset.name}>
                {isZh ? preset.name : preset.nameEn}
              </option>
            ))}
            <option value="custom">{t('calcCustomOption')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Vector controls */}
        <div className="lg:col-span-5 space-y-6">
          <h4 className="text-xs font-sans uppercase tracking-wider font-bold text-[#1D1D1B] border-b border-[#1D1D1B]/10 pb-2">
            {t('calcInputHeader')}
          </h4>

          {/* Text Tokens Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans">
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <FileText className="w-3.5 h-3.5 text-[#A58261]" /> {t('calcTextLabel')}
              </span>
              <span className="font-mono text-stone-900 font-bold">
                {textTokens.toLocaleString()} {t('calcCharToken')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1500000"
              step="5000"
              value={textTokens}
              onChange={(e) => {
                setTextTokens(parseInt(e.target.value));
                setSelectedPreset('custom');
              }}
              className="w-full accent-[#A58261]"
            />
            <div className="flex justify-between text-[10px] text-stone-600 font-sans">
              <span>{t('calcSliderTextMin')}</span>
              <span>{t('calcSliderTextMid')}</span>
              <span>{t('calcSliderTextMax')}</span>
            </div>
          </div>

          {/* Multimodal Grid inputs */}
          <div className="grid grid-cols-3 gap-4">
            {/* Images */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-medium text-stone-700 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-[#A58261]" /> {t('calcImagesLabel')}
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={imagesCount}
                onChange={(e) => {
                  setImagesCount(Math.max(0, parseInt(e.target.value) || 0));
                  setSelectedPreset('custom');
                }}
                className="w-full text-xs font-mono bg-white border border-[#1D1D1B]/10 rounded px-2 py-1.5 focus:border-[#A58261] focus:outline-none"
              />
              <span className="text-[9px] font-sans text-stone-500 block">
                ≈ {(imagesCount * 258).toLocaleString()} tok
              </span>
            </div>

            {/* Audio Minutes */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-medium text-stone-700 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-[#A58261]" /> {t('calcAudioLabel')}
              </label>
              <input
                type="number"
                min="0"
                max="240"
                value={audioMinutes}
                onChange={(e) => {
                  setAudioMinutes(Math.max(0, parseInt(e.target.value) || 0));
                  setSelectedPreset('custom');
                }}
                className="w-full text-xs font-mono bg-white border border-[#1D1D1B]/10 rounded px-2 py-1.5 focus:border-[#A58261] focus:outline-none"
              />
              <span className="text-[9px] font-sans text-stone-500 block">
                ≈ {(audioMinutes * 60 * 25).toLocaleString()} tok
              </span>
            </div>

            {/* Video Minutes */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-medium text-stone-700 flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-[#A58261]" /> {t('calcVideoLabel')}
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={videoMinutes}
                onChange={(e) => {
                  setVideoMinutes(Math.max(0, parseInt(e.target.value) || 0));
                  setSelectedPreset('custom');
                }}
                className="w-full text-xs font-mono bg-white border border-[#1D1D1B]/10 rounded px-2 py-1.5 focus:border-[#A58261] focus:outline-none"
              />
              <span className="text-[9px] font-sans text-stone-500 block">
                ≈ {(videoMinutes * 60 * 263).toLocaleString()} tok
              </span>
            </div>
          </div>

          <div className="border-t border-[#1D1D1B]/10 pt-4 space-y-4">
            {/* Output Tokens */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#A58261]" /> {t('calcOutputLabel')}
                </span>
                <span className="font-mono text-stone-900 font-bold">
                  {outputTokens.toLocaleString()} Token
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="32000"
                step="250"
                value={outputTokens}
                onChange={(e) => {
                  setOutputTokens(parseInt(e.target.value));
                  setSelectedPreset('custom');
                }}
                className="w-full accent-[#A58261]"
              />
              <div className="flex justify-between text-[10px] text-stone-600 font-sans">
                <span>{t('calcOutputMin')}</span>
                <span>{t('calcOutputMid')}</span>
                <span>{t('calcOutputMax')}</span>
              </div>
            </div>

            {/* Context Caching Option */}
            <div className="flex items-start gap-3 bg-[#1D1D1B]/4 p-3.5 border border-[#1D1D1B]/10 rounded">
              <input
                type="checkbox"
                id="useCachingCheckbox"
                checked={useCaching}
                disabled={totalInputTokens < 32768}
                onChange={(e) => setUseCaching(e.target.checked)}
                className="mt-1 accent-[#A58261] w-4 h-4 cursor-pointer"
              />
              <div className="text-xs font-sans">
                <label htmlFor="useCachingCheckbox" className="font-bold text-[#1D1D1B] block cursor-pointer">
                  {t('calcCacheTitle')}
                </label>
                <p className="text-stone-500 text-[11px] leading-relaxed mt-0.5">
                  {totalInputTokens < 32768 ? (
                    <span className="text-[#A58261] italic">{t('calcCacheIneligible')}</span>
                  ) : (
                    t('calcCacheEligible')
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Composition summary */}
          <div className="border border-stone-300 bg-white p-4 font-sans space-y-1 rounded text-xs select-none">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-600">{t('calcSummaryHeader')}</div>
            <div className="flex justify-between text-stone-800 mt-1 pb-1.5 border-b border-stone-200">
              <span>{t('calcSummaryTotalInput')}</span>
              <span className="font-mono font-bold">{totalInputTokens.toLocaleString()}</span>
            </div>
            <div className="space-y-1 text-stone-500 text-[11px] pt-1.5">
              {breakdown.text > 0 && <div className="flex justify-between"><span>{t('calcSummaryTextContribution')}</span> <span className="font-mono">{(breakdown.text / totalInputTokens * 100).toFixed(0)}%</span></div>}
              {breakdown.images > 0 && <div className="flex justify-between"><span>{t('calcSummaryImageContribution')}</span> <span className="font-mono">{(breakdown.images / totalInputTokens * 100).toFixed(0)}%</span></div>}
              {breakdown.audio > 0 && <div className="flex justify-between"><span>{t('calcSummaryAudioContribution')}</span> <span className="font-mono">{(breakdown.audio / totalInputTokens * 100).toFixed(0)}%</span></div>}
              {breakdown.video > 0 && <div className="flex justify-between"><span>{t('calcSummaryVideoContribution')}</span> <span className="font-mono">{(breakdown.video / totalInputTokens * 100).toFixed(0)}%</span></div>}
            </div>
          </div>
        </div>

        {/* Right column: Calculations / Modeling */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h4 className="text-xs font-sans uppercase tracking-wider font-bold text-[#1D1D1B] border-b border-[#1D1D1B]/10 pb-2 flex justify-between">
              <span>{t('calcResultsHeader')}</span>
              <span className="text-[#A58261] font-mono lowercase">{t('calcResultsStatus')}</span>
            </h4>

            <div className="space-y-4">
              {GEMINI_MODELS.map((model) => {
                const results = calculateCost(model);
                const hasExceededPriceCap = totalInputTokens + outputTokens > model.maxContext;

                const maxBarValue_NotToExceed = 25; 
                const barWidthPercent = hasExceededPriceCap ? 0 : Math.min(100, Math.max(2, (results.totalCost / maxBarValue_NotToExceed) * 100));

                return (
                  <div key={model.id} className="border border-[#1D1D1B]/10 bg-white p-4 rounded space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-serif font-bold text-[#1D1D1B] flex items-center gap-2">
                          {model.name}
                          {(totalInputTokens + outputTokens) > 128000 && model.id !== 'gemini-2.0-flash' && (
                            <span className="text-[8px] tracking-wide bg-[#A58261]/20 text-[#A58261] border border-[#A58261]/35 font-mono px-1.5 rounded uppercase font-medium">
                              {isZh ? '高级上下文收费挡位 (Context >128k)' : 'Premium Context Tier (Context >128k)'}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-sans text-stone-500">
                          {isZh ? `擅长：${model.strength}` : `Strength: ${model.strengthEn}`}
                        </span>
                      </div>

                      <div className="text-right select-text">
                        {hasExceededPriceCap ? (
                          <span className="text-xs bg-red-100 text-red-700 font-sans font-semibold px-2 py-1 rounded block">
                            {t('calcResultsOverLimit', { max: (model.maxContext / 1000000).toFixed(1) })}
                          </span>
                        ) : (
                          <div>
                            <span className="font-mono text-xl font-bold text-[#1D1D1B]">
                              ${results.totalCost.toFixed(3)}
                            </span>
                            <span className="text-[10px] font-sans text-stone-400 block select-none">
                              {t('calcResultsCostPerCall')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {!hasExceededPriceCap && (
                      <div className="space-y-1.5">
                        {/* Interactive price visualizer bar */}
                        <div className="w-full bg-stone-100 h-2.5 rounded overflow-hidden flex">
                          <div 
                            style={{ width: `${barWidthPercent}%` }} 
                            className="bg-[#1D1D1B] transition-all duration-300 ease-out h-full relative"
                          >
                            {/* Caching portion visualization */}
                            {useCaching && results.cachingSavings > 0 && (
                              <div 
                                style={{ width: `${(results.cachingSavings / (results.totalCost + results.cachingSavings)) * 100}%` }} 
                                className="bg-[#A58261] absolute right-0 top-0 bottom-0 h-full"
                                title={`Savings: $${results.cachingSavings.toFixed(3)}`}
                              />
                            )}
                          </div>
                        </div>

                        {/* Breakdown footer */}
                        <div className="flex justify-between text-[10px] font-mono text-stone-500 select-none">
                          <span className="flex items-center gap-1.5">
                            <span>{t('calcResultsInputCost')}${results.inputCost.toFixed(3)}</span>
                            <span>•</span>
                            <span>{t('calcResultsOutputCost')}${results.outputCost.toFixed(3)}</span>
                          </span>
                          {useCaching && results.cachingSavings > 0 && (
                            <span className="text-[#A58261] font-bold flex items-center gap-0.5">
                              {t('calcResultsCacheSaved')}-${results.cachingSavings.toFixed(3)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Amortized Bulk Estimates */}
                    {!hasExceededPriceCap && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-dashed border-[#1D1D1B]/10 select-none">
                        <div className="bg-stone-50 border border-stone-200/50 p-2 text-center rounded">
                          <div className="text-[8px] font-sans uppercase tracking-[0.05em] text-stone-500">{t('calcResultsAmortizedRun')}</div>
                          <div className="font-mono text-[11px] font-bold text-stone-800">${(results.totalCost).toFixed(3)}</div>
                        </div>
                        <div className="bg-stone-50 border border-stone-200/50 p-2 text-center rounded">
                          <div className="text-[8px] font-sans uppercase tracking-[0.05em] text-stone-500">{t('calcResultsAmortized100')}</div>
                          <div className="font-mono text-[11px] font-bold text-stone-800">${(results.totalCost * 100).toFixed(2)}</div>
                        </div>
                        <div className="bg-stone-50 border border-stone-200/50 p-2 text-center rounded">
                          <div className="text-[8px] font-sans uppercase tracking-[0.05em] text-stone-500">{t('calcResultsAmortized1000')}</div>
                          <div className="font-mono text-[11px] font-bold text-[#A58261] font-semibold">${(results.totalCost * 1000).toFixed(2)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value engineering optimization tips card */}
          <div className="bg-[#A58261]/10 border border-[#A58261]/25 p-4 rounded font-sans text-xs text-stone-700 mt-4 leading-relaxed space-y-2 select-none">
            <span className="text-[9px] bg-[#A58261] text-[#FDFCF9] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
              {t('calcArchitectMemo')}
            </span>
            <h5 className="font-bold text-[#1D1D1B] mt-1">{t('calcArchitectHeader')}</h5>
            <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-stone-600">
              {totalInputTokens > 128000 ? (
                <li>{t('calcTipOver128k')}</li>
              ) : (
                <li>{t('calcTipUnder128k')}</li>
              )}
              {useCaching && totalInputTokens >= 32768 && (
                <li>{t('calcTipCacheActive')}</li>
              )}
              {(imagesCount > 10 || videoMinutes > 2 || audioMinutes > 15) && (
                <li>{t('calcTipMediaReduced')}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
