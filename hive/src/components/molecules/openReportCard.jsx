import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Rating } from "@mui/material";
import CustomButton from "../atoms/customButton";
import FetchReportMembers from "../../API/fetchReportMembers";
import { useNavigate } from "react-router-dom";

const OpenReportCard = ({ type, report }) => {

    const navigate = useNavigate();

    const [reporter, setReporter] = useState(null);
    const [reportee, setReportee] = useState(null);

    // Fetch profile data on first load
    useEffect(() => {
        if (report?.reporter) {
            FetchReportMembers(report.reporter).then(data => setReporter(data)).catch(error => console.error(error));
        }
        
        if (report?.reportee) {
            FetchReportMembers(report.reportee).then(data => setReportee(data)).catch(error => console.error(error));
        }
    }, [report]);

    return (
        <Box
            width="200px"
            minHeight="160px"
            border="1px solid #E0E0E0"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            p="8px"
            gap="1px"
            bgcolor={"white"}
            boxShadow={1}
        >
            {/* Report Case, and number */}
            <Box display="flex" alignItems="center" marginBottom="8px">
                <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1">{report?.reason}</Typography>
                    <Typography variant="body2" color="textSecondary">#{report?.id}</Typography>
                </Box>
            </Box>

            <Divider orientation="horizontal" />

            {/* Reporter and accused */}
            <Box flex="1" mt="8px">
                <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px" marginTop="5px">
                    <strong style={{ marginRight: '4px' }}>Reporter:</strong>{reporter?.first_name} {reporter?.last_name}
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px">
                    <strong style={{ marginRight: '4px' }}>Accused:</strong>{reportee?.first_name} {reportee?.last_name}
                </Typography>
            </Box>

            {/* Button */}
            <Box display="flex" flexDirection="row" gap="8px" justifyContent="center" alignItems="center">
                <CustomButton label="View Report" width="90px" height="30px" fontSize={12} onPress={() => navigate(`/report-details/${report?.id}?tab=Reports`, { state: { report }})}/>
            </Box>
        </Box>
    );
};

export default OpenReportCard;
