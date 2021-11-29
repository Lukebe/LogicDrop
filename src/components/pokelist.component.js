import React, { useState } from 'react';
import Axios from 'axios';

export function PokeListComponent() {
    const [poke, setPoke] = useState( () => {
        return [{
        name: 'Bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        id: 1
        }]
    })
    const [listSize, setSize] = useState( () => {return 1});
    const [listOffset, setOffset] = useState( () => {return 0});
    
    
    const display= [];
    for (let p=0; p< poke.length; p++) {
        display.push(
            <div>
            <ul>Name: {poke[p].name}</ul>
                <ul>ID: {poke[p].id}</ul>
                <a href='/pokepage'>See My Page</a>
                <div></div>
            <a href={poke[p].url}>Additional Information</a>
        </div>
        );
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
            <button onClick={submit()}>Submit</button>
            <button onClick={() => sortByA()}>Sort Ascending</button>
            <button onClick={() => sortByD()}>Sort Decending</button>
            <div id="poke-display">
                {display}
            </div>
        </div>
    );

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

    function sortByA() {
        let pokeArr = poke;
        let intermediate = {};
        for(let i=1; i < pokeArr.length; i++){
            for (let x = 1; x < pokeArr.length; x++) {
                if (pokeArr[x].name < pokeArr[x-1].name){
                    intermediate = pokeArr[x-1];
                    pokeArr[x-1] = pokeArr[x];
                    pokeArr[x] = intermediate;
                }
            }
        }
        console.log(pokeArr);
        setPoke(prevPoke => pokeArr)
    }

    function sortByD() {
        let pokeArr = poke;
        let intermediate = {};
        for (let i = 1; i < pokeArr.length; i++) {
            for (let x = 1; x < pokeArr.length; x++) {
                if (pokeArr[x].name > pokeArr[x - 1].name) {
                    intermediate = pokeArr[x - 1];
                    pokeArr[x - 1] = pokeArr[x];
                    pokeArr[x] = intermediate;
                }
            }
        }
        console.log(pokeArr);
        setPoke(prevPoke => pokeArr)
    }
}

export default PokeListComponent;
