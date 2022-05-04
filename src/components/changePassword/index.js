import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styles } from './styles';
import { setChangePassword } from "../../modules/saga/changePassword/actions";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const [olPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const onPressPasswordIcon = () => {
        setIsVisible(!isVisible);
    };
    const onChangePassword = (event) => {
        setOldPassword(event.target.value);
    };
    const onChangePasswordAgain = (event) => {
        setNewPassword(event.target.value);
    };
    const onPressEnter = () => {
        dispatch(setChangePassword({ old_password: olPassword, new_password: newPassword }));
    };

    const endIcon = <InputAdornment position="end">
        <IconButton onClick={onPressPasswordIcon} edge="end">
            {
                isVisible ? (
                    <VisibilityOff />
                ) : (
                    <Visibility />
                )
            }
        </IconButton>
    </InputAdornment>;

    return (
        <div style={{ display: 'flex', margin: 50, flexDirection: 'column', width: 400 }}>
            <Stack spacing={3}>
                <FormControl sx={styles.formInputContainer} >
                    <InputLabel >
                        Old password
                    </InputLabel>
                    <OutlinedInput
                        required
                        type={isVisible ? "text" : "password"}
                        value={olPassword}
                        sx={styles.formInput}
                        onChange={onChangePassword}
                        endAdornment={endIcon}
                        label="Old password" />
                </FormControl>
                <FormControl sx={styles.formInputContainer} >
                    <InputLabel >
                        New password
                    </InputLabel>
                    <OutlinedInput
                        required
                        type={isVisible ? "text" : "password"}
                        value={newPassword}
                        sx={styles.formInput}
                        onChange={onChangePasswordAgain}
                        label="New password" />
                </FormControl>
                <Button disabled={false} sx={styles.formButton} onClick={onPressEnter} variant="contained">SEND</Button>
            </Stack>
        </div>
    );
};

export default ChangePassword;