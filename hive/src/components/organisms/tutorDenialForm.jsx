import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../atoms/customButton';
import UpdateTutorStatus from '../../API/updateTutorStatus';
import { useNavigate } from 'react-router-dom';

const TutorDenialForm = ({ onHideDenialForm, tutor }) => {

    const navigate = useNavigate();

    const [explanation, setExplanation] = useState("");

    const handleSubmit = async () => {
        if (!explanation) {
            alert('Please fill in Explanation Field');
            return;
        }
        try {
            // Prepare email functionality
            const subject = encodeURIComponent("Hive Tutor Application Denial");
            const body = encodeURIComponent(explanation);
            const email = tutor.email;
    
            // Open the mail client first
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
    
            // Then send the update request
            const data = await UpdateTutorStatus(tutor?.id, false);
            // Perform actions based on the successful response
    
            onHideDenialForm(); // Hide the denial form
            navigate('/tutor-approval-dashboard'); 
        } catch (error) {
            console.error('Error in updating tutor status:', error);
        }
    };
    

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%" onClick={(e) => e.stopPropagation()}>

            <Typography variant="h4" align="center" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                Reason for tutor denial
            </Typography>


            <TextField
                label="Denial Explanation"
                multiline
                rows={4}
                fullWidth
                defaultValue={explanation}
                onChange={(e) => setExplanation(e.target.value)}
            />

            <Box display="flex" justifyContent="center" marginTop="16px">
                <CustomButton
                    label={"Submit"}
                    onPress={handleSubmit}
                />
            </Box>
        </Box>
    );
};

export default TutorDenialForm;
