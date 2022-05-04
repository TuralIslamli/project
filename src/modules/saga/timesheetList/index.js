import { CMD } from "../../../services/cmd";
import { ActionTypes } from "./actionTypes";
import { getRolesCMD, getUserToken } from '../../redux/common/selectors';
import { takeEvery, call, select, put } from "redux-saga/effects";
import { getMonth, getYear } from '../../redux/applicationInfo/selectors';
import { setTimesheetListData } from "../../redux/timesheetList/actions";
import { api, createBody, requestFunction, requestFunctionDownload } from "../../../services/apiRoutes";
import { setSnackbar } from "../../redux/applicationInfo/actions";
import { setGetTimesheetAll } from "./action";
import { getTimesheetListData } from "../../redux/timesheetList/selectors";
import { saveAs } from 'file-saver';


function* timesheetAllListWorker() {
    try {
        const token = yield select(getUserToken);
        const year = yield select(getYear);
        const month = yield select(getMonth);
        const body = yield call(createBody, { cmd: CMD.GETTIMESHEETALL, year, month });
        const headers = { token };
        const response = yield call(requestFunction, api.getTimeSheet, 'POST', headers, body);
        if (!response.error) {
            yield put(setTimesheetListData(response.data));
        } else {
            yield put(setSnackbar({ isOpen: true, text: response.message ? response.message : "Error", type: 'error' }));
        };
    } catch (error) {
        console.warn("timesheetAllListWorker ===>", error);
    }
}

function* timesheetListWorker() {
    try {
        const token = yield select(getUserToken);
        const year = yield select(getYear);
        const month = yield select(getMonth);
        const body = yield call(createBody, { cmd: CMD.GETTIMESHEET, year, month });
        const headers = { token };
        const response = yield call(requestFunction, api.getTimeSheet, 'POST', headers, body);
        if (!response.error) {
            yield put(setTimesheetListData(response.data));
        } else {
            yield put(setSnackbar({ isOpen: true, text: response.message ? response.message : "Error", type: 'error' }));
        };
    } catch (error) {
        console.warn("timesheetListWorker ===>", error);
    }
}

function* approveTimesheetWorker({ payload }) {
    const id = payload.id;
    const status = payload.status;
    const data = yield select(getTimesheetListData);
    const rolesCMD = yield select(getRolesCMD);
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.APPRTIMESHEET, data: [{ timesheet_id: id, approved: status }] });
        const headers = { token };
        const response = yield call(requestFunction, api.approvetime, 'POST', headers, body);
        if (!response.error) {
            yield put(setTimesheetListData(data));
            if (rolesCMD.includes(CMD.GETTIMESHEETALL)) {
                 yield put(setGetTimesheetAll());
              }
        } else {
            yield put(setSnackbar({ isOpen: true, text: response.message ? response.message : "Error", type: 'error' }));
        }
    } catch (error) {
        console.warn("approveTimesheetWorker ===>", error);
    }
};

function* exportTimesheetWorker() {
    try {
        const token = yield select(getUserToken);
        const year = yield select(getYear);
        const month = yield select(getMonth);
        const body = yield call(createBody, { cmd: CMD.EXPORTTIMESHEET, year, month });
        const headers = { token };
        const response = yield call(requestFunctionDownload, api.exporttimesheet, 'POST', headers, body);
        saveAs(response, `Timesheet ${month}:${year}.xlsx`);
    } catch (error) {
        console.warn("exportTimesheetWorker ===>", error);
    }
}

export function* timesheetListWatcher() {
    yield takeEvery(ActionTypes.SET_TIMESHEET_LIST, timesheetListWorker);
}

export function* timesheetAllListWatcher() {
    yield takeEvery(ActionTypes.SET_TIMESHEET_ALL_LIST, timesheetAllListWorker);
}

export function* approveTimesheetWatcher() {
    yield takeEvery(ActionTypes.SET_APPROVE_TIMESHEET, approveTimesheetWorker);
}

export function* exportTimesheetWatcher() {
    yield takeEvery(ActionTypes.SET_EXPORT_TIMESHEET, exportTimesheetWorker);
}