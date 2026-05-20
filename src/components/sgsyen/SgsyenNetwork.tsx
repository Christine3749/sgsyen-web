import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Settings, ArrowUpRight, Check, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';

interface AffiliateSite {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  themeColor: string;
}

const DEFAULT_SITES: AffiliateSite[] = [
  {
    id: 'site-01',
    name: 'gsyen.com',
    category: '疆域 (ChatGPT / Gemini / Codex)',
    description: '雍彻智能体与专家大模型集群。研发自然语言处理、混合多通道高级代码编译，以及政策层面前瞻演化等全能学术算链。',
    url: 'https://gsyen.com',
    themeColor: '#C4A35A' // Gold
  },
  {
    id: 'site-02',
    name: 'halfsphere.com',
    category: 'Token 算力能效与消耗监控',
    description: '深度解构核心神经网络与混合计算能耗的敏捷数字仪表。专门评估 Token 负荷、会话生命期与卡群硬件利用损耗。',
    url: 'https://www.halfsphere.com',
    themeColor: '#1D1D1B' // Charcoal
  },
  {
    id: 'site-03',
    name: 'soulshock.net',
    category: '武汉震魂科技',
    description: '自主创新的高精度时空数字孪生引擎与文化遗产数字化保护工程。构建非物质文化遗产数字智能体、口述历史以及高精度工业渲染。',
    url: 'https://soulshock.net',
    themeColor: '#C83E3E' // Red
  },
  {
    id: 'site-04',
    name: 'zhijian.me',
    category: '纸笺幼师助手',
    description: '面向华语幼儿教师的数字化智能办公与保教分析助手。基于垂直语言模型，提供个性化成长评语生成、班级观察分析、精品教案设计与专业保教评估。',
    url: 'https://zhijian.me',
    themeColor: '#5C8F79' // Sage Green
  }
];

