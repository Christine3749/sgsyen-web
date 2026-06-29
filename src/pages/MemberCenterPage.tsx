import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Check, Crown, Database, FileText, LockKeyhole, MonitorDown, Settings, ShieldCheck, Terminal, UserCircle } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { getPageFrameMaxClass, getSgsyenViewMode } from '../lib/layoutMode';
import ViewModeSwitch from '../components/sgsyen/ViewModeSwitch';
import LanguageSwitch from '../components/sgsyen/LanguageSwitch';

const DEFAULT_MEMBER_EMAIL = 'Ethan7586@gsyen.com';

const NAV_ITEMS = [
  { zh: '账户信息', en: 'Account', icon: UserCircle, active: true },
  { zh: '我的权限', en: 'Access', icon: ShieldCheck },
  { zh: '会员方案', en: 'Plan', icon: Crown },
  { zh: '账户设置', en: 'Settings', icon: Settings },
];

const MODULES = [
  {
    zh: '雍彻砚台',
    en: 'SGSYEN Inkwell',
    tagZh: '审阅与蒸馏',
    tagEn: 'Review / Distill',
    descZh: '进入候选事件、会员审阅、题眼落笔和 AI 蒸馏样本。',
    descEn: 'Review candidate events, mark signals, and create distillation samples.',
    href: '/workspace/regime-lab',
    icon: ShieldCheck,
    primary: true,
  },
  {
    zh: '我的审阅',
    en: 'My Reviews',
    tagZh: '判断痕迹',
    tagEn: 'Judgment Trail',
    descZh: '沉淀你的判势、证据、落笔和 GEO 匹配记录。',
    descEn: 'Archive your scores, evidence, GEO fit, and edits.',
    href: '/member',
    icon: FileText,
  },
  {
    zh: '我的收藏',
    en: 'Saved Research',
    tagZh: '文章与事件',
    tagEn: 'Research',
    descZh: '保存你反复回看的文章、事件镜像和模型解释。',
    descEn: 'Keep articles, event mirrors, and model notes for later reading.',
    href: '/research',
    icon: Bookmark,
  },
  {
    zh: '下载与工具',
    en: 'Downloads',
    tagZh: '工作台',
    tagEn: 'Workspace',
    descZh: '进入 Tempora Flip、时幕画廊和 SGSYEN 桌面工具。',
    descEn: 'Open Tempora Flip, gallery tools, and SGSYEN desktop utilities.',
    href: '/workspace',
    icon: MonitorDown,
  },
  {
    zh: 'API / 数据权限',
    en: 'API Access',
    tagZh: '研究员接口',
    tagEn: 'Research API',
    descZh: '未来统一查看 API Token、数据表权限和研究员接入。',
    descEn: 'Future home for API tokens, data access, and researcher onboarding.',
    href: '/research?api=1',
    icon: Terminal,
  },
];

