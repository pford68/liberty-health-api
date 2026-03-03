/**
 *
 */
import type { Config } from 'jest'

/** @type {import("jest").Config} **/
const config :Config= {
    preset: 'ts-jest/presets/default-esm',
    verbose: true,
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    extensionsToTreatAsEsm: ['.ts'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/src/__integration__/",
    ],
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
};

if (process.env.NODE_ENV == "integration") {
    let {testPathIgnorePatterns, testMatch} = config;
    if (testPathIgnorePatterns?.[0] !== undefined) {
        testPathIgnorePatterns = [testPathIgnorePatterns[0]]
        testPathIgnorePatterns.push("<rootDir>/src/**/__tests__/");
    }
    if (testMatch?.[0] !== undefined) {
        testMatch = ['**/__integration__/**/*.test.ts'];
    }
}

export default config;
