import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Divider, Link } from '@mui/material';

import FetchReportMembers from '../../API/fetchReportMembers';
import YourUploadedFilesSection from './yourUploadedFiles';
import CustomButton from '../atoms/customButton';
import { useNavigate } from 'react-router-dom';
import DeleteReport from '../../API/deleteReport';

const ReportDetailsCard = ({ ...props }) => {

    const navigate = useNavigate();
    const [reporter, setReporter] = useState(null);
    const [reportee, setReportee] = useState(null);

    console.log(props.report)

    // Fetch profile data on first load
    useEffect(() => {
        if (props.report?.reporter) {
            FetchReportMembers(props.report?.reporter).then(data => setReporter(data)).catch(error => console.error(error));
        }

        if (props.report?.reportee) {
            FetchReportMembers(props.report?.reportee).then(data => setReportee(data)).catch(error => console.error(error));
        }
    }, [props.report]);

    // Navigate to profile page of reporter
    const handleReporter = () => {
        if (reporter?.role === 'Tutor') {
            navigate(`/profile/tutor/${reporter?.id}?tab=Reports`)
        } else {
            navigate(`/profile/student/${reporter?.id}?tab=Reports`)
        }
    }

    // Navigate to profile page of reportee
    const handleReportee = () => {
        if (reportee?.role === 'Tutor') {
            navigate(`/profile/tutor/${reportee?.id}?tab=Reports`)
        } else {
            navigate(`/profile/student/${reportee?.id}?tab=Reports`)
        }
    }

    // Mark report as resolved
    const handleMarkAsResolved = async () => {
        try {
            const status = await DeleteReport(props.report?.id);
            navigate("/report-dashboard")
        } catch (error) {
            console.error('Failed to mark report as resolved:', error);
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'white',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minWidth: '95%',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h4" component="div">
                {props.report?.reason}
            </Typography>
            <Typography variant="body1" component="div">
                <strong>Case Number:</strong> {props.report?.id}
            </Typography>
            <Typography variant="body1" component="div">
                <strong>Reporter: </strong>
                <Link component="button" variant="body1" onClick={handleReporter}>
                    {reporter?.first_name} {reporter?.last_name}
                </Link>
            </Typography>
            <Typography variant="body1" component="div">
                <strong>Accused: </strong>
                <Link component="button" variant="body1" onClick={handleReportee}>
                    {reportee?.first_name} {reportee?.last_name}
                </Link>
            </Typography>

            <Divider sx={{ width: '100%'}} />

            <Typography variant="h6" component="div">
                <strong>Explanation</strong>
            </Typography>
            <TextField
                id="explanation-input"
                multiline
                rows={4}
                defaultValue={props.report?.explanation}
                variant="outlined"
                fullWidth
                disabled
                InputProps={{
                    sx: {
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'black !important', // Overrides text color in Safari
                        color: 'black !important', // Overrides text color in other browsers
                      },
                    },
                  }}

            />
            <Typography variant="h6" component="div">
                <strong>Supporting Documents</strong>
            </Typography>

            <YourUploadedFilesSection existingFiles={props.report?.report_documents} />
            <Box display="flex" justifyContent={"center"}>
                <CustomButton
                    label="Mark as resolved"
                    fontSize={22}
                    height="40px"
                    onPress={handleMarkAsResolved}
                />
            </Box>

        </Box>


    );
};

export default ReportDetailsCard;
