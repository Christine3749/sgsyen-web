// 庙街小巷 · 商业技术书 — 第08-12章（重做版 - 匹配第04章密度）

/* ========== 第08章 扉页 ========== */
function Ch8OpenerPage() {
  const warmPhoto = {
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
      linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
    `,
  };

  return (
    <div className="page" data-screen-label="28 第08章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.42) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第08章 · CHAPTER 08</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />FINANCING PATH
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>08</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? 30 : 170 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · 08
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          FINANCING STRATEGY
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>融资路径</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>不找钱，找合伙人——三轮递进，资方变成生态的一部分</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        {[
          { v: '3轮', l: '递进融资' },
          { v: '1.38亿', l: '总融资额' },
          { v: '5亿', l: 'A+轮估值' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">098</span>
      </div>
    </div>
  );
}

/* ========== 第08章 正文1 — 三轮模型详解 ========== */
function Ch8Body1Page() {
  const rounds = [
    {
      round: 'Pre-A',
      time: 'M0-M6',
      amount: '800万',
      valuation: '5000万',
      use: [
        '场地改造与装修 · ¥400万',
        '首批30摊位招商补贴 · ¥200万',
        '基础设施（水电网收银）· ¥100万',
        '3个月启动运营成本 · ¥100万',
      ],
      milestone: '验证线下模型：场地到位、30摊位入驻、日客流≥500人',
      investor: '本地产业资本 / 煤老板',
    },
    {
      round: 'A轮',
      time: 'M6-M12',
      amount: '3000万',
      valuation: '2亿',
      use: [
        'AI全域运营系统开发 · ¥1200万',
        '内容团队组建（20人）· ¥600万',
        '营销推广与品牌建设 · ¥600万',
        '12个月运营成本覆盖 · ¥600万',
      ],
      milestone: '验证AI系统：日更9条内容、3个头部商户IP破圈、私域≥1万人',
      investor: '战略投资方 / AI产业基金',
    },
    {
      round: 'A+轮',
      time: 'M12-M18',
      amount: '5000万',
      valuation: '5亿',
      use: [
        '三亚/琼海复制启动 · ¥2000万',
        '海南IP矩阵内容生产 · ¥1000万',
        '技术平台SaaS化 · ¥1000万',
        '储备金与风险对冲 · ¥1000万',
      ],
      milestone: '验证扩张能力：3城落地、100+商户IP、系统SaaS化输出',
      investor: '头部VC / 政府引导基金',
    },
  ];

  return (
    <Page
      label="29 第08章-正文1"
      runhead={{ left: '08 · 融资路径', right: '8.1  三轮递进模型' }}
      folio="100"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">8.1</span><span>三轮递进融资模型</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        不是一次性烧钱，是分三轮验证假设。
      </h3>

      {/* 三轮详情 */}
      <div style={{ display: 'grid', gap: 14 }}>
        {rounds.map((r, i) => (
          <div key={i} style={{
            border: `2px solid ${i === 1 ? 'var(--vermilion)' : 'var(--ink)'}`,
            background: i === 1 ? 'rgba(184,53,31,.03)' : 'transparent',
          }}>
            {/* 头部 */}
            <div style={{
              background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
              color: i === 1 ? 'var(--paper)' : 'var(--ink)',
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontFamily: 'var(--sans-en)', fontSize: 20, fontWeight: 700 }}>{r.round}</div>
                <div className="caption" style={{ fontSize: 9 }}>{r.time}</div>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <div>
                  <span className="caption" style={{ fontSize: 9, marginRight: 6 }}>融资额</span>
                  <span style={{ fontFamily: 'var(--serif-en)', fontSize: 16, fontWeight: 600 }}>{r.amount}</span>
                </div>
                <div>
                  <span className="caption" style={{ fontSize: 9, marginRight: 6 }}>估值</span>
                  <span style={{ fontFamily: 'var(--serif-en)', fontSize: 16, fontWeight: 600 }}>{r.valuation}</span>
                </div>
              </div>
            </div>

            {/* 主体 */}
            <div style={{ padding: '12px 14px' }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>资金用途</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
                {r.use.map((u, j) => (
                  <li key={j} style={{
                    fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.6,
                    paddingLeft: 12, position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 7,
                      width: 4, height: 4, background: i === 1 ? 'var(--vermilion)' : 'var(--ink)',
                    }} />
                    {u}
                  </li>
                ))}
              </ul>
              <div className="rule" style={{ margin: '10px 0' }} />
              <div className="eyebrow" style={{ marginBottom: 6 }}>验收里程碑</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.65, margin: 0, color: 'var(--smoke)' }}>
                {r.milestone}
              </p>
              <div className="rule" style={{ margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="caption" style={{ fontSize: 9 }}>目标投资方</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>
                  {r.investor}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="case" style={{ marginTop: 16 }}>
        <div className="case-tag">核心原则  ·  PRINCIPLE</div>
        <div className="rule" />
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          <b>每轮融资间隔6个月</b>，留足时间验证上一轮假设。如果Pre-A的线下模型没跑通，就不启动A轮；
          如果A轮的AI系统没跑通，就不启动A+。<b>宁可慢，不可错</b>——
          这不是一个讲故事的PPT项目，是一个真实可验证的民生工程。
        </p>
      </div>
    </Page>
  );
}

/* ========== 第09章 扉页 ========== */
function Ch9OpenerPage() {
  const warmPhoto = {
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
      linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
    `,
  };

  return (
    <div className="page" data-screen-label="31 第09章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.42) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第09章 · CHAPTER 09</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />LIVELIHOOD LEDGER
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>09</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? 30 : 170 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · 09
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          STAKEHOLDER VALUE
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>民生账本</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>三方共赢，利益平衡——政府、企业、居民都有账算</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        {[
          { v: '3方', l: '利益主体' },
          { v: '100%', l: '正和模型' },
          { v: '∞', l: '可持续' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">104</span>
      </div>
    </div>
  );
}

/* ========== 第09章 正文 — 三方利益结构 ========== */
function Ch9BodyPage() {
  const stakeholders = [
    {
      who: '政府',
      color: 'var(--vermilion)',
      gets: [
        '夜经济标杆样板 → 全国复制模式',
        '本地就业岗位（200+直接 + 500+间接）',
        '税收增长（年均1200万+）',
        '数字化民生数据资产',
      ],
      pays: [
        '土地租金优惠（前3年5折）',
        '数字经济专项补贴500万',
        '政策支持与审批绿色通道',
      ],
    },
    {
      who: '企业/资方',
      color: 'var(--gold)',
      gets: [
        '租金收益（年营收2000万）',
        'IP授权与内容输出（年营收5000万）',
        'AI系统SaaS化（年营收1亿+）',
        '品牌溢价与资本退出路径',
      ],
      pays: [
        '启动资金1.38亿（三轮递进）',
        'AI系统开发与持续迭代',
        '内容团队与运营成本',
      ],
    },
    {
      who: '居民/商户',
      color: '#7FB8B0',
      gets: [
        '低成本创业机会（租金≤5000元/月）',
        'AI赋能免费使用（内容/私域/数据）',
        '品牌流量共享（头部IP破圈）',
        '稳定收入增长（月均营收3-8万）',
      ],
      pays: [
        '合理租金与营收抽成（5%）',
        '配合内容拍摄与数据沉淀',
        '共建生态与口碑维护',
      ],
    },
  ];

  const scenarios = [
    {
      title: '场景01 · 商户营收提升',
      flow: '商户收入↑ → 愿付更高租金 → 企业现金流↑ → 政府税收↑',
      mechanism: '租金采用"保底+抽成"（3000元/月 + 5%抽成），商户赚得越多，企业和政府分得越多。',
    },
    {
      title: '场景02 · 政府政策扶持',
      flow: '政府给土地优惠 → 企业成本↓ → 商户租金↓ → 更多商户入驻 → 标杆效应↑',
      mechanism: '政府前期让利（土地租金5折），后期通过税收和城市品牌提升回收。',
    },
    {
      title: '场景03 · AI系统赋能',
      flow: '企业投AI → 商户流量↑ → 营收↑ → 企业抽成↑ → 再投研发 → 闭环',
      mechanism: 'AI系统由企业开发并免费提供，商户营收提升后，企业通过抽成回收投资。',
    },
  ];

  return (
    <Page
      label="32 第09章-正文"
      runhead={{ left: '09 · 民生账本', right: '9.1  三方利益结构' }}
      folio="106"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">9.1</span><span>三方利益结构与分配机制</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        不是零和博弈，是正和游戏。
      </h3>

      {/* 三方利益主体 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        {stakeholders.map((s, i) => (
          <div key={i} style={{
            border: `2px solid ${s.color}`,
            borderTop: `6px solid ${s.color}`,
          }}>
            <div style={{
              background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
              color: i === 1 ? 'var(--paper)' : 'var(--ink)',
              padding: '10px 12px',
            }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 16, fontWeight: 700 }}>{s.who}</div>
            </div>
            <div style={{ padding: '12px' }}>
              <div className="eyebrow" style={{ marginBottom: 6, color: s.color }}>得到</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', marginBottom: 10 }}>
                {s.gets.map((g, j) => (
                  <li key={j} style={{
                    fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.5, marginBottom: 3,
                    paddingLeft: 10, position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 6,
                      width: 3, height: 3, background: s.color,
                    }} />
                    {g}
                  </li>
                ))}
              </ul>
              <div className="rule" style={{ margin: '8px 0' }} />
              <div className="eyebrow" style={{ marginBottom: 6, color: 'var(--smoke)' }}>付出</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {s.pays.map((p, j) => (
                  <li key={j} style={{
                    fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.5, marginBottom: 3,
                    paddingLeft: 10, position: 'relative', color: 'var(--smoke)',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 6,
                      width: 3, height: 3, background: 'var(--smoke)',
                    }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 利益流动场景 */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>典型场景下的利益流动路径</div>
      <div style={{ display: 'grid', gap: 10 }}>
        {scenarios.map((sc, i) => (
          <div key={i} className="case" style={{ padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 6, color: 'var(--vermilion)' }}>
              {sc.title}
            </div>
            <div style={{ 
              background: 'var(--ash)', 
              padding: '8px 10px', 
              fontFamily: 'var(--serif-zh)', 
              fontSize: 11, 
              lineHeight: 1.6, 
              marginBottom: 6,
              borderLeft: '3px solid var(--vermilion)',
            }}>
              {sc.flow}
            </div>
            <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.6, margin: 0, color: 'var(--smoke)' }}>
              <b>机制：</b>{sc.mechanism}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, padding: 14, background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8 }}>
          核心逻辑
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          这不是一个讲故事的PPT项目——是一个真实可算账、三方都得利、可持续可复制的民生工程。
          每一方的利益都被设计进了商业模式，不是事后分配，而是<b>事前嵌入</b>。
        </p>
      </div>
    </Page>
  );
}

/* ========== 导出组件到全局 ========== */
Object.assign(window, {
  Ch8OpenerPage,
  Ch8Body1Page,
  Ch9OpenerPage,
  Ch9BodyPage,
});

/* ========== 第10章 扉页 ========== */
function Ch10OpenerPage() {
  const warmPhoto = {
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
      linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
    `,
  };

  return (
    <div className="page" data-screen-label="33 第10章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.42) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第10章 · CHAPTER 10</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />IP · AI ENDGAME
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>10</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? 30 : 170 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · 10
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          THE ENDGAME
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>IP · AI 终局</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>从一条街到全国，从摊贩到IP矩阵——终局是操作系统</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        {[
          { v: '100+', l: '街区IP矩阵' },
          { v: 'SaaS', l: 'AI平台化' },
          { v: '∞', l: '数据资产' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">108</span>
      </div>
    </div>
  );
}

/* ========== 第10章 正文1 — 扩张路径 ========== */
function Ch10Body1Page() {
  const phases = [
    {
      phase: '第一阶段 · 海南省内',
      time: '2025 年',
      cities: ['海口（海甸溪）', '三亚（大东海）', '琼海（潭门渔港）'],
      model: '直营模式 · 标准化复制',
      investment: '每城启动资金 800-1200万',
      target: '3城落地 · 100+商户IP',
    },
    {
      phase: '第二阶段 · 南方旅游城市',
      time: '2026 年',
      cities: ['大理（古城区）', '丽江（束河古镇）', '桂林（阳朔西街）', '厦门（曾厝垵）'],
      model: 'IP授权 + AI系统输出',
      investment: '每城授权费 50-100万',
      target: '10城覆盖 · 500+商户IP',
    },
    {
      phase: '第三阶段 · 全国 SaaS 化',
      time: '2027 年',
      cities: ['100+ 城市菜市场 / 夜市 / 美食街'],
      model: 'SaaS订阅 + 数据服务',
      investment: '每城订阅费 5-20万/年',
      target: '100城覆盖 · 10000+商户',
    },
  ];

  return (
    <Page
      label="34 第10章-正文1"
      runhead={{ left: '10 · IP·AI终局', right: '10.1  扩张路径' }}
      folio="110"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">10.1</span><span>三阶段扩张路线图</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        不是开连锁店，是复制 IP + AI 系统。
      </h3>

      {/* 三阶段 */}
      <div style={{ display: 'grid', gap: 14 }}>
        {phases.map((p, i) => (
          <div key={i} style={{
            border: `2px solid ${i === 1 ? 'var(--vermilion)' : 'var(--ink)'}`,
            background: i === 1 ? 'rgba(184,53,31,.03)' : 'transparent',
          }}>
            <div style={{
              background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
              color: i === 1 ? 'var(--paper)' : 'var(--ink)',
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 16, fontWeight: 700 }}>{p.phase}</div>
              <div className="caption" style={{ fontSize: 9 }}>{p.time}</div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>目标城市</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {p.cities.map((c, j) => (
                  <span key={j} className="tag v" style={{ fontSize: 10 }}>{c}</span>
                ))}
              </div>
              <div className="rule" style={{ margin: '8px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div className="caption" style={{ fontSize: 9, marginBottom: 4 }}>复制模式</div>
                  <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, fontWeight: 600 }}>{p.model}</div>
                </div>
                <div>
                  <div className="caption" style={{ fontSize: 9, marginBottom: 4 }}>投资/授权费</div>
                  <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, fontWeight: 600 }}>{p.investment}</div>
                </div>
              </div>
              <div className="rule" style={{ margin: '8px 0' }} />
              <div className="eyebrow" style={{ marginBottom: 4, color: 'var(--vermilion)' }}>目标里程碑</div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11.5, color: 'var(--ink)' }}>{p.target}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="case" style={{ marginTop: 16 }}>
        <div className="case-tag">核心逻辑  ·  LOGIC</div>
        <div className="rule" />
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          终局不是庙街小巷开到100个城市，而是100个城市的菜市场都在用<b>庙街小巷的AI系统</b>。
          每个城市都有自己的烟火气，我们不是替代它们，而是赋能它们——
          给它们一套内容生产系统 + 一套数据运营系统，让它们被看见、被记录、被AI推荐。
        </p>
      </div>
    </Page>
  );
}

/* ========== 第10章 正文2 — 三层变现 ========== */
function Ch10Body2Page() {
  const layers = [
    {
      layer: '底层',
      title: '租金 + 抽成',
      revenue: '年营收 2000 万',
      desc: '30摊位 × 平均5万/年，传统商业地产模式，稳定现金流。',
      margin: '毛利率 60%',
    },
    {
      layer: '中层',
      title: 'IP 授权 + 内容输出',
      revenue: '年营收 5000 万',
      desc: '庙街小巷品牌授权给其他城市（50万/城）；内容输出给旅游/短视频平台（广告分成）。',
      margin: '毛利率 85%',
    },
    {
      layer: '顶层',
      title: 'AI 系统 SaaS + 数据资产',
      revenue: '年营收 1 亿+',
      desc: 'AI全域运营系统 SaaS化（5-20万/城/年）；积累的商户/消费数据成为可交易资产。',
      margin: '毛利率 90%',
    },
  ];

  return (
    <Page
      label="35 第10章-正文2"
      runhead={{ left: '10 · IP·AI终局', right: '10.2  三层变现模型' }}
      folio="112"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">10.2</span><span>三层变现模型</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        不只卖货，更卖故事、数据、系统。
      </h3>

      {/* 三层变现 */}
      <div style={{ display: 'grid', gap: 14 }}>
        {layers.map((L, i) => (
          <div key={i} style={{
            border: `2px solid ${i === 2 ? 'var(--vermilion)' : 'var(--ink)'}`,
            background: i === 2 ? 'rgba(184,53,31,.03)' : 'transparent',
          }}>
            <div style={{
              background: i === 2 ? 'var(--ink)' : 'var(--paper-2)',
              color: i === 2 ? 'var(--paper)' : 'var(--ink)',
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <div className="caption" style={{ fontSize: 9 }}>{L.layer}</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 16, fontWeight: 700 }}>{L.title}</div>
              </div>
              <div style={{ fontFamily: 'var(--sans-en)', fontSize: 16, fontWeight: 700, color: i === 2 ? 'var(--gold)' : 'var(--vermilion)' }}>
                {L.revenue}
              </div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.65, margin: '0 0 8px 0' }}>
                {L.desc}
              </p>
              <div className="rule" style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="caption" style={{ fontSize: 9 }}>盈利能力</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, color: 'var(--vermilion)', fontWeight: 600 }}>
                  {L.margin}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="case">
          <div className="case-tag">案例研究  ·  CASE 10.2</div>
          <h5>从庙街小巷到"城市夜经济OS"</h5>
          <div className="rule" />
          <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.65, margin: 0 }}>
            2027年，庙街小巷AI系统已覆盖100城。每个城市订阅费15万/年，年营收1.5亿。
            同时，沉淀的10万+商户数据、1亿+消费数据，成为城市数字经济的<b>基础设施</b>——
            像美团、抖音一样，成为不可或缺的数字基建。
          </p>
        </div>

        <div style={{ padding: 14, background: 'var(--ink)', color: 'var(--paper)' }}>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8 }}>
            终局定义
          </div>
          <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
            这不是一个菜市场项目——是一个<b>用AI重构城市烟火气的基础设施项目</b>。
            终局是成为"城市夜经济的操作系统"，像美团、抖音一样，成为不可或缺的数字基建。
          </p>
        </div>
      </div>
    </Page>
  );
}

/* ========== 更新导出 ========== */
Object.assign(window, {
  Ch8OpenerPage,
  Ch8Body1Page,
  Ch9OpenerPage,
  Ch9BodyPage,
  Ch10OpenerPage,
  Ch10Body1Page,
  Ch10Body2Page,
});

/* ========== 第11章 扉页 ========== */
function Ch11OpenerPage() {
  const warmPhoto = {
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
      linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
    `,
  };

  return (
    <div className="page" data-screen-label="36 第11章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.42) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第11章 · CHAPTER 11</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />GEO STRATEGY
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>11</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? 30 : 170 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · 11
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          GEO STRATEGY
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>GEO 战略</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>从SEO到GEO，从搜索到地理——让AI发现烟火气</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        {[
          { v: 'GEO', l: '地理引擎优化' },
          { v: 'AI', l: '智能数据架构' },
          { v: '100+', l: '城市覆盖目标' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">114</span>
      </div>
    </div>
  );
}

/* ========== 第11章 正文1 — SEO→GEO ========== */
function Ch11Body1Page() {
  const comparison = [
    {
      era: 'SEO 时代',
      core: '搜索引擎优化',
      how: '关键词堆砌 + 外链购买 + 竞价排名',
      who: '百度、Google',
      cost: '按点击付费，越热门越贵',
    },
    {
      era: 'GEO 时代',
      core: '地理引擎优化',
      how: '结构化数据 + 实时更新 + 用户参与',
      who: '抖音、美团、高德、小红书',
      cost: '按内容质量与数据丰富度排序',
    },
  ];

  const geoCore = [
    { title: '结构化数据', desc: '每个商户/菜品/评价都是AI可读的JSON' },
    { title: '实时更新', desc: '日更内容，让AI知道这是活跃的、真实的' },
    { title: '多平台分发', desc: '抖音/小红书/美团/高德同步' },
    { title: '用户参与', desc: '真实评价、UGC内容，形成数据闭环' },
  ];

  return (
    <Page
      label="37 第11章-正文1"
      runhead={{ left: '11 · GEO战略', right: '11.1  从SEO到GEO' }}
      folio="116"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">11.1</span><span>从 SEO 到 GEO</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        搜索时代结束了，地理时代来了。
      </h3>

      {/* SEO vs GEO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        {comparison.map((c, i) => (
          <div key={i} style={{
            border: `2px solid ${i === 1 ? 'var(--vermilion)' : 'var(--smoke)'}`,
            background: i === 1 ? 'rgba(184,53,31,.03)' : 'transparent',
          }}>
            <div style={{
              background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
              color: i === 1 ? 'var(--paper)' : 'var(--ink)',
              padding: '10px 14px',
            }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 16, fontWeight: 700 }}>{c.era}</div>
              <div className="caption" style={{ fontSize: 9, marginTop: 2 }}>{c.core}</div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>如何做</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.6, margin: '0 0 10px 0' }}>
                {c.how}
              </p>
              <div className="rule" style={{ margin: '8px 0' }} />
              <div className="eyebrow" style={{ marginBottom: 6 }}>谁主导</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.6, margin: '0 0 10px 0' }}>
                {c.who}
              </p>
              <div className="rule" style={{ margin: '8px 0' }} />
              <div className="eyebrow" style={{ marginBottom: 6 }}>成本逻辑</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.6, margin: 0, color: 'var(--smoke)' }}>
                {c.cost}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* GEO四核心 */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>GEO 的四个核心能力</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {geoCore.map((g, i) => (
          <div key={i} style={{
            background: i === 0 ? 'var(--ink)' : 'var(--paper-2)',
            color: i === 0 ? 'var(--paper)' : 'var(--ink)',
            padding: '12px 10px',
            borderTop: `4px solid ${i === 0 ? 'var(--gold)' : 'var(--ink)'}`,
          }}>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
              {g.title}
            </div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.55, color: i === 0 ? '#C8BFA9' : 'var(--smoke)' }}>
              {g.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="case" style={{ marginTop: 16 }}>
        <div className="case-tag">案例研究  ·  CASE 11.1</div>
        <h5>当用户在海口问"哪里夜市好玩"</h5>
        <div className="rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: 8, fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.55 }}>
          {[
            ['SEO时代', '百度搜索 → 看到广告位排名 → 点进去是付费推广'],
            ['GEO时代', '打开抖音/美团 → AI推荐庙街小巷（因为数据丰富、评价真实、内容日更）→ 直接导航'],
          ].map(([t, c], i) => (
            <React.Fragment key={i}>
              <div className="num" style={{ fontSize: 11, color: 'var(--vermilion)', fontWeight: 700 }}>{t}</div>
              <div>{c}</div>
            </React.Fragment>
          ))}
        </div>
        <div className="rule" />
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
          SEO是花钱买排名，GEO是用数据赢信任。
        </p>
      </div>
    </Page>
  );
}

/* ========== 第11章 正文2-4合并 — 数据架构+实施+指标 ========== */
function Ch11Body2Page() {
  const dataLayers = [
    { layer: '商户层', data: '姓名、位置、时间、招牌菜、故事', ai: 'AI生成商户画像' },
    { layer: '菜品层', data: '名称、价格、食材、工艺、标签', ai: 'AI按口味推荐' },
    { layer: '评价层', data: '评分、文字、图片、视频', ai: 'AI分析情感倾向' },
    { layer: '时空层', data: '营业时段、人流、季节变化', ai: 'AI预测最佳时间' },
  ];

  const phases = [
    { p: '0-3月', task: '基础数据录入 + 内容日更' },
    { p: '3-6月', task: '多平台分发 + UGC引导' },
    { p: '6-12月', task: '数据闭环 + AI迭代优化' },
  ];

  const metrics = [
    { m: '内容更新频率', target: '日均30+条', weight: '高' },
    { m: '数据完整度', target: '100%商户 + 90%菜品', weight: '高' },
    { m: '平台覆盖', target: '5+平台同步', weight: '中' },
    { m: '用户参与度', target: '周均500+评价', weight: '高' },
    { m: 'AI推荐曝光', target: '月均10万+', weight: '极高' },
  ];

  return (
    <Page
      label="38 第11章-正文2"
      runhead={{ left: '11 · GEO战略', right: '11.2  数据架构与实施' }}
      folio="118"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">11.2-11.4</span><span>智能数据架构 · 实施路径 · 核心指标</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        让数据可被 AI 理解，持续迭代，用指标验证。
      </h3>

      {/* 数据架构 */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>智能数据架构四层</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {dataLayers.map((d, i) => (
          <div key={i} style={{
            background: i === 1 ? 'var(--ink)' : 'var(--paper-2)',
            color: i === 1 ? 'var(--paper)' : 'var(--ink)',
            padding: '10px',
            borderTop: `3px solid ${i === 1 ? 'var(--gold)' : 'var(--ink)'}`,
          }}>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              {d.layer}
            </div>
            <div className="caption" style={{ fontSize: 9, marginBottom: 4 }}>数据维度</div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.5, marginBottom: 6, color: i === 1 ? '#C8BFA9' : 'var(--smoke)' }}>
              {d.data}
            </div>
            <div className="caption" style={{ fontSize: 9, marginBottom: 4 }}>AI能力</div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.5, color: i === 1 ? 'var(--gold)' : 'var(--vermilion)' }}>
              {d.ai}
            </div>
          </div>
        ))}
      </div>

      {/* 实施路径 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14, marginBottom: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>三阶段实施路径</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {phases.map((ph, i) => (
              <div key={i} style={{
                background: i === 0 ? 'var(--ink)' : 'var(--paper-2)',
                color: i === 0 ? 'var(--paper)' : 'var(--ink)',
                padding: '10px 12px',
                borderLeft: `4px solid ${i === 0 ? 'var(--gold)' : 'var(--ink)'}`,
              }}>
                <div style={{ fontFamily: 'var(--sans-en)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  {ph.p}
                </div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10.5, lineHeight: 1.5, color: i === 0 ? '#C8BFA9' : 'var(--smoke)' }}>
                  {ph.task}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 核心指标 */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>五大核心指标体系</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                border: `1px solid ${i === 4 ? 'var(--vermilion)' : 'var(--rule)'}`,
                background: i === 4 ? 'rgba(184,53,31,.05)' : 'transparent',
                padding: '8px 10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, fontWeight: 600, color: i === 4 ? 'var(--vermilion)' : 'var(--ink)' }}>
                    {m.m}
                  </div>
                  <div className="caption" style={{ fontSize: 9, marginTop: 2 }}>{m.target}</div>
                </div>
                <div style={{
                  fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.16em',
                  color: i === 4 ? 'var(--vermilion)' : 'var(--smoke)',
                  fontWeight: 700,
                }}>
                  {m.weight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: 14, background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8 }}>
          验收标准
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          <b>6个月内达到"AI推荐曝光量10万+"</b>，证明GEO战略跑通。
          如果达不到，说明内容质量、数据结构或平台策略有问题，需要迭代优化。
          这不是拍脑袋，是用数据说话。
        </p>
      </div>
    </Page>
  );
}

/* ========== 第12章 扉页 ========== */
function Ch12OpenerPage() {
  const warmPhoto = {
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
      linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
    `,
  };

  return (
    <div className="page" data-screen-label="41 第12章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.18) 1px, transparent 1px)',
          backgroundSize: '3px 3px', mixBlendMode: 'multiply', opacity: .55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.42) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第12章 · CHAPTER 12</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />HAINAN ADVANTAGE
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>12</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? 30 : 170 }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · 12
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          WHY HAINAN NOW
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>海南优势</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>为什么是海南？为什么是现在？四重红利叠加的唯一窗口</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        {[
          { v: '4', l: '重红利叠加' },
          { v: '自贸港', l: '政策窗口期' },
          { v: '3年', l: '黄金窗口' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">124</span>
      </div>
    </div>
  );
}

/* ========== 第12章 正文 — 合并所有内容 ========== */
function Ch12BodyPage() {
  const bonuses = [
    {
      title: '政策红利',
      items: ['自贸港土地优惠（前3年5折）', '数字经济专项补贴500万', '创业孵化器绿色通道'],
    },
    {
      title: '人才红利',
      items: ['回流创业者（海南籍+本地就业）', 'AI工程师（三亚/海口科技园）', '内容创作者（旅游内容生态）'],
    },
    {
      title: '资本红利',
      items: ['政府引导基金优先支持', '旅游产业资本（酒店/景区）', '本地煤老板投资意愿强'],
    },
    {
      title: '文化红利',
      items: ['海南本土故事IP丰富', '年均1亿+游客流量', '烟火气+旅游结合天然契合'],
    },
  ];

  const timeline = [
    { year: '2025', plan: '海口、三亚、琼海（海南省内）' },
    { year: '2026', plan: '大理、丽江、桂林（南方旅游城市）' },
    { year: '2027', plan: 'SaaS化输出，覆盖100+城市' },
  ];

  const steps = [
    { step: '选址与谈判', time: '1-2月', action: '锁定海甸溪地块，谈土地优惠' },
    { step: '启动融资', time: '2-3月', action: 'Pre-A 800万，组建团队' },
    { step: '招商与开业', time: '3-4月', action: '首批30摊位，试运营' },
    { step: 'AI系统开发', time: '6-12月', action: 'A轮3000万，Agent系统上线' },
    { step: '复制与扩张', time: '12-18月', action: 'A+轮5000万，三亚/琼海复制' },
  ];

  return (
    <Page
      label="42 第12章-正文"
      runhead={{ left: '12 · 海南优势', right: '12.1  四重红利 + 操作路径' }}
      folio="126"
    >
      <div className="chapter-tag" style={{ marginBottom: 8 }}>
        <span>§</span><span className="num-big">12.1-12.4</span><span>四重红利 · 海南贡献 · 全国扩张 · 如何开始</span>
      </div>
      <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
        不是偶然，是历史性机遇。
      </h3>

      {/* 四重红利 */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>四重红利叠加</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {bonuses.map((b, i) => (
          <div key={i} style={{
            background: i === 0 ? 'var(--ink)' : 'var(--paper-2)',
            color: i === 0 ? 'var(--paper)' : 'var(--ink)',
            padding: '10px',
            borderTop: `3px solid ${i === 0 ? 'var(--gold)' : 'var(--vermilion)'}`,
          }}>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
              {b.title}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {b.items.map((item, j) => (
                <li key={j} style={{
                  fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.5, marginBottom: 4,
                  paddingLeft: 8, position: 'relative',
                  color: i === 0 ? '#C8BFA9' : 'var(--smoke)',
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: 6,
                    width: 3, height: 3, background: i === 0 ? 'var(--gold)' : 'var(--vermilion)',
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 扩张时间表 + 操作路径 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, marginBottom: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>扩张时间表</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{
                background: i === 0 ? 'var(--ink)' : 'var(--paper-2)',
                color: i === 0 ? 'var(--paper)' : 'var(--ink)',
                padding: '10px 12px',
                borderLeft: `4px solid ${i === 0 ? 'var(--gold)' : 'var(--vermilion)'}`,
              }}>
                <div style={{ fontFamily: 'var(--sans-en)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                  {t.year}
                </div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10.5, lineHeight: 1.5, color: i === 0 ? '#C8BFA9' : 'var(--smoke)' }}>
                  {t.plan}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>如何开始这件事 · 五步操作路径</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                border: `1px solid ${i === 0 ? 'var(--vermilion)' : 'var(--rule)'}`,
                background: i === 0 ? 'rgba(184,53,31,.05)' : 'transparent',
                padding: '8px 10px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, fontWeight: 700, color: i === 0 ? 'var(--vermilion)' : 'var(--ink)' }}>
                    {i + 1}. {s.step}
                  </div>
                  <div className="caption" style={{ fontSize: 9 }}>{s.time}</div>
                </div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10, lineHeight: 1.5, color: 'var(--smoke)' }}>
                  {s.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: 14, background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.28em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8 }}>
          现在就是最好的时机
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          海南自贸港政策窗口期只有3年，AI技术爆发期只有5年，旅游流量红利期只有10年——
          <b>三个窗口同时打开的时间，只有现在</b>。错过这3年，就是错过30年。
        </p>
      </div>
    </Page>
  );
}

/* ========== 最终导出 ========== */
Object.assign(window, {
  Ch8OpenerPage,
  Ch8Body1Page,
  Ch9OpenerPage,
  Ch9BodyPage,
  Ch10OpenerPage,
  Ch10Body1Page,
  Ch10Body2Page,
  Ch11OpenerPage,
  Ch11Body1Page,
  Ch11Body2Page,
  Ch12OpenerPage,
  Ch12BodyPage,
});
