import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, FileText, MonitorDown, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { getPageFrameMaxClass, getSgsyenViewMode } from '../lib/layoutMode';
import ViewModeSwitch from '../components/sgsyen/ViewModeSwitch';
import LanguageSwitch from '../components/sgsyen/LanguageSwitch';

const OWNER_EMAIL = 'Ethan7586@gsyen.com';

const REVIEW_STREAM = [
  {
    typeZh: '最新一篇',
    typeEn: 'Latest memo',
    titleZh: '全球事件进入模型：从日元 160 到世界风险权重重估',
    titleEn: 'Global events enter the model: from JPY 160 to risk-weight revaluation',
    route: '/research/gsyen-quant',
    score: 92,
    statusZh: '可入首页',
    statusEn: 'Homepage ready',
    traceZh: '事件 → 历史镜像 → 模型动作',
    traceEn: 'Event → mirror → model action',
  },
  {
    typeZh: '近期最重要事件',
    typeEn: 'Key recent event',
    titleZh: '全球事件消化层：只改解释与权重，不改原始数据',
    titleEn: 'Global event digestion layer: change explanations and weights, not raw data',
    route: '/research',
    score: 86,
    statusZh: '待确认',
    statusEn: 'Needs review',
    traceZh: '最新事件 → regime 概率 → 风险预算',
    traceEn: 'Latest event → regime odds → risk budget',
  },
  {
    typeZh: '近期项目',
    typeEn: 'Recent project',
    titleZh: 'Tempora Flip 预览打磨',
    titleEn: 'Tempora Flip preview refinement',
    route: '/workspace/tempora-flip',
    score: 78,
    statusZh: '预览中',
    statusEn: 'Previewing',
    traceZh: '字形 → 屏保 → 下载通道',
    traceEn: 'Digits → screensaver → download channel',
  },
];

const SCORE_ITEMS = [
  { zh: '事件强度', en: 'Event force', value: '91' },
  { zh: '可解释性', en: 'Explainability', value: '88' },
  { zh: '训练价值', en: 'Training value', value: '94' },
];

const DISTILL_STEPS = [
  { zh: '候选进入', en: 'Candidate intake', copyZh: '从新闻、项目、市场信号进入待审池。', copyEn: 'News, project updates, and market signals enter the review pool.' },
  { zh: 'Owner 审阅', en: 'Owner review', copyZh: 'Ethan 给分、改标题、决定是否进入首页。', copyEn: 'Ethan scores, rewrites, and decides homepage placement.' },
  { zh: '蒸馏样本', en: 'Distillation sample', copyZh: '保存“AI 初稿 → 人类改稿 → 最终发布”的差异。', copyEn: 'Save the delta from AI draft to human edit to final publish.' },
];

