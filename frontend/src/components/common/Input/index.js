import React from 'react'
import './style.css'

export const Input = props => {

    const { name, label, error, iconClass, ...rest } = props;

    return (
        <div className='input-container'>
            {label && <label>{label}</label>}
            {iconClass && <div className={`input-icon ${iconClass}`} />}
            <input name={name} {...rest} />
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    )
}
