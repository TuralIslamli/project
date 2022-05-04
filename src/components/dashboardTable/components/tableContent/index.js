import React from "react";
import './styles.css';
import { TableBody } from "@mui/material";
import { useDispatch } from 'react-redux';
import { setTimeForDelete } from '../../../../modules/redux/approveTime/actions';
import { setDrawer } from '../../../../modules/redux/dashboard/action';
import LogsRow from "../logsRow";


const TableContent = ({ dashboardData, history }) => {
    const dispatch = useDispatch();
    const handleDeleteTime = (e, finger, date) => {
        e.stopPropagation();
        dispatch(setTimeForDelete({ ...finger, date }));
        dispatch(setDrawer({ isDrawer: true, drawerType: 'DELETE_TIME' }));
    };
    return (
        <TableBody>
            {dashboardData.map((row, index) => (
                <LogsRow key={index} {...{ history, row, index, handleDeleteTime }} />
            ))}
        </TableBody>
    );
};

export default TableContent;