import React from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { styles } from './styles';


const MainInput = ({ label, type, value, onChange, isIcon, onClickIcon, onKeyPress, icon, error }) => {
    const endIcon = <InputAdornment position="end">
        <IconButton onClick={onClickIcon} edge="end">
            {icon}
        </IconButton>
    </InputAdornment>;

  return (
    <FormControl sx={styles.formInputContainer} >
        <InputLabel color={'secondary'}>
            {label}
        </InputLabel>
        <OutlinedInput
            error={error}
            required
            color="secondary"
            type={type}
            value={value}
            sx={styles.formInput}
            onKeyPress={onKeyPress}
            onChange={onChange}
            endAdornment={isIcon ? endIcon : null}
            label={label} />
    </FormControl>
  );
};

export default MainInput;