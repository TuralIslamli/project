import { DesktopDatePicker } from '@mui/lab';
import { Autocomplete, Button, List, ListItem, ListItemText, Stack, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltersList } from '../../../modules/redux/approveTime/actions';
import { getFilters } from '../../../modules/redux/approveTime/selectors';
import { setModal } from '../../../modules/redux/showRecHistory/actions';
import { getUserList } from '../../../modules/redux/userInfo/selectors';
import './styles.css';


const UsersList = ({ items, users, onClick, timeTypes, month }) => {
    const dispatch = useDispatch();
    const showRecHistoryClick = (uid) => {
        dispatch(setModal(true));
        dispatch({ type: 'SET_SHOW_REC_HISTORY', payload: uid });
    };
    const [description, setDescription] = useState('');
    const usersList = useSelector(getUserList);
    const logTypes = [...timeTypes, {id: "0", timetype_text: "Time"}];
    const statusTypes = [
        {id: "1", status_text: "New"},
        {id: "3", status_text: "Deleted"},
    ];
    const [logStartDate, setLogStartDate] = useState(null);
    const [logEndDate, setLogEndDate] = useState(null);
    const [isShowFilters, setIsShowFilters] = useState(false);
    const filters = useSelector(getFilters);

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleChangeAddedBy = (_, data) => {
        dispatch(setFiltersList({
            added_by: data?.user_id || null,
        }));
    };

    const handleChangeAddedFor = (_, data) => {
        dispatch(setFiltersList({
            added_for: data?.user_id || null,
        }));
    };

    const handleChangeTimeType = (_, data) => {
        dispatch(setFiltersList({
            time_type: data?.id || null,
        }));
    };

    const handleChangeStatus = (_, data) => {
        dispatch(setFiltersList({
            status: data?.id,
        }));
    };

    const handleChangeStartDate = (_) => {
        dispatch(setFiltersList({
            startDate: _&& `${_.getFullYear()}-${(_.getMonth()+1 < 10 ? '0':'') + String(_.getMonth()+1)}-${(_.getDate() < 10 ? '0':'') + String(_.getDate())}`
        }));
        setLogStartDate(_);
    };

    const handleChangeEndDate = (_) => {
        dispatch(setFiltersList({
            endDate: _ && `${_.getFullYear()}-${(_.getMonth()+1 < 10 ? '0':'') + String(_.getMonth()+1)}-${(_.getDate() < 10 ? '0':'') + String(_.getDate())}`
        }));
        setLogEndDate(_);
    };

    const handleFilters = () => {
        setLogStartDate(null);
        setLogEndDate(null);
        dispatch(setFiltersList({
            added_by: null,
            time_type: null,
            status: null,
            startDate: null,
            endDate: null,
        }));
        setIsShowFilters(prev => !prev);
    };
    return (
        <List sx={{ width: '100%', marginTop: '10px'}}>
            <Stack spacing={3}>
            {items.length ? (
            <>
                <Autocomplete
                    disablePortal
                    onChange={handleChangeAddedFor}
                    id="combo-box-demo"
                    options={usersList}
                    sx={{ width: 500 }}
                    getOptionLabel={(option) => option?.firstname_lastname}
                    renderInput={(params) => <TextField style={{marginTop: 15}} {...params} label="Added for" />} />
                <Button
                    onClick={handleFilters}
                    variant="outlined"
                >{isShowFilters ? 'Hide filters' : 'Show more filters'}</Button>
                {isShowFilters ?
                <>
                <DesktopDatePicker
                    minDate={new Date(month.getFullYear(), month.getMonth(), 1)}
                    maxDate={new Date(month.getFullYear(), month.getMonth()+1, 0)}
                    label="Start date"
                    value={logStartDate}
                    inputFormat="dd.MM.yyyy"
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
                <DesktopDatePicker
                    minDate={new Date(month.getFullYear(), month.getMonth(), 1)}
                    maxDate={new Date(month.getFullYear(), month.getMonth()+1, 0)}
                    label="End date"
                    value={logEndDate}
                    inputFormat="dd.MM.yyyy"
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
                <Autocomplete
                    disablePortal
                    onChange={handleChangeAddedBy}
                    id="combo-box-demo"
                    options={usersList}
                    sx={{ width: 500 }}
                    getOptionLabel={(option) => option?.firstname_lastname}
                    renderInput={(params) => <TextField {...params} label="Added by" />} />
                <Autocomplete
                    disablePortal
                    onChange={handleChangeTimeType}
                    id="combo-box-demo"
                    options={logTypes}
                    sx={{ width: 500 }}
                    getOptionLabel={(option) => option?.timetype_text}
                    renderInput={(params) => <TextField {...params} label="Time type" />} />
                <Autocomplete
                    disablePortal
                    onChange={handleChangeStatus}
                    id="combo-box-demo"
                    options={statusTypes}
                    sx={{ width: 500 }}
                    getOptionLabel={(option) => option?.status_text}
                    renderInput={(params) => <TextField {...params} label="Status" />} />
                </> : <></>
                }
            </>) : (<></>)}
            {items.filter((item) => {
                if ((filters?.added_by ? item?.added_by == filters?.added_by : true)
                && (filters?.added_for ? item?.id == filters?.added_for : true)
                && (filters?.time_type ? item?.timetype_id == filters?.time_type : true)
                && (filters?.status ? item?.status == filters?.status : true)
                && (filters?.startDate ? new Date(item?.date) >= new Date(filters?.startDate) : true)
                && (filters?.endDate ? new Date(item?.date) <= new Date(filters?.endDate) : true)) {
                    return item;
                }
            }).sort(function (a, b) {
                return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
            }).map((i, index) => (
                <ListItem
                    sx={{ margin: '10px 0', backgroundColor: 'rgb(50, 0, 100)', padding: 2, borderRadius: 1, display: 'flex', flexDirection: 'row' }}
                    key={index}
                    disableGutters
                    secondaryAction={
                        <Stack spacing={2} sx={{ paddingRight: 2}}>
                            <Button onClick={() => {
                                onClick(i?.uid, 2, description, setDescription(''));
                            }} color="custom" variant="outlined">
                                Accept
                            </Button>
                            <Button onClick={() => {
                                onClick(i?.uid, 3, description, setDescription(''));
                            }} sx={{ color: '#f25c66', border:"1px solid #f25c66" }} color="custom" variant="outlined">
                                Decline
                            </Button>
                            <Button
                                onClick={() => i?.uid ? showRecHistoryClick(i?.uid) : null}
                                sx={{ color: '#56DFF5', borderBottom:"1px solid #56DFF5"}} color="custom" >
                                History
                            </Button>
                        </Stack>
                    } >
                    <Stack sx={{ color: 'white' }}>
                        {/* Надо будет переделать реагирование на статусы, потому что сейчас приходит 3 и 1, а может быть будет еще другой. Можно вынести в функцию */}
                        <ListItemText primary={i?.status === "1" ? 'New!' : 'Deleted'} sx={{ color: i?.status === "1" ? '#23e9b4' : '#f25c66' }} />
                        <ListItemText primary={`Added by: ${i?.added_by !== "Fingerprint" ? users.find(user => user?.user_id === i?.added_by)?.firstname_lastname : "Fingerprint"}`} />
                        <ListItemText primary={`Added for: ${users.find(user => user?.user_id === i?.id)?.firstname_lastname}`} />
                        <ListItemText primary={`Type: ${i?.timetype_id !== "0" ? timeTypes.find(type => type?.id === i?.timetype_id)?.timetype_text : "Time"}`} />
                        <ListItemText primary={`Date: ${i?.date}, time: ${i?.time}`} />
                        <ListItemText primary={`Created: ${i?.create_time}`} />
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Description"
                            style={{ minWidth: 250, maxWidth: 250, minHeight: 60, maxHeight: 60, marginTop: 10 }}
                            onChange={onChangeDescription}
                        />
                    </Stack>
                </ListItem>
            ))}
            </Stack>
        </List>
    );
};

export default UsersList;