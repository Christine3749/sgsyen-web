import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CalendarDays, Database, Gauge, Landmark, RadioTower, RefreshCcw, ShieldAlert } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

type DigestEvent = {
  date: string;
  title: string;
  event_type: string;
  asset: string;
  observed?: number | null;
  threshold?: number | null;
  confidence: number;
  severity: number;
  half_life_days: number;
  historical_anchor?: string;
  source?: string;
  source_url?: string;
  affected_markets?: string[];
};

type DigestCluster = {
  key: string;
  label: string;
  score: number;
  confidence: number;
  event_count: number;
  latest_date: string;
  dimensions: Record<string, number>;
  events: DigestEvent[];
};

type MacroDigest = {
  as_of: string;
  generated_at: string;
  dimensions: Record<string, number>;
  scenario_priors: Record<string, number>;
  model_effect: Record<string, number>;
  clusters: DigestCluster[];
  events: DigestEvent[];
};

type HistoryItem = {
  date: string;
  generated_at: string;
  path: string;
  cluster_count: number;
  event_count: number;
};

type HistoryIndex = {
  latest?: HistoryItem;
  items: HistoryItem[];
};

type SourceCoverage = {
  as_of: string;
  generated_at: string;
  coverage: {
    source_count: number;
    enabled_source_count: number;
    feed_enabled_count: number;
    official_source_count: number;
    average_credibility: number;
    regions: Record<string, number>;
    categories: Record<string, number>;
    tiers: Record<string, number>;
  };
  ingestion?: {
    fetch_enabled: boolean;
    raw_item_count: number;
    normalized_event_count: number;
    new_event_count: number;
    merged_event_count: number;
  };
  model_mapping?: {
    dimensions: string[];
    event_types: string[];
    scenario_priors: string[];
  };
};

const DIMENSION_LABELS: Record<string, { zh: string; en: string }> = {
  currency_stress: { zh: '汇率压力', en: 'Currency Stress' },
  rate_stress: { zh: '利率压力', en: 'Rate Stress' },
  liquidity_stress: { zh: '流动性压力', en: 'Liquidity Stress' },
  geopolitical_stress: { zh: '地缘压力', en: 'Geopolitical' },
  credit_stress: { zh: '信用压力', en: 'Credit Stress' },
  commodity_stress: { zh: '商品压力', en: 'Commodity Stress' },
  policy_intervention: { zh: '政策干预', en: 'Policy Intervention' },
  crowding_unwind: { zh: '拥挤平仓', en: 'Crowding Unwind' },
};

