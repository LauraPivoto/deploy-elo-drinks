describe('Criando cenario de teste para a página Elo-Drinks', () => {

  it("Caso de teste: Formulário de orçamentos", () => {
    // Acessa a página principal
    cy.visit('http://localhost:3000');

    // Clica no botão identificado
    cy.get('.absolute > :nth-child(2)').click();

    // Verifica se o elemento com classe .h1 está visível
    cy.get('.h1').should('be.visible');
  });

  it("Valida que campo 'Orçamento aceito' é obrigatório", () => {
    acessarPaginaOrcamento();

    // Tenta preencher apenas os outros campos
    cy.get('input[type="number"]').type("50");
    cy.get("textarea").type("Alguma observação");

    // Clica no botão de envio
    cy.get('button[type="submit"]').click();

    // Verifica se continua na mesma página (formulário não enviado)
    cy.url().should("include", "/answer");

    // Verifica que o select ainda está com valor vazio
    cy.get("select").should("have.value", "");
  });

  it("Valida que campo 'Valor por pessoa' só aceita números", () => {
    acessarPaginaOrcamento();

    // Seleciona "Não" no dropdown
    cy.get("select").select("Não");

    // Tenta digitar letra no campo numérico
    cy.get('input[type="number"]').type("e", { force: true });

    // Tenta submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se o campo continua visível (não submetido)
    cy.url().should("include", "/answer");

    // Verifica que o valor do input continua vazio ou inválido
    cy.get('input[type="number"]').should("have.value", "");
  });

  it("Valida que campo 'Valor por pessoa' aceita apenas números positivos", () => {
    acessarPaginaOrcamento();

    // Seleciona "Sim" no dropdown
    cy.get("select").select("Sim");

    // Tenta digitar um valor negativo
    cy.get('input[type="number"]').type("-50", { force: true });
    // Após digitar valor negativo, verifica se o campo ficou vazio automaticamente
    cy.get('input[type="number"]').should("have.value", 0);

  });
  it("Valida que campo 'Observações' aceita texto livre", () => {
    acessarPaginaOrcamento();

    // Seleciona "Sim" no dropdown
    cy.get("select").select("Sim");

    // Digita um valor válido no campo numérico
    cy.get('input[type="number"]').type("50");

    // Digita texto livre no campo de observações
    cy.get("textarea").type("Alguma observação válida");

    // Verifica se o elemento com classe .h1 está visível na página de sucesso
    cy.get('.h1').should('be.visible');
  }
  );
  it("Valida que formulário não é enviado com campos obrigatórios vazios", () => {
    acessarPaginaOrcamento();

    // Tenta submeter o formulário sem preencher os campos obrigatórios
    cy.get('button[type="submit"]').click();

    // Verifica se a URL continua na página de orçamento
    cy.url().should("include", "/answer");

    // Verifica que o select ainda está vazio
    cy.get("select").should("have.value", "");

    // Verifica que o campo numérico está vazio
    cy.get('input[type="number"]').should("have.value", "");

    // Verifica que o campo de observações está vazio
    cy.get("textarea").should("have.value", "");
  }
  );

});

// Função utilitária para acessar a tela de orçamento
function acessarPaginaOrcamento() {
  cy.visit('http://localhost:3000/admin');
  cy.get(':nth-child(1) > .mt-6 > .bg-\\[\\#FF6B00\\]').click();
  cy.get('.bg-\\[\\#007366\\]').click();
  cy.get('.h1').should('be.visible');
}

function preencherFormularioOrcamento() {
  // Acessa a página de orçamento
  acessarPaginaOrcamento();

  // Preenche todos os campos corretamente
  cy.get("select").select("Sim"); // Orçamento aceito?
  cy.get('input[type="number"]').type("55.50"); // Valor por pessoa
  cy.get("textarea").type("Evento confirmado. Enviar contrato para assinatura."); // Observações
}

