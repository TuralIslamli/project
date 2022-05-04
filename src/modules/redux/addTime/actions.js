import { ActionTypes } from "./actionTypes";


export const setAddTimeData = (payload) => ({
    type: ActionTypes.SET_ADD_TIME_DATA,
    payload,
});
export const deleteAddTimeData = (payload) => ({
    type: ActionTypes.SET_DELETE_ADD_TIME_DATA,
    payload,
});
export const setResetAddTimeData = () => ({
    type: ActionTypes.SET_RESET_ADD_TIME_DATA,
});