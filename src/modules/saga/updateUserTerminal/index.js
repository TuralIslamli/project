import { CMD } from "../../../services/cmd";
import { getUserToken } from "../../redux/common/selectors";
import { ActionTypes } from "./actionTypes";
import { takeEvery, call, select, put, putResolve } from "redux-saga/effects";
import { setSnackbar } from "../../redux/applicationInfo/actions";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { setDownloadUsers } from "../downloadUsers/actions";


function* updateUserTerminalWorker({ payload }) {
  try {
    const token = yield select(getUserToken);
    const headers = { token };
    const body = yield call(createBody, {
      cmd: CMD.UPDATEUSERTERMINAL,
      uid: payload.uid,
      id: payload.id,
      namelastname: payload.name,
    });
    const response = yield call(
      requestFunction,
      api.updateUserTerminal,
      "POST",
      headers,
      body
    );
    if (!response?.error) {
      yield putResolve(setDownloadUsers({isUpdate: true}));
      yield put(
        setSnackbar({ isOpen: true, text: response?.message, type: "success" })
      );
    } else {
      yield put(
        setSnackbar({ isOpen: true, text: response?.message, type: "error" })
      );
    }
  } catch (error) {
    console.warn("updateUserTerminalWorker ===>", error);

  }
}

export function* updateUserTerminalWatcher() {
  yield takeEvery(ActionTypes.UPDATE_USER_TERMINAL, updateUserTerminalWorker);
}