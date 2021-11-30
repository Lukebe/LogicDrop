import React, { useContext, useState } from 'react'

const PokeNameContext = React.createContext()

export function usePokeName() {
    return useContext(PokeNameContext)
}

export function PokeNameProvider({ children}) {
    const [pokeName, setPokeName] = useState("Bulbasaur")

    return (
        <PokeNameContext.Provider value={pokeName, setPokeName}>
            {children}
        </PokeNameContext.Provider>
    )
}