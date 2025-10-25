'use client'
import { useTranslations } from '@/app/hooks/useTranslations'

export default function Security() {
  const { t } = useTranslations('common')
  const title = t('security.title') || 'Segurança e Confiabilidade'
  const subtitle = t('security.subtitle') || ''
  const items = (t('security.items', { returnObjects: true }) as any) || []
  const list: Array<{ title: string; desc: string }> = Array.isArray(items) ? items : []

  return (
    <section id='security-section' className='scroll-mt-20 relative'>
      <div className='bg-linear-to-r from-secondary to-primary absolute w-full h-full top-0 -left-1/4 blur-390'></div>
      <div className='container relative z-10'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl'>{title}</h2>
          {subtitle && <p className='text-white/60 mt-2'>{subtitle}</p>}
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {list.map((it, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 border ${i % 2 === 0 ? 'bg-secondary/10 border-secondary/20' : 'bg-primary/10 border-primary/20'}`}
            >
              <h5 className='text-white/90 font-medium'>{it.title}</h5>
              <p className='text-white/60 text-sm mt-2'>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
