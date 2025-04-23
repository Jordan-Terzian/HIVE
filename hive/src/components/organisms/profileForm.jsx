import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../atoms/customButton';
import ImagePicker from '../molecules/imagePicker';
import { useNavigate } from 'react-router-dom';
import validateAndCreateSubjects from '../../API/validateAndCreateCourses';
import { registerAPI } from '../../API/registerRequest';
import { useUser } from '../../contexts/userContext';
import updateUserProfile from '../../API/updateUserProfile';

const ProfileDetailsForm = ({ showMainTitle = false, showTitles = false, ...props }) => {
    const navigate = useNavigate();
    const { fetchUser } = useUser();

    let isTutor = false;
    if (props.registerDetails) {
        isTutor = props.registerDetails.role === 'Tutor';

    } else {
        isTutor = props.user?.role === 'Tutor';
    }

    const handleFileSelected = (file) => {
        setSelectedFile(file);  // Set the File object to state
    };

    const [bio, setBio] = useState(props.user?.bio ?? '');
    const [selectedFile, setSelectedFile] = useState(props.user?.profile_picture ?? '');
    const [selectedFileBlobUrl, setSelectedFileBlobUrl] = useState(props.user?.profile_picture ?? null)

    const [price, setPrice] = useState(
        props.user?.tutor_details?.price_per_hour
            ? `$${props.user?.tutor_details?.price_per_hour}`
            : ''
    );


    const handlePress = async () => {

        if (bio === '') {
            alert('Please fill in all fields');
            return;
        }

        if (isTutor && price === '') {
            alert('Please fill in all fields');
            return;
        }

        // If the user is registering, navigate to the next page
        if (props.registerDetails) {
            await validateAndCreateSubjects(props.registerDetails.selectedSubjects);
            if (!selectedFile) {
                try {
                    const defaultImageResponse = await fetch('/assets/images/default.jpeg');
                    if (!defaultImageResponse.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    const defaultImageBlob = await defaultImageResponse.blob();
                    // Create a new File object from the Blob with a filename and extension
                    const defaultImageFile = new File([defaultImageBlob], 'default.jpeg', { type: 'image/jpeg' });
                    await registerAPI(props.registerDetails, bio, defaultImageFile, navigate, fetchUser, price);
                } catch (error) {
                    console.error('Failed to load the default image:', error);
                    return;
                }
            } else {
                // Call the API with the selected file
                await registerAPI(props.registerDetails, bio, selectedFile, navigate, fetchUser, price);
            }
        } else {
            // If the user is editing their profile, update their academic details
            const priceWithoutDollarSign = price.substring(1);
            updateUserProfile(selectedFile, bio, fetchUser, priceWithoutDollarSign);
        }
    }

    // Handle numeric input for price
    const handleNumericInput = (event) => {
        let value = event.target.value;
        // Remove non-numeric characters
        value = value.replace(/[^0-9]/g, '');
        // Prepend '$' symbol
        if (value && !value.startsWith('$')) {
            value = '$' + value;
        }
        setPrice(value);
    };

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%">
            {showMainTitle &&
                <Typography variant="h4" align="center" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    Profile Details
                </Typography>
            }

            {showTitles &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                    Profile Photo
                </Typography>
            }

            <ImagePicker
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                onFileSelected={handleFileSelected}
                selectedFileBlobUrl={selectedFileBlobUrl} // Pass blob URL to ImagePicker
                setSelectedFileBlobUrl={setSelectedFileBlobUrl}
            />

            {/* Only show price if user is a tutor */}
            {isTutor ?
                <TextField
                    label="Price Per Hour"
                    fullWidth
                    style={{ marginBottom: '16px' }}
                    value={price}
                    onChange={handleNumericInput}
                />
                : null}

            <TextField
                label="Bio"
                multiline
                rows={4}
                fullWidth
                defaultValue={bio}
                onChange={(e) => setBio(e.target.value)}
            />



            <Box display="flex" justifyContent="center" marginTop="16px">
                <CustomButton
                    label={props.label}
                    onPress={handlePress}
                />
            </Box>
        </Box>
    );
};

export default ProfileDetailsForm;
