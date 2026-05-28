import { createClient } from '@supabase/supabase-js';

// gsyen-research 独立数据库（宏观时序 + 政策事件 + 文章）
const researchUrl = 'https://rrwmftbykbwuexietehj.supabase.co';
const researchKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyd21mdGJ5a2J3dWV4aWV0ZWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzAxNTcsImV4cCI6MjA5NTU0NjE1N30.XWgHIzgPaNXw5ok79XGkUTqAL-Nz4z4VWwzxpFsX25s';

export const research = createClient(researchUrl, researchKey);

export interface Article {
  id: string;
  no: number;
  slug: string;
  title: string;
  title_en: string;
  subtitle: string;
  subtitle_en: string;
  author: string;
  author_en: string;
  category: string;
  tags: string[];
  reading_time: number;
  published_at: string;
  is_published: boolean;
}

export interface PolicyEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  event_type: string;
  region: string;
  impact_level: number;
  tags: string[];
  status: string;
  certainty: number;
}

export interface MacroPoint {
  series_id: string;
  series_name: string;
  date: string;
  value: number;
  unit: string;
}
