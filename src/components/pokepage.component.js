import React from 'react';

export function PokePageComponent(props) {
    
    console.log(props)
    return (
        <>
            <p>Hello, I am {props.name}</p>
        </>
    )

}

export default PokePageComponent;