import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT, SIGNUP_ERROR, SIGNUP_SUCCESS } from './actionTypes';
import axios from 'axios';

export const signIn = (credentials) => {
    return async (dispatch) => {
        try {
            const result = await axios.post("/api/users/login", credentials);
            dispatch({ type: LOGIN_SUCCESS, payload: result });
        } catch (error) {
            dispatch({ type: LOGIN_ERROR, error })
        }
    }
};

export const signUp = (credentials) => {
    return async (dispatch) => {
        try {
            const result = await axios.post("/api/users/signup", credentials);
            dispatch({ type: SIGNUP_SUCCESS, payload: result });
        } catch (error) {
            dispatch({ type: SIGNUP_ERROR, error });
        }
    }
};

export const signOut = () => {
    return (dispatch) => {
        dispatch({ type: SIGNOUT });
    }
}