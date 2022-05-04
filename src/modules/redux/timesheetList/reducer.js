import { ActionTypes } from "./actionTypes";


const initialState = {
    data: [],
    isHistoryLoading: true,
};

export function timesheetListReducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_TIMESHEET_LIST_DATA:
            return {
                ...state,
                data: action.payload,
            };
            case ActionTypes.SET_TIMESHEET_LIST_LOADING:
            return {
                ...state,
                isHistoryLoading: action?.payload,
            };
        default:
            return state;
    }
};