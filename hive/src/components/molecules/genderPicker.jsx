import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

// Gender picker component
const GenderPicker = ({ selectedGender, onGenderChange, otherGender, onOtherGenderChange }) => {
    const genderLabelStyle = {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '5px',
        marginRight: '18px',
        width: '124px',
        textAlign: 'center',
        marginLeft: '1px',
    };

    return (
        <FormControl component="fieldset" fullWidth style={{ marginBottom: '16px', alignItems: 'center' }}>
            <RadioGroup
                row
                name="gender"
                value={selectedGender}
                onChange={e => onGenderChange(e.target.value)}
            >
                <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    style={genderLabelStyle}
                />
                <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    style={genderLabelStyle}
                />
                <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                    style={{ ...genderLabelStyle, marginRight: '0px' }}
                />
            </RadioGroup>
            {/* If gender is other, open a text field for user to input their gender identity  */}
            {selectedGender === 'Other' && 
                <TextField 
                    label="Specify" 
                    fullWidth 
                    style={{ marginTop: '16px' }} 
                    onChange={e => onOtherGenderChange(e.target.value)} 
                    value={otherGender} 
                />
            }
        </FormControl>
    );
};

export default GenderPicker;
