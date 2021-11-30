import React, { useContext, useState } from 'react'

const PokeNameContext = React.createContext()
const PokeNameUpdateContext = React.createContext()

export function usePokeName() {
    return useContext(PokeNameContext)
}

export function usePokeNameUpdate() {
    return useContext(PokeNameUpdateContext)
}

export function PokeNameProvider({ children}) {
    const [pokeName, setPokeName] = useState(() => {return "bulbasaur"})

    function updateName(name) {
        setPokeName(prevName => name);
    }

    return (
        <PokeNameContext.Provider value={pokeName}>
            <PokeNameUpdateContext.Provider value={setPokeName}>
                {children}
            </PokeNameUpdateContext.Provider>
        </PokeNameContext.Provider>
    )
}