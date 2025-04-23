import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../atoms/customButton';
import ReportReasonPicker from '../molecules/reportReasonPicker';
import CreateReport from '../../API/createReport';

import FileUploader from '../molecules/fileUploader';

const ReportForm = ({ reporter, reportee, onHideReportForm }) => {

    const [explanation, setExplanation] = useState("");
    const [selectedReason, setSelectedReason] = useState(null);
    const [files, setFiles] = useState([]);

    const handleSubmit = async () => {
        if (!selectedReason || !selectedReason.value) {
            alert('Please fill in Reason and Explanation Fields');
            return;
        }
        try {
            await CreateReport(reporter, reportee, selectedReason.value, explanation, files); 
            onHideReportForm(); 
        } catch (error) {
            console.error('Failed to submit report:', error);
        }
    };

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%" onClick={(e) => e.stopPropagation()}>

            <ReportReasonPicker selectedReason={selectedReason} setSelectedReason={setSelectedReason}/>

            <FileUploader files={files} setFiles={setFiles} report={true} />

            <TextField
                label="Explanation"
                multiline
                rows={4}
                fullWidth
                defaultValue={explanation}
                onChange={(e) => setExplanation(e.target.value)}
            />

            <Box display="flex" justifyContent="center" marginTop="16px">
                <CustomButton
                    label={"Submit Report"}
                    onPress={handleSubmit}
                />
            </Box>
        </Box>
    );
};

export default ReportForm;
