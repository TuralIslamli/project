import React, { useMemo } from 'react';
import { Menu, MenuItem, Button, Box, useMediaQuery } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./index.css";


const ButtonDropdown = ({ onClickButton, label, isMenu, menuEl, onClose, menuButtons }) => {
  const menu = useMemo(() => {
    return isMenu
      ? <Menu anchorEl={menuEl} open={!!menuEl} onClose={onClose}>
        {menuButtons?.map(i => <MenuItem sx={i?.sx} key={i?.label} onClick={() => {
          onClose();
          i?.onClick();
        }}>{i?.label}</MenuItem>)}
      </Menu>
      : null;
  }, [isMenu, menuEl, onClose, menuButtons]);
  const matches = useMediaQuery("(max-width:1200px)");

  return (
    <Box className='buttonBox'>
      <Button className='linkButton' onClick={onClickButton} endIcon={<MoreVertIcon />} color="custom" variant="outlined">
        {label}
      </Button>
      {menu}
    </Box>
  );
};

export default ButtonDropdown;