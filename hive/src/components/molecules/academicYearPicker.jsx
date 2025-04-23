// AcademicYearPicker.js
import React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';


// Data for the academic year picker
export const academicYearData = [
    'Kindergarten', 
    'Year 1', 
    'Year 2', 
    'Year 3',
    'Year 4',
    'Year 5',
    'Year 6',
    'Year 7',
    'Year 8',
    'Year 9',
    'Year 10',
    'Year 11',
    'Year 12', 
    'University', 
    'TAFE'
].map(year => ({ label: year, value: year }));


// Component to show the academic year picker 
const AcademicYearPicker = ({ academicYear, setAcademicYear }) => {
    return (
        <FormControl fullWidth>
            <Select
                value={academicYear}
                onChange={selectedOption => setAcademicYear(selectedOption)}
                options={academicYearData}
                placeholder="Year of Schooling"
                menuPortalTarget={document.body}
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default AcademicYearPicker;
