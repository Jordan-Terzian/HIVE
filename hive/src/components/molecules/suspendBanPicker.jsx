import React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

// Suspend/Ban Picker Component
const SuspendBanPicker = ({ selectedPunishment,  setSelectedPunishment }) => {
    const actionOptions = [
        { label: 'Suspend', value: 'Suspend' },
        { label: 'Ban', value: 'Ban' },
    ];

    const handleInputChange = (inputValue) => {
        if (setSelectedPunishment) {
            setSelectedPunishment(inputValue);
        }
    };

    return (
        <FormControl fullWidth style={{ marginBottom: '16px', zIndex: 2}}>
            <Select
                isClearable
                options={actionOptions}
                value={selectedPunishment}
                onChange={handleInputChange}
                placeholder="Suspend/Ban"
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default SuspendBanPicker;
