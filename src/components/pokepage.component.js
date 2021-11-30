import React from 'react';
import { Link } from 'react-router-dom';
import { usePokeName } from '../contexts/PokeNameContext';

export function PokePageComponent() {
    
    const name = usePokeName()

    return (
        <>
        <div>
            <Link to='/pokelist'>Back</Link>
        </div>
            <p>Hello, I am {name}</p>
        </>
    )

}

export default PokePageComponent;