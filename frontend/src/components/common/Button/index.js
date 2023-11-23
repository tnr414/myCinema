import React from 'react'
import './style.css'

export const Button = ({ label, ...rest }) => {
    return (
        <button className='btn' {...rest}>
            {label}
        </button>
    );
};
