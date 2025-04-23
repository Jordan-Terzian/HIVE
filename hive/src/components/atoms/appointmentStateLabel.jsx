import React from 'react';
import { Box, Typography } from '@mui/material';

// Component to show the appointment state of pending or declined in the appointment list

const AppointmentStateLabel = ({ text, color }) => {
    return (
        <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px="20px"
            py="4px"
            borderRadius="10px"
            bgcolor={color}

        >
            <Typography variant="body1" color="white">
                {text}
            </Typography>
        </Box>
    );
};

export default AppointmentStateLabel;
