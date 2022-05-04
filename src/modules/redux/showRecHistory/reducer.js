import { ActionTypes } from "./actionTypes";


const initialState = {
    data: [],
    openModal: false,
    isHistoryLoading: false,
};

export function showRecHistoryReducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_SHOW_REC_HISTORY_REDUX:
            return {
                ...state,
                data: action.payload,
            };
        case ActionTypes.SET_MODAL:
            return {
                ...state,
                openModal: action.payload
            };
        case ActionTypes.SET_IS_HISTORY_LOADING:
            return {
                ...state,
                isHistoryLoading: action?.payload,
            };
        default:
            return state;
    };
};