import moment from 'moment';
import MainButton from '../mainButton';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { setSendTimeData } from '../../modules/saga/time/actions';
import { IconButton, List, ListItemText, MenuItem, Stack, TextField, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { getDateType } from '../../modules/redux/applicationInfo/selectors';
import { getAddShortHolidayData } from '../../modules/redux/addShortHoliday/selectors';
import { setAddShortHolidayTimeData, deleteAddShortHolidayTimeData } from '../../modules/redux/addShortHoliday/actions';
import { setSendShortHolidayData } from '../../modules/saga/addShortHoliday/actions';


const AddShortHoliday = () => {
    const dispatch = useDispatch();
    const dateTypeAll = useSelector(getDateType);
    const dateTypeList = dateTypeAll.filter(elem => elem.daytype_text !== "WEEKEND");
    const addTimeData = useSelector(getAddShortHolidayData);
    const [date, setDate] = useState(new Date());
    const [dateType, setDateType] = useState({
        id: dateTypeList?.[0]?.id,
        text: dateTypeList?.[0]?.daytype_text,
    });
    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };

    const handleChangeSelectDateType = (event) => {
        setDateType({
            id: event.id,
            text: event.daytype_text,
        });
    };

    const handleDeleteAddTime = (id) => {
        dispatch(deleteAddShortHolidayTimeData(id));
    };

    const handleAddTimeData = () => {
        dispatch(setAddShortHolidayTimeData({
            id: uuidv4(),
            daytype_id: dateType.id,
            text: dateType.text,
            date: moment(date).format('YYYY-MM-DD'),
        }));
        setDate(new Date());
        setDateType({
            id: dateTypeList?.[0].id,
            text: dateTypeList?.[0]?.daytype_text,
        });
    };

    const handleSendTimeData = () => {
        dispatch(setSendShortHolidayData(addTimeData));
    };

    return (
        <div style={{ display: 'flex', margin: 50, flexDirection: 'column', width: 500 }}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label="Date"
                    value={date}
                    mask="__.__.____"
                    inputFormat="dd.MM.yyyy"
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
                <TextField
                    select
                    value={dateType.text}
                    label="Shortday/Holiday"
                    required
                    sx={{ width: 500 }}
                    id="outlined-select-currency"
                    defaultValue={"Shortday/Holiday*"}>
                    {dateTypeList.map((option) => (
                        <MenuItem onClick={() => handleChangeSelectDateType(option)} key={option.id} value={option.daytype_text}>
                            {option.daytype_text}
                        </MenuItem>
                    ))}
                </TextField>
                <MainButton label="Add" onClick={handleAddTimeData} />
                {addTimeData.length ? <><List sx={{ width: 500 }}>
                    {addTimeData.map((value, index) => (
                        <ListItem
                            key={index}
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            disableGutters
                            secondaryAction={
                                <IconButton onClick={() => handleDeleteAddTime(value.id)}>
                                    <DeleteIcon />
                                </IconButton>}>
                            <ListItemText primary={`Date: ${value?.date} / Day type: ${value?.text}`} />
                        </ListItem>
                    ))}
                </List>
                    <MainButton label="Send" onClick={handleSendTimeData} /></> : <></>}
            </Stack>
        </div>
    );
};

export default AddShortHoliday;