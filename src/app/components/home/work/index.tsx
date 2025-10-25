'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import WorkSkeleton from '../../Skeleton/Work'
import { useTranslations } from '@/app/hooks/useTranslations'

const Work = () => {
  const [workdata, setWorkdata] = useState<Array<{ imgSrc: string; heading: string; subheading: string }>>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslations('common')

  useEffect(() => {
    const list = (t('how_list', { returnObjects: true }) as Array<{ step: string; title: string; desc: string }>) || []
    const mapped = list.map((it, idx) => ({
      imgSrc: ['/images/work/icon-one.svg','/images/work/icon-two.svg','/images/work/icon-three.svg'][idx % 3],
      heading: it.title,
      subheading: it.desc,
    }))
    setWorkdata(mapped)
    setLoading(false)
  }, [])

  return (
    <section id='work-section' className='relative '>
      <div className='bg-banner-image absolute w-full h-full right-auto blur-390' />
      <div className='container'>
        <div className='text-center mb-14'>
          <h2 className='mb-3'>{t('how_it_works')}</h2>
          <p className='text-lightpurple max-w-2xl mx-auto md:text-lg font-normal md:leading-8'>
            {t('how_intro', { returnObjects: false }) || ''}
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-20'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <WorkSkeleton key={i} />)
            : workdata?.map((items, i) => (
                <div
                  className='bg-darkmode border border-darkmode group hover:border-primary hover:scale-105 duration-300 p-8 relative rounded-2xl hover:mb-5'
                  key={i}>
                  <div className='rounded-full flex justify-center absolute -top-10 left-40% p-6 bg-linear-to-r from-primary to-secondary'>
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={44}
                      height={44}
                    />
                  </div>
                  <div>
                    <Image
                      src={'/images/icons/bg-arrow.svg'}
                      alt='arrow-bg'
                      width={85}
                      height={35}
                    />
                  </div>
                  <p className='text-2xl text-white/80 font-semibold text-center mt-8 capitalize'>
                    {items.heading}
                  </p>
                  <p className='text-base font-normal text-white/60 text-center mt-2 overflow-hidden line-clamp-3 group-hover:h-auto group-hover:line-clamp-none transition-all duration-300'>
                    {items.subheading}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Work
