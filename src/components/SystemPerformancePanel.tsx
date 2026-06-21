import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Cpu, Gauge, HardDrive, MemoryStick, Zap } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

type SystemPerformancePayload = {
  updated_at?: string;
  source?: string;
  round_id?: string | null;
  change_label?: string | null;
  hardware?: {
    cpu_name?: string;
    cpu_logical_threads?: number;
    cpu_worker_threads?: number;
    memory_gb?: number;
    gpu_name?: string;
    gpu_memory_gb?: number;
    gpu_count?: number;
    gpu_driver_version?: string;
    cuda_version?: string;
    gpu_compute_capability?: string;
    platform_system?: string;
    platform_machine?: string;
    accelerator_family?: string;
  };
  utilization_summary?: {
    elapsed_seconds?: number | null;
    target_gpu_utilization_pct?: number;
    gpu?: {
      sample_count?: number;
      utilization_pct_mean?: number;
      utilization_pct_max?: number;
      memory_used_gb_mean?: number;
      memory_used_gb_max?: number;
      power_watts_mean?: number;
      power_watts_max?: number;
    };
    system?: {
      sample_count?: number;
      cpu_total_pct_mean?: number;
      cpu_total_pct_max?: number;
      memory_used_pct_mean?: number;
      memory_used_pct_max?: number;
      memory_available_gb_min?: number;
    };
    torch_engine?: {
      backend?: string;
      device?: string;
      device_name?: string;
      dtype?: string;
      accelerated?: boolean;
    };
    accelerator?: {
      backend?: string;
      calls?: number;
      accelerator_calls?: number;
      cuda_calls?: number;
      fallback_calls?: number;
      accelerator_hit_rate?: number;
      accelerator_time_share?: number;
      accelerator_input_element_share?: number;
      accelerator_output_element_share?: number;
    };
  };
};

type QuantRunPayload = {
  run_date?: string;
  generated_at?: string;
  workload?: {
    name?: string;
    snapshot_date?: string;
    validation_scope?: string;
    model_path?: string;
  };
  results?: Array<{
    index_key?: string;
    label?: string;
    trade_date?: string;
    sample_count?: number;
    model_return_pct?: number | null;
    highflyer_return_pct?: number | null;
    aqr_return_pct?: number | null;
    model_drawdown_pct?: number | null;
    model_max_drawdown_pct?: number | null;
    highflyer_excess_return_pct?: number | null;
    aqr_excess_return_pct?: number | null;
  }>;
};

const fallbackPerformance: SystemPerformancePayload = {
  updated_at: '2026-06-21T13:13:00+08:00',
  source: 'DGWM quant_fast_run',
  round_id: 'latest',
  change_label: 'hardware-resource-call',
  hardware: {
    cpu_name: 'Intel Core i9-14900KF',
    cpu_logical_threads: 32,
    cpu_worker_threads: 28,
    memory_gb: 96,
    gpu_name: 'NVIDIA GeForce RTX 4070 Ti SUPER',
    gpu_memory_gb: 16,
    gpu_count: 1,
    gpu_driver_version: '595.79',
    cuda_version: '13.2',
    gpu_compute_capability: '8.9',
    platform_system: 'Windows',
    platform_machine: 'AMD64',
    accelerator_family: 'nvidia-cuda',
  },
  utilization_summary: {
    elapsed_seconds: 1.087,
    target_gpu_utilization_pct: 60,
    gpu: {
      sample_count: 4,
      utilization_pct_mean: 3,
      utilization_pct_max: 3,
      memory_used_gb_mean: 5.71,
      memory_used_gb_max: 5.71,
      power_watts_mean: 44.5,
      power_watts_max: 44.57,
    },
    system: {
      sample_count: 4,
      cpu_total_pct_mean: 20.69,
      cpu_total_pct_max: 59.63,
      memory_used_pct_mean: 45.2,
      memory_used_pct_max: 45.25,
      memory_available_gb_min: 52.46,
    },
    torch_engine: {
      backend: 'cuda',
      device: 'cuda:0',
      device_name: 'NVIDIA GeForce RTX 4070 Ti SUPER',
      dtype: 'tf32',
      accelerated: true,
    },
    accelerator: {
      backend: 'cuda',
      calls: 2,
      accelerator_calls: 2,
      cuda_calls: 2,
      fallback_calls: 0,
      accelerator_hit_rate: 1,
      accelerator_time_share: 1,
      accelerator_input_element_share: 1,
      accelerator_output_element_share: 1,
    },
  },
};

