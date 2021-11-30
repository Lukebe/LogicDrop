import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ClickerComponent } from './clicker.component';
import { Button } from 'reactstrap';
configure({ adapter: new Adapter() })
/**
 * Enzyme is a testing package for React
 * applications produced by Airbnb.
 *
 * Enzyme is able to render React components
 * in both complete and shallow states and
 * provide us a simple toolset to make
 * assertions against the rendered state.
 */

describe('<ClickerComponent />', () => {

    let clicker;
    beforeEach(() => {
        // Creates an in data rendering of the component in a shallow state
        // shallow: does not render subcomponents
        clicker = shallow(<ClickerComponent />);
    })

    test('that when count is 0 then displays 0 in component', () => {
        // expect that we see 0 rendered in the correct location
        // find(..) which can find a rendered element using CSS-like syntax
        expect(clicker.contains(<p>You clicked 0 times</p>)).toBe(true);
    })

    test('that when button is click count is updated to 1 in component', () => {
        clicker.find("#counter").simulate("click");
        //console.log(clicker.debug())
        expect(clicker.contains(<p>You clicked 1 times</p>)).toBe(true);
    })
});