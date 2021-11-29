import Axios from 'axios';

interface PokePayload {
    id: number;
    name: string;
    spriteUrl: string;
    types: string[];
}

const pokeQuery = (resource: string): Promise<PokePayload> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${resource}`;
    return Axios.get(url).then(payload => {
        const id = payload.data.id;
        const name = payload.data.name;
        const spriteUrl = payload.data.sprites.front_default;
        const types = payload.data.types.map((typingAssignment: any) => {
            return typingAssignment.type.name;
        });
        return { id, name, spriteUrl, types };
    })
}

export default pokeQuery;