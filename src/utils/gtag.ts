export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Log the pageview with their URL
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  // @ts-ignore
  window.gtag && window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Log specific events happening.
export const event = ({ action, category, label, value }: { action: string; category?: string; label?: string; value?: number; }) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  // @ts-ignore
  window.gtag && window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
