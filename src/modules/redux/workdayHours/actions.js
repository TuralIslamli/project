import { ActionTypes } from "./actionTypes";


export const setWorkdayHours = (payload) => ({
    type: ActionTypes.SET_WORKDAY_HOURS,
    payload,
});

export const setViewtimeAllData = (payload) => ({
    type: ActionTypes.SET_VIETIME_ALL_DATA,
    payload
});

export const setVacationDaysAC = (payload) => ({
    type: ActionTypes.SET_VACATION_DAYS,
    payload
});

export const setSickLeaveDaysAC = (payload) => ({
    type: ActionTypes.SET_SICKLEAVE_DAYS,
    payload
});

export const setWorkDaysAC = (payload) => ({
    type: ActionTypes.SET_WORKDAYS,
    payload
});