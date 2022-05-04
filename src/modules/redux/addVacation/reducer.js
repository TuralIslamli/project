import { ActionTypes } from "./actionTypes";


const initialState = {
    data: [],
};

export const addVacationReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_ADD_VACATION_DATA:
            return ({
                ...state,
                data: [...state.data, action.payload],
            });
        case ActionTypes.SET_DELETE_ADD_VACATION_DATA:
            return ({
                ...state,
                data: state.data.filter(item => item.uuid !== action.payload),
            });
        case ActionTypes.SET_RESET_ADD_VACATION_DATA:
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