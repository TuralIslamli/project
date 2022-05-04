import "./style.css";
import SignIn from "./screens/signIn";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./screens/dashboard";
import ChangePasswordPage from "./screens/changePass";
import { theme } from "./services/globalStyles/theme";
import { ROUTES } from "./services/routes";
import { useSelector } from "react-redux";
import { getIsAuthorized } from "./modules/redux/common/selectors";
import CustomSnackbar from "./components/customSnackbar";
import ModalHistory from "./components/modal";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const App = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            {isAuthorized ? (
              <Redirect to={ROUTES.DASHBOARD} />
            ) : (
              <Redirect to={ROUTES.SIGN_IN} />
            )}
          </Route>
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.CHANGE_PASSWORD} component={ChangePasswordPage} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
        </Switch>
        <ModalHistory />
        <CustomSnackbar />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;