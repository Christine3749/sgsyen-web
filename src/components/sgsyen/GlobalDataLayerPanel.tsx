import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Database, Globe, RadioTower, ShieldCheck } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

type DigestCluster = {
  key: string;
  label: string;
  score: number;
  confidence: number;
  event_count: number;
  latest_date: string;
};

type MacroDigest = {
  as_of?: string;
  generated_at?: string;
  dimensions?: Record<string, number>;
  clusters?: DigestCluster[];
};

type SourceCoverage = {
  as_of?: string;
  generated_at?: string;
  coverage?: {
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
    raw_item_count: number;
    normalized_event_count: number;
    new_event_count: number;
    merged_event_count: number;
  };
};

const DIMENSION_LABELS: Record<string, { zh: string; en: string }> = {
  currency_stress: { zh: '汇率压力', en: 'Currency' },
  rate_stress: { zh: '利率压力', en: 'Rates' },
  liquidity_stress: { zh: '流动性压力', en: 'Liquidity' },
  geopolitical_stress: { zh: '地缘压力', en: 'Geopolitical' },
  credit_stress: { zh: '信用压力', en: 'Credit' },
  commodity_stress: { zh: '商品压力', en: 'Commodity' },
  policy_intervention: { zh: '政策干预', en: 'Policy' },
  crowding_unwind: { zh: '拥挤平仓', en: 'Crowding' },
};

export default function GlobalDataLayerPanel() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const [digest, setDigest] = useState<MacroDigest | null>(null);
  const [sources, setSources] = useState<SourceCoverage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const [digestRes, sourceRes] = await Promise.all([
          fetch(`/quant/macro-events/latest.json?t=${Date.now()}`, { cache: 'no-store' }),
          fetch(`/quant/macro-events/sources.json?t=${Date.now()}`, { cache: 'no-store' }),
        ]);
        const nextDigest = digestRes.ok ? await digestRes.json() : null;
        const nextSources = sourceRes.ok ? await sourceRes.json() : null;
        if (!cancelled) {
          setDigest(nextDigest);
          setSources(nextSources);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const coverage = sources?.coverage;
  const ingestion = sources?.ingestion;
  const regions = useMemo(() => topEntries(coverage?.regions ?? {}, 8), [coverage]);
  const categories = useMemo(() => topEntries(coverage?.categories ?? {}, 7), [coverage]);
  const dimensions = useMemo(() => topEntries(digest?.dimensions ?? {}, 6), [digest]);
  const clusters = useMemo(
    () => [...(digest?.clusters ?? [])].sort((a, b) => b.score - a.score).slice(0, 5),
    [digest],
  );

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[#1D1D1B]/10 bg-[#FDFCF9]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#A58261]">
            {isZh ? '全球数据分析 · GLOBAL DATA LAYER' : 'GLOBAL DATA LAYER'}
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-serif font-semibold leading-tight text-[#1D1D1B]">
            {isZh ? '全球事件地域与来源覆盖' : 'Global Event Regions & Sources'}
          </h2>
          <p className="mt-3 max-w-2xl text-xs md:text-sm font-sans leading-relaxed text-stone-500">
            {isZh
              ? '这里展示世界模型每天吸收的地域、来源和事件簇。它解释资讯如何成为 regime、情景权重和风险预算，不修改原始数据。'
              : 'This layer shows the regions, sources, and event clusters consumed by the world model, before they become regime, scenario, and risk-budget signals.'}
          </p>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
          {loading ? (isZh ? '读取中' : 'Loading') : `${isZh ? '截至' : 'As of'} ${sources?.as_of ?? digest?.as_of ?? '-'}`}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#1D1D1B]/10 bg-white">
        <MetricCard icon={Database} label={isZh ? '启用源' : 'Sources'} value={coverage?.enabled_source_count ?? 0} suffix={` / ${coverage?.source_count ?? 0}`} />
        <MetricCard icon={RadioTower} label={isZh ? '可抓取源' : 'Feeds'} value={coverage?.feed_enabled_count ?? 0} />
        <MetricCard icon={ShieldCheck} label={isZh ? '官方源' : 'Official'} value={coverage?.official_source_count ?? 0} />
        <MetricCard icon={Activity} label={isZh ? '平均可信度' : 'Credibility'} value={percent(coverage?.average_credibility)} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BreakdownPanel title={isZh ? '地域覆盖' : 'Regional Coverage'} items={regions} />
          <BreakdownPanel title={isZh ? '来源类别' : 'Source Categories'} items={categories} />
        </div>

        <div className="border border-[#1D1D1B]/10 bg-white p-5">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h3 className="text-sm font-serif font-bold text-[#1D1D1B]">
              {isZh ? '事件簇与模型压力' : 'Event Clusters & Model Pressure'}
            </h3>
            <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400">
              {ingestion ? `${ingestion.normalized_event_count} / ${ingestion.merged_event_count}` : '-'}
            </span>
          </div>

          <div className="space-y-4">
            {dimensions.map(([key, value]) => (
              <React.Fragment key={key}>
                <BarRow
                  label={isZh ? (DIMENSION_LABELS[key]?.zh ?? key) : (DIMENSION_LABELS[key]?.en ?? key)}
                  value={value}
                />
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 border-t border-[#1D1D1B]/10 pt-4 space-y-3">
            {clusters.map((cluster) => (
              <div key={cluster.key} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1D1D1B] truncate">
                    {cluster.label.replaceAll('_', ' ')}
                  </div>
                  <div className="text-[9px] font-mono text-stone-400">
                    {cluster.latest_date} · {cluster.event_count} {isZh ? '条事件' : 'events'}
                  </div>
                </div>
                <div className="text-[11px] font-mono font-semibold text-[#A58261]">
                  {percent(cluster.confidence)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix = '',
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  suffix?: string;
}) {
  return (
    <div className="p-5 border-r border-[#1D1D1B]/10 last:border-r-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400">{label}</span>
        <Icon className="w-4 h-4 text-[#A58261]" />
      </div>
      <div className="mt-3 text-2xl font-mono font-semibold text-[#1D1D1B]">
        {value}
        {suffix ? <span className="text-sm text-stone-400">{suffix}</span> : null}
      </div>
    </div>
  );
}

function BreakdownPanel({ title, items }: { title: string; items: [string, number][] }) {
  const max = Math.max(...items.map(([, value]) => value), 1);
  return (
    <div className="border border-[#1D1D1B]/10 bg-white p-5">
      <h3 className="text-sm font-serif font-bold text-[#1D1D1B] mb-5">{title}</h3>
      <div className="space-y-3">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="flex items-center justify-between gap-3 text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
              <span className="truncate">{label}</span>
              <span className="font-mono text-[#A58261]">{value}</span>
            </div>
            <div className="mt-1 h-1.5 bg-[#1D1D1B]/5 overflow-hidden">
              <div className="h-full bg-[#C4A35A]" style={{ width: `${Math.max(7, (value / max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500">
        <span>{label}</span>
        <span className="font-mono text-[#A58261]">{percent(value)}</span>
      </div>
      <div className="mt-1.5 h-2 bg-[#1D1D1B]/5 overflow-hidden">
        <div className="h-full bg-[#1D1D1B]" style={{ width: `${Math.max(4, value * 100)}%` }} />
      </div>
    </div>
  );
}

function topEntries(record: Record<string, number>, limit: number): [string, number][] {
  return Object.entries(record).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function percent(value?: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '-';
  return `${(value * 100).toFixed(1)}%`;
}
