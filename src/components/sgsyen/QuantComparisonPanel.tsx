import React, { useEffect, useMemo, useState } from 'react';
import { Activity, CalendarDays, RefreshCcw, ShieldCheck, TrendingUp } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

type QuantRow = {
  date: string;
  model_cumulative_return_pct?: number | null;
  model_drawdown_pct?: number | null;
  highflyer_cumulative_return_pct?: number | null;
  highflyer_drawdown_pct?: number | null;
  aqr_cumulative_return_pct?: number | null;
  aqr_drawdown_pct?: number | null;
};

type QuantSummary = {
  model_cumulative_return: number;
  reference_cumulative_return: number;
  excess_return: number;
  model_annualized_return: number;
  reference_annualized_return: number;
  model_max_drawdown: number;
  reference_max_drawdown: number;
  model_leading_rate: number;
};

type QuantReference = {
  summary?: QuantSummary;
};

type QuantIndexPayload = {
  label: string;
  start: string;
  end: string;
  available_dates?: string[];
  highflyer: QuantReference;
  aqr: QuantReference;
  rows: QuantRow[];
};

type QuantPayload = {
  generated_at: string;
  snapshot_date?: string;
  aqr_ticker: string;
  indices: Record<string, QuantIndexPayload>;
};

type QuantHistoryItem = {
  date: string;
  generated_at: string;
  path: string;
  indices: string[];
};

type QuantHistoryIndex = {
  latest?: QuantHistoryItem;
  items: QuantHistoryItem[];
};

const INDEX_ORDER = ['hs300', 'csi500'] as const;

