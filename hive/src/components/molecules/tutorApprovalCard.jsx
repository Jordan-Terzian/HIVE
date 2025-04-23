import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Icon from "@mdi/react";
import {
    mdiBookEducationOutline,
    mdiPinOutline
} from "@mdi/js";
import CustomButton from "../atoms/customButton";
import SubjectLabel from "../atoms/subjectLabel";
import GetCoursesName from "../../API/getCoursesName";
import { Grid } from "@mui/material";

// Tutor Approval Card Component for admin 
const TutorApprovalCard = ({ currentTab, tutor, navigate }) => {
    const [courses, setCourses] = useState([])

    return (
        <>
            <GetCoursesName courseIds={tutor.courses} setCourseNames={setCourses} />
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
                {/* Profile Picture with Name and Price */}
                <Box display="flex" alignItems="center" marginBottom="8px">
                    <Box
                        width="45px"
                        height="45px"
                        borderRadius="50%"
                        marginRight="12px"
                    >
                        <img
                            src={tutor?.profile_picture}
                            alt="Profile"
                            style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="subtitle1">{tutor?.first_name} {tutor?.last_name}</Typography>
                        <Typography variant="body2" color="textSecondary">${tutor?.tutor_details?.price_per_hour}/hr</Typography>
                    </Box>
                </Box>

                <Divider orientation="horizontal" />

                {/* Information */}
                <Box flex="1" mt="8px">
                    <Typography variant="body2" display="flex" alignItems="center" marginBottom="5px" marginTop="5px">
                        <Icon path={mdiPinOutline} size={1} style={{ marginRight: '6px' }} /> {tutor?.country}
                    </Typography>
                    <Box display="flex" alignItems="center" marginBottom="5px">
                        <Icon path={mdiBookEducationOutline} size={1} style={{ marginRight: '6px' }} />
                        <Grid container spacing={1}> 
                            {courses.map((course, index) => (
                                <Grid item xs={6} key={index}> 
                                    <SubjectLabel text={course.label} />
                                </Grid>
                            ))}
                        </Grid> 
                    </Box>
                </Box>

                {/* Button to view application */}
                <Box display="flex" flexDirection="row" gap="8px" justifyContent="center" alignItems="center">
                    <CustomButton label="View Application" width="90px" height="30px" fontSize={12} onPress={() => navigate(`/profile/tutor/${tutor.id}?tab=${currentTab}`)} />
                </Box>
            </Box>
        </>
    );
};

export default TutorApprovalCard;
