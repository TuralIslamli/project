import { ActionTypes } from "./actionTypes";


export const setUserProfile = (payload) => ({
    type: ActionTypes.SET_USER_PROFILE,
    payload,
});
export const setSelectedUserId = (payload) => ({
    type: ActionTypes.SET_SELECTED_USER_ID,
    payload,
});
export const setUserList = (payload) => ({
    type: ActionTypes.SET_USER_LIST,
    payload,
});

export const setSelectUserList = (payload) => ({
    type: ActionTypes.SET_SELECT_USER_LIST,
    payload,
});