export default function QuantComparisonPanel() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const [payload, setPayload] = useState<QuantPayload | null>(null);
  const [selected, setSelected] = useState<'hs300' | 'csi500'>('hs300');
  const [selectedDate, setSelectedDate] = useState('');
  const [history, setHistory] = useState<QuantHistoryIndex | null>(null);
  const [snapshotPath, setSnapshotPath] = useState('/quant/latest-comparison.json');
  const [loading, setLoading] = useState(true);

  const fetchPayload = async (path: string) => {
    const res = await fetch(`${path}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<QuantPayload>;
  };

  const load = async (path = snapshotPath, fallbackPath = history?.latest?.path) => {
    setLoading(true);
    try {
      setPayload(await fetchPayload(path));
    } catch {
      if (fallbackPath && fallbackPath !== path) {
        try {
          setPayload(await fetchPayload(fallbackPath));
          setSnapshotPath(fallbackPath);
        } catch {
          setPayload(null);
        }
      } else {
        setPayload(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const boot = async () => {
      let historyData: QuantHistoryIndex | null = null;
      try {
        const res = await fetch(`/quant/history/index.json?t=${Date.now()}`, { cache: 'no-store' });
        historyData = res.ok ? await res.json() : null;
        if (!cancelled) setHistory(historyData);
      } catch {
        if (!cancelled) setHistory(null);
      }
      if (!cancelled) load('/quant/latest-comparison.json', historyData?.latest?.path);
    };
    boot();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => load(snapshotPath), 60_000);
    return () => window.clearInterval(timer);
  }, [snapshotPath]);

  const current = payload?.indices?.[selected] ?? null;
  const rows = current?.rows ?? [];
  const dateOptions = current?.available_dates?.length ? current.available_dates : rows.map((row) => row.date);
  const dateOptionsKey = dateOptions.join('|');
  const visibleRows = selectedDate ? rows.filter((row) => row.date <= selectedDate) : rows;
  const selectedRow = visibleRows[visibleRows.length - 1];
  const highflyerSummary = current?.highflyer?.summary;
  const aqrSummary = current?.aqr?.summary;

  useEffect(() => {
    if (!dateOptions.length) {
      setSelectedDate('');
      return;
    }
    if (!selectedDate || !dateOptions.includes(selectedDate)) {
      setSelectedDate(dateOptions[dateOptions.length - 1]);
    }
  }, [dateOptionsKey]);

  const stats = useMemo(() => {
    if (!current || !selectedRow) return [];
    return [
      {
        label: isZh ? '模型累计' : 'Model',
        value: pctPoint(selectedRow.model_cumulative_return_pct),
        icon: TrendingUp,
        tone: 'text-emerald-600',
      },
      {
        label: 'High-Flyer',
        value: pctPoint(selectedRow.highflyer_cumulative_return_pct),
        icon: Activity,
        tone: 'text-[#4B5563]',
      },
      {
        label: `AQR ${payload?.aqr_ticker ?? ''}`,
        value: pctPoint(selectedRow.aqr_cumulative_return_pct),
        icon: Activity,
        tone: 'text-blue-600',
      },
      {
        label: isZh ? '当前回撤' : 'Drawdown',
        value: pctPoint(selectedRow.model_drawdown_pct),
        icon: ShieldCheck,
        tone: 'text-[#C83E3E]',
      },
    ];
  }, [current, isZh, payload?.aqr_ticker, selectedRow]);

  return (
    <section className="px-5 md:px-12 lg:px-20 py-12 border-b border-[#1D1D1B]/10 bg-[#FFFFFF] overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="min-w-0">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-[#4B5563]">
            DGWM QUANT · LIVE BENCHMARK
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-serif font-semibold text-[#1D1D1B] leading-tight break-words">
            {isZh ? '未来世界模型 · 实时量化对比' : 'Future World Model · Live Quant Comparison'}
          </h2>
          <p className="mt-3 max-w-2xl text-xs md:text-sm font-sans leading-relaxed text-zinc-500 break-all [overflow-wrap:anywhere]">
            {isZh
              ? '同周期对比当前模型、幻方公开净值与 AQR 公开基金代理净值，展示收益路径和回撤路径。'
              : 'Same-period comparison across the current model, public High-Flyer NAV, and an AQR public-fund proxy.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2">
          {history?.items?.length ? (
            <label className="inline-flex items-center gap-2 h-9 px-3 border border-[#1D1D1B]/10 bg-white text-zinc-500 rounded">
              <CalendarDays className="w-4 h-4 text-[#4B5563]" />
              <select
                value={snapshotPath}
                onChange={(event) => {
                  const path = event.target.value;
                  setSnapshotPath(path);
                  load(path);
                }}
                className="bg-transparent text-[10px] font-sans font-bold uppercase tracking-widest outline-none"
                aria-label={isZh ? '选择生成日期' : 'Select snapshot date'}
              >
                <option value="/quant/latest-comparison.json">{isZh ? '最新' : 'Latest'}</option>
                {history.items.map((item) => (
                  <option key={item.path} value={item.path}>
                    {item.date}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          {INDEX_ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-4 py-2 text-[10px] font-sans font-bold uppercase tracking-widest border transition-colors rounded ${
                selected === key
                  ? 'bg-[#1D1D1B] text-[#FFFFFF] border-[#1D1D1B]'
                  : 'bg-white text-zinc-500 border-[#1D1D1B]/10 hover:border-[#4B5563]/50'
              }`}
            >
              {payload?.indices?.[key]?.label ?? key.toUpperCase()}
            </button>
          ))}
          {dateOptions.length ? (
            <select
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="h-9 px-3 border border-[#1D1D1B]/10 bg-white text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-500 rounded outline-none hover:border-[#4B5563]/40"
              aria-label={isZh ? '选择交易日期' : 'Select trading date'}
            >
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          ) : null}
          <button
            onClick={() => load()}
            className="w-9 h-9 inline-flex items-center justify-center border border-[#1D1D1B]/10 bg-white text-zinc-500 hover:text-[#1D1D1B] hover:border-[#4B5563]/40 rounded transition-colors"
            aria-label={isZh ? '刷新量化对比' : 'Refresh quant comparison'}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {current ? (
        <div className="space-y-8">
          {highflyerSummary ? (
            <QuantDecisionSummary
              label={current.label}
              selectedRow={selectedRow}
              highflyerSummary={highflyerSummary}
              aqrSummary={aqrSummary}
              aqrTicker={payload?.aqr_ticker}
              isZh={isZh}
            />
          ) : null}

          <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#1D1D1B]/10 bg-white">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`p-5 ${index < stats.length - 1 ? 'border-r border-[#1D1D1B]/10' : ''}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-zinc-400">{item.label}</span>
                    <Icon className={`w-4 h-4 ${item.tone}`} />
                  </div>
                  <div className={`mt-3 text-2xl font-mono font-semibold ${item.tone}`}>{item.value}</div>
                  <div className="mt-2 text-[10px] font-sans leading-relaxed text-zinc-400 break-all [overflow-wrap:anywhere]">
                    {metricHint(item.label, isZh)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <QuantSvgChart
              title={isZh ? '累计收益路径' : 'Cumulative Return Path'}
              rows={visibleRows}
              fields={[
                ['model_cumulative_return_pct', isZh ? '当前模型' : 'Current Model', '#0F8B5F'],
                ['highflyer_cumulative_return_pct', 'High-Flyer', '#4B5563'],
                ['aqr_cumulative_return_pct', `AQR ${payload?.aqr_ticker ?? ''}`, '#2563EB'],
              ]}
            />
            <QuantSvgChart
              title={isZh ? '回撤路径' : 'Drawdown Path'}
              rows={visibleRows}
              fields={[
                ['model_drawdown_pct', isZh ? '当前模型' : 'Current Model', '#0F8B5F'],
                ['highflyer_drawdown_pct', 'High-Flyer', '#4B5563'],
                ['aqr_drawdown_pct', `AQR ${payload?.aqr_ticker ?? ''}`, '#2563EB'],
              ]}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            <span>
              {current.start} → {current.end}
            </span>
            <span>
              {isZh ? '显示交易日' : 'Trading date'} {selectedRow?.date ?? '-'} · {isZh ? '生成' : 'Generated'} {payload?.snapshot_date ?? fmtDate(payload?.generated_at)} ·{' '}
              {isZh ? '刷新' : 'Updated'} {fmtTime(payload?.generated_at)}
            </span>
          </div>
          <div className="text-[10px] font-sans leading-relaxed text-zinc-400 border-l-2 border-[#4B5563]/30 pl-3">
            {isZh
              ? `AQR 使用 ${payload?.aqr_ticker ?? '公开基金'} 的公开基金净值作为代理值，不等同于 AQR 私募策略真实账本。`
              : `AQR uses ${payload?.aqr_ticker ?? 'a public fund'} adjusted NAV as a public proxy, not a disclosed private-strategy book.`}
          </div>
        </div>
      ) : (
        <QuantFallback loading={loading} isZh={isZh} />
      )}
    </section>
  );
}

