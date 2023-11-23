import React from 'react'
import CardBack from './CardBack';
import CardFront from './CardFront';
import './style.css'

export const MovieCard = ({ movie }) => {

    const { _id, title, description, trailerLink, image, rate, movieLength, genre } = movie;

    const encodedImage = new Buffer(image.data, "binary").toString("base64");
    const coverImage = "data:image/jpeg;base64," + encodedImage;

    const flipCard = (cardId) => {
        const card = document.getElementById(`${cardId}`);
        card.classList.toggle('flipped');
    };

    return (
        <div className='card-container'>
            <div className='card-wrapper'
                id={_id}
                onClick={() => flipCard(_id)}
            >
                <CardFront
                    trailerLink={trailerLink}
                    coverImage={coverImage}
                    rate={rate}
                    movieLength={movieLength}
                    genre={genre}
                    title={title}
                />
                <CardBack description={description} />
            </div>
        </div>
    )
}
