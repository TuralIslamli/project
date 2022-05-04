import { ActionTypes } from "./actionTypes";


const initialState = {
    id: "",
    role: "",
    gender: "",
    role_id: "",
    user_id: "",
    select_user_list: [],
    userList: [],
    gender_id: "",
    user_login: "",
    login_data_id: "",
    department: "",
    department_id: "",
    selectedUserId: "",
    firstname_lastname: "",
    change_password: false,
};

export const userInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_USER_PROFILE:
            return ({
                ...state,
                id: action.payload.id,
                role_id: action.payload.role_id,
                user_id: action.payload.user_id,
                gender: action.payload.gender.text,
                gender_id: action.payload.gender_id,
                role: action.payload.role.role_text,
                user_login: action.payload.user_login,
                department_id: action.payload.department_id,
                department: action.payload.department.department_text,
                login_data_id: action.payload.login_data_id,
                change_password: action.payload.change_password,
                firstname_lastname: action.payload.firstname_lastname,
            });
        case ActionTypes.SET_SELECTED_USER_ID:
            return ({
                ...state,
                selectedUserId: action.payload,
            });
        case ActionTypes.SET_USER_LIST:
            return ({
                ...state,
                userList: action.payload,
            });
        case ActionTypes.SET_SELECT_USER_LIST:
            return ({
                ...state,
                select_user_list: action.payload,
            });
        case 'SET_RESET':
            return {
                ...initialState,
            };
        default:
            return state;
    };
};