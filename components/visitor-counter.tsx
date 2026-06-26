'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

/* 
  SQL SETUP (Run this in your Supabase SQL Editor):

  -- 1. Table for total statistics
  CREATE TABLE IF NOT EXISTS site_stats (
    id TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  );
  
  -- 2. Insert initial row if not exists
  INSERT INTO site_stats (id, count) 
  VALUES ('total_visitors', 0) 
  ON CONFLICT (id) DO NOTHING;

  -- 3. Table for unique visitors tracking
  CREATE TABLE IF NOT EXISTS visitors (
    visitor_id UUID PRIMARY KEY,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 4. RPC function to safely increment count
  CREATE OR REPLACE FUNCTION increment_visitor_count(vid UUID)
  RETURNS void AS $$
  DECLARE
    last_seen TIMESTAMP WITH TIME ZONE;
  BEGIN
    SELECT last_seen_at INTO last_seen FROM visitors WHERE visitor_id = vid;

    IF last_seen IS NULL THEN
      INSERT INTO visitors (visitor_id, last_seen_at) VALUES (vid, NOW());
      UPDATE site_stats SET count = count + 1 WHERE id = 'total_visitors';
    ELSIF last_seen < NOW() - INTERVAL '30 minutes' THEN
      UPDATE visitors SET last_seen_at = NOW() WHERE visitor_id = vid;
      UPDATE site_stats SET count = count + 1 WHERE id = 'total_visitors';
    END IF;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  Browser requests go through /api/visitor-counter. Do not import the Supabase client here.
*/

export function VisitorCounter() {
  const { t } = useTranslation()
  const [count, setCount] = useState<number>(0)
  const [displayCount, setDisplayCount] = useState<number>(0)

  useEffect(() => {
    let cancelled = false

    async function updateVisitorCount() {
      let vid = localStorage.getItem('site_visitor_id')
      if (!vid) {
        vid = crypto.randomUUID()
        localStorage.setItem('site_visitor_id', vid)
      }

      const response = await fetch('/api/visitor-counter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: vid }),
      })
      const result = await response.json() as { ok?: boolean; count?: unknown }

      if (!cancelled && result.ok && typeof result.count === 'number') {
        setCount(result.count)
        setDisplayCount(result.count)
      }
    }

    updateVisitorCount().catch(() => {
      // Keep the counter quiet if statistics are temporarily unavailable.
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (displayCount < count) {
      const diff = count - displayCount
      const step = Math.max(1, Math.floor(diff / 20))
      const timer = setTimeout(() => {
        setDisplayCount(prev => Math.min(count, prev + step))
      }, 30)
      return () => clearTimeout(timer)
    } else if (displayCount > count) {
      const timer = setTimeout(() => setDisplayCount(count), 30)
      return () => clearTimeout(timer)
    }
  }, [count, displayCount])

  if (count === 0 && displayCount === 0) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-primary-dark/40 px-4 py-2 text-gold transition-[border-color,background-color] duration-200 hover:border-gold/50">
      <Users className="size-4 animate-pulse" />
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{t('ผู้เข้าชม', 'Visitors')}</span>
        <span className="font-mono text-lg font-black tabular-nums">
          {displayCount.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
