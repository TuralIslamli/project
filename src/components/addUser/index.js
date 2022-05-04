import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, getGenders, getRoles } from "../../modules/redux/applicationInfo/selectors";
import Button from '@mui/material/Button';
import { Autocomplete, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styles } from './styles';
import { setAddUser } from "../../modules/saga/adduser/actions";


const AddUser = () => {
    const dispatch = useDispatch();
    const departments = useSelector(getDepartments);
    const genders = useSelector(getGenders);
    const roles = useSelector(getRoles);
    const [department, setDepartment] = useState({ department_text: '', id: '' });
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [role, setRole] = useState({ role_text: '', id: '' });
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState({ text: '', id: '' });
    const [isVisible, setIsVisible] = useState(false);
    const [warningInput, setWarningInput] = useState(false);

    const onPressPasswordIcon = () => {
        setIsVisible(!isVisible);
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

    const handleChangeDepartment = (option) => {
        setDepartment(option);
    };

    const handleChangeRole = (option) => {
        setRole(option);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeGender = (option) => {
        setGender(option);
    };

    const handleChangeLastNameFirstName = (event) => {
        setName(event.target.value);
    };

    const handleChangeUserLogin = (event) => {
        setLogin(event.target.value);
    };

    const handleSendAddedData = () => {
        if (role.role_text && department.department_text && gender.text && name && login && password) {
            dispatch(setAddUser({ "user_login": login, "user_password": password, "role_id": role.id, "department_id": department.id, "firstname_lastname": name, "gender_id": gender.id }));
            setWarningInput(false);
        } else {
            setWarningInput(true);
        }
    };

    return (
        <div style={{ display: 'flex', margin: 50, flexDirection: 'column', width: 300 }}>
            <Stack spacing={3}>
                <TextField
                    select
                    value={role.role_text}
                    label="Select role"
                    id="outlined-select-currency"
                    defaultValue={departments[0].role_text}
                    error={warningInput && !role.role_text}>
                    {roles?.map((option) => (
                        <MenuItem key={option.id} onClick={() => handleChangeRole(option)} value={option.role_text}>
                            {option.role_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    value={department.department_text}
                    label="Select department"
                    id="outlined-select-currency"
                    defaultValue={departments[0].department_text}
                    error={warningInput && !department.department_text}>
                    {departments?.map((option) => (
                        <MenuItem key={option.id} onClick={() => handleChangeDepartment(option)} value={option.department_text}>
                            {option.department_text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Firstname lastname"
                    value={name}
                    id="outlined-required"
                    onChange={handleChangeLastNameFirstName}
                    error={warningInput && !name}
                />
                <TextField
                    label="User login"
                    value={login}
                    id="outlined-required"
                    onChange={handleChangeUserLogin}
                    error={warningInput && !login}
                />
                <TextField
                    select
                    value={gender.text}
                    label="Select gender"
                    id="outlined-select-currency"
                    defaultValue={genders.text}
                    error={warningInput && !gender.text}>
                    {genders?.map((option) => (
                        <MenuItem key={option.id} onClick={() => handleChangeGender(option)} value={option.text} >
                            {option.text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Password"
                    value={password}
                    id="outlined-required"
                    onChange={handleChangePassword}
                    error={warningInput && !password}
                />
                <Button disabled={false} sx={styles.formButton} onClick={handleSendAddedData} variant="contained">SEND</Button>
            </Stack>
        </div>
    );
};

export default AddUser;