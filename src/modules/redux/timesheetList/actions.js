import { ActionTypes } from "./actionTypes";


export const setTimesheetListData = (payload) => ({
    type: ActionTypes.SET_TIMESHEET_LIST_DATA,
    payload
});

export const setTimesheetListLoading = (payload) => ({
    type: ActionTypes.SET_TIMESHEET_LIST_LOADING,
    payload
});