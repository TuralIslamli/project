import moment from 'moment';
import MainButton from '../mainButton';
import { CMD } from '../../services/cmd';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { setSendVacationSickLeaveData } from '../../modules/saga/time/actions';
import { getRolesCMD } from '../../modules/redux/common/selectors';
import { Autocomplete, IconButton, List, ListItemText, Stack, TextField, ListItem } from "@mui/material";
import { getFirstnameLastname, getSelectedUserId } from '../../modules/redux/userInfo/selectors';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { deleteAddSickLeaveData, setAddSickLeaveData, setResetAddSickLeaveData } from '../../modules/redux/addSickLeave/actions';
import { getAddSickLeaveData } from '../../modules/redux/addSickLeave/selectors';


const AddSickLeaveForm = ({ userList }) => {
    const dispatch = useDispatch();
    const rolesCMD = useSelector(getRolesCMD);
    const mainUserId = useSelector(getSelectedUserId);
    const addSickLeaveData = useSelector(getAddSickLeaveData);
    const name = useSelector(getFirstnameLastname);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userId, setUserId] = useState(mainUserId);
    const [userData, setUserData] = useState({});
    const [description, setDescription] = useState("");
    const [warningInput, setWarningInput] = useState(false);

    const handleChangeStartDate = (newValue) => {
        setStartDate(newValue);
    };

    const handleChangeEndDate = (newValue) => {
        setEndDate(newValue);
    };

    const handleChangeSelectUser = (_, data) => {
        setUserId(data?.user_id);
        setUserData(data);
    };

    const handleChangeInput = (event) => {
        setDescription(event.target.value);
    };

    const handleDeleteAddTime = (id) => {
        dispatch(deleteAddSickLeaveData(id));
    };

    const handleAddTimeData = () => {
        if (description && startDate <= endDate) {
            dispatch(setAddSickLeaveData({
                description,
                uuid: uuidv4(),
                timetype_id: "2",
                user_id: userId,
                cud_reason_id: "0",
                name: userData?.firstname_lastname || name,
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
            }));
            setUserId(mainUserId);
            setUserData({});
            setDescription("");
            setWarningInput(false);
        }
        else {
            setWarningInput(true);
        }
    };

    const handleSendTimeData = () => {
        dispatch(setSendVacationSickLeaveData(addSickLeaveData));
        dispatch(setResetAddSickLeaveData());
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
                    label="Start date"
                    value={startDate}
                    inputFormat="dd.MM.yyyy"
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
                <DesktopDatePicker
                    minDate={startDate}
                    label="End date"
                    value={endDate}
                    inputFormat="dd.MM.yyyy"
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
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
                {addSickLeaveData.length ? <><List sx={{ width: 500 }}>
                    {addSickLeaveData.map((value, index) => (
                        <ListItem
                            key={index}
                            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                            disableGutters
                            secondaryAction={
                                <IconButton onClick={() => handleDeleteAddTime(value.uuid)}>
                                    <DeleteIcon />
                                </IconButton>}>
                            <ListItemText primary={`Name: ${value?.name}`} />
                            <ListItemText primary={`Date: From ${value?.startDate} to ${value?.endDate}`} />
                        </ListItem>
                    ))}
                </List>
                    <MainButton label="Send" onClick={handleSendTimeData} /></> : <></>}
            </Stack>
        </div>
    );
};

export default AddSickLeaveForm;