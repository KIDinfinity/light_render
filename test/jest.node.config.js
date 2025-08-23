module.exports = {
  testURL: 'http://localhost:8000',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  maxWorkers: '90%',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/plugins/', 'tests/sso', '<rootDir>/src/e2e', '<rootDir>/packages', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/packages/Process/NB/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  moduleNameMapper: {
    '@/utils/dictFormatMessage': '<rootDir>/__mocks__/utils/dictFormatMessage',
    '@/utils/locales/queryDebuggerLocale': '<rootDir>/__mocks__/utils/locales/queryDebuggerLocale',
    '@/utils/dictionary': '<rootDir>/__mocks__/utils/dictionary',
    "^bpm/(.*)$": "<rootDir>/packages/BPM/src/$1",
    "^navigator/(.*)$": "<rootDir>/packages/Navigator/src/$1",
    "^mocks/(.*)$": "<rootDir>/__mocks__/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|svg)$": "<rootDir>/__mocks__/styleMock.js",
    "^claim/(.*)$": "<rootDir>/packages/Claim/src/$1",
    "^enum/(.*)$": "<rootDir>/packages/Basic/src/enum/$1",
    "^basic/(.*)$": "<rootDir>/packages/Basic/src/$1",
    "^process/(.*)$": "<rootDir>/packages/Process/$1",
  },
  // preset: 'jest-puppeteer',
  // extraSetupFiles: ['./tests/setupTests.js'],
};
