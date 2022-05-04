import { CMD } from "../../../services/cmd";
import { ActionTypes } from "./actionTypes";
import { getDifferenceTimes, Utils, findVacAndSickLeaveDays } from "../../../services/utils";
import { getRolesCMD, getUserToken } from "../../redux/common/selectors";
import { setSelectUserList, setUserList } from "../../redux/userInfo/actions";
import { setDashboardData } from "../../redux/dashboard/action";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { getMonth, getYear } from "../../redux/applicationInfo/selectors";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getSelectedUserId } from "../../redux/userInfo/selectors";
import { setWorkdayHours } from "../../redux/workdayHours/actions";
import { setSnackbar } from "../../redux/applicationInfo/actions";
import { getWorksDayTotalHours, getWorksDaytotalWorkdays } from "../../redux/workdayHours/selectors";
import { getTotalMonth } from "../../redux/dashboard/selectors";


function* dashboardWorker() {
  yield call(getWorkdayHoursWorker);
  try {
    const year = yield select(getYear);
    const month = yield select(getMonth);
    const token = yield select(getUserToken);
    const user_id = yield select(getSelectedUserId);
    const body = yield call(createBody, {
      cmd: CMD.VIEWTIME,
      user_id,
      year,
      month,
    });
    const headers = { token };
    const response = yield call(
      requestFunction,
      api.getViewTime,
      "POST",
      headers,
      body
    );
    const res = Object.values(response.message);
    if (response?.error) {
      yield put(
        setSnackbar({
          isOpen: true,
          text: response.message ? response.message : "Error",
          type: "error",
        })
      );
    } else {
      const { data, logsHeader, history, totalMonth } = yield call(
        Utils.normalizeData,
        response.message);
      const totalWorkHours = yield select(getWorksDayTotalHours);
      const totalWorkDays = yield select(getWorksDaytotalWorkdays);
      const { def, vac, sickLeave, targetHours, totalWorkDay } = yield call(findVacAndSickLeaveDays, data, totalWorkHours, totalWorkDays);
      const totalMonthHours = yield select(getTotalMonth);
      const { remainHoursTotal, remainHoursInDay, remainDays } = yield call(getDifferenceTimes, totalWorkDays, totalMonthHours, totalWorkHours, data);
      yield put(setDashboardData({ data, totalMonth, logsHeader, history, def, vac, sickLeave, targetHours, totalWorkDay, remainHoursTotal, remainHoursInDay, remainDays }));
    }
  } catch (error) {
    console.warn("dashboardWorker ===>", error);
  }
}

