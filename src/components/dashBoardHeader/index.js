import './index.css';
import moment from 'moment';
import { Paper, Tooltip } from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import React, { useEffect, useMemo, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../modules/redux/applicationInfo/actions';
import { setSelectedUserId } from '../../modules/redux/userInfo/actions';
import { getSelectedUserId } from '../../modules/redux/userInfo/selectors';
import { getDateInfo, getMonth, getYear } from '../../modules/redux/applicationInfo/selectors';
import { setWorkDayHours, setTimeSheetAllData } from '../../modules/saga/dashboard/action';
import { getWorksDayHolidays, getWorksDayShortdays, getWorksDayTotalHours, getWorksDaytotalWorkdays, getWorksDayWeekends } from '../../modules/redux/workdayHours/selectors';
import { getRemainDays, getRemainHoursInDay, getRemainHoursTotal, getSickLeaveDays, getTargetHours, getTargetWorkDays, getTotalMonth, getVacationDays } from '../../modules/redux/dashboard/selectors';
import { localization } from '../../modules/localization';
import { getRolesCMD } from '../../modules/redux/common/selectors';
import { CMD } from '../../services/cmd';


const DashboardHeader = ({ userList, totalMonth }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getSelectedUserId);
  const date = useSelector(getDateInfo);
  const rolesCMD = useSelector(getRolesCMD);
  const totalMonthHours = useSelector(getTotalMonth);
  const totalWorkHours = useSelector(getWorksDayTotalHours);
  const totalHour = totalMonthHours.split(":");
  const holidays = useSelector(getWorksDayHolidays);
  const shortDays = useSelector(getWorksDayShortdays);
  const weekends = useSelector(getWorksDayWeekends);
  const vacation = useSelector(getVacationDays);
  const sickLeave = useSelector(getSickLeaveDays);
  const remainHoursTotal = useSelector(getRemainHoursTotal);
  const selectedMonth = useSelector(getMonth);
  const selectedYear = useSelector(getYear);
  const isCurrentMonth = (new Date().getFullYear() == selectedYear && new Date().getMonth() + 1 == selectedMonth) ? true : false;
  const remainHoursTotalString = remainHoursTotal.map(item => {
    item = Math.abs(item).toString();
    return item.length != 2 ? item.padStart(2, '0') : item;
  }).join(':');
  const remainHoursInDay = useSelector(getRemainHoursInDay);
  const remainHoursInDayString = remainHoursInDay.map(item => {
    item = Math.abs(item).toString();
    return item.length != 2 ? item.padStart(2, '0') : item;
  }).join(':');
  const remainDays = useSelector(getRemainDays);
  const targetHours = useSelector(getTargetHours);
  const totalCurrentHours = targetHours - totalHour[0] - 1;
  const totalCurrentMinutes = 59 - totalHour[1];
  const totalCurrentSeconds = 60 - totalHour[2];
  const totalHours = useSelector(getWorksDayTotalHours);
  const targetWorkDays = useSelector(getTargetWorkDays);
  const [isOpen, setIsOpen] = useState(false);
  const totalWorkDays = useSelector(getWorksDaytotalWorkdays);

  const handleChangeDate = (newValue) => {
    dispatch(setDate({
      year: moment(newValue).format('YYYY'),
      month: moment(newValue).format('M'),
      date: newValue,
    }));
  };

  const handleSelectUser = (_, data) => {
    data?.user_id && dispatch(setSelectedUserId(data?.user_id));
  };

  const handleWorkdaysHours = () => {
    rolesCMD.includes(CMD.WORKDAYHOURS) && dispatch(setWorkDayHours());
    rolesCMD.includes(CMD.TIMESHEETALL) && dispatch(setTimeSheetAllData());
  };

  useEffect(() =>
    handleWorkdaysHours(),
    [date, userId, remainDays]);

  useEffect(() => {
    window.onscroll = function () {
      isOpen ? setIsOpen(false) : null;
    };
  }, [isOpen]);

  const renderUserList = useMemo(() => {
    let user = userList?.find(i => i.user_id === userId);
    return userList.length ? <Autocomplete
      disablePortal
      onChange={handleSelectUser}
      value={user}
      id="combo-box-demo"
      options={userList}
      sx={{ minWidth: 250 }}
      getOptionLabel={(option) => option?.firstname_lastname}
      renderInput={(params) => <TextField color="custom" {...params} label="Select user" />} /> : <></>;
  }, [userList, userId]);
  return (
    <div className="dashboardHeaderContainer">
      <DesktopDatePicker
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        label="Date"
        mask="__.____"
        value={date}
        maxDate={new Date()}
        inputFormat="MM.yyyy"
        views={['month', 'year']}
        onChange={handleChangeDate}
        renderInput={(params) => <TextField color="custom" {...params} />} />
      <Tooltip
        placement="bottom"
        componentsProps={{
          tooltip: {
            sx: {
              color: "black",
              background: "rgba(190, 144, 212, 0.9)",
              fontSize: "0.93em",
              lineHeight: "20px",
              minHeight: 150,
              width: 300,
              paddingTop: 1.6,
              paddingLeft: 2,
              border: "1px solid grey"
            }
          }
        }} disableFocusListener disableTouchListener title={
          <div className="titleContainer">
            <p>{localization.TOTAL_WORKDAYS}:<strong>{" " + totalWorkDays}</strong></p>
            <p>{localization.TOTAL_HOURS} :<strong>{totalHours}</strong> </p>
            <p>{localization.HOLIDAYS}:<strong>{" " + holidays}</strong></p>
            <p>{localization.SHORT_DAYS}:<strong>{" " + shortDays}</strong></p>
            <p>{localization.TOTAL_WEEKENDS}: <strong>{" " + weekends}</strong></p>
            {+totalWorkDays !== +targetWorkDays ?
              <div>
                <p>{localization.ACTUAL_WORKDAYS}:<strong>{" " + targetWorkDays}</strong></p>
                <p>{localization.VACATION}:<strong>{" " + vacation}</strong></p>
                <p>{localization.SICK_LEAVE_DAYS}:<strong>{" " + sickLeave}</strong></p>
                <p>{localization.TARGET_HOURS} :<strong>{" " + targetHours}</strong> </p>
              </div>
              : null
            }
            <p>{localization.TOTAL_TIME_DIFFERENCE}: <strong className={
              totalCurrentHours > 0 ? "redLine" : "greenLine"
            }>{-totalCurrentHours}:{totalCurrentMinutes}:{totalCurrentSeconds}</strong></p>
            {(remainHoursTotal[0] < 0 || remainHoursTotal[1] < 0 || remainHoursTotal[2] < 0) && isCurrentMonth ?
              <div className='remainInfo'>
                You are <strong><i>{remainHoursTotalString} (hh:mm:ss)</i></strong> behind schedule.
                It is recommended to work an extra <strong><i>{remainHoursInDayString} (hh:mm:ss)</i></strong> per a day to normalize working hours for the remaining <strong><i>{remainDays}</i></strong> days.
              </div> :
              null}
          </div>
        }>
        <Paper sx={{ padding: '10px 15px', margin: '15px 5px 20px', textAlign: 'center', minWidth: '300px' }} elevation={10}>Total for this month: <b>{totalMonth || 'Unknown'}</b>
        </Paper>
      </Tooltip>
      {renderUserList}
    </div >
  );
};
export default DashboardHeader;