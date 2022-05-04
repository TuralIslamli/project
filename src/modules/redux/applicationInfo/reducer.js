import { ActionTypes } from "./actionTypes";


const initialState = {
    year: "",
    month: "",
    date: new Date(),
    roles: [],
    genders: [],
    reasons: [],
    statuses: [],
    timeType: [],
    departments: [],
    approveStatuses: [],
    dateType: [],
    snackbar: {
        isOpen: false,
        text: '',
        type: 'success',
    },
    accListControl: []
};

export const applicationInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_ROLES:
            return ({
                ...state,
                roles: action.payload,
            });
        case ActionTypes.SET_GENDERS:
            return ({
                ...state,
                genders: action.payload,
            });
        case ActionTypes.SET_ACCLISTCONTROL:
            return ({
                ...state,
                accListControl: action.payload,
            });
        case ActionTypes.SET_STATUSES:
            return ({
                ...state,
                statuses: action.payload,
            });
        case ActionTypes.SET_REASONS:
            return ({
                ...state,
                reasons: action.payload,
            });
        case ActionTypes.SET_TIME_TYPE:
            return ({
                ...state,
                timeType: action.payload,
            });
        case ActionTypes.SET_DEPARTMENTS:
            return ({
                ...state,
                departments: action.payload,
            });
        case ActionTypes.SET_APPROVE_STATUSES:
            return ({
                ...state,
                approveStatuses: action.payload,
            });
        case ActionTypes.SET_DATE:
            return ({
                ...state,
                date: action.payload.date,
                year: action.payload.year,
                month: action.payload.month,
            });
        case ActionTypes.SET_SNACKBAR:
            return ({
                ...state,
                snackbar: {
                    ...state?.snackbar,
                    ...action.payload,
                }
            });
        case ActionTypes.SET_DATE_TYPE:
            return ({
                ...state,
                dateType: action.payload,
            });
        case 'SET_RESET':
            return ({
                ...initialState,
            });
        default:
            return state;
    };
};