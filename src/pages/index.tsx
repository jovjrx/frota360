import Image from 'next/image';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { COMPANY_EMAIL, WHATSAPP_NUMBER } from '@/config/site';
import * as gtag from '@/utils/gtag';
import * as fbq from '@/utils/fbpixel';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    fleetSize: '',
    message: '',
  });
  const locales = ['pt', 'en', 'es', 'it', 'fr'] as const;
  const flags: Record<(typeof locales)[number], string> = {
    pt: '🇵🇹',
    en: '🇬🇧',
    es: '🇪🇸',
    it: '🇮🇹',
    fr: '🇫🇷',
  };
  const handleLocaleChange = async (lng: (typeof locales)[number]) => {
    if (router.locale === lng) return;
    try {
      await router.push(router.asPath, undefined, { locale: lng });
    } catch { }
  };

  const openForm = () => { setShowForm(true); setSuccess(null); setError(null); };
  const closeForm = () => { setShowForm(false); };
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setSuccess(null); setError(null);
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error('Failed');
      setSuccess(t('form.success'));
      setForm({ name: '', email: '', phone: '', company: '', fleetSize: '', message: '' });
    } catch (err) {
      setError(t('form.error'));
    } finally {
      setLoading(false);
    }
  };
  const personas = t('personas', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const benefits = t('benefits_list', { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const howList = t('how_list', { returnObjects: true }) as Array<{ step: string; title: string; desc: string }>;
  const integrations = t('integrations_list', { returnObjects: true }) as string[];
  const offerRef = useRef<HTMLElement | null>(null);
  const successRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sections: Array<{ el: Element | null; label: string }> = [
      { el: offerRef.current, label: 'offer' },
      { el: successRef.current, label: 'success' }
    ];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fbq.event('ViewContent');
          gtag.event({ action: 'view_content', category: 'engagement', label: (e.target as HTMLElement).dataset.label || 'section' });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => { if (s.el) { (s.el as HTMLElement).dataset.label = s.label; io.observe(s.el); } });
    
    // Reveal on scroll
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const ioReveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          ioReveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach((el) => ioReveal.observe(el));

    return () => { io.disconnect(); ioReveal.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={t('seo.title')} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo-fundo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: t('brand'),
              url: 'https://frota360.pt',
              logo: '/logo-fundo.png',
              sameAs: ['https://conduz.pt']
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: t('brand'),
              url: 'https://frota360.pt'
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: (t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a }
              }))
            })
          }}
        />
      </Head>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white text-slate-900 border-b border-slate-200">
        <div className="container flex items-center justify-between h-20">
          <Image src="/logo-horizontal.png" alt={t('brand')} width={320} height={64} className="h-[64px] w-auto" />
          <nav aria-label="Language selector" className="flex items-center gap-2">
            {locales.map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => handleLocaleChange(lng)}
                title={lng.toUpperCase()}
                aria-current={router.locale === lng ? 'true' : undefined}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors border ${router.locale === lng ? 'bg-slate-100 border-slate-300' : 'hover:bg-slate-50 border-transparent'}`}
              >
                <Image src={`/flags/${lng}.svg`} alt={lng} width={24} height={16} className="w-6 h-4" />
                <span className="sr-only">{lng}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-0">
        {/* Hero + Para quem é */}
        <section className="relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image src="/who.png" alt="" fill sizes="100vw" priority className="object-cover object-center" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
          </div>
          <div className="container pt-24 pb-24 min-h-[calc(100vh-80px)] relative z-10 flex items-center">
            <div className="max-w-3xl reveal">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{t('hero_title')}</h1>
              <p className="text-xl text-slate-200 mb-8">{t('hero_subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary" onClick={openForm}>
                  {t('request_demo')}
                </button>
              </div>
            </div>
            {/* Para quem é dentro da primeira section */}
            <div className="mt-20 max-w-3xl reveal">
              <h2 className="text-4xl font-bold mb-6">{t('for_who')}</h2>
              <ul className="space-y-4">
                {personas.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex w-6 h-6 items-center justify-center rounded-full bg-brand1/20 text-brand1">
                      {/* check icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-slate-300 text-sm">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        

        {/* Benefits */}
        <section className="section bg-white/10" ref={successRef as any}>
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">{t('benefits')}</h2>
            <p className="text-center text-slate-300 mb-16">{t('benefits_sub')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((item, i) => (
                <div key={i} className="p-6 rounded-lg border border-white/10">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="relative section">
          <div className="absolute inset-0 z-0">
            <Image src="/how.png" alt="" fill sizes="100vw" className="object-cover object-center" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
          </div>
          <div className="container relative z-10 reveal">
            <h2 className="text-4xl font-bold mb-16 text-center">{t('how_it_works')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howList.map((item, i) => (
                <div key={i} className="text-center reveal">
                  <div className="w-16 h-16 bg-brand1 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="section bg-white/10">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">{t('integrations')}</h2>
            <p className="text-center text-slate-300 mb-16">{t('integrations_sub')}</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-4xl mx-auto">
              {['uber', 'bolt', 'myprio', 'viaverde', 'cartrack'].map((slug) => (
                <div key={slug} className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg border border-white/10 hover:border-brand1 transition-colors bg-white/5">
                  <Image src={`/logos/${slug}.svg`} alt={t(`integrations_names.${slug}`)} width={120} height={32} className="h-8 w-auto text-slate-200 opacity-90" />
                  <span className="mt-3 text-sm text-slate-300">{t(`integrations_names.${slug}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KPIs & Security */}
        <section className="section bg-white/5">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t('kpis.cards', { returnObjects: true }) as Array<{ title: string; items: string[] }>).map((card, i) => (
                <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <ul className="space-y-2 text-slate-300">
                    {card.items.map((it, j) => (
                      <li key={j} className="flex gap-3 items-start"><span className="mt-1 w-2 h-2 rounded-full bg-brand1" />{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="relative section">
          <div className="absolute inset-0 z-0">
            <Image src="/results.png" alt="" fill sizes="100vw" className="object-cover object-center" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
          </div>
          <div className="container relative z-10 reveal">
            <h2 className="text-4xl font-bold mb-6 text-center">{t('success.title')}</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 reveal">
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/logos/conduz.svg" alt="Conduz.pt" width={36 * 3} height={36} className="h-9 w-auto" />
                  <div>
                    <div className="font-semibold">Conduz.pt</div>
                    <div className="text-xs text-slate-400">{t('success.industry')}</div>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">{t('success.summary')}</p>
                <ul className="space-y-2 text-slate-200 mb-4">
                  {(t('success.metrics', { returnObjects: true }) as string[]).map((m, i) => (
                    <li key={i} className="flex gap-3 items-start"><span className="mt-1 w-2 h-2 rounded-full bg-brand2" />{m}</li>
                  ))}
                </ul>
                <a
                  href="https://conduz.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand1 hover:underline"
                  onClick={() => { gtag.event({ action: 'select_item', category: 'engagement', label: 'case_conduz' }); }}
                >
                  {t('success.cta')} →
                </a>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 reveal">
                <h3 className="text-xl font-bold mb-3">{t('success.why.title')}</h3>
                <ul className="space-y-2 text-slate-300">
                  {(t('success.why.points', { returnObjects: true }) as string[]).map((p, i) => (
                    <li key={i} className="flex gap-3 items-start reveal"><span className="mt-1 w-2 h-2 rounded-full bg-brand1" />{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-brand1">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">{t('cta_title')}</h2>
            <p className="text-xl mb-8 text-white/90">{t('cta_sub')}</p>
            <button className="bg-white text-brand1 hover:bg-slate-100 font-medium py-3 px-8 rounded-lg transition-colors" onClick={() => { fbq.event('Lead'); gtag.event({ action: 'generate_lead', category: 'engagement', label: 'cta_section' }); openForm(); }}>
              {t('request_demo')}
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-8 text-center">{t('faq.title')}</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {(t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((f, i) => (
                <details key={i} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <summary className="cursor-pointer font-medium">{f.q}</summary>
                  <p className="mt-2 text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image src="/hero.png" alt="" fill sizes="100vw" className="object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">{t('brand')}</h3>
              <p className="text-slate-400 text-sm">{t('footer_desc')}</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer_product')}</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer_features')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer_pricing')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer_demo')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer_contact')}</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white transition-colors">{COMPANY_EMAIL}</a></li>
                <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
            <p>{t('copyright')}</p>
          </div>
        </div>
      </footer>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{t('form.title')}</h3>
              <button onClick={closeForm} className="text-slate-300 hover:text-white">✕</button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">{t('form.name')}</label>
                  <input name="name" value={form.name} onChange={onChange} required className="w-full bg-slate-800 border border-white/10 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">{t('form.email')}</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full bg-slate-800 border border-white/10 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">{t('form.phone')}</label>
                  <input name="phone" value={form.phone} onChange={onChange} className="w-full bg-slate-800 border border-white/10 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">{t('form.company')}</label>
                  <input name="company" value={form.company} onChange={onChange} className="w-full bg-slate-800 border border-white/10 rounded-md px-3 py-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">{t('form.fleet_size')}</label>
                  <select name="fleetSize" value={form.fleetSize} onChange={onChange} className="w-full bg-slate-800 border border-white/10 rounded-md px-3 py-2">
                    <option value="">-</option>
                    {(t('form.fleet_size_options', { returnObjects: true }) as string[]).map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">{t('form.message')}</label>
                  <textarea name="message" value={form.message} onChange={onChange} required rows={4} className="w-full bg-slate-800 border border-white/10 rounded-md px-3 py-2" />
                </div>
              </div>
              {success && <p className="text-emerald-400 text-sm">{success}</p>}
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={closeForm} className="border border-white/20 px-4 py-2 rounded-md">{t('form.close')}</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? '...' : t('form.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
  },
});

