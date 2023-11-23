import React from 'react'
import './style.css'

export const Select = (props) => {

    const { name, label, options, error, iconClass, value, onChange } = props;

    if(!options) return <></>

    return (
        <div className='input-container'>
            {label && <label htmlFor={name}> {label} </label>}
            <div className={`input-icon ${iconClass}`}/>
            <select name={name} value={value} onChange={onChange}>
                <option disabled value=''>Select</option>
                {options.map(element => (
                    <option key={element._id} value={element.value}>
                        {element.value}
                    </option>
                ))}
            </select>
            {error && <div className='alert alert-danger'>{error}</div> }
        </div>
    )
}
