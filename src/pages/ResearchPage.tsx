import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Clock, Tag, TrendingUp, TrendingDown, Minus, Calendar, Globe, ArrowLeft, ChevronDown } from 'lucide-react';
import { research, Article, PolicyEvent, MacroPoint } from '../lib/research';
import { useLocale } from '../context/LocaleContext';

const PAGE_SIZE = 8;

// ── Event type colours ──────────────────────────────────────
const EVENT_COLORS: Record<string, string> = {
  crisis:      'bg-red-100 text-red-700 border-red-200',
  policy:      'bg-blue-100 text-blue-700 border-blue-200',
  geopolitical:'bg-amber-100 text-amber-700 border-amber-200',
  regulation:  'bg-purple-100 text-purple-700 border-purple-200',
  market:      'bg-emerald-100 text-emerald-700 border-emerald-200',
};
const EVENT_DOT: Record<string, string> = {
  crisis:      'bg-red-500',
  policy:      'bg-blue-500',
  geopolitical:'bg-amber-500',
  regulation:  'bg-purple-500',
  market:      'bg-emerald-500',
};

// ── Macro series config ─────────────────────────────────────
const MACRO_CARDS = [
  { id: 'SP500',     label: '标普 500',  label_en: 'S&P 500',      unit: 'pts'  },
  { id: 'GOLD_USD',  label: '黄金',      label_en: 'Gold',         unit: 'USD'  },
  { id: 'DXY',       label: '美元指数',  label_en: 'DXY',          unit: 'pts'  },
  { id: 'CN_LPR_1Y', label: '中国 LPR', label_en: 'CN LPR 1Y',   unit: '%'    },
];

