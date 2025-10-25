"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '@/utils/gtag';
import * as fbq from '@/utils/fbpixel';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    gtag.pageview(pathname);
    fbq.pageview();
  }, [pathname]);

  return null;
}