export default function MacroEventDigestPanel() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const [digest, setDigest] = useState<MacroDigest | null>(null);
  const [history, setHistory] = useState<HistoryIndex | null>(null);
  const [sourceCoverage, setSourceCoverage] = useState<SourceCoverage | null>(null);
  const [path, setPath] = useState('/quant/macro-events/latest.json');
  const [loading, setLoading] = useState(true);

  const load = async (nextPath = path) => {
    setLoading(true);
    try {
      const res = await fetch(`${nextPath}?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDigest(await res.json());
    } catch {
      setDigest(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(`/quant/macro-events/history/index.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setHistory(data))
      .catch(() => setHistory(null));
    fetch(`/quant/macro-events/sources.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setSourceCoverage(data))
      .catch(() => setSourceCoverage(null));
    load('/quant/macro-events/latest.json');
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => load(path), 60_000);
    return () => window.clearInterval(timer);
  }, [path]);

  const dimensions = useMemo(() => topEntries(digest?.dimensions ?? {}, 8), [digest]);
  const scenarios = useMemo(() => topEntries(digest?.scenario_priors ?? {}, 5), [digest]);
  const modelEffect = digest?.model_effect ?? {};

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[#1D1D1B]/10 bg-[#111110] text-[#FDFCF9]">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-[#C4A35A]">
            SGSYEN EVENT DIGEST · MODEL STATE
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-serif font-semibold leading-tight">
            {isZh ? '全网重大事件消化层' : 'Macro Event Digestion Layer'}
          </h2>
          <p className="mt-3 max-w-2xl text-xs md:text-sm font-sans leading-relaxed text-[#FDFCF9]/55">
            {isZh
              ? '把每日重大资讯压缩为 regime、情景权重与风险预算信号，供量化模型和研究复盘共同使用。'
              : 'Compresses daily macro narratives into regime, scenario, and risk-budget signals for model conditioning.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {history?.items?.length ? (
            <label className="inline-flex h-9 items-center gap-2 px-3 border border-[#FDFCF9]/10 bg-[#FDFCF9]/5 rounded text-[#FDFCF9]/65">
              <CalendarDays className="w-4 h-4 text-[#C4A35A]" />
              <select
                value={path}
                onChange={(event) => {
                  const next = event.target.value;
                  setPath(next);
                  load(next);
                }}
                className="bg-transparent text-[10px] font-sans font-bold uppercase tracking-widest outline-none"
                aria-label={isZh ? '选择事件快照' : 'Select event snapshot'}
              >
                <option value="/quant/macro-events/latest.json">{isZh ? '最新' : 'Latest'}</option>
                {history.items.map((item) => (
                  <option key={item.path} value={item.path}>
                    {item.date}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <button
            onClick={() => load()}
            className="w-9 h-9 inline-flex items-center justify-center border border-[#FDFCF9]/10 bg-[#FDFCF9]/5 text-[#FDFCF9]/65 hover:text-[#FDFCF9] hover:border-[#C4A35A]/60 rounded transition-colors"
            aria-label={isZh ? '刷新事件消化层' : 'Refresh event digest'}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {digest ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#FDFCF9]/10">
            <MetricTile label={isZh ? 'Regime 压力' : 'Regime Stress'} value={modelEffect.regime_stress} icon={AlertTriangle} />
            <MetricTile label={isZh ? '尾部情景权重' : 'Tail Scenario'} value={modelEffect.scenario_tail_weight} icon={ShieldAlert} />
            <MetricTile label={isZh ? '风险预算倍率' : 'Risk Budget'} value={modelEffect.risk_budget_multiplier} icon={Gauge} />
            <MetricTile label={isZh ? '事件数量' : 'Event Count'} value={modelEffect.macro_event_count} raw />
          </div>

          {sourceCoverage ? <SourceCoveragePanel coverage={sourceCoverage} isZh={isZh} /> : null}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <DigestBars title={isZh ? '压力维度' : 'Stress Dimensions'} rows={dimensions} labels={DIMENSION_LABELS} isZh={isZh} />
            <DigestBars title={isZh ? '情景权重' : 'Scenario Priors'} rows={scenarios} isZh={isZh} />
          </div>

          <div className="border border-[#FDFCF9]/10">
            <div className="px-5 py-3 border-b border-[#FDFCF9]/10 bg-[#FDFCF9]/5 flex items-center justify-between gap-4">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#C4A35A]">
                {isZh ? '活跃事件簇' : 'Active Clusters'}
              </span>
              <span className="text-[10px] font-mono text-[#FDFCF9]/40">
                {digest.as_of} · {isZh ? '生成' : 'generated'} {fmtTime(digest.generated_at)}
              </span>
            </div>
            {digest.clusters.map((cluster) => (
              <div key={cluster.key} className="px-5 py-5 border-b last:border-b-0 border-[#FDFCF9]/10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-serif font-semibold">{cluster.label}</div>
                    <div className="mt-2 text-xs font-sans text-[#FDFCF9]/50 leading-relaxed">
                      {cluster.events[0]?.title}
                    </div>
                    {cluster.events[0]?.historical_anchor ? (
                      <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-[#C4A35A]/80">
                        {cluster.events[0].historical_anchor}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-3 gap-3 min-w-[260px]">
                    <MiniStat label={isZh ? '强度' : 'Score'} value={cluster.score} />
                    <MiniStat label={isZh ? '置信' : 'Confidence'} value={cluster.confidence} />
                    <MiniStat label={isZh ? '条数' : 'Events'} value={cluster.event_count} raw />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-[#FDFCF9]/10 bg-[#FDFCF9]/5 p-10 text-center text-xs font-sans text-[#FDFCF9]/45">
          {isZh ? '等待重大事件消化数据。' : 'Waiting for macro event digest data.'}
        </div>
      )}
    </section>
  );
}

function SourceCoveragePanel({ coverage, isZh }: { coverage: SourceCoverage; isZh: boolean }) {
  const regions = topCountEntries(coverage.coverage.regions, 6);
  const categories = topCountEntries(coverage.coverage.categories, 6);
  const ingestion = coverage.ingestion;
  return (
    <div className="border border-[#FDFCF9]/10">
      <div className="px-5 py-3 border-b border-[#FDFCF9]/10 bg-[#FDFCF9]/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#C4A35A]">
          {isZh ? '全球信息源覆盖' : 'Global Source Coverage'}
        </span>
        <span className="text-[10px] font-mono text-[#FDFCF9]/40">
          {coverage.as_of} · {isZh ? '覆盖诊断' : 'coverage audit'}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#FDFCF9]/10">
        <MetricTile label={isZh ? '启用源' : 'Enabled'} value={coverage.coverage.enabled_source_count} icon={Database} raw />
        <MetricTile label={isZh ? '可抓取源' : 'Feed Ready'} value={coverage.coverage.feed_enabled_count} icon={RadioTower} raw />
        <MetricTile label={isZh ? '官方源' : 'Official'} value={coverage.coverage.official_source_count} icon={Landmark} raw />
        <MetricTile label={isZh ? '平均可信度' : 'Credibility'} value={coverage.coverage.average_credibility} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">
        <CountList title={isZh ? '区域覆盖' : 'Regions'} rows={regions} />
        <CountList title={isZh ? '来源类别' : 'Categories'} rows={categories} />
        <div className="p-5 border-t xl:border-t-0 xl:border-l border-[#FDFCF9]/10">
          <h3 className="text-sm font-serif font-semibold mb-5">{isZh ? '抓取状态' : 'Ingestion'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label={isZh ? '原始条目' : 'Raw'} value={ingestion?.raw_item_count ?? 0} raw />
            <MiniStat label={isZh ? '标准化事件' : 'Events'} value={ingestion?.normalized_event_count ?? 0} raw />
            <MiniStat label={isZh ? '新增事件' : 'New'} value={ingestion?.new_event_count ?? 0} raw />
            <MiniStat label={isZh ? '总事件库' : 'Merged'} value={ingestion?.merged_event_count ?? 0} raw />
          </div>
          <div className="mt-4 text-[10px] font-sans leading-relaxed text-[#FDFCF9]/40">
            {isZh
              ? '只把高可信、可归类、可去重的重大信息写入模型状态；未进入模型的文本只保留为覆盖诊断。'
              : 'Only credible, classifiable, deduplicated macro items are promoted into model state; raw text remains diagnostic.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricTile({ label, value, icon: Icon, raw = false }: { label: string; value?: number; icon?: any; raw?: boolean }) {
  return (
    <div className="p-5 border-r last:border-r-0 border-[#FDFCF9]/10">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#FDFCF9]/40">{label}</span>
        {Icon ? <Icon className="w-4 h-4 text-[#C4A35A]" /> : null}
      </div>
      <div className="mt-3 text-2xl font-mono font-semibold text-[#FDFCF9]">{raw ? Math.round(value ?? 0) : pct(value)}</div>
    </div>
  );
}

function CountList({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = Math.max(...rows.map(([, value]) => value), 1);
  return (
    <div className="p-5 border-t xl:border-t-0 xl:border-r border-[#FDFCF9]/10">
      <h3 className="text-sm font-serif font-semibold mb-5">{title}</h3>
      <div className="space-y-3">
        {rows.map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#FDFCF9]/55">{key.replaceAll('_', ' ')}</span>
              <span className="text-[10px] font-mono text-[#C4A35A]">{value}</span>
            </div>
            <div className="h-1.5 bg-[#FDFCF9]/8">
              <div className="h-full bg-[#C4A35A]" style={{ width: `${Math.max(4, Math.min(100, (value / max) * 100))}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DigestBars({
  title,
  rows,
  labels,
  isZh,
}: {
  title: string;
  rows: [string, number][];
  labels?: Record<string, { zh: string; en: string }>;
  isZh: boolean;
}) {
  return (
    <div className="border border-[#FDFCF9]/10 p-5">
      <h3 className="text-sm font-serif font-semibold mb-5">{title}</h3>
      <div className="space-y-4">
        {rows.map(([key, value]) => {
          const label = labels?.[key] ? (isZh ? labels[key].zh : labels[key].en) : key.replaceAll('_', ' ');
          return (
            <div key={key}>
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#FDFCF9]/55">{label}</span>
                <span className="text-[10px] font-mono text-[#C4A35A]">{pct(value)}</span>
              </div>
              <div className="h-1.5 bg-[#FDFCF9]/8">
                <div className="h-full bg-[#C4A35A]" style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({ label, value, raw = false }: { label: string; value?: number; raw?: boolean }) {
  return (
    <div className="border border-[#FDFCF9]/10 px-3 py-2">
      <div className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#FDFCF9]/35">{label}</div>
      <div className="mt-1 text-sm font-mono text-[#FDFCF9]">{raw ? Math.round(value ?? 0) : pct(value)}</div>
    </div>
  );
}

function topEntries(values: Record<string, number>, limit: number): [string, number][] {
  return Object.entries(values)
    .filter(([, value]) => Number.isFinite(value))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function topCountEntries(values: Record<string, number>, limit: number): [string, number][] {
  return Object.entries(values)
    .filter(([, value]) => Number.isFinite(value))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function pct(value?: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '-';
  return `${(value * 100).toFixed(1)}%`;
}

function fmtTime(value?: string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 16);
  return date.toLocaleString(undefined, { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
