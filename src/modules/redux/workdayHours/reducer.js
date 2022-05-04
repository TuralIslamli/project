import { ActionTypes } from "./actionTypes";


const initialState = {
    holidays: "",
    shortdays: "",
    totalDays: "",
    totalHours: "",
    totalWorkdays: "",
    weekends: ""
};

export const workdayHourReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_WORKDAY_HOURS:
            return {
                ...state,
                holidays: action.payload.holidays,
                shortdays: action.payload.short_days,
                totalDays: action.payload.total_days,
                totalHours: action.payload.total_hours,
                totalWorkdays: action.payload.total_work_days,
                weekends: action.payload.weekends
            };
        default:
            return state;
    };
};