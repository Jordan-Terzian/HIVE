import React from "react";
import NavBar from "../../components/molecules/navBar";
import { Box } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import { useLocation } from 'react-router-dom';
import ReportDetailsCard from "../../components/molecules/reportDetailsCard";
import { Navigate } from 'react-router-dom';

const ReportDetails = () => {
    const { user } = useUser();
    const location = useLocation();

    const { state } = useLocation();

    const report = state?.report;

    // Extract the 'tab' query parameter from the location search string
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');

    const reportId = location.pathname.split('/').pop();

    if (localStorage.getItem('role') !== 'Admin') {
        return <Navigate to="/error" />;
    }

    return (
        <Box display="grid" gridTemplateColumns="240px auto" height="100vh" gap="20px">
            <NavBar activeItem={tab} user={user} />

            <Box display="flex" justifyContent="center" alignItems="center" overflow="auto">
                <ReportDetailsCard report={report}/>
            </Box>

        </Box>
    );
};

export default ReportDetails;
