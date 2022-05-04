import "./styles.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localization } from "../../modules/localization";
import { setAuthorization } from "../../modules/saga/authorization/action";
import Logo from "../../assets/svg/logo";
import { useHistory } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MainInput from "../../components/mainInput";
import MainButton from "../../components/mainButton";
import Lottie from "react-lottie";
import { selectIsAuthLoading } from "../../modules/redux/authorization/selectors";
import buttonLoading from "../../assets/lottieAnimation/buttonLoading.json";


const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const isAuthLoading = useSelector(selectIsAuthLoading);

  const onPressEnter = (event) => {
    event.key === "Enter" && dispatch(setAuthorization({ login, password, push: history.push }));
  };

  const onChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const onPressPasswordIcon = () => {
    setIsVisible(!isVisible);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onPressSignIn = () => {
    if (login && password) {
      dispatch(setAuthorization({ login, password, push: history.push }));
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buttonLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const lottieLoading = (
    <Lottie width={50} height={50} options={defaultOptions} />
  );

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <Logo width={"100%"} height={400} />
        <MainInput
          label="Login"
          value={login}
          onKeyPress={onPressEnter}
          onChange={onChangeLogin}
          type="text"
        />
        <MainInput
          label="Password"
          value={password}
          onKeyPress={onPressEnter}
          onChange={onChangePassword}
          type={isVisible ? "text" : "password"}
          isIcon
          onClickIcon={onPressPasswordIcon}
          icon={
            isVisible ? (
              <VisibilityOff color={"secondary"} />
            ) : (
              <Visibility color={"secondary"} />
            )
          }
        />
        <MainButton
          disabled={isAuthLoading}
          onClick={onPressSignIn}
          label={isAuthLoading ? lottieLoading : localization.SIGN_IN_BTN}
        />
      </div>
    </div>
  );
};

export default SignIn;