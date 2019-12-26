import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ALog from './ALog';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <ALog />
        </BrowserRouter>
        , div);
        ReactDOM.unmountComponentAtNode(div)
});
