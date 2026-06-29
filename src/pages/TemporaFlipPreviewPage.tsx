import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { getPageFrameMaxClass } from '../lib/layoutMode';
import { ArrowLeft, Clock, ExternalLink, MonitorDown } from 'lucide-react';

export default function TemporaFlipPreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const pageFrameMaxClass = getPageFrameMaxClass(location.search);

  return (
    <main className={`w-full ${pageFrameMaxClass} mx-auto border-x border-[#1D1D1B]/10 bg-[#FFFFFF] text-[#1D1D1B] min-h-screen`}>
      <header className="px-6 md:px-12 lg:px-20 py-7 border-b border-[#1D1D1B]/10 bg-[#F7F8FA] select-none">
        <button
          onClick={() => navigate('/workspace')}
          className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-400 hover:text-[#1D1D1B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isZh ? '返回工作台' : 'Back to Workspace'}
        </button>

        <div className="mt-7 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.26em] text-[#A58261]">
              <Clock className="w-3.5 h-3.5" />
              TEMPORA FLIP PREVIEW
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-serif font-semibold leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              {isZh ? '时幕翻页钟 · 在线预览' : 'Tempora Flip · Web Preview'}
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-sans leading-relaxed text-zinc-500">
              {isZh
                ? '这是先行网页预览版，用来确认屏保视觉、比例、AM 位置、翻页线和字体质感。后续 Windows / macOS 屏保包会从这里接入下载。'
                : 'A web preview for checking the screensaver visual system before native Windows and macOS builds are attached.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 font-sans text-[10px] font-bold uppercase tracking-[0.16em]">
            <a
              href="/tempora-flip/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#1D1D1B] bg-[#1D1D1B] text-[#FDFCF9] px-4 py-3 hover:bg-[#A58261] hover:border-[#A58261] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {isZh ? '纯净打开' : 'Open Clean'}
            </a>
            <a
              href="/tempora-flip/?fonts=digits"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#1D1D1B]/15 bg-white text-[#1D1D1B] px-4 py-3 hover:border-[#A58261] hover:text-[#A58261] transition-colors"
            >
              <MonitorDown className="w-3.5 h-3.5" />
              {isZh ? '数字校准板' : 'Digit Board'}
            </a>
          </div>
        </div>
      </header>

      <section className="p-4 md:p-7 lg:p-10 bg-[#111110]">
        <div className="border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="h-9 border-b border-white/10 bg-[#151515] flex items-center justify-between px-4 font-sans text-[9px] uppercase tracking-[0.18em] text-white/45">
            <span>{isZh ? '实时预览' : 'Live Preview'}</span>
            <span>WEB · /tempora-flip/</span>
          </div>
          <iframe
            title="Tempora Flip Preview"
            src="/tempora-flip/"
            className="block w-full h-[68vh] min-h-[520px] bg-black"
            allow="fullscreen; screen-wake-lock"
          />
        </div>
      </section>
    </main>
  );
}
