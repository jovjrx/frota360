"use client"
import { useTranslations } from '@/app/hooks/useTranslations'

export default function CaseStudy() {
  const { t } = useTranslations('common')
  const title = (t('success.title') as string) || 'Casos de Sucesso'
  const industry = (t('success.industry') as string) || ''
  const summary = (t('success.summary') as string) || ''
  const metrics = (t('success.metrics', { returnObjects: true }) as any) || []
  const list: string[] = Array.isArray(metrics) ? metrics : []
  const cta = (t('success.cta') as string) || ''

  return (
    <section id='case-section' className='scroll-mt-20 bg-[#13224F]'>
      <div className='container'>
        <div className='rounded-2xl border border-white/10 bg-darkmode p-6'>
          <div className='mb-3'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            {industry ? <p className='text-white/60 text-sm mt-1'>{industry}</p> : null}
          </div>
          {summary ? <p className='text-white/80 mb-4'>{summary}</p> : null}
          {!!list.length && (
            <ul className='flex flex-wrap gap-2 mb-4'>
              {list.map((m, i) => (
                <li key={i} className='px-3 py-1 rounded-full bg-white/5 text-white/80 text-sm'>{m}</li>
              ))}
            </ul>
          )}
          {cta ? (
            <a href='https://conduz.pt' target='_blank' className='inline-block text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary'>
              {cta}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