const fallbackRunReport: QuantRunPayload = {
  run_date: '2026-06-21',
  generated_at: '2026-06-21T21:54:16+08:00',
  workload: {
    name: '沪深300 + 中证500 完整 validation',
    snapshot_date: '2026-06-21',
    validation_scope: '沪深300 + 中证500 同周期完整 validation',
    model_path: 'PyTorch accelerator pipeline',
  },
  results: [
    {
      index_key: 'hs300',
      label: '沪深300',
      trade_date: '2026-06-12',
      sample_count: 124,
      model_return_pct: 24.0591754547,
      highflyer_return_pct: 22.2144530955,
      aqr_return_pct: -4.17306289071,
      model_drawdown_pct: -4.49611313198,
      model_max_drawdown_pct: -5.745214528802311,
      highflyer_excess_return_pct: 1.8447223592279238,
      aqr_excess_return_pct: 28.23223834541312,
    },
    {
      index_key: 'csi500',
      label: '中证500',
      trade_date: '2026-06-12',
      sample_count: 124,
      model_return_pct: 24.7742988242,
      highflyer_return_pct: 22.6822813561,
      aqr_return_pct: -4.17306289071,
      model_drawdown_pct: -5.15803366119,
      model_max_drawdown_pct: -6.5757833925388365,
      highflyer_excess_return_pct: 2.092017468055851,
      aqr_excess_return_pct: 28.94736171491311,
    },
  ],
};

