// 庙街小巷 · 商业技术书 — 执行摘要 + 第一至三章

/* ---- 本地 Page 壳（与 app.jsx 保持一致，babel 独立作用域） ---- */
function PageC({ dark, children, runhead, folio, label }) {
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

const warmPhoto1 = {
  backgroundImage: `
    radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
    linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
  `,
};
const warmPhoto2 = {
  backgroundImage: `
    radial-gradient(ellipse at 60% 50%, rgba(212,178,122,.5) 0%, transparent 50%),
    linear-gradient(180deg, #F4EEDF 0%, #EADDC2 55%, #D4B383 100%)
  `,
};

function DotTex() {
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

/* 通用章节扉页 */
function ChOpener({ chNum, enPart, enLabel, zhTitle, subtitle, stats, folio, label }) {
  return (
    <div className="page" data-screen-label={label} style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhoto1 }}>
        <DotTex />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(250,244,230,0) 0%, rgba(250,244,230,.55) 78%, #FAF4E6 100%)',
        }} />
      </div>
      <div className="runhead">
        <span>第{chNum}章 · CHAPTER {enPart}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot" />
          {enLabel}
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
          <span style={{
            display: 'inline-block', width: 16, height: 1,
            background: 'var(--vermilion)', verticalAlign: 'middle', margin: '0 8px',
          }} />
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
              <div style={{
                fontFamily: 'var(--serif-en)', fontSize: 28, fontWeight: 600,
                color: 'var(--vermilion)', lineHeight: 1,
              }}>{s.v}</div>
              <div style={{
                fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)',
                marginTop: 4, letterSpacing: '.06em',
              }}>{s.l}</div>
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

/* ==================== 执行摘要 ==================== */
function ExecSummaryPage() {
  const five = [
    { n: '01', t: '时机唯一', d: '海南自贸港2025年12月18日正式封关，政策红利窗口全面开启，先入场者享受最厚的政策土壤与政府背书。' },
    { n: '02', t: '选址精准', d: '海甸溪北岸，渔港文化底蕴深厚，海南大学对面客群稳定，物理位置不可复制。' },
    { n: '03', t: '标准差异', d: '招商核心标准是「有故事可讲」，不是填铺位，是选合伙人——每一家都在为整体IP加分。' },
    { n: '04', t: '线上补位', d: '20年互联网运营经验 + 10种以上AI工具深度应用能力，这在海南是真正的稀缺资源，是项目的数字化发动机。' },
    { n: '05', t: '可复制性', d: '海口是起点，不是终点。做好了，这是一套可向大湾区、长三角输出的「在地邻里生活」运营模板。' },
  ];
  return (
    <PageC label="05 执行摘要" runhead={{ left: '执行摘要', right: 'EXECUTIVE SUMMARY' }} folio="002">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 顶部定义 */}
        <div style={{ marginBottom: 18 }}>
          <div className="eyebrow eyebrow-en" style={{ marginBottom: 8 }}>EXECUTIVE SUMMARY · 执行摘要</div>
          <h2 style={{
            fontFamily: 'var(--serif-zh)', fontWeight: 700, fontSize: 32,
            margin: '0 0 10px', lineHeight: 1.25,
          }}>
            打造一个让人愿意<span style={{ color: 'var(--vermilion)' }}>反复走进</span>的<br />城市生活探索场。
          </h2>
          <p className="body" style={{ fontSize: 13, marginBottom: 0 }}>
            庙街小巷不是又一个文旅街区，而是一套系统：线下精选有故事的商家，
            线上用AI全域运营持续放大每个故事的传播价值，
            在烟火气中生长人文，在人文中形成流量。
          </p>
        </div>

        {/* 核心公式 */}
        <div style={{
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '14px 20px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 16, marginBottom: 18,
        }}>
          {['流量', '停留', '记忆'].map((w, i) => (
            <React.Fragment key={i}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700 }}>{w}</div>
              {i < 2 && <div style={{ color: 'var(--gold)', fontSize: 22 }}>+</div>}
            </React.Fragment>
          ))}
          <div style={{ color: 'var(--gold)', fontSize: 22 }}>=</div>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700, color: 'var(--gold)' }}>复购</div>
          <div style={{
            marginLeft: 20, fontFamily: 'var(--sans-zh)', fontSize: 10,
            letterSpacing: '.28em', color: '#8B96A8',
          }}>核心公式  ·  CORE FORMULA</div>
        </div>

        {/* 商业模式 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
          <div style={{ borderTop: '2px solid var(--ink)', paddingTop: 10 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>项目位置</div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, fontWeight: 700 }}>
              海口海甸溪北岸<br />海南大学正对面
            </div>
          </div>
          <div style={{ borderTop: '2px solid var(--vermilion)', paddingTop: 10 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>商业模式</div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.65 }}>
              租金 + 数字服务<br />+ IP授权 + 数据资产
            </div>
          </div>
        </div>

        <div className="rule-thick" style={{ marginBottom: 14 }} />
        <div className="eyebrow" style={{ marginBottom: 10 }}>五件最重要的事</div>

        {/* 五件事 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {five.map((f, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '48px 80px 1fr',
              alignItems: 'baseline', gap: 12,
              padding: '10px 0', borderBottom: '1px solid var(--rule)',
            }}>
              <div style={{
                fontFamily: 'var(--serif-en)', fontSize: 20, fontWeight: 600,
                color: 'var(--vermilion)', lineHeight: 1,
              }}>{f.n}</div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, fontWeight: 700 }}>{f.t}</div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.65, color: 'var(--smoke)' }}>{f.d}</div>
            </div>
          ))}
        </div>

        {/* 金句 */}
        <blockquote className="pull" style={{ marginTop: 16, fontSize: 16 }}>
          高级人文烟火气—— 让人忍不住往里走，走进去就不想出来。
        </blockquote>
      </div>
    </PageC>
  );
}

