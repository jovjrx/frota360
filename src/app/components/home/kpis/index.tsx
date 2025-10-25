'use client'
import { useTranslations } from '@/app/hooks/useTranslations'

export default function KPIs() {
  const { t } = useTranslations('common')
  const title = t('kpis.title') || 'KPIs & Reports'
  const subtitle = t('kpis.subtitle') || ''
  const cards = (t('kpis.cards', { returnObjects: true }) as any) || []
  const list: Array<{ title: string; items: string[] }> = Array.isArray(cards) ? cards : []
  if (!list.length) return null
  return (
    <section id='kpis-section' className='scroll-mt-20 relative bg-[#13224F]'>
      <div className='bg-linear-to-r from-primary to-secondary absolute w-full h-full top-0 -left-1/4 blur-390'></div>
      <div className='container relative z-10'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl'>{title}</h2>
          {subtitle && <p className='text-white/60 mt-2'>{subtitle}</p>}
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {list.map((c, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 border ${i % 2 === 0 ? 'bg-primary/10 border-primary/20' : 'bg-secondary/10 border-secondary/20'}`}
            >
              <h5 className='text-white/90 font-medium mb-3'>{c.title}</h5>
              <ul className='text-white/60 text-sm space-y-2'>
                {Array.isArray(c.items) && c.items.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
