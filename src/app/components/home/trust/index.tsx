'use client'
import { useTranslations } from '@/app/hooks/useTranslations'

export default function TrustBadges() {
  const { t } = useTranslations('common')
  const badges = (t('trust_badges', { returnObjects: true }) as any) || []
  const list: string[] = Array.isArray(badges) ? badges : []
  if (!list.length) return null
  return (
    <section className='py-8'>
      <div className='container'>
        <ul className='flex flex-wrap gap-3 justify-center'>
          {list.map((b, i) => (
            <li key={i} className='px-4 py-2 rounded-full border border-white/15 text-white/80 bg-white/5'>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