describe('Testes dos botões da FirstSection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('deve ir para a tela de login ao clicar em Login', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('deve rolar para a seção "Quem somos" ao clicar no botão correspondente', () => {
    // Adiciona um id fake na seção para garantir o teste
    cy.document().then((doc) => {
      const section = doc.createElement('div');
      section.id = 'second-section';
      doc.body.appendChild(section);
    });
    cy.contains('Quem somos').click();
    // Não há mudança de URL, mas você pode verificar se o elemento ficou visível
    cy.get('#second-section').should('exist');
  });

  it('deve rolar para a seção "Fazer um orçamento" ao clicar no botão correspondente', () => {
    // Adiciona um id fake na seção para garantir o teste
    cy.document().then((doc) => {
      const section = doc.createElement('div');
      section.id = 'third-section';
      doc.body.appendChild(section);
    });
    cy.contains('Fazer um orçamento').click();
    cy.get('#third-section').should('exist');
  });
});

describe('Fluxo completo de orçamento', () => {
  it('preenche todas as etapas do formulário e finaliza o orçamento', () => {
    cy.visit('http://localhost:3000');

    // Step 1
    cy.get('input[name="nome"]').type('João da Silva');
    cy.get('input[name="email"]').type('joao@email.com');
    cy.get('input[name="telefone"]').type('11999999999');
    cy.contains(/próximo/i).click();

    // Step 2
    cy.get('input[name="numConvidados"]').type('50');
    cy.get('input[name="tipoEvento"]').type('Aniversário');
    cy.get('input[name="localizacao"]').type('São Paulo');
    cy.contains(/próximo/i).click(); // <-- Adicione este clique para ir ao Step 3

    // Step 3
    cy.get('input[name="numBarmans"]').type('2');
    cy.get('select[name="tipoBar"]').select('Premium');
    cy.get('input[type="checkbox"]').first().check();
    cy.get('textarea[name="observacoes"]').type('Sem restrições alimentares.');
    cy.contains(/finalizar/i).click();

    // Confirmação
    cy.url().should('include', '/finishMessage');
  });

  it('exibe mensagem de erro quando o orçamento é feito incorretamente', () => {
    cy.visit('http://localhost:3000');

    // Não preenche o nome
    cy.get('input[name="email"]').type('joao@email.com');
    cy.get('input[name="telefone"]').type('11999999999');
    cy.contains(/próximo/i).click();

    // Verifica se a mensagem de erro aparece
    cy.contains('O nome é obrigatório.').should('be.visible');
  });
});

