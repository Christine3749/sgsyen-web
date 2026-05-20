// 庙街小巷 · 商业技术书 — 第五至六章 + 附录A

/* ---- 本地 Page 壳 ---- */
function PageD({ dark, children, runhead, folio, label }) {
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

const warmPhotoD = {
  backgroundImage: `
    radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
    linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
  `,
};

function DotTexD() {
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

function ChOpenerD({ chNum, enPart, enLabel, zhTitle, subtitle, stats, folio, label }) {
  return (
    <div className="page" data-screen-label={label} style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhotoD }}>
        <DotTexD />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第{chNum}章 · CHAPTER {enPart}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />{enLabel}
        </span>
      </div>
      <div style={{
        position: 'absolute', right: 40, top: 80,
        fontFamily: 'var(--serif-en)', fontSize: window.__WIDE_MODE ? 140 : 220, lineHeight: 1, fontWeight: 200,
        color: 'rgba(184,53,31,.08)', letterSpacing: '-.04em', userSelect: 'none',
      }}>{enPart}</div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: window.__WIDE_MODE ? (stats ? 30 : 20) : (stats ? 170 : 60) }}>
        <div style={{
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '.32em',
          color: 'var(--vermilion)', fontWeight: 600, marginBottom: 14,
        }}>
          PART · {enPart}
          <span style={{ display: 'inline-block', width: 16, height: 1, background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px' }} />
          {enLabel.toUpperCase()}
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>{zhTitle}</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 490,
        }}>{subtitle}</div>
      </div>
      {stats && (
        <div style={{
          position: 'absolute', bottom: 76, left: 56, right: 56,
          display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
        }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      )}
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">{folio}</span>
      </div>
    </div>
  );
}

/* ==================== 第五章 扉页 ==================== */
function Ch5OpenerPage() {
  return (
    <ChOpenerD
      chNum="五" enPart="05" enLabel="Business Model"
      zhTitle="怎么赚钱"
      subtitle="不是单一盈利点，而是一套随项目成熟度自动升级的收入体系。"
      stats={[
        { v: '4条', l: '收入流  从稳定到想象' },
        { v: '3方', l: '利益共同体  政府·商家·项目方' },
        { v: '3阶段', l: '营收成长路径' },
        { v: '可复制', l: '模板价值：海南→大湾区' },
      ]}
      folio="086"
      label="20 第五章扉页"
    />
  );
}

