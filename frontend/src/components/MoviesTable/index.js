import React from 'react'
import { MovieCard } from './MovieCard';
import './style.css'

export const MoviesTable = ({ movies, currentPage, pageSize }) => {
    const currentMovies = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return (
        <div className='movies-grid'>
            {!!movies && currentMovies.map((movie) => 
                <MovieCard movie={movie} key={movie._id} />
            )}
        </div>
    )
};