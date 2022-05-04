import React from "react";
import { Button, FormControl } from "@mui/material";
import { styles } from './styles';


const MainButton = ({ onClick, label, disabled }) => {

  return (
    <FormControl sx={styles.formInputContainer}>
        <Button disabled={disabled} sx={styles.formButton} onClick={onClick} variant="contained">
            {label}
        </Button>
    </FormControl>
  );
};

export default MainButton;