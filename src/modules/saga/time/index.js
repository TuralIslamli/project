import { ActionTypes } from "./actionTypes";
import { CMD } from "../../../services/cmd";
import { select, takeEvery, call, put } from "@redux-saga/core/effects";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { getRolesCMD, getUserToken } from "../../redux/common/selectors";
import { setResetAddTimeData } from "../../redux/addTime/actions";
import { setDrawer } from '../../redux/dashboard/action';
import { setSnackbar } from '../../redux/applicationInfo/actions';
import { setTimeSheetAllData, setTimeSheetData } from "../dashboard/action";
import { getDashBoardData } from "../../redux/dashboard/selectors";


function* sendTimeWorker({ payload }) {
    const res = yield select(getDashBoardData);
    try {
        for (let k = 0; k < payload.length; k++) {
            const currentTime = res.find(item => item.date == payload[k].date);
            if (currentTime) {
                if (currentTime.total !== 'VACATION' && currentTime.total !== 'SICK TIME') {
                    const rolesCMD = yield select(getRolesCMD);
                    let cmd = '';
                    if (rolesCMD.includes(CMD.ADDTIMEALL)) {
                        cmd = CMD.ADDTIMEALL;
                    } else if (rolesCMD.includes(CMD.ADDTIME)) {
                        cmd = CMD.ADDTIME;
                    } else {
                        return true;
                    }
                    const data = payload.map(({
                        cud_reason_id,
                        date,
                        time,
                        timetype_id,
                        description,
                        user_id
                    }) => ({
                        cud_reason_id,
                        date,
                        time,
                        timetype_id,
                        description,
                        user_id,
                    }));
                    const token = yield select(getUserToken);
                    const body = yield call(createBody, { cmd, data });
                    const headers = { token };
                    const response = yield call(requestFunction, api.getAddTime, 'POST', headers, body);
                    yield put(setSnackbar({ isOpen: true, text: response?.message, type: response.error ? 'error' : 'success' }));
                    if (!response?.error) {
                        yield put(setResetAddTimeData());
                        if (rolesCMD.includes(CMD.VIEWTIMEALL)) {
                            yield put(setTimeSheetAllData());
                        } else if (rolesCMD.includes(CMD.VIEWTIME)) {
                            yield put(setTimeSheetData());
                        };
                        yield put(setDrawer({ isOpen: false }));
                        yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'success' }));
                    } else {
                        yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
                    }
                    break;
                } else yield put(setSnackbar({ isOpen: true, text: 'This is Vacation or Sick Time day.', type: 'error' }));
            } else {
                const rolesCMD = yield select(getRolesCMD);
                let cmd = '';
                if (rolesCMD.includes(CMD.ADDTIMEALL)) {
                    cmd = CMD.ADDTIMEALL;
                } else if (rolesCMD.includes(CMD.ADDTIME)) {
                    cmd = CMD.ADDTIME;
                } else {
                    return true;
                }
                const data = payload.map(({
                    cud_reason_id,
                    date,
                    time,
                    timetype_id,
                    description,
                    user_id
                }) => ({
                    cud_reason_id,
                    date,
                    time,
                    timetype_id,
                    description,
                    user_id,
                }));
                const token = yield select(getUserToken);
                const body = yield call(createBody, { cmd, data });
                const headers = { token };
                const response = yield call(requestFunction, api.getAddTime, 'POST', headers, body);
                yield put(setSnackbar({ isOpen: true, text: response?.message, type: response.error ? 'error' : 'success' }));
                if (!response?.error) {
                    yield put(setResetAddTimeData());
                    if (rolesCMD.includes(CMD.VIEWTIMEALL)) {
                        yield put(setTimeSheetAllData());
                    } else if (rolesCMD.includes(CMD.VIEWTIME)) {
                        yield put(setTimeSheetData());
                    };
                    yield put(setDrawer({ isOpen: false }));
                    yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'success' }));
                } else {
                    yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
                }
                break;
            }
        }
    } catch (error) {
        console.warn("sendTimeWorker ===>", error);
    }
};

