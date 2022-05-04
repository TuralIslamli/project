import { ActionTypes } from "./actionTypes";


const initialState = {
  isAuthLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: action?.payload,
      };
    case 'SET_RESET':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};