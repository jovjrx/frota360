# Conduz.pt - Análise Completa do Sistema

## 📋 Visão Geral

**Conduz.pt** é uma plataforma SaaS completa de gestão para motoristas de TVDE (Transporte em Veículo Descaracterizado). O sistema oferece ferramentas avançadas para gerenciar ganhos, contratos, financiamento, metas e integrações com plataformas como Uber, Bolt, MyPrio e Viaverde.

---

## 🏗️ Arquitetura Técnica

### Stack Principal
- **Framework**: Next.js 15.4.6 (Page Router)
- **Frontend**: React 19.1.0 + TypeScript
- **UI Framework**: Chakra UI 2
- **Backend**: Node.js com API routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth + Iron Session
- **Styling**: Emotion + Chakra UI
- **Internacionalização**: next-i18next (PT, EN, ES, IT)

### Dependências Principais
- @chakra-ui/react 2
- firebase 12.3.0
- stripe 18.5.0
- puppeteer 24.23.0
- nodemailer 7.0.9
- exceljs 4.4.0
- pdfkit 0.17.2
- leaflet 1.9.4

---

## 📁 Estrutura do Projeto

### Diretórios Principais

#### `/pages` - Rotas Next.js

**Admin Panel** (`/admin`)
- `data.tsx` - Gestão de dados de motoristas
- `users.tsx` - Gestão de usuários
- `monitor.tsx` - Monitoramento de sistema
- `integrations.tsx` - Configuração de integrações
- `financial-settings.tsx` - Configurações financeiras
- `/commissions` - Gestão de comissões
- `/contracts` - Gestão de contratos
- `/drivers` - Gestão de motoristas
- `/financing` - Gestão de financiamento
- `/goals` - Gestão de metas
- `/kpis` - KPIs e métricas
- `/settings` - Configurações gerais
- `/technical-reserve` - Reserva técnica
- `/weekly` - Relatórios semanais

**Driver Dashboard** (`/dashboard`)
- `index.tsx` - Dashboard principal
- `data.tsx` - Dados de corridas
- `payslips.tsx` - Contracheques
- `financing.tsx` - Opções de financiamento
- `contracts.tsx` - Contratos
- `profile.tsx` - Perfil do motorista
- `tracking.tsx` - Rastreamento de veículo
- `/commissions` - Comissões
- `/goals` - Metas pessoais
- `/performance` - Performance
- `/recruitment` - Recrutamento

**API Endpoints** (`/api`)
- `/admin` - Endpoints administrativos
- `/driver` - Endpoints do motorista
- `/auth` - Autenticação
- `/contracts` - Gestão de contratos
- `/dashboard` - Dados do dashboard
- `/painel` - Painel de controle
- `/payouts` - Pagamentos
- `/plans` - Planos de subscrição
- `/profile` - Perfil
- `/subscriptions` - Subscrições
- `/tracking` - Rastreamento
- `/uber` - Integração Uber
- `/webhooks` - Webhooks

**Authentication** (`/auth`)
- `login.tsx` - Login
- `forgot-password.tsx` - Recuperação de senha
- `reset-password.tsx` - Redefinição de senha

**Other Pages**
- `/contracts` - Gestão de contratos
- `/drivers` - Página de motoristas
- `/request` - Requisições
- `/contact` - Contacto
- `/about` - Sobre
- `index.tsx` - Homepage
- `new_home.tsx` - Nova homepage

#### `/lib` - Lógica de Negócio
- `/admin` - Funções administrativas
- `/api` - Clientes de API
- `/audit` - Auditoria
- `/auth` - Autenticação
- `/billing` - Faturação
- `/commission` - Comissões
- `/crypto` - Criptografia
- `/email` - Envio de emails
- `/facebook` - Integração Facebook
- `/files` - Gestão de arquivos
- `/finance` - Finanças
- `/firebase` - Firebase
- `/goals` - Metas
- `/google` - Integração Google
- `/integrations` - Integrações (Uber, Bolt, MyPrio, Viaverde)
- `/payouts` - Pagamentos
- `/pdf` - Geração de PDFs
- `/services` - Serviços gerais
- `/session` - Gestão de sessão
- `/ssr` - Server-side rendering
- `/store` - Estado global
- `/sync` - Sincronização
- `/uber` - Integração Uber
- `/utils` - Utilitários

#### `/components` - Componentes React
- `Header.tsx` - Cabeçalho
- `Footer.tsx` - Rodapé
- `Hero.tsx` - Seção hero
- `ContactForm.tsx` - Formulário de contacto
- `LanguageSelector.tsx` - Seletor de idioma
- `ConfirmDialog.tsx` - Diálogo de confirmação
- `Card.tsx` - Componente card
- `Button.tsx` - Componente botão
- `Container.tsx` - Container
- `Highlight.tsx` - Destaque
- `FinancingTeaser.tsx` - Teaser de financiamento

