describe("Fluxo de gerenciamento de chamados, da validação de filtros ao cadastro de um novo ticket", () => {
  //#region Before Each
  beforeEach(() => {
    cy.visit("http://localhost:3000/chamados");
  });
  //#endregion

  //#region Filters
  // TEXT
  it('Deve preencher o campo com o texto "Nobreak" e filtrar os chamados ao apertar Enter', () => {
    const searchTerm = "Nobreak";
    cy.get('input[placeholder*="Pesquise pelo título"]').type(
      `${searchTerm}{enter}`,
    );
    cy.get(".ant-table-row").should("contain", searchTerm);
  });

  // STATUS
  it('Deve filtrar a lista de chamados e exibir apenas os que contem status igual a "Aberto"', () => {
    cy.get(".ant-select").contains("Selecione o status").click({ force: true });

    cy.get(".ant-select-item-option-content").contains("Aberto").click();

    cy.url().should("include", "status=Aberto");

    cy.get(".ant-table-row", { timeout: 10000 })
      .first()
      .contains(/aberto/i)
      .should("be.visible");
  });

  // PRIORITY
  it('Deve filtrar a lista de chamados e exibir apenas os que contem prioridade igual a "Crítica"', () => {
    cy.get(".ant-select")
      .contains("Selecione a prioridade")
      .click({ force: true });

    cy.get(".ant-select-item-option-content").contains("Crítica").click();

    cy.get(".ant-table-row", { timeout: 10000 }).should("contain", "Crítica");
  });

  // AREA
  it('Deve filtrar a lista de chamados e exibir apenas os que contem área igual a "Energia"', () => {
    cy.get(".ant-select").contains("Selecione a área").click({ force: true });
    cy.get(".ant-select-item-option-content").contains("Energia").click();

    cy.get(".ant-table-row", { timeout: 10000 }).should("contain", "Energia");
  });

  // PAGE SIZE
  it("Deve alterar a quantidade de itens exibidos por página de 10 por página para 20 por página", () => {
    cy.contains(".ant-select", "10 por página").click({ force: true });

    cy.get(".ant-select-item-option-content")
      .contains("20 por página")
      .click({ force: true });

    cy.url().should("include", "pageSize=20");

    cy.get(".ant-select").should("contain", "20 por página");

    cy.get(".ant-table-row").should("exist");
  });
  //#endregion

  //#region Pagination
  it('Deve navegar para a segunda página ao clicar na paginação "2"', () => {
    cy.get(".ant-pagination-item-2").first().click();

    cy.url().should("include", "page=2");

    cy.get(".ant-table-row").should("exist");
  });
  //#endregion

  //#region UI
  // ERROR STATE
  it('Deve exibir o estado de erro ao clicar no botão "Forçar Erro" e permitir recarregar os dados ao clicar em "Recarregar dados"', () => {
    cy.contains("button", "Forçar Erro").click();

    cy.get(".ant-result-error").should("be.visible");
    cy.contains("Falha na sincronização").should("be.visible");

    cy.contains("button", "Recarregar dados").click();

    cy.get(".ant-table-row").should("exist");
  });

  // EMPTY STATE
  it('Deve exibir o estado de lista vazia ao clicar no botão "Forçar Vazio" e conter o texto "Nenhum resultado para sua busca"', () => {
    cy.contains("button", "Forçar Vazio").click();

    cy.get(".ant-result-info").should("be.visible");
    cy.contains("Nenhum resultado para sua busca").should("be.visible");
  });

  // DRAWER
  it("Deve permitir ao usuário abrir os detalhes de um chamado ao clicar nele na tabela e fechar ao clicar em fechar.", () => {
    cy.get(".ant-table-row", { timeout: 10000 })
      .first()
      .should("be.visible")
      .click({ force: true });

    cy.get(".ant-drawer", { timeout: 15000 }).should("exist");
    cy.get(".ant-drawer-body").should("be.visible");
    cy.get(".ant-drawer-title").should("contain.text", "Detalhes");
    cy.get("iframe").should("exist");

    cy.get(".ant-drawer-close").click();
  });

  // VIEW SWITCH
  it("Deve alternar entre a visão de Técnico e Gestor", () => {
    cy.contains("Gestor").click();
    cy.get(".grid").should("exist");
  });
  //#endregion

  //#region Forms
  it("Deve abrir o modal, preencher os campos do formulário e criar um novo chamado com sucesso.", () => {
    cy.contains("button", /Criar chamado/i).click({ force: true });

    cy.get(".ant-modal", { timeout: 10000 }).should("be.visible");

    cy.get(".ant-modal").within(() => {
      cy.get('input[placeholder*="título"]').type("Falha no Servidor");
      cy.get('input[placeholder*="equipamento"]').type("Dell PowerEdge");
      cy.get('input[placeholder*="instalação"]').type("Data Center - Rack 04");
      cy.get('input[placeholder*="responsável"]').type("John Doe");
      cy.get('textarea[placeholder*="estado atual"]').type(
        "Servidor não inicializa após queda de energia.",
      );

      cy.contains(".ant-form-item", "Área").find(".ant-select").click();
    });

    cy.get(".ant-select-item-option-content").contains("Energia").click();

    cy.get(".ant-modal").within(() => {
      cy.contains(".ant-form-item", "Prioridade").find(".ant-select").click();
    });
    cy.get(".ant-select-item-option-content").contains("Crítica").click();

    cy.get(".ant-modal").within(() => {
      cy.get('button[type="submit"]')
        .contains(/Criar Chamado/i)
        .click();
    });

    cy.contains("Chamado criado com sucesso!", { timeout: 10000 }).should(
      "be.visible",
    );
    cy.get(".ant-modal").should("not.exist");
    cy.get(".ant-table-row").first().should("contain", "Falha no Servidor");
  });
  //#endregion
});
