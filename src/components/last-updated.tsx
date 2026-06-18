'use client';
import { useEffect, useState } from 'react';

function relative(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 1000; // seconds in the past
  if (diff < 45) return 'just now';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (diff >= secs) return rtf.format(-Math.round(diff / secs), unit);
  }
  return 'just now';
}

export function LastUpdated({ date }: { date: Date | string }) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const [rel, setRel] = useState<string | null>(null);
  useEffect(() => {
    setRel(relative(d));
    const id = setInterval(() => setRel(relative(d)), 60000);
    return () => clearInterval(id);
  }, [d.getTime()]);
  return (
    <p
      className="text-sm text-fd-muted-foreground"
      style={{ marginTop: '32px', marginBottom: '16px' }}
      suppressHydrationWarning
    >
      Last updated {rel ?? '…'}
    </p>
  );
}
