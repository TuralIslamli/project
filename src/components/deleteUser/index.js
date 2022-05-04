import MainButton from '../mainButton';
import { CMD } from '../../services/cmd';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRolesCMD } from '../../modules/redux/common/selectors';
import { Autocomplete, Stack, TextField } from "@mui/material";
import { getSelectedUserId } from '../../modules/redux/userInfo/selectors';
import { getAddVacationData } from '../../modules/redux/addVacation/selectors';
import { setDeleteUser } from '../../modules/saga/deleteUser/actions';


const DeleteUserForm = ({ userList }) => {
    const dispatch = useDispatch();
    const rolesCMD = useSelector(getRolesCMD);
    const mainUserId = useSelector(getSelectedUserId);
    const [userId, setUserId] = useState(mainUserId);
    const handleChangeSelectUser = (_, data) => {
        setUserId(data?.user_id);
    };

    const handleDeleteUser = () => {
        dispatch(setDeleteUser(userId));
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
                {renderUserList}
                <MainButton label="Send" onClick={handleDeleteUser} />
            </Stack>
        </div>
    );
};

export default DeleteUserForm;