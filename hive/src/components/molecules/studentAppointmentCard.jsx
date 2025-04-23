import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CustomButton from "../atoms/customButton";
import Icon from "@mdi/react";
import {
    mdiBookEducationOutline,
    mdiCalendarMultiselect,
    mdiClockTimeFourOutline,
    mdiPinOutline
} from "@mdi/js";
import AppointmentStateLabel from "../atoms/appointmentStateLabel";
import { GetCourseName } from "../../API/getCoursesName";
import GetTutorProfile from "../../API/getTutorProfile";
import { Link, useNavigate } from "react-router-dom";
import AppointmentRespond from "../../API/appointmentRespond";
import conversationCreate from "../../API/conversationCreate";

const StudentAppointmentCard = ({ appointment, fetchAppointments, type }) => {
    const navigate = useNavigate();

    // Parse date and time from appointment data
    const date = new Date(appointment?.start).toLocaleDateString(undefined, { timeZone: 'UTC' });
    const startTime = new Date(appointment?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const endTime = new Date(appointment?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

    const [tutor, setTutor] = useState(null);
    const [courseName, setCourseName] = useState(null);

    let currentTab = "Dashboard";

    // Fetch course name and tutor profile on first load
    useEffect(() => {
        const fetchCourseName = async () => {
            try {
                const name = await GetCourseName(appointment?.course);
                setCourseName(name);
            } catch (error) {
                console.error('Error fetching course name:', error);
            }
        };

        const fetchTutor = async () => {
            try {
                const tutor = await GetTutorProfile(appointment?.tutor);
                setTutor(tutor);
            } catch (error) {
                console.error('Error fetching tutor:', error);
            }
        };
        if (appointment?.course != null) {
            fetchCourseName();
        }
        if (appointment?.tutor != null) {
            fetchTutor();
        }
    }, []);

    // Cancel appointment request
    const CancelAppointment = async () => {
        try {
            const appointmentData = await AppointmentRespond(appointment.id, null, fetchAppointments, "cancelled");
            await fetchAppointments();

        } catch (error) {
            console.error('Error responding to appointment:', error);
        }

    }

    const handleAppointmentMessage = async (currentId, targetId) => {
        console.log(currentId)
        console.log(targetId)
        try {
            const createConversation = await conversationCreate(currentId, targetId);
            console.log("This is working!")
            navigate(`/messages/${targetId}`, { state: { myParam: currentId } })
        } catch (error) {
            console.error('Error creating a conversation:', error);
        }
    }

    return (

        <Box
            maxWidth={"200px"}
            minWidth="200px"
            minHeight="220px"
            height="auto"
            border="1px solid #E0E0E0"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            p="8px"
            gap="1px"
            bgcolor={"white"}
            boxShadow={1}
        >
            <Link to={`/profile/tutor/${tutor?.id}?tab=${currentTab}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {/* Profile Picture with Name and Price */}
                <Box display="flex" alignItems="center" marginBottom="8px">
                    <Box
                        width="45px"
                        height="45px"
                        borderRadius="50%"
                        marginRight="12px"
                    >
                        <img
                            src={`http://127.0.0.1:8000/${tutor?.profile_picture}`}
                            alt="Profile"
                            style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="subtitle1">{tutor?.first_name} {tutor?.last_name}</Typography>
                        <Typography variant="body2" color="textSecondary">${tutor?.tutor_details.price_per_hour}/hour</Typography>
                    </Box>
                </Box>
            </Link>

            <Divider orientation="horizontal" />

            {/* Information */}
            <Box flex="1" mt="8px">
                <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px" marginTop="5px">
                    <Icon path={mdiBookEducationOutline} size={1} style={{ marginRight: '6px' }} /> {courseName}
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px">
                    <Icon path={mdiCalendarMultiselect} size={1} style={{ marginRight: '6px' }} /> {date}
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px">
                    <Icon path={mdiClockTimeFourOutline} size={1} style={{ marginRight: '6px' }} /> {startTime} - {endTime}
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px">
                    <Icon path={mdiPinOutline} size={1} style={{ marginRight: '6px' }} /> {appointment?.location}
                </Typography>
            </Box>

            {/* Buttons */}
            <Box display="flex" flexDirection="row" gap="8px" justifyContent="center" alignItems="center">
                {type === "upcoming" ? (
                    <>
                        <CustomButton label="Cancel" width="80px" background="linear-gradient(45deg, #EA6565 30%, #EA6565 90%)" height="30px" fontSize={15} onPress={CancelAppointment} />
                        <CustomButton label="Message" width="80px" height="30px" fontSize={15} 
                        onPress={() => handleAppointmentMessage(appointment.student, appointment.tutor)} />
                    </>
                ) : appointment.status === "declined" ? (
                    <>
                        <AppointmentStateLabel text="Declined" color="#EA6565" />
                    </>
                ) : (
                    <>
                        <AppointmentStateLabel text="Pending" color="#8B8B8B" />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default StudentAppointmentCard;
