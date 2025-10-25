'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { useTranslations } from '@/app/hooks/useTranslations'

const Faq = () => {
  const [faqdata, setFaqdata] = useState<Array<{ heading: string; subheading: string }>>([])
  const { t } = useTranslations('common')

  useEffect(() => {
    const items = (t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>) || []
    setFaqdata(items.map(it => ({ heading: it.q, subheading: it.a })))
  }, [])

  return (
    <section id='faq-section' className='scroll-mt-20 overflow-hidden'>
      <div className='container relative z-10'>
        <h2 className='font-bold text-center mb-5'>{t('faq.title')}</h2>
        {/* Optional description via translations if desired */}
        <div>
          <div className='grid lg:grid-cols-2 items-center'>
            <div>
              <div className='w-full px-4 pt-16'>
                {faqdata?.map((items, i) => (
                  <div
                    className='mx-auto w-full max-w-5xl rounded-2xl bg-darkmode py-8 px-6 mb-5'
                    key={i}>
                    <Disclosure>
                      {({ open }) => (
                        <div>
                          <DisclosureButton className='flex w-full justify-between rounded-lg text-lightpurple sm:px-4 sm:py-2 text-left md:text-2xl font-medium cursor-pointer'>
                            <span>{items.heading}</span>
                            <Icon
                              icon='tabler:chevron-up'
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } text-2xl text-purple-500`}
                            />
                          </DisclosureButton>
                          <DisclosurePanel className='px-4 pt-4 pb-2 md:text-lg text-lightblue font-normal'>
                            {items.subheading}
                          </DisclosurePanel>
                        </div>
                      )}
                    </Disclosure>
                  </div>
                ))}
              </div>
            </div>
            <div className='-m-48 absolute -right-32'>
              <Image
                src={'/images/faq/faq.svg'}
                alt='faq-image'
                width={941}
                height={379}
                className='w-auto sm:block hidden'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
