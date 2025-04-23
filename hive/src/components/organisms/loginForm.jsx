import React, { useState, useContext } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../atoms/customButton';
import PasswordField from "../../components/molecules/passwordField";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import Login from '../../API/loginRequest';

const LoginForm = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState('')
    const { fetchUser } = useUser();

    return (
        <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            flexDirection="column"
            backgroundColor='white'
            width="30%"
            sx={{
                position: 'relative',
                padding: '20px',
                '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '25%',
                    backgroundColor: 'white',
                    left: 0,
                },
                '&::before': {
                    top: '-25%',
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                },
                '&::after': {
                    bottom: '-25%',
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                },
            }}
        >
            <Typography variant="h2" sx={{ marginBottom: '16px', fontWeight: 'bold', display: "flex", justifyContent: "center", fontSize: '90px' }}>
                HIVE
            </Typography>

            <Box sx={{ marginBottom: '5px', paddingLeft: '50px', paddingRight: '50px' }}>
                <TextField label="Enter Email or Phone" fullWidth onChange={(e) => setCredentials(e.target.value)}/>
                <PasswordField label="Enter Password" onPasswordChange={setPassword} password={password}/>
            </Box>

            <Box display="flex" justifyContent="flex-end" sx={{ marginTop: '8px', paddingRight: '50px', marginBottom: '16px' }}>
                <Link to="/password-reset-confirm-email" style={{ color: '#F79515' }}>Forgot Password?</Link>
            </Box>

            <Box display="flex" justifyContent="center">
                <CustomButton label="Log In" onPress={() => { Login(credentials, password, navigate, fetchUser)}} />
            </Box>

            <Box display="flex" justifyContent="center" sx={{ marginTop: '16px' }}>
                Don't have an account?&nbsp;
                <Link to="/register" style={{ color: '#F79515' }}>Register</Link>
            </Box>
        </Box>
    );
};

export default LoginForm;
