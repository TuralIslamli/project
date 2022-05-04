import "./index.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { localization } from "../../modules/localization";
import Logo from "../../assets/svg/logo";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MainInput from "../../components/mainInput";
import MainButton from "../../components/mainButton";


const ChangePasswordPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');

  const onChangeOldPass = (event) => {
    setOldPass(event.target.value);
  };

  const onChangeNewPass = (event) => {
    setNewPass(event.target.value);
  };

  const onChangeNewPassConfirm = (event) => {
    setNewPassConfirm(event.target.value);
  };

  const onPressPasswordIcon = () => {
    setIsVisible(!isVisible);
  };

  const onPressSubmit = () => {
    if (oldPass && newPass && newPassConfirm && newPass === newPassConfirm && newPass !== oldPass) {
      // dispatch(setChangePassword( newPass ));
    }
  };

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <Logo width={'100%'} height={400} />
        <MainInput
          label="Old password"
          type={isVisible ? "text" : "password"}
          value={oldPass}
          onChange={onChangeOldPass}
          isIcon
          onClickIcon={onPressPasswordIcon}
          icon={isVisible ? <VisibilityOff color={'secondary'} /> : <Visibility color={'secondary'} />} />
        <MainInput
          label="New password"
          type={isVisible ? "text" : "password"}
          value={newPass}
          onChange={onChangeNewPass} />
        <MainInput
          label="Confirm new password"
          type={isVisible ? "text" : "password"}
          value={newPassConfirm}
          onChange={onChangeNewPassConfirm} />
        <MainButton
          onClick={onPressSubmit}
          label={localization.CHANGE_PASSWORD_BTN} />
      </div>
    </div>
  );
};

export default ChangePasswordPage;