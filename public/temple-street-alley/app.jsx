// 庙街小巷 · 商业技术书 — 主组件
const { useState, useEffect, useMemo } = React;

/* ========== 摄影占位（CSS 渐变模拟，可替换实图） ========== */
const photoStyles = {
  market: {
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(184, 90, 60, .35) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(212, 178, 122, .55) 0%, transparent 60%),
      linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
    `,
  },
  street: {
    backgroundImage: `
      radial-gradient(ellipse at 50% 85%, rgba(184, 53, 31, .25) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 25%, rgba(212, 178, 122, .55) 0%, transparent 55%),
      linear-gradient(180deg, #F8F2E5 0%, #F0E4CC 45%, #E2C49C 80%, #BD8556 100%)
    `,
  },
  river: {
    backgroundImage: `
      radial-gradient(ellipse at 60% 50%, rgba(212, 178, 122, .5) 0%, transparent 50%),
      linear-gradient(180deg, #F4EEDF 0%, #EADDC2 55%, #D4B383 100%)
    `,
  },
  fish: {
    backgroundImage: `
      radial-gradient(ellipse at 40% 60%, rgba(184, 90, 60, .4) 0%, transparent 55%),
      linear-gradient(135deg, #F5EFE3, #E8D2A8 60%, #C99A6A 100%)
    `,
  },
};

/* ========== 摄影图组件（含网点纹理 & 描边） ========== */
function PhotoFrame({ style, label, captionNo, captionText, height = '100%', children }) {
  return (
    <div className="figure" style={{ height: 'auto' }}>
      <div className="figbox photo" style={{ ...style, height, position: 'relative' }}>
        {/* 印刷网点纹理 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
          mixBlendMode: 'multiply',
          opacity: .6,
        }} />
        {/* 暗角 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.5) 100%)',
        }} />
        {label && (
          <div style={{
            position: 'absolute', bottom: 10, left: 12,
            fontFamily: 'var(--sans-en)', fontSize: 9, letterSpacing: '.28em',
            color: 'rgba(255,255,255,.7)', textTransform: 'uppercase',
          }}>{label}</div>
        )}
        {children}
      </div>
      {captionText && (
        <div className="figcap">
          {captionNo && <span className="figno">{captionNo}</span>}
          <span>{captionText}</span>
        </div>
      )}
    </div>
  );
}

/* ========== 页面壳 ========== */
function Page({ dark, gridbg, children, runhead, folio, pageId, label }) {
  return (
    <div
      className={`page ${dark ? 'dark' : ''} ${gridbg ? 'gridbg' : ''}`}
      data-screen-label={label}
      id={pageId}
    >
      {runhead && (
        <div className="runhead">
          <span>{runhead.left}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="dot" />
            {runhead.right}
          </span>
        </div>
      )}
      <div className="page-body">{children}</div>
      {folio && (
        <div className="runfoot">
          <span>庙街小巷 · BUSINESS BOOK</span>
          <span className="folio">{folio}</span>
        </div>
      )}
    </div>
  );
}

/* ========== 1. 封面 - 青色版 A：深青对比 ========== */
function CoverPageCyanA() {
  const teal = '#0E5C5C';
  const tealDeep = '#0A4242';
  const tealLight = '#7FB8B0';
  const cream = '#F5F1E6';
  return (
    <div className="page" data-screen-label="01 封面 A" style={{ padding: 0, background: cream }}>
      {/* 主图区：深青 + 摄影氛围 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '64%',
        backgroundImage: `
          radial-gradient(ellipse at 70% 30%, rgba(127,184,176,.45) 0%, transparent 55%),
          radial-gradient(ellipse at 25% 75%, rgba(10,40,40,.7) 0%, transparent 60%),
          linear-gradient(135deg, ${tealDeep} 0%, ${teal} 45%, #1A6B66 75%, #0A2E2E 100%)
        `,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        {/* 顶部出版社条 */}
        <div style={{
          position: 'absolute', top: 28, left: 40, right: 40,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--sans-en)', fontSize: 10, letterSpacing: '.32em',
          color: 'rgba(245,241,230,.85)', textTransform: 'uppercase',
        }}>
          <span style={{ fontWeight: 700 }}>TOPV · 海甸 SERIES</span>
          <span>2026 / VOL. 01</span>
        </div>
        <div style={{
          position: 'absolute', top: 70, left: 40,
          fontFamily: 'var(--sans-zh)', fontSize: 11, letterSpacing: '.4em',
          color: tealLight, fontWeight: 600,
        }}>
          商 · 业 · 技 · 术 · 书
        </div>

        {/* 大字 SVG 装饰 - 抽象菜市场窗格 */}
        <svg style={{ position: 'absolute', right: 32, top: 100, opacity: .35 }} width="180" height="180" viewBox="0 0 180 180" fill="none">
          <rect x="10" y="10" width="70" height="70" stroke={cream} strokeWidth="1.2" />
          <rect x="100" y="10" width="70" height="70" stroke={cream} strokeWidth="1.2" />
          <rect x="10" y="100" width="70" height="70" stroke={cream} strokeWidth="1.2" />
          <rect x="100" y="100" width="70" height="70" stroke={cream} strokeWidth="1.2" />
          <circle cx="45" cy="45" r="20" stroke={tealLight} strokeWidth="1.2" />
          <path d="M115 25 L165 75 M115 75 L165 25" stroke={tealLight} strokeWidth="1.2" />
          <circle cx="45" cy="135" r="14" fill={tealLight} opacity=".6" />
          <path d="M105 125 Q135 100 165 135 Q135 160 105 145 Z" stroke={cream} strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      {/* 下部色块 - 米色 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '36%',
        background: cream,
      }} />

      {/* 主标题区 - 在深青色主图区域内偏下，使用白色字 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, top: '40%',
        color: '#FFFFFF',
      }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: '#FFFFFF', marginBottom: 14, fontWeight: 700,
          textShadow: '0 2px 8px rgba(0,0,0,.4)',
        }}>
          AI-DRIVEN COMMERCIAL OPERATION · CASE BOOK
        </div>
        <h1 className="book-title" style={{
          fontSize: 82, lineHeight: 1, color: '#FFFFFF', fontWeight: 900,
          textShadow: '0 4px 20px rgba(0,0,0,.55)',
        }}>
          庙街小巷
        </h1>
      </div>

      {/* 副标 "以 AI 驱动的烟火菜市场" - 跨越绿/白边界, 字本身上半白下半深 */}
      {/* 页高 960px, 绿色底到 64% = 614.4px, 字号 44, 行高 1, 字高约 44 */}
      {/* 让字垂直中心刚好压在 614.4px 上: top = 614.4 - 22 ≈ 592 */}
      <div style={{
        position: 'absolute', left: 40, right: 40,
        top: '592px',
        height: '44px',
        lineHeight: '44px',
      }}>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontSize: 44, fontWeight: 700,
          letterSpacing: '.04em', lineHeight: '44px',
          background: `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 50.5%, ${tealDeep} 50.5%, ${tealDeep} 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          display: 'inline-block',
        }}>
          以 AI 驱动的烟火菜市场
        </div>
      </div>

      {/* 装饰线 + 副文 - 米色区 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, top: '72%',
      }}>
        <div style={{ width: 60, height: 3, background: teal, margin: '0 0 16px' }} />
        <div style={{
          fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
          color: 'var(--smoke)', maxWidth: 460, fontStyle: 'italic',
        }}>
          一本写给煤老板与政府的城市运营白皮书 ——
          关于如何用 Agent 赋能商户的 IP、运营与管理，
          让烟火气在数字时代生长成新的流量。
        </div>
      </div>

      {/* 底部信息区 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, bottom: 36,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em',
            color: 'var(--smoke-2)', marginBottom: 6,
          }}>项目地</div>
          <div style={{
            fontFamily: 'var(--serif-zh)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5,
          }}>
            海口 · 海甸溪北岸<br />
            <span style={{ fontSize: 10.5, color: 'var(--smoke-2)' }}>HAIDIAN RIVER · HAIKOU</span>
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--serif-en)', fontSize: 56, fontWeight: 300,
          color: tealDeep, lineHeight: 1,
        }}>
          01
        </div>
      </div>

      {/* 图章 */}
      <div style={{
        position: 'absolute', right: 28, top: 110,
        width: 56, height: 56, border: `1.5px solid ${tealLight}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', transform: 'rotate(6deg)',
        fontFamily: 'var(--serif-zh)', color: tealLight,
        background: 'rgba(10,46,46,.4)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700 }}>机密</div>
        <div style={{ fontSize: 7, letterSpacing: '.2em', marginTop: 2 }}>CONFIDENTIAL</div>
      </div>
    </div>
  );
}

/* ========== 1. 封面 - 青色版 B：浅青底 + 全幅排版 ========== */
function CoverPageCyanB() {
  const tealMid = '#3E8C8C';
  const tealDeep = '#1F4F4F';
  const tealPale = '#D7E8E5';
  const tealAccent = '#C46F3D'; // 暖橙作为对比强调
  return (
    <div className="page" data-screen-label="01 封面 B" style={{ padding: 0, background: tealPale }}>
      {/* 顶部细线条 + 序号 */}
      <div style={{
        position: 'absolute', top: 28, left: 40, right: 40,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--sans-en)', fontSize: 10, letterSpacing: '.32em',
        color: tealDeep, textTransform: 'uppercase', fontWeight: 700,
      }}>
        <span>TOPV · 海甸 SERIES  /  VOL. 01</span>
        <span style={{ color: tealAccent }}>2026</span>
      </div>
      <div style={{
        position: 'absolute', top: 56, left: 40, right: 40, height: 1,
        background: tealDeep, opacity: .35,
      }} />

      {/* 中部大字 - 全幅版面 */}
      <div style={{ position: 'absolute', left: 40, right: 40, top: 80 }}>
        <div style={{
          fontFamily: 'var(--sans-zh)', fontSize: 11, letterSpacing: '.4em',
          color: tealMid, fontWeight: 600, marginBottom: 18,
        }}>
          商 · 业 · 技 · 术 · 书
        </div>
        <h1 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 900,
          fontSize: 116, lineHeight: .95, color: tealDeep,
          margin: 0, letterSpacing: '.02em',
        }}>
          庙街<br />小巷
        </h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 14 }}>
          <div style={{ width: 48, height: 3, background: tealAccent }} />
          <div style={{
            fontFamily: 'var(--serif-zh)', fontSize: 22, fontWeight: 500,
            color: tealDeep, letterSpacing: '.04em',
          }}>
            以 AI 驱动的烟火菜市场
          </div>
        </div>
      </div>

      {/* 中部插画块 - 抽象 SVG */}
      <div style={{
        position: 'absolute', left: 40, right: 40, top: 510, height: 230,
        background: tealMid, overflow: 'hidden',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 600 230" preserveAspectRatio="xMidYMid slice">
          {/* 海岸线 / 屋脊 */}
          <path d="M0 180 L80 140 L160 170 L240 130 L320 165 L400 125 L480 160 L560 130 L600 150 L600 230 L0 230 Z"
            fill={tealDeep} opacity=".65" />
          <path d="M0 200 L100 170 L200 195 L300 165 L400 195 L500 170 L600 190 L600 230 L0 230 Z"
            fill={tealDeep} opacity=".85" />
          {/* 太阳 / 月 */}
          <circle cx="470" cy="80" r="38" fill={tealAccent} opacity=".75" />
          {/* 摊位灯 */}
          {[80, 160, 240, 320, 400].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="120" x2={x} y2="160" stroke={tealPale} strokeWidth="1" opacity=".7" />
              <circle cx={x} cy="120" r="4" fill={tealPale} opacity=".9" />
            </g>
          ))}
          {/* 网点纹理 */}
          <defs>
            <pattern id="dotsB" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r=".7" fill={tealPale} opacity=".22" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="600" height="230" fill="url(#dotsB)" />
        </svg>
        <div style={{
          position: 'absolute', bottom: 12, left: 14,
          fontFamily: 'var(--sans-en)', fontSize: 9, letterSpacing: '.28em',
          color: 'rgba(215,232,229,.85)',
        }}>
          HAIDIAN RIVER · NORTH BANK
        </div>
      </div>

      {/* 副标 + 底部信息 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, bottom: 100,
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--sans-en)', fontSize: 10, letterSpacing: '.32em',
            color: tealAccent, marginBottom: 8, fontWeight: 700,
          }}>
            AI-DRIVEN COMMERCIAL OPERATION · CASE BOOK
          </div>
          <p style={{
            fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.75,
            color: tealDeep, margin: 0, fontStyle: 'italic',
          }}>
            一本写给煤老板与政府的城市运营白皮书——<br />
            关于如何用 Agent 赋能商户的 IP、运营与管理。
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em',
            color: tealMid, marginBottom: 6,
          }}>项目地</div>
          <div style={{
            fontFamily: 'var(--serif-zh)', fontSize: 13, color: tealDeep, lineHeight: 1.5, fontWeight: 600,
          }}>
            海口 · 海甸溪北岸
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, bottom: 36,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 10, letterSpacing: '.32em',
          color: tealMid, fontWeight: 600,
        }}>
          内部讨论稿  ·  机密  ·  CONFIDENTIAL
        </div>
        <div style={{
          fontFamily: 'var(--serif-en)', fontSize: 64, fontWeight: 200,
          color: tealAccent, lineHeight: 1,
        }}>
          01
        </div>
      </div>
    </div>
  );
}

/* 总封面：可切换 A/B 两种青色风格 */
function CoverPage({ variant = 'A' }) {
  return variant === 'B' ? <CoverPageCyanB /> : <CoverPageCyanA />;
}

/* 旧封面（保留以备回退，未挂载） */
function CoverPageLegacy() {
  return (
    <div className="page" data-screen-label="01 封面" style={{ padding: 0, background: '#FAF4E6' }}>
      {/* 摄影主图 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '62%',
        ...photoStyles.street,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.2) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .5,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 70%, #FAF4E6 100%)',
        }} />
        {/* 顶部出版社条 */}
        <div style={{
          position: 'absolute', top: 28, left: 40, right: 40,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--sans-en)', fontSize: 10, letterSpacing: '.32em',
          color: 'var(--ink)', textTransform: 'uppercase',
        }}>
          <span style={{ fontWeight: 700 }}>TOPV · 海甸 SERIES</span>
          <span>2026 / VOL. 01</span>
        </div>
        {/* 顶部小标 */}
        <div style={{
          position: 'absolute', top: 70, left: 40,
          fontFamily: 'var(--sans-zh)', fontSize: 11, letterSpacing: '.4em',
          color: 'var(--vermilion)', fontWeight: 600,
        }}>
          商 · 业 · 技 · 术 · 书
        </div>
      </div>

      {/* 下部色块 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%',
        background: '#FAF4E6',
      }} />

      {/* 主标题区 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, top: '46%',
        color: 'var(--ink)',
      }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', marginBottom: 10, fontWeight: 600,
        }}>
          AI-DRIVEN COMMERCIAL OPERATION · CASE BOOK
        </div>
        <h1 className="book-title" style={{
          fontSize: 78, lineHeight: 1, color: 'var(--ink)',
        }}>
          庙街小巷
        </h1>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontSize: 26, fontWeight: 500,
          marginTop: 10, color: 'var(--ink-2)', letterSpacing: '.04em',
        }}>
          以 AI 驱动的烟火菜市场
        </div>
        <div style={{
          width: 60, height: 3, background: 'var(--vermilion)', margin: '20px 0 16px',
        }} />
        <div style={{
          fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
          color: 'var(--smoke)', maxWidth: 460, fontStyle: 'italic',
        }}>
          一本写给煤老板与政府的城市运营白皮书 ——
          关于如何用 Agent 赋能商户的 IP、运营与管理，
          让烟火气在数字时代生长成新的流量。
        </div>
      </div>

      {/* 底部信息区 */}
      <div style={{
        position: 'absolute', left: 40, right: 40, bottom: 36,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        color: 'var(--smoke)',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em',
            color: 'var(--smoke-2)', marginBottom: 6,
          }}>项目地</div>
          <div style={{
            fontFamily: 'var(--serif-zh)', fontSize: 13, color: 'var(--ink)',
            lineHeight: 1.5,
          }}>
            海口 · 海甸溪北岸<br />
            <span style={{ fontSize: 10.5, color: 'var(--smoke-2)' }}>HAIDIAN RIVER · HAIKOU</span>
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--serif-en)', fontSize: 56, fontWeight: 300,
          color: 'var(--ink)', lineHeight: 1,
        }}>
          01
        </div>
      </div>

      {/* 边角图章 */}
      <div style={{
        position: 'absolute', right: 28, top: 110,
        width: 56, height: 56,
        border: '1.5px solid var(--vermilion)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transform: 'rotate(6deg)',
        fontFamily: 'var(--serif-zh)', color: 'var(--vermilion)',
        background: 'rgba(255,255,255,.7)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700 }}>机密</div>
        <div style={{ fontSize: 7, letterSpacing: '.2em', marginTop: 2 }}>CONFIDENTIAL</div>
      </div>
    </div>
  );
}

/* ========== 2. 版权页 ========== */
function CopyrightPage() {
  return (
    <Page label="02 版权页" runhead={{ left: '版权信息', right: 'COLOPHON' }} folio="ii">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow eyebrow-en" style={{ marginBottom: 16 }}>COLOPHON · 版权页</div>
          <h2 style={{ fontFamily: 'var(--serif-zh)', fontWeight: 700, fontSize: 28, margin: 0 }}>
            庙街小巷
          </h2>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 16, color: 'var(--smoke)', marginTop: 6, marginBottom: 24 }}>
            以 AI 驱动的烟火菜市场
          </div>
          <div className="rule" style={{ marginBottom: 28 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 14, columnGap: 16, fontSize: 12 }}>
            {[
              ['出 品', 'TOPV 集团 · 海甸文旅事业部'],
              ['编 著', '运营总负责（化名 · 见 P.13）'],
              ['策划方', '海口海甸溪北岸商业组团 联合工作组'],
              ['版 本', 'V1.0 · 2026 年 4 月  内部讨论稿'],
              ['印 量', '50 册 · 编号 No. ____ / 050'],
              ['用 途', '仅供项目内部、政府汇报与战略合作方阅读'],
              ['关键词', 'AI 全域运营 · Agent 赋能 · 邻里生活 · 自贸港'],
            ].map(([k, v]) => (
              <React.Fragment key={k}>
                <div className="caption" style={{ letterSpacing: '.18em', color: 'var(--smoke-2)' }}>{k}</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, color: 'var(--ink)' }}>{v}</div>
              </React.Fragment>
            ))}
          </div>

          <div className="rule" style={{ margin: '28px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>免责声明</div>
              <p className="body" style={{ fontSize: 12, lineHeight: 1.75 }}>
                本书所列经营预测、估值口径与政策窗口均基于公开资料与团队推演，
                仅作内部讨论与战略沟通用途。涉及具体合作、投资决策时，
                以经法务与财务复核之正式版本为准。
              </p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>保密提示</div>
              <p className="body" style={{ fontSize: 12, lineHeight: 1.75 }}>
                本文件为内部机密资料，未经主导方书面同意，
                请勿复印、转发、节选或对外公开。文件流转请登记编号与去向。
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="rule-thick" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 10, letterSpacing: '.18em', color: 'var(--smoke-2)', fontFamily: 'var(--sans-zh)' }}>
            <span>海南自贸港 · 2026 封关启动年</span>
            <span className="en">ISBN 准印号 / 内 · 2026-04-海口</span>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ========== 3. 目录页 ========== */
function ContentsPage() {
  const items = [
    { p: '01', t: '为什么是现在', s: '三个时代窗口同时打开', n: '008' },
    { p: '02', t: '为什么是这里', s: '海甸溪北岸的不可替代性', n: '022' },
    { p: '03', t: '我们在做什么', s: '三层价值结构与业态地图', n: '034' },
    { p: '04', t: '线上怎么做 — AI 全域运营', s: '从 Agent 到城市级数据资产', n: '052', highlight: true },
    { p: '05', t: '怎么赚钱 — 商业模式', s: '四条收入流与三方利益共同体', n: '086' },
    { p: '06', t: '谁来做 — 团队与分工', s: '天花板 · 发动机 · 地面部队', n: '102' },
    { p: '附 A', t: '为政府而写', s: '夜经济 · 数字样板 · 文化复兴', n: '116' },
    { p: '附 B', t: '市场调研作战手册', s: '招商 SOP 与数据采集表', n: '128' },
  ];
  return (
    <Page label="03 目录" runhead={{ left: '目录', right: 'CONTENTS' }} folio="v">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div className="eyebrow eyebrow-en" style={{ marginBottom: 6 }}>CONTENTS</div>
          <h2 className="chapter-title" style={{ fontSize: 56 }}>目  录</h2>
        </div>
        <div className="caption" style={{ textAlign: 'right', maxWidth: 200 }}>
          全书共 6 章 + 2 附录<br />
          约 132 页 · 含 24 张数据图表 · 9 个案例研究
        </div>
      </div>

      <div className="rule-thick" />

      <div style={{ marginTop: 28 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 60px',
              alignItems: 'baseline',
              padding: '14px 0',
              borderBottom: '1px solid var(--rule)',
              background: it.highlight ? 'rgba(200,53,31,.06)' : 'transparent',
              marginLeft: it.highlight ? -8 : 0,
              paddingLeft: it.highlight ? 8 : 0,
              paddingRight: it.highlight ? 8 : 0,
            }}
          >
            <div style={{
              fontFamily: 'var(--serif-en)', fontSize: 18, fontWeight: 600,
              color: it.highlight ? 'var(--vermilion)' : 'var(--ink)',
              fontFeatureSettings: '"lnum","tnum"',
            }}>{it.p}</div>
            <div>
              <div style={{
                fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700,
                color: it.highlight ? 'var(--vermilion)' : 'var(--ink)',
                marginBottom: 3,
              }}>
                {it.t}
                {it.highlight && (
                  <span style={{
                    marginLeft: 12, fontFamily: 'var(--sans-zh)', fontSize: 9,
                    letterSpacing: '.28em', color: 'var(--vermilion)',
                    border: '1px solid var(--vermilion)', padding: '2px 6px',
                    verticalAlign: 'middle',
                  }}>
                    样章 · SAMPLE
                  </span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 11.5, color: 'var(--smoke)' }}>
                {it.s}
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--serif-en)', fontSize: 16, color: 'var(--smoke)',
              textAlign: 'right', fontFeatureSettings: '"lnum","tnum"',
            }}>{it.n}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', gap: 16, fontSize: 10, fontFamily: 'var(--sans-zh)',
        color: 'var(--smoke-2)', letterSpacing: '.06em',
      }}>
        <span>← 阅读建议：先读样章 04，再回看 01–03 的语境铺垫</span>
      </div>
    </Page>
  );
}

/* ========== 4. 致辞 / 序 ========== */
function PrefacePage() {
  return (
    <Page label="04 致辞" runhead={{ left: '前言 · 致读者', right: 'PREFACE' }} folio="vii">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="eyebrow eyebrow-en" style={{ marginBottom: 8 }}>PREFACE · 写在前面</div>
        <h2 className="chapter-title" style={{ fontSize: 36, marginBottom: 20 }}>
          这本书写给两类人。
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div style={{ borderTop: '3px solid var(--ink)', paddingTop: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>第一类  ·  煤老板</div>
            <p className="body" style={{ fontSize: 13 }}>
              手里有钱、有地、有资源，看到了海南自贸港的窗口，
              但搞不清楚 "AI 怎么赚钱"。我们用 <b>账</b> 和 <b>场景</b> 说话——
              一个海鲜摊用 Agent 之后，每月多赚多少；
              一杯定制汽水，从制作到打卡，AI 介入了哪几步。
            </p>
          </div>
          <div style={{ borderTop: '3px solid var(--vermilion)', paddingTop: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>第二类  ·  政府</div>
            <p className="body" style={{ fontSize: 13 }}>
              要政绩、要数据、要可复制的样板。我们用 <b>政策语言</b> 说话——
              数据本地留存、自贸港数字消费示范区、夜经济标杆、
              非遗活态传承。每一项都对应到自贸港封关后的具体抓手。
            </p>
          </div>
        </div>

        <div className="rule" style={{ marginBottom: 20 }} />

        <p className="body" style={{ fontSize: 14 }}>
          所以您看到的这本书，不是 PPT 改的电子稿，也不是写给互联网行业的白皮书。
          它是一本<b>商业技术书</b>——把"AI 全域运营""Agent 赋能商户"
          这种听上去很玄的事，翻译成可以拿去拍板、可以拿去汇报、
          可以让街上摊主点头说"这个我懂"的语言。
        </p>

        <blockquote className="pull" style={{ margin: '24px 0', fontSize: 18 }}>
          不是流量逻辑，是人文逻辑。<br />
          不是把摊主变成网红，是让 Agent 成为每个摊主<span style={{ color: 'var(--vermilion)', fontStyle: 'normal', fontWeight: 700 }}>看不见的店小二</span>。
        </blockquote>

        <p className="body" style={{ fontSize: 14 }}>
          全书六章，循环的逻辑很简单：<b>时代窗口 → 选址逻辑 → 业态结构 → AI 怎么落地（最重要）→ 怎么赚钱 → 谁来执行。</b>
          您可以从头读，也可以直接翻到第四章——那是这本书最厚的部分，
          也是这件事真正区别于其他文旅项目的地方。
        </p>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, color: 'var(--ink)' }}>
              庙街小巷项目组
            </div>
            <div className="caption" style={{ marginTop: 4 }}>
              海口 · 海甸溪北岸 · 二〇二六年四月
            </div>
          </div>
          <div style={{
            width: 56, height: 56, background: 'var(--vermilion)',
            color: 'var(--paper)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontFamily: 'var(--serif-zh)',
            fontSize: 22, fontWeight: 700, letterSpacing: '.04em',
          }}>
            庙街
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ========== 5. 章节扉页（第四章） ========== */
function ChapterOpenerPage() {
  return (
    <div className="page" data-screen-label="05 章节扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      {/* 摄影背景 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: '40%',
        ...photoStyles.market,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(120,80,40,.15) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.6) 80%, #FAF4E6 100%)',
        }} />
      </div>

      <div className="runhead">
        <span>第四章 · CHAPTER 04</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />AI 全域运营
        </span>
      </div>

      {/* 大章节号 */}
      <div style={{
        position: 'absolute', right: 40, top: 90,
        fontFamily: 'var(--serif-en)', fontSize: 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.12)', letterSpacing: '-.04em',
      }}>
        04
      </div>

      {/* 标题区 */}
      <div style={{ position: 'absolute', left: 40, right: 40, bottom: 110 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · IV
          <span className="tick" style={{ background: 'var(--vermilion)' }} />
          AI-DRIVEN OPERATION
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 56,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>
          线上怎么做<br />
          <span style={{ color: 'var(--vermilion)' }}>—— AI 全域运营</span>
        </h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 18,
          color: 'var(--smoke)', marginTop: 16, lineHeight: 1.6, maxWidth: 480,
        }}>
          从零到一搭建"庙街小巷"数字资产体系，<br />
          用 Agent 把每一个摊主的烟火气，<br />
          翻译成可沉淀、可复利、可出圈的城市流量。
        </div>
      </div>

      {/* 底部数字栏 */}
      <div style={{
        position: 'absolute', bottom: 36, left: 40, right: 40,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid var(--rule)',
        paddingTop: 14, gap: 16,
      }}>
        {[
          { v: '5', l: '运营模块' },
          { v: '10+', l: 'AI 工具矩阵' },
          { v: '3', l: '推进阶段' },
          { v: '1/5', l: '运营成本压缩到' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: 'var(--serif-en)', fontSize: 32, fontWeight: 600,
              color: 'var(--vermilion)', lineHeight: 1, fontFeatureSettings: '"lnum"',
            }}>{s.v}</div>
            <div style={{
              fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)',
              marginTop: 4, letterSpacing: '.06em',
            }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio" style={{ color: 'var(--ink)' }}>052</span>
      </div>
    </div>
  );
}

/* ========== 6. 章节正文 P1 — 核心命题 + 大图 ========== */
function ChapterBody1() {
  return (
    <Page
      label="06 正文-命题"
      runhead={{ left: '04 · 线上怎么做', right: '4.1  核心命题' }}
      folio="054"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 32, height: '100%' }}>
        {/* 左：文本 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="chapter-tag" style={{ marginBottom: 12 }}>
            <span>§</span><span className="num-big">4.1</span><span>核心命题</span>
          </div>
          <h3 className="section-title" style={{ fontSize: 30, marginBottom: 10, lineHeight: 1.2 }}>
            把每一个摊主，<br />
            变成一个会自己<span style={{ color: 'var(--vermilion)' }}>长流量</span>的 IP。
          </h3>
          <div className="rule" style={{ margin: '14px 0 18px' }} />

          <p className="body">
            这件事的难点从来不在线下。线下我们已经做了二十年——
            选址、招商、运营，海口的人脉是现成的，资金是到位的，
            街区设计师团队是国内一线的。
          </p>
          <p className="body">
            真正的难点是：当摊主已经把咖啡冲好、把鱼切好、把汽水灌好之后，
            那条<b>从一杯咖啡到十万浏览量</b>之间的路，
            过去是花钱买流量，今天是
            <span style={{ background: 'rgba(200,53,31,.12)', padding: '0 4px', color: 'var(--vermilion)', fontWeight: 700 }}>
              用 Agent 把它跑通
            </span>。
          </p>

          <blockquote className="pull" style={{ margin: '18px 0' }}>
            没有 AI 全域运营，庙街小巷只是<br />
            "一个好看的街区"；<br />
            有了它，庙街小巷是<br />
            一个会自己长流量的<b>城市 IP</b>。
          </blockquote>

          <div style={{ marginTop: 'auto' }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>本章你将看到</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.85, color: 'var(--smoke)' }}>
              <li>4.2  Agent 赋能商户的三层结构（IP / 运营 / 管理）</li>
              <li>4.3  五大运营模块  ×  AI 工具矩阵</li>
              <li>4.4  三阶段推进路线图  ·  D-30 / D-120 / D-150+</li>
              <li>4.5  落地案例  ·  海鲜阿伯的 90 天</li>
              <li>4.6  数据闭环  ·  从摊位到城市</li>
            </ul>
          </div>
        </div>

        {/* 右：大图 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PhotoFrame
            style={photoStyles.market}
            label="HAIDIAN · NIGHT MARKET"
            captionNo="图 4.1"
            captionText="海甸溪北岸夜市原貌  ·  这是 AI 全域运营的真实素材源——每一锅汤、每一笼蒸气、每一句吆喝，都是可以喂给 Agent 的内容。"
            height="62%"
          />
          {/* 三个小数字 */}
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { v: '5万亿+', l: '中国生鲜零售年规模' },
              { v: '<5%', l: '数字化渗透率' },
              { v: '4.6万', l: '全国农贸市场' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--paper-2)', padding: '12px 12px 14px',
                borderTop: '2px solid var(--ink)',
              }}>
                <div className="num" style={{ fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
                <div className="caption" style={{ marginTop: 6, fontSize: 10.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="caption" style={{ marginTop: 8, fontSize: 10, fontStyle: 'italic' }}>
            数据来源：商务部《农产品流通数字化报告》2025
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ========== 7. 章节正文 P2 — Agent 三层结构 L1 ========== */
function ChapterBody2() {
  return (
    <Page
      label="07 正文-L1"
      runhead={{ left: '04 · 线上怎么做', right: '4.2  Agent 三层结构' }}
      folio="058"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">4.2</span><span>Agent 赋能商户的三层结构</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 26, marginBottom: 6 }}>
        Agent 不是一个聊天机器人。<br />
        是商户身后那个<span style={{ color: 'var(--vermilion)' }}>看不见的店小二</span>。
      </h3>
      <p className="body" style={{ marginBottom: 20, color: 'var(--smoke)', fontSize: 13 }}>
        我们把 AI 对商户的赋能拆成三层，从最浅的"包装故事"到最深的"驱动决策"。
        三层不是孤立的——L1 产出的故事素材，喂给 L2 的内容工厂，L2 沉淀的交易数据，喂给 L3 的管理大脑。形成一个<b>闭环</b>。
      </p>

      {/* L1 详细展开 */}
      <div style={{
        border: '2px solid var(--ink)',
        background: 'var(--paper)',
        padding: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div className="num" style={{ fontSize: 54, color: 'var(--vermilion)', fontWeight: 700, lineHeight: 1 }}>
            L1
          </div>
          <div className="caption" style={{ fontSize: 11, letterSpacing: '.24em', color: 'var(--smoke)' }}>
            IP LAYER · Story Agent
          </div>
        </div>
        
        <h3 style={{ fontFamily: 'var(--serif-zh)', fontSize: 28, fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.3, color: 'var(--ink)' }}>
          IP 层  ·  让摊主成为故事主角
        </h3>
        
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 15, lineHeight: 1.8, color: 'var(--smoke)', margin: '0 0 24px 0' }}>
          不是把摊主包装成网红。Agent 帮他梳理"为什么我做这个、做了多久、最骄傲的一锅汤是哪一锅"——<b>故事是真的，叙事是 AI 写的</b>。
        </p>
        
        <div className="rule" style={{ margin: '16px 0 20px' }} />
        
        <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 12, letterSpacing: '.2em', fontSize: 10 }}>
          典型动作
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>人物速写：</b>3 分钟语音访谈 → 3 篇人物故事文案
          </li>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>视觉风格库：</b>摊位实景 → 抖音 / 小红书 / 视频号 三套封面
          </li>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>声音 IP：</b>海口话方言留存，AI 翻译成普通话字幕
          </li>
        </ul>

        <div className="rule" style={{ margin: '20px 0 16px' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', letterSpacing: '.2em', fontSize: 10 }}>
            工具矩阵
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Claude', 'Midjourney', '即梦'].map((tool, i) => (
              <span key={i} style={{
                fontFamily: 'var(--sans-en)',
                fontSize: 10,
                padding: '4px 10px',
                background: 'var(--ash)',
                color: 'var(--ink)',
                fontWeight: 600,
                letterSpacing: '.08em',
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ========== 7a. 章节正文 P2a — Agent 三层结构 L2 ========== */
function ChapterBody2a() {
  return (
    <Page
      label="07a 正文-L2"
      runhead={{ left: '04 · 线上怎么做', right: '4.2  Agent 三层结构' }}
      folio="059"
    >
      {/* L2 详细展开 */}
      <div style={{
        border: '2px solid var(--ink)',
        background: 'var(--paper)',
        padding: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div className="num" style={{ fontSize: 54, color: 'var(--vermilion)', fontWeight: 700, lineHeight: 1 }}>
            L2
          </div>
          <div className="caption" style={{ fontSize: 11, letterSpacing: '.24em', color: 'var(--smoke)' }}>
            OPERATION LAYER · Content & Commerce Agent
          </div>
        </div>
        
        <h3 style={{ fontFamily: 'var(--serif-zh)', fontSize: 28, fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.3, color: 'var(--ink)' }}>
          运营层  ·  内容与交易自动跑
        </h3>
        
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 15, lineHeight: 1.8, color: 'var(--smoke)', margin: '0 0 24px 0' }}>
          日更短视频、直播脚本、私域 SOP、看着买视频议价——这些过去需要 5 人团队的事，<b>AI 工作流一次走完，摊主只需要按一下"发"</b>。
        </p>
        
        <div className="rule" style={{ margin: '16px 0 20px' }} />
        
        <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 12, letterSpacing: '.2em', fontSize: 10 }}>
          典型动作
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>日更工厂：</b>1 段实拍素材 → 抖音 / 小红书 / 视频号 9 条衍生
          </li>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>私域机器人：</b>扫码进群 → 7 日复购提醒 → 老客唤醒
          </li>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>看着买：</b>1 对 1 视频议价 + AI 称重 + 区块链存证
          </li>
        </ul>

        <div className="rule" style={{ margin: '20px 0 16px' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', letterSpacing: '.2em', fontSize: 10 }}>
            工具矩阵
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Codex', 'Cloud Code', 'Dify', 'Sora / 可灵'].map((tool, i) => (
              <span key={i} style={{
                fontFamily: 'var(--sans-en)',
                fontSize: 10,
                padding: '4px 10px',
                background: 'var(--ash)',
                color: 'var(--ink)',
                fontWeight: 600,
                letterSpacing: '.08em',
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 闭环流程图 */}
      <div style={{ marginTop: 28, padding: '20px 24px', background: 'var(--ash)' }}>
        <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 14, letterSpacing: '.2em', fontSize: 10 }}>
          L1 → L2 数据流
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--serif-zh)', fontSize: 13 }}>
          <span style={{ background: 'var(--paper)', padding: '6px 12px', color: 'var(--ink)' }}>L1 故事素材</span>
          <span style={{ color: 'var(--vermilion)', fontSize: 18 }}>→</span>
          <span style={{ background: 'var(--vermilion)', padding: '6px 12px', color: 'var(--paper)', fontWeight: 600 }}>L2 内容工厂自动加工</span>
          <span style={{ color: 'var(--vermilion)', fontSize: 18 }}>→</span>
          <span style={{ background: 'var(--paper)', padding: '6px 12px', color: 'var(--ink)' }}>9 条平台分发</span>
        </div>
      </div>
    </Page>
  );
}

/* ========== 7b. 章节正文 P2b — Agent 三层结构 L3 ========== */
function ChapterBody2b() {
  return (
    <Page
      label="07b 正文-L3"
      runhead={{ left: '04 · 线上怎么做', right: '4.2  Agent 三层结构' }}
      folio="060"
    >
      {/* L3 详细展开 */}
      <div style={{
        border: '2px solid var(--ink)',
        background: 'var(--paper)',
        padding: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div className="num" style={{ fontSize: 54, color: 'var(--vermilion)', fontWeight: 700, lineHeight: 1 }}>
            L3
          </div>
          <div className="caption" style={{ fontSize: 11, letterSpacing: '.24em', color: 'var(--smoke)' }}>
            MANAGEMENT LAYER · Insight Agent
          </div>
        </div>
        
        <h3 style={{ fontFamily: 'var(--serif-zh)', fontSize: 28, fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.3, color: 'var(--ink)' }}>
          管理层  ·  让数据说话
        </h3>
        
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 15, lineHeight: 1.8, color: 'var(--smoke)', margin: '0 0 24px 0' }}>
          哪个摊位该换位置、哪个品类要加强、哪条街动线有问题——<b>不靠拍脑袋，靠 Agent 跑出的城市消费热力图</b>。这是给商户看的，也是给政府交的。
        </p>
        
        <div className="rule" style={{ margin: '16px 0 20px' }} />
        
        <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 12, letterSpacing: '.2em', fontSize: 10 }}>
          典型动作
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>人流热力：</b>摄像头 + AI 视觉 → 30 分钟级动线优化
          </li>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>品类雷达：</b>交易数据 → 周报"该上什么、该下什么"
          </li>
          <li style={{
            fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--ink)', paddingLeft: 20, position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 10,
              width: 8, height: 8, background: 'var(--vermilion)',
            }} />
            <b>政府交付：</b>本地留存的城市消费大数据地图
          </li>
        </ul>

        <div className="rule" style={{ margin: '20px 0 16px' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="caption" style={{ fontWeight: 700, color: 'var(--ink)', letterSpacing: '.2em', fontSize: 10 }}>
            工具矩阵
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['数据大模型', '区块链存证', 'PowerBI'].map((tool, i) => (
              <span key={i} style={{
                fontFamily: 'var(--sans-zh)',
                fontSize: 10,
                padding: '4px 10px',
                background: 'var(--ash)',
                color: 'var(--ink)',
                fontWeight: 600,
                letterSpacing: '.08em',
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 完整闭环 */}
      <div style={{ marginTop: 28, padding: '22px 24px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="caption" style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: 14, letterSpacing: '.24em', fontSize: 11 }}>
          三层闭环  ·  CLOSED LOOP
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--serif-zh)', fontSize: 13.5, lineHeight: 1.6 }}>
          <span>L1 故事素材</span>
          <span style={{ color: 'var(--vermilion)' }}>→</span>
          <span>L2 内容工厂</span>
          <span style={{ color: 'var(--vermilion)' }}>→</span>
          <span>L2 交易数据</span>
          <span style={{ color: 'var(--vermilion)' }}>→</span>
          <span style={{ fontWeight: 600 }}>L3 管理大脑</span>
          <span style={{ color: 'var(--vermilion)' }}>→</span>
          <span style={{ color: 'var(--gold)' }}>反哺 L1 & L2（优化策略）</span>
        </div>
      </div>
    </Page>
  );
}

/* ========== 8. 章节正文 P3 — 五模块 + 工具矩阵 ========== */
function ChapterBody3() {
  const modules = [
    { icon: '🗺', name: '地方文化 IP 孵化', en: 'Cultural IP', detail: '"庙街小巷"主账号 · VI 视觉 · 内容调性' },
    { icon: '📱', name: '全域内容矩阵', en: 'Content Matrix', detail: '抖音爆款 · 小红书种草 · 视频号沉粉 · 微信锁客' },
    { icon: '🤖', name: 'AI 工具深度应用', en: 'AI Toolchain', detail: '代码开发 · 内容生成 · 数据洞察 · 客服自动化' },
    { icon: '🏪', name: '商家 IP 孵化', en: 'Merchant IP', detail: '每个摊主一套故事  ·  每家店一个 IP' },
    { icon: '📊', name: '数据驱动闭环', en: 'Data Loop', detail: '行为数据反哺业态  ·  数据资产交付政府' },
  ];

  const tools = [
    { n: 'Claude',           u: '文案策划战略' },
    { n: 'Codex',            u: '网站 / 小程序开发' },
    { n: 'Cloud Code',       u: '后端系统搭建' },
    { n: 'Kling / Sora',     u: '视频内容生成' },
    { n: 'Midjourney',       u: '视觉设计素材' },
    { n: 'Dify',             u: 'AI 客服工作流' },
    { n: '即梦 / 可灵',       u: '本土化短视频' },
    { n: '数据大模型',       u: '运营决策分析' },
  ];

  return (
    <Page
      label="08 正文-模块"
      runhead={{ left: '04 · 线上怎么做', right: '4.3  五大模块 × AI 武器库' }}
      folio="064"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">4.3</span><span>五大运营模块  ×  AI 工具矩阵</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        五个齿轮，一台引擎。
      </h3>

      {/* 五大模块 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
        {modules.map((m, i) => (
          <div key={i} style={{
            background: 'var(--ink)', color: 'var(--paper)',
            padding: '14px 12px', minHeight: 130,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontFamily: 'var(--sans-en)', fontSize: 8.5, letterSpacing: '.2em', color: 'var(--gold)', marginBottom: 4 }}>
              {m.en.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, fontWeight: 700, marginBottom: 6, lineHeight: 1.35 }}>
              {m.name}
            </div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.55, color: '#C8BFA9' }}>
              {m.detail}
            </div>
          </div>
        ))}
      </div>

      {/* 工具矩阵 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 8 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>AI 工具矩阵 · 核心武器库</div>
          <div className="rule-thick" style={{ marginBottom: 12 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
            {tools.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
                paddingBottom: 8, borderBottom: '1px dotted var(--rule)',
              }}>
                <div className="num" style={{ fontSize: 12, color: 'var(--vermilion)', fontWeight: 600, minWidth: 18 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--sans-en)', fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>
                    {t.n}
                  </div>
                  <div className="caption" style={{ fontSize: 10 }}>{t.u}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 案例研究框 */}
        <div className="case">
          <div className="case-tag">案例研究  ·  CASE 4.3</div>
          <h5>从 1 段素材到 9 条爆款<br />— 海鲜阿伯老陈的一天</h5>
          <div className="rule" />
          <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', rowGap: 8, fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.5 }}>
            {[
              ['07:00', '老陈赶海回来。手机架支起来，1 分钟实拍：一桶活蹦的虾。'],
              ['07:30', 'Agent 把素材切成抖音 3 条 / 小红书 3 条 / 视频号 3 条。'],
              ['08:30', '"看着买"开播。海口大学生扫码下单 12 单 ×  ¥ 38。'],
              ['12:00', '私域机器人推送中午"虾粥工坊"联名福利。3 单转线下。'],
              ['18:00', 'L3 看板提醒：今天虾的复购热度 ↑ 28%，建议明天加量。'],
              ['22:00', '老陈睡前看后台：粉丝 +143  ·  GMV ¥ 2,176  ·  AI 没收钱。'],
            ].map(([t, c]) => (
              <React.Fragment key={t}>
                <div className="num" style={{ fontSize: 11, color: 'var(--vermilion)', fontWeight: 700 }}>{t}</div>
                <div>{c}</div>
              </React.Fragment>
            ))}
          </div>
          <div className="rule" />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--sans-zh)', color: 'var(--smoke)' }}>
            <span>案例编号  ·  TPV-MS-04-03</span>
            <span style={{ color: 'var(--vermilion)', fontWeight: 700 }}>· 真实推演 ·</span>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ========== 9. 章节正文 P4 — 三阶段推进路线图 ========== */
function ChapterBody4() {
  const phases = [
    {
      tag: 'D-01 → D-30',
      name: '第一阶段  ·  地基建设',
      en: 'PHASE 1 · FOUNDATION',
      tasks: [
        '深度调研海南风土人情与游客动线',
        '厘清政府关系与战略意图',
        '搭建官方 IP 账号矩阵（抖音 / 小红书 / 视频号 / 公众号）',
        '网站 + 小程序 + 收银系统对接',
        '摄像头 / 网络 / 数字基础设施规划',
      ],
      output: 'IP 视觉体系 · 4 个官方账号上线 · 基础设施图纸',
    },
    {
      tag: 'D-31 → D-120',
      name: '第二阶段  ·  内容引爆',
      en: 'PHASE 2 · IGNITION',
      tasks: [
        '短视频日更（抖音 / 小红书 / 视频号）',
        '商家 IP 孵化：每个摊位一套故事',
        '私域社群搭建，游客→回头客',
        'AI 辅助内容批量生产，降本提效',
        '直播矩阵常态化运营',
      ],
      output: '日更 9 条 · 头部 IP 5 个破圈 · 私域 ≥ 1 万人',
    },
    {
      tag: 'D-121 →',
      name: '第三阶段  ·  流量闭环',
      en: 'PHASE 3 · LOOP',
      tasks: [
        '线上预约 → 线下体验 → 复购转化',
        '数据回路：用数据优化线下业态',
        '对接政务平台，政府背书引流',
        '沉淀可输出的运营 SOP（向三亚 / 儋州 / 文昌复制）',
      ],
      output: '可复制 SOP · 政府数据交付 · GMV 走出 J 形曲线',
    },
  ];

  return (
    <Page
      label="09 正文-路线"
      runhead={{ left: '04 · 线上怎么做', right: '4.4  三阶段推进路线图' }}
      folio="072"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">4.4</span><span>三阶段推进路线图</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 26, marginBottom: 4 }}>
        150 天，从一张白纸到一台引擎。
      </h3>
      <p className="body" style={{ color: 'var(--smoke)', marginBottom: 16, fontSize: 13 }}>
        这不是一个"边做边看"的项目。三个阶段每段都有明确的产出物——
        如果第一阶段没落地，不会进第二阶段。这是写给煤老板看的纪律线。
      </p>

      {/* 时间轴 */}
      <div style={{ position: 'relative', padding: '8px 0' }}>
        {/* 时间轴主线 */}
        <div style={{
          position: 'absolute', left: 16, top: 16, bottom: 16,
          width: 2, background: 'var(--ink)',
        }} />

        {phases.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 20, position: 'relative' }}>
            {/* 节点圆 */}
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--vermilion)', color: 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif-en)', fontSize: 14, fontWeight: 700,
              flexShrink: 0, zIndex: 1,
              boxShadow: '0 0 0 4px var(--paper)',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <div className="num" style={{ fontSize: 13, color: 'var(--vermilion)', fontWeight: 700, letterSpacing: '.04em' }}>
                  {p.tag}
                </div>
                <div className="caption" style={{ letterSpacing: '.22em', fontSize: 9 }}>{p.en}</div>
              </div>
              <h4 style={{ fontFamily: 'var(--serif-zh)', fontWeight: 700, fontSize: 18, margin: '0 0 8px 0' }}>
                {p.name}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
                <ul style={{ margin: 0, paddingLeft: 14, fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.75, color: 'var(--ink)' }}>
                  {p.tasks.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
                <div style={{
                  background: 'var(--paper-2)', padding: 10,
                  borderLeft: '3px solid var(--ink)',
                }}>
                  <div className="caption" style={{ fontSize: 9, letterSpacing: '.24em', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                    阶段产出
                  </div>
                  <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.6 }}>
                    {p.output}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部金句 */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
        marginTop: 8,
      }}>
        <div style={{
          fontFamily: 'var(--serif-en)', fontSize: 38, fontWeight: 300,
          color: 'var(--gold)', lineHeight: 1,
        }}>"</div>
        <p className="body" style={{
          color: 'var(--paper)', margin: 0, fontStyle: 'italic', fontSize: 13.5,
          flex: 1,
        }}>
          没有 SOP 的运营，只是热闹；有 SOP 的运营，才是资产。
          这三个阶段，最后产出的不是粉丝数，是<b style={{ color: 'var(--gold)' }}>一份可以复制到大湾区的说明书</b>。
        </p>
      </div>
    </Page>
  );
}

/* ========== 10. 章节正文 P5 — 政府价值 + 数据交付 ========== */
function ChapterBody5() {
  return (
    <Page
      label="10 正文-政府"
      runhead={{ left: '04 · 线上怎么做', right: '4.6  数据闭环 · 政府价值' }}
      folio="082"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">4.6</span><span>从摊位到城市  ·  数据闭环与政府价值</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 26, marginBottom: 4 }}>
        最值钱的不是流水，是<span style={{ color: 'var(--vermilion)' }}>这张地图</span>。
      </h3>
      <p className="body" style={{ color: 'var(--smoke)', marginBottom: 16, fontSize: 13 }}>
        线下交易产生数据，数据沉淀成资产，资产可以交付——这是给政府的真正大礼。
        中心化平台拿走了过去十年中国城市消费的真实数据，自贸港封关后，这件事可以重做一次。
      </p>

      {/* 数据可视化 */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 22, marginBottom: 16, position: 'relative',
        backgroundImage: `
          linear-gradient(rgba(244,239,230,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(244,239,230,.04) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}>
        <div className="caption" style={{ color: 'var(--gold)', letterSpacing: '.28em', fontSize: 9, marginBottom: 4, fontFamily: 'var(--sans-zh)', fontWeight: 700 }}>
          图 4.6  ·  海甸溪城市消费数据图谱（推演）
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 14 }}>
          {[
            {
              title: '对  商  户',
              v: '+38%',
              l: '平均月营收增量',
              note: '基于"看着买"+ 私域复购 + 内容投放推演',
            },
            {
              title: '对  政  府',
              v: '1 张',
              l: '本地留存的城市消费图',
              note: '可对接智慧城市平台 / 自贸港数据治理',
            },
            {
              title: '对  项  目',
              v: '5×',
              l: '运营效率（vs 传统团队）',
              note: '同等 GMV，团队规模压缩到 1/5',
            },
          ].map((s, i) => (
            <div key={i} style={{ borderTop: '2px solid var(--gold)', paddingTop: 12 }}>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.4em', color: '#C8BFA9', marginBottom: 8 }}>
                {s.title}
              </div>
              <div className="num" style={{ fontSize: 48, color: 'var(--gold)', fontWeight: 600, lineHeight: 1, fontFeatureSettings: '"lnum"' }}>
                {s.v}
              </div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, color: 'var(--paper)', marginTop: 6, fontWeight: 600 }}>
                {s.l}
              </div>
              <div className="caption" style={{ fontSize: 10, color: '#A8B0BD', marginTop: 6 }}>
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 政府三个抓手 */}
      <div className="eyebrow" style={{ marginBottom: 8 }}>给政府的三个抓手</div>
      <div className="rule-thick" style={{ marginBottom: 14 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          {
            n: '01',
            t: '夜经济标杆',
            d: '海甸溪北岸从渔港转型为高品质夜经济目的地，带动周边商圈活力，创造本地就业，拉动 GDP——可量化的政绩数字。',
            tag: '可上汇报',
          },
          {
            n: '02',
            t: '自贸港数字消费示范区',
            d: '2025.12.18 封关启动后，庙街小巷率先落地 AI 智慧消费体系，消费数据本地留存——自贸港数字化转型的具体落地案例。',
            tag: '可写白皮书',
          },
          {
            n: '03',
            t: '在地文化活态传承',
            d: '琼剧、黎歌苗舞、渔港文化、黎锦非遗——通过商业场景活化，让传统文化不再是博物馆展品，而是每天有人消费的生活方式。',
            tag: '可带媒体来',
          },
        ].map((b) => (
          <div key={b.n} style={{ background: 'var(--paper-2)', padding: 14, borderTop: '3px solid var(--vermilion)' }}>
            <div className="num" style={{ fontSize: 24, color: 'var(--vermilion)', fontWeight: 600, lineHeight: 1, marginBottom: 8 }}>
              {b.n}
            </div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
              {b.t}
            </div>
            <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.7, color: 'var(--ink)', margin: 0 }}>
              {b.d}
            </p>
            <div style={{ marginTop: 10 }}>
              <span className="tag solid" style={{ fontSize: 9 }}>{b.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ========== 11. 章末小结 ========== */
function ChapterEndPage() {
  return (
    <Page
      label="11 章末"
      dark
      runhead={{ left: '04 · 线上怎么做', right: '本章小结  ·  CHAPTER 04 RECAP' }}
      folio="084"
    >
      <div className="chapter-tag" style={{ marginBottom: 16, color: '#A8B0BD' }}>
        <span style={{ color: 'var(--gold)' }}>§</span>
        <span className="num-big" style={{ color: 'var(--gold)' }}>4.7</span>
        <span>本章小结</span>
      </div>

      <h3 style={{ fontFamily: 'var(--serif-zh)', fontSize: 38, fontWeight: 700, color: 'var(--paper)', margin: 0, lineHeight: 1.2 }}>
        三句话<br />
        说服煤老板和政府。
      </h3>

      <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          {
            t: '对煤老板',
            v: '同样的钱，AI 把效率翻 5 倍',
            d: '不需要再雇 10 个运营。一个懂 AI 的人，配 10+ 种工具，能完成过去一个 10 人团队的活。省下来的 80% 人力成本，全转成净利润。',
          },
          {
            t: '对政府',
            v: '数据本地留存，就是城市资产',
            d: '过去十年，城市消费数据被中心化平台拿走。自贸港封关后，庙街小巷的 AI 体系第一次让这件事反过来——每一笔交易留在海口，形成可以交付智慧城市平台的真实数据图谱。',
          },
          {
            t: '对自己',
            v: '做的不是项目，是模板',
            d: '海口做成之后，这套"AI 全域运营 + 在地故事招商"的打法，是可以复制到三亚、儋州、文昌、琼海的。海南是起点，长三角是舞台。',
          },
        ].map((b, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 20, paddingBottom: 18, borderBottom: '1px solid var(--rule-d)' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.32em', color: 'var(--vermilion)', fontWeight: 700, marginBottom: 6 }}>
                {b.t.toUpperCase()}
              </div>
              <div className="num" style={{ fontSize: 28, color: 'var(--gold)', fontWeight: 600, lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700, color: 'var(--paper)', marginBottom: 6, lineHeight: 1.4 }}>
                {b.v}
              </div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.75, color: '#C8BFA9', margin: 0 }}>
                {b.d}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 引向下一章 */}
      <div style={{ position: 'absolute', bottom: 88, left: 56, right: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 0', borderTop: '2px solid var(--gold)',
      }}>
        <div>
          <div className="caption" style={{ color: '#A8B0BD', fontSize: 10, letterSpacing: '.28em' }}>
            下一章  ·  NEXT
          </div>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, color: 'var(--paper)', marginTop: 4 }}>
            05  ·  怎么赚钱 — 商业模式与收入结构
          </div>
        </div>
        <div style={{ fontFamily: 'var(--serif-en)', fontSize: 56, fontWeight: 200, color: 'var(--gold)', lineHeight: 1 }}>
          →
        </div>
      </div>
    </Page>
  );
}

/* ========== 12. 封底 ========== */
function BackCoverPage() {
  return (
    <div className="page dark" data-screen-label="12 封底" style={{ padding: 0 }}>
      <div style={{ position: 'absolute', inset: 0, ...photoStyles.river }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .5,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(14,26,43,.85) 0%, rgba(14,26,43,.95) 100%)',
        }} />
      </div>

      <div style={{ position: 'absolute', top: 56, left: 40, right: 40, color: 'var(--paper)' }}>
        <div className="eyebrow eyebrow-en" style={{ color: 'var(--gold)' }}>BACK COVER · 封底寄语</div>
        <div style={{ width: 40, height: 2, background: 'var(--vermilion)', marginTop: 14, marginBottom: 18 }} />
        <p style={{
          fontFamily: 'var(--serif-zh)', fontSize: 19, lineHeight: 1.85,
          color: 'var(--paper)', fontWeight: 400,
        }}>
          每一座城市，<br />
          都有一条街道藏着真正的生活。<br />
          不是最贵的那条，不是最新的那条—— <br />
          是那条让你<span style={{ color: 'var(--gold)' }}>走进去就不想走</span>的，<br />
          让你发完朋友圈还想再去一次的。<br /><br />
          海口，还没有这条街。<br />
          我们来做这件事。
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 40, right: 40 }}>
        <div className="rule-thick" style={{ background: 'var(--gold)' }} />
        <div style={{
          marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          color: 'var(--paper)',
        }}>
          {[
            ['项目地', '海口 · 海甸溪北岸'],
            ['关键时点', '2025.12.18 自贸港封关'],
            ['项目主体', 'TOPV 集团 · 海甸事业部'],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="caption" style={{ color: '#A8B0BD', letterSpacing: '.22em', fontSize: 9, marginBottom: 6 }}>
                {k}
              </div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 36, left: 40, right: 40,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        color: '#A8B0BD',
      }}>
        <div className="caption" style={{ fontSize: 9, letterSpacing: '.32em' }}>
          内部讨论稿  ·  机密  ·  请勿外传
        </div>
        <div style={{
          fontFamily: 'var(--serif-en)', fontSize: 16,
          color: 'var(--paper)', letterSpacing: '.04em',
        }}>
          TOPV  /  HAIDIAN  ·  2026
        </div>
      </div>

      {/* 假条形码 */}
      <div style={{ position: 'absolute', bottom: 36, right: 40 }}>
        <div style={{
          width: 100, height: 36, background: 'var(--paper)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 6px',
        }}>
          <div style={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: '70%' }}>
            {[...'8754321987645321'].map((c, i) => (
              <div key={i} style={{
                width: i % 3 === 0 ? 2 : 1,
                height: '100%',
                background: 'var(--ink)',
              }} />
            ))}
          </div>
        </div>
        <div className="caption" style={{ color: '#A8B0BD', textAlign: 'right', fontSize: 8, marginTop: 4, fontFamily: 'var(--sans-en)' }}>
          内 · 2026-04-海口 · No.____
        </div>
      </div>
    </div>
  );
}

