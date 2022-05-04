import { takeEvery, call, put, select, takeLeading } from "redux-saga/effects";
import { createBody, requestFunction, api } from "../../../services/apiRoutes";
import { ActionTypes } from "./actionTypes";
import { CMD } from '../../../services/cmd';
import { getUserToken } from "../../redux/common/selectors";
import { setApproveTimeList, setIsLoadingApproveTime } from "../../redux/approveTime/actions";
import { setSnackbar } from "../../redux/applicationInfo/actions";
import { getDate } from "../../redux/approveTime/selectors";
import { setGetTimes } from "./action";


function* getTimesWorker({ payload }) {
    try {
        const isFromApproveDecline = payload?.isFromApproveDecline;
        const date = yield select(getDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const body = yield call(createBody, { cmd: CMD.GETPENDINGLOGS, year, month });
        const token = yield select(getUserToken);
        const headers = { token };
        if (isFromApproveDecline) {
            yield put(setIsLoadingApproveTime(true));
        }
        const response = yield call(requestFunction, api.getPendingLogs, 'POST', headers, body);
        if (!response?.error) {
            if (Array.isArray(response?.message)) {
                yield put(setApproveTimeList(response?.message));
            } else {
                yield put(setSnackbar({ isOpen: true, text: 'There are no time logs for approve', type: 'info' }));
                yield put(setApproveTimeList([]));
            }
            yield put(setIsLoadingApproveTime(false));
        } else {
            // We can use this snackbar to show user some message. Types: error, info, success, warning
            yield put(setIsLoadingApproveTime(false));
        }
    } catch (error) {
        console.warn("getTimesWorker ===>", error);
    }
};

function* approveDeclineTimeWorker({ payload: { uid, status, description } }) {
    try {
        const body = yield call(createBody, { cmd: CMD.APPRTIME, uid, approved_status: status, description: description });
        const token = yield select(getUserToken);
        const headers = { token };
        // yield put(setIsLoadingApproveTime(true));
        const response = yield call(requestFunction, api.getApproveTime, 'POST', headers, body);
        if (!response?.error) {
            // yield put(setIsLoadingApproveTime(false));
            yield put(setSnackbar({ isOpen: true, text: 'Success', type: 'success' }));
        } else {
            // We can use this snackbar to show user some message. Types: error, info, success, warning
            yield put(setSnackbar({ isOpen: true, text: 'Something went wrong', type: 'error' }));
            // yield put(setIsLoadingApproveTime(false));
        }
        yield put(setGetTimes({ isFromApproveDecline: true }));
    } catch (error) {
        console.warn("approveDeclineTimeWorker ===>", error);
    }
};

export function* getTimesWatcher() {
    yield takeEvery(ActionTypes.SET_GET_TIMES, getTimesWorker);
}

export function* approveDeclineTimeWatcher() {
    yield takeLeading(ActionTypes.SET_APPROVE_DECLINE_TIME, approveDeclineTimeWorker);
}