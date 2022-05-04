import { call, put, select, takeEvery, putResolve } from "@redux-saga/core/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { CMD } from "../../../services/cmd";
import { setSnackbar } from "../../redux/applicationInfo/actions";
import { getUserToken } from "../../redux/common/selectors";
import { setUserLogin } from "../dashboard/action";
import { ActionTypes } from "./actionTypes";


function* downloadUsersWorker({payload: {isUpdate}}) {
  try {
    const token = yield select(getUserToken);
    const headers = { token };
    const body = yield call(createBody, { cmd: CMD.DOWNLOADUSER });
    const response = yield call(
      requestFunction,
      api.downloadUsers,
      "POST",
      headers,
      body
    );
    if (!response?.error) {
      if(isUpdate){
        yield putResolve(setUserLogin());
        return true;
      }
      yield put(
        setSnackbar({ isOpen: true, text: response?.message, type: "success" })
      );
    } else {
      yield put(
        setSnackbar({ isOpen: true, text: response?.message, type: "error" })
      );
    }
  } catch (error) {
    console.warn("generateTimesheetWorker ===>", error);
  }
}

export function* downloadUsersWatcher() {
  yield takeEvery(ActionTypes.DONWLOAD_USERS, downloadUsersWorker);
}