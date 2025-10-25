"use client"
import { useTranslations } from '@/app/hooks/useTranslations'

type Employee = {
  id: number
  name: string
  rides: number
  earnings: number
  payout: number
  status: 'pending' | 'paid'
}

const sample: Employee[] = [
  { id: 1, name: 'João Silva', rides: 128, earnings: 1320.5, payout: 1188.45, status: 'paid' },
  { id: 2, name: 'Maria Santos', rides: 97, earnings: 1012.3, payout: 911.07, status: 'pending' },
  { id: 3, name: 'Carlos Lima', rides: 145, earnings: 1528.9, payout: 1376.01, status: 'paid' },
  { id: 4, name: 'Ana Costa', rides: 83, earnings: 872.0, payout: 784.8, status: 'pending' },
]

function money(n: number) {
  return n.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
}

const Table = () => {
  const { t } = useTranslations('common')
  const headers = (t('table.headers', { returnObjects: true }) as any)
  const H: string[] = Array.isArray(headers)
    ? headers
    : ['#', 'Funcionário', 'Corridas', 'Ganhos', 'Pagamento', 'Status']
  const title = t('table.title') || 'Funcionários e Pagamentos'

  return (
    <section id='payments-section' className='scroll-mt-20'>
      <div className='container'>
        <div className='rounded-2xl bg-tablebg p-8 relative z-10 overflow-hidden'>
          <p className='text-white/80 text-2xl'>{title}</p>
          <div className='overflow-x-scroll lg:overflow-auto'>
            <table className='table-auto w-full mt-6 border border-border'>
              <thead>
                <tr className='text-white bg-border rounded-2xl'>
                  <th className='px-4 py-4 font-normal rounded-s-lg text-left'>{H[0]}</th>
                  <th className='px-4 py-4 font-normal text-left'>{H[1]}</th>
                  <th className='px-4 py-4 font-normal text-right'>{H[2]}</th>
                  <th className='px-4 py-4 font-normal text-right'>{H[3]}</th>
                  <th className='px-4 py-4 font-normal text-right'>{H[4]}</th>
                  <th className='px-4 py-4 font-normal text-center rounded-e-lg'>{H[5]}</th>
                </tr>
              </thead>
              <tbody>
                {sample.map((e) => (
                  <tr key={e.id} className='border-b border-b-border'>
                    <td className='px-4 py-4 text-white'>{e.id}</td>
                    <td className='px-4 py-4 text-white'>{e.name}</td>
                    <td className='px-4 py-4 text-white text-right'>{e.rides}</td>
                    <td className='px-4 py-4 text-white text-right'>{money(e.earnings)}</td>
                    <td className='px-4 py-4 text-white text-right'>{money(e.payout)}</td>
                    <td className='px-4 py-4 text-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          e.status === 'paid'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30'
                        }`}
                      >
                        {e.status === 'paid' ? t('table.status.paid') || 'Pago' : t('table.status.pending') || 'Pendente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Table
