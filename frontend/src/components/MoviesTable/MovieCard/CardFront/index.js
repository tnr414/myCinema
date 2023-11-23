import React from 'react';
import './style.css';

const CardFront = ({ coverImage, title, movieLength, genre, trailerLink, rate }) => {
    return (
        <div className='front'>
            <img src={coverImage} alt="coverImage" />
            <div className='card-footer'>
                <h4> {title} </h4>
                <p>
                    {movieLength} / {genre}
                </p>
                <a
                    href={trailerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='trailer-btn'
                >
                    Watch Trailer
                </a>
            </div>
            <span className='like'>{rate}</span>
        </div>
    );
};

export default CardFront;