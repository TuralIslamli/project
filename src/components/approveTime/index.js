import React, { useEffect, useState } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Stack, TextField } from "@mui/material";
import MainButton from '../mainButton';
import { useDispatch, useSelector } from 'react-redux';
import { setApproveDeclineTime, setGetTimes } from '../../modules/saga/approveTime/action';
import { getApproveTimeList, getDate, getIsLoadingApproveTime } from '../../modules/redux/approveTime/selectors';
import Lottie from 'react-lottie';
import buttonLoading from '../../assets/lottieAnimation/buttonLoading.json';
import { setApproveTimeList, setDate } from '../../modules/redux/approveTime/actions';
import UsersList from './components';
import { getUserList } from '../../modules/redux/userInfo/selectors';
import { getTimeType } from '../../modules/redux/applicationInfo/selectors';
import { setRefresh } from '../../modules/redux/dashboard/action';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buttonLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const ApproveTimeForm = () => {
    const dispatch = useDispatch();
    const approveTimeList = useSelector(getApproveTimeList);
    const timeTypes = useSelector(getTimeType);
    const isLoading = useSelector(getIsLoadingApproveTime);
    const lottieLoading = <Lottie width={50} height={50} options={defaultOptions} />;
    const usersList = useSelector(getUserList);
    const date = useSelector(getDate);
    const onPressBtn = (uid, status, description) => {
        dispatch(setApproveDeclineTime({ uid, status, description }));
        dispatch(setRefresh(true));
    };

    useEffect(() => {
        return () => {
            dispatch(setApproveTimeList([]));
        };
    }, []);

    const handleChangeDate = (newValue) => {
        dispatch(setDate(newValue));
    };

    const handleGetDate = () => {
        dispatch(setGetTimes());
    };

    return(
            <div style={{display: 'flex', margin: 50, flexDirection: 'column', width: 500}}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        views={['month', 'year']}
                        label="Date"
                        value={date}
                        mask="__.____"
                        inputFormat="MM.yyyy"
                        maxDate={new Date()}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />} />
                    <MainButton
                        disabled={isLoading}
                        label={isLoading ? lottieLoading : 'Submit'}
                        onClick={handleGetDate} />
                </Stack>
                <UsersList month={date} items={approveTimeList} users={usersList} timeTypes ={timeTypes} onClick={onPressBtn} />
            </div>
    );
};

export default ApproveTimeForm;