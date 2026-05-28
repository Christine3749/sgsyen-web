import React, { useState, useEffect } from 'react';
import { research, MacroPoint } from '../../lib/research';
import { useLocale } from '../../context/LocaleContext';

// ── 15 market indicators ─────────────────────────────────────
const MACRO_CARDS = [
  { id: 'SP500',        zh: '标普 500',  en: 'S&P 500',    unit: 'pts' },
  { id: 'NASDAQ100',    zh: '纳指 100',  en: 'Nasdaq 100', unit: 'pts' },
  { id: 'CSI300',       zh: '沪深 300',  en: 'CSI 300',    unit: 'pts' },
  { id: 'HSI',          zh: '恒生指数',  en: 'Hang Seng',  unit: 'pts' },
  { id: 'NIKKEI225',    zh: '日经 225',  en: 'Nikkei 225', unit: 'pts' },
  { id: 'GOLD_USD',     zh: '黄金',      en: 'Gold',       unit: 'USD' },
  { id: 'WTI_OIL',      zh: 'WTI 原油',  en: 'WTI Oil',    unit: 'USD' },
  { id: 'COPPER',       zh: '铜',        en: 'Copper',     unit: 'USD' },
  { id: 'DXY',          zh: '美元指数',  en: 'DXY',        unit: 'pts' },
  { id: 'VIX',          zh: 'VIX 恐慌',  en: 'VIX',        unit: 'pts' },
  { id: 'US10Y',        zh: '美债 10Y',  en: 'US 10Y',     unit: '%'   },
  { id: 'US3M',         zh: '美债 3M',   en: 'US 3M',      unit: '%'   },
  { id: 'FEDFUNDS',     zh: '联邦基金',  en: 'Fed Funds',  unit: '%'   },
  { id: 'CN_LPR_1Y',    zh: 'LPR 1Y',   en: 'CN LPR 1Y',  unit: '%'   },
  { id: 'BAMLH0A0HYM2', zh: 'HY 利差',   en: 'HY Spread',  unit: 'bp'  },
];

function fmtVal(v: number, unit: string) {
  if (unit === '%') return v.toFixed(2) + '%';
  if (v >= 1000)    return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return v.toFixed(2);
}

export default function MacroPulseBar() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';

  const [macro,      setMacro]      = useState<Record<string, MacroPoint>>({});
  const [macLoading, setMacLoading] = useState(true);

  // ── fetch latest value for each series ───────────────────
  useEffect(() => {
    Promise.all(
      MACRO_CARDS.map(c =>
        research
          .from('macro_timeseries')
          .select('series_id,series_name,date,value,unit')
          .eq('series_id', c.id)
          .order('date', { ascending: false })
          .limit(1)
      )
    ).then(results => {
      const map: Record<string, MacroPoint> = {};
      results.forEach((r, i) => { if (r.data?.[0]) map[MACRO_CARDS[i].id] = r.data[0]; });
      setMacro(map);
      setMacLoading(false);
    });
  }, []);

  // Duplicate the cards array for a seamless infinite loop
  const doubled = [...MACRO_CARDS, ...MACRO_CARDS];

  return (
    <div
      className="w-full overflow-hidden select-none border-b border-white/5"
      style={{ background: '#111110' }}
    >
      <div className="flex items-stretch">

        {/* Gold label badge */}
        <div
          className="shrink-0 flex items-center px-4 py-2.5 z-10"
          style={{ background: '#C4A35A' }}
        >
          <span className="text-[8px] font-sans font-black uppercase tracking-[0.25em] text-[#111110] whitespace-nowrap">
            MACRO PULSE
          </span>
        </div>

        <div className="shrink-0 w-px self-stretch bg-white/10" />

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden">
          <div
            className="inline-flex whitespace-nowrap"
            style={{
              animation: macLoading ? 'none' : 'macro-ticker 55s linear infinite',
              willChange: 'transform',
            }}
          >
            {doubled.map((card, i) => {
              const pt = macro[card.id];
              return (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-r border-white/6"
                >
                  <span className="text-[8px] font-sans uppercase tracking-widest text-white/35">
                    {isZh ? card.zh : card.en}
                  </span>
                  {macLoading || !pt
                    ? <span className="w-10 h-2.5 rounded bg-white/8 animate-pulse inline-block" />
                    : <span className="text-[13px] font-mono font-semibold text-[#C4A35A]">
                        {fmtVal(pt.value, card.unit)}
                      </span>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes macro-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
