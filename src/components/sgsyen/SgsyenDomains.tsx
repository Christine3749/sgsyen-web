import React from 'react';
import { motion } from 'motion/react';
import { useLocale } from '../../context/LocaleContext';

export default function SgsyenDomains() {
  const { t, locale } = useLocale();

  const stats = [
    { 
      id: 'stat-card-reports', 
      number: '48', 
      unit: locale === 'zh' ? '份' : 'Reports', 
      label: t('sgsyenStatReports')
    },
    { 
      id: 'stat-card-fellows', 
      number: '12', 
      unit: locale === 'zh' ? '位' : 'Scholars', 
      label: t('sgsyenStatFellows')
    },
    { 
      id: 'stat-card-years', 
      number: '6', 
      unit: locale === 'zh' ? '年' : 'Years', 
      label: t('sgsyenStatYears')
    },
    { 
      id: 'stat-card-collaborators', 
      number: '30+', 
      unit: '', 
      label: t('sgsyenStatCollaborators')
    },
  ];

  const domains = [
    { 
      id: 'domain-block-01',
      num: '01', 
      title: locale === 'zh' ? '战略经济与全球治理' : 'Strategic Economy & Global Governance', 
      desc: locale === 'zh' 
        ? '研判全球地缘经济格局重塑、产业链多边重组与跨国规制机制。为产业前沿布局和公共决策提供坚实的结构性背景、地缘演进分析及跨市场博弈红线。' 
        : 'Assessing global trade network restructurings, multi-lateral supplychain realignments, and trans-border regulatory regimes to advise both public agencies and corporate leaders.'
    },
    { 
      id: 'domain-block-02',
      num: '02', 
      title: locale === 'zh' ? '科技政策与数字秩序' : 'Tech Policy & Digital Sovereignty', 
      desc: locale === 'zh'
        ? '聚焦人工智能多维监管、数字主权合规、科技安全政策及跨国高壁垒博弈。探索前沿技术高速跃迁下的合规界限与全新智理范式。' 
        : 'Formulating policy responses to rapid AI breakthroughs, cross-border technology barriers, data alignment safety, and modern systemic compliance constraints'
    },
    { 
      id: 'domain-block-03',
      num: '03', 
      title: locale === 'zh' ? '社会治理与制度创新' : 'Social Governance & Institutional Innovation', 
      desc: locale === 'zh'
        ? '深耕城乡空间更新转型、公共服务质效、中国基层现代治理与产业升级路径，提供深度田野观察与政策效能质询，致力于中国特色的制度创新评估。' 
        : 'Deep-diving into regional revitalization dynamics, civic welfare delivery, and grassroot governance workflows through rigorous fieldwork and assessment engines.'
    },
  ];

  return (
    <section id="sgsyen-research-domains-all" className="py-24 px-6 md:px-12 lg:px-20 bg-[#111110] text-[#FDFCF9]">
      
      {/* 1. Core Stats Row */}
      <div id="sgsyen-stats-heading-block" className="mb-14 select-none">
        <span id="sgsyen-stats-sub-lbl" className="block text-[10px] uppercase tracking-[0.25em] mb-4 text-[#FDFCF9]/40 font-sans">
          {t('sgsyenOverviewSub')}
        </span>
        <h2 id="sgsyen-stats-main-title" className="text-3xl lg:text-5xl font-serif font-semibold" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          {t('sgsyenOverviewTitle')}
        </h2>
      </div>

      <div id="sgsyen-stats-grid-container" className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-[#FDFCF9]/10">
        {stats.map((stat) => (
          <div key={stat.id} id={stat.id} className="py-6 border-r last:border-r-0 border-[#FDFCF9]/10 pr-4">
            <div id={`${stat.id}-sum-line`} className="flex items-baseline gap-1 mb-3">
              <span id={`${stat.id}-number`} className="text-5xl md:text-6xl font-serif font-black text-[#FDFCF9]" style={{ fontFamily: '"Playfair Display", serif' }}>
                {stat.number}
              </span>
              {stat.unit && (
                <span id={`${stat.id}-unit`} className="text-[10px] uppercase tracking-wider font-semibold text-[#C4A35A] font-sans">
                  {stat.unit}
                </span>
              )}
            </div>
            <p id={`${stat.id}-label`} className="text-xs md:text-xs leading-relaxed text-[#FDFCF9]/50 whitespace-pre-line font-sans">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* 2. Key Domains Grid */}
      <div id="sgsyen-domains-heading-block" className="mt-24 mb-16 select-none">
        <span id="sgsyen-domains-sub-lbl" className="block text-[10px] uppercase tracking-[0.25em] mb-4 text-[#FDFCF9]/40 font-sans">
          {t('sgsyenCoreDomainsSub')}
        </span>
        <h2 id="sgsyen-domains-main-title" className="text-3xl lg:text-5xl font-serif font-semibold" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          {t('sgsyenCoreDomainsTitle')}
        </h2>
      </div>

      <div id="sgsyen-domains-grid-container" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#FDFCF9]/10 rounded overflow-hidden">
        {domains.map((d) => (
          <div 
            key={d.id} 
            id={d.id} 
            className="p-8 md:p-12 transition-all duration-300 hover:bg-[#1C1814] bg-[#111110] flex flex-col justify-between group"
          >
            <div id={`${d.id}-meta-box`}>
              <span id={`${d.id}-index-lbl`} className="block text-xs font-bold mb-8 text-[#C4A35A] tracking-widest font-mono">
                {d.num}
              </span>
              <h3 id={`${d.id}-title`} className="text-xl md:text-2xl font-bold mb-6 font-serif text-[#FDFCF9] group-hover:text-[#C4A35A] transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                {d.title}
              </h3>
            </div>
            <p id={`${d.id}-description`} className="text-xs md:text-sm leading-relaxed text-[#FDFCF9]/60 font-light font-sans max-w-sm">
              {d.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 3. High-end motto slogan */}
      <div id="sgsyen-academic-motto-box" className="mt-24 pt-8 border-t border-[#FDFCF9]/5 text-center">
        <p id="sgsyen-academic-motto" className="text-xs md:text-sm italic tracking-wide text-[#FDFCF9]/40 max-w-xl mx-auto font-serif">
          {t('sgsyenMotto')}
        </p>
      </div>

    </section>
  );
}
