import { ActionTypes } from "./actionTypes";


export const setAddVacationData = (payload) => ({
    type: ActionTypes.SET_ADD_VACATION_DATA,
    payload,
});
export const deleteAddVacatinData = (payload) => ({
    type: ActionTypes.SET_DELETE_ADD_VACATION_DATA,
    payload,
});
export const setResetAddVacationData = () => ({
    type: ActionTypes.SET_RESET_ADD_VACATION_DATA,
});