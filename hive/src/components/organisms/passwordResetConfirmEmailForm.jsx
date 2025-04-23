import React, { useState } from 'react';
import { Box, TextField, Typography, Grid, Divider } from '@mui/material';
import CustomButton from '../atoms/customButton';
import PasswordField from "../../components/molecules/passwordField";
import { Link, useNavigate } from 'react-router-dom';
import PasswordResetEmailConfirm from '../../API/passwordResetEmailConfirm';

const PasswordResetConfirmEmailForm = ({ }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState('')

    const handlePress = async () => {
        try {
            const resetData = await PasswordResetEmailConfirm(credentials);
            navigate('/password-reset-email-sent')
        } catch (error) {
            console.error('Error finding email:', error);
        }
    };

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="50vw" 
        display="flex" flexDirection="column" p="20px" gap="20px">
            <Box>
                <Typography variant="h4" align="center" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                    Find Your Account
                </Typography>
            </Box>

            <Divider orientation="horizontal" />

            <Box>
                <Typography variant="h6" align="left" style={{ marginTop: "10px", marginBottom: '20px', fontWeight: 'bold' }}>
                    Please enter your email to find your account.
                </Typography>

                <Box align="left" marginBottom="10px">
                    <TextField label="Enter Email" fullWidth onChange={(e) => setCredentials(e.target.value)}/>
                </Box>
            </Box>

            <Divider orientation="horizontal" />

            <Box display="flex" flexDirection="row" gap="20px" justifyContent="center" alignItems="center">
                <CustomButton
                    label="Cancel"
                    background="linear-gradient(45deg, #8B8B8B 30%, #8B8B8B 90%)"
                    onPress={() => { navigate('/') }}
                />
                <CustomButton
                    label="Search"
                    onPress={handlePress}
                />
            </Box>
        </Box>
    );
}

export default PasswordResetConfirmEmailForm;