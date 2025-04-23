import React from 'react';
import { FormControl } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from 'date-fns/locale';


// Component to show a date picker
const DatePicker = ({ label, value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
            <FormControl fullWidth>
                <MobileDatePicker
                    style={{ width: '100%' }}
                    label={label}
                    inputFormat="dd/MM/YYYY"
                    value={value}
                    onChange={onChange}
                />
            </FormControl>
        </LocalizationProvider>
    );
};

export default DatePicker;
