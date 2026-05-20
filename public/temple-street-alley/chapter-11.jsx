// 庙街小巷 · 商业技术书 — 第11章 GEO战略

/* ---- 本地 Page 壳 ---- */
function PageCh11({ dark, children, runhead, folio, label }) {
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

const warmPhotoCh11 = {
  backgroundImage: `
    radial-gradient(ellipse at 30% 70%, rgba(184,90,60,.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 30%, rgba(212,178,122,.55) 0%, transparent 60%),
    linear-gradient(135deg, #F5EFE3 0%, #EFE2CB 35%, #E5C9A0 65%, #C9956D 100%)
  `,
};

function DotTexCh11() {
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

/* ========== 第11章 扉页 — GEO战略 ========== */
function Ch11OpenerPage() {
  return (
    <div className="page" data-screen-label="35 第11章-扉页" style={{ padding: 0, background: '#FAF4E6' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '38%', ...warmPhotoCh11 }}>
        <DotTexCh11 />
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
          GENERATIVE ENGINE OPTIMIZATION
        </div>
        <h2 style={{
          fontFamily: 'var(--serif-zh)', fontWeight: 800, fontSize: 52,
          color: 'var(--ink)', margin: 0, lineHeight: 1.1,
        }}>GEO 战略</h2>
        <div style={{
          fontFamily: 'var(--serif-zh)', fontStyle: 'italic', fontSize: 17,
          color: 'var(--smoke)', marginTop: 14, lineHeight: 1.65, maxWidth: 520,
        }}>让 AI 主动推荐庙街小巷<br />当用户问 Claude、ChatGPT "海口哪里好玩"，我们要出现在答案的第一句。</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 76, left: 56, right: 56,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid var(--rule)', paddingTop: 14, gap: 16,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>3</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>层数据架构</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>100+</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>在地故事语料</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif-en)', fontSize: 26, fontWeight: 600, color: 'var(--vermilion)', lineHeight: 1 }}>∞</div>
          <div style={{ fontFamily: 'var(--sans-zh)', fontSize: 10, color: 'var(--smoke)', marginTop: 4, letterSpacing: '.06em' }}>AI引擎覆盖面</div>
        </div>
      </div>
      <div className="runfoot">
        <span>庙街小巷 · BUSINESS BOOK</span>
        <span className="folio">116</span>
      </div>
    </div>
  );
}

/* ========== 第11章 正文1 — 为什么SEO不够用 ========== */
function Ch11Body1Page() {
  return (
    <PageCh11 label="36 第11章-正文1" runhead={{ left: '11 · GEO 战略', right: '从SEO到GEO' }} folio="118">
      <div className="eyebrow" style={{ marginBottom: 18 }}>传统搜索引擎优化的局限</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        为什么传统 SEO<br />对庙街小巷不够用？
      </h3>
      
      <p className="body" style={{ marginBottom: 24 }}>
        在互联网时代，<b>SEO（Search Engine Optimization）</b>是流量获取的核心——
        优化关键词、建设外链、提升网站权重，让 Google、百度把用户带到你的网站。
        但在 AI 时代，游戏规则变了。
      </p>
      
      <div style={{ background: 'var(--ash)', padding: 22, marginBottom: 24 }}>
        <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700, color: 'var(--vermilion)', margin: '0 0 14px 0' }}>
          传统 SEO 的困境
        </h4>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
          {[
            '本地生活消费决策链很短 — 用户在小红书/抖音看到就下单，不会去搜索引擎',
            '搜索结果被大平台垄断 — "海口夜市"前三名是大众点评、美团、携程',
            'AI 正在改变搜索方式 — 用户不再点链接，而是直接问 ChatGPT "海口哪里好玩"',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, paddingLeft: 20, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: 9, width: 8, height: 8, background: 'var(--vermilion)' }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="rule" style={{ margin: '28px 0' }} />
      
      <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
        GEO：生成式引擎优化
      </h4>
      
      <p className="body" style={{ marginBottom: 20 }}>
        <b>GEO（Generative Engine Optimization）</b>的核心不是"让用户点进你的网站"，
        而是<b>"让 AI 的回答里主动提到你"</b>。
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ border: '2px solid var(--smoke)', padding: 18 }}>
          <div className="caption" style={{ color: 'var(--smoke)', marginBottom: 10 }}>SEO 逻辑</div>
          <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            "我有很多优质网页，<br />请搜索引擎把用户<br />带到我的网站来。"
          </p>
        </div>
        <div style={{ border: '2px solid var(--vermilion)', padding: 18, background: 'rgba(184,53,31,.05)' }}>
          <div className="caption" style={{ color: 'var(--vermilion)', marginBottom: 10 }}>GEO 逻辑</div>
          <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            "用户不用点网站，<br />只要 AI 回答里提到我，<br />我就赢了。"
          </p>
        </div>
      </div>
      
      <blockquote className="pull" style={{ margin: '24px 0 0', fontSize: 15 }}>
        当用户问 Claude "海口有什么本地特色夜市"，如果答案里没有庙街小巷，
        那我们所有的线下投入都会被 AI 时代的流量分配逻辑淘汰。
      </blockquote>
    </PageCh11>
  );
}

