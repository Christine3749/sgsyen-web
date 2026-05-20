// 庙街小巷 · 商业技术书 — 第07章 里程碑（横向3页）

/* ---- 本地 Page 壳 ---- */
function Page07({ dark, children, runhead, folio, label }) {
  return (
    <div className={`page${dark ? ' dark' : ''}`} data-screen-label={label}>
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

const warmPhoto07 = {
  backgroundImage: `
    radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
    linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
  `,
};

function DotTex07() {
  return (
    <>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
        backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.42) 100%)',
      }} />
    </>
  );
}

/* ========== 第07章 页1：扉页 ========== */
function Chapter07Opener() {
  return (
    <div className="page" data-screen-label="25 第07章 扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto07 }}>
        <DotTex07 />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第07章 · CHAPTER 07</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />MILESTONE & DEFENSE
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>07</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? 30 : 170 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · 07
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          MILESTONE & DEFENSE
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>里程碑</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>18个月 · 从泥土到护城河<br />最好的战略是能按着秒表验收的执行。</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>18</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>个月执行周期</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>3</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>阶段推进纪律</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>540</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>天验收节点</div>
        </div>
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">25</span>
      </div>
    </div>
  );
}

/* ========== 第07章 页2：三阶段 ========== */
function Chapter07Body1() {
  const phases = [
    { 
      n: '01', 
      period: 'Month 01—06', 
      tag: 'Phase One',
      title: '破土与算力部署',
      items: [
        { label: '线下', text: '物理空间改造竣工，首批 30+ 核心在地合伙人入驻。' },
        { label: '线上', text: '边缘计算节点铺设，AI 视觉与收银硬件进场。' },
      ]
    },
    { 
      n: '02', 
      period: 'Month 07—12', 
      tag: 'Phase Two',
      title: '烟火点燃与模型调优',
      items: [
        { label: '运营', text: '内容日更系统跑通，首批 10 个摊主 IP 破千粉。' },
        { label: '数据', text: '用户行为数据沉淀，AI 推荐系统初代模型上线。' },
      ]
    },
    { 
      n: '03', 
      period: 'Month 13—18', 
      tag: 'Phase Three',
      title: '护城河与扩张准备',
      items: [
        { label: '终局', text: '摊主营收稳步提升，沉淀超 10 万+ 真实私域用户。' },
        { label: '出圈', text: '三亚、琼海模型移植启动，海南 IP 矩阵初现。' },
      ]
    },
  ];

  return (
    <Page07
      label="26 三阶段推进"
      runhead={{ left: '第07章 · 里程碑', right: 'Execution Discipline' }}
      folio="26"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: 'var(--sans-en)',
            fontSize: 9,
            letterSpacing: '.32em',
            color: 'var(--smoke-2)',
            marginBottom: 12,
          }}>18-MONTH EXECUTION TIMELINE</div>
          <h3 style={{ 
            fontFamily: 'var(--serif-zh)', 
            fontWeight: 700, 
            fontSize: 34, 
            margin: 0,
            lineHeight: 1.2,
            borderBottom: '3px solid var(--ink)',
            paddingBottom: 14,
          }}>
            三阶段推进纪律
          </h3>
        </div>

        {/* 三阶段 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {phases.map((p, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: 20,
              paddingBottom: 32,
              borderBottom: i < phases.length - 1 ? '1px solid var(--rule)' : 'none',
            }}>
              {/* 编号 */}
              <div style={{ textAlign: 'right', paddingTop: 3 }}>
                <div style={{
                  fontFamily: 'var(--serif-en)',
                  fontSize: 32,
                  fontWeight: 300,
                  color: 'var(--vermilion)',
                  lineHeight: 1,
                }}>{p.n}</div>
              </div>
              
              {/* 内容 */}
              <div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{
                    fontFamily: 'var(--sans-en)',
                    fontSize: 8.5,
                    letterSpacing: '.26em',
                    color: 'var(--smoke-2)',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                    fontWeight: 600,
                  }}>{p.tag}</div>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '.08em',
                    color: 'var(--smoke)',
                    marginBottom: 10,
                  }}>{p.period}</div>
                  <h4 style={{
                    fontFamily: 'var(--serif-zh)',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {p.title}
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        display: 'inline-block',
                        fontFamily: 'var(--sans-zh)',
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: 'white',
                        backgroundColor: 'var(--vermilion)',
                        padding: '2px 8px',
                        letterSpacing: '.06em',
                        flexShrink: 0,
                      }}>{item.label}</span>
                      <span style={{
                        fontFamily: 'var(--serif-zh)',
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        color: 'var(--smoke)',
                        paddingTop: 1,
                      }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 22, borderTop: '2px solid var(--ink)' }}>
          <p style={{ 
            fontFamily: 'var(--serif-zh)', 
            fontSize: 14, 
            lineHeight: 1.75, 
            margin: 0,
            fontStyle: 'italic',
            color: 'var(--smoke)',
          }}>
            <b style={{ fontWeight: 700, fontStyle: 'normal', color: 'var(--ink)' }}>执行纪律 ≠ 死板流程</b> — 每个节点都留出调整窗口，但核心验收指标不可妥协。
          </p>
        </div>

      </div>
    </Page07>
  );
}

