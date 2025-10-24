import Image from 'next/image';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { COMPANY_EMAIL, WHATSAPP_NUMBER } from '@/config/site';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="container flex items-center h-16">
          <Image src="/logo-horizontal.png" alt={t('brand')} width={180} height={40} className="h-8 w-auto" />
        </div>
      </header>

      <main className="pt-32">
        {/* Hero */}
        <section className="container py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{t('hero_title')}</h1>
            <p className="text-xl text-slate-300 mb-8">{t('hero_subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary" onClick={openForm}>
                {t('request_demo')}
              </button>
            </div>
          </div>
        </section>

        {/* Personas */}
        <section className="section bg-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-16 text-center">{t('for_who')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {personas.map((item, i) => (
                <div key={i} className="p-8 rounded-xl border border-white/10 hover:border-blue-400 transition-colors">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section bg-white/10">
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
        <section className="section bg-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-16 text-center">{t('how_it_works')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howList.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
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
              {['uber','bolt','myprio','viaverde','cartrack'].map((slug) => (
                <div key={slug} className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg border border-white/10 hover:border-brand1 transition-colors bg-white/5">
                  <Image src={`/logos/${slug}.svg`} alt={t(`integrations_names.${slug}`)} width={120} height={32} className="h-8 w-auto text-slate-200 opacity-90" />
                  <span className="mt-3 text-sm text-slate-300">{t(`integrations_names.${slug}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-brand1">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">{t('cta_title')}</h2>
            <p className="text-xl mb-8 text-blue-100">{t('cta_sub')}</p>
            <button className="bg-white text-blue-600 hover:bg-slate-100 font-medium py-3 px-8 rounded-lg transition-colors" onClick={openForm}>
              {t('request_demo')}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="container">
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