function QuantDecisionSummary({
  label,
  selectedRow,
  highflyerSummary,
  aqrSummary,
  aqrTicker,
  isZh,
}: {
  label: string;
  selectedRow?: QuantRow;
  highflyerSummary: QuantSummary;
  aqrSummary?: QuantSummary;
  aqrTicker?: string;
  isZh: boolean;
}) {
  const modelReturn = highflyerSummary.model_cumulative_return * 100;
  const highflyerReturn = highflyerSummary.reference_cumulative_return * 100;
  const excess = highflyerSummary.excess_return * 100;
  const modelMdd = highflyerSummary.model_max_drawdown * 100;
  const highflyerMdd = highflyerSummary.reference_max_drawdown * 100;
  const aqrExcess = aqrSummary ? aqrSummary.excess_return * 100 : null;
  const conclusion = isZh
    ? `${label} 当前模型累计收益 ${modelReturn.toFixed(2)}%，较幻方公开净值超额 ${excess.toFixed(2)}%；最大回撤 ${modelMdd.toFixed(2)}%，低于幻方 ${highflyerMdd.toFixed(2)}%。`
    : `${label} model return is ${modelReturn.toFixed(2)}%, with ${excess.toFixed(2)}% excess versus public High-Flyer NAV; max drawdown is ${modelMdd.toFixed(2)}% versus ${highflyerMdd.toFixed(2)}%.`;
  return (
    <div className="border border-[#4B5563]/25 bg-[#4B5563]/8 px-5 py-4 max-w-full overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#4B5563]">
            {isZh ? '当前量化结论' : 'Current Quant Read'}
          </div>
          <p className="mt-2 text-sm md:text-base font-serif leading-relaxed text-[#1D1D1B] break-all [overflow-wrap:anywhere]">{conclusion}</p>
          {aqrExcess !== null ? (
            <p className="mt-2 text-[10px] font-sans leading-relaxed text-zinc-500 break-all [overflow-wrap:anywhere]">
              {isZh
                ? `相对 AQR ${aqrTicker ?? ''} 公开基金代理值，当前超额为 ${aqrExcess.toFixed(2)}%。`
                : `Versus AQR ${aqrTicker ?? ''} public-fund proxy, current excess is ${aqrExcess.toFixed(2)}%.`}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-2 w-full xl:w-[360px] xl:shrink-0">
          <SummaryStat label={isZh ? '模型收益' : 'Model'} value={`${modelReturn.toFixed(2)}%`} />
          <SummaryStat label={isZh ? '幻方收益' : 'High-Flyer'} value={`${highflyerReturn.toFixed(2)}%`} />
          <SummaryStat label={isZh ? '模型回撤' : 'Model DD'} value={`${modelMdd.toFixed(2)}%`} />
          <SummaryStat label={isZh ? '领先率' : 'Lead Rate'} value={`${(highflyerSummary.model_leading_rate * 100).toFixed(1)}%`} />
        </div>
      </div>
      {selectedRow ? (
        <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          {isZh ? '当前交易日' : 'Trading Date'} {selectedRow.date}
        </div>
      ) : null}
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#1D1D1B]/10 bg-white px-3 py-2 min-w-0">
      <div className="text-[8px] font-sans font-bold uppercase tracking-widest text-zinc-400">{label}</div>
      <div className="mt-1 text-sm font-mono font-semibold text-[#1D1D1B]">{value}</div>
    </div>
  );
}

function QuantFallback({ loading, isZh }: { loading: boolean; isZh: boolean }) {
  return (
    <div className="border border-[#1D1D1B]/10 bg-white p-8 text-xs font-sans text-zinc-500">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4B5563]">
            {isZh ? '等待量化快照' : 'Waiting For Quant Snapshot'}
          </div>
          <p className="mt-2 leading-relaxed">
            {isZh
              ? '系统会优先读取最新量化对比，若失败会自动回落到最近历史快照。'
              : 'The panel loads the latest quant comparison first and falls back to the most recent historical snapshot when needed.'}
          </p>
        </div>
        <RefreshCcw className={`w-4 h-4 text-[#4B5563] ${loading ? 'animate-spin' : ''}`} />
      </div>
    </div>
  );
}

function QuantSvgChart({
  title,
  rows,
  fields,
}: {
  title: string;
  rows: QuantRow[];
  fields: [keyof QuantRow, string, string][];
}) {
  const width = 720;
  const height = 280;
  const padding = 34;
  const values = rows.flatMap((row) => fields.map(([field]) => row[field]).filter((value): value is number => typeof value === 'number'));
  const min = values.length ? Math.min(...values, 0) : 0;
  const max = values.length ? Math.max(...values, 0) : 1;
  const span = Math.max(max - min, 1);
  const x = (index: number) => padding + (index / Math.max(rows.length - 1, 1)) * (width - padding * 2);
  const y = (value: number) => height - padding - ((value - min) / span) * (height - padding * 2);
  const zeroY = y(0);

  return (
    <div className="border border-[#1D1D1B]/10 bg-white p-5">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-sm font-serif font-bold text-[#1D1D1B]">{title}</h3>
        <div className="flex flex-wrap items-center justify-end gap-3">
          {fields.map(([, label, color]) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-[9px] font-sans font-bold uppercase tracking-widest text-zinc-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <line x1={padding} x2={width - padding} y1={zeroY} y2={zeroY} stroke="#1D1D1B" strokeOpacity="0.18" strokeWidth="1" />
        {[0.25, 0.5, 0.75].map((tick) => (
          <line
            key={tick}
            x1={padding}
            x2={width - padding}
            y1={padding + tick * (height - padding * 2)}
            y2={padding + tick * (height - padding * 2)}
            stroke="#1D1D1B"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}
        {fields.map(([field, label, color]) => {
          const points = rows
            .map((row, index) => ({ index, value: row[field] }))
            .filter((point): point is { index: number; value: number } => typeof point.value === 'number');
          const d = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(point.index).toFixed(2)} ${y(point.value).toFixed(2)}`).join(' ');
          return <path key={label} d={d} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />;
        })}
        <text x={padding} y={20} className="fill-stone-400 text-[10px] font-mono">
          {max.toFixed(1)}%
        </text>
        <text x={padding} y={height - 8} className="fill-stone-400 text-[10px] font-mono">
          {min.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
}

function pctPoint(value?: number | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '-';
  return `${value.toFixed(2)}%`;
}

function metricHint(label: string, isZh: boolean) {
  if (label.includes('High-Flyer')) return isZh ? '幻方公开净值代理路径。' : 'Public High-Flyer NAV proxy path.';
  if (label.includes('AQR')) return isZh ? 'AQR 公开基金代理值。' : 'AQR public-fund proxy.';
  if (label.includes('回撤') || label.includes('Max DD')) return isZh ? '当前显示交易日的模型回撤。' : 'Model drawdown on the selected trading date.';
  return isZh ? '当前模型在所选日期的累计收益。' : 'Current model cumulative return on the selected date.';
}

function fmtDate(value?: string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function fmtTime(value?: string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 16);
  return date.toLocaleString(undefined, { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
