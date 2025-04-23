import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import SubjectPicker from '../molecules/subjectPicker';
import CustomButton from '../atoms/customButton';
import FileUploader from '../molecules/fileUploader';
import { useNavigate } from 'react-router-dom';
import GetCoursesName from '../../API/getCoursesName';
import { useUser } from '../../contexts/userContext';
import editTutorAcademicDetails from '../../API/editTutorAcademicDetails';
import validateAndCreateSubjects from '../../API/validateAndCreateCourses';
import YourUploadedFiles from '../molecules/yourUploadedFiles';
import { UploadTutorDocuments } from '../../API/uploadTutorFile';

const TutorAcademicDetailsForm = ({ showMainTitle = false, showTitles = false, ...props }) => {
    const navigate = useNavigate();
    const { fetchUser } = useUser();
    const [files, setFiles] = useState([]);
    const [experience, setExperience] = useState(props.user?.tutor_details.experience ?? '');
    const [defaultSubjects, setDefaultSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const courseIds = props.user?.courses || [];

    const handlePress = async () => {
        // If the user is registering, navigate to the next page
        if (props.registerDetails) {
            if (selectedSubjects.length === 0  || experience === '') {
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
                    academicYear: null,
                    selectedSubjects,
                    experience,
                    files
                }
            });
        } else {
            // If the user is editing their academic details, update their details
            if (defaultSubjects.length === 0  || experience === '') {
                alert('Please fill in all fields');
                return;
            }
            await validateAndCreateSubjects(selectedSubjects);
            await editTutorAcademicDetails(experience, selectedSubjects, fetchUser);
            await UploadTutorDocuments(files);
            await fetchUser();
            setFiles([]);
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
                <Typography variant="subtitle1" style={{ marginBottom: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                    Upload Supporting Documents
                </Typography>
            }

            <FileUploader files={files} setFiles={setFiles} />

            {props.user?.tutor_details &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                    Your Uploaded Files
                </Typography>
            }

            {props.user?.tutor_details &&
                <YourUploadedFiles
                    existingFiles={props.user.tutor_details.tutor_documents}
                    fetchUser={fetchUser}
                />
            }


            <TextField
                label="Experience Summary"
                multiline
                rows={4}
                fullWidth
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ marginTop: '16px' }}
            />


            {showTitles &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', marginTop: '8px', fontWeight: 'bold' }}>
                    Add Subject Qualifications
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

export default TutorAcademicDetailsForm;
