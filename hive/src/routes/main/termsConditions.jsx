import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TermsConditionsContent from '../../components/molecules/termsConditionsContent';

const TermsConditions = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" overflow="auto">
            <TermsConditionsContent />
        </Box>
    );
};

export default TermsConditions;
