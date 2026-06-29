import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import {
  ArrowLeft,
  Activity,
  Clock,
  Download,
  MonitorDown,
  ShieldCheck,
  Sparkles,
  Terminal,
  Image,
} from 'lucide-react';

const TOOL_ITEMS = [
  {
    name: 'Tempora Flip',
    zh: '时幕翻页钟',
    en: 'Flip clock screensaver',
    categoryZh: '桌面与屏幕',
    categoryEn: 'Desktop',
    statusZh: '在线预览',
    statusEn: 'Web preview',
    platform: 'Windows / macOS / Web',
    icon: Clock,
    accent: 'bg-[#1D1D1B]',
    href: '/workspace/tempora-flip',
    actionZh: '进入预览',
    actionEn: 'Open Preview',
    noteZh: '先看网页预览，原生屏保包后接入。',
    noteEn: 'Web preview is live; native screensaver packages will follow.',
  },
  {
    name: 'Tempora Gallery',
    zh: '时幕画廊',
    en: 'Wallpaper guard and gallery',
    categoryZh: '桌面与屏幕',
    categoryEn: 'Desktop',
    statusZh: '架构规划中',
    statusEn: 'Architecture draft',
    platform: 'Windows',
    icon: Image,
    accent: 'bg-[#A58261]',
    noteZh: '壁纸守护与图库管理准备中。',
    noteEn: 'Wallpaper guard and gallery management are being planned.',
  },
  {
    name: 'SGSYEN Quant Dock',
    zh: '量化数据坞',
    en: 'Research data dock',
    categoryZh: '研究终端',
    categoryEn: 'Research',
    statusZh: '内测面板',
    statusEn: 'Private beta',
    platform: 'Web / API',
    icon: Activity,
    accent: 'bg-[#5A687D]',
    noteZh: '先服务研究终端，之后开放下载。',
    noteEn: 'Research terminal first, public download later.',
  },
  {
    name: 'API Probe',
    zh: '研究员接口探针',
    en: 'Research API probe',
    categoryZh: '开发者',
    categoryEn: 'Developer',
    statusZh: '接入文档',
    statusEn: 'Docs live',
    platform: 'CLI / Web',
    icon: Terminal,
    accent: 'bg-[#C83E3E]',
    href: '/research?api=1',
    actionZh: '打开接入',
    actionEn: 'Open API',
    noteZh: '研究 API 接入文档与诊断说明从这里进入。',
    noteEn: 'Research API access docs and probe notes live here.',
  },
];

const RELEASE_NOTES = [
  { zh: '工作台只做一个统一入口，不挤占顶部主导航。', en: 'Workspace stays as one unified entry without crowding the top navigation.' },
  { zh: '正式下载前保留版本、平台、状态和发布口径。', en: 'Before downloads go live, each utility keeps version, platform, status, and release notes visible.' },
  { zh: '未来 Windows / macOS / Web 小工具都从这里进入。', en: 'Future Windows, macOS, and web utilities will launch from here.' },
];

