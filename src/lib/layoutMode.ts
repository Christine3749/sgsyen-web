export type SgsyenViewMode = 'classic' | 'panorama';

export const SGSYEN_VIEW_LABELS: Record<SgsyenViewMode, { zh: string; en: string }> = {
  classic: { zh: '经典', en: 'Classic' },
  panorama: { zh: '全景', en: 'Panorama' },
};

export function getSgsyenViewMode(search?: string): SgsyenViewMode {
  const source = search ?? (typeof window !== 'undefined' ? window.location.search : '');
  const params = new URLSearchParams(source);
  const value = (params.get('view') || params.get('layout') || '').toLowerCase();

  if (value === 'classic' || value === 'narrow') return 'classic';
  return 'panorama';
}

export function getPageFrameMaxClass(search?: string) {
  return getSgsyenViewMode(search) === 'classic' ? 'max-w-[1300px]' : 'max-w-[1500px]';
}