#### `/locales` - Traduções
- Suporte para: PT, EN, ES, IT
- Estrutura de chaves para toda a aplicação

---

## 🔌 Integrações

### Plataformas de TVDE Integradas

**Uber**
- Sincronização de corridas
- Dados de ganhos
- Histórico de corridas
- Integração com API Uber

**Bolt**
- Sincronização de corridas
- Dados de ganhos
- Histórico de corridas

**MyPrio**
- Integração para dados de corridas
- Sincronização de ganhos

**Viaverde**
- Rastreamento de veículo
- Dados de localização
- Histórico de trajetos

### Serviços Externos

**Firebase**
- Firestore: Database NoSQL
- Firebase Auth: Autenticação
- Firebase Admin: Gestão backend

**Stripe**
- Processamento de pagamentos
- Gestão de subscrições
- Faturação

**Nodemailer**
- Envio de emails
- Notificações
- Confirmações

**Puppeteer**
- Web scraping
- Automação de browser
- Extração de dados

**Leaflet**
- Mapas interativos
- Rastreamento de localização
- Visualização de trajetos

---

## 💼 Funcionalidades Principais

### Para Motoristas

**Dashboard Principal**
- Visão geral de ganhos
- Corridas do dia
- Metas e performance
- Alertas e notificações

**Gestão de Dados**
- Histórico de corridas
- Análise de ganhos
- Comparação de plataformas (Uber, Bolt, MyPrio)
- Exportação de dados

**Contracheques (Payslips)**
- Geração automática
- Detalhamento de ganhos
- Deduções e taxas
- Download em PDF

**Financiamento**
- Opções de crédito
- Simulador de empréstimo
- Histórico de financiamentos
- Gestão de parcelas

**Contratos**
- Visualização de contratos
- Assinatura digital
- Histórico de versões
- Download de documentos

**Perfil**
- Dados pessoais
- Documentação
- Configurações de conta
- Preferências

**Rastreamento**
- Localização em tempo real
- Histórico de trajetos
- Mapa interativo
- Estatísticas de movimento

**Metas e Performance**
- Metas pessoais
- Progress tracking
- Análise de performance
- Comparação com outros motoristas

**Comissões**
- Cálculo automático
- Histórico de comissões
- Detalhamento por plataforma
- Previsões

**Recrutamento**
- Programa de referência
- Bônus de recrutamento
- Histórico de referências

### Para Administradores

**Painel de Controle**
- Visão geral do sistema
- Estatísticas gerais
- Alertas de sistema
- KPIs principais

**Gestão de Motoristas**
- Lista completa de motoristas
- Filtros avançados
- Ações em massa
- Edição de dados

**Gestão de Dados**
- Importação de dados
- Sincronização com plataformas
- Validação de dados
- Limpeza de dados

**Gestão de Usuários**
- Criação de usuários
- Atribuição de roles
- Gestão de permissões
- Auditoria de ações

**Gestão de Contratos**
- Templates de contratos
- Assinatura em massa
- Histórico de contratos
- Versionamento

**Gestão de Comissões**
- Configuração de taxas
- Regras de comissão
- Cálculo automático
- Relatórios

**Gestão de Financiamento**
- Produtos de crédito
- Configuração de juros
- Aprovação de pedidos
- Gestão de parcelas

**Gestão de Metas**
- Criação de metas
- Atribuição a motoristas
- Monitoramento
- Prêmios e bônus

**Integrações**
- Configuração de APIs
- Sincronização manual
- Logs de integração
- Troubleshooting

**Monitoramento**
- Status do sistema
- Performance
- Logs de erro
- Alertas

**Configurações Financeiras**
- Configuração de contas
- Gestão de pagamentos
- Relatórios financeiros
- Auditorias

**KPIs e Relatórios**
- Dashboard de KPIs
- Relatórios customizados
- Exportação de dados
- Análise de tendências

**Reserva Técnica**
- Gestão de fundos
- Cálculos de reserva
- Relatórios

**Relatórios Semanais**
- Geração automática
- Distribuição por email
- Análise de tendências

---

## 🔐 Segurança e Autenticação

**Autenticação**
- Firebase Authentication
- Iron Session para cookies seguros
- JWT tokens
- Refresh tokens

**Autorização**
- Role-based access control (RBAC)
- Permissões granulares
- Middleware de autenticação

**Proteção de Dados**
- Criptografia de senhas
- Dados sensíveis encriptados
- Auditoria de ações
- Logs de segurança

---

## 📊 Relatórios e Análises

**Tipos de Relatórios**
- Relatórios de Ganhos: Análise de receita por período
- Relatórios de Performance: Comparação de métricas
- Relatórios Financeiros: Fluxo de caixa, despesas
- Relatórios de Conformidade: Documentação, contratos
- Relatórios de KPI: Indicadores-chave de performance

**Exportação**
- PDF
- Excel
- CSV
- Email automático

---

## 🌍 Internacionalização

