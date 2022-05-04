import { ActionTypes } from "./actionTypes";


const initialState = {
    approveTimeList: [],
    isLoading: false,
    date: new Date(),
    timeForDelete: null,
    isLoadingDelete: false,
    filters: {}
};

export const approveTimeReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_APPROVE_TIME_LIST:
            return ({
                ...state,
                approveTimeList: action.payload,
            });
        case ActionTypes.SET_IS_LOADING_APPROVE_TIME:
            return ({
                ...state,
                isLoading: action.payload,
            });
        case ActionTypes.SET_APPROVE_DATE:
            return ({
                ...state,
                date: action.payload,
            });
        case ActionTypes.SET_TIME_FOR_DELETE:
            return ({
                ...state,
                timeForDelete: action.payload,
            });
        case ActionTypes.SET_IS_LOADING_DELETE_TIME:
            return ({
                ...state,
                isLoadingDelete: action.payload,
            });
        case ActionTypes.SET_FILTERS:
            return ({
                ...state,
                filters: {...state.filters, ...action.payload},
            });
        case ActionTypes.CLEAR_FILTERS:
            return ({
                ...state,
                filters: {},
            });
        default:
            return state;
    };
};