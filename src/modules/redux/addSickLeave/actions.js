import { ActionTypes } from "./actionTypes";


export const setAddSickLeaveData = (payload) => ({
    type: ActionTypes.SET_ADD_SICK_LEAVE_DATA,
    payload,
});
export const deleteAddSickLeaveData = (payload) => ({
    type: ActionTypes.SET_DELETE_ADD_SICK_LEAVE_DATA,
    payload,
});
export const setResetAddSickLeaveData = () => ({
    type: ActionTypes.SET_RESET_ADD_SICK_LEAVE_DATA,
});