/* ==================== 第一章 扉页 ==================== */
function Ch1OpenerPage() {
  return (
    <ChOpener
      chNum="一" enPart="01" enLabel="Why Now"
      zhTitle={<>为什么是现在</>}
      subtitle="三个时代窗口同时开启，错过这个路口，下一班车不知何时。"
      stats={[
        { v: '5万亿+', l: '中国生鲜零售年规模' },
        { v: '<5%', l: '数字化渗透率' },
        { v: '4.6万家', l: '全国农贸市场' },
        { v: '2025.12.18', l: '自贸港封关日' },
      ]}
      folio="008"
      label="06 第一章扉页"
    />
  );
}

/* ==================== 第一章 正文 ==================== */
function Ch1BodyPage() {
  const windows = [
    {
      n: '01', tag: '政策窗口', en: 'POLICY WINDOW',
      title: '数字中国 × 海南自贸港封关',
      body: '国家力推数字经济与实体经济融合，海南自贸港2025年12月18日正式封关，地方政府有强烈意愿为智慧城市项目背书。这是民营项目能借到「国家信用」的稀有窗口。',
      color: 'var(--ink)',
    },
    {
      n: '02', tag: '技术窗口', en: 'TECH WINDOW',
      title: 'AI 普惠化元年',
      body: '2025—2026年是AI工具真正可用于小团队的第一个完整周期。过去需要10人团队做的内容生产、系统搭建、数据分析，现在1个懂AI的人可以完成。先用先赢，时间差就是护城河。',
      color: 'var(--vermilion)',
    },
    {
      n: '03', tag: '消费窗口', en: 'CONSUMER WINDOW',
      title: '新烟火主义崛起',
      body: '后疫情时代，消费者从追逐标准化连锁转向有温度的在地生活体验。「菜市场咖啡馆」「老街茶饮」「夜市打卡」成为新中产消费关键词。庙街小巷，天然契合这股风潮。',
      color: 'var(--gold)',
    },
  ];

  const pains = [
    ['高额平台抽成 8—15%，7—15天结算，商家缺乏现金流', '去中心化架构，商家数据自留，低抽成'],
    ['数据全被平台拿走，商家没有自己的用户资产', '私域运营，用户沉淀在商家自己手里'],
    ['消费者图文交易，信任建立难，退货率高', '「看着买」视频交易，眼见为实，信任成本归零'],
    ['城市消费数据外流，无法支撑智慧城市建设', '数据本地留存，赋能政府数字治理与GDP增长'],
    ['线上线下割裂，好的线下体验无法转化为传播', '全域内容运营，把每一个邻里故事变成传播资产'],
  ];

  return (
    <PageC label="07 第一章正文" runhead={{ left: '01 · 为什么是现在', right: '三个时代窗口' }} folio="010">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chapter-tag" style={{ marginBottom: 8 }}>
          <span>§</span><span className="num-big">1.1</span><span>三个同时打开的时代窗口</span>
        </div>
        <h3 className="section-title" style={{ fontSize: 26, marginBottom: 14 }}>
          历史上最好的生意，往往是<span style={{ color: 'var(--vermilion)' }}>等出来的</span>。
        </h3>

        {/* 三窗口 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 18 }}>
          {windows.map((w, i) => (
            <div key={i} style={{
              background: w.color === 'var(--ink)' ? 'var(--ink)' : 'var(--paper-2)',
              color: w.color === 'var(--ink)' ? 'var(--paper)' : 'var(--ink)',
              padding: '16px 14px',
              borderTop: `4px solid ${w.color === 'var(--ink)' ? 'var(--gold)' : w.color}`,
            }}>
              <div style={{ fontFamily: 'var(--sans-en)', fontSize: 9, letterSpacing: '.28em', color: w.color === 'var(--ink)' ? 'var(--gold)' : w.color, marginBottom: 6 }}>
                {w.en}
              </div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.28em', color: w.color === 'var(--ink)' ? '#8B96A8' : 'var(--smoke-2)', marginBottom: 10 }}>
                {w.tag}
              </div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 8, lineHeight: 1.35 }}>{w.title}</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.7, margin: 0, color: w.color === 'var(--ink)' ? '#C8BFA9' : 'var(--smoke)' }}>{w.body}</p>
            </div>
          ))}
        </div>

        {/* 痛点对比 */}
        <div className="eyebrow" style={{ marginBottom: 8 }}>传统模式的三大痛点  VS  我们的解法</div>
        <div className="rule-thick" style={{ marginBottom: 10 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ padding: '8px 12px 8px 0', fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.22em', color: 'var(--smoke-2)', fontWeight: 700 }}>传统商业的困境</div>
          <div style={{ padding: '8px 0 8px 12px', fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.22em', color: 'var(--vermilion)', fontWeight: 700 }}>AI邻里生活的回答</div>
        </div>
        {pains.map(([left, right], i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            borderBottom: '1px solid var(--rule)',
            background: i % 2 === 0 ? 'transparent' : 'var(--paper-2)',
          }}>
            <div style={{ padding: '9px 12px 9px 0', fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.55, color: 'var(--smoke)', borderRight: '1px solid var(--rule)' }}>
              {left}
            </div>
            <div style={{ padding: '9px 0 9px 12px', fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.55, color: 'var(--ink)', fontWeight: 500 }}>
              {right}
            </div>
          </div>
        ))}

        <blockquote className="pull" style={{ marginTop: 'auto', fontSize: 15 }}>
          这个瞬间，就是现在。
        </blockquote>
      </div>
    </PageC>
  );
}

/* ==================== 第二章 扉页 ==================== */
function Ch2OpenerPage() {
  return (
    <ChOpener
      chNum="二" enPart="02" enLabel="Why Here"
      zhTitle="为什么是这里"
      subtitle="海口海甸溪北岸，不是众多选项之一。它是唯一的答案。"
      stats={[
        { v: '海南大学', l: '正对面，年轻客群稳定' },
        { v: '渔港', l: '文化底蕴深厚，不可复制' },
        { v: '政府', l: '背景雄厚，关系覆盖全面' },
        { v: '1公里', l: '距白沙门公园' },
      ]}
      folio="022"
      label="08 第二章扉页"
    />
  );
}

/* ==================== 第二章 正文 ==================== */
function Ch2BodyPage() {
  const layers = [
    { tag: '地理价值', body: '海南大学对面，稳定的年轻客群与知识群体，消费力强，内容传播意愿高，是天然的社媒种子用户。' },
    { tag: '文化价值', body: '祭祀文化 + 渔港风情，这是无法复制的在地基因。老海口的记忆、黎族苗族的非遗、海鲜的烟火气，每一样都是内容富矿。' },
    { tag: '政治价值', body: '主导方有大型滨海文旅综合体操盘经验，政府关系覆盖面广，意味着项目有背书、有资源、有保护。这在中国做线下文旅项目是最稀缺的变量。' },
    { tag: '时机价值', body: '海南全岛2025年12月18日正式封关，自贸港红利窗口全面开启。现在进场是占位，三年后进场是跟随。先发优势在文旅项目里往往意味着一切。' },
    { tag: '样板价值', body: '做好了，这里是可复制的模板——三亚、儋州、文昌、琼海，海南每一座有故事的城市，都可以用这套打法激活。' },
  ];

  const moats = [
    { icon: '🏛', t: '政府关系', d: '外人无法速成' },
    { icon: '📍', t: '物理位置', d: '海大对面唯一' },
    { icon: '🎭', t: '在地文化', d: '老海口无法移植' },
    { icon: '⏱', t: '先发时机', d: '封关后的黄金窗口' },
  ];

  return (
    <PageC label="09 第二章正文" runhead={{ left: '02 · 为什么是这里', right: '五层价值 · 四个护城河' }} folio="024">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chapter-tag" style={{ marginBottom: 8 }}>
          <span>§</span><span className="num-big">2.1</span><span>五层价值叠加  ·  为何不可替代</span>
        </div>
        <h3 className="section-title" style={{ fontSize: 24, marginBottom: 4 }}>
          做生意，选址决定 <span style={{ color: 'var(--vermilion)' }}>70%</span> 的成败。
        </h3>
        <p className="body" style={{ color: 'var(--smoke)', marginBottom: 14, fontSize: 13 }}>
          有历史、有靠山、有流量入口、有政策护体——这四件事同时成立的地方，中国不多。
        </p>

        {/* 五层叠加 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 18 }}>
          {layers.map((l, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr',
              padding: '11px 0', borderBottom: '1px solid var(--rule)',
              alignItems: 'start', gap: 16,
            }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, lineHeight: 1.4 }}>
                <span style={{ fontFamily: 'var(--sans-en)', fontSize: 10, color: 'var(--vermilion)', fontWeight: 600, display: 'block', letterSpacing: '.18em', marginBottom: 3 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.tag}
              </div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12.5, lineHeight: 1.7, color: 'var(--smoke)', margin: 0 }}>{l.body}</p>
            </div>
          ))}
        </div>

        {/* 四个护城河 */}
        <div className="eyebrow" style={{ marginBottom: 10 }}>四个护城河  ·  为何外人进不来</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {moats.map((m, i) => (
            <div key={i} style={{
              background: 'var(--ink)', color: 'var(--paper)',
              padding: '16px 14px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{m.icon}</div>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{m.t}</div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, letterSpacing: '.1em', color: '#8B96A8' }}>{m.d}</div>
            </div>
          ))}
        </div>

        <blockquote className="pull" style={{ marginTop: 16, fontSize: 15 }}>
          这不是一个可以靠钱砸出来的位置。<br />
          它是时间 + 关系 + 文化三者同时到位才能换来的席位。
        </blockquote>
      </div>
    </PageC>
  );
}

/* ==================== 第三章 扉页 ==================== */
function Ch3OpenerPage() {
  return (
    <ChOpener
      chNum="三" enPart="03" enLabel="What We Do"
      zhTitle="我们在做什么"
      subtitle="不是又一个文旅街区。是一个城市里，值得被记录的地方。"
      stats={[
        { v: '三层', l: '价值结构：场景·体验·资产' },
        { v: '故事', l: '驱动招商，不是填铺位' },
        { v: 'AI', l: '全域运营为增长引擎' },
        { v: '可复制', l: '向全国输出运营模板' },
      ]}
      folio="034"
      label="10 第三章扉页"
    />
  );
}

/* ==================== 第三章 正文1 — 三层价值 + 业态地图 ==================== */
function Ch3Body1Page() {
  const bizTypes = [
    { pri: 'S', type: '锚点业态', name: '全产业链宠物', status: '已接触', quote: '每一只小动物背后，都是一个家庭的故事。', detail: '从繁育、医疗到美容，一家能讲清楚「人与动物」关系的店。天然高频、强情感连接，是邻里生活最理想的流量发动机。' },
    { pri: 'A', type: '锚点业态', name: '精品茶饮·沿啡系', status: '有资源对接', quote: '慢下来喝一杯，是对自己最好的交代。', detail: '有吧台设计感、有茶器美学、有调茶故事的那种。一杯茶是生活仪式，不是饮料。' },
    { pri: 'A', type: '文化业态', name: '海鲜文创菜市', status: '在地唯一性', quote: '这片海，我们捕了三代。', detail: '赶海渔市与食材加工一体。「看着买」AI视频交易，让千里之外的人也感受到新鲜。' },
    { pri: 'A', type: '文化业态', name: '定制乡村振兴汽水', status: '有方案素材', quote: '把海南的土地，装进一瓶气泡里。', detail: '火山荔汽水、海南胡椒汽水——用本地农产品做成打卡饮品，每一瓶都是地方故事的载体。' },
    { pri: 'B', type: '体验业态', name: '海南腔调剧场', status: '文旅差异化', quote: '祖母唱的那首歌，现在有人想听了。', detail: 'AI辅助琼剧、黎歌苗舞等本土表演展演。每一场都是可传播的文化内容。' },
  ];

  const priColor = { S: 'var(--vermilion)', A: 'var(--ink)', B: 'var(--smoke)' };

  return (
    <PageC label="11 第三章正文" runhead={{ left: '03 · 我们在做什么', right: '三层价值 · 业态地图' }} folio="036">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="chapter-tag" style={{ marginBottom: 8 }}>
          <span>§</span><span className="num-big">3.1</span><span>三层价值结构</span>
        </div>
        <h3 className="section-title" style={{ fontSize: 24, marginBottom: 10 }}>
          每一座城市都有一条街道藏着真正的生活。
        </h3>

        {/* 三层价值 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
          {[
            { t: '看得见的生活场景', sub: '线下空间 · 实体业态', d: '精选入驻商家，每一家背后都有值得讲述的故事。游客走进来，感受的是一种活着的生活方式，不是一个主题公园。' },
            { t: '摸得着的数字体验', sub: '线上运营 · 内容生态', d: '每一家店是一个内容IP，每一个老板是一个故事主角。AI全域运营将线下烟火气转化为抖音、小红书、视频号上的持续流量。' },
            { t: '沉淀下来的数字资产', sub: '数据闭环 · 城市资产', d: '用户行为数据本地留存，形成海口真实消费地图。这份数据资产，是政府治理的工具，也是融资的底牌。' },
          ].map((v, i) => (
            <div key={i} style={{
              padding: '14px 12px', background: 'var(--paper-2)',
              borderTop: `3px solid ${i === 0 ? 'var(--ink)' : i === 1 ? 'var(--vermilion)' : 'var(--gold)'}`,
            }}>
              <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{v.t}</div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9.5, letterSpacing: '.18em', color: 'var(--smoke-2)', marginBottom: 8 }}>{v.sub}</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 11, lineHeight: 1.68, color: 'var(--smoke)', margin: 0 }}>{v.d}</p>
            </div>
          ))}
        </div>

        {/* 业态地图 */}
        <div className="eyebrow" style={{ marginBottom: 8 }}>业态地图  ·  我们招什么样的人</div>
        <div className="rule-thick" style={{ marginBottom: 10 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {bizTypes.map((b, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '24px 60px 1fr auto',
              padding: '9px 0', borderBottom: '1px solid var(--rule)',
              alignItems: 'center', gap: 12,
            }}>
              <div style={{
                fontFamily: 'var(--sans-en)', fontSize: 9, fontWeight: 700, letterSpacing: '.1em',
                color: priColor[b.pri],
              }}>{b.pri}</div>
              <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.12em', color: 'var(--smoke-2)' }}>{b.type}</div>
              <div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{b.name}</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 10.5, color: 'var(--smoke)', fontStyle: 'italic' }}>「{b.quote}」</div>
              </div>
              <span className="tag" style={{ fontSize: 9, whiteSpace: 'nowrap' }}>{b.status}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 14, padding: '12px 16px',
          background: 'rgba(184,53,31,.07)', borderLeft: '3px solid var(--vermilion)',
        }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>招商核心标准  ·  一眼判断「邻里生活的范」</div>
          <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink)' }}>
            最核心的一条：<b>有故事可讲</b>——创始人背后有真实的人生叙事、稀缺性（海南唯一或本地罕见）、有让人想拍照的冲动、老板愿意成为故事的主角。
          </div>
        </div>
      </div>
    </PageC>
  );
}

/* ==================== 第三章 正文2 — 一日游客 ==================== */
function Ch3Body2Page() {
  const day = [
    { t: '早 8:00', c: '赶海市场开档，现捞的海鲜摆上来。本地人和游客一起，看着买，手机扫码视频议价。' },
    { t: '上午', c: '精品茶饮开门，一杯花香乌龙配手作文创。海南大学的学生第一个到，拍了发小红书。' },
    { t: '中午', c: '米其林食阁用本地食材做一顿。游客在等餐，顺手扫码关注了庙街小巷的公众号。' },
    { t: '下午', c: '宠物店里，一只柴犬跟着主人在看诊。这个画面被路过的人拍了，上了抖音同城热门。' },
    { t: '傍晚', c: '海南腔调剧场开演，黎歌从小巷深处传出来。游客停下来，这是他们在海南听过最真实的声音。' },
    { t: '夜晚', c: '定制汽水摊亮灯，火山荔汽水配海甸溪夜景。这瓶汽水，今晚会出现在一千条朋友圈里。' },
  ];

  const compare = [
    ['对比 · 普通商业街区', '填满铺位就算成功，商家是租户', '每一家都是IP合伙人，共同经营同一个故事'],
    ['对比 · 网红打卡地', '靠颜值和营销，两年后过气', '靠故事和社群沉淀真实用户，越老越有味道'],
    ['对比 · 传统文旅景区', '表演给游客看，本地人不来', '本地人每天来，游客来了融入其中'],
  ];

  return (
    <PageC label="12 第三章正文2" runhead={{ left: '03 · 我们在做什么', right: '一日游客 · 与竞品的本质区别' }} folio="044">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, height: '100%' }}>
        {/* 左：一日游客 */}
        <div>
          <div className="chapter-tag" style={{ marginBottom: 8 }}>
            <span>§</span><span className="num-big">3.2</span><span>一个普通游客的一天</span>
          </div>
          <h3 className="section-title" style={{ fontSize: 20, marginBottom: 14 }}>
            庙街小巷，就是这个<span style={{ color: 'var(--vermilion)' }}>邻居</span>。
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {day.map((d, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr',
                gap: 12, padding: '10px 0',
                borderBottom: '1px solid var(--rule)',
                alignItems: 'start',
              }}>
                <div style={{
                  fontFamily: 'var(--sans-en)', fontSize: 10, fontWeight: 700,
                  color: 'var(--vermilion)', letterSpacing: '.04em', paddingTop: 2,
                }}>{d.t}</div>
                <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 12.5, lineHeight: 1.65, color: 'var(--ink)' }}>{d.c}</div>
              </div>
            ))}
          </div>
          <blockquote className="pull" style={{ marginTop: 16, fontSize: 15 }}>
            市场上不缺文旅项目。<br />缺的是一个<b>本地人愿意每天来</b>、<br />外地人来了不想走的地方。
          </blockquote>
        </div>

        {/* 右：竞品对比 */}
        <div>
          <div className="chapter-tag" style={{ marginBottom: 8 }}>
            <span>§</span><span className="num-big">3.3</span><span>与其他文旅项目的本质区别</span>
          </div>
          <h3 className="section-title" style={{ fontSize: 20, marginBottom: 14 }}>
            它不像一个项目，它像一个邻居。
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {compare.map(([label, bad, good], i) => (
              <div key={i} style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
                <div style={{
                  background: 'var(--ink)', color: 'var(--paper)',
                  padding: '6px 12px',
                  fontFamily: 'var(--sans-zh)', fontSize: 9.5, letterSpacing: '.16em', fontWeight: 700,
                }}>{label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div style={{ padding: '10px 12px', borderRight: '1px solid var(--rule)', background: 'rgba(184,53,31,.04)' }}>
                    <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 8.5, letterSpacing: '.18em', color: 'var(--smoke-2)', marginBottom: 4 }}>传统做法</div>
                    <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.6, color: 'var(--smoke)' }}>{bad}</div>
                  </div>
                  <div style={{ padding: '10px 12px', background: 'rgba(160,122,53,.06)' }}>
                    <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 8.5, letterSpacing: '.18em', color: 'var(--gold)', marginBottom: 4 }}>庙街小巷</div>
                    <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 11.5, lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500 }}>{good}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 项目定位总结 */}
          <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '16px 14px' }}>
            <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 9, letterSpacing: '.32em', color: 'var(--gold)', marginBottom: 8, fontWeight: 700 }}>项目定位  ·  POSITIONING</div>
            <div style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.75 }}>
              具备独特探索欲的<b style={{ color: 'var(--gold)' }}>高级人文烟火气</b>——海口海甸溪北岸，一个让人忍不住往里走、走进去就不想出来的城市生活探索场。
            </div>
          </div>
        </div>
      </div>
    </PageC>
  );
}

/* ---- 导出 ---- */
Object.assign(window, {
  ExecSummaryPage,
  Ch1OpenerPage, Ch1BodyPage,
  Ch2OpenerPage, Ch2BodyPage,
  Ch3OpenerPage, Ch3Body1Page, Ch3Body2Page,
});