export default function SgsyenNetwork() {
  const { locale } = useLocale();
  const [sites, setSites] = useState<AffiliateSite[]>([]);
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Keynote-level slider controls
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('sgsyen_matrix_sites');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatic migration to include new site-04
        if (!Array.isArray(parsed) || parsed.length < 4 || !parsed.some(site => site.id === 'site-04')) {
          setSites(DEFAULT_SITES);
          localStorage.setItem('sgsyen_matrix_sites', JSON.stringify(DEFAULT_SITES));
        } else {
          setSites(parsed);
        }
      } catch {
        setSites(DEFAULT_SITES);
      }
    } else {
      setSites(DEFAULT_SITES);
    }
  }, []);

  const handleStartEdit = (site: AffiliateSite) => {
    setEditingSiteId(site.id);
    setEditName(site.name);
    setEditCategory(site.category);
    setEditDescription(site.description);
    setEditUrl(site.url);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    if (!editName || !editUrl) return;

    const updated = sites.map(s => {
      if (s.id === editingSiteId) {
        return {
          ...s,
          name: editName,
          category: editCategory,
          description: editDescription,
          url: editUrl.startsWith('http') ? editUrl : `https://${editUrl}`
        };
      }
      return s;
    });

    setSites(updated);
    localStorage.setItem('sgsyen_matrix_sites', JSON.stringify(updated));
    setEditingSiteId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm(locale === 'zh' ? '确定要恢复默认的合作网络挂载吗？' : 'Are you sure you want to restore the default portals?')) {
      setSites(DEFAULT_SITES);
      localStorage.setItem('sgsyen_matrix_sites', JSON.stringify(DEFAULT_SITES));
      setEditingSiteId(null);
      setCurrentIndex(0);
    }
  };

  const maxIndex = Math.max(0, sites.length - visibleCount);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section 
      id="sgsyen-portal-network-matrix" 
      className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F5] text-[#1D1D1B] border-t border-b border-[#1D1D1B]/10 relative overflow-hidden"
    >
      {/* Decorative vertical stripe */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#1D1D1B]/5 pointer-events-none" />

      {/* Grid Container for Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6 relative z-10 select-none">
        <div>
          <span className="block text-[10px] uppercase tracking-[0.25em] mb-4 text-[#A58261] font-sans font-bold">
            {locale === 'zh' ? '雍彻智库 • 官方产业生态矩阵' : 'AFFILIATED NETWORK • THE SGSYEN ECOSYSTEM'}
          </span>
          <h2 
            className="text-3xl lg:text-5xl font-serif font-semibold text-[#1D1D1B]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {locale === 'zh' ? '学术与产业集群' : 'Bespoke Network Portals'}
          </h2>
          <p className="font-sans text-xs text-stone-500 mt-4 max-w-xl leading-relaxed">
            {locale === 'zh' 
              ? '为了在数字化复苏及特种算力研判中构建战略闭环，智库提供了由四个高联动性创新站点汇聚起的学术、科技战略与资产活化网络。您可以通过右侧设置按钮，自由绑定您的其他网站。'
              : 'To establish a seamless strategic loop across policy research and spatial computing, the institute anchors four interconnected platforms. Feel free to modify domain bindings using the controls.'
            }
          </p>
        </div>

        {/* Action controls with Keynote paging buttons */}
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#1D1D1B]/15 hover:border-[#A58261] text-[10px] uppercase font-sans font-bold text-stone-600 hover:bg-stone-100 transition-colors rounded cursor-pointer h-10 shadow-sm"
          >
            <RefreshCw className="w-3 h-3 animate-spin duration-1000" style={{ animationDuration: '4s' }} />
            {locale === 'zh' ? '复位集群' : 'Restore'}
          </button>

          {/* Keynote Slide controls matching Case Studies */}
          <div className="flex items-center gap-2 bg-white p-1 rounded border border-[#1D1D1B]/10 shadow-sm">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                currentIndex === 0 
                  ? 'text-stone-300 bg-stone-50 cursor-not-allowed border border-transparent' 
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5] hover:text-[#A58261] border border-stone-200'
              }`}
              title={locale === 'zh' ? '上一个' : 'Previous'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono font-bold px-1 select-none min-w-[40px] text-center text-stone-600">
              {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                currentIndex >= maxIndex 
                  ? 'text-stone-300 bg-stone-50 cursor-not-allowed border border-transparent' 
                  : 'text-[#1D1D1B] hover:bg-[#FAF9F5] hover:text-[#A58261] border border-stone-200'
              }`}
              title={locale === 'zh' ? '下一个' : 'Next'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Bento Carousel Wrapper */}
      <div className="relative z-10 overflow-hidden -mx-4 px-4 py-4">
        <motion.div 
          id="sgsyen-matrix-bento" 
          className="flex items-stretch"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          {sites.map((site) => (
            <div
              key={site.id}
              className="flex-shrink-0 px-4 transition-all duration-300 flex"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div
                id={`network-card-${site.id}`}
                className="group w-full bg-white border border-[#1D1D1B]/10 hover:border-[#A58261] rounded p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[360px] relative overflow-hidden"
              >
                {/* Top color tag bar */}
                <div 
                  className="absolute top-0 left-0 w-full h-[3px]" 
                  style={{ backgroundColor: site.themeColor || '#A58261' }}
                />

                <div className="space-y-6">
                  {/* Card Meta & Edit Trigger */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-bold">
                      {site.category}
                    </span>
                    
                    <button
                      onClick={() => handleStartEdit(site)}
                      className="p-1.5 text-stone-400 hover:text-[#A58261] hover:bg-stone-50 rounded transition-colors cursor-pointer"
                      title="Configure this node"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title Website Name */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-black text-[#1D1D1B] tracking-tight hover:underline flex items-baseline gap-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                      {site.name}
                      <Globe className="w-4 h-4 text-stone-300 inline" />
                    </h3>
                    <span className="text-[10px] font-mono text-[#A58261] font-semibold tracking-wider">
                      LINK NODE ENABLED
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-stone-500 font-sans">
                    {site.description}
                  </p>
                </div>

                {/* Launch CTA Button */}
                <div className="mt-8 pt-6 border-t border-[#1D1D1B]/5 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-stone-400 font-medium">
                    {locale === 'zh' ? '数据链路受托' : 'Tunnel Secured'}
                  </span>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 text-xs font-bold font-sans tracking-widest uppercase text-white px-4 py-2 rounded transition-colors shadow-sm"
                    style={{ backgroundColor: '#1D1D1B' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A58261'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1D1D1B'}
                  >
                    <span>{locale === 'zh' ? '登入终端' : 'Enter Portal'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Editor Modal Overlay for precise on-the-spot adjustments */}
      <AnimatePresence>
        {editingSiteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[700] flex items-center justify-center p-4 select-none"
            onClick={() => setEditingSiteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border text-left border-[#1D1D1B]/15 w-full max-w-lg p-8 rounded shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold text-[#A58261] uppercase tracking-widest block">
                  {locale === 'zh' ? '控制台 • 雍彻矩阵节点修饰' : 'CONSOLE • INTEGRATION TUNNEL EDIT'}
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#1D1D1B]">
                  {locale === 'zh' ? '自定义挂载您的网站' : 'Configure Custom Domain'}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  {locale === 'zh' 
                    ? '在这里直接修改对应的标题、板块以及指向链接。点击保存后，主页面内容将同步更新并自适应存储。'
                    : 'Directly modify the name, category, and href anchor of this node. Your changes take effect instantly.'
                  }
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider block">
                    {locale === 'zh' ? '网站显示名称 / 域名 (Name / Title)' : 'Website Name / Domain'}
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded text-sm text-[#1D1D1B] outline-none focus:border-[#C4A35A]"
                    placeholder="E.g., soulshock.net"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider block">
                    {locale === 'zh' ? '所属学术领域 / 板块分类 (Domain / Tag)' : 'Sector / Category Label'}
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded text-sm text-[#1D1D1B] outline-none focus:border-[#C4A35A]"
                    placeholder="E.g., 时空计算与人文活化"
                  />
                </div>

                {/* URL */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider block">
                    {locale === 'zh' ? '跳转地址 (Target URL)' : 'Target URL Address'}
                  </label>
                  <div className="flex items-center bg-stone-50 border border-stone-200 rounded overflow-hidden">
                    <span className="px-3 text-stone-400 bg-stone-100 border-r py-2.5 font-mono">https://</span>
                    <input
                      type="text"
                      value={editUrl.replace(/^https?:\/\//, '')}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full bg-transparent p-2 outline-none text-[#1D1D1B] font-mono text-sm"
                      placeholder="mysite.com"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase tracking-wider block">
                    {locale === 'zh' ? '研究使命简介 (Core Mission Description)' : 'Platform Description'}
                  </label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded text-sm text-[#1D1D1B] outline-none focus:border-[#C4A35A] leading-relaxed resize-none"
                    placeholder="Explain the mission of your custom portal..."
                  />
                </div>
              </div>

              {/* Footer Button actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100 text-xs font-bold font-sans">
                <button
                  onClick={() => setEditingSiteId(null)}
                  className="px-4 py-2 border border-stone-200 rounded text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  {locale === 'zh' ? '放弃修改' : 'Discard'}
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#1D1D1B] hover:bg-emerald-800 text-white rounded cursor-pointer transition-colors"
                >
                  {locale === 'zh' ? '确权保存' : 'Commit Changes'}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Senders Toast success */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 bg-emerald-900 text-white text-xs px-4 py-3 rounded shadow-lg border border-emerald-500 flex items-center gap-2 z-[9999] font-sans">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{locale === 'zh' ? '🎉 雍彻智库矩阵连路已成功保存！' : '🎉 SGSYEN link nodes updated successfully!'}</span>
        </div>
      )}

    </section>
  );
}
