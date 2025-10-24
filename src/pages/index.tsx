import Image from 'next/image';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { COMPANY_EMAIL, WHATSAPP_NUMBER } from '@/config/site';
import * as gtag from '@/utils/gtag';
import * as fbq from '@/utils/fbpixel';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function Home() {
  const { t } = useTranslation('common');
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
    <div className="min-h-screen bg-white text-slate-800">
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
  {/* Header is global (in _app). Remove hero-integrated header. */}

      <main className="pt-0">
        {/* Hero (simplified) + Para quem é */}
        <Section className="bg-white border-b border-slate-200">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 w-full">
              <div className="max-w-3xl reveal">
              <Heading level={1} className="mb-4 leading-tight">{t('hero_title')}</Heading>
              <p className="text-lg md:text-xl text-slate-700 mb-4">{t('hero_subtitle')}</p>
              <Badge variant="soft" className="mb-4"><span aria-hidden>🎁</span><span>{t('cta_sub')}</span></Badge>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={openForm}>{t('request_demo')}</Button>
              </div>
              {/* Trust badges */}
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                {(t('trust_badges', { returnObjects: true }) as string[]).map((b, i) => (
                  <li key={i} className="px-3 py-1 rounded-full border border-slate-200 bg-white/90 shadow-sm">
                    {b}
                  </li>
                ))}
              </ul>
              </div>
              {/* Para quem é dentro da primeira section (lado direito no desktop) */}
              <div className="reveal">
                <Heading className="mb-4">{t('for_who')}</Heading>
                 <ul className="space-y-4">
                   {personas.map((item, i) => {
                     const alt = i % 2 === 1;
                     const cardColor = alt ? 'border-brand2 bg-brand2/10' : 'border-brand1 bg-brand1/10';
                     const iconColor = alt ? 'bg-brand2/20 text-brand2' : 'bg-brand1/20 text-brand1';
                     const dir = alt ? 'bg-gradient-to-br from-brand2/30 via-transparent to-brand1/30' : 'bg-gradient-to-br from-brand1/30 via-transparent to-brand2/30';
                     return (
                      <li key={i} className="flex items-start gap-3">
                        <Card className={`w-full p-3 overflow-hidden ${cardColor}`}>
                          <div className="relative isolate">
                            {/* Animated gradient glow background */}
                            <span aria-hidden className={`pointer-events-none absolute -inset-2 rounded-2xl blur-xl opacity-60 animate-gradient-float ${dir}`} style={{ animationDelay: `${i * 0.6}s` }} />
                            <div className="relative flex items-start gap-3">
                            <span className={`mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-full ring-1 ring-white/40 ${iconColor}`}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <div>
                              <div className="font-semibold text-slate-900">{item.title}</div>
                              <div className="text-slate-600 text-sm">{item.desc}</div>
                            </div>
                            </div>
                          </div>
                        </Card>
                      </li>
                     );
                   })}
                 </ul>
               </div>
            </div>
          </Container>
        </Section>

        

        {/* Features (benefits) moved below How */}

        {/* How it Works */}
        <Section id="how" className="bg-slate-50">
          <Container className="reveal">
            <Heading className="mb-8 text-center text-brand2">{t('how_it_works')}</Heading>
            {/* Removed GIF placeholder as requested */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howList.map((item, i) => (
                <div key={i} className="text-center reveal">
                  <div className="w-16 h-16 bg-brand1 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Why Frota360 (differentiators) */}
        <Section id="why" className="bg-white">
          <Container>
            <Heading className="mb-3 text-center text-brand2">{t('why_frota360.title')}</Heading>
            <div className="mx-auto h-1 w-24 bg-brand-gradient rounded-full mb-10" aria-hidden />
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {(t('why_frota360.points', { returnObjects: true }) as string[]).map((p, i) => {
                const grad = i % 2 === 0
                  ? 'from-brand1/35 via-brand2/25 to-brand1/35'
                  : 'from-brand2/35 via-brand1/25 to-brand2/35';
                return (
                  <div key={i} className="group relative h-full">
                    <span
                      className={`pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${grad} opacity-60 blur-sm animate-gradient-float`}
                      style={{ animationDelay: `${i * 0.4}s` }}
                      aria-hidden
                    />
                    <div className="relative p-6 rounded-2xl border border-slate-200 bg-white transition-transform group-hover:-translate-y-0.5 shadow-sm group-hover:shadow-lg h-full min-h-[160px] flex flex-col">
                      <div className="mb-3 inline-flex w-10 h-10 items-center justify-center rounded-full bg-brand-gradient text-white font-semibold ring-1 ring-white/40 shadow shrink-0">
                        {i + 1}
                      </div>
                      <h3 className="font-semibold text-slate-900">{p}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Features (benefits) - moved after How for better conversion flow */}
        <Section id="benefits" className="bg-slate-50" ref={successRef as any}>
          <Container>
            <Heading className="mb-4 text-center text-brand2">{t('benefits')}</Heading>
            <p className="text-center text-slate-600 mb-16">{t('benefits_sub')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((item, i) => (
                <Card key={i} className="border-brand1 hover:shadow-md">
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Integrations */}
        <Section id="integrations" className="bg-white">
          <Container>
            <Heading className="mb-4 text-center text-brand2">{t('integrations')}</Heading>
            <p className="text-center text-slate-600 mb-16">{t('integrations_sub')}</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-4xl mx-auto">
              {['uber', 'bolt', 'myprio', 'viaverde', 'cartrack'].map((slug) => (
                <Card key={slug} className="flex flex-col items-center justify-center p-4 md:p-6 border-brand1 hover:shadow-md transition-colors">
                  <Image src={`/logos/${slug}.svg`} alt={t(`integrations_names.${slug}`)} width={120} height={32} className="h-8 w-auto opacity-90" />
                  <span className="mt-3 text-sm font-medium text-slate-800">{t(`integrations_names.${slug}`)}</span>
                  <span className="mt-1 text-xs text-slate-600 text-center">{t(`integrations_desc.${slug}`)}</span>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* KPIs & Security */}
        <Section className="bg-slate-50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t('kpis.cards', { returnObjects: true }) as Array<{ title: string; items: string[] }>).map((card, i) => (
                <Card key={i} className="rounded-xl bg-slate-50 border-brand1 hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{card.title}</h3>
                  <ul className="space-y-2 text-slate-600">
                    {card.items.map((it, j) => (
                      <li key={j} className="flex gap-3 items-start"><span className="mt-1 w-2 h-2 rounded-full bg-brand1" />{it}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Success Stories */}
        <Section className="bg-white">
          <Container className="reveal">
            <Heading className="mb-6 text-center text-brand2">{t('success.title')}</Heading>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-xl reveal border-brand1 hover:shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/logos/conduz.png" alt="Conduz.pt" width={36 * 3} height={36} className="h-9 w-auto" />
                  <div>
                    <div className="font-semibold text-slate-900">Conduz.pt</div>
                    <div className="text-xs text-slate-500">{t('success.industry')}</div>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{t('success.summary')}</p>
                <ul className="space-y-2 text-slate-700 mb-4">
                  {(t('success.metrics', { returnObjects: true }) as string[]).map((m, i) => (
                    <li key={i} className="flex gap-3 items-start"><span className="mt-1 w-2 h-2 rounded-full bg-brand2" />{m}</li>
                  ))}
                </ul>
                <a
                  href="https://conduz.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand2 hover:underline"
                  onClick={() => { gtag.event({ action: 'select_item', category: 'engagement', label: 'case_conduz' }); }}
                >
                  {t('success.cta')} →
                </a>
              </Card>
              <Card className="rounded-xl p-6 reveal border-brand1 hover:shadow-md">
                <h3 className="text-xl font-bold mb-3 text-slate-900">{t('success.why.title')}</h3>
                <ul className="space-y-2 text-slate-600">
                  {(t('success.why.points', { returnObjects: true }) as string[]).map((p, i) => (
                    <li key={i} className="flex gap-3 items-start reveal"><span className="mt-1 w-2 h-2 rounded-full bg-brand1" />{p}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Testimonials removed as requested */}

        {/* CTA */}
        <Section id="cta" className="bg-brand-gradient text-white">
          <Container className="text-center">
            <Heading className="mb-4 text-white">{t('cta_title')}</Heading>
            <p className="text-xl mb-8 text-white/90">{t('cta_sub')}</p>
            <Button className="bg-white text-brand1 hover:bg-slate-100" onClick={() => { fbq.event('Lead'); gtag.event({ action: 'generate_lead', category: 'engagement', label: 'cta_section' }); openForm(); }}>
              {t('request_demo')}
            </Button>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="bg-white">
          <Container>
            <Heading className="mb-8 text-center text-brand2">{t('faq.title')}</Heading>
            <div className="max-w-4xl mx-auto space-y-4">
              {(t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((f, i) => (
                <details key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer font-medium text-slate-900">{f.q}</summary>
                  <p className="mt-2 text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 bg-slate-50">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand2/50 to-transparent" aria-hidden />
        <Container className="relative z-10 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo-horizontal.png" alt={t('brand')} width={160} height={48} className="h-12 w-auto" />
              </div>
              <p className="text-slate-600 text-sm mb-4">{t('footer_desc')}</p>
              <ul className="flex flex-wrap gap-2 text-xs text-slate-600">
                {(t('trust_badges', { returnObjects: true }) as string[]).slice(0,4).map((b, i) => (
                  <li key={i} className="px-2.5 py-1 rounded-full border border-slate-200 bg-white/80">{b}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-slate-900">{t('footer_product')}</h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li><a href="#how" className="hover:text-slate-900 transition-colors">{t('how_it_works')}</a></li>
                <li><a href="#benefits" className="hover:text-slate-900 transition-colors">{t('footer_features')}</a></li>
                <li><a href="#integrations" className="hover:text-slate-900 transition-colors">{t('integrations')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-slate-900">{t('footer_company', 'Empresa')}</h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li><a href="#why" className="hover:text-slate-900 transition-colors">{t('why_frota360.title')}</a></li>
                <li><a href="/privacy" className="hover:text-slate-900 transition-colors">{t('privacy')}</a></li>
                <li><a href="/terms" className="hover:text-slate-900 transition-colors">{t('terms')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-slate-900">{t('footer_contact')}</h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li><a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-slate-900 transition-colors">{COMPANY_EMAIL}</a></li>
                <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-slate-900 transition-colors">{WHATSAPP_NUMBER}</a></li>
              </ul>
              <div className="mt-4">
                <Button className="px-4 py-2 text-sm" onClick={openForm}>{t('footer_demo')}</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
            <p className="text-center md:text-left">{t('copyright')}</p>
            <p className="opacity-80">{t('footer_madeby', 'Um produto Alvorada Magistral')}</p>
          </div>
        </Container>
      </footer>

      

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg bg-white text-slate-900 border border-slate-200 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{t('form.title')}</h3>
              <button onClick={closeForm} className="text-slate-600 hover:text-slate-900">✕</button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-slate-700">{t('form.name')}</label>
                  <input name="name" value={form.name} onChange={onChange} required className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand1/40 focus:border-brand1/50" />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-slate-700">{t('form.email')}</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand1/40 focus:border-brand1/50" />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-slate-700">{t('form.phone')}</label>
                  <input name="phone" value={form.phone} onChange={onChange} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand1/40 focus:border-brand1/50" />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-slate-700">{t('form.company')}</label>
                  <input name="company" value={form.company} onChange={onChange} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand1/40 focus:border-brand1/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-slate-700">{t('form.fleet_size')}</label>
                  <select name="fleetSize" value={form.fleetSize} onChange={onChange} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand1/40 focus:border-brand1/50">
                    <option value="">-</option>
                    {(t('form.fleet_size_options', { returnObjects: true }) as string[]).map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-slate-700">{t('form.message')}</label>
                  <textarea name="message" value={form.message} onChange={onChange} required rows={4} className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand1/40 focus:border-brand1/50" />
                </div>
              </div>
              {success && <p className="text-emerald-600 text-sm">{success}</p>}
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={closeForm} className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-md">{t('form.close')}</button>
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

