'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import FeaturesSkeleton from '../../Skeleton/Features'
import { useTranslations } from '@/app/hooks/useTranslations'

const Features = () => {
  const [featuresdata, setFeaturesdata] = useState<Array<{ imgSrc: string; heading: string; subheading: string }>>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslations('common')

  useEffect(() => {
    const list = (t('benefits_list', { returnObjects: true }) as Array<{ title: string; desc: string }>) || []
    const icons = ['/images/features/featureOne.svg','/images/features/featureTwo.svg','/images/features/featureThree.svg']
    const mapped = list.map((it, idx) => ({ imgSrc: icons[idx % icons.length], heading: it.title, subheading: it.desc }))
    setFeaturesdata(mapped)
    setLoading(false)
  }, [])
  return (
    <section id='features-section' className='scroll-mt-20'>
      <div className='container relative'>
        <div className='bg-linear-to-r from-primary to-secondary absolute w-full h-full top-0 -left-1/4 blur-390'></div>
        <div className=' gap-x-4 gap-y-4 relative z-10'>
          {/* Column-1 */}
          <div className='mb-10'>
            <p className='text-primary text-base sm:text-lg font-semibold mb-4 text-center'>
              {t('benefits')}
            </p>
            {/* Removed secondary header per request */}
          </div>
          {/* Column-2 */}
          <div>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-4 -right-1/4'>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <FeaturesSkeleton key={i} />
                  ))
                : featuresdata?.map((items, i) => (
                    <div
                      className={`p-8 rounded-lg flex flex-col gap-3 border ${i % 2 === 0 ? 'bg-primary/10 border-primary/20' : 'bg-secondary/10 border-secondary/20'}`}
                      key={i}>
                      <div className='rounded-full bg-linear-to-r from-primary to-secondary w-fit p-4 flex items-center justify-center'>
                        <Image
                          src={items.imgSrc}
                          alt={items.imgSrc}
                          width={60}
                          height={60}
                          className='w-auto'
                        />
                      </div>
                      <h5 className='text-white/80 text-lg font-medium capitalize'>
                        {items.heading}
                      </h5>
                      <p className='text-white/40 text-sm font-normal'>
                        {items.subheading}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
