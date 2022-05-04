import { ActionTypes } from "./actionTypes";


export const setSendTimeData = (payload) => ({
    type: ActionTypes.SET_SEND_TIME_DATA,
    payload,
});

export const setDeleteTimeData = (payload) => ({
    type: ActionTypes.SET_DELETE_TIME_DATA,
    payload,
});

export const setSendVacationSickLeaveData = (payload) => ({
    type: ActionTypes.SET_SEND_VACATION_SICK_LEAVE_DATA,
    payload,
});