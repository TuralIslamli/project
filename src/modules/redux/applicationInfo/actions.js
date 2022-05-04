import { ActionTypes } from "./actionTypes";


export const setRoles = (payload) => ({
    type: ActionTypes.SET_ROLES,
    payload,
});
export const setGenders = (payload) => ({
    type: ActionTypes.SET_GENDERS,
    payload,
});
export const setStatuses = (payload) => ({
    type: ActionTypes.SET_STATUSES,
    payload,
});
export const setReasons = (payload) => ({
    type: ActionTypes.SET_REASONS,
    payload,
});
export const setTimeType = (payload) => ({
    type: ActionTypes.SET_TIME_TYPE,
    payload,
});
export const setDepartments = (payload) => ({
    type: ActionTypes.SET_DEPARTMENTS,
    payload,
});
export const setApproveStatuses = (payload) => ({
    type: ActionTypes.SET_APPROVE_STATUSES,
    payload,
});
export const setDate = (payload) => ({
    type: ActionTypes.SET_DATE,
    payload,
});

export const setSnackbar = (payload) => ({
    type: ActionTypes.SET_SNACKBAR,
    payload,
});

export const setAccListControl = (payload) => ({
    type: ActionTypes.SET_ACCLISTCONTROL,
    payload
});

export const setDateType = (payload) => ({
    type: ActionTypes.SET_DATE_TYPE,
    payload,
});