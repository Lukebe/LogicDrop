import React from 'react';
import Axios from 'axios';

export class PokeComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            poke: {
                id: 1,
                name: 'Bulbasaur',
                types: 'Grass Poison',
                spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
            },
            numberSearch: 1
        }
    }


    async submit() {
        const url = `https://pokeapi.co/api/v2/pokemon/${this.state.numberSearch}`;
        Axios.get(url).then(payload => {
            this.setState({
                ...this.state,
                poke:{
                    id: payload.data.id,
                    name: payload.data.name,
                    spriteUrl: payload.data.sprites.front_default,
                    types: payload.data.types.map((typingAssignment) => {
                            return typingAssignment.type.name;
                        })
                }
            })
        })
    }

    updateSearchTerm = async (e) => {
        const term = e.target.value;
        this.setState({
            ...this.state,
            numberSearch: term
        })
    }

    render() {
        return (
            <div>
                <h1>Poke Finder</h1>
                <div id="poke-display">
                    <h2>#{this.state.poke.id}: {this.state.poke.name}</h2>
                    <img src={this.state.poke.spriteUrl}></img>
                    <div>
                        <span className="poke-type-span">{this.state.poke.type}</span>
                    </div>
                </div>
                <div id="poke-input">
                    <input type="text" id="poke-text-input" onChange={this.updateSearchTerm} />
                    <button onClick={() => this.submit()}>Submit</button>
                </div>
            </div>
        );
    }
}

export default PokeComponent;

