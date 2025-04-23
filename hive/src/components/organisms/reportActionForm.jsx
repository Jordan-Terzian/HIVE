import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../atoms/customButton';
import { useNavigate } from 'react-router-dom';
import SuspendBanPicker from '../molecules/suspendBanPicker';
import SuspendUser from '../../API/suspendUser';
import BanUser from '../../API/banUser';

const ReportActionForm = ({ onHideActionForm, offender }) => {

    const navigate = useNavigate();

    const [explanation, setExplanation] = useState("");
    const [selectedPunishment, setSelectedPunishment] = useState(null);

    const handleSubmit = async () => {

        if (!explanation || !selectedPunishment) {
            alert('Please fill in all fields');
            return;
        }
        if (selectedPunishment.value === 'Suspend') {
            try {
                await SuspendUser(offender.id, explanation);
                onHideActionForm();

                const subject = encodeURIComponent("You have been suspended from Hive for 2 weeks");
                const body = encodeURIComponent(explanation);
                const email = offender.email;

                // Open the mail client first
                const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;


            } catch (error) {
                console.error('Failed to suspend user:', error);
            }

        } else {
            try {
                await BanUser(offender.id, explanation);
                onHideActionForm();

                const subject = encodeURIComponent("You have been banned from Hive");
                const body = encodeURIComponent(explanation);
                const email = offender.email;

                // Open the mail client
                const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;

            } catch (error) {
                console.error('Failed to ban user:', error);
            }
        }

    };


    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%" onClick={(e) => e.stopPropagation()}>

            <SuspendBanPicker selectedPunishment={selectedPunishment} setSelectedPunishment={setSelectedPunishment} />
            <TextField
                label="Reason For Action"
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

export default ReportActionForm;
