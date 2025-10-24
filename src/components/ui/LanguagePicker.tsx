import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LOCALES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
] as const;

export default function LanguagePicker() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = LOCALES.find(l => l.code === router.locale) ?? LOCALES[0];

  const change = async (lng: string) => {
    if (lng === router.locale) return;
    await router.push(router.asPath, undefined, { locale: lng });
    setOpen(false);
  };

  return (
    <details className="relative" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="list-none cursor-pointer inline-flex items-center gap-2 h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-800 shadow-sm">
        <Image src={`/flags/${current.code}.svg`} alt="" width={18} height={12} className="w-4 h-3" />
        <span className="hidden sm:inline">{current.label}</span>
        <span aria-hidden className="ml-1">▾</span>
      </summary>
      <ul className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-md z-50">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <button
              type="button"
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-100 ${router.locale === l.code ? 'bg-slate-50' : ''}`}
              onClick={() => change(l.code)}
              aria-current={router.locale === l.code ? 'true' : undefined}
            >
              <Image src={`/flags/${l.code}.svg`} alt="" width={18} height={12} className="w-4 h-3" />
              <span>{l.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