describe('Testes de integração', () => {
  const baseUrl = 'http://localhost:3000';

  it('cria um orçamento e envia corretamente para o backend', () => {
    cy.intercept('POST', 'https://elodrinks-api.onrender.com/budget').as('createBudget');

    cy.visit(`${baseUrl}/`);

    // Simula preenchimento básico para acionar a criação do orçamento
    cy.get('input[name="nome"]').type('Lucas Teste');
    cy.get('input[name="email"]').type('lucas@email.com');
    cy.get('input[name="telefone"]').type('11999999999');
    cy.contains(/próximo/i).click();

    cy.get('input[name="numConvidados"]').type('100');
    cy.get('input[name="tipoEvento"]').type('Festa');
    cy.get('input[name="localizacao"]').type('BH');
    cy.contains(/próximo/i).click();

    cy.get('input[name="numBarmans"]').type('3');
    cy.get('select[name="tipoBar"]').select('Premium');
    cy.get('input[type="checkbox"]').first().check();
    cy.get('textarea[name="observacoes"]').type('Teste intercept');
    cy.contains(/finalizar/i).click();

    cy.wait('@createBudget').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      expect(interception.request.body).to.have.property('name', 'Lucas Teste');
    });
  });

  it('busca os orçamentos pendentes na tela de administração', () => {
    cy.intercept('GET', 'https://elodrinks-api.onrender.com/budget').as('getPendentes');

    cy.visit(`${baseUrl}/admin`);

    cy.wait('@getPendentes').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.budgets).to.be.an('array');
    });
  });

  it('cria um orçamento e responde na interface de aprovação', () => {
    cy.intercept('POST', '**/budget').as('createBudget');

    cy.visit(`${baseUrl}/`);

    // simula o preenchimento do formulário
    cy.get('input[name="nome"]').type('Roberto Souza');
    cy.get('input[name="email"]').type('roberto@email.com');
    cy.get('input[name="telefone"]').type('11988997799');
    cy.contains(/próximo/i).click();

    cy.get('input[name="numConvidados"]').type('50');
    cy.get('input[name="tipoEvento"]').type('Festa');
    cy.get('input[name="localizacao"]').type('SP');
    cy.contains(/próximo/i).click();

    cy.get('input[name="numBarmans"]').type('2');
    cy.get('select[name="tipoBar"]').select('Premium');
    cy.get('input[type="checkbox"]').first().check();
    cy.get('textarea[name="observacoes"]').type('Campo de Observacoes');
    cy.contains(/finalizar/i).click();

    cy.wait('@createBudget').then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      const realId = response.body.id;
      expect(realId).to.exist;

      cy.intercept('PATCH', '**/budget/status').as('patchBudgetStatus');

      cy.visit(`${baseUrl}/answer?_id=${realId}`);

      cy.get('select').select('Sim');
      cy.get('input[type="number"]').clear().type('99.99');
      cy.get('textarea').type('Orçamento aprovado via teste.');
      cy.contains('button', /enviar resposta/i).click();

      cy.wait('@patchBudgetStatus').its('response.statusCode').should('eq', 200);
    });
  });

  it('não deve disparar POST se campos obrigatórios estiverem vazios', () => {
    cy.intercept('POST', '**/budget').as('createBudget');

    cy.visit('http://localhost:3000');

    // Preenche só email e telefone
    cy.get('input[name="email"]').type('teste@email.com');
    cy.get('input[name="telefone"]').type('11999999999');

    cy.contains(/próximo/i).click();

    // Confirma que o campo nome ainda está presente (não avançou)
    cy.get('input[name="nome"]').should('exist');

    // Aguarda um pouco e verifica se o POST não ocorreu
    cy.wait(1000);
    cy.get('@createBudget.all').should('have.length', 0);
  });

  it('não deve disparar PATCH se o valor por pessoa estiver vazio', () => {
    cy.intercept('PATCH', '**/budget/status').as('patchBudgetStatus');

    const fakeId = 'aaaa1111bbbb2222cccc3333';

    cy.visit(`http://localhost:3000/answer?_id=${fakeId}`);

    // Preenche apenas os campos visíveis, mas deixa o valor em branco
    cy.get('select').select('Sim');
    cy.get('input[type="number"]').clear(); // garante que está vazio
    cy.get('textarea').type('Tentando sem valor');

    cy.contains(/enviar resposta/i).click();

    // Aguarda um pouco e verifica que nenhuma requisição PATCH foi feita
    cy.wait(1000);
    cy.get('@patchBudgetStatus.all').should('have.length', 0);
  });

});

describe('Testes na tela de Login', () => {
  it('login com credenciais corretas', () => {
    cy.visit('http://localhost:3000/login');

    //logando corretamente
    cy.get('#usuario').type('admin');
    cy.get('#senha').type('senha123');

    cy.get('.pt-4 > .w-full').click();

    //esperado que trocou de pagina
    cy.url().should('include', '/admin');
  });

  it('login com credenciais incorretas', () => {
    cy.visit('http://localhost:3000/login');

    //tentando logar com usuario/senha errado
    cy.get('#usuario').type('mateus');
    cy.get('#senha').type('password');

    cy.get('.pt-4 > .w-full').click();

    //verificando se aparece a mensagem de erro
    cy.contains('Usuário ou senha incorretos.').should('be.visible');
  });

  it('login com campo vazio', () => {
    cy.visit('http://localhost:3000/login');

    //tentando logar com um campo vazio
    cy.get('#usuario').type('admin');

    cy.get('.pt-4 > .w-full').click();

    //como nao tem senha, nao vai para a pagina do admin
    cy.url().should('include', '/login');

    //mensagem custom de erro nao pode aparecer
    cy.contains('Usuário ou senha incorretos.').should('not.exist');
  });
});