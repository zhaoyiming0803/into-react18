/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

type ITestType = 'test:unit' | 'test:e2e'

const testTypeMap = {
  'test:unit': '.unit.test.js',
  'test:e2e': '.e2e.test.js'
}

const testType = process.env.npm_lifecycle_event as ITestType
const testMatch = [
  "**/__tests__/**/user.unit.test.js",
  "**/__tests__/**/user.e2e.test.js"
].filter(item => item.indexOf(testTypeMap[testType]) > -1)

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    './src/components/**/*.tsx'
  ],
  coverageReporters: ['html', 'lcov', 'text'],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  rootDir: '.',
  // moduleNameMapper: {
  //   "/^@/": '<rootDir>/src'
  // }
  setupFiles: [
    './tests/setup.js'
  ]
}
