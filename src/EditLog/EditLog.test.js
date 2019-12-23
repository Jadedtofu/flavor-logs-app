import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditLog from './EditLog';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <EditLog />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
