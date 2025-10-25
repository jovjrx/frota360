"use client";
import { useEffect, useMemo, useState } from 'react';
import { useLocale } from './useLocale';

function get(obj: any, path: string) {
  return path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

export function useTranslations(ns: string = 'common') {
  const locale = useLocale();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/locales/${locale}/${ns}.json`).then(r => r.json()).then(j => { if(active) setData(j); });
    return () => { active = false; };
  }, [locale, ns]);

  const t = useMemo(() => {
    return (key: string, opts?: { returnObjects?: boolean }) => {
      if (!data) return '';
      const v = get(data, key);
      if (opts?.returnObjects) return v ?? [];
      return typeof v === 'string' ? v : (Array.isArray(v) ? v.join(' ') : (v ?? ''));
    };
  }, [data]);

  return { t, locale };
}
