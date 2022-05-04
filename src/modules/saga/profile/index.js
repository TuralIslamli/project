import { put, call, takeEvery, select } from "@redux-saga/core/effects";
import { ActionTypes } from "./actionTypes";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { setSnackbar } from "../../redux/applicationInfo/actions";
import { ROUTES } from "../../../services/routes";


function* logOutWorker({ payload: { push } }) {
    yield put({ type: 'SET_RESET' });
    yield call(push, ROUTES.HOME);
}

export function* logOutWatcher() {
    yield takeEvery(ActionTypes.SET_LOG_OUT, logOutWorker);
}

function* editUserWorker(data) {
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, data.payload);
        const headers = { token };
        const response = yield call(requestFunction, api.editUser, 'POST', headers, body);
        if (!response?.error) {
            yield put(setSnackbar({ isOpen: true, text: 'User has been edited', type: 'success' }));
        } else {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
    } catch (error) {
        console.warn("editInfoWorker ===>", error);
    }
}

export function* editUserWatcher() {
    yield takeEvery(ActionTypes.SET_EDIT_USER, editUserWorker);
}