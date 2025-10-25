import type { Metadata } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale || 'pt'
  try {
    const file = path.join(process.cwd(), 'public', 'locales', locale, 'common.json')
    const raw = await fs.readFile(file, 'utf-8')
    const json = JSON.parse(raw)
    const title: string = json?.seo?.title || 'Frota360'
    const description: string = json?.seo?.description || 'Gestão TVDE white‑label completa.'
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://frota360.pt'

    const languages: Record<string, string> = {
      pt: `${base}/pt`,
      en: `${base}/en`,
      es: `${base}/es`,
      fr: `${base}/fr`,
      it: `${base}/it`,
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${base}/${locale}`,
        siteName: 'Frota360',
        images: ['/logo-64-branco.png'],
        type: 'website',
      },
      alternates: { languages },
    }
  } catch {
    return { title: 'Frota360' }
  }
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return children as any
}
