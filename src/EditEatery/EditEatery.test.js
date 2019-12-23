import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditEatery from './EditEatery';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <EditEatery />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
