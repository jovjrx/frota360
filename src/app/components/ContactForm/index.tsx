'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useTranslations } from '@/app/hooks/useTranslations'

const ContactForm = () => {
  const { t } = useTranslations('common')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    fleet_size: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const required = [formData.name, formData.email, formData.message]
    const isValid = required.every((value) => value.trim() !== '')
    setIsFormValid(isValid)
  }, [formData])
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const reset = () => {
    formData.name = ''
    formData.email = ''
    formData.phone = ''
    formData.company = ''
    formData.fleet_size = ''
    formData.message = ''
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        fleet_size: formData.fleet_size,
        message: formData.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setSubmitted(true)
          setShowThanks(true)
          reset()

          setTimeout(() => {
            setShowThanks(false)
          }, 5000)
        }

        reset()
      })
      .catch((error) => {
        setLoader(false)
        console.log(error.message)
      })
  }
  return (
    <section id='contact' className='scroll-mt-14'>
      <div className='container'>
        <div className='relative'>
          <h2 className='mb-9'>{t('form.title')}</h2>
          <div className='relative border border-lightblue/35 px-6 py-2 rounded-2xl'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-wrap w-full m-auto justify-between'>
              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='name'
                    className='pb-3 inline-block text-base text-lightpurple'>
                    {t('form.name')}
                  </label>
                  <input
                    id='name'
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=''
                    className='w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white'
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'></div>
              </div>
              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='email'
                    className='pb-3 inline-block text-base text-lightpurple'>
                    {t('form.email')}
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='you@email.com'
                    className='w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white'
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'>
                  <label
                    htmlFor='phone'
                    className='pb-3 inline-block text-base text-lightpurple'>
                    {t('form.phone')}
                  </label>
                  <input
                    id='phone'
                    type='tel'
                    name='phone'
                    placeholder='WhatsApp'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white'
                  />
                </div>
              </div>
              <div className='sm:flex gap-6 w-full'>
                <div className='mx-0 my-2.5 flex-1'>
                  <label htmlFor='company' className='pb-3 inline-block text-base text-lightpurple'>
                    {t('form.company')}
                  </label>
                  <input
                    id='company'
                    type='text'
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                    className='w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white'
                  />
                </div>
                <div className='mx-0 my-2.5 flex-1'>
                  <label htmlFor='fleet_size' className='pb-3 inline-block text-base text-lightpurple'>
                    {t('form.fleet_size')}
                  </label>
                  <select
                    id='fleet_size'
                    name='fleet_size'
                    value={formData.fleet_size}
                    onChange={handleChange}
                    className='w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 text-white bg-transparent'>
                    <option value='' className='bg-darkmode'>--</option>
                    {(() => {
                      const opts = t('form.fleet_size_options', { returnObjects: true }) as any
                      const arr = Array.isArray(opts) ? (opts as string[]) : []
                      return arr
                    })().map((opt, i) => (
                      <option key={i} value={opt} className='bg-darkmode'>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='w-full mx-0 my-2.5 flex-1'>
                <label htmlFor='message' className='text-base inline-block text-lightpurple'>
                  {t('form.message')}
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full mt-2 rounded-2xl px-5 py-3 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white'
                  placeholder=''></textarea>
              </div>
              <div className='mx-0 my-2.5 w-full'>
                <button
                  type='submit'
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      !isFormValid || loader
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}>
                  {t('form.submit')}
                </button>
              </div>
            </form>
          </div>
          {showThanks && (
            <div className='text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2'>
              {t('form.success')}
              <div className='w-3 h-3 rounded-full animate-spin border-2 border-lightblue border-t-transparent'></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
