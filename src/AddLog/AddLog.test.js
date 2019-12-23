import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddLog from './AddLog';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <AddLog />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
