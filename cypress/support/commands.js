import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => { // 커스텀 커맨드
  const username = 'maria@mail.com';
  const password = '12345';

  cy.visit('/login');

  cy.findByLabelText('이메일').type(username);
  cy.findByLabelText('비밀번호').type(password);
  cy.findByLabelText('로그인').click();

  // 로그인 처리 완료될때까지 기다림
  cy.findByText('Maria');
});

Cypress.Commands.add('logout', () => { // 커스텀 커맨드
  cy.findByRole('button', { name: 'Maria' }).click();
  cy.findByRole('button', { name: '확인' }).click();
});

Cypress.Commands.add('assertUrl', url => { // 현재 접속한 url이 특정 url과 동일한지 확인하는 단언 커맨드
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});

Cypress.Commands.add('getProductCardByIndex', index => { // 특정 인덱스에 해당하는 상품 카드 요소를 조회하여 반환.
  return cy.findAllByTestId('product-card').eq(index);
});


// 커스텀 쿼리
Cypress.Commands.addQuery('getCartButton', () => { 
  // cy.now()로 감싸 특정 쿼리를 호출 -> subject를 받아 inner function 에서 쿼리(get)를 실행할 수 있음
  const getFn = cy.now('get', `[data-testid="cart-icon"]`);

  // 커스텀 쿼리의 경우 콜백을 전달하는 방식이
  // 커스텀 커맨드와는 다르게 inner function 형태로 반환해야 함.
  return subject => {
    // cart-icon testid를 가진 요소를 조회하는 get 쿼리
    // 우리가 원하는 subject를 기준으로 실행함.
    const btn = getFn(subject);

    return btn;
  };
});
