'use client'
import Image from 'next/image'
import { useTranslations } from '@/app/hooks/useTranslations'

const ICONS: Record<string, string> = {
  uber: '/logos/uber.svg',
  bolt: '/logos/bolt.svg',
  myprio: '/logos/myprio.svg',
  viaverde: '/logos/viaverde.svg',
  cartrack: '/logos/cartrack.svg',
}

export default function Integrations() {
  const { t } = useTranslations('common')
  const names = t('integrations_names', { returnObjects: true }) as Record<string, string>
  const desc = t('integrations_desc', { returnObjects: true }) as Record<string, string>
  const order = (t('integrations_list', { returnObjects: true }) as any) || []
  const keys: string[] = Array.isArray(order)
    ? order.map((n: string) => n.toLowerCase().replace(/\s+/g, ''))
    : Object.keys(names || {})

  return (
    <section id='integrations-section' className='scroll-mt-20'>
      <div className='container'>
        <div className='text-center mb-8'>
          <p className='text-primary font-semibold'>{t('integrations')}</p>
          <h2 className='font-semibold text-3xl mt-1'>{t('integrations_sub')}</h2>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {keys.map((k) => (
            <div key={k} className='rounded-xl border border-white/10 bg-darkmode p-6 flex gap-4 items-start'>
              {ICONS[k] && (
                <Image src={ICONS[k]} alt={names?.[k] || k} width={48} height={48} className='w-12 h-12' />
              )}
              <div>
                <h5 className='text-white/90 font-medium'>{names?.[k] || k}</h5>
                <p className='text-white/50 text-sm'>{desc?.[k] || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
