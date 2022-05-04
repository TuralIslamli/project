import { ActionTypes } from "./actionTypes";


const initialState = {
    data: [],
};

export function generateTimesheetReducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_GLOBAL_TIME_SHEET_DATA:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    };
};