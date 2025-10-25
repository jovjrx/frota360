'use client'
import React, { useEffect, useRef } from 'react'
import { useTranslations } from '@/app/hooks/useTranslations'

const Banner = () => {
  const { t } = useTranslations('common')

  return (
    <section className='relative pb-0 bg-[#2B2360]' id='home-section'>
      <div className='overflow-hidden'>
        <div className='container lg:pt-20 pt-10 relative'>
          <div className='relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 my-16 items-center'>
              <div className='lg:col-span-7 mb-16' data-aos='fade-up' data-aos-duration='700'>
                <h1 className='mb-4 lg:text-start text-center leading-tight text-4xl md:text-5xl'>
                  {t('hero_title')}
                </h1>
                <p className='text-white/90 text-base md:text-lg font-normal mb-8 max-w-[80%] lg:text-start text-center lg:mx-0 mx-auto'>
                  {t('hero_subtitle')}
                </p>
                <div className='flex align-middle justify-center lg:justify-start gap-4'>
                  <a
                    href={'/#contact'}
                    onClick={() => {
                      try {
                        // @ts-ignore
                        if (typeof window !== 'undefined' && window.gtag) {
                          // @ts-ignore
                          window.gtag('event', 'request_demo_click', { location: 'hero', method: 'form' })
                        }
                        // @ts-ignore
                        if (typeof window !== 'undefined' && window.fbq) {
                          // @ts-ignore
                          window.fbq('trackCustom', 'RequestDemoClick', { location: 'hero', method: 'form' })
                        }
                      } catch (_) {}
                    }}
                    className='text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl cursor-pointer'>
                    {t('request_demo')}
                  </a>
                </div>
              </div>
              <div className='lg:col-span-5 lg:-m-48 -m-20 overflow-hidden flex items-center justify-center' data-aos='fade-up' data-aos-duration='700' data-aos-delay='150'>
                <video
                  className='w-full h-auto max-h-[60vh] object-contain rounded-xl'
                  autoPlay
                  muted
                  playsInline
                  poster='/mockup.png'
                  aria-label='Frota360 mockup video'
                  preload='metadata'
                >
                  <source src='/mockup.mp4' type='video/mp4' />
                  <img src='/mockup.png' alt='Frota360 mockup' className='w-full h-auto' />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed 'Como funciona' modal per request */}
    </section>
  )
}

export default Banner
