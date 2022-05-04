import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "../../services/utils";
import {
  List,
  MenuItem,
  Stack,
  TextField,
  Box,
  Typography
} from "@mui/material";
import {
  getAccListControl,
  getRoles,
} from "../../modules/redux/applicationInfo/selectors";
import { setAddRights } from "../../modules/saga/addRights/actions";
import { setDelRights } from "../../modules/saga/deleteRights/actions";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './styles';
import { StepConnector } from '@mui/material';


const EditRightsForm = () => {
  const dispatch = useDispatch();
  const rolesList = useSelector(getRoles);
  const accListControl = useSelector(getAccListControl);
  const [roles, setRoles] = useState({
    id: rolesList?.[0].id,
    text: rolesList?.[0]?.role_text,
  });
  const handleChangeSelectReason = (event) => {
    setRoles({
      id: event.id,
      text: event.role_text,
    });
  };
  const selectedRole = Utils.findRole(accListControl, roles?.id);

  const difference = accListControl?.filter(
    i => !selectedRole.includes(i.short_code)
  );

  const activeRoles = accListControl?.filter(
    i => selectedRole.includes(i.short_code)
  );

  const handleAddRights = (e) => {
    let newItem = {
      role_id: roles.id, short_code: e.short_code, role_text: roles.text
    }
    if (newItem.role_id && newItem.short_code) {
      dispatch(setAddRights([newItem]));
    }
  }
  const handleDeleteRights = (e) => {
    let newItem = {
      role_id: roles.id, short_code: e.short_code, role_text: roles.text
    }
    dispatch(setDelRights([newItem]));
  };
  return (
    <div
      style={{
        display: "flex",
        margin: 50,
        flexDirection: "column",
        width: '500px',
      }}
    >
      <Stack spacing={3}>
        <TextField
          select
          value={roles.text}
          label="Roles"
          required
          sx={{ width: 500 }}
          id="outlined-select-currency"
          defaultValue={roles.text}
        >
          {rolesList?.map((option) => (
            <MenuItem
              onClick={() => handleChangeSelectReason(option)}
              key={option.id}
              value={option.role_text}
            >
              {option.role_text}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <List sx={styles.rightsWrapper}>
          <Typography sx={styles.word}>Available</Typography>
          <StepConnector></StepConnector>
          {activeRoles.map((item) =>
            <Box onClick={() => handleDeleteRights(item)} sx={styles.roleBlock} key={item.short_code}>
              <Typography sx={styles.typographyBlock}>{item.short_code}</Typography>
              <RemoveIcon sx={styles.removeIcon}></RemoveIcon>
            </Box>
          )}
        </List>
        <Box sx={styles.lineVertical}></Box>
        <List sx={styles.rightsWrapper}>
          <Typography sx={styles.word}>Not available</Typography>
          <StepConnector></StepConnector>
          {difference.map((item) =>
            <Box onClick={() => handleAddRights(item)} sx={styles.roleBlock} key={item.short_code}>
              <Typography sx={styles.typographyBlock}>{item.short_code}</Typography>
              <AddIcon sx={styles.addIcon}></AddIcon>
            </Box>
          )}
        </List>
      </Box>
    </div>
  );
};

export default EditRightsForm;