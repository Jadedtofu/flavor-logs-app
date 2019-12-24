import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Eatery from './Eatery';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Eatery />
        </BrowserRouter>
        , div);
        ReactDOM.unmountComponentAtNode(div)
});
