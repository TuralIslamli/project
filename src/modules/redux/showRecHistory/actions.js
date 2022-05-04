import { ActionTypes } from "./actionTypes";


export const setShowRecHistoryRedux = (payload) => ({
    type: ActionTypes.SET_SHOW_REC_HISTORY_REDUX,
    payload
});

export const setModal = (payload) => ({
    type: ActionTypes.SET_MODAL,
    payload
});

export const setIsHistoryLoading = (payload) => ({
    type: ActionTypes.SET_IS_HISTORY_LOADING,
    payload
});