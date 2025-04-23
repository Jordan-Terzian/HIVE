import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, Grid } from '@mui/material';

// Time Picker Component
const TimePickerComponent = ({ startLabel = "Start Time", endLabel = "End Time", startTime, endTime, onChangeStart, onChangeEnd }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        {/* Start time */}
                        <TimePicker
                            label={startLabel}
                            value={startTime}
                            onChange={onChangeStart}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        {/* End time */}
                        <TimePicker
                            label={endLabel}
                            value={endTime}
                            onChange={onChangeEnd}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default TimePickerComponent;