**Idiomas Suportados**
- 🇵🇹 Português (PT)
- 🇬🇧 English (EN)
- 🇪🇸 Español (ES)
- 🇮🇹 Italiano (IT)

**Implementação**
- next-i18next
- Traduções em `/locales`
- Seletor de idioma dinâmico
- Detecção automática de idioma

---

## 📱 Responsividade

- Mobile-first design
- Chakra UI responsive components
- Breakpoints: sm, md, lg, xl
- Otimizado para todos os dispositivos

---

## ⚡ Performance

**Otimizações**
- Code splitting automático
- Image optimization
- Lazy loading
- Caching estratégico
- CDN para assets estáticos

**Ferramentas**
- Vercel Analytics
- Speed Insights
- Google Analytics

---

## 🔄 Fluxo de Sincronização

**Integração Uber/Bolt**
1. Autenticação via OAuth
2. Sincronização de corridas
3. Cálculo de ganhos
4. Atualização de dashboard
5. Geração de relatórios

**Sincronização de Dados**
- Sincronização em tempo real
- Sincronização agendada
- Sincronização sob demanda
- Logs de sincronização

---

## 📧 Sistema de Notificações

**Tipos de Notificações**
- Email
- In-app notifications
- SMS (opcional)
- Push notifications (opcional)

**Eventos**
- Novo contrato
- Pagamento recebido
- Meta atingida
- Alerta de sistema
- Atualização de dados

---

## 💳 Gestão de Pagamentos

**Métodos**
- Stripe
- Transferência bancária
- Carteira digital

**Funcionalidades**
- Processamento automático
- Reembolsos
- Reconciliação
- Relatórios de pagamento

---

## 📈 Analytics e Métricas

**KPIs Rastreados**
- Ganhos totais
- Número de corridas
- Tempo online
- Taxa de aceitação
- Rating médio
- Metas atingidas

**Visualizações**
- Gráficos de tendências
- Comparações período a período
- Benchmarking
- Previsões

---

## 🛠️ Ferramentas de Desenvolvimento

**Scripts**
- `npm run dev` - Desenvolvimento local
- `npm run build` - Build de produção
- `npm run start` - Iniciar servidor
- `npm run lint` - Linting
- `npm run type-check` - Verificação de tipos
- `npm run setup` - Setup inicial
- `npm run setup:firebase` - Setup Firebase
- `npm run add-data` - Adicionar dados de teste

---

## 📚 Estrutura de Dados

**Coleções Firebase**
- `users` - Usuários do sistema
- `drivers` - Dados de motoristas
- `rides` - Histórico de corridas
- `contracts` - Contratos
- `commissions` - Comissões
- `financing` - Financiamentos
- `goals` - Metas
- `subscriptions` - Subscrições
- `payouts` - Pagamentos
- `integrations` - Configurações de integração
- `audit_logs` - Logs de auditoria

---

## 🚀 Deployment

**Plataforma**
- Vercel (recomendado)
- Suporte para Node.js 18+

**Variáveis de Ambiente**
- Firebase credentials
- Stripe API keys
- OAuth tokens
- Email configuration
- Database URLs

---

## 🎯 Casos de Uso

### Para Motoristas
1. Acompanhar ganhos em tempo real
2. Gerenciar múltiplas plataformas (Uber, Bolt)
3. Solicitar financiamento
4. Visualizar contratos
5. Atingir metas e ganhar bônus
6. Receber pagamentos automaticamente
7. Acessar histórico de corridas
8. Rastrear veículo

### Para Gestores de Frota
1. Monitorar performance de motoristas
2. Gerenciar contratos em massa
3. Configurar comissões
4. Analisar KPIs
5. Gerar relatórios
6. Integrar com plataformas
7. Gerenciar financiamento
8. Auditar ações

### Para Administradores
1. Gestão completa do sistema
2. Configuração de integrações
3. Gestão de usuários e permissões
4. Monitoramento de sistema
5. Geração de relatórios
6. Configuração de metas
7. Gestão de financiamento
8. Auditoria e conformidade

---

## 🔮 Extensibilidade

O sistema é altamente extensível e permite:
- Adicionar novas integrações
- Customizar cálculos de comissão
- Criar novos tipos de relatórios
- Estender o dashboard
- Adicionar novos tipos de notificações
- Integrar novos métodos de pagamento

---

## ✅ Conclusão

**Conduz.pt** é uma plataforma robusta, completa e profissional para gestão de motoristas de TVDE. Oferece todas as funcionalidades necessárias para:

- ✅ Motoristas gerenciarem seus ganhos
- ✅ Gestores controlarem suas frotas
- ✅ Administradores operarem o sistema
- ✅ Integrações com principais plataformas
- ✅ Análises e relatórios avançados
- ✅ Segurança e conformidade

**Frota360** pode ser posicionado como uma versão simplificada e focada especificamente em gestão de TVDE, enquanto **Conduz.pt** é a plataforma completa com todas as funcionalidades avançadas.

