import { store } from '../../modules/redux';


export const api = {
    //  185 для дома 192 для офиса
    // url: "http://185.129.2.58:8997/xbitbucket/xtimesheet/public",
    //   url: "http://192.168.88.45/xbitbucket/xtimesheet/public",
    url: "http://192.168.88.159",
    getLogin: "/login",
    getUser: "/selectusers",
    getViewTime: "/attendance/viewtime",
    getChangePassword: "/changeuserpsw",
    getGenerateTimeSheet: "/gentimesheet",
    getAddTime: "/addtime",
    getUserLogin: "/getlogin",
    getTimeSheet: "/gettimesheet",
    getDeleteTime: "/deletetime",
    getApproveLog: "/approvelog",
    getViewTimeAll: "/viewtime",
    getApproveTime: "/approvelog",
    getPendingLogs: "/getpendinglogs",
    getShowHistory: "/showrechistory",
    editUser: "/edituser",
    globaltimesheet: "/globaltimesheet",
    approvetime: "/approvetime",
    downloadUsers: "/users/getusers",
    updateUserTerminal: "/users/setuser",
    adduser: "/addloginuser",
    workdayhours: "/workdayhours",
    conUser2Login: "/insertuserstologin",
    exporttimesheet: "/exporttimesheet",
    deleteUser: "/deluser",
    deleteRight: "/delright",
    addRights: "/addrights2role",
    getAddShortHoliday: "/addshortholidays",
    generateweek: "/generateweek"
};

export const requestFunction = async (route, method, headersKey, body) => {
    const headers = createHeaders(headersKey);
    const response = await fetch(api.url + route, {
        method,
        headers,
        body,
    })
        .then(pen => pen.json().then(res => res.message === 'Bad token' ? store.dispatch({ type: 'SET_RESET' }) : res))
        .catch(error => console.warn(`requestFunction route: ${route} ===>`, error));
    return response;
};

const createHeaders = (headersKey) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (headersKey.token) {
        headers.Authorization = `Bearer ${headersKey.token}`;
    }
    return headers;
};

export const requestFunctionDownload = async (route, method, headersKey, body) => {
    const headers = createHeadersDownload(headersKey);
    const response = await fetch(api.url + route, {
        responseType: "blob",
        method,
        headers,
        body,
    })
        .then(pen => pen.blob().then(res => res.message === 'Bad token' ? store.dispatch({ type: 'SET_RESET' }) : res))
        .catch(error => console.warn(`requestFunction route: ${route} ===>`, error));

    return response;
};

const createHeadersDownload = (headersKey) => {
    const headers = {
        'Content-Type': 'application/vnd.ms-excel',
    };

    if (headersKey.token) {
        headers.Authorization = `Bearer ${headersKey.token}`;
    }
    return headers;
};

export const createBody = (object) => {
    return JSON.stringify(object);
};