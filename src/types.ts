export interface ModelPricing {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  inputCostPerMillionLess128k: number;
  outputCostPerMillionLess128k: number;
  inputCostPerMillionMore128k: number;
  outputCostPerMillionMore128k: number;
  cachingDiscount: number; // e.g. 0.75 for 75% off
  maxContext: number;      // tokens
  multimodal: {
    images: number;       // average tokens per image
    audioPerSecond: number; // average tokens per second of audio
    videoPerSecond: number; // average tokens per second of video
  };
  strength: string;
  strengthEn: string;
}

export const GEMINI_MODELS: ModelPricing[] = [
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    nameEn: 'Gemini 1.5 Pro',
    description: '适用于高度复杂的推理、编程和逻辑创意任务，支持最高 200 万超长上下文窗口。',
    descriptionEn: 'Engineered for highly complex reasoning, programming, and strategic logic with an expansive 2-million-token context window.',
    inputCostPerMillionLess128k: 1.25,
    outputCostPerMillionLess128k: 5.00,
    inputCostPerMillionMore128k: 2.50,
    outputCostPerMillionMore128k: 10.00,
    cachingDiscount: 0.75, // 75% off context caching
    maxContext: 2097152,
    multimodal: {
      images: 258,
      audioPerSecond: 25,
      videoPerSecond: 263, // 263 tokens per second of video frame rate default
    },
    strength: '深度多模态推理、复杂算法及数学问题求解、高度结构化实体提取。',
    strengthEn: 'Deep multimodal reasoning, complex algorithms, mathematical proof resolution, and dense structural extraction.'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    nameEn: 'Gemini 1.5 Flash',
    description: '高速度、高性价比的轻量化模型，专为大规模、高频次的密集任务处理而高度优化。',
    descriptionEn: 'High-velocity, light-footprint model optimized with surgical precision for massive-scale, high-frequency dense tasks.',
    inputCostPerMillionLess128k: 0.075,
    outputCostPerMillionLess128k: 0.30,
    inputCostPerMillionMore128k: 0.15,
    outputCostPerMillionMore128k: 0.60,
    cachingDiscount: 0.75,
    maxContext: 1048576,
    multimodal: {
      images: 258,
      audioPerSecond: 25,
      videoPerSecond: 263,
    },
    strength: '极速聊天助手、高频文本分类、大规模文档快速摘要、低成本结构化提取。',
    strengthEn: 'Ultra-low latency conversational agents, high-frequency text classification, large-scale document summaries, and high-efficiency structured extraction.'
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    nameEn: 'Gemini 2.0 Flash',
    description: '下一代 Flash 模型，具有极低延迟、原生实时多模态处理能力及卓越的工具调用（Tool Use）能力。',
    descriptionEn: 'Next-generation Flash model featuring extreme low latency, native real-time multimodal loops, and state-of-the-art Tool Use skills.',
    inputCostPerMillionLess128k: 0.075,
    outputCostPerMillionLess128k: 0.30,
    inputCostPerMillionMore128k: 0.075, // No premium scaling for greater context
    outputCostPerMillionMore128k: 0.30,
    cachingDiscount: 0.75,
    maxContext: 1048576,
    multimodal: {
      images: 258,
      audioPerSecond: 25,
      videoPerSecond: 263,
    },
    strength: '原生实时智能体、高级函数调用（Function Calling）、低延迟流式多领域任务。',
    strengthEn: 'Native real-time agents, advanced Function Calling, and low-latency streaming applications across diverse domains.'
  }
];

export interface WorkloadPreset {
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  textTokens: number;
  imagesCount: number;
  audioMinutes: number;
  videoMinutes: number;
  outputTokens: number;
  useCaching: boolean;
}

