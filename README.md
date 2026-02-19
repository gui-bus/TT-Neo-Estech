# Teste técnico NEO Estech - Guilherme Bustamante

Sistema de gerenciamento de chamados técnicos e gestão de indicadores operacionais, desenvolvido como parte do processo seletivo para a Estech. O projeto simula o monitoramento de ativos e abertura de chamados da plataforma NEO.

# Tecnologias e Stack
- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **UI Library:** Ant Design
- **Gerenciamento de Dados:** TanStack Query (React Query)
- **Formulários:** React Hook Form + Zod (Validação)
- **Estilização:** Tailwind CSS
- **Dados Sintéticos:** faker-js/faker

---

# Como rodar o projeto

Este projeto utiliza o **pnpm** como gerenciador de pacotes para maior performance e eficiência.

1. **Clone o repositório para a sua máquina**

   ```bash
   git clone https://github.com/gui-bus/TT-Neo-Estech.git
   ```

2. **Navegue para a pasta do projeot**

   ```bash
   cd TT-Neo-Estech
   ```

3. **Instale as dependências:**
   ```bash
   pnpm install
   ```
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```
5. **Acesse o projeto:** Abra o projeto acessando [http://localhost:3000](http://localhost:3000) no seu navegador.

---

# Estratégia para grandes volumes (1.000+ itens)

Para cumprir o requisito de performance com mais de 1.000 registros sem travar a interface, foram adotadas as seguintes estratégias:

* **Simulação de Paginação Server-side:** O hook `useTicketsList` processa os dados programaticamente (filtros e ordenação) e extrai apenas a "fatia" necessária para a página atual com base no parâmetro `pageSize`.
* **Foco em escalabilidade:** Graças à paginação, o navegador renderiza apenas cerca de 10 a 50 chamados por vez, mantendo a aplicação fluida independentemente do tamanho total do "banco de dados" mockado.

---

# Decisões de Arquitetura e UX

### 1. Sincronização de estado via URL

Em vez de manter os filtros apenas no `useState`, a aplicação sincroniza todos os parâmetros (página, filtros, busca e tipo de visão) diretamente na URL através de hooks do `next/navigation`.

- **Justificativa:** Isso garante que o estado seja `persistente` e `compartilhável`. O usuário pode copiar o link e enviar para outra pessoa já com os filtros aplicados, além de permitir o uso do botão "voltar" do navegador sem perder a filtragem.

### 2. Camada de lógica desacoplada

Toda a lógica de busca, filtragem e estado da "API mockada" foi centralizada no hook `useTicketsList`.

- **Justificativa:** Isso mantém os componentes de interface (como a `TicketsTable`) limpos e focados apenas em renderização. Além de facilitar a manutenção, essa abordagem permite que a mesma lógica de dados seja reutilizada em diferentes partes do sistema (como no Dashboard e na Tabela) sem duplicação de código.

### 3. Continuidade visual e transição suave

Foi implementado a persistência de dados durante o fetch de novas páginas, mantendo os registros atuais visíveis até que a próxima remessa de dados esteja pronta para renderização.

- **Justificativa:** Foi utilizado o recurso `placeholderData` do `TanStack Query` para eliminar a "piscada na tela" e o salto de layout. Isso reduz a carga cognitiva do usuário, mantendo a interface estável e fornecendo uma navegação muito mais fluida e profissional.

---

# O que eu faria diferente com mais tempo

1. **Refatoração do código:**
   * **Desacoplamento de Componentes:** Grande parte da lógica atual reside na `TicketsTable`. Eu buscaria extrair subcomponentes menores (filtros, cabeçalho de ações, debug bar) para arquivos isolados, facilitando a legibilidade e testes.
   * **Melhoria nos Skeletons:** Refatoraria a lógica de carregamento para eliminar o excesso de operadores ternários no código, tornando os componentes de controle de estado de carregamento mais reutilizáveis.

2. **Aprofundamento e Estilização do Ant Design:**
   * **Customização de Tema:** Exploraria mais a fundo as customizações do Ant Design para criar uma identidade visual única.
   * **Exploração de Componentes Avançados:** Com mais tempo de estudo da documentação, integraria componentes mais complexos para enriquecer a experiência de uso e a robustez do sistema.

---

# Respostas conceituais

1. **Cache e mutação**: Você tem a lista de chamados carregada via React Query com filtros ativos (status = "Aberto", área = "Refrigeração"). O usuário cria um novo chamado pelo formulário. Como você garante que a lista reflita o novo item imediatamente, sem refetch completo de todos os filtros? Descreva sua estratégia (optimistic update, invalidação seletiva, ou outra).

    * **Resposta:** Eu utilizo o invalidateQueries com a queryKey da rota. Assim que o formulário é enviado com sucesso, eu aviso ao React Query que os dados mudaram e ele dispara o refetch automático. No caso deste projeto, como utilizei uma "API mockada", a lógica de inserção foi feita manualmente no topo da lista, mas a estratégia de invalidação garante que essa atualização reflita na UI respeitando os filtros que ja foram inseridos. Não conhecia o termo "Optimistic update" e fui pesquisar do que se trata, diria que seria uma boa opção também caso seja algo simples/que dificilmente daria problema no momento da chamada da API.
    

2. **Performance**: Uma tabela de equipamentos com 5.000 linhas e 15 colunas está demorando 3 segundos para renderizar e trava ao filtrar. O usuário é um técnico de campo usando celular Android médio. Descreva, em ordem de prioridade, as abordagens que você aplicaria para resolver.

    * **Resposta:** Buscaria entender se de fato todas as 15 colunas são necessárias para o trabalho do técnico em campo. Uma solução inicial seria ocultar as colunas secundárias, permitindo que o usuário as ative apenas quando necessário; isso reduz a quantidade de dados na tela e economiza o consumo de internet. Em seguida, aplicaria paginação ou uma estratégia de carregamento sob demanda conforme o usuário scrolla a página, visto que dificilmente ele precisaria de 5.000 linhas ao mesmo tempo e esse excesso só serve para travar a interface. Por fim, caso o travamento continuasse, buscaria refatorar o código do front para identificar possíveis gargalos em estilizações pesadas, imagens mal otimizadas ou lógicas de renderização que estejam sobrecarregando o dispositivo.

3. **Arquitetura de componentes**: Você criou um StatusBadge usado em 4 telas diferentes. Em uma tela ele precisa exibir um tooltip, em outra precisa abrir um dropdown ao clicar, e em uma terceira é apenas visual. Como você projeta esse componente para ser reutilizável sem virar um "mega-componente" cheio de props condicionais?

    * **Resposta:** Em vez de colocar toda a lógica de Tooltip ou Dropdown dentro do badge, eu manteria o StatusBadge simples, qualquer outro uso como tooltip ou dropdown, seria só utilizar o StatusBadge envolvido pelo componente necessário, dessa forma a lógica que o componente deve executar fica por conta do componente que envolve a StatusBadge. Por exemplo: `<Tooltip><StatusBadge /></Tooltip>`

---

# Verificação de estados

Para facilitar a validação técnica dos estados de interface, incluí **botões de verificação de estados** no rodapé da tabela (ao lado da paginação). Com ela, é possível alternar instantaneamente:

- **Forçar Erro:** Valida a tela de falha e o comportamento do botão "Tentar Novamente".
- **Forçar Vazio:** Valida o feedback visual de "Nenhum chamado encontrado".

---

# Testes e Qualidade

### 1. Teste E2E com Cypress
Valida os fluxos reais de uso: filtros (texto, status, prioridade, área), paginação, alternância de visões (Técnico/Gestor), estados de erro/vazio e o processo completo de abertura de novo chamado.

Modo Terminal (Headless)
```bash
pnpm test:e2e
```

Modo Interativo (Interface Gŕafica):
```bash
pnpm cypress:open
```

### 2. Teste Unitário com Vitest
Focado na validação do hook customizado useTicketsList, garantindo que a lógica de manipulação de dados (API mockada) esteja funcional.

Comando para rodar os testes:
```bash
pnpm test
```

---

> **Aviso (Windows)**: Ao rodar o test:e2e no Windows, o utilitário de encerramento pode exibir um erro de spawn wmic.exe que não interfere no resultado dos testes.
