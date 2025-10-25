'use client'
import { useTranslations } from '@/app/hooks/useTranslations'
import { Icon } from '@iconify/react/dist/iconify.js'

function BoolCell({ v, variant }: { v: boolean; variant: 'competitor' | 'frota' }) {
  // Styles:
  // - Frota360: true = green check, false = red cross
  // - Competitor: false = red cross, true = neutral
  if (variant === 'frota') {
    return (
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${v ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
        {v ? (
          <Icon icon='mdi:check-bold' className='text-green-400 text-lg' />
        ) : (
          <Icon icon='mdi:close-thick' className='text-red-400 text-lg' />
        )}
      </span>
    )
  }
  // competitor
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${v ? 'bg-white/10 border-white/20' : 'bg-red-500/10 border-red-500/30'}`}>
      {v ? (
        <Icon icon='mdi:check-bold' className='text-white/70 text-lg' />
      ) : (
        <Icon icon='mdi:close-thick' className='text-red-400 text-lg' />
      )}
    </span>
  )
}

export default function Why() {
  const { t } = useTranslations('common')
  const title = (t('why_frota360.title') as string) || 'Por que Frota360'
  const points = (t('why_frota360.points', { returnObjects: true }) as any) || []
  const list: string[] = Array.isArray(points) ? points : []

  const compare = t('why_compare', { returnObjects: true }) as any
  const cols: string[] = Array.isArray(compare?.columns) ? compare.columns : ['Funcionalidade', 'Concorrente', 'Frota360']
  const rows: Array<{ feature: string; spreadsheet: boolean; frota360: boolean }> = Array.isArray(compare?.rows) ? compare.rows : []

  return (
    <section id='why-section' className='scroll-mt-20 bg-[#0C193C]'>
      <div className='container'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl'>{title}</h2>
        </div>
        {!!list.length && (
          <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
            {list.map((p, i) => (
              <li key={i} className='rounded-xl border border-white/10 bg-darkmode p-4 text-white/80'>• {p}</li>
            ))}
          </ul>
        )}
        {!!rows.length && (
          <div className='overflow-x-auto'>
            <table className='w-full border border-white/10 rounded-xl overflow-hidden'>
              <thead className='bg-white/5 text-white/70'>
                <tr>
                  <th className='text-left px-4 py-3'>{cols[0]}</th>
                  <th className='text-center px-4 py-3'>{cols[1]}</th>
                  <th className='text-center px-4 py-3'>{cols[2]}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className='border-t border-white/10'>
                    <td className='px-4 py-3 text-white/85'>{r.feature}</td>
                    <td className='px-4 py-3 text-center'><BoolCell variant='competitor' v={!!r.spreadsheet} /></td>
                    <td className='px-4 py-3 text-center'><BoolCell variant='frota' v={!!r.frota360} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='text-white/50 text-xs mt-2'>* Comparação ilustrativa baseada nos recursos informados publicamente.</p>
          </div>
        )}
      </div>
    </section>
  )
}
