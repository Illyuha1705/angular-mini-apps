module.exports = {
    preset: 'jest-preset-angular',
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html'],
    forceCoverageMatch: ['**/visa-card/src/**/*.ts'],
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/visa-card/src/**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};