describe('Testing front-end integration', () => {

  it('Test if our application is up', () => {
    cy.visit('http://localhost:3000');
  });

  it('Test if our login button gets disabled when we dont have anything on input', () => {
    cy.visit('http://localhost:3000');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Test if we can login on our application', () => {
    cy.visit('http://localhost:3000');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('daniellewinters');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').type('daniellewinters@kpis.tech');
    cy.get('button[type="submit"]').should('be.enabled');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/employeeDashboard');
  });

  it('Test if we can see our employee dashboards', () => {
    cy.visit('http://localhost:3000/employeeDashboard?email=daniellewinters%40kpis.tech');
    cy.get('h1[id="Headcount"]').should('contain', 'Evolução de Headcount');
    cy.get('h1[id="Turnover"]').should('contain', 'Evolução de Turnover');
  });
});

describe('Testing back-end methods and their response', () => {
  it('Test method GET on turnover and checking if response status is 200 with its following body', () => {
    cy.request('GET', 'http://localhost:3000/api/turnover?email=daniellewinters@kpis.tech').should((response) => {
      expect(response.status).to.eq(200);
      for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i]).to.have.property('mes_ano');
        expect(response.body[i]).to.have.property('turnover');
      }
    });
  });

  it('Test method GET on turnover and checking if response status is 400 with its following body error message', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/turnover',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
      console.log(response.Body);
      expect(response.body.error).to.eq('Email is required');
    });
  });

  it('Test method GET on headcount and checking if response status is 200 with its following body', () => {
    cy.request('GET', 'http://localhost:3000/api/headcount?email=daniellewinters@kpis.tech').should((response) => {
      expect(response.status).to.eq(200);
      for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i]).to.have.property('mes_ano');
        expect(response.body[i]).to.have.property('headcount_inicio_mes');
        expect(response.body[i]).to.have.property('headcount_fim_mes');
      }
    });
  });

  it('Test method GET on headcount and checking if response status is 400 with its following body error message', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/headcount',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.eq('Email is required');
    });
  });

  it('Test method GET on headcount-for-turnover and checking if response status is 200 with its following body', () => {
    cy.request('GET', 'http://localhost:3000/api/headcount-for-turnover?email=daniellewinters@kpis.tech').should((response) => {
      expect(response.status).to.eq(200);
      for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i]).to.have.property('mes_ano');
        expect(response.body[i]).to.have.property('headcount');
      }
    });
  });

  it('Test method GET on headcount-for-turnover and checking if response status is 400 with its following body', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/headcount-for-turnover',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.eq('Email is required');
    });
  });

});