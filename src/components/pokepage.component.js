import React from 'react';
import { usePokeName } from '../contexts/PokeNameContext';

export function PokePageComponent() {
    
    const name = usePokeName()

    return (
        <>
            <p>Hello, I am {name}</p>
        </>
    )

}

export default PokePageComponent;