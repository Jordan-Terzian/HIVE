import React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

// Report Reason Picker Component
const ReportReasonPicker = ({ selectedReason, setSelectedReason }) => {
    const reasonOptions = [
        { label: 'Case of Harrassment', value: 'Case of Harrassment' },
        { label: 'Case of Inappropriate Content', value: 'Case of Inappropriate Content' },
        { label: 'Case of Spam', value: 'Case of Spam' },
        { label: 'Case of Impersonation ', value: 'Case of Impersonation' },
        { label: 'Case of Scamming', value: 'Case of Scamming' },
        { label: 'Case of Child Endangerment', value: 'Case of Child Endangerment' }
    ];
    
    const handleInputChange = (inputValue) => {
        setSelectedReason(inputValue);
    };

    return (
        <FormControl fullWidth style={{ marginBottom: '16px', zIndex: 2}}>
            <Select
                isClearable
                options={reasonOptions}
                value={selectedReason}
                onChange={handleInputChange}
                placeholder="Select Reason"
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default ReportReasonPicker;