function fmt(v: number, unit: string): string {
  if (unit === '%') return v.toFixed(2) + '%';
  if (v >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return v.toFixed(2);
}

// ─────────────────────────────────────────────────────────────
export default function ResearchPage() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const isZh = locale === 'zh';

  // Articles
  const [articles, setArticles]     = useState<Article[]>([]);
  const [artPage, setArtPage]       = useState(0);
  const [artTotal, setArtTotal]     = useState(0);
  const [artLoading, setArtLoading] = useState(true);

  // Events
  const [upcoming, setUpcoming]     = useState<PolicyEvent[]>([]);
  const [recent, setRecent]         = useState<PolicyEvent[]>([]);
  const [evLoading, setEvLoading]   = useState(true);

  // Macro
  const [macro, setMacro]           = useState<Record<string, MacroPoint>>({});
  const [macLoading, setMacLoading] = useState(true);

  // Active category filter
  const [category, setCategory]     = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  // ── Fetch articles ────────────────────────────────────────
  const loadArticles = useCallback(async (page: number, cat: string) => {
    setArtLoading(true);
    let q = research
      .from('articles')
      .select('id,no,slug,title,title_en,subtitle,subtitle_en,author,author_en,category,tags,reading_time,published_at,is_published', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (cat !== 'all') q = q.eq('category', cat);

    const { data, count, error } = await q;
    if (!error && data) {
      setArticles(prev => page === 0 ? data : [...prev, ...data]);
      setArtTotal(count ?? 0);
    }
    setArtLoading(false);
  }, []);

  // ── Fetch events ─────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    Promise.all([
      research.from('policy_events')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(6),
      research.from('policy_events')
        .select('*')
        .lt('date', today)
        .order('date', { ascending: false })
        .limit(5),
    ]).then(([up, re]) => {
      if (up.data) setUpcoming(up.data);
      if (re.data) setRecent(re.data);
      setEvLoading(false);
    });
  }, []);

  // ── Fetch macro latest values ─────────────────────────────
  useEffect(() => {
    Promise.all(
      MACRO_CARDS.map(c =>
        research.from('macro_timeseries')
          .select('series_id,series_name,date,value,unit')
          .eq('series_id', c.id)
          .order('date', { ascending: false })
          .limit(2)
      )
    ).then(results => {
      const map: Record<string, MacroPoint> = {};
      results.forEach((r, i) => {
        if (r.data && r.data.length > 0) map[MACRO_CARDS[i].id] = r.data[0];
      });
      setMacro(map);
      setMacLoading(false);
    });
  }, []);

  // ── Fetch category list ───────────────────────────────────
  useEffect(() => {
    research.from('articles')
      .select('category')
      .eq('is_published', true)
      .then(({ data }) => {
        if (data) {
          const cats = [...new Set(data.map(d => d.category).filter(Boolean))];
          setCategories(cats);
        }
      });
  }, []);

  // Initial load
  useEffect(() => { loadArticles(0, category); }, [category, loadArticles]);

  const loadMore = () => {
    const next = artPage + 1;
    setArtPage(next);
    loadArticles(next, category);
  };

  const hasMore = articles.length < artTotal;

  // ────────────────────────────────────────────────────────
  return (
    <div className="w-full bg-[#FDFCF9] text-[#1D1D1B] min-h-screen font-serif antialiased">

      {/* ── Top Bar ────────────────────────────────────────── */}
      <div className="bg-[#1D1D1B] text-[#FDFCF9] py-2 px-6 text-center text-[9px] tracking-[0.25em] font-sans font-bold uppercase select-none">
        🏛️ SGSYEN 独立研判系统研究终端 · 全球宏观情报 · 事件驱动分析
      </div>

      <div className="max-w-[1300px] mx-auto border-x border-[#1D1D1B]/10">

        {/* ── Breadcrumb / Nav ────────────────────────────── */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-[#1D1D1B]/10 bg-[#FAF9F5]">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-stone-500 hover:text-[#1D1D1B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            SGSYEN 首页
          </button>
          <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest text-stone-400">
            <span>SGSYEN</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#A58261] font-bold">观点与研究</span>
          </div>
        </div>

        {/* ── Hero ───────────────────────────────────────── */}
        <div className="px-6 md:px-12 py-12 border-b border-[#1D1D1B]/10">
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#A58261]">
            SECTION · 全球宏观研究
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mt-2 leading-[0.95]">
            观点与研究
          </h1>
          <p className="mt-4 font-sans text-sm text-stone-500 max-w-2xl leading-relaxed">
            基于全球20年宏观时序数据、重大政策事件标注与量化情景预测的独立研判体系。
            数据驱动，事件锚定，叙事穿透。
          </p>
          <div className="flex items-center gap-6 mt-6 text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              46,000+ 宏观数据点
            </span>
            <span>43 重大事件</span>
            <span>{artTotal} 篇深度报告</span>
          </div>
        </div>

        {/* ── Macro Snapshot ─────────────────────────────── */}
        <div className="px-6 md:px-12 py-8 border-b border-[#1D1D1B]/10">
          <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A58261] mb-4">
            宏观快照 · MACRO PULSE
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MACRO_CARDS.map(card => {
              const pt = macro[card.id];
              return (
                <div key={card.id} className="border border-[#1D1D1B]/10 bg-white p-4 space-y-1">
                  <div className="text-[9px] font-sans uppercase tracking-widest text-stone-400">
                    {isZh ? card.label : card.label_en}
                  </div>
                  {macLoading || !pt ? (
                    <div className="h-7 bg-stone-100 animate-pulse rounded w-24" />
                  ) : (
                    <div className="text-2xl font-serif font-medium">
                      {fmt(pt.value, card.unit)}
                    </div>
                  )}
                  {pt && (
                    <div className="text-[9px] font-mono text-stone-400">
                      {pt.date}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Event Timeline ─────────────────────────────── */}
        <div className="px-6 md:px-12 py-8 border-b border-[#1D1D1B]/10">
          <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A58261] mb-6">
            全球事件时间轴 · EVENT CALENDAR
          </div>

          {evLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-stone-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Upcoming */}
              <div>
                <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> 未来催化剂
                </div>
                <div className="space-y-2">
                  {upcoming.map(ev => (
                    <div key={ev.id} className="flex gap-3 p-3 border border-dashed border-[#A58261]/30 bg-[#FAF9F5] hover:border-[#A58261]/60 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${EVENT_DOT[ev.event_type] ?? 'bg-stone-400'}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-mono text-stone-400">{ev.date}</span>
                          <span className={`text-[8px] font-sans font-bold uppercase px-1.5 py-0.5 border rounded ${EVENT_COLORS[ev.event_type] ?? 'bg-stone-100 text-stone-600 border-stone-200'}`}>
                            {ev.event_type}
                          </span>
                          <span className="text-[8px] font-sans text-stone-400">
                            {ev.status === 'predicted' ? `确定性 ${ev.certainty}/5` : '已确认'}
                          </span>
                        </div>
                        <div className="text-sm font-serif font-medium mt-0.5 leading-tight">
                          {ev.title}
                        </div>
                        <div className="text-[10px] font-sans text-stone-400 flex items-center gap-1 mt-0.5">
                          <Globe className="w-2.5 h-2.5" /> {ev.region}
                          {' · '}影响 {ev.impact_level}/5
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent past */}
              <div>
                <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> 近期历史节点
                </div>
                <div className="space-y-2">
                  {recent.map(ev => (
                    <div key={ev.id} className="flex gap-3 p-3 border border-[#1D1D1B]/8 bg-white hover:bg-stone-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${EVENT_DOT[ev.event_type] ?? 'bg-stone-400'}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-mono text-stone-400">{ev.date}</span>
                          <span className={`text-[8px] font-sans font-bold uppercase px-1.5 py-0.5 border rounded ${EVENT_COLORS[ev.event_type] ?? 'bg-stone-100 text-stone-600 border-stone-200'}`}>
                            {ev.event_type}
                          </span>
                        </div>
                        <div className="text-sm font-serif font-medium mt-0.5 leading-tight">
                          {ev.title}
                        </div>
                        <div className="text-[10px] font-sans text-stone-400 mt-0.5">
                          {ev.description?.slice(0, 60)}…
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Articles ───────────────────────────────────── */}
        <div className="px-6 md:px-12 py-10">
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A58261]">
                深度报告 · RESEARCH BRIEFS
              </div>
              <div className="text-xs font-sans text-stone-400 mt-1">
                共 {artTotal} 篇 · 每周更新
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setCategory('all'); setArtPage(0); }}
                className={`text-[9px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                  category === 'all'
                    ? 'bg-[#1D1D1B] text-[#FDFCF9] border-[#1D1D1B]'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                }`}
              >全部</button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setArtPage(0); setArticles([]); }}
                  className={`text-[9px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                    category === cat
                      ? 'bg-[#1D1D1B] text-[#FDFCF9] border-[#1D1D1B]'
                      : 'border-stone-200 text-stone-500 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {artLoading && articles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 bg-stone-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((art, i) => (
                  <motion.div
                    key={art.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border border-[#1D1D1B]/10 bg-white p-6 hover:border-[#A58261]/50 hover:shadow-sm transition-all cursor-pointer group"
                    onClick={() => navigate(`/research/${art.slug}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#A58261]">
                            NO. {String(art.no ?? i + 1).padStart(3, '0')}
                          </span>
                          {art.category && (
                            <span className="text-[8px] font-sans bg-stone-100 text-stone-500 px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-medium text-base leading-snug group-hover:text-[#A58261] transition-colors line-clamp-2">
                          {isZh ? art.title : (art.title_en || art.title)}
                        </h3>
                        <p className="text-xs font-sans text-stone-500 leading-relaxed line-clamp-2">
                          {isZh ? art.subtitle : (art.subtitle_en || art.subtitle)}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#A58261] flex-shrink-0 mt-1 transition-colors" />
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-stone-100">
                      <span className="text-[9px] font-sans text-stone-400 uppercase tracking-wider">
                        {art.author}
                      </span>
                      <span className="text-[9px] font-mono text-stone-400">
                        {art.published_at?.slice(0, 10)}
                      </span>
                      {art.reading_time && (
                        <span className="text-[9px] font-sans text-stone-400 flex items-center gap-1 ml-auto">
                          <Clock className="w-2.5 h-2.5" /> {art.reading_time} min
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={artLoading}
                    className="flex items-center gap-2 mx-auto px-8 py-3 border border-[#1D1D1B] text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-[#1D1D1B] hover:text-[#FDFCF9] transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {artLoading ? (
                      <span className="animate-spin w-3 h-3 border-2 border-stone-400 border-t-[#1D1D1B] rounded-full" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                    加载更多 · {artTotal - articles.length} 篇待读
                  </button>
                </div>
              )}

              {!hasMore && articles.length > 0 && (
                <div className="text-center mt-8 text-[9px] font-sans uppercase tracking-widest text-stone-300">
                  ── 已加载全部 {artTotal} 篇报告 ──
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="px-6 md:px-12 py-8 border-t border-[#1D1D1B]/10 flex flex-col sm:flex-row justify-between items-center bg-[#FAF9F5] gap-4 select-none">
          <div className="text-[10px] font-sans tracking-widest uppercase text-stone-500">
            © 2020 – 2026 SGSYEN 智库研究中心
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-tight text-stone-500">
              gsyen-research · LIVE
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
