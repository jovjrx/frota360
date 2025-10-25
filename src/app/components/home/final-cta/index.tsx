"use client"
import { useTranslations } from '@/app/hooks/useTranslations'
import { COMPANY_EMAIL, WHATSAPP_NUMBER } from '@/config/site'

export default function FinalCTA() {
  const { t } = useTranslations('common')
  const title = (t('cta_title') as string) || 'Simplifica a tua operação TVDE'
  const sub = (t('cta_sub') as string) || ''

  return (
    <section id='cta-final' className='scroll-mt-20'>
      <div className='container text-center'>
        <h2 className='text-3xl font-semibold mb-2'>{title}</h2>
        {sub ? <p className='text-white/70 mb-6'>{sub}</p> : null}
        <div className='flex items-center justify-center gap-3'>
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            onClick={() => {
              try {
                // @ts-ignore
                if (typeof window !== 'undefined' && window.gtag) {
                  // @ts-ignore
                  window.gtag('event', 'request_demo_click', { location: 'final_cta', method: 'mailto' })
                }
                // @ts-ignore
                if (typeof window !== 'undefined' && window.fbq) {
                  // @ts-ignore
                  window.fbq('trackCustom', 'RequestDemoClick', { location: 'final_cta', method: 'mailto' })
                }
              } catch (_) {}
            }}
            className='inline-block text-sm font-medium text-white px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary'>
            {t('request_demo')}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            onClick={() => {
              try {
                // @ts-ignore
                if (typeof window !== 'undefined' && window.gtag) {
                  // @ts-ignore
                  window.gtag('event', 'whatsapp_click', { location: 'final_cta' })
                }
                // @ts-ignore
                if (typeof window !== 'undefined' && window.fbq) {
                  // @ts-ignore
                  window.fbq('trackCustom', 'WhatsAppClick', { location: 'final_cta' })
                }
              } catch (_) {}
            }}
            className='inline-block text-sm font-medium text-white px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1DA851]'>
            {t('cta_whatsapp')}
          </a>
        </div>
      </div>
    </section>
  )
}
