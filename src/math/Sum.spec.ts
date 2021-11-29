import sum from './Sum';

// Describe the thing we're testing
// describe can be nested to better clarify
// the layers of objects or methods we are
// testing
describe('sum', () => {

    test('1 + 1 should be 2', () => {
        expect(sum(1, 1)).toBe(2);
    })

    test('1 + -1 should be 0', () => {
        expect(sum(1, -1)).toBe(0);
    })

    test('0.5 + 3.5 should be 4', () => {
        expect(sum(0.5, 3.5)).toBe(4);
    })
});