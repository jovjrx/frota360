export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

export const pageview = () => {
  if (!FB_PIXEL_ID || typeof window === 'undefined') return;
  // @ts-ignore
  window.fbq && window.fbq('track', 'PageView');
};

export const event = (name: string, options: Record<string, any> = {}) => {
  if (!FB_PIXEL_ID || typeof window === 'undefined') return;
  // @ts-ignore
  window.fbq && window.fbq('track', name, options);
};
