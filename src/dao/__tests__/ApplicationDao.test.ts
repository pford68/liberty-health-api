import {describe, expect, it} from '@jest/globals';

describe('adds 1 + 2 to equal 3', () => {
    it("should work", () => {
        expect(2 + 1).toBe(3);
    });
});