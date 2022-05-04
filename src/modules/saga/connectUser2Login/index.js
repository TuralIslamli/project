import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from '../../redux/applicationInfo/actions';


function* connectUserToLoginWorker({ payload }) {
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.CONUSER2LOGIN, data: [payload] });
        const headers = { token };
        const response = yield call(requestFunction, api.conUser2Login, 'POST', headers, body);
        if (response.error === true) {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
        else {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'success' }));
        }
    } catch (error) {
        console.warn("addUserWorker ===>", error);
    }
};


export function* connectUserToLoginWatcher() {
    yield takeEvery(ActionTypes.SET_CONNECT_USER_TO_LOGIN, connectUserToLoginWorker);
};