/* ========== 第07章 页3：风控机制 ========== */
function Chapter07Body2() {
  const risks = [
    { n: '01', tag: '资金红线', desc: '每阶段融资到账前，不启动下阶段。现金流预留 3 个月运营成本。' },
    { n: '02', tag: '商户红线', desc: '入驻商户必须通过"在地故事审核" — 不要网红店，要真正扎根的摊主。' },
    { n: '03', tag: '数据红线', desc: '用户数据本地留存，不卖给第三方平台。政府数据交付经脱敏处理。' },
    { n: '04', tag: 'AI 红线', desc: 'Agent 辅助人，不替代人。摊主永远是主角，AI 是看不见的店小二。' },
    { n: '05', tag: '政府红线', desc: '每季度向政府提交运营报告，确保目标可量化验收。' },
  ];

  return (
    <Page07
      label="27 风控机制"
      runhead={{ left: '第07章 · 里程碑', right: 'Risk Defense' }}
      folio="27"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        <div style={{ marginBottom: 36 }}>
          <div style={{
            fontFamily: 'var(--sans-en)',
            fontSize: 9,
            letterSpacing: '.28em',
            color: 'var(--smoke-2)',
            marginBottom: 10,
          }}>DEFENSE SYSTEM</div>
          <h3 style={{ 
            fontFamily: 'var(--serif-zh)', 
            fontWeight: 700, 
            fontSize: 32, 
            margin: 0,
            lineHeight: 1.2,
            borderBottom: '2px solid var(--ink)',
            paddingBottom: 12,
          }}>
            五道红线
          </h3>
        </div>

        {/* 五条红线 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {risks.map((r, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '42px 1fr',
              gap: 18,
              paddingBottom: 24,
              borderBottom: i < risks.length - 1 ? '1px solid var(--rule)' : 'none',
            }}>
              {/* 编号 */}
              <div style={{ textAlign: 'right', paddingTop: 2 }}>
                <div style={{
                  fontFamily: 'var(--serif-en)',
                  fontSize: 28,
                  fontWeight: 300,
                  color: 'var(--vermilion)',
                  lineHeight: 1,
                }}>{r.n}</div>
              </div>
              
              {/* 内容 */}
              <div>
                <h4 style={{
                  fontFamily: 'var(--serif-zh)',
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  margin: '0 0 8px 0',
                  lineHeight: 1.3,
                }}>
                  {r.tag}
                </h4>
                <p style={{
                  fontFamily: 'var(--serif-zh)',
                  fontSize: 13,
                  lineHeight: 1.75,
                  color: 'var(--smoke)',
                  margin: 0,
                }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '2px solid var(--ink)' }}>
          <p style={{ 
            fontFamily: 'var(--serif-zh)', 
            fontSize: 13.5, 
            lineHeight: 1.75, 
            margin: 0,
            fontStyle: 'italic',
            color: 'var(--smoke)',
          }}>
            任何节点出现偏差，立即启动应急预案 — <b style={{ fontWeight: 700, fontStyle: 'normal', color: 'var(--ink)' }}>不是拍脑袋调整，是按秒表验收</b>。
          </p>
        </div>

      </div>
    </Page07>
  );
}

/* ========== 导出组件到全局 ========== */
Object.assign(window, {
  Chapter07Opener,
  Chapter07Body1,
  Chapter07Body2,
});
