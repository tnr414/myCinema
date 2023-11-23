import { combineReducers } from "redux";
import authReducer from "./authReducer";
import genreReducer from "./genreReducer";
import movieReducer from "./movieReducer";

export default combineReducers({
    auth:  authReducer,
    movie: movieReducer,
    genre: genreReducer,
})