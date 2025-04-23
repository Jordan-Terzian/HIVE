import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from "../atoms/customButton";
import { useNavigate } from 'react-router-dom';
import Icon from "@mdi/react";
import {
    mdiEmoticonSadOutline
} from "@mdi/js";

// Content displayed on our 404 error page 
const ErrorNotification = () => {
    const navigate = useNavigate();
    return (
        <Box
        width="50vw"
        height="60vh"
        border="1px solid #E0E0E0"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="100px"
        p="30px"
        gap="10px"
        bgcolor={"white"}
        boxShadow={1}
        >
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography display="flex" alignItems="center" fontSize={150} color='black' marginTop="10px" fontWeight={'bold'}>
                        4 <Icon path={mdiEmoticonSadOutline} size={7} /> 4
                    </Typography>
                </Box>
                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h5" color='black' marginBottom="5px" marginTop="10px" fontWeight={'bold'}>PAGE NOT FOUND!</Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h6" color='black' marginBottom="30px">
                        Sorry, the page you are looking for cannot be found.
                    </Typography>
                </Box>

                {/* Return Home Button */}
                <Box display="flex" flexDirection="row" gap="40px" justifyContent="center" alignItems="center">
                    <CustomButton label="Back To Login >" width="250px" height="50px" fontSize={19} onPress={() => { navigate('/') }}/>
                </Box>   
            </Box>
        </Box>
    );
};

export default ErrorNotification;
