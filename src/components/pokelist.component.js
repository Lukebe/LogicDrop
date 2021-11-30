import React, { useState } from 'react';
import Axios from 'axios';
import { usePokeName, usePokeNameUpdate } from '../contexts/PokeNameContext';
import { Link } from 'react-router-dom';

export function PokeListComponent() {
    const pokeName = usePokeName()
    const pokeNameUpdate = usePokeNameUpdate()
    const [poke, setPoke] = useState( () => {
        return [{
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        id: 1
        }]
    })
    const [listSize, setSize] = useState( () => {return 1});
    const [listOffset, setOffset] = useState(() => { return 0 });
    const [display, setdisplay] = useState(() => { return <div></div> });

    async function submit() {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${listSize}&offset=${listOffset}`;
        Axios.get(url).then((payload) => {
            setPoke( prevPoke =>
                payload.data.results.map((p) => {
                    return(
                    {
                        name:p.name,
                        url:p.url,
                            id: p.url.slice(-3, -1).replace("/","")
                    }
                    )
                })
            )
        })
    }

    function updateLimit(e) {
        const size = e.target.value;
        setSize( prevSize => size);
    }

    function updateOffset(e) {
        const offset = e.target.value;
        setOffset(prevOffset => offset);
    }

    function sortBy(direction) {
        let pokeArr = poke;
        let intermediate = {};
        for(let i=1; i < pokeArr.length; i++){
            for (let x = 1; x < pokeArr.length; x++) {
                switch (direction) {
                    case 'A': {
                        if (pokeArr[x].name < pokeArr[x - 1].name) {
                            intermediate = pokeArr[x - 1];
                            pokeArr[x - 1] = pokeArr[x];
                            pokeArr[x] = intermediate;
                        }
                    }
                        break;
                    case 'D': {
                        if (pokeArr[x].name > pokeArr[x - 1].name) {
                            intermediate = pokeArr[x - 1];
                            pokeArr[x - 1] = pokeArr[x];
                            pokeArr[x] = intermediate;
                        }
                    }
                }
            }
        }
        console.log(pokeArr);
        setPoke(prevPoke => pokeArr);
        setdisplay(updateDisplay())
    }

    async function updateSelectedName(name) {
        console.log("Before: "+ pokeName);
        pokeNameUpdate(name)
    }

    function updateDisplay() {
        const display = [];
        for (let p = 0; p < poke.length; p++) {
            display.push(
                <div key={poke[p].id}>
                    <ul>Name: {poke[p].name}</ul>
                    <ul>ID: {poke[p].id}</ul>
                    <Link to='/pokepage' onClick={() => updateSelectedName(poke[p].name)}>See My Page</Link>
                    <div></div>
                    <a href={poke[p].url}>Additional Information</a>
                </div>
            );
        }
        //setdisplay(prevDisplay => display)
        return display;
    }

    return (
        <div>
            <h1>Poke List</h1>
            <div id="poke-input">
                <p>Limit</p>
                <input type="text" id="poke-text-input" onChange={updateLimit} />
            </div>
            <div id="poke-input">
                <p>Offset</p>
                <input type="text" id="poke-text-input" onChange={updateOffset} />
            </div>
            <button onClick={() => submit()}>Submit</button>
            <button onClick={() => sortBy('A')}>Sort Ascending</button>
            <button onClick={() => sortBy('D')}>Sort Decending</button>
            <div id="poke-display">
                {updateDisplay()}
            </div>
        </div>
    );
}

export default PokeListComponent;
