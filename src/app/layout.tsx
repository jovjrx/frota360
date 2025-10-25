import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Aoscompo from '@/lib/utils/aos'
import Analytics from './analytics/Analytics'
import Script from 'next/script'
import ScrollToTop from './components/scroll-to-top'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frota360',
  icons: {
    icon: '/logo-64-branco.png',
    shortcut: '/logo-64-branco.png',
    apple: '/logo-64-branco.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt' suppressHydrationWarning>
      <body className={`${font.className}`}>
        <Aoscompo>
          {/* GA4 */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
              `}</Script>
            </>
          ) : null}
          {/* Meta Pixel */}
          {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? (
            <>
              <Script id="fb-pixel" strategy="afterInteractive">{`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}</Script>
              <noscript>
                <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`} />
              </noscript>
            </>
          ) : null}
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  )
}