export default function SystemPerformancePanel() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const [payload, setPayload] = useState<SystemPerformancePayload>(fallbackPerformance);
  const [runPayload, setRunPayload] = useState<QuantRunPayload>(fallbackRunReport);
  const [isLiveLoaded, setIsLiveLoaded] = useState(false);
  const [isRunLiveLoaded, setIsRunLiveLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/system/performance/latest.json', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('performance report unavailable'))))
      .then((data: SystemPerformancePayload) => {
        if (!cancelled) {
          setPayload(data);
          setIsLiveLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLiveLoaded(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/quant/runs/latest.json', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('quant run report unavailable'))))
      .then((data: QuantRunPayload) => {
        if (!cancelled) {
          setRunPayload(data);
          setIsRunLiveLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) setIsRunLiveLoaded(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const summary = payload.utilization_summary ?? fallbackPerformance.utilization_summary!;
  const hardware = payload.hardware ?? fallbackPerformance.hardware!;
  const gpu = summary.gpu ?? {};
  const system = summary.system ?? {};
  const accelerator = summary.accelerator ?? {};
  const torchEngine = summary.torch_engine ?? {};

  const updatedAt = useMemo(() => formatDateTime(payload.updated_at, isZh), [payload.updated_at, isZh]);
  const machineClass = classifyMachine(hardware, torchEngine);
  const gpuMean = clampPercent(gpu.utilization_pct_mean);
  const gpuTarget = clampPercent(summary.target_gpu_utilization_pct ?? 60);
  const cpuMean = clampPercent(system.cpu_total_pct_mean);
  const memoryMean = clampPercent(system.memory_used_pct_mean);
  const acceleratorHitRate = clampPercent((accelerator.accelerator_hit_rate ?? 0) * 100);
  const acceleratorTimeShare = clampPercent((accelerator.accelerator_time_share ?? 0) * 100);
  const tensorShare = clampPercent(
    Math.max(accelerator.accelerator_input_element_share ?? 0, accelerator.accelerator_output_element_share ?? 0) * 100
  );

  return (
    <section className="border border-[#1D1D1B] bg-white rounded shadow-sm p-6 font-sans select-none">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Activity className="w-3.5 h-3.5 text-[#A58261] shrink-0" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#A58261] font-bold">
              {isZh ? '本次运算调用资源' : 'Runtime Hardware Resources'}
            </span>
            <span className="hidden sm:inline text-[10px] text-stone-400 font-mono truncate">
              {payload.round_id ?? 'latest'} · {updatedAt}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.08em]">
            <StatusPill label={isLiveLoaded ? (isZh ? '最新采样' : 'latest sample') : (isZh ? '兜底采样' : 'fallback sample')} />
            <StatusPill label={`${torchEngine.backend ?? accelerator.backend ?? 'cpu'} · ${torchEngine.dtype ?? 'auto'}`} />
            <StatusPill label={`${isZh ? '调用' : 'calls'} ${accelerator.calls ?? 0} / CUDA ${accelerator.cuda_calls ?? 0}`} />
          </div>
        </div>

        <RunSummary payload={runPayload} isLiveLoaded={isRunLiveLoaded} isZh={isZh} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 border-t border-[#1D1D1B]/15 pt-4">
          <ResourceCell
            icon={<HardDrive className="w-3.5 h-3.5" />}
            label={isZh ? '设备' : 'Machine'}
            value={machineClass}
          />
          <ResourceCell
            icon={<Zap className="w-3.5 h-3.5" />}
            label={isZh ? 'GPU' : 'GPU'}
            value={`${hardware.gpu_count ?? 0} · ${compactGpuName(hardware.gpu_name ?? torchEngine.device_name)}`}
          />
          <ResourceCell
            icon={<Gauge className="w-3.5 h-3.5" />}
            label={isZh ? 'CUDA / Driver' : 'CUDA / Driver'}
            value={`${hardware.cuda_version ?? 'N/A'} / ${hardware.gpu_driver_version ?? 'N/A'}`}
          />
          <ResourceCell
            icon={<MemoryStick className="w-3.5 h-3.5" />}
            label={isZh ? '显存' : 'VRAM'}
            value={`${formatNumber(gpu.memory_used_gb_mean, 1)} / ${formatNumber(hardware.gpu_memory_gb, 0)} GB`}
          />
          <ResourceCell
            icon={<Cpu className="w-3.5 h-3.5" />}
            label={isZh ? 'CPU' : 'CPU'}
            value={`${formatNumber(cpuMean, 1)}% · ${hardware.cpu_logical_threads ?? 0}T`}
          />
          <ResourceCell
            icon={<MemoryStick className="w-3.5 h-3.5" />}
            label={isZh ? '内存' : 'RAM'}
            value={`${formatNumber(memoryMean, 1)}% / ${formatNumber(hardware.memory_gb, 0)} GB`}
          />
          <ResourceCell
            icon={<Activity className="w-3.5 h-3.5" />}
            label={isZh ? '加速命中' : 'Accel Hit'}
            value={`${formatNumber(acceleratorHitRate, 1)}%`}
          />
          <ResourceCell
            icon={<Gauge className="w-3.5 h-3.5" />}
            label={isZh ? '耗时' : 'Elapsed'}
            value={formatDuration(summary.elapsed_seconds)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <MiniBar
            label={isZh ? 'GPU 利用率 / 目标' : 'GPU Utilization / Target'}
            value={gpuMean}
            target={gpuTarget}
            valueLabel={`${formatNumber(gpuMean, 1)}% / ${formatNumber(gpuTarget, 0)}%`}
          />
          <MiniBar
            label={isZh ? '加速器时间占比' : 'Accelerator Time Share'}
            value={acceleratorTimeShare}
            valueLabel={`${formatNumber(acceleratorTimeShare, 1)}%`}
            semantic="accelerator"
          />
          <MiniBar
            label={isZh ? 'Tensor 常驻比例' : 'Tensor Residency'}
            value={tensorShare}
            valueLabel={`${formatNumber(tensorShare, 1)}%`}
            semantic="accelerator"
          />
        </div>
      </div>
    </section>
  );
}

function RunSummary({
  payload,
  isLiveLoaded,
  isZh,
}: {
  payload: QuantRunPayload;
  isLiveLoaded: boolean;
  isZh: boolean;
}) {
  const results = payload.results?.slice(0, 2) ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_repeat(2,minmax(0,1fr))] gap-4 border-t border-[#1D1D1B]/15 pt-4">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#A58261] font-bold min-w-0">
            <Gauge className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{isZh ? '本次模型结果' : 'Current Quant Run'}</span>
          </div>
          <span className="shrink-0 border border-[#1D1D1B]/15 bg-white rounded px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-stone-500">
            {isLiveLoaded ? (isZh ? '已接入' : 'live') : (isZh ? '预览' : 'preview')}
          </span>
        </div>
        <div className="font-serif text-lg text-[#1D1D1B] mt-1 truncate">{payload.workload?.name ?? 'DGWM validation'}</div>
        <div className="font-mono text-[10px] text-stone-400 mt-1 truncate">
          {payload.run_date ?? '-'} · {payload.workload?.model_path ?? 'PyTorch accelerator pipeline'}
        </div>
      </div>

      {results.map((result) => (
        <div key={result.index_key ?? result.label} className="border border-[#1D1D1B]/10 bg-white rounded px-4 py-3 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-stone-500 truncate">
              {result.label}
            </span>
            <span className="font-mono text-[10px] text-stone-400 shrink-0">{result.trade_date}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <Metric label={isZh ? '模型' : 'Model'} value={formatSignedPercent(result.model_return_pct)} />
            <Metric label="High-Flyer" value={formatSignedPercent(result.highflyer_return_pct)} />
            <Metric label="AQR" value={formatSignedPercent(result.aqr_return_pct)} />
          </div>
          <div className="font-mono text-[10px] text-stone-500 mt-2 truncate">
            {isZh ? '当前回撤' : 'Drawdown'} {formatSignedPercent(result.model_drawdown_pct)} ·{' '}
            {isZh ? '超幻方' : 'vs HF'} {formatSignedPercent(result.highflyer_excess_return_pct)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="font-sans text-[9px] font-bold uppercase tracking-[0.08em] text-stone-400 truncate">{label}</div>
      <div className="font-mono text-[12px] text-[#1D1D1B] font-bold tabular-nums whitespace-nowrap">{value}</div>
    </div>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-9 min-w-[88px] items-center justify-center border border-[#1D1D1B]/15 bg-white rounded px-3 text-stone-500">
      {label}
    </span>
  );
}

function ResourceCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#A58261]">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="font-mono text-[11px] text-[#1D1D1B] font-bold mt-1 truncate">{value}</div>
    </div>
  );
}

function MiniBar({
  label,
  value,
  target,
  valueLabel,
  semantic = 'utilization',
}: {
  label: string;
  value: number;
  target?: number;
  valueLabel: string;
  semantic?: 'utilization' | 'accelerator';
}) {
  const width = clampPercent(value);
  const targetWidth = target === undefined ? null : clampPercent(target);
  const fillStyle = {
    width: `${width}%`,
    minWidth: width > 0 ? '4px' : undefined,
    backgroundColor: semanticBarColor(width, semantic),
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-[10px] font-sans">
        <span className="font-semibold text-[rgba(0,0,0,0.32)] truncate">{label}</span>
        <span className="font-mono font-bold text-[rgba(0,0,0,0.92)] shrink-0 tabular-nums">{valueLabel}</span>
      </div>
      <div className="relative h-[4px] bg-[rgba(0,0,0,0.10)] rounded overflow-hidden">
        <div className="absolute left-0 top-0 h-full" style={fillStyle} />
        {targetWidth !== null && (
          <div className="absolute top-0 bottom-0 w-px bg-[#1D1D1B]/45" style={{ left: `${targetWidth}%` }} />
        )}
      </div>
    </div>
  );
}

function clampPercent(value: number | undefined | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function semanticBarColor(value: number, semantic: 'utilization' | 'accelerator') {
  if (semantic === 'accelerator' && value >= 99.5) return '#166534';
  if (value < 30) return 'rgba(0,0,0,0.18)';
  if (value < 80) return '#1F73D8';
  if (value > 90) return '#B45309';
  return '#1F73D8';
}

function formatNumber(value: number | undefined | null, digits = 1) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0';
  return value.toFixed(digits);
}

function formatSignedPercent(value: number | undefined | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0.00%';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}

function formatDuration(value: number | undefined | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0s';
  if (value < 60) return `${value.toFixed(1)}s`;
  return `${(value / 60).toFixed(1)}m`;
}

function formatDateTime(value: string | undefined, isZh: boolean) {
  if (!value) return isZh ? '未知时间' : 'Unknown time';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(isZh ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function compactGpuName(value: string | undefined) {
  if (!value) return 'N/A';
  return value.replace('NVIDIA GeForce ', '').replace(' SUPER', 'S');
}

function classifyMachine(
  hardware: NonNullable<SystemPerformancePayload['hardware']>,
  torchEngine: NonNullable<NonNullable<SystemPerformancePayload['utilization_summary']>['torch_engine']>,
) {
  const family = `${hardware.accelerator_family ?? ''}`.toLowerCase();
  const gpu = `${hardware.gpu_name ?? torchEngine.device_name ?? ''}`.toLowerCase();
  const machine = `${hardware.platform_machine ?? ''}`.toLowerCase();
  const system = `${hardware.platform_system ?? ''}`.toLowerCase();
  if (family.includes('nvidia') || gpu.includes('nvidia') || gpu.includes('rtx')) return 'NVIDIA CUDA workstation';
  if (family.includes('mps') || (system === 'darwin' && (machine === 'arm64' || machine === 'aarch64'))) return 'Apple Silicon MPS';
  if (family.includes('arm') || machine === 'arm64' || machine === 'aarch64') return 'ARM server';
  return 'CPU workstation';
}
