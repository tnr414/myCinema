import React from 'react'
import './style.css'

export const ListGroup = (props) => {

    const { onChange, active, options } = props;

    const checkAllClass = (genre, active) => {
        const classButtons = 'list-group-item list-item';
        return genre === active ? classButtons + 'list-item-active' : classButtons;
    }

    // options.sort();

    return (
        <div className='list-group'>
            <li key='all' className={checkAllClass('All', active)} onClick={() => onChange('All')}> All </li>
            {
                options &&
                options.map(el => (
                    <li
                        key={el._id}
                        className={checkAllClass(el.genre, active)}
                        onClick={() => onChange(el.genre)}
                    >
                        {el.genre}
                    </li>
                ))
            }
        </div>
    )
}
