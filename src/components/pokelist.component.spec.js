import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PokeListComponent from './pokelist.component';
jest.mock('axios');
import axios from 'axios';
configure({ adapter: new Adapter() })

describe('PokeListComponent', () => {
    const submitSpy = jest.fn();
    //const submitFunc = jest.spyOn(PokeListComponent, 'updateLimit');

    const pokelist = shallow((<PokeListComponent submit={submitSpy}/>));
    const data = {
        data: {    
            results: [
                {
                    name: "ivysaur",
                    url: "https://pokeapi.co/2/"
                },
                {
                    name: "venusaur",
                    url: "https://pokeapi.co/3/"
                },
                {
                    name: "charmander",
                    url: "https://pokeapi.co/4/"
                }
            ]
        }
    };
    beforeEach(() => {
        // Creates an in data rendering of the component in a shallow state
        // shallow: does not render subcomponents
        axios.get.mockResolvedValue(data);
        pokelist.find("#submitBtn").simulate("click");
    })

    test('should display axios data on submit button click', () => {
         expect(pokelist.contains(
            <ul>
                Name:
                ivysaur
            </ul>)).toBe(true);
    })

    test('should display id from axios url data', () => {
        expect(pokelist.contains(
            <ul id={0}>
                ID:
                2
            </ul>)).toBe(true);
    });

    test('should sort display ascending', () => {
        pokelist.find("#sortABtn").simulate("click");
        expect(pokelist.contains(
            <ul id={0}>
                ID:
                4
            </ul>)).toBe(true);
    });

    test('should sort display ascending', () => {
        pokelist.find("#sortDBtn").simulate("click");
        expect(pokelist.contains(
            <ul id={0}>
                ID:
                3
            </ul>)).toBe(true);
    });
});