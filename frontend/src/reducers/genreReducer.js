import { GET_GENRES_ERROR, GET_GENRES_SUCCESS } from "../actions/actionTypes";

const initState = {
    genres: [],
    newGenre: {},
    error: null,
};

export default function(state = initState, action) {
    switch (action.type) {
        case GET_GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload,
            };
        case GET_GENRES_ERROR:
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
}