export default function ToolsPage() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const isZh = locale === 'zh';

  return (
    <main className="w-full max-w-[1300px] mx-auto border-x border-[#1D1D1B]/10 bg-[#FFFFFF] text-[#1D1D1B] min-h-screen">
      <div className="relative flex flex-wrap md:flex-nowrap items-center gap-y-3 px-6 md:px-12 lg:px-16 py-0 border-b border-[#1D1D1B]/10 bg-[#F7F8FA] select-none min-h-[36px] md:h-[36px] overflow-hidden shrink-0">
        <button
          onClick={() => navigate('/research')}
          className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-400 hover:text-[#1D1D1B] transition-colors cursor-pointer shrink-0 z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isZh ? '返回观点与研究' : 'Back to Research'}
        </button>
      </div>

      <header className="px-6 md:px-12 lg:px-20 py-10 border-b border-[#1D1D1B]/10 bg-[#F7F8FA] select-none">
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-10 items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.26em] text-[#A58261]">
              <Download className="w-3.5 h-3.5" />
              SGSYEN WORKSPACE
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-serif font-semibold leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              {isZh ? '雍彻工作台' : 'SGSYEN Workspace'}
            </h1>
            <p className="mt-5 max-w-3xl text-sm md:text-base font-sans leading-relaxed text-zinc-500">
              {isZh
                ? '这里专门放 SGSYEN 体系里的桌面小工具、屏保、壁纸守护、研究辅助面板和开发者探针。以后下载、版本说明和平台适配都在这里统一管理。'
                : 'A dedicated workspace for SGSYEN desktop utilities, screensavers, wallpaper guards, research panels, and developer probes.'}
            </p>
          </div>

          <aside className="border border-[#1D1D1B]/10 bg-white p-5">
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#A58261]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isZh ? '发布原则' : 'Release Discipline'}
            </div>
            <div className="mt-4 space-y-3">
              {RELEASE_NOTES.map((note, index) => (
                <div key={index} className="flex gap-3 text-[11px] font-sans leading-relaxed text-zinc-500">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#A58261] shrink-0" />
                  <span>{isZh ? note.zh : note.en}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <section className="px-6 md:px-12 lg:px-20 py-10 border-b border-[#1D1D1B]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#A58261]">
              {isZh ? '工作台清单' : 'Workspace Index'}
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-serif font-semibold">
              {isZh ? '桌面与研究工具工作台' : 'One workspace for SGSYEN utilities'}
            </h2>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">
            4 ITEMS · PREVIEW CHANNEL ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TOOL_ITEMS.map((tool) => {
            const Icon = tool.icon;
            const isEnabled = Boolean(tool.href);

            return (
              <article key={tool.name} className="border border-[#1D1D1B]/10 bg-white min-h-52 flex flex-col">
                <div className="flex items-start justify-between gap-6 p-6 border-b border-[#1D1D1B]/10">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#A58261]">
                      <span className={`h-2 w-2 rounded-full ${tool.accent}`} />
                      {tool.name}
                    </div>
                    <h3 className="mt-3 text-2xl font-serif font-semibold leading-tight">{isZh ? tool.zh : tool.en}</h3>
                  </div>
                  <div className="h-11 w-11 border border-[#1D1D1B]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#1D1D1B]" />
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-[#1D1D1B]/10 border-b border-[#1D1D1B]/10">
                  <Meta label={isZh ? '分类' : 'Type'} value={isZh ? tool.categoryZh : tool.categoryEn} />
                  <Meta label={isZh ? '平台' : 'Platform'} value={tool.platform} />
                  <Meta label={isZh ? '状态' : 'Status'} value={isZh ? tool.statusZh : tool.statusEn} />
                </div>

                <div className="mt-auto p-5 flex items-center justify-between gap-4">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-zinc-400">
                    {isZh ? tool.noteZh : tool.noteEn}
                  </span>
                  <button
                    type="button"
                    disabled={!isEnabled}
                    onClick={() => tool.href && navigate(tool.href)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 border text-[9px] font-sans font-bold uppercase tracking-widest transition-colors ${
                      isEnabled
                        ? 'border-[#1D1D1B] bg-[#1D1D1B] text-[#FDFCF9] hover:bg-[#A58261] hover:border-[#A58261] cursor-pointer'
                        : 'border-[#1D1D1B]/15 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    <MonitorDown className="w-3.5 h-3.5" />
                    {isEnabled ? (isZh ? tool.actionZh : tool.actionEn) : (isZh ? '即将开放' : 'Soon')}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-10 bg-[#111110] text-white">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#C4A35A]">
              <Sparkles className="w-3.5 h-3.5" />
              {isZh ? '下一步' : 'Next'}
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold">
              {isZh ? '先让预览跑起来，再接原生包。' : 'Preview first; native packages next.'}
            </h2>
          </div>
          <div className="space-y-4 font-sans text-sm leading-relaxed text-white/55">
            <p>
              {isZh
                ? 'Tempora Flip 已经有网页预览入口。正式发布时，这里会继续接入 Windows 屏保包、macOS DMG、版本日志和下载校验。'
                : 'Tempora Flip now has a web preview entry. Production releases will add Windows screensaver packages, macOS DMGs, changelogs, and download checks.'}
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {['Windows', 'macOS', 'Web'].map((item) => (
                <div key={item} className="border border-white/10 px-4 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-white/65">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 min-w-0">
      <div className="text-[8px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-400">{label}</div>
      <div className="mt-1 text-[10px] font-sans font-semibold text-[#1D1D1B] truncate">{value}</div>
    </div>
  );
}
