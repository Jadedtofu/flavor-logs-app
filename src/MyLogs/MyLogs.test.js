import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import MyLogs from './MyLogs';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <MyLogs />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
