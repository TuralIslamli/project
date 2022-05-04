import { ActionTypes } from "./actionTypes";


export const setApproveTimeList = (payload) => ({
    type: ActionTypes.SET_APPROVE_TIME_LIST,
    payload,
});

export const setIsLoadingApproveTime = (payload) => ({
    type: ActionTypes.SET_IS_LOADING_APPROVE_TIME,
    payload,
});

export const setDate = (payload) => ({
    type: ActionTypes.SET_APPROVE_DATE,
    payload,
});

export const setTimeForDelete = (payload) => ({
    type: ActionTypes.SET_TIME_FOR_DELETE,
    payload,
});

export const setIsLoadingDeleteTime = (payload) => ({
    type: ActionTypes.SET_IS_LOADING_DELETE_TIME,
    payload,
});

export const setFiltersList = (payload) => ({
    type: ActionTypes.SET_FILTERS,
    payload,
});

export const clearFiltersList = () => ({
    type: ActionTypes.CLEAR_FILTERS
});