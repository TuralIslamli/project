import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimesheetListData } from "../../modules/redux/timesheetList/selectors";
import {
  setApproveTimesheet,
  setGetTimesheet,
  setGetTimesheetAll,
} from "../../modules/saga/timesheetList/action";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import { CMD } from "../../services/cmd";
import Accordion from "@mui/material/Accordion";
import { AccordionSummary, AccordionDetails } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DesktopDatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { getDateInfo } from "../../modules/redux/applicationInfo/selectors";
import { setDate } from "../../modules/redux/applicationInfo/actions";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from '@mui/material/Switch';
import "./styles.css";


const TimesheetStatuses = () => {
  const dispatch = useDispatch();
  const timesheets = useSelector(getTimesheetListData);
  const rolesCMD = useSelector(getRolesCMD);
  const date = useSelector(getDateInfo);
  const [search, setSearch] = useState("");

  const searchDescribe = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    dispatch(
      setDate({
        year: moment(newValue).format("YYYY"),
        month: moment(newValue).format("M"),
        date: newValue,
      })
    );
  };

  useEffect(() => {
    if (rolesCMD.includes(CMD.GETTIMESHEETALL)) {
      dispatch(setGetTimesheetAll());
    } else if (rolesCMD.includes(CMD.GETTIMESHEET)) {
      dispatch(setGetTimesheet());
    }
  }, []);

  const checkboxOnClick = (user) => {
    const id = user.id;
    dispatch(
      setApproveTimesheet({ id, status: !!parseInt(user.approved) ? 0 : 1 })
    );
  };
  if (timesheets?.length) {
    return (
      <div
        style={{
          display: "flex",
          margin: 50,
          flexDirection: "column",
          width: 500,
        }}>
        <DesktopDatePicker
          label="Date"
          mask="__.____"
          value={date}
          maxDate={new Date()}
          inputFormat="MM.yyyy"
          views={["month", "year"]}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
        {rolesCMD.includes(CMD.GETTIMESHEETALL) ? (
          <input
            className="searchInput"
            onChange={searchDescribe}
            value={search}
            placeholder="Search user name..."
          ></input>
        ) : (
          <></>
        )}
        {timesheets
          .filter((item) => {
            if (search === "") {
              return item;
            } else if (
              item.firstname_lastname
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          ?.sort((a, b) => parseInt(a?.id) - parseInt(b?.id))
          ?.map((item, index, array) => {
            const checkedValue = !!parseInt(item.approved);
            return (
              <div className="lists" key={index}
              >
                <Accordion sx={{ width: 500 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      {item.firstname_lastname}
                      <div>Status: {parseInt(item.approved) ? "Approved" : "Not approve"}</div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div className='listContainer'>
                        <div>Vacation days: {item.actual_vacation_days}</div>
                        <div>Sick leave days: {item.actual_sick_days}</div>
                        <div>Duration: {item.duration}</div>
                        <div>Total work days: {item.total_work_days}</div>
                        <div>Created by: {item.created_by}</div>
                        <div>Approved by: {item.approved_by}</div>
                        <div>Created: {item.created_time}</div>
                        <div>Update: {item?.update_time}</div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <div className="timeSheetItemButton">
                  {rolesCMD.includes(CMD.APPRTIMESHEET) ? (
                    <Switch
                      checked={checkedValue}
                      onChange={() => checkboxOnClick(item)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          margin: 50,
          flexDirection: "column",
          width: 500,
        }}>
        <DesktopDatePicker
          label="Date"
          mask="__.____"
          value={date}
          maxDate={new Date()}
          inputFormat="MM.yyyy"
          views={["month", "year"]}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField color="custom" {...params} />}
        />
        <div className="no_timesheet">No timesheet data.</div>
      </div>
    );
  }
};

export default TimesheetStatuses;