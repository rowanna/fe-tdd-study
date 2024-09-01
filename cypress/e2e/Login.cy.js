beforeEach(() => {
    // baseURL을 가쥰으로 웹 페이지로 접속할 수  도와주는 함수
    cy.visit('/login')
})

it('이메일을 입력하지 않고 로그인 버튼을 클릭할 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
    // Cypress testing Library => 사용자가 앱을 사용하는 방식과 유사하게 요소 탐색 -> 신뢰성 있는 테스트 코드
    cy.findByLabelText('로그인').click();
    cy.findByText('이메일을 입력하세요').should('exist');
});

it('비밀번호를 입력하지 않고 로그인 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {

    cy.findByLabelText('로그인').click();
    cy.findByText('비밀번호를 입력하세요').should('exist');

});

it('잘못된 양식의 이메일을 입력한 뒤 로그인 버튼을 클릭할 경우 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
    cy.findByLabelText('이메일').type('wrongemain#mail.com');
    cy.findByLabelText('로그인').click();
    cy.findByText('이메일 양식이 올바르지 않습니다').should('exist'); // 체이닝 문법으로 테스트 과정을 쭉 이어서 작성할 수 있다.
});

it('회원 가입 클릭 시 회원 가입 페이지로 이동한다', () => {
    // E2E에서는 단위, 통합 테스트처럼 라우터 라이브러리를 모킹하는 작업이 없음
    // -> 실제로 페이지가 이동하는지 확인할 수  때문에 실제 앱의 동작과 완전히 동일하게 검증
    cy.findByText('회원가입').click();
    cy.url().should('eq', `${Cypress.env('baseUrl')}/register`);
});

it('성공적으로 로그인 되었을 경우 메인 홈 페이지로 이동하며, 사용자 이름 "Maria"와 장바구니 아이콘이 노출된다', () => {
    // 통합테스트에서 검증할 수 없는 부분 두 가지를 검증할 수 있다.
    // 1. 실제 로그인 API를 호출하여 백엔드까지 연동했을때 로그인의 성공 여부를 확인
    // 2. 메인 페이지로 이동하여 사용자 계정 정보가 나타나는지 확인 가능


    // 여기서 계정은 백엔드 팀과 미리 협의하여 확보해두는게 좋음
    // 그렇지 않으면 삭제 되었을시 테스팅 오류 날 수있기때문
    // 또한 별도와 환경변수로 관리하는게 좋음.
    const username = 'maria@mail.com'
    const password = '12345'
    cy.findAllByLabelText('이메일').type(username)
    cy.findAllByLabelText('비밀번호').type(password)
    cy.findAllByLabelText('로그인').click()


    cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
    cy.findByText('Maria').should('exist');
    cy.findByTestId('cart-icon').should('exist');
});