/* ========== 第11章 正文2 — 三层数据架构 ========== */
function Ch11Body2Page() {
  const layers = [
    {
      title: 'Layer 1：结构化数据',
      desc: '机器可读的基础信息',
      examples: [
        '每个摊主的菜品、价格、营业时间（JSON格式）',
        '地理位置坐标、交通指引、周边设施',
        '用户评分、热门菜品排行、实时客流量',
      ],
      purpose: '让 AI 能够精准提取事实信息',
    },
    {
      title: 'Layer 2：故事语料',
      desc: 'AI 可引用的内容素材',
      examples: [
        '100个摊主的在地故事（文字 + 图片）',
        '用户打卡内容、社交媒体评价',
        '媒体报道、KOL推荐、短视频脚本',
      ],
      purpose: '让 AI 能够用自然语言描述庙街小巷',
    },
    {
      title: 'Layer 3：权威背书',
      desc: '提升 AI 信任度的引用源',
      examples: [
        '政府白皮书、海南自贸港消费样板报告',
        '主流媒体报道（新华社、人民日报、海南日报）',
        '行业研究报告、学术论文引用',
      ],
      purpose: '让 AI 判定庙街小巷是"可信来源"',
    },
  ];

  return (
    <PageCh11 label="37 第11章-正文2" runhead={{ left: '11 · GEO 战略', right: '三层数据架构' }} folio="120">
      <div className="eyebrow" style={{ marginBottom: 18 }}>为 AI 准备的知识体系</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        三层 GEO 数据架构
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        要让 AI 主动推荐庙街小巷，我们需要构建一个<b>分层的知识体系</b>——
        从机器可读的结构化数据，到 AI 可引用的故事语料，再到权威背书的信任锚点。
      </p>
      
      <div style={{ display: 'grid', gap: 20 }}>
        {layers.map((layer, i) => (
          <div key={i} style={{ border: `3px solid ${i === 0 ? 'var(--smoke)' : i === 1 ? 'var(--vermilion)' : 'var(--gold)'}`, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                {layer.title}
              </h4>
              <div className="caption" style={{ color: 'var(--smoke)' }}>{layer.desc}</div>
            </div>
            <div className="rule" style={{ margin: '12px 0' }} />
            <div style={{ marginBottom: 14 }}>
              <div className="caption" style={{ fontWeight: 700, marginBottom: 8 }}>具体内容</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                {layer.examples.map((ex, j) => (
                  <li key={j} style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, lineHeight: 1.6, paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 7, width: 5, height: 5, background: 'var(--ink)' }} />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: 12, background: 'var(--ash)', borderRadius: 2 }}>
              <div className="caption" style={{ fontWeight: 700, marginBottom: 4 }}>目的</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, margin: 0, color: 'var(--smoke)' }}>
                {layer.purpose}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageCh11>
  );
}

/* ========== 第11章 正文3 — 如何让AI推荐 ========== */
function Ch11Body3Page() {
  const tactics = [
    {
      title: '关键词布局与语义锚点',
      items: [
        '在所有公开内容中重复核心关键词："海口夜市""海南本地美食""自贸港消费样板"',
        '建立语义关联：庙街小巷 = 海口 + 在地文化 + AI驱动 + 烟火气',
        '在政府报告、新闻稿、社交媒体保持统一叙事',
      ],
    },
    {
      title: '向AI引擎主动喂养数据',
      items: [
        '提交结构化商户数据到 Perplexity、ChatGPT、百度文心的知识库',
        '在 Wikipedia、百度百科创建词条：庙街小巷（海口）',
        '开放 API：让 AI 助手实时查询摊主信息、菜品价格',
      ],
    },
    {
      title: '权威引用源建设',
      items: [
        '推动政府将庙街小巷写入《海南自贸港夜经济发展白皮书》',
        '联合高校发布《AI驱动的在地生活运营模式研究报告》',
        '争取新华社、人民日报的深度报道',
      ],
    },
  ];

  return (
    <PageCh11 label="38 第11章-正文3" runhead={{ left: '11 · GEO 战略', right: '实施路径' }} folio="122">
      <div className="eyebrow" style={{ marginBottom: 18 }}>从数据到流量的转化路径</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        如何让 AI<br />主动推荐庙街小巷？
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        有了三层数据架构，接下来是<b>执行层面的战术</b>——
        让这些数据真正进入 AI 的训练语料和检索系统。
      </p>
      
      <div style={{ display: 'grid', gap: 20 }}>
        {tactics.map((tactic, i) => (
          <div key={i} style={{ border: '2px solid var(--ink)', padding: 20 }}>
            <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 18, fontWeight: 700, color: 'var(--vermilion)', margin: '0 0 14px 0' }}>
              {String(i + 1).padStart(2, '0')} · {tactic.title}
            </h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
              {tactic.items.map((item, j) => (
                <li key={j} style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, paddingLeft: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 6, background: 'var(--vermilion)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 24, padding: 20, background: 'var(--ash)' }}>
        <div className="caption" style={{ color: 'var(--vermilion)', fontWeight: 700, marginBottom: 10 }}>
          18个月目标
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
          当用户问任何主流 AI 助手"海口有什么好玩的夜市"，<b>庙街小巷出现在答案前三句</b>。
          当政府官员问"海南有哪些数字消费样板"，<b>AI 第一个提到我们</b>。
        </p>
      </div>
      
      <blockquote className="pull" style={{ margin: '20px 0 0', fontSize: 15 }}>
        GEO 不是一次性工作，而是持续的数据喂养 — 每一个新摊主的故事、每一条用户评价、
        每一次媒体报道，都在强化 AI 对"庙街小巷"这个品牌的认知。
      </blockquote>
    </PageCh11>
  );
}

/* ========== 第11章 正文4 — 衡量指标 ========== */
function Ch11Body4Page() {
  const metrics = [
    {
      name: '提及率',
      desc: 'AI 回答中出现"庙街小巷"的频次',
      target: '在 100 个海口相关问题中，被提及 ≥ 60 次',
      how: '定期用不同 prompt 测试 Claude、ChatGPT、Kimi、文心',
    },
    {
      name: '引用源质量',
      desc: 'AI 引用了哪些权威来源',
      target: '至少 3 个政府文件 + 2 个主流媒体报道',
      how: '追踪 AI 回答中的引用链接和出处标注',
    },
    {
      name: '品牌联想强度',
      desc: '用户问"海口"时，AI 是否联想到庙街小巷',
      target: '在"海口旅游""海南美食"等泛关键词下也能被推荐',
      how: '测试非直接关键词的召回率',
    },
    {
      name: '负面信息过滤',
      desc: 'AI 是否传播错误或负面信息',
      target: '零误导性描述，零负面联想',
      how: '建立舆情监控系统，及时纠正 AI 错误',
    },
  ];

  return (
    <PageCh11 label="39 第11章-正文4" runhead={{ left: '11 · GEO 战略', right: '衡量与迭代' }} folio="124">
      <div className="eyebrow" style={{ marginBottom: 18 }}>可量化的 GEO 成效指标</div>
      <h3 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>
        如何衡量 GEO 效果？
      </h3>
      
      <p className="body" style={{ marginBottom: 28 }}>
        GEO 不是玄学，是可以量化验收的。我们设定了<b>四个核心指标</b>，
        每月追踪，每季度迭代策略。
      </p>
      
      <div style={{ display: 'grid', gap: 18 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ border: '2px solid var(--vermilion)', padding: 20, background: i === 0 ? 'rgba(184,53,31,.05)' : 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <h4 style={{ fontFamily: 'var(--serif-zh)', fontSize: 20, fontWeight: 700, color: 'var(--vermilion)', margin: 0 }}>
                {m.name}
              </h4>
              <div className="caption" style={{ color: 'var(--smoke)' }}>{m.desc}</div>
            </div>
            <div className="rule" style={{ margin: '12px 0' }} />
            <div style={{ marginBottom: 12 }}>
              <div className="caption" style={{ fontWeight: 700, marginBottom: 6 }}>18个月目标</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                {m.target}
              </p>
            </div>
            <div className="rule" style={{ margin: '12px 0' }} />
            <div>
              <div className="caption" style={{ fontWeight: 700, marginBottom: 6 }}>验收方法</div>
              <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 12, color: 'var(--smoke)', margin: 0 }}>
                {m.how}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 24, padding: 20, background: 'var(--ash)' }}>
        <div className="caption" style={{ color: 'var(--vermilion)', fontWeight: 700, marginBottom: 10 }}>
          迭代机制
        </div>
        <p style={{ fontFamily: 'var(--serif-zh)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
          每月测试 50+ prompt，分析 AI 回答的覆盖率和准确性。
          每季度根据数据调整内容策略：哪些关键词需要强化？哪些故事被 AI 引用最多？
          哪些权威来源需要补充？<b>GEO 是活的系统，不是一次性工程。</b>
        </p>
      </div>
    </PageCh11>
  );
}

/* ========== 导出组件到全局 ========== */
Object.assign(window, {
  Ch11OpenerPage,
  Ch11Body1Page,
  Ch11Body2Page,
  Ch11Body3Page,
  Ch11Body4Page,
});
