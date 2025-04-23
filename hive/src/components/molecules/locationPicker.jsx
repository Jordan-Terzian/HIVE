import React, { useState } from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

// Location Picker Component
const LocationPicker = ({ selectedLocation,  setSelectedLocation }) => {
    const locationOptions = [
        { label: 'Zoom', value: 'Zoom' },
        { label: 'Teams', value: 'Teams' },
        { label: 'My Address', value: 'My Address' }
    ];

    const handleInputChange = (inputValue) => {
        if (setSelectedLocation) {
            setSelectedLocation(inputValue);
        }
    };

    return (
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <Select
                isClearable
                options={locationOptions}
                value={selectedLocation}
                onChange={handleInputChange}
                placeholder="Select a Location/Platform"
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default LocationPicker;
