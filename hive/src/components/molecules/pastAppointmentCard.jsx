import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Rating } from "@mui/material";
import Icon from "@mdi/react";
import {
    mdiBookEducationOutline,
    mdiCalendarMultiselect,
} from "@mdi/js";
import GetTutorProfile from "../../API/getTutorProfile";
import { GetCourseName } from "../../API/getCoursesName";
import { Link } from "react-router-dom";
import RateTutor from "../../API/rateTutor";

const PastAppointmentCard = ({ appointment, fetchAppointments }) => {
    const [value, setValue] = useState(appointment.rating ?? 0)
    const date = new Date(appointment?.start).toLocaleDateString(undefined, { timeZone: 'UTC' });
    const [tutor, setTutor] = useState(null)
    const [courseName, setCourseName] = useState(null)

    let rated = false;

    if (appointment.rating != 0) {
        rated = true;
    }

    let currentTab = "Dashboard";

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

    const handleRatingChange = async (event, newValue) => {
        setValue(newValue);
        try {
            
            const response = await RateTutor(appointment.id, newValue);
            await fetchAppointments();
         
        } catch (error) {
            // Handle errors, such as displaying a message to the user
            console.error('Failed to submit rating:', error);
        }
    };

    return (
        <Box
            minWidth="200px"
            minHeight="165px"
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
                        bgcolor={'red'}
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
                        <Typography variant="body2" color="textSecondary">${tutor?.tutor_details?.price_per_hour}/hour</Typography>
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
            </Box>

            {/* Star Rating */}
            <Box display="flex" flexDirection="row" gap="8px" justifyContent="center" alignItems="center">
                <Rating
                    name="simple-controlled"
                    value={value}
                    readOnly={rated}
                    onChange={handleRatingChange} 
                />

            </Box>
        </Box>
    );
};

export default PastAppointmentCard;
