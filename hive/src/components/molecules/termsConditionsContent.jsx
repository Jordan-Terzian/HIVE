import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from "../atoms/customButton";
import { useNavigate } from 'react-router-dom';

const TermsConditionsContent = () => {
    const navigate = useNavigate();
    return (
        <Box
        width="1000px"
        minheight="600px"
        border="1px solid #E0E0E0"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        margin="50px"
        p="8px"
        bgcolor={"white"}
        boxShadow={1}
        >
            <Box>
                <Box maxWidth="100%" marginBottom="20px" display="flex" justifyContent="center">
                    <Typography variant="h4" color='black' marginBottom="10px" marginTop="10px" fontWeight={'bold'}>Hive Terms and Conditions</Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h8" color='black' marginBottom="10px" marginTop="10px">
                    Welcome to Hive Tutoring, a digital platform dedicated to facilitating educational 
                    connections between students and professionally qualified tutors. Your access to 
                    and use of our services is expressly conditioned on your compliance with and 
                    acceptance of the terms and conditions herein, along with our Privacy Policy.
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h7" color='black' marginTop="10px" marginBottom="10px" fontWeight={'bold'} >
                    Conditions of Use
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h8" color='black' marginBottom="10px" marginTop="10px" >
                    In utilizing our services, you are obligated to register and maintain an account. 
                    It is your responsibility to provide and maintain information that is accurate, 
                    complete, and current. Failure to do so constitutes a breach of these terms, 
                    which may result in immediate termination of your account.
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h7" color='black' marginTop="10px" marginBottom="10px" fontWeight={'bold'}>
                    Financial Terms
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h8" color='black' marginBottom="10px" marginTop="10px" >
                    Our services are rendered on a [hourly/session/prepaid] financial basis. Full 
                    payment is required at the time of booking. Our detailed refund and cancellation 
                    policies.
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h7" color='black' marginTop="10px" marginBottom="10px" fontWeight={'bold'}>
                    Account Termination
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h8" color='black' marginBottom="10px" marginTop="10px" >
                    Our services are rendered on a [hourly/session/prepaid] financial basis. Full payment 
                    is required at the time of booking. Our detailed refund and cancellation policies.
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h7" color='black' marginTop="10px" marginBottom="10px" fontWeight={'bold'}>
                    Inquiries
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h8" color='black' marginBottom="10px" marginTop="10px" >
                    Should you have any questions regarding these Terms of Service, please contact us.
                    </Typography>
                </Box>

                <Box maxWidth="100%" marginBottom="20px">
                    <Typography variant="h8" color='black' marginBottom="10px" marginTop="10px" >
                    Your access and use of Hive Tutoring signify your explicit understanding of, and agreement to, 
                    these Terms of Service.
                    </Typography>
                </Box>

                {/* Return to Dashboard */}
                <Box display="flex" flexDirection="row" gap="40px" justifyContent="center" alignItems="center">
                    <CustomButton label="Dashboard" width="122px" height="50px" fontSize={15} onPress={() => { navigate('/home/tutor-dashboard') }}/>
                </Box>   
            </Box>
        </Box>
    );
};

export default TermsConditionsContent;