/* ==================== 第五章 正文1 — 四条收入流 ==================== */
function Ch5Body1Page() {
  const streams = [
    {
      stage: '核心 · 稳定',
      en: 'CORE REVENUE',
      n: '01',
      title: '商铺租金 + 联营分成',
      desc: '庙街小巷物理空间的租金收益，以及与入驻品牌的营业额联营分成。这是项目最稳定的现金流基础，不依赖线上运营即可存活。',
      detail: '入驻品牌：茶饮、海鲜、文创、宠物、定制汽水等',
      color: 'var(--ink)',
      textColor: 'var(--paper)',
      accentColor: 'var(--gold)',
    },
    {
      stage: '成长 · 可控',
      en: 'GROWTH REVENUE',
      n: '02',
      title: '数字运营服务费',
      desc: '向入驻商家提供线上运营服务包：账号代运营、内容制作、直播策划、私域搭建。线上越做越好，商家越愿意付费，形成正向循环。',
      detail: 'SaaS化收费，商家按月订阅',
      color: 'var(--vermilion)',
      textColor: 'var(--paper)',
      accentColor: '#FFCFBB',
    },
    {
      stage: '成长 · 可控',
      en: 'TRANSACTION FEE',
      n: '03',
      title: '线上交易佣金',
      desc: '通过小程序、看着买平台产生的线上订单，收取低于美团/外卖平台的佣金（目标3—5%），以低费率快速吸引商家入驻线上，积累交易数据。',
      detail: '对比美团8—15%，竞争力显著',
      color: 'var(--paper-2)',
      textColor: 'var(--ink)',
      accentColor: 'var(--vermilion)',
    },
    {
      stage: '想象 · 高价值',
      en: 'IP & DATA ASSET',
      n: '04',
      title: 'IP授权 + 数据资产',
      desc: '「庙街小巷」IP成熟后，可向品牌方提供联名合作、IP授权、场景植入。城市消费大数据可与政府合作，形成公共数字资产交付。',
      detail: '对标成熟文旅IP的授权路径',
      color: 'var(--paper-2)',
      textColor: 'var(--ink)',
      accentColor: 'var(--gold)',
    },
  ];

  return (
    <PageD label="21 第五章正文1" runhead={{ left: '05 · 怎么赚钱', right: '5.1  四条收入流' }} folio="088">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chapter-tag" style={{ marginBottom: 8 }}>
          <span>§</span><span className="num-big">5.1</span><span>四条收入流  ·  从确定到想象</span>
        </div>
        <h3 className="section-title" style={{ fontSize: 26, marginBottom: 6 }}>
          线下决定项目<span style={{ color: 'var(--vermilion)' }}>能不能活</span>，<br />
          线上决定项目<span style={{ color: 'var(--gold)' }}>能活多高</span>。
        </h3>
        <p className="body" style={{ color: 'var(--smoke)', marginBottom: 16, fontSize: 13 }}>
          好的商业模式有一个特征：早期靠空间租金活下去，中期靠数字服务做厚利润，
          长期靠数据资产讲更大的故事。庙街小巷，三条腿都有。
        </p>

        {/* 核心模式定义 */}
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '12px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.32em', color: 'var(--gold)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            核心模式
          </div>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.6 }}>
            实体空间 <span style={{ color: 'var(--gold)' }}>×</span> IP内容 <span style={{ color: 'var(--gold)' }}>×</span> AI运营 <span style={{ color: 'var(--gold)' }}>×</span> 数据资产
            <span style={{ color: 'var(--gold)', fontWeight: 700 }}> = 复利增长</span>
          </div>
        </div>

        {/* 四条收入流 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
          {streams.map((s, i) => (
            <div key={i} style={{
              background: s.color, color: s.textColor,
              padding: '16px 14px', display: 'flex', flexDirection: 'column',
              border: s.color === 'var(--paper-2)' ? '1px solid var(--rule)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div style={{
                  fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.28em',
                  color: s.accentColor, fontWeight: 700,
                }}>{s.stage}</div>
                <div style={{ fontFamily: 'var(--sans-en)', fontSize: 9, letterSpacing: '.2em', opacity: .65 }}>{s.en}</div>
              </div>
              <div style={{
                fontFamily: 'var(--serif-en)', fontSize: 36, fontWeight: 600,
                color: s.accentColor, lineHeight: 1, marginBottom: 8,
              }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.72, margin: '0 0 10px', flex: 1, opacity: .9 }}>{s.desc}</p>
              <div style={{
                fontFamily: 'var(--sans-zh)', fontSize: 9.5, letterSpacing: '.1em',
                color: s.accentColor, paddingTop: 10,
                borderTop: `1px solid ${s.textColor === 'var(--paper)' ? 'rgba(255,255,255,.15)' : 'var(--rule)'}`,
              }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </PageD>
  );
}

/* ==================== 第五章 正文2 — 三方利益 + 阶段预测 ==================== */
function Ch5Body2Page() {
  const stakeholders = [
    {
      role: '政府', sub: '城市名片 + 数据主权',
      items: ['GDP增长、就业创造', '消费大数据留存本地', '智慧城市建设素材', '自贸港封关后的示范项目'],
      color: 'var(--ink)',
    },
    {
      role: '商家', sub: '流量 + 数字化能力',
      items: ['低成本线上曝光', '私域用户沉淀', 'AI赋能运营降本', '去中心化数据自持'],
      color: 'var(--vermilion)',
    },
    {
      role: '项目方', sub: '规模 + 数据 + 复制权',
      items: ['稳定租金现金流', '数字服务溢价', 'IP资产积累', '可复制模板价值'],
      color: 'var(--gold)',
    },
  ];

  const stages = [
    { t: '0—6个月', sub: '起步期', goal: '以存活为目标', items: ['租金收益覆盖运营成本', '线上体系搭建完毕', 'IP账号冷启动', '达到盈亏平衡'] },
    { t: '6—18个月', sub: '成长期', goal: '数字服务收入启动', items: ['商家数字运营服务收费', '线上交易佣金产生', 'IP内容带动线下客流', '可量化增长'] },
    { t: '18个月以后', sub: '成熟期', goal: 'IP + 数据双变现', items: ['庙街小巷IP授权收入', '政府数据合作收入', '向三亚儋州文昌复制', '模板输出变现'] },
  ];

  return (
    <PageD label="22 第五章正文2" runhead={{ left: '05 · 怎么赚钱', right: '5.2  三方利益共同体 · 阶段预测' }} folio="094">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chapter-tag" style={{ marginBottom: 8 }}>
          <span>§</span><span className="num-big">5.2</span><span>三方利益共同体  ·  为什么大家都赢</span>
        </div>
        <h3 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
          一个项目，三张成绩单。
        </h3>

        {/* 三方利益 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {stakeholders.map((s, i) => (
            <div key={i} style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
              <div style={{ background: s.color, color: 'var(--paper)', padding: '12px 14px' }}>
                <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.28em', opacity: .75, marginBottom: 6 }}>{s.sub}</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 20, fontWeight: 700 }}>{s.role}<span style={{ fontSize: 12, fontWeight: 400 }}>得到</span></div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                {s.items.map((item, j) => (
                  <div key={j} style={{
                    fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.6,
                    paddingLeft: 12, position: 'relative', marginBottom: 4, color: 'var(--ink)',
                  }}>
                    <span style={{ position: 'absolute', left: 0, top: 8, width: 5, height: 5, background: s.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 野心表达 */}
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '14px 18px', marginBottom: 20,
        }}>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.32em', color: 'var(--gold)', marginBottom: 8, fontWeight: 700 }}>
            这个项目的终点  ·  ENDGAME
          </div>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.75 }}>
            不是海口的一条街区，而是一套可以复制到全国的<b style={{ color: 'var(--gold)' }}>城市生活模型</b>。
            每一座城市，都有一条老街在等待被重新激活。海口做成之后，复制到三亚、儋州、文昌……把这套模型，走遍整个海南省。
          </div>
        </div>

        {/* 阶段性营收预测 */}
        <div className="eyebrow" style={{ marginBottom: 10 }}>阶段性营收预测</div>
        <div className="rule-thick" style={{ marginBottom: 12 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              padding: '14px 16px',
              borderRight: i < 2 ? '1px solid var(--rule)' : 'none',
              background: i === 1 ? 'var(--paper-2)' : 'transparent',
            }}>
              <div style={{ fontFamily: 'var(--serif-en)', fontSize: 11, fontWeight: 700, color: 'var(--vermilion)', letterSpacing: '.08em', marginBottom: 4 }}>
                {s.t}
              </div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9.5, letterSpacing: '.18em', color: 'var(--smoke-2)', marginBottom: 8 }}>
                {s.sub}  ·  {s.goal}
              </div>
              {s.items.map((item, j) => (
                <div key={j} style={{
                  fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.65,
                  color: 'var(--ink)', paddingLeft: 12, position: 'relative', marginBottom: 3,
                }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 4, height: 4, background: 'var(--vermilion)' }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageD>
  );
}

/* ==================== 第六章 扉页 ==================== */
function Ch6OpenerPage() {
  return (
    <ChOpenerD
      chNum="六" enPart="06" enLabel="Who Does It"
      zhTitle="谁来做"
      subtitle="资源、关系、执行力、技术，四块拼图各就各位。"
      stats={[
        { v: '20年', l: '互联网全域运营经验' },
        { v: '10+种', l: 'AI工具深度应用能力' },
        { v: '全链路', l: '战略→系统→内容→数据' },
        { v: '0→1', l: '冷启动 + 1→100 规模化' },
      ]}
      folio="102"
      label="23 第六章扉页"
    />
  );
}

/* ==================== 第六章 正文 — 团队结构 ==================== */
function Ch6BodyPage() {
  const caps = [
    { t: '战略规划', d: '用户动线分析、竞争格局研判、运营节奏设计' },
    { t: '系统搭建', d: '网站/小程序/收银/摄像头数字基础设施' },
    { t: '内容生产', d: 'AI辅助批量内容，短视频/图文/直播脚本' },
    { t: '私域运营', d: '社群搭建、用户分层、复购转化' },
    { t: 'IP孵化', d: '品牌调性、账号矩阵、商家IP打造' },
    { t: '数据分析', d: '用户行为洞察，反哺线下业态决策' },
    { t: 'AI工具', d: 'Codex/Cloud Code/Claude等10+种工具深度应用' },
    { t: '商业感知', d: '战略敏感度强，擅长发现别人看不见的机会' },
  ];

  const roles = [
    { badge: '主', name: '项目发起人 · 主导方', en: 'FOUNDER / SPONSOR', tasks: ['政府关系与项目审批', '资金调配与重大决策', '高层合作资源引入', '项目整体战略把控'], tags: ['大型文旅操盘', '政府关系', '本地资源', '资方背景'] },
    { badge: '运', name: '全域运营总负责', en: 'CHIEF OPERATION OFFICER', tasks: ['线上全域运营体系搭建', 'AI技术落地与工具应用', '数字基础设施规划实施', '内容IP体系策划运营', '数据分析与运营决策'], tags: ['20年运营经验', 'AI工具矩阵', '代码开发', '内容策划', '0→1 冷启动'] },
  ];

  return (
    <PageD label="24 第六章正文" runhead={{ left: '06 · 谁来做', right: '团队结构 · 能力矩阵' }} folio="104">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chapter-tag" style={{ marginBottom: 8 }}>
          <span>§</span><span className="num-big">6.1</span><span>核心团队 · 分工边界</span>
        </div>
        <h3 className="section-title" style={{ fontSize: 24, marginBottom: 6 }}>
          上有人<span style={{ color: 'var(--gold)' }}>撑天</span>，下有人<span style={{ color: 'var(--vermilion)' }}>种地</span>，<br />中间有人<span style={{ color: 'var(--vermilion)' }}>点火</span>。
        </h3>
        <p className="body" style={{ color: 'var(--smoke)', marginBottom: 14, fontSize: 13 }}>
          这支团队的配置逻辑：政府关系与资金撑天花板，线下执行是地面部队，线上运营与AI技术是发动机。三者缺一不可。过去项目缺的那一块，是中间这个位置。现在，这个位置有人了。
        </p>

        {/* 核心角色 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          {roles.map((r, i) => (
            <div key={i} style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
              <div style={{ background: i === 1 ? 'var(--vermilion)' : 'var(--ink)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,.2)', color: 'var(--paper)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--serif-zh)', fontSize: 16, fontWeight: 700, flexShrink: 0,
                }}>{r.badge}</div>
                <div>
                  <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, fontWeight: 700, color: 'var(--paper)' }}>{r.name}</div>
                  <div style={{ fontFamily: 'var(--sans-en)', fontSize: 9, letterSpacing: '.2em', color: 'rgba(255,255,255,.65)' }}>{r.en}</div>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div className="eyebrow" style={{ marginBottom: 8, fontSize: 9 }}>负责范围</div>
                {r.tasks.map((t, j) => (
                  <div key={j} style={{
                    fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.65,
                    paddingLeft: 12, position: 'relative', color: 'var(--ink)', marginBottom: 3,
                  }}>
                    <span style={{ position: 'absolute', left: 0, top: 8, width: 4, height: 4, background: i === 1 ? 'var(--vermilion)' : 'var(--ink)' }} />
                    {t}
                  </div>
                ))}
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {r.tags.map((tag, j) => (
                    <span key={j} className="tag" style={{ fontSize: 9 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 支撑团队 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {[
            { badge: '资', title: '资方合伙人', items: ['资金 · 线下运营 · 审美设计', '负责线下空间运营与落地执行', '视觉审美与空间设计专业支持'] },
            { badge: '地', title: '本地资源合伙人', items: ['政府关系协同', '本地商家资源深耕', '供应商资源对接，在地化支撑'] },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--paper-2)', padding: '12px 14px', display: 'flex', gap: 12 }}>
              <div style={{
                width: 32, height: 32, background: 'var(--smoke)', color: 'var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--serif-zh)', fontSize: 14, fontWeight: 700, flexShrink: 0,
              }}>{s.badge}</div>
              <div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
                {s.items.map((it, j) => (
                  <div key={j} style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, color: 'var(--smoke)', lineHeight: 1.6 }}>· {it}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 能力矩阵 */}
        <div className="eyebrow" style={{ marginBottom: 8 }}>全域运营核心能力矩阵</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {caps.map((c, i) => (
            <div key={i} style={{
              padding: '10px 10px 12px',
              borderTop: `2px solid ${i < 4 ? 'var(--vermilion)' : 'var(--gold)'}`,
              background: 'var(--paper-2)',
            }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{c.t}</div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10.5, lineHeight: 1.55, color: 'var(--smoke)' }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </PageD>
  );
}

/* ==================== 附录A — 为政府而写 ==================== */
function AppendixAPage() {
  const govValues = [
    {
      n: '01', tag: '夜经济标杆', en: 'NIGHT ECONOMY',
      title: '海南夜经济示范样板',
      body: '海甸溪北岸从传统渔港转型为高品质夜经济目的地，带动周边商圈活力，创造本地就业岗位，拉动GDP增长。这是一个可以被具体量化的政绩数字。',
      badge: '可上汇报',
    },
    {
      n: '02', tag: '自贸港数字样板', en: 'DIGITAL DEMONSTRATION',
      title: '自贸港封关 · 数字消费示范区',
      body: '2025年12月18日封关启动后，庙街小巷率先落地AI智慧消费体系，消费数据本地留存，为海南数字政务提供真实的城市消费大数据——这是自贸港数字化转型的具体落地案例。',
      badge: '可写白皮书',
    },
    {
      n: '03', tag: '在地文化复兴', en: 'CULTURAL HERITAGE',
      title: '海南非遗与本土文化活态传承示范',
      body: '琼剧、黎歌苗舞、渔港文化、黎锦非遗——通过商业场景的活化，让传统文化不再是博物馆里的展品，而是每天有人驻足、有人传播、有人消费的生活方式。',
      badge: '可带媒体来',
    },
  ];

  return (
    <PageD label="25 附录A" runhead={{ left: '附录 A · 为政府而写', right: 'FOR GOVERNMENT' }} folio="116">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="eyebrow eyebrow-en" style={{ marginBottom: 8 }}>APPENDIX A · 为政府而写</div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 700, fontSize: 38,
          margin: '0 0 6px', lineHeight: 1.1,
        }}>
          庙街小巷<br />
          <span style={{ color: 'var(--vermilion)', fontSize: 30 }}>AI 驱动的烟火民生</span>
        </h2>
        <p className="body" style={{ color: 'var(--smoke)', marginBottom: 16, fontSize: 13 }}>
          把 AI 嵌进真实的城市民生场景——让政府有数据、商家有流量、居民有温度。
        </p>

        <div className="rule-thick" style={{ marginBottom: 16 }} />
        <div className="eyebrow" style={{ marginBottom: 12 }}>三个政府价值维度</div>

        {/* 三个价值 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {govValues.map((g, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr',
              gap: 16, padding: '12px 0', borderBottom: '1px solid var(--rule)',
              alignItems: 'start',
            }}>
              <div style={{ paddingTop: 2 }}>
                <div style={{
                  fontFamily: 'var(--serif-en)', fontSize: 22, fontWeight: 600,
                  color: 'var(--vermilion)', lineHeight: 1, marginBottom: 8,
                }}>{g.n}</div>
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.12em',
                  background: 'var(--ink)', color: 'var(--paper)',
                  padding: '3px 6px', whiteSpace: 'nowrap',
                }}>{g.badge}</span>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                  <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.24em', color: 'var(--smoke-2)' }}>{g.tag}</div>
                  <div style={{ fontFamily: 'var(--sans-en)', fontSize: 9, letterSpacing: '.2em', color: 'var(--smoke-2)' }}>{g.en}</div>
                </div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{g.title}</div>
                <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12.5, lineHeight: 1.72, color: 'var(--smoke)', margin: 0 }}>{g.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 给政府的一句话 */}
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '18px 20px', marginTop: 16,
        }}>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.32em', color: 'var(--gold)', marginBottom: 8, fontWeight: 700 }}>
            给政府的一句话  ·  THE PITCH
          </div>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.8 }}>
            AI 嵌入真实的城市民生场景——每一笔交易留在海口，
            数据服务政府治理，内容放大在地文化，
            让烟火气在数字时代生长成新的<b style={{ color: 'var(--gold)' }}>城市资产</b>。
          </div>
        </div>
      </div>
    </PageD>
  );
}

/* ---- 导出 ---- */
Object.assign(window, {
  Ch5OpenerPage, Ch5Body1Page, Ch5Body2Page,
  Ch6OpenerPage, Ch6BodyPage,
  AppendixAPage,
});
