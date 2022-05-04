import { ActionTypes } from "./actionTypes";


export const setDashboardData = (payload) => ({
    type: ActionTypes.SET_DASHBOARD_DATA,
    payload,
});

export const setDrawer = (payload) => ({
    type: ActionTypes.SET_DRAWER,
    payload,
});

export const setRefresh = (payload) => ({
    type: ActionTypes.REFRESH,
    payload,
});