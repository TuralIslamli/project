import { rootSaga } from "../saga";
import dashboardReducer from "./dashboard";
import storage from 'redux-persist/lib/storage';
import { commonReducer } from "./common/reducer";
import { authReducer } from "../redux/authorization";
import { addTimeReducer } from "./addTime/reducer";
import createSagaMiddleware from "@redux-saga/core";
import { userInfoReducer } from "./userInfo/reducer";
import { approveTimeReducer } from "./approveTime/reducer";
import { persistStore, persistReducer } from "redux-persist";
import { timesheetListReducer } from "./timesheetList/reducer";
import { applicationInfoReducer } from './applicationInfo/reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import { generateTimesheetReducer } from "./generateTimesheet/reducer";
import { workdayHourReducer } from "../redux/workdayHours/reducer";
import { addVacationReducer } from "./addVacation/reducer";
import { addSickLeaveReducer } from "./addSickLeave/reducer";
import { showRecHistoryReducer } from "./showRecHistory/reducer";
import { addShortHolidayReducer } from "./addShortHoliday/reducer";


const commonConfig = {
  key: "commonReducer",
  timeout: null,
  storage,
  blacklist: [],
  whitelist: [],
};
const applicationInfoConfig = {
  key: "applicationInfoReducer",
  timeout: null,
  storage,
  blacklist: [],
  whitelist: [],
};
const addTimeConfig = {
  key: "applicationInfoReducer",
  timeout: null,
  storage,
  blacklist: [],
  whitelist: ["data"],
};
const userInfoConfig = {
  key: "userInfoReducer",
  timeout: null,
  storage,
  blacklist: ["id", "gender_id", "login_data_id"],
  whitelist: [],
};

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
  timesheetListReducer,
  generateTimesheetReducer,
  commonReducer: persistReducer(commonConfig, commonReducer),
  userInfoReducer: persistReducer(userInfoConfig, userInfoReducer),
  applicationInfoReducer: persistReducer(applicationInfoConfig, applicationInfoReducer),
  addTimeReducer: persistReducer(addTimeConfig, addTimeReducer),
  approveTimeReducer,
  workdayHourReducer,
  addVacationReducer,
  addSickLeaveReducer,
  showRecHistoryReducer,
  addShortHolidayReducer
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: null,
  whitelist: [
    'commonReducer',
    'addTimeReducer',
    'userInfoReducer',
    'applicationInfoReducer',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export const persistedStore = persistStore(store);

sagaMiddleware.run(rootSaga);