import React from 'react';
import { shallow } from 'enzyme';
import { ClickerComponent, IClickerProps } from './clicker.component';

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

    test('that when clicks are 100 then displays 100 in component', () => {
        // Defining input properties
        const props: IClickerProps = {
            clicker: {
                clicks: 100
            },
            updateClicks: jest.fn()
        }

        // Creates an in data rendering of the component in a shallow state
        // shallow: does not render subcomponents
        const clicker = shallow(<ClickerComponent {...props} />);

        // expect that we see 100 rendered in the correct location
        // find(..) which can find a rendered element using CSS-like syntax
        expect(clicker.contains((<h2>Clicks: 100</h2>))).toBe(true);


    })
});