# Plano de Refatoração da Landing Page: Frota360.pt

**Objetivo:** Transformar a *homepage* atual em uma máquina de vendas concisa e completa, substituindo o conteúdo existente pelo *briefing* detalhado fornecido, mantendo a identidade visual (cores, fontes, layout) e garantindo a internacionalização (i18n).

**Status Atual:** O *layout* visual (cores, disposição, componentes) é considerado satisfatório, mas o **conteúdo** precisa ser substituído por uma abordagem mais focada em vendas e diferenciação.

---

## 1. Análise Visual e de Estrutura Atual

O site `frota360.pt` utiliza uma paleta de cores escura com forte presença de roxo/lilás e destaques em amarelo, o que está em linha com o *briefing* de cores fornecido (`#a268ff`, `#6d3fd1`, `#431e7c`, `#ffd84d`).

A estrutura atual é a seguinte:

| Seção Atual | Conteúdo | Avaliação | Ação Proposta |
| :--- | :--- | :--- | :--- |
| **Hero** | Headline sobre cálculo de pagamentos, App do Motorista e Painel do Gestor. | **Manter a estrutura.** O visual é forte. | Substituir o texto pelo novo *copy* (`A sua frota, o seu controlo`) e CTA. |
| **Integrações** | Lista de 5 integrações (Uber, Bolt, MyPRIO, Via Verde, Cartrack). | **Manter a estrutura.** Conteúdo importante, mas será movido para dentro da seção de Módulos. | Remover esta seção e integrar o conteúdo na nova seção de Módulos. |
| **Como funciona** | Seção vaga. | **Substituir.** Não é o foco principal de vendas. | Substituir pela seção de **Comparação Competitiva**. |
| **Benefícios principais** | Venda de resultado e não recurso técnico. | **Substituir.** O conteúdo é genérico. | Substituir pela seção de **Módulos/Recursos** detalhada. |
| **Por que Frota360** | Tabela de comparação simples. | **Manter o conceito.** A tabela é o ponto chave. | Refatorar para a **Tabela de Comparação** mais robusta e visualmente atraente (ComparisonTable.tsx). |
| **Segurança e Confiabilidade** | Foco em RBAC, Vercel e Backups. | **Manter o conceito.** Segurança é o principal diferencial. | Integrar como um dos **Módulos/Recursos** e reforçar na seção de Comparação. |
| **Perguntas Frequentes** | Seção de FAQs. | **Manter.** Útil para conversão. | Manter, mas garantir que as perguntas e respostas estejam no arquivo de tradução. |
| **Solicitar demonstração** | Formulário de contato completo. | **Manter.** É o CTA final. | Manter a estrutura do formulário, garantindo que os campos estejam no arquivo de tradução. |

---

## 2. Estrutura de Conteúdo Proposta (Nova Homepage)

A nova *homepage* será construída em um layout único e sequencial, focado em converter o visitante, utilizando os componentes e a tradução já criados (`frota360.json`, `ComparisonTable.tsx`, `ModuleCard.tsx`, `BenefitsGrid.tsx`).

| Ordem | Seção | Componente | Conteúdo (do `frota360.json`) | Foco de Vendas |
| :--- | :--- | :--- | :--- | :--- |
| **1.** | **Hero** | `Hero` | `hero.title`, `hero.subtitle`, `hero.cta` | Capturar a atenção com a Proposta de Valor. |
| **2.** | **Comparação Competitiva** | `ComparisonTable` | `comparison.table.items` | **Primeiro e mais importante item.** Destacar a superioridade e segurança do Frota360. |
| **3.** | **Módulos/Recursos** | `ModuleCard` (8x) | `modules.items` | Engrandecer o sistema, mostrando a capacidade completa e os espaços para mídia. |
| **4.** | **Benefícios Principais** | `BenefitsGrid` | `benefits.items` | Reforçar os ganhos práticos (Segurança, Automação, Crescimento). |
| **5.** | **Caso de Sucesso** | `Highlight` | `caseStudy.conduz` | Prova social irrefutável (Conduz.pt). |
| **6.** | **CTA Final** | `Title` | `cta.title`, `cta.button` | Última chamada para a demonstração. |
| **7.** | **Contacto** | `Formulário` | `contact.title`, `contact.form` | Ponto de conversão final. |

---

## 3. Ações Técnicas para Implementação

Para implementar esta nova estrutura, as seguintes ações devem ser executadas no repositório que contém o código-fonte do site (`pages/index.tsx`):

1.  **Criação/Atualização de Arquivos:**
    *   Garantir que os arquivos `frota360.json`, `ComparisonTable.tsx`, `ModuleCard.tsx` e `BenefitsGrid.tsx` estejam no repositório correto.
2.  **Adaptação da Homepage (`pages/index.tsx`):**
    *   Remover todo o código das seções antigas (`Metrics`, `Divisions`, `Como funciona`).
    *   Importar os novos componentes (`ComparisonTable`, `ModuleCard`, `BenefitsGrid`).
    *   Reescrever o *render* da `Home` para seguir a nova estrutura de 7 seções, utilizando o `tPage("frota360")` para carregar o conteúdo.
3.  **Ajuste de I18n:**
    *   No `getStaticProps` de `pages/index.tsx`, garantir que a tradução carregue o *namespace* `frota360` em vez do *namespace* antigo (ex: `home`).

**Conclusão:**

O plano está pronto e detalhado. A estrutura de código já foi desenvolvida por mim e está pronta para ser aplicada no repositório correto.

**Próximo Passo:**

Por favor, forneça o nome do repositório que contém o código-fonte do site (`pages/index.tsx`) para que eu possa aplicar o plano e finalizar a tarefa.

---
*Documento gerado por Manus AI para jovjrx/frota360*
