import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import { setSnackbar } from "../../modules/redux/applicationInfo/actions";
import MuiAlert from '@mui/material/Alert';
import { getSnackbar } from '../../modules/redux/applicationInfo/selectors';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = (props) => {
  const dispatch = useDispatch();
  const snackbar = useSelector(getSnackbar);

  const handleClose = () => {
      dispatch(setSnackbar({ isOpen: false }));
  };

  return (
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar?.isOpen} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar?.type} sx={{ width: '100%' }}>
          {snackbar?.text}
        </Alert>
      </Snackbar>
  );
};

export default CustomSnackbar;