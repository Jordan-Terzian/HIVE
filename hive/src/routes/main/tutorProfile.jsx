import React, { useState, useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import { useLocation } from 'react-router-dom';
import TutorProfileCard from "../../components/molecules/tutorProfileCard";
import GetTutorProfile from "../../API/getTutorProfile";

const TutorProfile = () => {
    const { user } = useUser();
    const location = useLocation();

    // Extract the 'tab' query parameter from the location search string
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');

    const [isAppointmentFormVisible, setIsAppointmentFormVisible] = useState(false);
    const [isReportFormVisible, setIsReportFormVisible] = useState(false);
    const [tutorProfile, setTutorProfile] = useState(null);

    // Extract the tutor id from the URL pathname
    const tutorId = location.pathname.split('/').pop();

    // Fetch tutor profile
    useEffect(() => {
        async function fetchTutorProfile() {
            try {
                const profile = await GetTutorProfile(tutorId);
                setTutorProfile(profile);
            } catch (error) {
                console.error('Failed to fetch tutor profile:', error);
            }
        }

        fetchTutorProfile();
    }, [tutorId]);


    return (
        <Box display="grid" gridTemplateColumns="240px auto" height="100vh">
            {isAppointmentFormVisible && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100vw"
                    height="100vh"
                    bgcolor="rgba(0, 0, 0, 0.5)"
                    zIndex={999}
                ></Box>
            )}
            {isReportFormVisible && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100vw"
                    height="100vh"
                    bgcolor="rgba(0, 0, 0, 0.5)"
                    zIndex={999}
                ></Box>
            )}
            <NavBar activeItem={tab} user={user} />

            <Box display="flex" justifyContent="center" alignItems="center" overflow="auto">
                <TutorProfileCard
                    onShowAppointmentForm={() => setIsAppointmentFormVisible(true)}
                    onHideAppointmentForm={() => setIsAppointmentFormVisible(false)}
                    isAppointmentFormVisible={isAppointmentFormVisible}
                    onShowReportForm={() => setIsReportFormVisible(true)}
                    onHideReportForm={() => setIsReportFormVisible(false)}
                    isReportFormVisible={isReportFormVisible}
                    tutorProfile={tutorProfile}
                    user={user}
                    tab = {tab}
                />
            </Box>

        </Box>
    );
};

export default TutorProfile;
