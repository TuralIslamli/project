import MainButton from '../mainButton';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Stack, TextField } from "@mui/material";
import { setGenerateWeeks } from '../../modules/saga/generateTimesheet/actions';


const GenerateYear = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());

    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };

    const handleGenerateWeeks = () => {
        dispatch(setGenerateWeeks(date));
    };

    return (
        <div style={{ display: 'flex', margin: 50, flexDirection: 'column', width: 500 }}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    views={['year']}
                    label="Date"
                    value={date}
                    mask="____"
                    inputFormat="yyyy"
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />} />
                <MainButton label="Generate year" onClick={handleGenerateWeeks} />
            </Stack>
        </div>
    );
};

export default GenerateYear;