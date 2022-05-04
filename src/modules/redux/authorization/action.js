import { ActionTypes } from "./actionTypes";


export const setIsAuthLoading = (payload) => ({
    type: ActionTypes.SET_IS_AUTH_LOADING,
    payload,
});