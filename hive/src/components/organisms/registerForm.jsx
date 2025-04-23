import React, { useState } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import CustomButton from '../atoms/customButton';
import CustomRadioButton from '../atoms/customRadio';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, FormControlLabel } from '@mui/material';

const RegisterForm = ({ showMainTitle = false, ...props }) => {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handlePress = () => {
        if (!selectedValue) {
            alert('Please select a role');
            return;
        }
        if (props.onPress) {
            props.onPress();
        } else {
            // For register usage only
            navigate('/register/personal-details', { state: { selectedValue } });
        }
    }

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="20%">
            <Box display="flex" flexDirection="column" justifyContent="center">
                {showMainTitle &&
                    <Typography variant="h4" align="center" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                        Register as
                    </Typography>
                }

                <RadioGroup
                    column ="true"
                    onChange={handleChange}
                    value={selectedValue}
                >
                    <FormControlLabel
                        value="Student"
                        control={
                            <CustomRadioButton
                                label="Student"
                                selectedValue={selectedValue}
                                onChange={handleChange}
                            />
                        }
                        label=""
                        labelPlacement="bottom"
                    />
                    <FormControlLabel
                        value="Tutor"
                        control={
                            <CustomRadioButton
                                label="Tutor"
                                selectedValue={selectedValue}
                                onChange={handleChange}
                            />
                        }
                        label=""
                        labelPlacement="bottom"
                    />
                </RadioGroup>

                <Box display="flex" justifyContent="center">
                    <CustomButton
                        label={props.label}
                        onPress={handlePress}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterForm;
