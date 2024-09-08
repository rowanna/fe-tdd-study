beforeEach(() => {
  cy.visit('/login');
  cy.findByLabelText('로그인').as('loginBtn');
});

it('이메일을 입력하지 않고 로그인 버튼을 클릭할 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
  // get API -> Cypress에서 지정한 별칭(alias)로 선언한 요소에 접근 가능
  // 체이닝 형태로 테스트 코드 작성 -> 테스트의 과정을 이해하기 쉬움, 코드를 간결하게 작성할 수 있음
  cy.get('@loginBtn').click();

  cy.findByText('이메일을 입력하세요').should('exist');
});

it('비밀번호를 입력하지 않고 로그인 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {
  cy.get('@loginBtn').click();

  cy.findByText('비밀번호를 입력하세요').should('exist');
});

it('잘못된 양식의 이메일을 입력한 뒤 로그인 버튼을 클릭할 경우 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
  // 1. 이메일 요소 조회 커맨드 실행 -> 완료되어야 type 커맨드로 subject가 넘어가 실행됨
  // 2. type 커맨드로 텍스트 입력
  cy.findByLabelText('이메일').type('wrongemail#mail.com');
  // const email = cy.findByLabelText('이메일')
  // email.type('wrongemail#mail.com')

  // 커맨드가 실행될 때 각 subject는 내부적으로 비동기 대기열에서 대기하다가 실행
  // get API나 테스팅 라이브러리의 쿼리 실행이 완료 되는 타이밍
  // -> subject 체이닝 형태로 연속해서 커맨드를 실행 or then() API를 사용

  // then() API -> 이전 커맨드의 subject 실행 결과를 전달받아 사용
  // 체이닝 형태로만 subject의 결과를 전달받아 사용가능 -> 실행 결과 전달을 yield라고 표현
  cy.findByLabelText('로그인').click();

  // then 내부에서 반환하는 값은 새로운 subject가 되어 다음 커맨드에서 사용
  // 아무것도 반환하지 않을 경우 다음 커맨드에서는 이전 subject를 그대로 사용
  cy.findByLabelText('이메일')
    .then($email => {
      const cls = $email.attr('class');

      // ...
      cy.wrap($email).click();
    })
    .click();

  cy.findByText('이메일 양식이 올바르지 않습니다').should('exist');
});

it('회원 가입 클릭 시 회원 가입 페이지로 이동한다', () => {
  cy.findByText('회원가입').click();

  cy.url().should('eq', `${Cypress.env('baseUrl')}/register`);
});

it('성공적으로 로그인 되었을 경우 메인 홈 페이지로 이동하며, 사용자 이름 "Maria"와 장바구니 아이콘이 노출된다', () => {
  // const username = 'maria@mail.com';
  // const password = '12345';

  // cy.findByLabelText('이메일').type(username);
  // cy.findByLabelText('비밀번호').type(password);
  // cy.findByLabelText('로그인').click();
  cy.login();


  // cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
  cy.assertUrl('/');
  cy.findByText('Maria').should('exist');
  cy.findByTestId('cart-icon').should('exist');
});
