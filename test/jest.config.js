const { createConfig } = require('@umijs/max/test');

const umiConfig = createConfig({
  target: 'browser',
  jsTransformer: 'esbuild',
  jsTransformerOpts: { jsx: 'automatic' },
});

module.exports = {
  ...createConfig(),
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:8000',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  maxWorkers: '90%',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  modulePathIgnorePatterns: [
    '<rootDir>/plugins/',
    '<rootDir>/scripts/',
    'tests/sso',
    '<rootDir>/src/e2e',
    '<rootDir>/packages/Navigator',
    '<rootDir>/src',
  ],
  collectCoverageFrom: ['<rootDir>/packages/Process/NB/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    // '@/components/Tenan': '<rootDir>/src/components/Tenant',
    '@/utils/dictFormatMessage': '<rootDir>/__mocks__/utils/dictFormatMessage',
    '@/utils/locales/queryDebuggerLocale': '<rootDir>/__mocks__/utils/locales/queryDebuggerLocale',
    '@/utils/dictionary': '<rootDir>/__mocks__/utils/dictionary',
    '^bpm/(.*)$': '<rootDir>/packages/BPM/src/$1',
    '^opus/(.*)$': '<rootDir>/packages/Opus/$1',
    '^navigator/(.*)$': '<rootDir>/packages/Navigator/src/$1',
    '^mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|svg)$': '<rootDir>/__mocks__/styleMock.js',
    '^claim/(.*)$': '<rootDir>/packages/Claim/src/$1',
    '^summary/(.*)$': '<rootDir>/packages/SummaryPage/$1',
    '^enum/(.*)$': '<rootDir>/packages/Basic/src/enum/$1',
    '^basic/(.*)$': '<rootDir>/packages/Basic/src/$1',
    '^process/(.*)$': '<rootDir>/packages/Process/$1',
    '@mc': '<rootDir>/packages/MessageCenter/src',
    '^integration/(.*)$': '<rootDir>/packages/Integration/$1',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '^@components(.*)': '<rootDir>/src/components$1',
    '\\.(png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    ...umiConfig.transform,
    '^.+\\.(svg)$': '<rootDir>/__mocks__/svgTransform.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(umi|query-string|decode-uri-component|split-on-first|filter-obj|flat|umi|@umijs)/)',
  ],
};
