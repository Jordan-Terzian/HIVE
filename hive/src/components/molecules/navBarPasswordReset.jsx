import React, { useState } from 'react';
import { AppBar, Drawer, Box, TextField, Toolbar, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from '../../API/loginRequest';
import CustomButton from '../atoms/customButton';
import PasswordField from "../../components/molecules/passwordField";
import { useUser } from '../../contexts/userContext';

const NavBarPasswordReset = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState('');
    const { fetchUser } = useUser();
    
    return (
        <Drawer
            variant="permanent"
            anchor="top"
            PaperProps={{
                style: {
                    width: '100%',
                    backgroundColor: '#FFEFC2',
                    zIndex: 998
                },
                'data-testid': 'drawer-paper'
            }}
        >
            <AppBar position="sticky" elevation={0} style={{ backgroundColor: '#FFEFC2' }}>
                <Toolbar disableGutters style={{ justifyContent: 'space-between' }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/images/Logo.png" alt="Logo" style={{ height: '121px' }} />
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" gap="16px">
                        <TextField
                            label="Enter Email or Phone"
                            variant="outlined"
                            onChange={(e) => setCredentials(e.target.value)}
                        />
                        <PasswordField
                            label="Enter Password"
                            onPasswordChange={setPassword}
                            password={password}
                        />
                        <CustomButton
                            label="Log In"
                            variant="contained"
                            onClick={() => { Login(credentials, password, navigate, fetchUser) }}
                        >
                        </CustomButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Drawer>
    );
};

export default NavBarPasswordReset;