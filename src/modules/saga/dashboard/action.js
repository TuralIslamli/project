import { ActionTypes } from "./actionTypes";


export const setTimeSheetData = () => ({
    type: ActionTypes.SET_TIME_SHEET_DATA,
});

export const setTimeSheetAllData = () => ({
    type: ActionTypes.SET_TIME_SHEET_ALL_DATA,
});

export const setUserLogin = () => ({
    type: ActionTypes.SET_USERLOGIN,
});

export const setWorkDayHours = (payload) => ({
    type: ActionTypes.SET_WORK_DAY_HOURS,
    payload
});