import React from 'react';

export function PokePageComponent(props) {
    
    console.log(this.props)
    return (
        <>
            <p>Hello, I am {this.props.name}</p>
        </>
    )

}

export default PokePageComponent;