import React, { useState } from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';


// Qualified Subjects Picker Component
const QualifiedSubjectsPicker = ({ setSelectedSubjects, selectedSubjects, courseOptions = []}) => {


    const handleInputChange = (inputValue) => {
        if (setSelectedSubjects) {
            setSelectedSubjects(inputValue);
        }
    };

    return (
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <Select
                isClearable
                options={courseOptions}
                value={selectedSubjects}
                onChange={handleInputChange}
                placeholder="Select a subject..."
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default QualifiedSubjectsPicker;
