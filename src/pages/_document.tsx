import { Html, Head, Main, NextScript } from 'next/document'

const BRAND1 = process.env.NEXT_PUBLIC_BRAND1 || '#00b4d8';
const BRAND2 = process.env.NEXT_PUBLIC_BRAND2 || '#2d4663';
const BASE = process.env.NEXT_PUBLIC_BASE || '#0f172a';

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
  <style>{` :root{ --brand1:${BRAND1} !important; --brand2:${BRAND2} !important; --base:${BASE} !important; } `}</style>
        <link rel="icon" href="/icone.png" sizes="32x32" />
        <link rel="icon" href="/icone-128.png" sizes="128x128" />
        <link rel="apple-touch-icon" href="/icone-128.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

