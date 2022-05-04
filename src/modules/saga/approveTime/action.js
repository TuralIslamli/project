import { ActionTypes } from "./actionTypes";


export const setGetTimes = (payload) => ({
    type: ActionTypes.SET_GET_TIMES,
    payload,
});

export const setApproveDeclineTime = (payload) => ({
    type: ActionTypes.SET_APPROVE_DECLINE_TIME,
    payload,
});