import { takeEvery, call, put } from "redux-saga/effects";
import { setIsAuthLoading } from "../../redux/authorization/action";
import { ActionTypes } from "./actionTypes";
import { api, createBody, requestFunction } from "../../../services/apiRoutes";
import { setUserTokenData, setRolesCMD, setIsAuthorized, setPassword } from '../../redux/common/actions';
import { ROUTES } from "../../../services/routes";
import { Utils } from "../../../services/utils";
import { setSelectedUserId, setUserProfile } from "../../redux/userInfo/actions";
import { setAccListControl, setApproveStatuses, setDate, setDepartments, setGenders, setReasons, setRoles, setSnackbar, setStatuses, setTimeType, setDateType } from "../../redux/applicationInfo/actions";


function* authorizationWorker({ payload: { login, password, push } }) {
  try {
    yield put(setIsAuthLoading(true));
    const body = yield call(createBody, { name: login, password: password });
    const response = yield call(requestFunction, api.getLogin, "POST", {}, body);

    if (!response.error) {
      const { token_data, initial_data } = response;
      yield put(setUserTokenData(token_data));
      yield call(userDataWorker, initial_data);
      yield put(setIsAuthorized(true));
      yield put(setPassword(password));
      if (push) {
        yield call(push, ROUTES.DASHBOARD);
      }
    } else {
      yield put(setSnackbar({ isOpen: true, text: response.message ? response.message : "Error", type: 'error' }));
    };
  } catch (error) {
    console.warn('authorizationWorker ===>', error);
  } finally {
    yield put(setIsAuthLoading(false));
  };
};

function* userDataWorker(data) {
  const {
    roles,
    genders,
    timeType,
    statuses,
    cudReason,
    userProfile,
    departments,
    accListControl,
    approveStatuses,
    dateType } = data;

  const rolesCMD = yield call(Utils.findRole, accListControl, userProfile.role_id);
  yield put(setRolesCMD(rolesCMD));
  yield put(setUserProfile({
    ...userProfile,
    role: roles.find(item => item.id === userProfile.role_id),
    gender: genders.find(item => item.id === userProfile.gender_id),
    department: departments.find(item => item.id === userProfile.department_id),
  }));
  yield put(setDate({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date(),
  }));
  yield put(setRoles(roles));
  yield put(setGenders(genders));
  yield put(setReasons(cudReason));
  yield put(setStatuses(statuses));
  yield put(setTimeType(timeType));
  yield put(setDepartments(departments));
  yield put(setApproveStatuses(approveStatuses));
  yield put(setSelectedUserId(userProfile.user_id));
  yield put(setAccListControl(accListControl));
  yield put(setDateType(dateType));
};

export function* authorizationWatcher() {
  yield takeEvery(ActionTypes.SET_AUTHORIZATION, authorizationWorker);
};