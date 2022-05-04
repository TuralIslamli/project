import { useStyles } from "./styles";
import { Box } from "@mui/system";
import { Tooltip, Link, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartment, getFirstnameLastname, getRole, getUserLogin, getUserId } from "../../modules/redux/userInfo/selectors";
import { setSelectedUserId } from "../../modules/redux/userInfo/actions";


const UserInfo = () => {
    const dispatch = useDispatch();
    const userName = useSelector(getFirstnameLastname);
    const userLogin = useSelector(getUserLogin);
    const userId = useSelector(getUserId);
    const userRole = useSelector(getRole);
    const userDepartment = useSelector(getDepartment);
    const classes = useStyles();

    const userAdditionalInfo = useMemo(() => {
        return (
            <>
                <Typography>
                    Login: {userLogin}<br />
                    Department: {userDepartment}<br />
                    Role: {userRole}<br />
                </Typography>
            </>
        );

    }, [userName, userLogin, userRole, userDepartment]);

    return userName ?
        <Box container className={classes.profileButtonStyle}>
            <Tooltip disableFocusListener disableTouchListener title={userAdditionalInfo}>
                <Typography variant="h6" align="center" className={classes.textStyle}>
                    <Link className={classes.linkUserName} onClick={() => dispatch(setSelectedUserId(userId))}>Welcome, {userName} !</Link>
                </Typography>
            </Tooltip>
        </Box> : <></>;
};

export default UserInfo;