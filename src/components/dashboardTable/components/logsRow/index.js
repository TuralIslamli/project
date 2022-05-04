import { IconButton, Stack, TableCell, TableRow } from "@mui/material";
import React, { Fragment, useState } from "react";
import RowHistory from "../rowHistory";
import { styles } from "./styles";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { Box } from "@mui/system";
import { setModal } from '../../../../modules/redux/showRecHistory/actions';


const LogsRow = ({ row, history, index, handleDeleteTime }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenHistory = () => {
        setIsOpen(!isOpen);
    };

    const showRecHistoryClick = (uid) => {
        dispatch(setModal(true));
        dispatch({ type: 'SET_SHOW_REC_HISTORY', payload: uid });
    };

    const getUserRecHistory = (uid) => {
        uid ? showRecHistoryClick(uid) : null;
    };

    return (
        <Fragment>
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={styles.dateRow}>
                    <Box sx={styles.verticalLineRightPosition}></Box>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        {row.date}
                        {history[row?.date].length ? <IconButton onClick={handleOpenHistory}>
                            <ArrowDropDownIcon />
                        </IconButton> : <></>}
                    </Stack>
                </TableCell>
                {row?.logs?.map((log, i) => {
                    let time = '';
                    switch (log?.timetype_id) {
                        case '1':
                            time = 'VACATION';
                            break;
                        case '2':
                            time = 'SICK TIME';
                            break;
                        default:
                            time = log?.time;
                    };
                    return (<TableCell key={i} sx={{ ...styles.inOutRow, backgroundColor: log?.color || 'white', color: log?.time === 'EMPTY' ? 'white' : 'black', position: 'relative' }}>
                        <Stack style={{ alignItems: 'center', justifyContent: log?.show ? 'space-between' : 'center' }} direction="row">
                            {time}
                            {log?.show
                                ?
                                <TableRow>
                                    <IconButton onClick={() => getUserRecHistory(log.uid)}>
                                        <InfoIcon />
                                    </IconButton>
                                    <IconButton onClick={(e) => handleDeleteTime(e, log, row?.date)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableRow>
                                : <Fragment />}
                        </Stack>
                        <Box sx={styles.verticalLineRightPosition}></Box>
                    </TableCell>);
                })}
                <TableCell sx={{ ...styles.totalRow, backgroundColor: row?.total === 'INCORRECT' ? '#f25c66' : 'white', color: row?.total === 'INCORRECT' ? 'white' : 'black' }}>
                    <Box sx={styles.verticalLineLeftPosition}></Box>
                    {row.total}
                </TableCell>
                <TableCell sx={{ ...styles.differenceRow, backgroundColor: row.difference === 'INCORRECT' ? '#f25c66' : 'white', color: row?.total === 'INCORRECT' ? 'white' : 'black' }}>
                    <Box sx={styles.verticalLineLeftPosition}></Box>
                    {row.difference}
                </TableCell>
            </TableRow>
            <RowHistory history={history[row?.date]} isOpen={isOpen} />
        </Fragment>
    );
};

export default LogsRow;