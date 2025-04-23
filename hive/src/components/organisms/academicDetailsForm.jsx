// AcademicDetailsForm.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AcademicYearPicker, { academicYearData } from '../molecules/academicYearPicker';
import SubjectPicker from '../molecules/subjectPicker';
import CustomButton from '../atoms/customButton';
import { useNavigate } from 'react-router-dom';
import GetCoursesName from '../../API/getCoursesName';
import validateAndCreateSubjects from '../../API/validateAndCreateCourses';
import updateStudentAcademicDetails from '../../API/updateStudentAcademicDetails';
import { useUser } from '../../contexts/userContext';

const AcademicDetailsForm = ({ showMainTitle = false, showTitles = false, ...props }) => {
    const navigate = useNavigate();
    const { fetchUser } = useUser();

    // Check if props.user.year_of_schooling exists and find the corresponding object in academicYearData
    const defaultAcademicYear = props.user?.year_of_schooling
        ? academicYearData.find(year => year.value === props.user.year_of_schooling)
        : null;

    const [academicYear, setAcademicYear] = useState(defaultAcademicYear);

    const [defaultSubjects, setDefaultSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const courseIds = props.user?.courses || [];

    const handlePress = async () => {
        // If the user is registering, navigate to the next page
        if (props.registerDetails) {
            if (academicYear === null || selectedSubjects.length === 0) {
                alert('Please fill in all fields');
                return;
            }
            navigate('/register/profile', {
                state: {
                    gender: props.registerDetails.gender,
                    email: props.registerDetails.email,
                    firstName: props.registerDetails.firstName,
                    lastName: props.registerDetails.lastName,
                    phoneNumber: props.registerDetails.phoneNumber,
                    role: props.registerDetails.role,
                    password: props.registerDetails.password,
                    selectedDate: props.registerDetails.selectedDate,
                    country: props.registerDetails.country,
                    streetAddress: props.registerDetails.streetAddress,
                    suburb: props.registerDetails.suburb,
                    state: props.registerDetails.state,
                    postcode: props.registerDetails.postcode,
                    academicYear,
                    selectedSubjects
                }
            });
        } else {
            // If the user is editing their profile, update their academic details
            if (academicYear === null || defaultSubjects.length === 0) {
                alert('Please fill in all fields');
                return;
            }
            await validateAndCreateSubjects(selectedSubjects);
            await updateStudentAcademicDetails(academicYear.value, selectedSubjects, fetchUser);
        }
    }

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%">
            {showMainTitle &&
                <Typography variant="h4" align="center" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    Academic Details
                </Typography>
            }
            <GetCoursesName courseIds={courseIds} setCourseNames={setDefaultSubjects} />

            {showTitles &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                    Schooling Level
                </Typography>
            }

            <AcademicYearPicker academicYear={academicYear} setAcademicYear={setAcademicYear} />

            {showTitles &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', marginTop: '8px', fontWeight: 'bold' }}>
                    Add Subjects
                </Typography>
            }

            <SubjectPicker
                selectedSubjects={selectedSubjects}
                setSelectedSubjects={setSelectedSubjects}
                defaultSubjects={defaultSubjects}
            />

            <Box display="flex" justifyContent="center">
                <CustomButton
                    label={props.label}
                    onPress={handlePress}
                />
            </Box>

        </Box>
    );
};

export default AcademicDetailsForm;
