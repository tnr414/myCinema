import { GET_MOVIES_ERROR, GET_MOVIES_SUCCESS } from "../actions/actionTypes";

const initState = {
    movies: [],
    movie: {},
    error: null,
};

export default function(state = initState, action) {
    switch (action.type) {
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
            };
        
        case GET_MOVIES_ERROR:
            return {
                ...state,
                error: action.error,
            }
    
        default:
            return state;
    }
};