"use client";
import { usePathname } from 'next/navigation';

const SUPPORTED = ['pt','en','es','it','fr'];

export function useLocale() {
  const pathname = usePathname() || '/pt';
  const seg = pathname.split('/').filter(Boolean)[0];
  return SUPPORTED.includes(seg) ? seg : 'pt';
}
