import { ActionTypes } from "./actionTypes";


export const setUserTokenData = (payload) => ({
    type: ActionTypes.SET_USER_TOKEN_DATA,
    payload
});

export const setInitialData = (payload) => ({
    type: ActionTypes.SET_INITIAL_DATA,
    payload
});

export const setRolesCMD = (payload) => ({
    type: ActionTypes.SET_ROLES_CMD,
    payload
});

export const setIsAuthorized = (payload) => ({
    type: ActionTypes.SET_IS_AUTHORIZED,
    payload
});

export const setPassword = (payload) => ({
    type: ActionTypes.SET_PASSWORD,
    payload
})