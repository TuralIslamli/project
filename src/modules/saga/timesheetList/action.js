import { ActionTypes } from "./actionTypes";


export const setGetTimesheet = () => ({
    type: ActionTypes.SET_TIMESHEET_LIST,
});

export const setGetTimesheetAll = () => ({
    type: ActionTypes.SET_TIMESHEET_ALL_LIST,
});

export const setApproveTimesheet = (payload) => ({
    type: ActionTypes.SET_APPROVE_TIMESHEET,
    payload
});

export const setExportTimesheet = (payload) => ({
    type: ActionTypes.SET_EXPORT_TIMESHEET,
    payload
});