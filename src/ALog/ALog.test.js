import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ALog from './ALog';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const eatery = [
        {
            id: 1, 
            name: "Pho Mignon", 
            phone: "760-320-5210", 
            address: "1235 North Island Street, San Diego, CA 92108", 
            notes: "Open M-F 9 am - 9 pm, Sat 9 am - 11 pm, Sun 10 am - 8 pm"
          }
    ];

    ReactDOM.render(
        <BrowserRouter>
            <ALog eatery={eatery} />
        </BrowserRouter>
        , div);
        ReactDOM.unmountComponentAtNode(div)
});
