import { DesktopDatePicker, TimePicker } from "@mui/lab";
import { Autocomplete, MenuItem, Stack, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReasons } from "../../modules/redux/applicationInfo/selectors";
import { getIsLoadingDelete, getTimeForDelete } from "../../modules/redux/approveTime/selectors";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import { getSelectedUserId, getUserList } from "../../modules/redux/userInfo/selectors";
import { CMD } from "../../services/cmd";
import MainButton from "../mainButton";
import { setDeleteTimeData } from "../../modules/saga/time/actions";
import Lottie from "react-lottie";
import buttonLoading from '../../assets/lottieAnimation/buttonLoading.json';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buttonLoading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const DeleteTimeForm = () => {
    const timeForDelete = useSelector(getTimeForDelete);
    const reasons = useSelector(getReasons);
    const rolesCMD = useSelector(getRolesCMD);
    const userList = useSelector(getUserList);
    const selectedUserId = useSelector(getSelectedUserId);
    const [date, setDate] = useState(timeForDelete?.date);
    const [time, setTime] = useState(timeForDelete?.time);
    const [description, setDescription] = useState("");
    const [reason, setReason] = useState(reasons?.[0]?.cud_reason_text);
    const [reasonId, setReasonId] = useState(reasons?.[0]?.id);
    const isLoadingDelete = useSelector(getIsLoadingDelete);
    const [warningInput, setWarningInput] = useState(false);
    const dispatch = useDispatch();
    const lottieLoading = <Lottie width={50} height={50} options={defaultOptions} />;

    const handleSubmit = () => {
        if (description) {
            dispatch(setDeleteTimeData({ data: { user_id: selectedUserId, description, uid: timeForDelete?.uid, cud_reason_id: reasonId }, cmd: rolesCMD.includes(CMD.DELTIMEALL) ? CMD.DELTIMEALL : CMD.DELTIME }));
            setWarningInput(false);
        }
        else {
            setWarningInput(true);
        }
    };

    const handleChangeSelectReason = (event) => {
        setReason(event.target.value);
    };

    const handleChangeInput = (event) => {
        setDescription(event.target.value);
    };

    const renderUserList = useMemo(() => {
        let user = userList?.find(i => i.user_id === selectedUserId);
        return rolesCMD.includes(CMD.GETLOGIN) ? <Autocomplete
            disablePortal
            disabled
            value={user}
            options={userList}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option?.firstname_lastname}
            renderInput={(params) => <TextField {...params} label="Selected user" />} /> : <></>;
    }, [rolesCMD, userList, selectedUserId]);

    return (
        <div style={{ display: 'flex', margin: 50, flexDirection: 'column', width: 500 }}>
            <Stack spacing={3}>
                <TextField
                    label="Date / time"
                    disabled
                    id="outlined-select-currency"
                    defaultValue={`${date} / ${time}`} />
                {renderUserList}
                <TextField
                    select
                    value={reason}
                    label="Reason"
                    id="outlined-select-currency"
                    onChange={handleChangeSelectReason}
                    defaultValue={reasons[0].cud_reason_text}>
                    {reasons.map((option) => (
                        <MenuItem onClick={() => setReasonId(option.id)} key={option.id} value={option.cud_reason_text}>
                            {option.cud_reason_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    error={warningInput && !description}
                    label="Description"
                    id="outlined-required"
                    onChange={handleChangeInput}
                />
                <MainButton label={isLoadingDelete ? lottieLoading : "Submit"} onClick={handleSubmit} />
            </Stack>
        </div>
    );
};

export default DeleteTimeForm;