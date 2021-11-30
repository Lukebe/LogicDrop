import React from 'react';
//import apis from './apis';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ClickerComponent } from './clicker.component';
import PokeListComponent from './pokelist.component';
jest.mock('axios');
import axios from 'axios';
configure({ adapter: new Adapter() })

describe('PokeListComponent', () => {
    const submitSpy = jest.fn();
    const submit = submitSpy;
    const submitFunc = jest.spyOn(PokeListComponent, 'updateLimit');

    const pokelist = shallow((<PokeListComponent submit={submitSpy}/>));
    const url = 'http://test-url.com';
    const onComplete = jest.fn();
    const data = {
        results: [
            {
                name: "venusaur",
                url: "https://pokeapi.co/api/v2/pokemon/3/"
            },
            {
                name: "charmander",
                url: "https://pokeapi.co/api/v2/pokemon/4/"
            }
        ]
    };
    beforeEach(() => {
        // Creates an in data rendering of the component in a shallow state
        // shallow: does not render subcomponents
        axios.get.mockResolvedValue(data);
    })

    test('should call submit on submit button click', () => {
        expect (submitSpy).not.toHaveBeenCalled();
        pokelist.find("#submitBtn").simulate("click");
        expect(submitSpy).toHaveBeenCalled();
        expect(pokelist.contains(<ul>
            ID:
            1
        </ul>)).toBe(true);
        console.log(pokelist.poke)
    })

    test('should call axios get with given url', () => {
        //pokelist.submit();
        //expect(axios.get).toBeCalledWith(url);
    });

    test('should call onComplete callback with response', async () => {
        //await pokelist.submit();
        //expect(onComplete).toBeCalledWith(data);
    });

    test('that when count is 0 then displays 0 in component', () => {
        
        //expect(clicker.contains(<p>You clicked 0 times</p>)).toBe(true);
    })
});