export const WORKLOAD_PRESETS: WorkloadPreset[] = [
  {
    name: '分析 200 页财务年报 PDF',
    nameEn: 'Analyze 200-Page Annual Report PDF',
    category: '文档分析',
    categoryEn: 'Document Auditing',
    description: '在包含海量复杂表格、图表和业务指标的季度/年度财务报告 PDF 中搜寻提取核心业务数据。',
    descriptionEn: 'Locate and harvest critical corporate and balance sheet indicators within a massive annual financial PDF report.',
    textTokens: 180000,
    imagesCount: 20,
    audioMinutes: 0,
    videoMinutes: 0,
    outputTokens: 4000,
    useCaching: true // perfect use-case for cache reuse
  },
  {
    name: '1 小时音频讲座录音转录与整理',
    nameEn: 'Transcribe 1-Hr Academic Lecture Audio',
    category: '多模态解析',
    categoryEn: 'Multimodal Analysis',
    description: '将长达一小时的教学讲座、会议发言音频直接输入，要求输出结构化的精美课堂纪要和复习卡片。',
    descriptionEn: 'Feed a raw 60-minute audio presentation of a lecture or town hall to generate beautifully formatted notes & outlines.',
    textTokens: 5000,
    imagesCount: 0,
    audioMinutes: 60,
    videoMinutes: 0,
    outputTokens: 8000,
    useCaching: false
  },
  {
    name: '审计 React 整个代码库源文件',
    nameEn: 'Audit Entire React Workspace Repository',
    category: '软件工程',
    categoryEn: 'Software Engineering',
    description: '读取完整的 React 应用程序或代码仓多文件，以进行深度重构、安全漏洞排查和架构合理性评审。',
    descriptionEn: 'Ingest all core React repo files to perform a deep sweep for architecture bugs, optimizations, and refactoring pathways.',
    textTokens: 550000,
    imagesCount: 0,
    audioMinutes: 0,
    videoMinutes: 0,
    outputTokens: 12000,
    useCaching: true
  },
  {
    name: '10 分钟安全监控视频内容审查',
    nameEn: 'Scan 10-Min Live Security Video',
    category: '多模态解析',
    categoryEn: 'Multimodal Analysis',
    description: '直接输入高分辨率监控摄像头拍摄的安全警报视频，识别和定位异常活动的时间戳及具体场景。',
    descriptionEn: 'Extract and tag precise timestamps representing irregular movements or anomalies within high-definition CCTV streams.',
    textTokens: 2000,
    imagesCount: 0,
    audioMinutes: 0,
    videoMinutes: 10,
    outputTokens: 1500,
    useCaching: false
  },
  {
    name: '单次标准客服对话（客户代理）',
    nameEn: 'Standard Customer Chat Request (Agent)',
    category: '用户交互',
    categoryEn: 'User Interaction',
    description: '模拟终端用户向 AI 客服提出的单个标准业务咨询，获取简短、精炼的个性化退换货政策指导。',
    descriptionEn: 'Simulate a single high-frequency end-user ticket seeking brief, custom instruction regarding refund or return parameters.',
    textTokens: 1200,
    imagesCount: 0,
    audioMinutes: 0,
    videoMinutes: 0,
    outputTokens: 350,
    useCaching: false
  }
];

export interface ArticleContent {
  slug: string;
  title: string;
  titleEn: string;
  author: string;
  authorEn: string;
  date: string;
  dateEn: string;
  content: string;
  contentEn: string;
  subtitle: string;
  subtitleEn: string;
}

