/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    "**/__tests__/**/user.test.js",
    "**/__tests__/**/e2e.test.js",
  ],
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
}
