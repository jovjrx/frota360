import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Frota360"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline">Frota360</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
            Pedir demo
          </button>
        </div>
      </header>

      <main className="pt-32">
        {/* Hero */}
        <section className="container py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Faça a gestão do seu TVDE de forma mais simples, rápida e rentável.
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Fuga das planilhas, painel 100% automatizado. Centraliza motoristas, viaturas e repasses — tudo num único painel preparado para facilitar a tua vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Pedir demo gratuita
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                📞 Falar no WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Personas */}
        <section className="section bg-white/5">
          <div className="container">
            <h2 className="text-4xl font-bold mb-16 text-center">Para quem é</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Gestores de Frotas', desc: 'Precisam de controlo total e relatórios automáticos.' },
                { title: 'Operadores de Equipas', desc: 'Organizam turnos, escalas e comunicação.' },
                { title: 'Contabilidade & Financeiro', desc: 'Querem repasses certos e integração contábil.' },
              ].map((item, i) => (
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
            <h2 className="text-4xl font-bold mb-4 text-center">Benefícios principais</h2>
            <p className="text-center text-slate-300 mb-16">Venda resultado, não recurso técnico</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Menos tempo perdido', desc: 'Automatiza tarefas administrativas.' },
                { title: 'Repasses certos, sem stress', desc: 'Cálculo automático por corrida e taxa.' },
                { title: 'Compliance garantido', desc: 'Alertas de documentos, inspeções e seguros.' },
                { title: 'Visão clara da operação', desc: 'Dashboards com performance e custos.' },
                { title: 'Equipa alinhada', desc: 'Permissões, turnos e app para motoristas.' },
                { title: 'Tudo integrado', desc: 'Uber, Bolt, contabilidade e muito mais.' },
              ].map((item, i) => (
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
            <h2 className="text-4xl font-bold mb-16 text-center">Como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Integra as plataformas', desc: 'Conecta Uber, Bolt e outras plataformas de TVDE.' },
                { step: '2', title: 'Centraliza a gestão', desc: 'Todos os dados em um único painel intuitivo.' },
                { step: '3', title: 'Automatiza repasses', desc: 'Cálculos automáticos e relatórios em tempo real.' },
              ].map((item, i) => (
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
            <h2 className="text-4xl font-bold mb-4 text-center">Integrações</h2>
            <p className="text-center text-slate-300 mb-16">Conecta com as principais plataformas</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {['Uber', 'Bolt', 'SAF-T', 'Contabilidade'].map((item, i) => (
                <div key={i} className="flex items-center justify-center p-6 rounded-lg border border-white/10 hover:border-blue-400 transition-colors">
                  <span className="font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-blue-600">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Simplifica a tua operação TVDE</h2>
            <p className="text-xl mb-8 text-blue-100">Agenda uma demo de 20 minutos.</p>
            <button className="bg-white text-blue-600 hover:bg-slate-100 font-medium py-3 px-8 rounded-lg transition-colors">
              Pedir demo gratuita
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Frota360</h3>
              <p className="text-slate-400 text-sm">Gestão TVDE simples, rápida e rentável.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Produto</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="mailto:hello@frota360.pt" className="hover:text-white transition-colors">hello@frota360.pt</a></li>
                <li><a href="https://wa.me/351" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
            <p>© 2025 Frota360. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

