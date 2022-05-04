import { ActionTypes } from "./actionTypes";


export const setChangePassword = (payload) => ({
    type: ActionTypes.CHANGE_PASS_SAGA,
    payload,
});

export const setAuthorization = (payload) => ({
    type: ActionTypes.SET_AUTHORIZATION,
    payload
});