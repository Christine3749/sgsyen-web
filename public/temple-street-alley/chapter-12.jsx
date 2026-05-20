// 庙街小巷 · 商业技术书 — 第12章 海南优势与全球野心

/* ---- 本地 Page 壳 ---- */
function PageCh12({ dark, children, runhead, folio, label }) {
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

const warmPhotoCh12 = {
  backgroundImage: `
    radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
    linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
  `,
};

function DotTexCh12() {
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

/* ========== 第12章 扉页 ========== */
function Ch12OpenerPage() {
  return (
    <div className="page" data-screen-label="40 第12章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhotoCh12 }}>
        <DotTexCh12 />
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
          FROM HAINAN TO THE WORLD
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>海南优势<br />与全球野心</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 520,
        }}>本土企业的战略优势<br />从海南自贸港到全国市场，从中国门户到东南亚跳板。</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>15%</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>企业所得税率</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>100%</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>现金流留在海南</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>2030</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>东南亚市场目标</div>
        </div>
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">126</span>
      </div>
    </div>
  );
}

/* ========== 第12章 正文1 — 为什么必须是海南企业 ========== */
function Ch12Body1Page() {
  const advantages = [
    {
      title: '政策红利：自贸港企业独享',
      items: [
        '15% 企业所得税（全国最低，对比：北上广深 25%）',
        '零关税政策：进口设备、原材料免税',
        '资金自由流动：外汇管制放宽，跨境支付便利',
        '人才优惠：高端人才个人所得税封顶 15%',
      ],
      note: '这些政策只给在海南注册、主营业务在海南的企业',
    },
    {
      title: '政府扶持力度：本地企业 > 外来企业',
      items: [
        '项目审批优先级：本地企业走绿色通道',
        '政府引导基金：优先投资本地注册企业',
        '土地优惠：租金、地价对本地企业有优惠政策',
        '政策试点：新政策优先在本地企业试点',
      ],
      note: '政府需要培育本地龙头企业，而不是为外地资本做嫁衣',
    },
    {
      title: '数据主权：消费数据留在海南',
      items: [
        '不被外部平台截流：美团、大众点评拿走数据和利润',
        '本地数据资产：所有用户行为、消费数据归海南所有',
        '政府数据交付：可以直接对接海南政务系统',
        'AI 训练语料：海南在地文化数据不外流',
      ],
      note: '数据主权是数字时代的核心资产',
    },
  ];

  return (
    <PageCh12 label="41 第12章-正文1" runhead={{ left: '12 · 海南优势与全球野心', right: '本土企业优势' }} folio="128">
      <div className="eyebrow" style={{ marginBottom: 18 }}>为什么必须是海南本土企业</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        本地注册不是形式，<br />是<span style={{ color: 'var(--vermilion)' }}>战略护城河</span>。
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        很多投资人会问：为什么一定要在海南注册？为什么不能是全国连锁模式？
        答案很简单：<b>2026年封关后的5年，是海南本土企业的黄金窗口期</b>——
        政策红利、政府扶持、数据主权，只给真正扎根海南的企业。
      </p>
      
      <div style={{ display: 'grid', gap: 20 }}>
        {advantages.map((adv, i) => (
          <div key={i} style={{ border: '3px solid var(--vermilion)', padding: 20, background: i === 0 ? 'rgba(184,53,31,.05)' : 'transparent' }}>
            <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 20, fontWeight: 700, color: 'var(--vermilion)', margin: '0 0 14px 0' }}>
              {String(i + 1).padStart(2, '0')} · {adv.title}
            </h4>
            <ul style={{ margin: '0 0 14px 0', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
              {adv.items.map((item, j) => (
                <li key={j} style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 6, background: 'var(--vermilion)' }} />
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ padding: 12, background: 'var(--ash)', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, margin: 0, color: 'var(--smoke)', fontStyle: 'italic' }}>
                → {adv.note}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <blockquote className="pull" style={{ margin: '24px 0 0', fontSize: 15 }}>
        盒马、山姆、永辉——这些全国连锁品牌在海南开店，赚的钱流回上海、深圳、福州。
        庙街小巷不一样：<b>我们的业绩、现金流、税收，100% 留在海南</b>。
      </blockquote>
    </PageCh12>
  );
}

/* ========== 第12章 正文2 — 对海南的贡献 ========== */
function Ch12Body2Page() {
  const contributions = [
    {
      metric: '现金流锚定',
      value: '100%',
      desc: '所有收入在海南结算',
      detail: [
        '租金收入、品牌授权费、AI系统服务费 — 全部在海口入账',
        '供应链采购优先海南本地（海鲜、水果、调料）',
        '18个月内预计贡献税收 ≥ 2000万元',
      ],
    },
    {
      metric: '就业贡献',
      value: '1300+',
      desc: '直接 + 间接就业岗位',
      detail: [
        '直接就业：摊主、运营团队、技术团队 ≈ 300人',
        '间接就业：供应链、物流、内容创作 ≈ 1000人',
        '优先招聘海南本地居民，带动周边社区发展',
      ],
    },
    {
      metric: '品牌输出',
      value: '城市名片',
      desc: '海南在地文化的全球传播',
      detail: [
        '庙街小巷 = 海口城市IP，被AI引擎传播到全球',
        '每年吸引游客 ≥ 50万人次（本地 + 外地 + 国际）',
        '成为"海南自贸港数字消费样板"，输出到全国',
      ],
    },
  ];

  return (
    <PageCh12 label="42 第12章-正文2" runhead={{ left: '12 · 海南优势与全球野心', right: '对海南的贡献' }} folio="130">
      <div className="eyebrow" style={{ marginBottom: 18 }}>我们为海南做了什么</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        不是索取政策，<br />是<span style={{ color: 'var(--vermilion)' }}>共同成长</span>。
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        享受海南自贸港政策的同时，我们也在为这片土地做贡献。
        <b>现金流、就业、品牌，三个维度锚定海南</b>——这不是一个过路的项目，
        而是要和海南一起成长的本土企业。
      </p>
      
      <div style={{ display: 'grid', gap: 20 }}>
        {contributions.map((c, i) => (
          <div key={i} style={{ border: '2px solid var(--ink)', padding: 22, background: i === 1 ? 'var(--ash)' : 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                {c.metric}
              </h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontFamily: 'var(--serif-en)', fontSize: 32, fontWeight: 700, color: 'var(--vermilion)' }}>
                  {c.value}
                </div>
                <div className="caption" style={{ color: 'var(--smoke)' }}>{c.desc}</div>
              </div>
            </div>
            <div className="rule" style={{ margin: '14px 0' }} />
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
              {c.detail.map((d, j) => (
                <li key={j} style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 6, background: 'var(--vermilion)' }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 24, padding: 20, background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="caption" style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: 10 }}>
          给政府的承诺
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
          18个月内，庙街小巷将成为<b style={{ color: 'var(--gold)' }}>海南自贸港夜经济标杆项目</b>，
          被写入政府白皮书，成为可复制、可推广的数字消费样板。
          我们的成功，就是海南自贸港模式的成功。
        </p>
      </div>
    </PageCh12>
  );
}

/* ========== 第12章 正文3 — 全国扩张路径 ========== */
function Ch12Body3Page() {
  const phases = [
    {
      phase: 'Phase 1',
      period: '2026-2027',
      region: '海南 IP 矩阵',
      cities: '海口 → 三亚 → 琼海/文昌/儋州',
      focus: '在海南内部验证模型，形成可复制的运营标准',
      advantage: '本地政策支持最强，试错成本最低',
    },
    {
      phase: 'Phase 2',
      period: '2027-2028',
      region: '大湾区试点',
      cities: '深圳 → 广州 → 珠海',
      focus: '利用自贸港贸易便利，供应链优势打入一线城市',
      advantage: '海南企业在大湾区有政策协同优势',
    },
    {
      phase: 'Phase 3',
      period: '2028-2029',
      region: '长三角复制',
      cities: '上海 → 杭州 → 南京',
      focus: '高净值人群市场，品牌溢价最大化',
      advantage: '海南 = 高端度假 = 品牌背书',
    },
    {
      phase: 'Phase 4',
      period: '2029-2030',
      region: '东南亚市场',
      cities: '新加坡 → 曼谷 → 胡志明市',
      focus: '海南自贸港 = 中国连接东南亚的门户',
      advantage: '输出"中国在地生活方式"的全球化',
    },
  ];

  return (
    <PageCh12 label="43 第12章-正文3" runhead={{ left: '12 · 海南优势与全球野心', right: '全国扩张路径' }} folio="132">
      <div className="eyebrow" style={{ marginBottom: 18 }}>从海南到全球的四阶段战略</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        海南是起点，<br />不是<span style={{ color: 'var(--vermilion)' }}>终点</span>。
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        扎根海南不是保守，而是<b>战略杠杆</b>——利用自贸港政策红利，
        先在本地验证模型、积累数据、沉淀品牌，再用本土企业的身份冲击全国、全球市场。
      </p>
      
      <div style={{ display: 'grid', gap: 16 }}>
        {phases.map((p, i) => (
          <div key={i} style={{
            border: `2px solid ${i === 0 ? 'var(--vermilion)' : 'var(--smoke)'}`,
            padding: 18,
            background: i === 0 ? 'rgba(184,53,31,.05)' : 'transparent',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontFamily: 'var(--sans-en)', fontSize: 24, fontWeight: 700, color: 'var(--vermilion)' }}>
                  {p.phase}
                </div>
                <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                  {p.region}
                </h4>
              </div>
              <div style={{ fontFamily: 'var(--serif-en)', fontSize: 12, color: 'var(--smoke)' }}>
                {p.period}
              </div>
            </div>
            <div className="rule" style={{ margin: '12px 0' }} />
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, color: 'var(--smoke)' }}>
                <b>城市路径：</b>{p.cities}
              </div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.6 }}>
                <b>核心策略：</b>{p.focus}
              </div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, color: 'var(--vermilion)', fontStyle: 'italic' }}>
                → {p.advantage}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <blockquote className="pull" style={{ margin: '20px 0 0', fontSize: 15 }}>
        海南本土企业的身份，不是限制，而是<b>竞争优势</b>——
        我们享受政策红利、积累本地资源、建立品牌信任，
        然后用这些优势去全国、全球市场收割。
      </blockquote>
    </PageCh12>
  );
}

/* ========== 第12章 正文4 — 如何操作 ========== */
function Ch12Body4Page() {
  const tactics = [
    {
      title: '法律架构：海南母公司 + 各地子公司',
      desc: '母公司在海南享受税收优惠，各地子公司负责本地运营',
      steps: [
        '海南注册母公司（TOPV集团·海甸事业部）',
        '各地设立全资子公司（如"庙街小巷·深圳公司"）',
        '技术、品牌、AI系统由母公司授权，子公司支付服务费',
        '利润回流海南，合法享受15%税率',
      ],
    },
    {
      title: '供应链优势：自贸港 = 零关税',
      desc: '进口食材、设备免税，成本比内地低15-20%',
      steps: [
        '海南自贸港可以零关税进口东南亚海鲜、水果',
        '通过海南中转，供应全国各地分店',
        '设备采购（AI摄像头、收银系统）也可以免税进口',
        '成本优势转化为价格优势或利润空间',
      ],
    },
    {
      title: '品牌背书：海南 = 高端度假 = 信任',
      desc: '利用海南的品牌溢价，在全国市场建立差异化定位',
      steps: [
        '"来自海南自贸港的在地生活品牌"— 自带高端属性',
        '政府白皮书背书 —"海南数字消费样板"',
        '媒体报道 —"海南本土企业冲击全国市场"',
        'AI 引擎推荐 —"海南庙街小巷模式输出"',
      ],
    },
  ];

  return (
    <PageCh12 label="44 第12章-正文4" runhead={{ left: '12 · 海南优势与全球野心', right: '如何操作' }} folio="134">
      <div className="eyebrow" style={{ marginBottom: 18 }}>从战略到战术的落地路径</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        我们要<span style={{ color: 'var(--vermilion)' }}>如何操作</span>？
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        战略听起来宏大，但必须落地到<b>具体的法律架构、供应链设计、品牌打法</b>。
        以下是我们的三个核心战术。
      </p>
      
      <div style={{ display: 'grid', gap: 20 }}>
        {tactics.map((t, i) => (
          <div key={i} style={{ border: '3px solid var(--vermilion)', padding: 20 }}>
            <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 20, fontWeight: 700, color: 'var(--vermilion)', margin: '0 0 10px 0' }}>
              {String(i + 1).padStart(2, '0')} · {t.title}
            </h4>
            <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, color: 'var(--smoke)', margin: '0 0 14px 0', fontStyle: 'italic' }}>
              {t.desc}
            </p>
            <div className="rule" style={{ margin: '14px 0' }} />
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
              {t.steps.map((step, j) => (
                <li key={j} style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 6, background: 'var(--vermilion)' }} />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 24, padding: 20, background: 'var(--ash)' }}>
        <div className="caption" style={{ color: 'var(--vermilion)', fontWeight: 700, marginBottom: 10 }}>
          核心逻辑
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
          我们不是"海南的地方企业"，而是<b>"从海南出发的全球化企业"</b>。
          海南给了我们政策、税收、供应链的优势，我们用这些优势去全国、全球市场竞争。
          <b>这是海南自贸港最大的战略价值</b>。
        </p>
      </div>
    </PageCh12>
  );
}

/* ========== 导出组件到全局 ========== */
Object.assign(window, {
  Ch12OpenerPage,
  Ch12Body1Page,
  Ch12Body2Page,
  Ch12Body3Page,
  Ch12Body4Page,
});
