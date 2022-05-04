import "./index.css";
import { styles } from './styles';
import { CMD } from "../../services/cmd";
import { Drawer, Box } from "@mui/material";
import Header from "../../components/header";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTimeForm from "../../components/addTimeForm";
import EditUserForm from "../../components/editUserForm";
import ApproveTimeForm from "../../components/approveTime";
import DashboardTable from "../../components/dashboardTable";
import DashboardHeader from "../../components/dashBoardHeader";
import { setDrawer } from "../../modules/redux/dashboard/action";
import { getRolesCMD } from "../../modules/redux/common/selectors";
import {
  getMonth,
  getYear,
} from "../../modules/redux/applicationInfo/selectors";
import {
  getChangePassword,
  getSelectedUserId,
  getSelectUserList,
  getUserList,
} from "../../modules/redux/userInfo/selectors";
import {
  setUserLogin,
  setTimeSheetAllData,
  setTimeSheetData,
} from "../../modules/saga/dashboard/action";
import {
  getDashBoardData,
  getDrawerType,
  getIsDrawer,
  getMaxLength,
  getTotalMonth,
  getHistory,
  refresh,
} from "../../modules/redux/dashboard/selectors";
import GlobalTimeSheetList from "../../components/globalTimesheet";
import TimesheetStatuses from "../../components/timesheetList";
import DeleteTimeForm from "../../components/deleteTimeForm";
import AddVacationForm from "../../components/addVacation";
import AddSickLeaveForm from "../../components/addSickLeave";
import ChangeUserNameForm from "../../components/changeUserNameForm";
import AddUser from "../../components/addUser";
import ConnectForm from "../../components/connectUser2Login";
import ChangePassword from "../../components/changePassword";
import DeleteUserForm from "../../components/deleteUser";
import AddRightsForm from "../../components/editRights";
import AddShortHoliday from "../../components/addShortHoliday";
import GenerateYear from "../../components/generateYear";
import { clearFiltersList } from "../../modules/redux/approveTime/actions";


const Dashboard = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const rolesCMD = useSelector(getRolesCMD);
  const isDrawer = useSelector(getIsDrawer);
  const drawerType = useSelector(getDrawerType);
  const dashboardData = useSelector(getDashBoardData);
  const maxLength = useSelector(getMaxLength);
  const userList = useSelector(getUserList);
  const totalMonth = useSelector(getTotalMonth);
  const year = useSelector(getYear);
  const month = useSelector(getMonth);
  const userId = useSelector(getSelectedUserId);
  const history = useSelector(getHistory);
  const selectUserList = useSelector(getSelectUserList);
  const mustChangePassword = useSelector(getChangePassword);
  const isRefresh = useSelector(refresh);
  const [toggleRefresh, setToggleRefresh] = useState();
  const handleResize = () => {
    setMenu(false);
  }
  useEffect(() => {
    if (window.innerWidth <= 1200) {
      window.addEventListener('resize', handleResize)
    }
    return () => window.removeEventListener('resize', handleResize)
  })
  useEffect(() => {
    if (mustChangePassword) {
      dispatch(setDrawer({ isDrawer: true, drawerType: "CHANGE_PASSWORD" }));
    }
    if (rolesCMD.includes(CMD.VIEWTIMEALL)) {
      dispatch(setTimeSheetAllData());
    } else if (rolesCMD.includes(CMD.VIEWTIME)) {
      dispatch(setTimeSheetData());
    }
    if (rolesCMD.includes(CMD.GETUSER)) {
      dispatch(setUserLogin());
    }
  }, [year, month, userId, mustChangePassword, toggleRefresh]);

  const contents = {
    approveTime: <ApproveTimeForm />,
    addTime: <AddTimeForm userList={userList} />,
    DELETE_TIME: <DeleteTimeForm />,
    addVacation: <AddVacationForm userList={userList} />,
    addSickLeave: <AddSickLeaveForm userList={userList} />,
    addShortHoliday: <AddShortHoliday />,
    globalTimeSheet: <GlobalTimeSheetList />,
    timeSheetStatuses: <TimesheetStatuses />,
    EDIT_USER: <EditUserForm userList={userList} />,
    updateUserTerminal: <ChangeUserNameForm selectUserList={selectUserList} />,
    ADD_USER: <AddUser />,
    CONNECT: <ConnectForm selectUserList={selectUserList} userList={userList} />,
    CHANGE_PASSWORD: <ChangePassword />,
    DELUSER: <DeleteUserForm userList={userList} />,
    ADDRIGHTS2ROLE: <AddRightsForm />,
    GENERATEYEAR: <GenerateYear />
  };

  const drawerContent = useMemo(() => {
    return contents[drawerType];
  }, [drawerType, userList, selectUserList]);

  const onCloseDrawer = () => {
    if (mustChangePassword == 0) {
      dispatch(setDrawer({ isDrawer: false, drawerType: "" }));
    }
    if (rolesCMD.includes(CMD.APPRTIME)) {
      dispatch(clearFiltersList());
    }
    if (isRefresh) {
      setToggleRefresh(!toggleRefresh);
    }
  };
  return (
    <Box style={menu ? { height: '70vh', overflow: 'hidden' } : { height: 'auto', overflow: 'auto' }} className="dashboardContainer">
      <Header menu={menu} setMenu={setMenu} />
      <Box sx={styles.dashboardWrapper}>
        <DashboardHeader {...{ userList, totalMonth }} />
        <Drawer open={isDrawer} onClose={onCloseDrawer}>
          {drawerContent}
        </Drawer>
        <DashboardTable {...{ maxLength, dashboardData, history }} />
      </Box>
    </Box>
  );
};

export default Dashboard;