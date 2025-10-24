import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation, useTranslation } from 'next-i18next';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import LanguagePicker from '@/components/ui/LanguagePicker';
import * as gtag from '@/utils/gtag';
import * as fbq from '@/utils/fbpixel';

function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
      fbq.pageview();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Promo bar: free trial */}
      <div className="bg-slate-900 text-white text-sm">
        <div className="container py-2 text-center">
          <a href="#cta" className="hover:underline">
            {t('cta_sub')}
          </a>
        </div>
      </div>
      {/* Global header with language selector */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
        <Container className="h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2">
            <Image src="/logo-horizontal.png" alt="Frota360" width={200} height={60} className="h-10 md:h-12 w-auto" />
          </a>
          <div className="flex items-center gap-3">
            <LanguagePicker />
          </div>
        </Container>
      </header>

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      ) : null}

      {/* Facebook Pixel */}
      {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
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
            `}
          </Script>
          <noscript>
            <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`} />
          </noscript>
        </>
      ) : null}

      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);