function* dashboardAllWorker() {
  yield call(getWorkdayHoursWorker);
  try {
    const year = yield select(getYear);
    const roleCMD = yield select(getRolesCMD);
    const month = yield select(getMonth);
    const token = yield select(getUserToken);
    const user_id = yield select(getSelectedUserId);
    const totalWorkHours = yield select(getWorksDayTotalHours);
    const totalWorkDays = yield select(getWorksDaytotalWorkdays);
    const body = yield call(createBody, {
      cmd: CMD.VIEWTIMEALL,
      user_id,
      year,
      month,
    });
    const headers = { token };
    const response = yield call(
      requestFunction,
      api.getViewTime,
      "POST",
      headers,
      body
    );
    if (!response.error && response.message !== 'Not found') {
      const res = Object.values(response.message);
      const { data, logsHeader, history, totalMonth } = yield call(
        Utils.normalizeData,
        response.message
      );
      const { def, vac, sickLeave, targetHours, totalWorkDay } = yield call(findVacAndSickLeaveDays, data, totalWorkHours, totalWorkDays);
      const totalMonthHours = yield select(getTotalMonth);
      const { remainHoursTotal, remainHoursInDay, remainDays } = yield call(getDifferenceTimes, totalWorkDays, totalMonthHours, totalWorkHours, data);
      yield put(setDashboardData({ data, totalMonth, logsHeader, history, def, vac, sickLeave, targetHours, totalWorkDay, remainHoursTotal, remainHoursInDay, remainDays }));
      if (roleCMD.includes(CMD.GETLOGIN)) {
        yield call(usersListWorker);
      }
    } else if (response.message === 'Not found') {
      const res = [];
      const { data, logsHeader, history, totalMonth } = yield call(
        Utils.normalizeData,
        res
      );
      const { def, vac, sickLeave, targetHours, totalWorkDay } = yield call(findVacAndSickLeaveDays, res, totalWorkHours, totalWorkDays);
      const totalMonthHours = yield select(getTotalMonth);
      const { remainHoursTotal, remainHoursInDay, remainDays } = yield call(getDifferenceTimes, totalWorkDays, totalMonthHours, totalWorkHours, data);
      yield put(setDashboardData({ data, totalMonth, logsHeader, history, def, vac, sickLeave, targetHours, totalWorkDay, remainHoursTotal, remainHoursInDay, remainDays }));
      if (roleCMD.includes(CMD.GETLOGIN)) {
        yield call(usersListWorker);
      }
      yield put(
        setSnackbar({
          isOpen: true,
          text: "No data",
          type: "error",
        })
      );
    }
    else {
      yield put(
        setSnackbar({
          isOpen: true,
          text: response.message ? response.message : "Error",
          type: "error",
        })
      );
    }
  } catch (error) {
    console.warn("dashboardAllWorker ===>", error);
  }
}

function* getWorkdayHoursWorker() {
  try {
    const year = yield select(getYear);
    const month = yield select(getMonth);
    const token = yield select(getUserToken);
    const body = yield call(createBody, { cmd: CMD.WORKDAYHOURS, year, month });
    const headers = { token };
    const response = yield call(requestFunction, api.workdayhours, 'POST', headers, body);
    if (!response.error) {
      yield put(setWorkdayHours(response));
    } else {
      yield put(setSnackbar({ isOpen: true, text: response.message ? response.message : "Error", type: 'error' }));
    }
  } catch (error) {
    console.warn("getWorkdayHoursWorker ===>", error);
  }
}

function* usersListWorker() {
  try {
    const token = yield select(getUserToken);
    const body = yield call(createBody, { cmd: CMD.GETLOGIN });
    const headers = { token };
    const response = yield call(
      requestFunction,
      api.getUserLogin,
      "POST",
      headers,
      body
    );
    if (!response.error) {
      yield put(setUserList(response?.message));
    } else {
      yield put(
        setSnackbar({
          isOpen: true,
          text: response.message ? response.message : "Error",
          type: "error",
        })
      );
    }
  } catch (error) {
    console.warn("usersListWorker ===>", error);
  }
}

function* getSelectUserWorker() {
  try {
    const token = yield select(getUserToken);
    const body = yield call(createBody, { cmd: CMD.GETUSER });
    const headers = { token };
    const response = yield call(
      requestFunction,
      api.getUser,
      "POST",
      headers,
      body
    );
    if (!response.error) {
      yield put(setSelectUserList(response));
    } else {
      yield put(
        setSnackbar({
          isOpen: true,
          text: response.message ? response.message : "Error",
          type: "error",
        })
      );
    }
  } catch (error) {
    console.warn("usersListWorker ===>", error);
  }
}

export function* getSelectUserWatcher() {
  yield takeEvery(ActionTypes.SET_USERLOGIN, getSelectUserWorker);
}

export function* dashboardWatcher() {
  yield takeEvery(ActionTypes.SET_TIME_SHEET_DATA, dashboardWorker);
}

export function* dashboardAllWatcher() {
  yield takeEvery(ActionTypes.SET_TIME_SHEET_ALL_DATA, dashboardAllWorker);
}

export function* workdayHoursWatcher() {
  yield takeEvery(ActionTypes.SET_WORK_DAY_HOURS, getWorkdayHoursWorker);
}