import { takeEvery, call, select, put } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getUserToken } from '../../redux/common/selectors';
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from '../../redux/applicationInfo/actions';
import { setAuthorization } from "../authorization/action";
import { getUserLogin } from "../../redux/userInfo/selectors";


function* changePasswordWorker({ payload }) {
    const password = payload.new_password;
    try {
        const token = yield select(getUserToken);
        const login = yield select(getUserLogin);
        const body = yield call(createBody, { cmd: CMD.CHANGEPASSWORD, data: payload });
        const headers = { token };
        const response = yield call(requestFunction, api.getChangePassword, 'POST', headers, body);
        if (response.error === true) {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
        else {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'success' }));

            yield put(setAuthorization({ login, password }));
        }
    } catch (error) {
        console.warn("changePasswordWorker ===>", error);
    }
};


export function* changePasswordWatcher() {
    yield takeEvery(ActionTypes.SET_CHANGE_PASSWORD, changePasswordWorker);
};