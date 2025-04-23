import React from 'react';
import { Box, Typography } from '@mui/material';

// Component to show the subject label in the appointment list and user profiles for selected subjects

const SubjectLabel = ({ text }) => {
    return (
        <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px="10px"
            py="4px"
            borderRadius="50px"
            sx={{
                background: 'linear-gradient(45deg, #FFC52A 0%, #9747FF 100%)',
            }}
        >
            <Typography variant="body1" color="white" fontSize={12} fontWeight={'bold'}>
                {text}
            </Typography>
        </Box>
    );
};

export default SubjectLabel;
