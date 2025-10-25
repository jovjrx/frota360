'use client'
import React, { useEffect, useRef } from 'react'
import { useTranslations } from '@/app/hooks/useTranslations'

const Banner = () => {
  const { t } = useTranslations('common')
  const rawTitle = (t('hero_title') as string) || ''
  const parts = rawTitle.split(',')
  const first = parts[0]?.trim() || rawTitle
  const second = parts.slice(1).join(',').trim()

  return (
    <section className='relative bg-[#0C193C] min-h-[75vh] md:max-h-[80vh] pb-6 md:pb-0' id='home-section'>
      <div className='overflow-hidden'>
        <div className='container lg:pt-16 pt-8 relative'>
          <div className='relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 items-center min-h-[75vh] py-8 md:py-12'>
              <div className='lg:col-span-7 mb-8 md:mb-10' data-aos='fade-up' data-aos-duration='700'>
                <h1 className='mb-4 lg:text-start text-center leading-tight text-4xl md:text-5xl'>
                  <span>{first}{second ? '' : ''}</span>
                  {second ? (
                    <>
                      <br />
                      <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary'>
                        {second}
                      </span>
                    </>
                  ) : null}
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
                    className='text-xl font-semibold text-[#0C193C] py-4 px-6 lg:px-12 bg-white hover:bg-white/90 rounded-xl cursor-pointer'>
                    {t('request_demo')}
                  </a>
                </div>
              </div>
              <div className='lg:col-span-5 overflow-hidden flex items-center justify-center bg-[#0C193C] rounded-xl h-full' data-aos='fade-up' data-aos-duration='700' data-aos-delay='150'>
                <video
                  className='w-auto h-full max-w-full object-contain rounded-xl bg-[#0C193C]'
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
      {/* Glow effect background */}
      <div className='pointer-events-none absolute -z-10 inset-0'>
        <div className='absolute left-1/2 top-16 -translate-x-1/2 w-[65vw] h-[50vh] bg-gradient-to-r from-primary to-secondary opacity-20 blur-[120px] rounded-full'></div>
      </div>
      {/* Removed 'Como funciona' modal per request */}
    </section>
  )
}

export default Banner
