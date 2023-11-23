import Axios from "axios";
import { GET_GENRES_ERROR, GET_GENRES_SUCCESS } from "./actionTypes";

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get('api/genres');
            dispatch({ type: GET_GENRES_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: GET_GENRES_ERROR, error });
        }
    };
};