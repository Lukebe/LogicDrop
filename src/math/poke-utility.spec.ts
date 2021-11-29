import pokeQuery from './poke-utility';
import Axios from 'axios';

// mock(str) such that str is the same as
// the string in the import statement
jest.mock('axios');

const mockAxios = <any>Axios;

describe('poke-utility', () => {

    describe('pokeQuery', () => {

        test('Happy path - get pikachu', async () => {
            mockAxios.get.mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        name: 'catdog',
                        id: 25,
                        sprites: {
                            'front_default': 'some-url'
                        },
                        types: [
                            {
                                type: {
                                    name: 'electric'
                                }
                            }
                        ]
                    }
                });
            })

            const result = await pokeQuery('pikachu');

            expect(result.id).toBe(25);
            expect(result.name).toBe('catdog');
            expect(result.spriteUrl).toBe('some-url');
            expect(result.types.length).toBe(1);
            expect(result.types[0]).toBe('electric');
        });
    });
});