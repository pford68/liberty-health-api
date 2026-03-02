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
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
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
    }
};

export default config;
