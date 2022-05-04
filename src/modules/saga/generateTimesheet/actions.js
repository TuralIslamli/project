import { ActionTypes } from "./actionTypes";


export const setGenerateTimesheet = () => ({
    type: ActionTypes.SET_GENERATE_TIMESHEET,
});
export const setGenerateTimesheetAll = () => ({
    type: ActionTypes.SET_GENERATE_TIMESHEET_ALL,
});

export const setGlobalTimesheet = () => ({
    type: ActionTypes.SET_GLOBAL_TIMESHEET,
});

export const setGenerateWeeks = (payload) => ({
    type: ActionTypes.SET_GENERATE_WEEKS,
    payload
});