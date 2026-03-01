/**
 *
 */
import type { Config } from 'jest'
import {createDefaultPreset} from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config :Config= {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    /*
    transform: {
        ...tsJestTransformCfg,
    },*/

};

export default config;