export default function RegimeReviewDeskPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, authorizedEmail } = useLocale();
  const isZh = locale === 'zh';
  const pageFrameMaxClass = getPageFrameMaxClass(location.search);
  const viewMode = getSgsyenViewMode(location.search);
  const ownerEmail = authorizedEmail ?? OWNER_EMAIL;

  const withView = (href: string) => {
    const [pathname, query = ''] = href.split('?');
    const params = new URLSearchParams(query);
    params.set('view', viewMode);
    return pathname + '?' + params.toString();
  };

  return (
    <main className={'w-full ' + pageFrameMaxClass + ' mx-auto border-x border-[#1D1D1B]/10 bg-[#FFFFFF] text-[#1D1D1B] min-h-screen'}>
      <div className="relative flex flex-wrap md:flex-nowrap items-center gap-y-3 px-3 md:px-5 lg:px-6 py-0 bg-[#F7F8FA] select-none min-h-[36px] md:h-[36px] overflow-hidden shrink-0">
        <button
          type="button"
          onClick={() => navigate(withView('/workspace'))}
          className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-400 hover:text-[#1D1D1B] transition-colors cursor-pointer shrink-0 z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isZh ? '返回工作台' : 'Back to Workspace'}
        </button>
        <div className="ml-auto z-10 flex items-center gap-2">
          <ViewModeSwitch />
          <LanguageSwitch />
        </div>
      </div>

      <header className="px-6 md:px-12 lg:px-20 pt-8 pb-10 bg-[#F7F8FA] select-none">
        <div className="grid lg:grid-cols-[1fr_0.72fr] gap-10 items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.26em] text-[#A58261]">
              <ShieldCheck className="w-3.5 h-3.5" />
              SGSYEN · REVIEW DESK
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-serif font-semibold leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              {isZh ? '雍彻审阅台' : 'Regime Review Desk'}
            </h1>
            <p className="mt-5 max-w-3xl text-sm md:text-base font-sans leading-relaxed text-zinc-500">
              {isZh
                ? '给 Owner 使用的事件候选、评分、改写和模型蒸馏入口。每天看候选，留下判断痕迹，让 AI 学会你的取舍。'
                : 'An owner-only review surface for candidate events, scoring, rewriting, and model distillation.'}
            </p>
          </div>

          <aside className="border border-[#1D1D1B]/10 bg-white p-5">
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#A58261]">
              {isZh ? 'Owner 会话' : 'Owner Session'}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 font-sans text-[10px] uppercase tracking-widest">
              <Meta label={isZh ? '账号' : 'Account'} value={ownerEmail} />
              <Meta label={isZh ? '权限' : 'Role'} value="OWNER" />
              <Meta label={isZh ? '阶段' : 'Stage'} value={isZh ? '前端预览' : 'Frontend preview'} />
              <Meta label={isZh ? '出口' : 'Output'} value={isZh ? '首页 / 模型' : 'Home / model'} />
            </div>
          </aside>
        </div>
      </header>

      <section className="px-6 md:px-12 lg:px-20 py-10 bg-white">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div>
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#A58261]">
                  {isZh ? '待审候选流' : 'Review Queue'}
                </div>
                <h2 className="mt-2 text-2xl md:text-3xl font-serif font-semibold">
                  {isZh ? '今天先看这三类信号' : 'Three signal lanes for today'}
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">
                <Activity className="w-3.5 h-3.5" />
                OWNER PIPELINE
              </div>
            </div>

            <div className="space-y-3">
              {REVIEW_STREAM.map((item) => (
                <article key={item.titleZh} className="border border-[#1D1D1B]/10 bg-[#F7F8FA] p-5 flex flex-col md:flex-row md:items-center gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#A58261]">
                      <span className="h-2 w-2 rounded-full bg-[#C4A35A]" />
                      {isZh ? item.typeZh : item.typeEn}
                      <span className="text-zinc-300">·</span>
                      <span className="text-zinc-400">{isZh ? item.statusZh : item.statusEn}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(withView(item.route))}
                      className="mt-3 text-left text-xl md:text-2xl font-serif font-semibold leading-tight hover:text-[#A58261] transition-colors cursor-pointer"
                    >
                      {isZh ? item.titleZh : item.titleEn}
                    </button>
                    <div className="mt-3 text-[11px] font-sans tracking-[0.08em] text-zinc-500">
                      {isZh ? item.traceZh : item.traceEn}
                    </div>
                  </div>
                  <div className="md:w-28 shrink-0 border border-[#1D1D1B]/10 bg-white px-4 py-3 text-center">
                    <div className="text-[8px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-400">Score</div>
                    <div className="mt-1 text-3xl font-serif font-semibold">{item.score}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="border border-[#1D1D1B]/10 bg-[#111110] text-white p-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#C4A35A]">
              <Sparkles className="w-3.5 h-3.5" />
              {isZh ? '蒸馏面板' : 'Distillation Panel'}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-serif font-semibold">
              {isZh ? '把你的判断变成训练样本。' : 'Turn judgment into training signal.'}
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {SCORE_ITEMS.map((item) => (
                <div key={item.zh} className="border border-white/10 px-3 py-3">
                  <div className="text-[8px] font-sans font-bold uppercase tracking-[0.16em] text-white/35">{isZh ? item.zh : item.en}</div>
                  <div className="mt-2 text-2xl font-serif font-semibold text-[#C4A35A]">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {DISTILL_STEPS.map((step, index) => (
                <div key={step.zh} className="flex gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full border border-white/15 flex items-center justify-center text-[9px] font-mono text-white/45 shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-white/85">{isZh ? step.zh : step.en}</div>
                    <p className="mt-1 text-[11px] font-sans leading-relaxed text-white/45">{isZh ? step.copyZh : step.copyEn}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-white/70 hover:border-[#C4A35A] hover:text-[#C4A35A] transition-colors"
            >
              <MonitorDown className="w-3.5 h-3.5" />
              {isZh ? '保存为蒸馏样本' : 'Save as distillation sample'}
            </button>
          </aside>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-12 bg-white">
        <div className="grid md:grid-cols-3 gap-4">
          <InfoTile icon={FileText} title={isZh ? '文案审阅' : 'Copy Review'} copy={isZh ? '标题、摘要、标签、首页题眼都在这里最后过一遍。' : 'Headline, summary, tags, and homepage signals get a final pass here.'} />
          <InfoTile icon={Terminal} title={isZh ? 'AI 蒸馏' : 'AI Distillation'} copy={isZh ? '记录你改动前后的差异，未来给自己的模型喂样本。' : 'Record before/after edits for future model distillation.'} />
          <InfoTile icon={ShieldCheck} title={isZh ? 'Owner 发布' : 'Owner Publish'} copy={isZh ? '当前先做预览，正式版再接权限、队列和数据库。' : 'Preview now; auth, queues, and database wiring come next.'} />
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[8px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-400">{label}</div>
      <div className="mt-1 text-[10px] font-sans font-bold text-[#1D1D1B] truncate">{value}</div>
    </div>
  );
}

function InfoTile({ icon: Icon, title, copy }: { icon: typeof FileText; title: string; copy: string }) {
  return (
    <article className="border border-[#1D1D1B]/10 bg-[#F7F8FA] p-5">
      <Icon className="w-4 h-4 text-[#A58261]" />
      <h3 className="mt-4 text-lg font-serif font-semibold">{title}</h3>
      <p className="mt-2 text-[11px] font-sans leading-relaxed text-zinc-500">{copy}</p>
    </article>
  );
}
