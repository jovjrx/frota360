import type { Metadata } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

// Next.js 15: params/searchParams are async. Await before accessing.
export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const { locale = 'pt' } = await params
  try {
    const file = path.join(process.cwd(), 'public', 'locales', locale, 'common.json')
    const raw = await fs.readFile(file, 'utf-8')
    const json = JSON.parse(raw)
    const brand: string = json?.brand || 'Frota360'
  const title: string = json?.seo?.title || 'Frota360'
  const description: string = json?.seo?.description || 'Gestão TVDE white‑label completa.'
  const iconPath: string = typeof json?.seo?.icon === 'string' && json.seo.icon ? json.seo.icon : '/logo-64-branca.png'
    const keywords: string[] = Array.isArray(json?.seo?.keywords) ? json.seo.keywords : []
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://frota360.pt'

    const languages: Record<string, string> = {
      pt: `${base}/pt`,
      en: `${base}/en`,
      es: `${base}/es`,
      fr: `${base}/fr`,
      it: `${base}/it`,
    }

    return {
      applicationName: brand,
      title,
      description,
      keywords: keywords.length ? keywords : undefined,
      icons: {
        icon: iconPath,
        shortcut: iconPath,
        apple: iconPath,
      },
      openGraph: {
        title,
        description,
        url: `${base}/${locale}`,
        siteName: brand,
        images: [iconPath],
        type: 'website',
        locale,
        alternateLocale: Object.keys(languages).filter(l => l !== locale),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [iconPath],
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
