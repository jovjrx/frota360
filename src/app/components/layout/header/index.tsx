'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import HeaderLink from './navigation/HeaderLink'
import MobileHeaderLink from './navigation/MobileHeaderLink'
import Logo from './logo'
import { useTranslations } from '@/app/hooks/useTranslations'
import LanguageSwitcher from './LanguageSwitcher'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [navlink, setNavLink] = useState<Array<{ label: string; href: string }>>([])
  const { t } = useTranslations('common')

  const navbarRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setNavLink([
      { label: t('menu_comparison'), href: '/#comparacao' },
      { label: t('benefits'), href: '/#recursos' },
      { label: t('footer_contact'), href: '/#contact' },
    ])
  }, [t])

  const handleScroll = () => {
    setSticky(window.scrollY >= 10)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky
          ? 'shadow-lg bg-[#0C193C]/90 backdrop-blur-sm py-4'
          : 'shadow-none py-6'
      }`}>
      <div>
        <div className='container flex items-center justify-between'>
          <Logo />
          <nav className='hidden lg:flex grow items-center gap-8 justify-center ml-14'>
            {navlink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className='flex items-center gap-4'>
            <LanguageSwitcher />
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-lg'
              aria-label='Toggle mobile menu'>
              <span className='block w-6 h-0.5 bg-white'></span>
              <span className='block w-6 h-0.5 bg-white mt-1.5'></span>
              <span className='block w-6 h-0.5 bg-white mt-1.5'></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
          <div className='flex items-center justify-between p-4'>
            <h2 className='text-lg font-bold text-midnight_text'>
              <Logo />
            </h2>
            {/*  */}
            <button
              onClick={() => setNavbarOpen(false)}
              className='hover:cursor-pointer'
              aria-label='Close menu Modal'>
              <Icon
                icon='tabler:currency-xrp'
                className='text-white text-xl hover:text-primary text-24 inline-block me-2'
              />
            </button>
          </div>
          <nav className='flex flex-col items-start p-4 text-white'>
            {navlink.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className='mt-4 flex flex-col space-y-4 w-full'></div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
