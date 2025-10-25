"use client"
import { useTranslations } from '@/app/hooks/useTranslations'

export default function CaseStudy() {
  const { t } = useTranslations('common')
  const title = (t('success.title') as string) || 'Casos de Sucesso'
  const industry = (t('success.industry') as string) || ''
  const summary = (t('success.summary') as string) || ''
  const metrics = (t('success.metrics', { returnObjects: true }) as any) || []
  const list: string[] = Array.isArray(metrics) ? metrics : []
  const cta = (t('success.cta') as string) || 'Visitar site'

  return (
    <section id='case-section' className='scroll-mt-20 relative bg-[#13224F]'>
      <div className='bg-linear-to-r from-secondary to-primary absolute w-full h-full top-0 -left-1/4 blur-390'></div>
      <div className='container relative z-10'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl'>{title}</h2>
          {industry ? <p className='text-white mt-2'>{industry}</p> : null}
        </div>
        <div className='rounded-xl p-6 md:p-8 border bg-primary/10 border-primary/20'>
          <div className='flex flex-col md:flex-row items-start gap-6'>
            <a
              href='https://conduz.pt'
              target='_blank'
              rel='noopener noreferrer'
              className='md:shrink-0 inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 hover:shadow-md transition-shadow self-center md:self-auto'
            >
              <img src='/logos/conduz.png' alt='Conduz.pt' className='h-12 md:h-14 w-auto object-contain' />
            </a>
            <div className='flex-1'>
              {summary ? <p className='text-white mb-4'>{summary}</p> : null}
              {!!list.length && (
                <ul className='flex flex-wrap gap-2 mb-4'>
                  {list.map((m, i) => (
                    <li key={i} className='px-3 py-1 rounded-full bg-white text-[#0C193C] text-sm'>
                      {m}
                    </li>
                  ))}
                </ul>
              )}
              <div>
                <a
                  href='https://conduz.pt'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-[#0C193C]'
                >
                  {cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
