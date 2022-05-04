import { ActionTypes } from "./actionTypes";


const initialState = {
  data: [],
  isDrawer: false,
  drawerType: '',
  maxLength: [],
  totalMonth: '00:00:00',
  history: [],
  vacationDays: "",
  sickLeaveDays: "",
  workDays: "",
  targetHours: "",
  totalWorkDay: "",
  remainHoursTotal: [],
  remainHoursInDay: [],
  remainDays: [],
  refresh: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_DATA:
      return {
        ...state,
        data: action?.payload?.data,
        maxLength: action?.payload?.logsHeader,
        totalMonth: action?.payload?.totalMonth,
        history: action?.payload?.history,
        vacationDays: action.payload.vac,
        workDays: action.payload.def,
        sickLeaveDays: action.payload.sickLeave,
        targetHours: action.payload.targetHours,
        totalWorkDay: action.payload.totalWorkDay,
        remainHoursTotal: action.payload.remainHoursTotal,
        remainHoursInDay: action.payload.remainHoursInDay,
        remainDays: action.payload.remainDays
      };
    case ActionTypes.SET_DRAWER:
      return {
        ...state,
        isDrawer: action?.payload?.isDrawer,
        drawerType: action?.payload?.drawerType,
      };
    case ActionTypes.REFRESH:
      return {
        ...state,
        refresh: action.payload,
      };
    case 'SET_RESET':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default dashboardReducer;