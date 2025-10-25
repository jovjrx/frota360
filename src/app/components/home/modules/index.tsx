"use client"
import { useTranslations } from '@/app/hooks/useTranslations'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function Modules() {
  const { t } = useTranslations('common')
  const title = (t('modules.title') as string) || 'Módulos e Recursos'
  const subtitle = (t('modules.subtitle') as string) || ''
  const items = (t('modules.items', { returnObjects: true }) as any) || []
  const list: Array<{ title: string; desc?: string }>
    = Array.isArray(items) ? items : []

  return (
    <section id='recursos' className='scroll-mt-20 bg-[#13224F]'>
      <div className='container'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl'>{title}</h2>
          {subtitle ? (
            <p className='text-white/70 mt-2'>{subtitle}</p>
          ) : null}
        </div>
        {!!list.length && (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {list.map((m, i) => {
              const colorClass = i % 2 === 0 ? 'from-primary to-secondary' : 'from-secondary to-primary'
              const icon = (
                i % 8 === 0 ? 'mdi:puzzle' :
                i % 8 === 1 ? 'mdi:account-badge' :
                i % 8 === 2 ? 'mdi:view-dashboard' :
                i % 8 === 3 ? 'mdi:cash-multiple' :
                i % 8 === 4 ? 'mdi:chart-bar' :
                i % 8 === 5 ? 'mdi:calculator-variant' :
                i % 8 === 6 ? 'mdi:shield-check' :
                'mdi:white-balance-sunny'
              )
              return (
                <div
                  key={i}
                  className={`rounded-xl p-5 border ${i % 2 === 0 ? 'bg-primary/10 border-primary/20' : 'bg-secondary/10 border-secondary/20'}`}
                  data-aos='fade-up'
                  data-aos-duration='600'
                  data-aos-delay={String(100 + (i % 3) * 100)}
                >
                  <div className={`rounded-full p-2 w-10 h-10 bg-gradient-to-r ${colorClass} mb-3 flex items-center justify-center`}>
                    <Icon icon={icon} className='text-white text-lg' />
                  </div>
                  <h3 className='text-white font-medium mb-1'>{m.title}</h3>
                  {m.desc ? (
                    <p className='text-white/70 text-sm'>{m.desc}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
