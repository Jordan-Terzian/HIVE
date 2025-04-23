import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import SubjectLabel from '../atoms/subjectLabel';
import { Link } from 'react-router-dom';
import GetCoursesName from '../../API/getCoursesName';

const TutorCard = ({ tutor, currentTab, tutorID }) => {
    const [courseNames, setCourseNames] = useState([]);
    return (
        <>
            <GetCoursesName courseIds={tutor.courses} setCourseNames={setCourseNames} />
            {/* Navigate to the tutor profile  */}
            <Link to={`/profile/tutor/${tutorID}?tab=${currentTab}`} style={{ textDecoration: 'none' }}>
                <Box
                    minHeight="220px"
                    width="350px"
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
                    {/* Profile Picture with Name, Rating, and Price */}
                    <Box display="flex" alignItems="center" marginBottom="8px">
                        <Box
                            width="60px"
                            height="60px"
                            borderRadius="50%"
                            marginRight="12px"
                        >
                            <img
                                src={tutor.profile_picture}
                                alt="Profile"
                                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" flex="1">
                            <Box display="flex" alignItems="center" gap="8px">
                                <Typography variant="h5" color='black'>{tutor.first_name} {tutor.last_name}</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={tutor.tutor_details?.average_rating}
                                    readOnly
                                    size="small"
                                    style={{ marginLeft: '20px' }}
                                />
                            </Box>
                            <Typography variant="body2" color="textSecondary">${tutor.tutor_details?.price_per_hour}/hour</Typography>
                            <Typography variant="body2" color="textSecondary">{tutor.state}, {tutor.country}</Typography>
                        </Box>
                    </Box>

                    {/* Subjects */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, min-content)"
                        gap="8px"
                        marginTop="8px"
                    >
                        {courseNames.map((course, index) => (
                            <Box key={index} display="flex">
                                <SubjectLabel text={course.label} />
                            </Box>
                        ))}
                    </Box>

                    {/* Experience */}
                    <Box flex="1" mt="8px" display="flex" flexDirection={"column"}>
                        <Typography variant="body2" marginBottom="5px" marginTop="5px" color='black'>
                            <strong style={{ marginRight: '4px' }}>Experience:</strong>{tutor.tutor_details?.experience}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </>
    );
};

export default TutorCard;
