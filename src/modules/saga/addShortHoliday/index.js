import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { select, takeEvery, call, put, all } from "@redux-saga/core/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from "../../redux/common/selectors";
import { setDrawer } from '../../redux/dashboard/action';
import { setSnackbar } from '../../redux/applicationInfo/actions';
import { setResetAddShortHolidayTimeData } from "../../redux/addShortHoliday/actions";


function* sendShortHolidayWorker({ payload }) {
    try {
        const token = yield select(getUserToken);
        const data = yield all(payload?.map((item) => ({
            date: item.date,
            daytype_id: item.daytype_id,
        })));
        const body = yield call(createBody, { cmd: CMD.ADDSHORTHOLIDAY, data });
        const headers = { token };
        const response = yield call(requestFunction, api.getAddShortHoliday, 'POST', headers, body);
        yield put(setSnackbar({ isOpen: true, text: response?.message, type: response.error ? 'error' : 'success' }));
        if (!response?.error) {
            yield put(setResetAddShortHolidayTimeData());
            yield put(setDrawer({ isOpen: false }));
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'success' }));
        } else {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
    } catch (error) {
        console.warn("sendShortHolidayWorker ===>", error);
    }
};

export function* sendShortHolidayWatcher() {
    yield takeEvery(ActionTypes.SET_SEND_SHORT_HOLIDAY_DATA, sendShortHolidayWorker);
};