'use client';
import { useEffect, useState } from 'react';
export default function LocalTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
    f(); const iv = setInterval(f, 15000); return () => clearInterval(iv);
  }, []);
  return <span className="tabular-nums">{t || '--:--'}</span>;
}
