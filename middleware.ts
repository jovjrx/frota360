import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const locales = ['pt', 'en', 'es', 'it', 'fr']
const defaultLocale = 'pt'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ignore next internals and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return
  }

  // If path already has a locale, continue
  const hasLocale = locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))
  if (hasLocale) return

  // Redirect base path to default locale
  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|.*\\.\w+$).*)'],
}
