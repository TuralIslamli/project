import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from '../../redux/applicationInfo/actions';


function* addUserWorker({ payload }) {
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.ADDUSER, "data": [payload] });
        const headers = { token };
        const response = yield call(requestFunction, api.adduser, 'POST', headers, body);
        if (response.error === true) {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
        else {
            yield put(setSnackbar({ isOpen: true, text: "A new user has been added", type: 'success' }));
        }
    } catch (error) {
        console.warn("addUserWorker ===>", error);
    }
};


export function* addUserWatcher() {
    yield takeEvery(ActionTypes.SET_ADD_USER, addUserWorker);
};