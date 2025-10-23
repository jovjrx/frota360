export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold">F</span>
            </div>
            <span className="font-bold text-lg">Frota360</span>
          </div>
          <button className="btn-primary">Pedir demo</button>
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
              <button className="btn-primary">Pedir demo gratuita</button>
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
        <div className="container text-center text-slate-400 text-sm">
          <p>© 2025 Frota360. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