/* ========== 主导航 ========== */
function App() {
  const [page, setPage] = useState(0);
  const pages = [
    { c: <CoverPage />,        label: '封面' },
    { c: <CopyrightPage />,    label: '版权' },
    { c: <ContentsPage />,     label: '目录' },
    { c: <PrefacePage />,      label: '前言' },
    { c: <ChapterOpenerPage />,label: '04 扉页' },
    { c: <ChapterBody1 />,     label: '4.1 命题' },
    { c: <ChapterBody2 />,     label: '4.2 L1' },
    { c: <ChapterBody2a />,    label: '4.2 L2' },
    { c: <ChapterBody2b />,    label: '4.2 L3' },
    { c: <ChapterBody3 />,     label: '4.3 模块' },
    { c: <ChapterBody4 />,     label: '4.4 路线' },
    { c: <ChapterBody5 />,     label: '4.6 政府' },
    { c: <ChapterEndPage />,   label: '4.7 小结' },
    { c: <BackCoverPage />,    label: '封底' },
  ];

  // localStorage persistence
  useEffect(() => {
    const saved = localStorage.getItem('miaojie-book-page');
    if (saved !== null) setPage(parseInt(saved, 10));
  }, []);
  useEffect(() => {
    localStorage.setItem('miaojie-book-page', String(page));
  }, [page]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setPage((p) => Math.min(p + 1, pages.length - 1));
      if (e.key === 'ArrowLeft')  setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pages.length]);

  return (
    <div style={{
      minHeight: '100vh', background: '#1a1a1a',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 20px 120px',
      fontFamily: 'var(--sans-zh)',
    }}>
      {/* 顶部小信息条 */}
      <div style={{
        width: 'min(700px, 92vw)', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 22, color: '#888',
        fontSize: 11, letterSpacing: '.18em',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, background: 'var(--vermilion)', borderRadius: '50%' }} />
          <span>TOPV · HAIDIAN  /  BUSINESS BOOK V1.0</span>
        </div>
        <div className="num">
          {String(page + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
        </div>
      </div>

      {/* 当前页 */}
      <div style={{ position: 'relative' }}>
        {pages[page].c}
      </div>

      {/* 导航条 */}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(14,26,43,.92)', backdropFilter: 'blur(14px)',
        border: '1px solid rgba(244,239,230,.12)',
        padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        color: 'var(--paper)', fontFamily: 'var(--sans-zh)',
        boxShadow: '0 12px 40px rgba(0,0,0,.5)',
        maxWidth: '92vw', overflowX: 'auto',
      }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          style={navBtnStyle(page === 0)}
        >←</button>
        <div style={{ display: 'flex', gap: 4 }}>
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                background: i === page ? 'var(--vermilion)' : 'transparent',
                color: i === page ? 'var(--paper)' : '#C8BFA9',
                border: 'none', cursor: 'pointer',
                padding: '6px 10px', fontFamily: 'var(--sans-zh)',
                fontSize: 11, letterSpacing: '.04em',
                whiteSpace: 'nowrap',
              }}
              title={p.label}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, pages.length - 1))}
          disabled={page === pages.length - 1}
          style={navBtnStyle(page === pages.length - 1)}
        >→</button>
      </div>

      {/* 当前页标签 */}
      <div style={{
        position: 'fixed', top: 18, right: 22,
        fontFamily: 'var(--sans-zh)', fontSize: 11, letterSpacing: '.18em',
        color: '#888',
      }}>
        当前  ·  {pages[page].label}
      </div>
    </div>
  );
}
function navBtnStyle(disabled) {
  return {
    background: 'transparent', color: disabled ? '#555' : 'var(--paper)',
    border: 'none', cursor: disabled ? 'default' : 'pointer',
    padding: '6px 10px', fontSize: 14, fontFamily: 'var(--sans-en)',
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