function* deleteTimeWorker({ payload }) {
    try {
        const rolesCMD = yield select(getRolesCMD);
        const token = yield select(getUserToken);
        const body = yield call(createBody, { cmd: payload?.cmd, data: payload?.data });
        const headers = { token };
        const response = yield call(requestFunction, api.getDeleteTime, 'POST', headers, body);
        if (!response?.error) {
            yield put(setSnackbar({ isOpen: true, text: 'Success', type: 'success' }));
            yield put(setDrawer({ isOpen: false }));
            if (rolesCMD.includes(CMD.VIEWTIMEALL)) {
                yield put(setTimeSheetAllData());
            } else if (rolesCMD.includes(CMD.VIEWTIME)) {
                yield put(setTimeSheetData());
            };
        } else {
            yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
        }
    } catch (error) {
        console.warn("deleteTimeWorker ===>", error);
    }
};

function* sendVacationSickLeaveWorker({ payload }) {
    try {
        const res = yield select(getDashBoardData);
        for (let i = 0; i <= res.length; i++) {
            const currentDate = res.find(item => item.date == payload[i].startDate)
            if (!currentDate) {
                const token = yield select(getUserToken);
                const rolesCMD = yield select(getRolesCMD);
                let cmd = '';
                if (rolesCMD.includes(CMD.ADDTIMEALL)) {
                    cmd = CMD.ADDTIMEALL;
                } else if (rolesCMD.includes(CMD.ADDTIME)) {
                    cmd = CMD.ADDTIME;
                } else {
                    return true;
                }
                const data = [];
                payload.forEach((item) => {
                    const startDate = new Date(item.startDate);
                    const endDate = new Date(item.endDate);
                    const difference = (Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                    for (let j = startDate; j <= endDate; j.setDate(j.getDate() + 1)) {
                        const someDay = new Date(j);
                        const weekDay = someDay.getUTCDay()
                        const day = someDay.getDate().toString().length - 1 ? someDay.getDate() : `0${someDay.getDate()}`;
                        const year = someDay.getFullYear();
                        const month = (someDay.getMonth() + 1).toString().length - 1 ? someDay.getMonth() + 1 : `0${someDay.getMonth() + 1}`
                        const isWeekend = weekDay === 0 || weekDay === 6;
                        data.push(
                            {
                                date: `${year}-${month}-${day}`,
                                time: "10:00:00",
                                user_id: item.user_id,
                                cud_reason_id: item.cud_reason_id,
                                timetype_id: item.timetype_id,
                                description: item.description,
                            },
                            {
                                date: `${year}-${month}-${day}`,
                                time: isWeekend ? "10:00:00" : "19:00:00",
                                user_id: item.user_id,
                                cud_reason_id: item.cud_reason_id,
                                timetype_id: item.timetype_id,
                                description: item.description,
                            }
                        )
                    }
                });
                const dataCurrentDate = data.filter(item => res.find(elem => elem.date == item.date))
                if (!dataCurrentDate.length) {
                    const body = yield call(createBody, { cmd, data });
                    const headers = { token };
                    const response = yield call(requestFunction, api.getAddTime, 'POST', headers, body);
                    if (!response?.error) {
                        yield put(setResetAddTimeData());
                        if (rolesCMD.includes(CMD.VIEWTIMEALL)) {
                            yield put(setTimeSheetAllData());
                        } else if (rolesCMD.includes(CMD.VIEWTIME)) {
                            yield put(setTimeSheetData());
                        };
                        yield put(setDrawer({ isOpen: false }));
                        yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'success' }));
                    } else {
                        yield put(setSnackbar({ isOpen: true, text: response?.message, type: 'error' }));
                    }
                    break;
                } else {
                    yield put(setSnackbar({ isOpen: true, text: 'This Day is Not Empty', type: 'error' }));
                    break;
                }
            } else {
                yield put(setSnackbar({ isOpen: true, text: 'This Day is Not Empty', type: 'error' }));
                break;
            }
        }
    }
    catch (error) {
        console.error(`sendVacationWorker error ------->`, error);
    }
};

export function* deleteTimeWatcher() {
    yield takeEvery(ActionTypes.SET_DELETE_TIME_DATA, deleteTimeWorker);
};

export function* sendTimeWatcher() {
    yield takeEvery(ActionTypes.SET_SEND_TIME_DATA, sendTimeWorker);
};

export function* sendVacationSickLeaveWatcher() {
    yield takeEvery(ActionTypes.SET_SEND_VACATION_SICK_LEAVE_DATA, sendVacationSickLeaveWorker);
};