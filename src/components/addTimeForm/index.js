import moment from 'moment';
import MainButton from '../mainButton';
import { CMD } from '../../services/cmd';
import TimePicker from '@mui/lab/TimePicker';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { setSendTimeData } from '../../modules/saga/time/actions';
import { getRolesCMD } from '../../modules/redux/common/selectors';
import { Autocomplete, IconButton, List, ListItemText, MenuItem, Stack, TextField, ListItem } from "@mui/material";
import { getFirstnameLastname, getSelectedUserId } from '../../modules/redux/userInfo/selectors';
import { deleteAddTimeData, setAddTimeData } from '../../modules/redux/addTime/actions';
import { getReasons } from '../../modules/redux/applicationInfo/selectors';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAddTimeData } from '../../modules/redux/addTime/selectors';
import { v4 as uuidv4 } from 'uuid';


const AddTimeForm = ({ userList }) => {
    const dispatch = useDispatch();
    const reasonList = useSelector(getReasons);
    const rolesCMD = useSelector(getRolesCMD);
    const mainUserId = useSelector(getSelectedUserId);
    const addTimeData = useSelector(getAddTimeData);
    const name = useSelector(getFirstnameLastname);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [userId, setUserId] = useState(mainUserId);
    const [userData, setUserData] = useState({});
    const [description, setDescription] = useState("");
    const [warningInput, setWarningInput] = useState(false);
    const [reason, setReason] = useState({
        id: reasonList?.[0].id,
        text: reasonList?.[0]?.cud_reason_text,
    });

    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };

    const handleChangeTime = (newValue) => {
        setTime(newValue);
    };

    const handleChangeSelectReason = (event) => {
        setReason({
            id: event.id,
            text: event.cud_reason_text,
        });
    };

    const handleChangeSelectUser = (_, data) => {
        setUserId(data?.user_id);
        setUserData(data);
    };

    const handleChangeInput = (event) => {
        setDescription(event.target.value);
    };

    const handleDeleteAddTime = (id) => {
        dispatch(deleteAddTimeData(id));
    };

    const handleAddTimeData = () => {
        if (description) {
            dispatch(setAddTimeData({
                reason: reason.text,
                description,
                uuid: uuidv4(),
                timetype_id: 0,
                user_id: userId,
                cud_reason_id: reason.id,
                name: userData?.firstname_lastname || name,
                time: moment(time).format('HH:mm:ss'),
                date: moment(date).format('YYYY-MM-DD'),
            }));
            setDate(new Date());
            setTime(new Date());
            setUserId(mainUserId);
            setUserData({});
            setDescription("");
            setReason({
                id: reasonList?.[0].id,
                text: reasonList?.[0]?.cud_reason_text,
            });
            setWarningInput(false);
        }
        else {
            setWarningInput(true);
        }
    };

    const handleSendTimeData = () => {
        dispatch(setSendTimeData(addTimeData));
    };

    const renderUserList = useMemo(() => {
        let user = userList?.find(i => i.user_id === userId);
        return rolesCMD.includes(CMD.GETLOGIN) ? <Autocomplete
            disablePortal
            onChange={handleChangeSelectUser}
            id="combo-box-demo"
            value={user}
            options={userList}
            sx={{ width: 500 }}
            getOptionLabel={(option) => option?.firstname_lastname}
            renderInput={(params) => <TextField {...params} label="Select user" />} /> : <></>;
    }, [rolesCMD, userList, userId]);

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
                <TimePicker
                    label="Time"
                    value={time}
                    mask="__:__:__"
                    onChange={handleChangeTime}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
                <TextField
                    select
                    value={reason.text}
                    label="Reason"
                    required
                    sx={{ width: 500 }}
                    id="outlined-select-currency"
                    defaultValue={reason.text}>
                    {reasonList.map((option) => (
                        <MenuItem onClick={() => handleChangeSelectReason(option)} key={option.id} value={option.cud_reason_text}>
                            {option.cud_reason_text}
                        </MenuItem>
                    ))}
                </TextField>
                {renderUserList}
                <TextField
                    required
                    value={description}
                    label="Description"
                    id="outlined-required"
                    onChange={handleChangeInput}
                    error={warningInput && !description}
                />
                <MainButton label="Add" onClick={handleAddTimeData} />
                {addTimeData.length ? <><List sx={{ width: 500 }}>
                    {addTimeData.map((value, index) => (
                        <ListItem
                            key={index}
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            disableGutters
                            secondaryAction={
                                <IconButton onClick={() => handleDeleteAddTime(value.uuid)}>
                                    <DeleteIcon />
                                </IconButton>}>
                            <ListItemText primary={`Name: ${value?.name}`} />
                            <ListItemText primary={`Date: ${value?.date}/${value?.time}`} />
                            <ListItemText primary={`Reason: ${value?.reason}`} />
                            <ListItemText style={{ wordBreak: 'break-word' }} primary={`Description: ${value?.description}`} />
                        </ListItem>
                    ))}
                </List>
                    <MainButton label="Send" onClick={handleSendTimeData} /></> : <></>}
            </Stack>
        </div>
    );
};

export default AddTimeForm;