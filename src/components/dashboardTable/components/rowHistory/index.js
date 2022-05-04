import React from 'react';
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { getTimeType } from "../../../../modules/redux/applicationInfo/selectors";
import { setModal } from "../../../../modules/redux/showRecHistory/actions";


const RowHistory = ({ history, isOpen }) => {
    const dispatch = useDispatch();
    const showRecHistoryClick = (uid) => {
        dispatch(setModal(true));
        dispatch({ type: 'SET_SHOW_REC_HISTORY', payload: uid });
    };
    const timeTypes = useSelector(getTimeType);
    return (
        <TableRow style={{ backgroundColor: '#f0efeb' }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                History
                                <TableRow style={{ border: 0 }}>
                                    <TableCell>
                                        Time
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                    <TableCell>
                                        Time type
                                    </TableCell>
                                    <TableCell>
                                        Description
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((item, index) => {
                                    return (
                                        <TableRow key={index} style={{ border: 0 }}>
                                            <TableCell component="th" scope="row" onClick={item.uid ? () => showRecHistoryClick(item.uid) : null}>
                                                {item?.time}
                                            </TableCell>
                                            <TableCell style={{ fontStyle: 'italic', fontWeight: 200, color: item.color }} component="th" scope="row">
                                                {item?.text.split('/')[0]}
                                            </TableCell>
                                            <TableCell style={{ fontStyle: 'italic' }} component="th" scope="row">
                                                {item?.text.split('/')[1]}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {timeTypes.find(i => i?.id === item?.timetype_id)?.timetype_text || 'Default'}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item?.description}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default RowHistory;