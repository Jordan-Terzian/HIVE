import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SubjectLabel from '../atoms/subjectLabel';
import CustomButton from '../atoms/customButton';
import { mdiAlertBox } from '@mdi/js';
import IconButton from '../atoms/iconButton';
import ReportForm from '../organisms/reportForm';
import GetCoursesName from '../../API/getCoursesName';
import TutorAppointmentRespond from "../organisms/tutorAppointmentRespond";
import { GetCourseName } from '../../API/getCoursesName';
import ReportActionForm from '../organisms/reportActionForm';

const StudentProfileCard = ({ ...props }) => {
    const [courseNames, setCourseNames] = useState([]);
    const [courseName, setCourseName] = useState(null);

    const [showActionForm, setShowActionForm] = useState(false);

    // Toggles for the report action form
    const handleShowActionForm = () => {
        setShowActionForm(true);
    };

    const handleHideActionForm = () => {
        setShowActionForm(false);
    };

    // Parse date and time from appointment data
    const date = new Date(props.data?.start).toLocaleDateString(undefined, { timeZone: 'UTC' });
    const startTime = new Date(props.data?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const endTime = new Date(props.data?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

    // Check if user is admin
    const isAdmin = localStorage.getItem('role') === 'Admin';

    // Fetch course name on first load
    useEffect(() => {
        const fetchCourseName = async () => {
            try {
                const name = await GetCourseName(props.data?.course);
                setCourseName(name);
            } catch (error) {
                console.error('Error fetching course name:', error);
            }
        };
        if (props.data?.course != null) {
            fetchCourseName();
        }
    }, []);

    return (
        <>
            <GetCoursesName courseIds={props.studentProfile?.courses} setCourseNames={setCourseNames} />
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
                    <ReportForm reporter={props.user} reportee={props.studentProfile} onHideReportForm={props.onHideReportForm} />
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

                    <ReportActionForm onHideActionForm={handleHideActionForm} offender={props?.studentProfile}/>

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
                minHeight={isAdmin ? "30%" : "60%"}
                margin="auto"
                borderRadius="10px"
            >
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
                    {/* Profile Picture with Name, Year, and Location */}
                    <Box display="flex" alignItems="center" gap="20px" marginBottom="20px">
                        <Box
                            width="120px"
                            height="120px"
                            borderRadius="50%"
                        >
                            <img
                                src={`http://127.0.0.1:8000/${props.studentProfile?.profile_picture}`}
                                alt="Profile"
                                style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                            <Box display="flex" alignItems="center" gap="8px">
                                <Typography variant="h4" color='black'>{props.studentProfile?.first_name} {props.studentProfile?.last_name}</Typography>
                            </Box>
                            <Typography variant="body1" color='textSecondary'>{props.studentProfile?.year_of_schooling}</Typography>
                            <Typography variant="body1" color="textSecondary">{props.studentProfile?.suburb}</Typography>
                            <Box display="flex" flexDirection="row" flexWrap="wrap" gap="8px"> 
                                {courseNames.map((course, index) => (
                                    <Box key={index}>
                                        <SubjectLabel text={course.label} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Bio */}
                    <Box maxWidth="95%" marginBottom="20px">
                        <Typography variant="h6" color='black' marginTop="10px">
                            <strong>Bio:</strong> {props.studentProfile?.bio}
                        </Typography>
                    </Box>

                    {/* Student Request Information */}
                    {!isAdmin && (
                        <Box maxWidth="95%" marginBottom="20px">
                            <Typography variant="h5" color='black' marginBottom="10px" marginTop="10px" fontWeight={'bold'}>{props.studentProfile?.first_name}'s Request</Typography>
                            <Typography variant="h6" color='black' marginTop="10px">
                                <strong>Subject:</strong> {courseName}
                            </Typography>
                            <Typography variant="h6" color='black' marginTop="10px">
                                <strong>Date:</strong> {date}
                            </Typography>
                            <Typography variant="h6" color='black' marginTop="10px">
                                <strong>Time:</strong> {startTime} - {endTime}
                            </Typography>
                            <Typography variant="h6" color='black' marginTop="10px">
                                <strong>Location:</strong> {props.data?.location}
                            </Typography>
                        </Box>
                    )}
                </Box>
                {!isAdmin ? (
                    <TutorAppointmentRespond appointment={props.data} type={props.data?.status} />
                ) : (
                    <CustomButton
                        label="Suspend/Ban"
                        width="200px"
                        height="50px"
                        fontSize={20}
                        onPress={handleShowActionForm}
                    />
                )}

            </Box>
        </>
    );

};

export default StudentProfileCard;

