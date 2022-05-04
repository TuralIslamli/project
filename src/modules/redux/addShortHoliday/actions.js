import { ActionTypes } from "./actionTypes";


export const setAddShortHolidayTimeData = (payload) => ({
    type: ActionTypes.SET_ADD_SHORT_HOLIDAY_TIME_DATA,
    payload,
});
export const deleteAddShortHolidayTimeData = (payload) => ({
    type: ActionTypes.SET_DELETE_ADD_SHORT_HOLIDAY_TIME_DATA,
    payload,
});
export const setResetAddShortHolidayTimeData = () => ({
    type: ActionTypes.SET_RESET_ADD_SHORT_HOLIDAY_TIME_DATA,
});