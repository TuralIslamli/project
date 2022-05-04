import { ActionTypes } from "./actionTypes";


const initialState = {
    userToken: "",
    rolesCMD: [],
    isAuthorized: false,
    password: ''
};

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_TOKEN_DATA:
            return ({
                ...state,
                userToken: action.payload.token,
            });
        case ActionTypes.SET_ROLES_CMD:
            return ({
                ...state,
                rolesCMD: action.payload,
            });
        case ActionTypes.SET_IS_AUTHORIZED:
            return ({
                ...state,
                isAuthorized: action.payload,
            });
        case ActionTypes.SET_PASSWORD:
            return ({
                ...state,
                password: action.payload
            });
        case 'SET_RESET':
            return ({
                ...initialState,
            });
        default:
            return state;
    };
};