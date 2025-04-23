import React, { useState, useEffect } from "react";
import NavBar from "../../components/molecules/navBar";
import { Box } from "@mui/material";
import { useUser } from "../../contexts/userContext";
import { useLocation } from 'react-router-dom';
import StudentProfileCard from "../../components/molecules/studentProfileCard";
import GetStudentProfile from "../../API/getStudentProfile";

const StudentProfile = ( ) => {
    const { user } = useUser();
    const location = useLocation();

    // Extract the query parameter from the location search string
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const data = JSON.parse(decodeURIComponent(queryParams.get('data')));
    const tab = queryParams.get('tab');

    let activeItem;

    if (tab != null) {
        activeItem = tab;
    } else {
        activeItem = "Dashboard";
    }

    const [isReportFormVisible, setIsReportFormVisible] = useState(false);
    const [studentProfile, setStudentProfile] = useState(null);

    // Extract the student id from the URL pathname
    const studentId = location.pathname.split('/').pop();

    // Fetch student profile
    useEffect(() => {
        async function fetchStudentProfile() {
            try {
                const profile = await GetStudentProfile(studentId);
                setStudentProfile(profile);
            } catch (error) {
                console.error('Failed to fetch student profile:', error);
            }
        }

        fetchStudentProfile();
    }, [studentId]);

    return (
        <Box display="grid" gridTemplateColumns="240px auto" height="100vh" gap="20px">
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
            <NavBar activeItem={activeItem} user={user} />

            <Box display="flex" justifyContent="center" alignItems="center" overflow="auto">
                <StudentProfileCard
                    onShowReportForm={() => setIsReportFormVisible(true)}
                    onHideReportForm={() => setIsReportFormVisible(false)}
                    isReportFormVisible={isReportFormVisible}
                    studentProfile={studentProfile}
                    data={data}
                    user={user}
                />
            </Box>

        </Box>
    );
};

export default StudentProfile;
