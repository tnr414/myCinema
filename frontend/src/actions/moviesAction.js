import Axios from "axios";
import { GET_MOVIES_ERROR, GET_MOVIES_SUCCESS } from "./actionTypes";

export const getMovies = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get('/api/movies');
            dispatch({ type: GET_MOVIES_SUCCESS, payload: result.data.movies });
        } catch (error) {
            dispatch({ type: GET_MOVIES_ERROR, error });
        }
    };
};

export const addMovie = (movie) => {
    const contentType = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };

    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('numberInStock', movie.numberInStock);
    formData.append('genre', movie.genre);
    formData.append('image', movie.image);
    formData.append('description', movie.description);
    formData.append('rate', movie.rate);
    formData.append('movieLength', movie.movieLength);
    formData.append('trailerLink', movie.trailerLink);

    return async (dispatch) => {
        try {
            const result = await Axios.post('api/movies/addmovie', formData, contentType);
            dispatch({ type: GET_MOVIES_SUCCESS, payload: result.data.movies });
        } catch (error) {
            dispatch({ type: GET_MOVIES_ERROR, error })
        }
    }
};