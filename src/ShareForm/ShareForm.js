import React from 'react';
import './ShareForm.css';

export default function ShareForm(props) {
    const { className, ...otherProps } = props;
    return (
        <form
            className={['shareform', className].join(' ')}
            action='#'
            {...otherProps}
        />
    );
}
