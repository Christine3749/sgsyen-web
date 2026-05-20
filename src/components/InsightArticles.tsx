import React, { useState } from 'react';
import { ARTICLES } from '../types';
import { Calendar, User, ChevronRight, HelpCircle } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

export default function InsightArticles() {
  const { locale, t } = useLocale();
  const isZh = locale === 'zh';
  const [activeSlug, setActiveSlug] = useState<string>(ARTICLES[0].slug);
  const activeArticle = ARTICLES.find(a => a.slug === activeSlug) || ARTICLES[0];

  return (
    <div className="space-y-6">
      <div className="border-b border-[#1D1D1B] pb-4 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#A58261]">
            {t('articleHeroTitle')}
          </span>
          <h2 className="text-3xl font-serif font-medium mt-1">{t('articleTitle')}</h2>
        </div>
        <span className="text-[11px] font-mono text-stone-500 italic hidden sm:inline">
          {t('articleSub')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation columns: 4 span */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {ARTICLES.map((article) => {
            const isActive = article.slug === activeSlug;
            return (
              <button
                key={article.slug}
                onClick={() => setActiveSlug(article.slug)}
                className={`text-left p-4 border transition-all duration-200 outline-none select-none ${
                  isActive 
                    ? 'border-[#1D1D1B] bg-[#1D1D1B]/3' 
                    : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/50'
                }`}
              >
                <div className="text-[9px] font-sans uppercase font-bold tracking-widest text-[#A58261]">
                  {isZh ? article.date : article.dateEn} • {isZh ? article.author : article.authorEn}
                </div>
                <h3 className="font-serif font-medium text-base text-[#1D1D1B] mt-1 line-clamp-2">
                  {isZh ? article.title : article.titleEn}
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-1.5 leading-relaxed line-clamp-2">
                  {isZh ? article.subtitle : article.subtitleEn}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-[#A58261] font-sans font-bold mt-3 uppercase tracking-wider">
                  <span>{t('articleNavTitle')}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                </div>
              </button>
            );
          })}

          <div className="mt-4 p-4 border border-dashed border-[#A58261]/30 bg-[#FAF9F5] rounded space-y-2">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#A58261] flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> {t('articleNavMemoTitle')}
            </h4>
            <p className="text-[11px] font-sans text-stone-600 leading-relaxed">
              {t('articleNavMemoDesc')}
            </p>
          </div>
        </div>

        {/* Detailed briefing area: 8 span */}
        <div className="lg:col-span-8 border border-stone-200 bg-white p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-stone-500 uppercase tracking-wider border-b border-stone-100 pb-3">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#A58261]" /> {isZh ? activeArticle.author : activeArticle.authorEn}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#A58261]" /> {isZh ? activeArticle.date : activeArticle.dateEn}
              </span>
              <span className="text-[8px] bg-[#1D1D1B] text-[#FDFCF9] px-2 py-0.5 font-bold rounded">
                {t('articleInternalReport')}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1D1D1B] tracking-tight leading-tight">
              {isZh ? activeArticle.title : activeArticle.titleEn}
            </h1>
            <p className="text-stone-600 font-serif italic text-base leading-relaxed max-w-2xl border-l-2 border-[#A58261] pl-4">
              {isZh ? activeArticle.subtitle : activeArticle.subtitleEn}
            </p>
          </div>

          <div className="border-t border-stone-100 pt-6">
            <div className="font-sans text-sm text-[#1D1D1B] leading-relaxed select-text space-y-4 whitespace-pre-wrap">
              {isZh ? activeArticle.content : activeArticle.contentEn}
            </div>
          </div>
          
          <div className="pt-6 border-t border-stone-150 flex items-center gap-2 text-[10px] font-sans text-stone-500 italic select-none">
            <span>{t('articleReviewerAndStamp')}</span>
            <span>•</span>
            <span>{t('articleStampCode')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
