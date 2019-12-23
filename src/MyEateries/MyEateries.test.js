import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MyEateries from './MyEateries';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <MyEateries />
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
