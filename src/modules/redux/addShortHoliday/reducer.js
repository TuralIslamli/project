import { ActionTypes } from "./actionTypes";


const initialState = {
    data: [],
};

export const addShortHolidayReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_ADD_SHORT_HOLIDAY_TIME_DATA:
            return ({
                ...state,
                data: [...state.data, action.payload],
            });
        case ActionTypes.SET_DELETE_ADD_SHORT_HOLIDAY_TIME_DATA:
            return ({
                ...state,
                data: state.data.filter(item => item.id !== action.payload),
            });
        case ActionTypes.SET_RESET_ADD_SHORT_HOLIDAY_TIME_DATA:
            return ({
                ...initialState,
            });
        case 'SET_RESET':
            return ({
                ...initialState,
            });
        default:
            return state;
    };
};