import moment from 'moment';


const findRole = (data, roleId) => {
    let role = [];
    for (let i = 0; i < data?.length; i++) {
        if (data[i].roles_id.includes(roleId)) {
            role = [...role, data[i].short_code];
        };
    };
    return role;
};

const normalizeData = (newData) => {
    const objKeys = Object.keys(newData);
    const objValues = Object.values(newData);
    let totalMonth = 0;
    const history = {};
    objKeys.forEach(i => {
        history[i] = [];
    });

    const filteredValues = objValues.map((elem, index) => {
        return elem.map(item => {
            let data;
            if (item.status === "1" && item.approved_status === "1") {
                // +
                data = { ...item, text: 'NEW PENDING', color: '#FFAC4B', show: true };
            } else if (item.status === "1" && item.approved_status === "2") {
                // +
                data = { ...item, text: 'NEW APPROVED', color: '#23E9B4', show: true };
            } else if (item.status === "1" && item.approved_status === "3") {
                // -
                data = { ...item, text: 'new/rejected', color: 'red', show: false };
                Object.assign(history, { [objKeys[index]]: [...history[objKeys[index]], data] });
            } else if (item.status === "3" && item.approved_status === "1") {
                // -
                data = { ...item, text: 'deleted/pending', color: 'yellow', show: false };
                Object.assign(history, { [objKeys[index]]: [...history[objKeys[index]], data] });
            } else if (item.status === "3" && item.approved_status === "2") {
                // -
                data = { ...item, text: 'deleted/approved', color: 'green', show: false };
                Object.assign(history, { [objKeys[index]]: [...history[objKeys[index]], data] });
            } else {
                data = { ...item, show: true, color: '#FFFFFF' };
            };
            return data;
        }).filter(item => item?.show);
    });
    const maxLength = Math.max(...filteredValues?.map(i => i.length));
    const evenLength = maxLength % 2 ? maxLength + 1 : maxLength;
    const data = filteredValues?.map((array, key) => {
        const workTime = 32400000;
        const date = objKeys[key];
        let total = 'INCORRECT';
        let difference = 'INCORRECT';
        let diffTotal = 0;
        for (let index = 0; index < array.length; index++) {
            if ((array.length && !(array.length % 2) && index && index % 2) && !(array.some(item => item.timetype_id === '1' || item.timetype_id === '2'))) {
                const start = moment(`${date}T${array[index - 1].time}`);
                const end = moment(`${date}T${array[index].time}`);
                diffTotal += end.diff(start);
                const diff = Math.abs(workTime - diffTotal);
                total = moment.utc(diffTotal).format("HH:mm:ss");
                difference = `${diffTotal >= workTime ? "+" : "-"}${moment.utc(diff).format("HH:mm:ss")}`;
            }
            if (array.some(item => item.timetype_id === '1')) {
                total = 'VACATION';
                difference = `VACATION`;
            }
            if (array.some(item => item.timetype_id === '2')) {
                total = 'SICK TIME';
                difference = `SICK TIME`;
            }
        };
        totalMonth += diffTotal;
        const currentLength = array.length;
        array.length = evenLength;
        if (currentLength % 2) {
            array.fill({ time: 'EMPTY', color: '#f25c66', show: false }, currentLength, currentLength + 1);
            array.fill({ time: '', color: 'white', show: false }, currentLength + 1, evenLength);
        } else {
            array.fill({ time: '', color: 'white', show: false }, currentLength, evenLength);
        }
        return {
            date,
            total,
            logs: array,
            difference,
        };
    });
    const logsHeader = Array.from({ length: evenLength });
    const totalHours = Math.trunc(moment.duration(totalMonth).asHours());
    const totalMinutes = Math.trunc(moment.duration(totalMonth).asMinutes());
    const totalSeconds = moment.duration(totalMonth).asSeconds();
    return {
        data,
        logsHeader,
        history,
        totalMonth: `${totalHours}:${totalMinutes - totalHours * 60}:${totalSeconds - totalMinutes * 60}`,
        differenceTimes: totalMonth,
    };
};

export const Utils = {
    findRole,
    normalizeData
};

export const findVacAndSickLeaveDays = (newData, totalWorkHours, totalWorkDays) => {
    let def = 0;
    let vac = 0;
    let sickLeave = 0;
    let targetHours = 0;
    newData.forEach((item, index) => {
        if (item.difference !== 'SICK TIME' && item.difference !== 'INCORRECT' && item.difference !== 'VACATION') {
            def += 1;
        }
        if (item.difference === 'VACATION' && item.logs.at(-1).time !== '10:00:00') {
            vac += 1;
        }
        if (item.difference === 'SICK TIME' && item.logs.at(-1).time !== '10:00:00') {
            sickLeave += 1;
        }
    });
    const totalWorkDay = totalWorkDays - vac - sickLeave;
    targetHours = totalWorkHours - (vac * 9) - (sickLeave * 9);
    return { def, vac, sickLeave, targetHours, totalWorkDay };
};

function convertHMS(getSeconds) {
    const sec = parseInt(getSeconds < 0 ? getSeconds * -1 : getSeconds, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 0) { hours = ''; };
    if (hours < 10) { hours = "0" + hours; };
    if (minutes < 10) { minutes = "0" + minutes; };
    if (seconds < 10) { seconds = "0" + seconds; };
    return [+hours, minutes, seconds];
};

export const getDifferenceTimes = (totalWorkDay, totalWorkedHours, totalMonthHours, data) => {
    const workedDaysCount = data.filter(item => item.difference !== 'INCORRECT' && item.difference !== 'VACATION' && item.difference !== 'SICK TIME').length;
    const holideySicleaveDays = data.filter(item => !item.total).length;
    const withoutWeekendDays = data.filter(item => (item.difference =='VACATION' || item.difference == 'SICK TIME') && item.logs[1].time !== '10:00:00').length;
    totalMonthHours = totalMonthHours - 9 * withoutWeekendDays;
    const remainDays = totalWorkDay - workedDaysCount - withoutWeekendDays;
    const leftHours = [remainDays * 9, 0, 0];
    totalWorkedHours = totalWorkedHours.split(":");
    const totalCurrentTimes = [(totalMonthHours - 9 * holideySicleaveDays) - totalWorkedHours[0] - 1, 59 - totalWorkedHours[1], 60 - totalWorkedHours[2]];
    const remainHoursTotal = leftHours.map((item, index) => item - totalCurrentTimes[index]);
    const totalSeconds = ((remainHoursTotal[0] < 0 ? -3600 : 3600) * remainHoursTotal[0]) + (remainHoursTotal[1] * 60) + remainHoursTotal[2];
    const getSeconds = Math.trunc(totalSeconds / remainDays);
    const remainHoursInDay = convertHMS(getSeconds);
    return { remainHoursTotal, remainHoursInDay, remainDays };
};


export const numberLength = (num) => Math.ceil(Math.log(num + 1) / Math.LN10);

export const validateInputsOnlyLetters = (event) => {
    return event.target.value.replace(/[^a-zA-Z]$/,'');
};

export const capitalizeInputValue = (value) => {
    return value.slice(0, 1).toUpperCase() + value.slice(1, value.length + 1).toLowerCase();
};