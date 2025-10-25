'use client'
import Image from 'next/image'
import { useLocale } from '@/app/hooks/useLocale'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const SUPPORTED = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname() || '/pt'
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const current = useMemo(() => SUPPORTED.find(l => l.code === locale) || SUPPORTED[0], [locale])

  function switchTo(code: string) {
    const parts = pathname.split('/').filter(Boolean)
    if (SUPPORTED.some(l => l.code === parts[0])) {
      parts[0] = code
    } else {
      parts.unshift(code)
    }
    const next = '/' + parts.join('/')
    try {
      // GA4
      // @ts-ignore
      if (typeof window !== 'undefined' && window.gtag) {
        // @ts-ignore
        window.gtag('event', 'language_change', { to: code, from: locale })
      }
      // Meta Pixel
      // @ts-ignore
      if (typeof window !== 'undefined' && window.fbq) {
        // @ts-ignore
        window.fbq('trackCustom', 'LanguageChange', { to: code, from: locale })
      }
    } catch (_) {}
    router.push(next)
    setOpen(false)
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(v => !v)}
        className='flex items-center gap-2 px-3 py-2 rounded-lg bg-darkmode/60 hover:bg-darkmode border border-white/10'>
        <Image src={`/flags/${current.code}.svg`} alt={current.label} width={18} height={18} />
        <span className='text-white text-sm'>{current.label}</span>
      </button>
      {open && (
        <div className='absolute right-0 mt-2 w-36 rounded-md bg-darkmode border border-white/10 shadow-lg z-50'>
          {SUPPORTED.map(l => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 hover:bg-white/10 ${l.code === current.code ? 'opacity-70' : ''}`}>
              <Image src={`/flags/${l.code}.svg`} alt={l.label} width={18} height={18} />
              <span className='text-white text-sm'>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
