import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({ label, onPasswordChange, password }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handlePasswordChange = (event) => {
        onPasswordChange(event.target.value);  // Call the passed function with the new value.
    };

    return (
        <TextField
            label={label}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            style={{ marginTop: '16px' }}
            value={password}  // Control the component with the passed value.
            onChange={handlePasswordChange}  // Update the state when the input changes.
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordField;
