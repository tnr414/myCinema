import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT, SIGNUP_ERROR, SIGNUP_SUCCESS } from "../actions/actionTypes";

const initState = {
    loggedIn: false,
    userData: {},
    authMessage: null
}

export default function(state = initState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, 
                loggedIn: true,
                userData: action.payload.data.userData,
                authMessage: action.payload.data.authMessage,
            };
        
        case LOGIN_ERROR:
            return {
                ...state,
                authMessage: action.error.response.data.error,
            };
        
        case SIGNUP_SUCCESS: 
            return {
                ...state, 
                loggedIn: true,
                userData: action.payload.data.userData,
                authMessage: action.payload.data.authMessage,
            };
        
        case SIGNUP_ERROR:
            return {
                ...state,
                authMessage: action.error.response.data.error,
            };
        
        case SIGNOUT: 
            return {
                ...state,
                loggedIn: false,
                userData: {},
                authMessage: null,
            };
    
        default:
            return state;
    }
}