import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Icon from "@mdi/react";
import {
    mdiBookEducationOutline,
    mdiCalendarMultiselect,
    mdiClockTimeFourOutline,
    mdiPinOutline,
    mdiPencil
} from "@mdi/js";
import { useNavigate } from 'react-router-dom';
import { GetCourseName } from "../../API/getCoursesName";
import GetStudentProfile from "../../API/getStudentProfile";
import { Link } from "react-router-dom";
import TutorAppointmentRespond from "../organisms/tutorAppointmentRespond";
import AppointmentEditForm from "../organisms/appointmentEditForm";
import GetTutorProfile from "../../API/getTutorProfile";

const TutorNotificationStudentDetail = ({ appointmentId, appointment, fetchAppointments, type, ...props }) => {
    const navigate = useNavigate();

    const [tutorProfile, setTutorProfile] = useState(null);

    // Fetch tutor profile when appointment.tutor changes
    useEffect(() => {
        async function fetchTutorProfile() {
            try {
                const profile = await GetTutorProfile(appointment.tutor);
                setTutorProfile(profile);
            } catch (error) {
                console.error('Failed to fetch tutor profile:', error);
            }
        }

        fetchTutorProfile();
    }, [appointment.tutor]);

    // Parse date and time from appointment data
    const date = new Date(appointment?.start).toLocaleDateString(undefined, { timeZone: 'UTC' });
    const startTime = new Date(appointment?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const endTime = new Date(appointment?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

    const [student, setStudent] = useState(null);
    const [courseName, setCourseName] = useState(null);

    let currentAppointment = appointment;

    // Fetch course name and student profile on first load
    useEffect(() => {
        const fetchCourseName = async () => {
            try {
                const name = await GetCourseName(appointment?.course);
                setCourseName(name);
            } catch (error) {
                console.error('Error fetching course name:', error);
            }
        };

        const fetchStudent = async () => {
            try {
                const student = await GetStudentProfile(appointment?.student);
                setStudent(student);
            } catch (error) {
                console.error('Error fetching tutor:', error);
            }
        };
        if (appointment?.course != null) {
            fetchCourseName();
        }
        if (appointment?.student != null) {
            fetchStudent();
        }
    }, []);

    return (
        <>
        {/* Appointment  */}
        {props.isAppointmentFormVisible && (
            <Box
                position="fixed"
                top={0}
                left={0}
                width="100vw"
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={999} // ensures the overlay is on top
                onClick={() => props.onHideAppointmentForm()}
            >
                <AppointmentEditForm label="Save Changes" appointmentId={appointmentId} appointment={appointment} tutorProfile={tutorProfile} student={student} fetchAppointments={fetchAppointments} onClose={() => props.onHideAppointmentForm()}/>
            </Box>
        )}
        <Box
            width="200px"
            minheight="220px"
            border="1px solid #E0E0E0"
            borderRadius="8px"
            position="relative"
            display="flex"
            height ='auto'
            flexDirection="column"
            p="8px"
            gap="1px"
            bgcolor={"white"}
            boxShadow={1}
        >
            {/* Profile Picture with Name and Price */}
                <Box display="flex" alignItems="center" marginBottom="8px">
                    <Link to={`/profile/student/${student?.id}?data=${encodeURIComponent(JSON.stringify(currentAppointment))}`} style={{ textDecoration: 'none', color: 'inherit' }}>   
                        <Box
                            width="45px"
                            height="45px"
                            borderRadius="50%"
                            marginRight="12px"
                        >
                            <img
                                src={`http://127.0.0.1:8000/${student?.profile_picture}`}
                                alt="Profile"
                                style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                            />
                        </Box>
                    </Link>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="row">
                            {type === "upcoming" ? (
                            <>
                                <Typography variant="subtitle1">{student?.first_name} {student?.last_name}</Typography>
                                <Icon path={mdiPencil} size={1} style={{ position:"absolute", top:"0", right:"0" }} onClick={props.onShowAppointmentForm} />
                            </> 
                            ) : (
                            <>
                                <Typography variant="subtitle1">{student?.first_name} {student?.last_name}</Typography>
                            </> 
                            )}
                        </Box>
                        <Typography variant="body2" color="textSecondary">{student?.year_of_schooling}</Typography>
                    </Box>
                </Box>

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
            
            <TutorAppointmentRespond appointment={appointment} fetchAppointments={fetchAppointments} type={type} onClose={() => props.onClose()}/>
        </Box>
        </>
    );
};

export default TutorNotificationStudentDetail;