export const ARTICLES: ArticleContent[] = [
  {
    slug: 'context-density-vram',
    title: '超长上下文窗口背后的二次方物理现实',
    titleEn: 'The Quadratic Reality Behind Infinite Context Windows',
    author: '首席系统架构师',
    authorEn: 'Principal Systems Architect',
    date: '2024 年第三季度',
    dateEn: 'Q3 2024',
    subtitle: '为什么在零状态活跃内存中保持 200 万个 Token 的高可达性需要高昂的芯片算力预备。',
    subtitleEn: 'Why holding 2 million tokens of uncompressed active KV cache requires highly specialized hosting layers and massive silicon cost factors.',
    content: `在评估生成式 AI 的调用成本时，许多软件开发者经常心怀疑问：为什么当模型（例如 Gemini 1.5 Pro）接收的上下文长度跨越 12.8 万（128k）Token 的阈值时，输入费用会按两倍阶梯费率提升？其实，这根源于 Transformer 架构中「注意力机制（Attention Mechanism）」的一个核心数学常识。

在经典 Transformer 的运行模式中，键值缓存（Key-Value Cache，简称 KV Cache）的计算复杂度和内存占用量，均与提示词（Prompt）的长度呈现成【二次方 $O(n^2)$】的比例增长。为了确保模型能够以近乎实时的毫秒级速度，在 200 万个 Token 的浩瀚历史库中做精细横向对比查询，底层服务器集群绝对无法将这部分数据随时换页存储 to 磁盘。相反，这数兆兆字节（GB）的动态全局激活矩阵，必须以未压缩状态【持续霸占】多块相互高速互联的 TPU（张量处理器）显存（VRAM）。

这种强悍的显存霸占现象排斥了其他用户对这些芯片卡的公共复用。这意味着，你在支付输入费用时，你不仅仅在为“代码在运行阶段做了多少次前向传播矩阵运算”买单，你更是为“物理硬件在显卡层面上为锁死这部分空间、不让它遭遇提前腾退而分摊的硅片专属预定溢价”。`,
    contentEn: `When evaluating generative pricing structures, software engineers frequently ask: why does the input tariff double once the context scales past the 128,000 threshold for models like Gemini 1.5 Pro? The answer resides inside a fundamental mathematical reality of Transformer self-attention.

In standard Transformer setups, memory buffers holding Key-Value matrices (the "KV Cache") grow quadratically ($O(n^2)$) relative to sequence size. To preserve millisecond-grade random retrieval lookups across 2 million parameters with close-to-zero dropout, these high-dimensional arrays cannot reside on storage drives or standard system memory. They must persist continuously in an uncompressed state across synchronized, distributed TPU (Tensor Processing Unit) board clusters, lock-stepped on multi-gigabyte fiber interconnects.

This constant high-VRAM requirement represents severe structural hardware exclusion: while your session is active, no other workloads can claim those Tensor cores. Consequently, input billing accounts for both standard math execution (forward-pass operations) and the continuous reservation of state-of-the-art silicon memory footprint required to prevent memory eviction.`
  },
  {
    slug: 'tpu-custom-hardware',
    title: '分摊的自研芯片成本 vs 昂贵的通用 GPU 租进',
    titleEn: 'Amortized Bespoke TPUs vs Volatile Merchant GPU Rentals',
    author: '平台基础设施负责人',
    authorEn: 'Head of Infrastructure Engineering',
    date: '2024 年第三季度',
    dateEn: 'Q3 2024',
    subtitle: '揭秘谷歌专属张量处理器（TPU）巨星芯片与研发成本背后的资金摊薄红利。',
    subtitleEn: 'Unveiling Google custom Tensor Processing Unit (TPU) development and the long-range amortization scaling factor behind API tariffs.',
    content: `谷歌并没有使用目前市场上高溢价的第三方标准商用显卡来作为其 Gemini 大模型系列的核心物理算力支撑。在训练、微调和大规模生产环境推理的整个闭环生命周期中，它们运行在谷歌自研的高密度张量处理器——Tensor Processing Units（特别是 TPU v5p, TPU v5e 以及下一代 Trillium 集群）上。

优秀的自研芯片能带来无可比拟的底层技术优化。比如高频宽芯片间互联（Interconnects-ICI）技术可以让成千上万个 TPU 构成一个近乎单体的庞大网格系统，彻底消除了第三方硬件通往 PCI-Express 总线时的物理带宽瓶颈。然而，高复杂度的芯片研发、微架构流片和制程生产背后是一笔相当庞大的长期硬件 R&D 资本投资，需要通过全球各地的 API 调用量在长期运行中逐渐平摊成本。

Gemini 的 API 报价事实上直接吸收并平摊了这些专属芯片硬件世代更迭的摊销费用。这使得在进行单次标准化文本推理时其单价显得稳健扎实，但也正因为这样的硬件独立性，才使 Gemini 拥有惊人的数据吞吐效率上限，和那些“在普通民用服务器网上硬包一层多模态转译器”所根本无法媲美的零丢包多卡协同性能。`,
    contentEn: `Google does not rely on third-party commercial graphic cards subjected to massive hardware retail premiums. At every phase of model design, tuning, and production runtime, Gemini processes data directly on custom Tensor Processing Units (including TPU v5e, TPU v5p, and downstream Trillium architectures).

Bespoke chips unlock specialized optimizations. Our proprietary Interconnect-ICI technology allows thousands of custom nodes to function as a singular, colossal virtual compute engine, fully removing standard PCIe system bottlenecks. However, fabricating multi-layer custom nodes, micro-architecture optimization, and physical tape-out require incredible long-term R&D investment, which must be amortized over billions of global tokens.

API pricing directly scales off this infrastructure amortization schedule. This yields stable pricing baselines for core tokens, while providing data throughput thresholds and zero-packet-drop performance that generic middleware wrappers built on standard civilian GPU instances cannot hope to achieve.`
  },
  {
    slug: 'native-modality-flops',
    title: '神经网络深处原生模态间的协同碰撞',
    titleEn: 'Native Cross-Modal Alignment in Latent Spaces',
    author: '多模态研究部高级总监',
    authorEn: 'Director of Multimodal Cores',
    date: '2024 年第三季度',
    dateEn: 'Q3 2024',
    subtitle: '原生的音画多模态推理为什么比传统文本拼接型方案耗费更多的物理算力（FLOPS）？',
    subtitleEn: 'Why original wave, visual, and script aligned matrices necessitate staggering FLOPS over traditional "wrapped" solutions.',
    content: `许多常见的大模型在处理图像、音频或视频资产时，采取的是一种“拼接工艺（Wrapped Pipeline）”：先使用独立的外部工具（如 OpenAI Whisper 语音转文字，或 OpenAI CLIP 找图框）把多媒体信息转换为文字摘要，再把这些整理好的死板文本灌入传统的纯语言模型。这种策略在行业内被称为“管道式包装多模态”。

然而，Gemini 从架构奠基的第一行代码起，就是按照原生多模态（Native Multimodal Core）的原则开发的。它是把完整的原始波形图、完整的视频多采样帧，和人类词语直接汇聚并输入到同一个隐空间（Latent Space）进行交织联合理解。

当你向它塞入一段视频，模型的每一层神经突触都会在时域改变、空间位移、声调高低、情绪起伏、以及画面中的招牌文字之间同步交叉理解，形成相互印证的神经网络映射，寻找高对比关联。这种惊人的深度对齐解析，需要在底层激活庞大到不可思议的每秒浮点运算量（FLOPS）。处理一秒视频文件（通常会以大约每秒 1 帧的精细度采样）就需要消耗大约 263 个 Token 的等额硬件算力资源，这就决定了它的算力耗费高昂，但也换回了极高水平的视觉逻辑理解保真度。`,
    contentEn: `Many generative platforms process media packets by wrapping multiple siloed models: they run speech records through text converters like Whisper, process image frames through feature extractors like CLIP, and then dump resulting summaries as raw text strings into pure-language models.

Gemini was designed from its core layer up to be fully native (Native Multimodal Core). Visual matrices, waveform samplers, and textual tokens flow simultaneously into a unified latent space, sharing high-level neural pathways and computational layers.

When you process a video scene, the weights examine speech inflections, spatial change vectors, ambient noise, written text, and chronological changes conjointly. This unified cross-attention processing extracts beautiful contextual integrity but naturally consumes astronomical FLOPS (floating-point operations per second). Processing 1 second of cinematic input (sampled around 1 Hz) equivalents to roughly 263 tokens of raw hardware resource, explaining the steep media overhead but providing unmatched spatial-temporal comprehension.`
  }
];
