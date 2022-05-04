import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from '../../redux/applicationInfo/actions';


function* deleteUserWorker({ payload }) {
    try {
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: CMD.DELUSER, "user_id": payload });
        const headers = { token };
        const response = yield call(requestFunction, api.deleteUser, 'POST', headers, body);
        if (response.error) {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
        else {
            yield put(setSnackbar({ isOpen: true, text: "User has been deleted", type: 'success' }));
        }
    } catch (error) {
        console.warn("deleteUserWorker ===>", error);
    }
};

export function* deleteUserWatcher () {
    yield takeEvery(ActionTypes.SET_DEL_USER, deleteUserWorker);
};