import React from 'react';
import ReactDOM from 'react-dom';
import ShareForm from './ShareForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ShareForm />
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
