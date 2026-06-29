import React from 'react';
import { ArrowLeft, Cpu, GitBranch, ShieldCheck, Zap } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { getPageFrameMaxClass, getSgsyenViewMode } from '../lib/layoutMode';
import ViewModeSwitch from '../components/sgsyen/ViewModeSwitch';
import LanguageSwitch from '../components/sgsyen/LanguageSwitch';

const MODEL_VERSION = 'GSYEN-Quant v0.7.2';
const MODEL_DATE = '2026-06-18';
const MODEL_FEATURES = ['Pre-Chaos', 'Adaptive Rank', 'Robust Control', 'PyTorch CUDA/TF32', 'Post-reference Validation'];

export default function GsyenQuantBlogPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const pageFrameMaxClass = getPageFrameMaxClass(location.search);
  const viewMode = getSgsyenViewMode(location.search);

  return (
    <main className={`w-full ${pageFrameMaxClass} mx-auto border-x border-[#1D1D1B]/10 bg-[#FFFFFF] text-[#1D1D1B] min-h-screen`}>
      <div className="relative flex flex-wrap md:flex-nowrap items-center gap-y-3 px-3 md:px-5 lg:px-6 py-0 border-b border-[#1D1D1B]/10 bg-[#F7F8FA] select-none min-h-[36px] md:h-[36px] overflow-hidden shrink-0">
        <button
          onClick={() => navigate(`/research?view=${viewMode}`)}
          className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-400 hover:text-[#1D1D1B] transition-colors cursor-pointer shrink-0 z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isZh ? '返回观点与研究' : 'Back to Research'}
        </button>
        <div className="ml-auto z-10 flex items-center gap-2">
          <ViewModeSwitch />
          <LanguageSwitch />
        </div>
      </div>

      <header className="px-6 md:px-12 lg:px-20 pt-7 pb-10 border-b border-[#1D1D1B]/10 bg-[#F7F8FA] select-none">
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-10 items-end">
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.26em] text-[#A58261]">
              GSYEN-Quant · MODEL BLOG
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-serif font-semibold leading-tight">
              {isZh ? '模型研究日志' : 'Model Research Log'}
            </h1>
            <p className="mt-5 max-w-3xl text-sm md:text-base font-sans leading-relaxed text-zinc-500">
              {isZh
                ? '这里记录 GSYEN-Quant 每一次模型版本、核心算法更新、验证口径和算力后端变化。量化结果看曲线，模型博客解释为什么这样改。'
                : 'A versioned record for GSYEN-Quant model changes, algorithm upgrades, validation scope, and compute backends.'}
            </p>
          </div>

          <aside className="border border-[#1D1D1B]/10 bg-white p-5">
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#A58261]">
              {isZh ? '发布状态' : 'Release State'}
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-5 text-[10px] tracking-widest uppercase font-sans font-medium text-stone-600">
              <div>
                <div className="text-[9px] text-zinc-400 font-bold mb-1">{isZh ? '版本' : 'Version'}</div>
                <div>{MODEL_VERSION}</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-400 font-bold mb-1">{isZh ? '日期' : 'Date'}</div>
                <div>{MODEL_DATE}</div>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[#1D1D1B]/10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <aside className="border border-[#1D1D1B]/10 p-6">
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-400">
              {isZh ? '当前版本' : 'Current Version'}
            </div>
            <div className="mt-4 text-2xl font-serif font-semibold">{MODEL_VERSION}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {MODEL_FEATURES.map((feature) => (
                <span
                  key={feature}
                  className="px-2.5 py-1 border border-[#1D1D1B]/10 text-[9px] font-sans font-bold uppercase tracking-[0.14em] text-[#5A687D]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </aside>

          <article className="space-y-8">
            <div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#5A687D]">
                {isZh ? '模型日志 001' : 'Model Log 001'}
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold leading-tight">
                {isZh
                  ? '从未来混沌到真实交易日 validation'
                  : 'From Pre-Chaos to Real Trading-Day Validation'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ModelNote
                icon={<GitBranch className="w-4 h-4" />}
                title={isZh ? '未来混沌状态层' : 'Pre-Chaos State Layer'}
                body={isZh ? '描述未来可能状态的吸引子、不稳定性与场景先验。' : 'Tracks attractors, instability, and scenario priors.'}
              />
              <ModelNote
                icon={<ShieldCheck className="w-4 h-4" />}
                title={isZh ? '鲁棒控制' : 'Robust Control'}
                body={isZh ? '在坏场景下约束回撤，不只追求单段收益。' : 'Constrains drawdown under adverse scenarios.'}
              />
              <ModelNote
                icon={<Cpu className="w-4 h-4" />}
                title={isZh ? 'PyTorch CUDA/TF32' : 'PyTorch CUDA/TF32'}
                body={isZh ? '让训练、验证和控制路径逐步进入张量化后端。' : 'Moves validation and control paths toward tensor execution.'}
              />
              <ModelNote
                icon={<Zap className="w-4 h-4" />}
                title={isZh ? '后参考日验证' : 'Post-reference Validation'}
                body={isZh ? '幻方披露滞后时，仍保留最新真实交易日验证。' : 'Keeps latest trading-day validation when public reference data lags.'}
              />
            </div>

            <div className="prose prose-zinc max-w-none font-sans text-sm leading-8 text-zinc-600">
              <p>
                {isZh
                  ? '本版本的重点不是新增一个漂亮指标，而是把模型的变化变成可复盘的版本记录。以后每次结构、数据、训练样本、算力后端发生变化，都应该在这里留下一个简短说明。'
                  : 'This version turns model changes into an auditable release trail. Future changes to structure, data, samples, or compute backends should leave a compact note here.'}
              </p>
              <p>
                {isZh
                  ? '量化面板负责展示当前收益、回撤和同周期对比；算力中心负责展示硬件资源；GSYEN-Quant 博客负责解释模型为什么改、改了什么，以及这些改动如何影响验证口径。'
                  : 'The quant panel shows return, drawdown, and same-period comparison; the compute center shows hardware usage; the GSYEN-Quant blog explains why the model changed and how validation scope changed.'}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function ModelNote({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="border border-[#1D1D1B]/10 p-5">
      <div className="flex items-center gap-2 text-[#5A687D]">
        {icon}
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em]">{title}</span>
      </div>
      <p className="mt-3 text-xs font-sans leading-relaxed text-zinc-500">{body}</p>
    </div>
  );
}
