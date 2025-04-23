import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from '@mui/material';
import CustomButton from '../atoms/customButton';
import ViewLabel from '../atoms/viewLabel';
import GetStudentProfile from "../../API/getStudentProfile";
import GetTutorProfile from "../../API/getTutorProfile";
import conversationCreate from "../../API/conversationCreate";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

const NotificationCard = ({ status, name, ...props }) => {
    const [isAppointmentFormVisible, setIsAppointmentFormVisible] = useState(false);
    const [profile, setProfile] = useState(null);
    const { user } = useUser();
    const navigate = useNavigate();

    // Fetch profile data on first load
    useEffect(() => {
        if (localStorage.getItem('role') === 'Tutor') {
            GetStudentProfile(name)
                .then(data => {
                    setProfile(data);
                });
        } else {
            GetTutorProfile(name)
                .then(data => {
                    setProfile(data);
                });
        }
    }, []);

    const handleAppointmentMessage = async (currentId, targetId) => {
        try {
            const createConversation = await conversationCreate(currentId, targetId);
            navigate(`/messages/${targetId}`, { state: { myParam: currentId } })
        } catch (error) {
            console.error('Error creating a conversation:', error);
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            padding="8px"
            gap="16px"
            width="80%"
            borderBottom="1px solid #B2A788"
        >
            {/* If appointment form is visible dim screen */}
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

            <img src={`http://127.0.0.1:8000/${profile?.profile_picture}`} alt="User profile" width="70" height="70" style={{ borderRadius: 50 }} />

            <Typography variant="body1" fontSize={18}>
                {getStatusMessage(status, profile)}
            </Typography>

            {/* Change whats displayed based on status */}
            {status === "active" && (
                <CustomButton label="Message" width="100px" height="30px" fontSize={18} onPress={() => handleAppointmentMessage(profile?.id, user?.id)} />
            )}

            {status === "pending" && localStorage.getItem('role') === 'Tutor' && (
                <ViewLabel
                    onShowAppointmentForm={() => setIsAppointmentFormVisible(true)}
                    onHideAppointmentForm={() => setIsAppointmentFormVisible(false)}
                    isAppointmentFormVisible={isAppointmentFormVisible}
                    appointment={props.appointment}
                    fetchAppointments={props.fetchAppointments}
                />
            )}
        </Box>
    );
};

// Get the status message based on the status
const getStatusMessage = (status, profile) => {
    const nameSegment = profile ? `${profile.first_name} ${profile.last_name}` : "Someone";

    switch (status) {
        case "active":
            return `${nameSegment} accepted your tutoring request.`;
        case "declined":
            return `${nameSegment} declined your tutoring request.`;
        case "pending":
            return `${nameSegment} requested an appointment.`;
        case "cancelled":
            return `Your appointment with ${nameSegment} is cancelled.`;
        default:
            return `${nameSegment} made an action.`;
    }
}

export default NotificationCard;

