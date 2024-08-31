/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // Form 요소에 값 입력 시뮬레이션
    // 버튼을 클릭 -> 대화 상자를 열거나 닫음
    // 목록 항목을 드래그하여 순서륿 바꾸는 동작을 자동화
    '@storybook/addon-interactions',
    'storybook-addon-react-router-v6',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
