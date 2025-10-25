'use client'
import { useTranslations } from '@/app/hooks/useTranslations'
import FeatureRowCard from '@/app/components/ui/FeatureRowCard'
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
  const subtitle = (t('why_frota360.subtitle') as string) || ''
  const cardsData = (t('why_frota360.cards', { returnObjects: true }) as any) || []
  const hasCardsObjects = Array.isArray(cardsData) && cardsData.length > 0 && typeof cardsData[0] === 'object'
  const points = (t('why_frota360.points', { returnObjects: true }) as any) || []
  const listRaw: string[] = Array.isArray(points) ? points : []
  const fallbackCards: Array<{ title: string; desc: string }> = listRaw.slice(0, 2).map((desc: string, i: number) => ({
    title: i === 0 ? 'Seus dados são seus' : 'Crescimento do negócio',
    desc,
  }))
  const cards: Array<{ title: string; desc: string }> = hasCardsObjects ? cardsData : fallbackCards

  const compare = t('why_compare', { returnObjects: true }) as any
  const defaultCols = ['Funcionalidade', 'Concorrente', 'Frota360']
  const defaultRows: Array<{ feature: string; spreadsheet: boolean; frota360: boolean }> = [
    { feature: 'Website e marca própria', spreadsheet: false, frota360: true },
    { feature: 'Acesso do motorista e painel do gestor', spreadsheet: false, frota360: true },
    { feature: 'Integrações (Uber, Bolt, MyPRIO, Via Verde)', spreadsheet: true, frota360: true },
    { feature: 'Cálculo automático de repasses', spreadsheet: true, frota360: true },
    { feature: 'KPIs e relatórios exportáveis', spreadsheet: true, frota360: true },
    { feature: 'Segurança, RBAC e auditoria', spreadsheet: false, frota360: true },
  ]
  const cols: string[] = Array.isArray(compare?.columns) && compare.columns.length ? compare.columns : defaultCols
  const rows: Array<{ feature: string; spreadsheet: boolean; frota360: boolean }> = Array.isArray(compare?.rows) && compare.rows.length ? compare.rows : defaultRows

  return (
    <section id='comparacao' className='scroll-mt-20 bg-[#0C193C]'>
      <div className='container'>
        <div className='text-center mb-8'>
          <h2 className='font-semibold text-3xl'>{title}</h2>
          {subtitle ? <p className='text-white/70 mt-2'>{subtitle}</p> : null}
        </div>
        {!!cards.length && (
          <div className='grid md:grid-cols-2 gap-6 mb-10 mx-auto'>
            {cards.map((c, i) => (
              <FeatureRowCard
                key={i}
                icon={i === 0 ? 'mdi:shield-check' : 'mdi:trending-up'}
                title={c.title}
                desc={c.desc}
                color={i === 0 ? 'green' : 'blue'}
              />
            ))}
          </div>
        )}
        <div className='rounded-2xl overflow-hidden' data-aos='fade-up' data-aos-duration='600'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-white/10 text-white/80 uppercase text-xs tracking-wide'>
                <tr>
                  <th className='text-left px-4 py-3 font-medium'>{cols[0]}</th>
                  <th className='text-center px-4 py-3 font-medium'>{cols[1]}</th>
                  <th className='text-center px-4 py-3 font-medium'>{cols[2]}</th>
                </tr>
              </thead>
              <tbody className='text-white/90'>
                {rows.map((r, i) => (
                  <tr key={i} className={`border-t border-white/10 transition-colors ${i % 2 === 0 ? 'bg-white/[.03]' : 'bg-transparent'} hover:bg-white/[.06]`}>
                    <td className='px-4 py-3'>{r.feature}</td>
                    <td className='px-4 py-3 text-center'><BoolCell variant='competitor' v={!!r.spreadsheet} /></td>
                    <td className='px-4 py-3 text-center'><BoolCell variant='frota' v={!!r.frota360} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='px-4 py-3 text-white/80 text-xs'>
            * Comparação ilustrativa baseada nos recursos informados publicamente.
          </div>
        </div>
      </div>
    </section>
  )
}
