import { ActionTypes } from "./actionTypes";


export const setLogOut = (payload) => ({
    type: ActionTypes.SET_LOG_OUT,
    payload,
});

export const setEditUser = (payload) => ({
    type: ActionTypes.SET_EDIT_USER,
    payload,
});