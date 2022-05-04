import MainButton from "../mainButton";
import { CMD } from "../../services/cmd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { setConUserToLogin } from "../../modules/saga/connectUser2Login/actions";


const ConnectForm = ({ userList, selectUserList }) => {
  const dispatch = useDispatch();
  const rolesCMD = useSelector(getRolesCMD);
  const [loginId, setLoginId] = useState('');
  const [selectId, setselectId] = useState('');
  const [warningInput, setWarningInput] = useState(false);
  const handleChangeSelectUser = (_, data) => {
    setLoginId(data?.id);
  };
  const handleChangeId = (_, data) => {
    setselectId(data?.id);
  };
  const handleSendConnect = () => {
    if (loginId && selectId) {
      dispatch(setConUserToLogin({ "login_id": loginId, "user_id": selectId }));
      setWarningInput(false);
    }
    else {
      setWarningInput(true);
    }
  };
  const renderUserList = useMemo(() => {
    let user = userList?.find((i) => i.id === loginId);
    return rolesCMD.includes(CMD.GETLOGIN) ? (
      <Autocomplete
        disablePortal
        onChange={handleChangeSelectUser}
        id="combo-box-demo"
        value={user}
        isOptionEqualToValue={(o, v) => o?.id === v?.id}
        options={userList}
        sx={{ width: 500 }}
        getOptionLabel={(option) => option?.firstname_lastname}
        renderInput={(params) => <TextField {...params} label="Select user" error={warningInput && !loginId} />}
      />
    ) : (
      <></>
    );
  }, [rolesCMD, userList, loginId, warningInput]);

  const renderIdList = useMemo(() => {
    let id = selectUserList?.find((i) => i.id === selectId);
    return rolesCMD.includes(CMD.GETUSER) ? (
      <Autocomplete
        disablePortal
        onChange={handleChangeId}
        id="combo-box-demo"
        value={id}
        isOptionEqualToValue={(o, v) => o?.uid === v?.uid}
        options={selectUserList}
        sx={{ width: 500 }}
        getOptionLabel={(option) => option?.id}
        renderInput={(params) => <TextField {...params} label="Select id" error={warningInput && !selectId} />}
      />
    ) : (
      <></>
    );
  }, [rolesCMD, selectUserList, selectId, warningInput]);

  return (
    <div
      style={{
        display: "flex",
        margin: 50,
        flexDirection: "column",
        width: 500,
      }}
    >
      <Stack spacing={3}>
        {renderUserList}
        {renderIdList}
        <MainButton label="CONNECT" onClick={handleSendConnect} />
      </Stack>
    </div>
  );
};

export default ConnectForm;