import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from '../atoms/customButton';
import PasswordField from "../../components/molecules/passwordField";
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordReset from '../../API/passwordReset';


const PasswordResetForm = ({ }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const queryParams = new URLSearchParams(location.search);
    const uid = queryParams.get('uid');
    const token = queryParams.get('token');

    const handlePress = async () => {
        if (password === confirmPassword) {
            const response = await PasswordReset(token, uid, password, confirmPassword)
            console.log("Response: ", response)
            alert("Your password has successfully changed! Please go back to the previous tab and login");
        } else {
            alert("Passwords don't match");
        }
    }

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%">
            <Typography variant="h4" align="center" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                Reset Password
            </Typography>
                <PasswordField label="Password" onPasswordChange={setPassword} password={password} />
                <PasswordField label="Confirm Password" onPasswordChange={setConfirmPassword} password={confirmPassword} />
            <Box display="flex" justifyContent="center" marginTop="16px">
                <CustomButton
                    label="Reset Password"
                    onPress={handlePress}
                />
            </Box>
        </Box>
    );
}

export default PasswordResetForm;