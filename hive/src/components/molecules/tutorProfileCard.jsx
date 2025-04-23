import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import SubjectLabel from '../atoms/subjectLabel';
import CustomButton from '../atoms/customButton';
import AppointmentForm from '../organisms/appointmentForm';
import { mdiAlertBox } from '@mdi/js';
import IconButton from '../atoms/iconButton';
import ReportForm from '../organisms/reportForm';
import GetCoursesName from '../../API/getCoursesName';
import YourUploadedFilesSection from './yourUploadedFiles';
import ReportActionForm from '../organisms/reportActionForm';
import { Calendar } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";
import FormatAppointmentsForCalendar from "../../utils/formatAppointmentForCalendar";
import renderCellContent from "../../utils/renderCellContent";
import FetchUserActiveAppointments from '../../API/fetchUserActiveAppointments';
import { GetCourseName } from '../../API/getCoursesName';

import TutorDenialForm from '../organisms/tutorDenialForm';
import { useNavigate } from 'react-router-dom';
import UpdateTutorStatus from '../../API/updateTutorStatus';

const TutorProfileCard = ({ ...props }) => {

    const navigate = useNavigate();
    const [courseNames, setCourseNames] = useState([]);

    const [showDenialForm, setShowDenialForm] = useState(false);
    const [showActionForm, setShowActionForm] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);

    // Fetch course name when tutor profile changes
    useEffect(() => {
        const loadAppointments = async () => {
            const userId = props.tutorProfile?.id;
            if (!userId) return;

            const appointments = await FetchUserActiveAppointments(userId);
            if (appointments) {
                const formattedAppointments = appointments.map(async appointment => {
                    const courseName = await GetCourseName(appointment.course);
                    return FormatAppointmentsForCalendar(appointment, courseName, true);
                });
                Promise.all(formattedAppointments).then(setCalendarEvents);
            }
        };

        loadAppointments();
    }, [props.tutorProfile]);


    // Toggles for the report denial form
    const handleShowDenialForm = () => {
        setShowDenialForm(true);
    };

    const handleHideDenialForm = () => {
        setShowDenialForm(false);
    };

    // Toggles for the report action form
    const handleShowActionForm = () => {
        setShowActionForm(true);
    };

    const handleHideActionForm = () => {
        setShowActionForm(false);
    };

    const handleAccept = async () => {
        try {
            // Prepare email functionality
            const subject = encodeURIComponent("Hive Tutor Application Acceptance");
            const body = encodeURIComponent("Hi, You've been accepted as a tutor!");
            const email = props.tutorProfile?.email;

            // Open the mail client first
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            const data = await UpdateTutorStatus(props.tutorProfile?.id, true);
            // Perform actions based on the successful response
            navigate('/tutor-approval-dashboard');
        } catch (error) {
            console.error('Error in updating tutor status:', error);

        }
    };


    // Directly check localStorage for the 'Role' item
    const isAdmin = localStorage.getItem('role') === 'Admin';


    return (
        <>
            <GetCoursesName courseIds={props.tutorProfile?.courses} setCourseNames={setCourseNames} />
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
                    <AppointmentForm label="Submit Request" requester={props.user} tutor={props.tutorProfile} onClose={props.onHideAppointmentForm} />
                </Box>
            )}
            {props.isReportFormVisible && (
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
                    onClick={() => props.onHideReportForm()}
                >
                    <ReportForm reporter={props.user} reportee={props.tutorProfile} onHideReportForm={props.onHideReportForm} />
                </Box>
            )}

            {showDenialForm && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100vw"
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="rgba(0, 0, 0, 0.5)" // Semi-transparent background
                    zIndex={1000} // Higher than other content
                    onClick={handleHideDenialForm} // Close the form when the overlay is clicked
                >
                    {/* Prevents the overlay from closing when the form is clicked */}

                    <TutorDenialForm onHideDenialForm={handleHideDenialForm} tutor={props.tutorProfile} />

                </Box>
            )}

            {showActionForm && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100vw"
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="rgba(0, 0, 0, 0.5)" // Semi-transparent background
                    zIndex={1000} // Higher than other content
                    onClick={handleHideActionForm} // Close the form when the overlay is clicked
                >
                    {/* Prevents the overlay from closing when the form is clicked */}

                    <ReportActionForm onHideActionForm={handleHideActionForm} offender={props.tutorProfile} />

                </Box>
            )}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                position="relative"
                padding="20px"
                bgcolor={"white"}
                boxShadow={1}
                minWidth={"95%"}
                minHeight={"60%"} 
                margin="auto"
                borderRadius="10px"
            >
                {/* if person is not an admin show the report button */}
                {!isAdmin && (
                    <IconButton
                        iconPath={mdiAlertBox}
                        text="Report"
                        onPress={() => {
                            props.onShowReportForm();
                        }}
                    />
                )}

                {/* Container for the main content */}
                <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
                    {/* Profile Picture with Name, Rating, and Price */}
                    <Box display="flex" alignItems="center" gap="20px" marginBottom="20px">
                        <Box
                            width="120px"
                            height="120px"
                            borderRadius="50%"
                        >
                            <img
                                src={`http://127.0.0.1:8000/${props.tutorProfile?.profile_picture}`}
                                alt="Profile"
                                style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                            <Box display="flex" alignItems="center" gap="8px">
                                <Typography variant="h4" color='black'>{props.tutorProfile?.first_name} {props.tutorProfile?.last_name}</Typography>
                                <Rating
                                    name="profile-rating"
                                    value={Number(props.tutorProfile?.tutor_details?.average_rating)}
                                    readOnly
                                    size="large"
                                />
                            </Box>
                            <Typography variant="body1" color='textSecondary'>${props.tutorProfile?.tutor_details?.price_per_hour}/hr</Typography>
                            <Typography variant="body1" color="textSecondary">{props.tutorProfile?.state}, {props.tutorProfile?.country}</Typography>
                            <Box display="flex" flexDirection="row" flexWrap="wrap" gap="8px"> 
                                {courseNames.map((course, index) => (
                                    <Box key={index}>
                                        <SubjectLabel text={course.label} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Experience and Bio */}
                    <Box marginBottom="20px" minWidth={"100%"}>
                        <Typography variant="h6" color='black'>
                            <strong>Experience:</strong> {props.tutorProfile?.tutor_details?.experience}
                        </Typography>
                        <Typography variant="h6" color='black' marginTop="10px">
                            <strong>Bio:</strong> {props.tutorProfile?.bio}
                        </Typography>
                        {/* Calendar */}
                        {isAdmin ? (
                            <>
                                <Typography variant="h5" color='black' marginBottom="10px" marginTop="10px" fontWeight={'bold'}>
                                    {props.tutorProfile?.first_name}'s Supporting Documents
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column" // Stack children vertically
                                    alignItems="center" // Center children horizontally
                                    justifyContent="center" // Center children vertically
                                    width="100%" // Take up full container width
                                    height="100%" // Take up full container height
                                >
                                    <YourUploadedFilesSection existingFiles={props.tutorProfile?.tutor_details?.tutor_documents} name={props.tutorProfile?.first_name} tutorProfilePage={true} />
                                    <Box
                                        display="flex"
                                        justifyContent="center" // Center buttons horizontally
                                        gap="20px" // Add gap between buttons
                                        marginY="20px" // Add vertical margin for spacing
                                    >
                                        {/* If you come from the reports tab render the suspend/ban button */}
                                        {props.tab === "Reports" ? (
                                            <CustomButton
                                                label="Suspend/Ban"
                                                width="200px"
                                                height="50px"
                                                fontSize={20}
                                                onPress={handleShowActionForm}
                                            />
                                        ) : (
                                            <>
                                                <CustomButton
                                                    label="Deny"
                                                    width="120px"
                                                    background="linear-gradient(45deg, #EA6565 30%, #EA6565 90%)"
                                                    height="30px"
                                                    fontSize={20}
                                                    onPress={handleShowDenialForm}
                                                />
                                                <CustomButton
                                                    label="Accept"
                                                    width="120px"
                                                    background="linear-gradient(45deg, #88EA65 30%, #88EA65 90%)"
                                                    height="30px"
                                                    fontSize={20}
                                                    onPress={handleAccept}
                                                />
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                {/* Calendar Section */}
                                <Typography variant="h5" color='black' marginBottom="10px" marginTop="10px" fontWeight={'bold'}>
                                    {props.tutorProfile?.first_name}'s Calendar
                                </Typography>
                                <Calendar events={calendarEvents} renderCell={(date) => renderCellContent(date, calendarEvents)} />
                            </>
                        )}
                    </Box>
                </Box>

                {/* Request Appointment Button */}
                {!isAdmin && (
                    <CustomButton
                        label="Request Appointment"
                        width="200px"
                        height="50px"
                        fontSize={16}
                        onPress={props.onShowAppointmentForm}
                    />
                )}
            </Box>
        </>
    );

};

export default TutorProfileCard;

