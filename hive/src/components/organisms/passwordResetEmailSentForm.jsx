import React, { useState } from 'react';
import { Box, TextField, Typography, Grid, Divider } from '@mui/material';
import CustomButton from '../atoms/customButton';
import PasswordField from "../../components/molecules/passwordField";
import { Link, useNavigate } from 'react-router-dom';
import PasswordResetEmailConfirm from '../../API/passwordResetEmailConfirm';

const PasswordResetEmailSentForm = ({ }) => {
    const navigate = useNavigate();

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="50vw" 
        display="flex" flexDirection="column" p="20px" gap="20px">
            <Box>
                <Typography variant="h4" align="center" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                    Reset Password Email Sent
                </Typography>
            </Box>

            <Divider orientation="horizontal" />

            <Box>
                <Typography variant="h6" align="left" style={{ marginTop: "10px", marginBottom: '20px', fontWeight: 'bold' }}>
                    The email you have entered exists in our system and a link to reset your
                    password has been sent to the corresponding email. Please press the link
                    and reset your password in privacy
                </Typography>
            </Box>

            <Divider orientation="horizontal" />

            <Box display="flex" flexDirection="row" gap="20px" justifyContent="center" alignItems="center">
                <CustomButton
                    label="Return to Home >"
                    onPress={() => { navigate('/') }}
                />
            </Box>
        </Box>
    );
}

export default PasswordResetEmailSentForm;