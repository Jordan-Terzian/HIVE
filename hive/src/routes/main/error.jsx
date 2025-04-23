import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ErrorNotification from '../../components/molecules/errorNotificaton';

const Error = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" overflow="auto">
            <ErrorNotification />
        </Box>
    );
};

export default Error;
