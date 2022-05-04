import { takeEvery, call, select, put, delay } from "redux-saga/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { getUserToken } from '../../redux/common/selectors';
import { setIsHistoryLoading, setShowRecHistoryRedux } from '../../redux/showRecHistory/actions';


function* showRecHistoryWorker({payload}) {
    try {
        yield put(setIsHistoryLoading(true));
        const token = yield select(getUserToken);
        const uid = payload;
        const body = yield call(createBody, { cmd: CMD.SHOWRECHISTORY, uid});
        const headers = { token };
        const response = yield call(requestFunction, api.getShowHistory, 'POST', headers, body);
        yield put(setShowRecHistoryRedux(response?.message));
    } catch(error){
        console.warn('showRecHistoryWorker ===>', error);
    } finally {
        yield put(setIsHistoryLoading(false));
    };
};

export function* showRecHistoryWatcher(){
    yield takeEvery(ActionTypes.SET_SHOW_REC_HISTORY,showRecHistoryWorker);
};