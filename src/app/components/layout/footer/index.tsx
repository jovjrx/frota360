'use client'

import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_EMAIL, WHATSAPP_NUMBER } from '@/config/site'
import { useTranslations } from '@/app/hooks/useTranslations'


const Footer = () => {
  const { t } = useTranslations('common')
  const handleWhatsAppClick = () => {
    try {
      // GA4
      // @ts-ignore
      if (typeof window !== 'undefined' && window.gtag) {
        // @ts-ignore
        window.gtag('event', 'whatsapp_click', { location: 'footer' })
      }
      // Meta Pixel
      // @ts-ignore
      if (typeof window !== 'undefined' && window.fbq) {
        // @ts-ignore
        window.fbq('trackCustom', 'WhatsAppClick', { location: 'footer' })
      }
    } catch (_) {}
  }

  return (
    <footer className='bg-body-bg relative pt-10'>
      <div className='bg-linear-to-r from-primary to-secondary hidden lg:block absolute w-full h-full top-0 -left-1/2 blur-390'></div>
      <div className='container relative z-10 pb-16'>
          <div className='grid grid-cols-1 gap-y-10 md:gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8'>
          <div className='lg:col-span-8 sm:col-span-2'>
            <Image src='/logo-horizontal-branca.png' alt='Frota360' width={200} height={54} className='h-12 w-auto mb-4' />
            <p className='text-white/70 text-sm font-normal max-w-2xl leading-7 mb-2'>
              {t('footer_brandline')}
            </p>
          </div>
          {/* Removed company/privacy menu intentionally */}
          <div className='lg:col-span-4'>
            <p className='text-white text-xl font-medium mb-9'>{t('footer_contact')}</p>
        <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
          onClick={handleWhatsAppClick}
          className='text-white/60 hover:text-primary text-sm font-normal mb-6 flex gap-2 w-fit'>
              <Image
                src={'/images/footer/number.svg'}
                alt='number-icon'
                width={20}
                height={20}
              />
              {t('cta_whatsapp')}
            </Link>
            <Link
              href={`mailto:${COMPANY_EMAIL}`}
              className='text-white/60 hover:text-primary text-sm font-normal mb-6 flex gap-2 w-fit'>
              <Image
                src={'/images/footer/email.svg'}
                alt='email-icon'
                width={20}
                height={20}
              />
              {COMPANY_EMAIL}
            </Link>
            {/* Address removed as requested */}
          </div>
        </div>
      </div>
      {/* Footer bottom bar removed; brandline placed under logo */}
    </footer>
  )
}

export default Footer
