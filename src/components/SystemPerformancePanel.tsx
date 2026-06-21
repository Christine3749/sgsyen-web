import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Cpu, Gauge, HardDrive, MemoryStick, Zap } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

type SystemPerformancePayload = {
  schema?: string;
  updated_at?: string;
  source?: string;
  round_id?: string | null;
  change_label?: string | null;
  hardware?: {
    cpu_name?: string;
    cpu_logical_threads?: number;
    memory_gb?: number;
    gpu_name?: string;
    gpu_memory_gb?: number;
  };
  utilization_summary?: {
    elapsed_seconds?: number | null;
    status?: string;
    target_gpu_utilization_pct?: number;
    gpu?: {
      available?: boolean;
      sample_count?: number;
      utilization_pct_mean?: number;
      utilization_pct_max?: number;
      target_gap_pct?: number;
      memory_used_gb_mean?: number;
      memory_used_gb_max?: number;
      power_watts_mean?: number;
      power_watts_max?: number;
    };
    system?: {
      available?: boolean;
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
    next_actions?: string[];
  };
};

const fallbackPerformance: SystemPerformancePayload = {
  updated_at: '2026-06-21T13:13:00+08:00',
  source: 'DGWM quant_fast_run',
  round_id: 'arch-pytorch-02',
  change_label: 'utilization-report',
  hardware: {
    cpu_name: 'Intel Core i9-14900KF',
    cpu_logical_threads: 32,
    memory_gb: 96,
    gpu_name: 'NVIDIA GeForce RTX 4070 Ti SUPER',
    gpu_memory_gb: 16,
  },
  utilization_summary: {
    elapsed_seconds: 1.087,
    status: 'gpu_below_target',
    target_gpu_utilization_pct: 60,
    gpu: {
      available: true,
      sample_count: 4,
      utilization_pct_mean: 3,
      utilization_pct_max: 3,
      target_gap_pct: 57,
      memory_used_gb_mean: 5.71,
      memory_used_gb_max: 5.71,
      power_watts_mean: 44.5,
      power_watts_max: 44.57,
    },
    system: {
      available: true,
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
    next_actions: ['increase_tensor_residency_and_batch_control_validation'],
  },
};

export default function SystemPerformancePanel() {
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const [payload, setPayload] = useState<SystemPerformancePayload>(fallbackPerformance);
  const [isLiveLoaded, setIsLiveLoaded] = useState(false);

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

  const summary = payload.utilization_summary ?? fallbackPerformance.utilization_summary!;
  const gpu = summary.gpu ?? {};
  const system = summary.system ?? {};
  const accelerator = summary.accelerator ?? {};
  const torchEngine = summary.torch_engine ?? {};
  const hardware = payload.hardware ?? {};
  const updatedAt = useMemo(() => formatDateTime(payload.updated_at, isZh), [payload.updated_at, isZh]);

  const gpuMean = clampPercent(gpu.utilization_pct_mean);
  const gpuTarget = clampPercent(summary.target_gpu_utilization_pct ?? 60);
  const cpuMean = clampPercent(system.cpu_total_pct_mean);
  const memoryMean = clampPercent(system.memory_used_pct_mean);
  const acceleratorHitRate = clampPercent((accelerator.accelerator_hit_rate ?? 0) * 100);

  return (
    <section className="border border-[#1D1D1B]/10 bg-white rounded p-4 md:p-5 font-sans select-none">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#1D1D1B]/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A58261]">
            <Activity className="w-3.5 h-3.5" />
            <span>{isZh ? '本地训练设备利用率' : 'Local Training Utilization'}</span>
          </div>
          <h4 className="text-xl md:text-2xl font-serif font-semibold text-[#1D1D1B]">
            {isZh ? 'DGWM CUDA / CPU 实时采样' : 'DGWM CUDA / CPU Runtime Sample'}
          </h4>
          <p className="text-[11px] md:text-xs text-stone-500 leading-relaxed">
            {isZh
              ? `${payload.round_id ?? 'latest'} · ${payload.change_label ?? 'performance'} · ${updatedAt}`
              : `${payload.round_id ?? 'latest'} · ${payload.change_label ?? 'performance'} · ${updatedAt}`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 min-w-0 lg:min-w-[460px]">
          <MetricTile
            icon={<Gauge className="w-3.5 h-3.5" />}
            label={isZh ? 'GPU 均值' : 'GPU Mean'}
            value={`${formatNumber(gpuMean, 1)}%`}
            detail={`${isZh ? '峰值' : 'Peak'} ${formatNumber(gpu.utilization_pct_max, 1)}%`}
            tone="emerald"
          />
          <MetricTile
            icon={<Cpu className="w-3.5 h-3.5" />}
            label={isZh ? 'CPU 均值' : 'CPU Mean'}
            value={`${formatNumber(cpuMean, 1)}%`}
            detail={`${isZh ? '峰值' : 'Peak'} ${formatNumber(system.cpu_total_pct_max, 1)}%`}
            tone="ink"
          />
          <MetricTile
            icon={<MemoryStick className="w-3.5 h-3.5" />}
            label={isZh ? '内存占用' : 'RAM Used'}
            value={`${formatNumber(memoryMean, 1)}%`}
            detail={`${formatNumber(system.memory_available_gb_min, 1)} GB ${isZh ? '可用' : 'free'}`}
            tone="blue"
          />
          <MetricTile
            icon={<Zap className="w-3.5 h-3.5" />}
            label={isZh ? '加速命中' : 'Accel Hit'}
            value={`${formatNumber(acceleratorHitRate, 1)}%`}
            detail={`${torchEngine.backend ?? 'cpu'} · ${torchEngine.dtype ?? 'auto'}`}
            tone="gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5">
        <div className="lg:col-span-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <HardwareLine label={isZh ? '显卡' : 'GPU'} value={hardware.gpu_name ?? torchEngine.device_name ?? 'N/A'} />
            <HardwareLine label={isZh ? '处理器' : 'CPU'} value={hardware.cpu_name ?? 'N/A'} />
            <HardwareLine
              label={isZh ? '显存' : 'VRAM'}
              value={`${formatNumber(gpu.memory_used_gb_mean, 2)} / ${formatNumber(hardware.gpu_memory_gb, 0)} GB`}
            />
            <HardwareLine
              label={isZh ? '系统内存' : 'System RAM'}
              value={`${formatNumber(system.memory_used_pct_mean, 1)}% / ${formatNumber(hardware.memory_gb, 0)} GB`}
            />
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.08em]">
            <span className="border border-[#1D1D1B]/10 rounded bg-stone-50 px-2 py-1 text-stone-600">
              {isLiveLoaded ? (isZh ? '已读取最新采样' : 'Latest sample loaded') : (isZh ? '使用本地兜底采样' : 'Fallback sample')}
            </span>
            <span className="border border-[#1D1D1B]/10 rounded bg-stone-50 px-2 py-1 text-stone-600">
              {isZh ? '样本数' : 'Samples'} {gpu.sample_count ?? system.sample_count ?? 0}
            </span>
            <span className="border border-[#1D1D1B]/10 rounded bg-stone-50 px-2 py-1 text-stone-600">
              {isZh ? '耗时' : 'Elapsed'} {formatDuration(summary.elapsed_seconds)}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <ProgressRow
            label={isZh ? 'GPU 利用率 / 目标' : 'GPU Utilization / Target'}
            value={gpuMean}
            target={gpuTarget}
            valueLabel={`${formatNumber(gpuMean, 1)}% / ${formatNumber(gpuTarget, 0)}%`}
            barClassName="bg-emerald-600"
          />
          <ProgressRow
            label={isZh ? 'CPU 总利用率' : 'CPU Total Utilization'}
            value={cpuMean}
            valueLabel={`${formatNumber(cpuMean, 1)}%`}
            barClassName="bg-[#1D1D1B]"
          />
          <ProgressRow
            label={isZh ? '内存占用' : 'Memory Used'}
            value={memoryMean}
            valueLabel={`${formatNumber(memoryMean, 1)}%`}
            barClassName="bg-blue-600"
          />
          <ProgressRow
            label={isZh ? 'Tensor 加速命中率' : 'Tensor Acceleration Hit Rate'}
            value={acceleratorHitRate}
            valueLabel={`${formatNumber(acceleratorHitRate, 1)}%`}
            barClassName="bg-[#A58261]"
          />
        </div>
      </div>
    </section>
  );
}

function MetricTile({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: 'emerald' | 'ink' | 'blue' | 'gold';
}) {
  const toneClass = {
    emerald: 'text-emerald-700',
    ink: 'text-[#1D1D1B]',
    blue: 'text-blue-700',
    gold: 'text-[#A58261]',
  }[tone];

  return (
    <div className="border border-[#1D1D1B]/10 bg-[#FFFFFF] rounded p-3 min-w-0">
      <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${toneClass}`}>
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="font-mono text-xl font-bold text-[#1D1D1B] mt-2">{value}</div>
      <div className="text-[10px] text-stone-500 mt-1 truncate">{detail}</div>
    </div>
  );
}

function HardwareLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#1D1D1B]/10 bg-stone-50/60 rounded px-3 py-2 min-w-0">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
        <HardDrive className="w-3 h-3" />
        <span>{label}</span>
      </div>
      <div className="font-mono text-[11px] text-[#1D1D1B] font-bold mt-1 truncate">{value}</div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  target,
  valueLabel,
  barClassName,
}: {
  label: string;
  value: number;
  target?: number;
  valueLabel: string;
  barClassName: string;
}) {
  const width = clampPercent(value);
  const targetWidth = target === undefined ? null : clampPercent(target);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-[11px] font-sans">
        <span className="font-bold text-stone-700">{label}</span>
        <span className="font-mono text-stone-600">{valueLabel}</span>
      </div>
      <div className="relative h-2.5 bg-stone-100 rounded overflow-hidden">
        <div className={`absolute left-0 top-0 h-full ${barClassName}`} style={{ width: `${width}%` }} />
        {targetWidth !== null && (
          <div
            className="absolute top-0 bottom-0 w-px bg-[#1D1D1B]/55"
            style={{ left: `${targetWidth}%` }}
          />
        )}
      </div>
    </div>
  );
}

function clampPercent(value: number | undefined | null) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function formatNumber(value: number | undefined | null, digits = 1) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0';
  return value.toFixed(digits);
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