export default function MemberCenterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, authorizedEmail } = useLocale();
  const isZh = locale === 'zh';
  const pageFrameMaxClass = getPageFrameMaxClass(location.search);
  const viewMode = getSgsyenViewMode(location.search);
  const memberEmail = authorizedEmail ?? DEFAULT_MEMBER_EMAIL;
  const isMember = Boolean(authorizedEmail);

  const withView = (href: string) => {
    const [pathname, query = ''] = href.split('?');
    const params = new URLSearchParams(query);
    params.set('view', viewMode);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <main className={`w-full ${pageFrameMaxClass} mx-auto border-x border-[#1D1D1B]/10 bg-[#F7F8FA] text-[#1D1D1B] min-h-screen`}>
      <div className="relative flex flex-wrap md:flex-nowrap items-center gap-y-3 px-3 md:px-5 lg:px-6 py-0 bg-[#F7F8FA] select-none min-h-[36px] md:h-[36px] overflow-hidden shrink-0">
        <button
          type="button"
          onClick={() => navigate(withView('/'))}
          className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-400 hover:text-[#1D1D1B] transition-colors cursor-pointer shrink-0 z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isZh ? '返回首页' : 'Back Home'}
        </button>
        <div className="ml-auto z-10 flex items-center gap-2">
          <ViewModeSwitch />
          <LanguageSwitch />
        </div>
      </div>

      <section className="px-6 md:px-12 lg:px-20 py-10 md:py-12 border-t border-[#1D1D1B]/10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4">
            <div className="border border-[#1D1D1B]/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A58261]/30 bg-[#A58261]/5 text-[#A58261]">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-serif font-semibold">SGSYEN 账号</div>
                  <div className="truncate text-[10px] font-sans uppercase tracking-widest text-zinc-400">{memberEmail}</div>
                </div>
              </div>
            </div>

            <nav className="border border-[#1D1D1B]/10 bg-white p-2 text-sm">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.zh}
                    className={`flex items-center gap-2 px-3 py-2 font-sans text-[11px] ${
                      item.active ? 'bg-[#1D1D1B] text-[#FDFCF9]' : 'text-zinc-500'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{isZh ? item.zh : item.en}</span>
                  </div>
                );
              })}
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_0.72fr] xl:items-end">
              <div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.28em] text-[#A58261]">
                  SGSYEN · MEMBER CENTER
                </div>
                <h1 className="mt-3 text-4xl md:text-6xl font-serif font-semibold leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  {isZh ? '会员中心' : 'Member Center'}
                </h1>
                <p className="mt-5 max-w-3xl text-sm md:text-base font-sans leading-relaxed text-zinc-500">
                  {isZh
                    ? '会员中心是 SGSYEN 内部研究协作的统一入口。砚台、审阅、收藏、订阅、下载与接口权限，都会在这里沉淀。'
                    : 'A unified member entry for SGSYEN research collaboration: inkwell, reviews, saves, subscriptions, downloads, and API access.'}
                </p>
              </div>

              <div className="border border-[#1D1D1B]/10 bg-white p-5">
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#A58261]">
                  {isZh ? '会员状态' : 'Membership State'}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5 font-sans text-[10px] uppercase tracking-widest">
                  <Meta label={isZh ? '账号' : 'Account'} value={memberEmail} />
                  <Meta label={isZh ? '身份' : 'Role'} value={isMember ? 'OWNER' : 'PREVIEW'} />
                  <Meta label={isZh ? '砚台' : 'Inkwell'} value={isZh ? '可进入' : 'Open'} />
                  <Meta label={isZh ? '阶段' : 'Stage'} value={isZh ? '前端预览' : 'Frontend preview'} />
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <StatusPanel title={isZh ? '当前方案' : 'Current Plan'} value={isMember ? 'OWNER' : 'PREVIEW'} meta={isZh ? '账号已识别' : 'Account recognized'} icon={<Crown className="h-5 w-5" />} />
              <StatusPanel title={isZh ? '产品权限' : 'Product Access'} value="SGSYEN" meta={isZh ? '智库研究终端' : 'Research terminal'} icon={<ShieldCheck className="h-5 w-5" />} />
              <StatusPanel title={isZh ? '授权来源' : 'Authority'} value="MEMBER" meta={isZh ? '会员中心托管' : 'Member center'} icon={<LockKeyhole className="h-5 w-5" />} />
            </div>

            <div className="border border-[#A58261]/30 bg-white">
              <div className="border-b border-[#1D1D1B]/10 p-6 flex items-start justify-between gap-6">
                <div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-[#A58261]">CORE ENTRY</div>
                  <button
                    type="button"
                    onClick={() => navigate(withView('/workspace/regime-lab'))}
                    className="mt-3 text-left text-3xl md:text-4xl font-serif font-semibold leading-tight hover:text-[#A58261] transition-colors cursor-pointer"
                  >
                    {isZh ? '雍彻砚台' : 'SGSYEN Inkwell'}
                  </button>
                  <p className="mt-3 max-w-2xl text-sm font-sans leading-relaxed text-zinc-500">
                    {isZh
                      ? '先从砚台进入：候选事件、会员审阅、GEO 匹配、题眼落笔和模型蒸馏，后面都会围绕这里展开。'
                      : 'Start from the inkwell: candidate events, member review, GEO fit, signal writing, and model distillation.'}
                  </p>
                </div>
                <div className="hidden sm:flex h-12 w-12 border border-[#1D1D1B]/10 items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#1D1D1B]" />
                </div>
              </div>
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-400">Review · Distill · Decide</div>
                <button
                  type="button"
                  onClick={() => navigate(withView('/workspace/regime-lab'))}
                  className="inline-flex items-center justify-center border border-[#1D1D1B]/10 px-4 py-2 text-[9px] font-sans font-bold uppercase tracking-widest text-stone-500 hover:border-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-[#FDFCF9] transition-colors cursor-pointer"
                >
                  {isZh ? '进入砚台' : 'Open Inkwell'}
                </button>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {MODULES.filter((item) => !item.primary).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.zh}
                    type="button"
                    onClick={() => navigate(withView(item.href))}
                    className="group text-left border border-[#1D1D1B]/10 bg-white p-5 hover:border-[#A58261]/50 transition-colors cursor-pointer"
                  >
                    <div className="mb-5 inline-flex h-9 w-9 items-center justify-center border border-[#1D1D1B]/10 text-[#1D1D1B] group-hover:text-[#A58261]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#A58261]">
                      {isZh ? item.tagZh : item.tagEn}
                    </div>
                    <div className="mt-2 text-xl font-serif font-semibold">{isZh ? item.zh : item.en}</div>
                    <div className="mt-2 text-xs font-sans leading-relaxed text-zinc-500">{isZh ? item.descZh : item.descEn}</div>
                  </button>
                );
              })}
            </div>

            <div className="border border-[#1D1D1B]/10 bg-white">
              <div className="border-b border-[#1D1D1B]/10 px-5 py-4">
                <div className="text-sm font-serif font-semibold">{isZh ? '账户信息' : 'Account Information'}</div>
                <div className="mt-1 text-[10px] font-sans uppercase tracking-[0.18em] text-zinc-400">
                  {isZh ? '基础资料和授权状态' : 'Basic profile and access state'}
                </div>
              </div>
              <InfoRow label={isZh ? '邮箱' : 'Email'} value={memberEmail} />
              <InfoRow label={isZh ? '角色' : 'Role'} value={isMember ? 'owner' : 'preview'} />
              <InfoRow label={isZh ? '订阅状态' : 'Subscription'} value={isMember ? 'active' : 'pending'} />
            </div>
          </section>
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

function StatusPanel({ title, value, meta, icon }: { title: string; value: string; meta: string; icon: React.ReactNode }) {
  return (
    <div className="border border-[#1D1D1B]/10 bg-white p-5">
      <div className="mb-5 inline-flex h-9 w-9 items-center justify-center border border-[#A58261]/30 bg-[#A58261]/5 text-[#A58261]">{icon}</div>
      <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-400">{title}</div>
      <div className="mt-2 text-xl font-sans font-black tracking-widest text-[#1D1D1B]">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
        <Check className="h-3 w-3 text-[#A58261]" />
        {meta}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-b border-[#1D1D1B]/10 px-5 py-4 text-sm last:border-b-0 sm:grid-cols-[160px_1fr]">
      <div className="font-sans text-zinc-400">{label}</div>
      <div className="font-mono text-[#1D1D1B]">{value}</div>
    </div>
  );
}
