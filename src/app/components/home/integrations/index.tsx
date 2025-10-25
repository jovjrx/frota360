'use client'
import { useTranslations } from '@/app/hooks/useTranslations'

const LOGOS: Array<{ src: string; alt: string }> = [
  { src: '/logos/Uber.webp', alt: 'Uber' },
  { src: '/logos/Bolt.webp', alt: 'Bolt' },
  { src: '/logos/Prio.webp', alt: 'MyPRIO' },
  { src: '/logos/Via-Verde.webp', alt: 'Via Verde' },
  { src: '/logos/Cartrack.webp', alt: 'Cartrack' },
  { src: '/logos/BP.webp', alt: 'BP' },
  { src: '/logos/Galp.webp', alt: 'Galp' },
  { src: '/logos/Repsol.webp', alt: 'Repsol' },
  { src: '/logos/edp.webp', alt: 'EDP' },
  { src: '/logos/Auchan.webp', alt: 'Auchan' },
  { src: '/logos/RadiusVelocity.webp', alt: 'Radius Velocity' },
  { src: '/logos/Sfleet.webp', alt: 'SFleet' },
]

export default function Integrations() {
  const { t } = useTranslations('common')

  const title = (t('integrations') as string) || 'Integrações'
  const subtitle = (t('integrations_sub') as string) || ''

  return (
    <section id='integrations-section' className='scroll-mt-20 bg-[#0C193C]'>
      <div className='container'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl text-white'>{title}</h2>
          {subtitle ? <p className='text-white/70 mt-2'>{subtitle}</p> : null}
        </div>
        <div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {LOGOS.map((l, i) => (
              <div key={i} className='rounded-xl px-4 py-3 flex items-center justify-center bg-white shadow'>
                <img src={l.src} alt={l.alt} className='h-10 md:h-12 w-auto object-contain' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
 
