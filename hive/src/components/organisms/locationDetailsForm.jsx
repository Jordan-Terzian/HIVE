import React, { useState } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import CustomButton from '../atoms/customButton';
import { CountryPicker, CountryData } from '../molecules/countryPicker';
import { useNavigate, useLocation } from 'react-router-dom';
import updateUserLocationDetails from '../../API/updateUserLocationDetails';
import { useUser } from '../../contexts/userContext';

const LocationDetailsForm = ({ showMainTitle = false, showTitles = false, ...props }) => {
    const { fetchUser } = useUser();
    const location = useLocation();

    // Check if the user is on the edit location details page

    const isEditLocationDetailsPage = location.pathname === '/settings/edit-location-details';

    // Try to find a matching country object based on props.user.country
    const defaultCountry = props.user?.country
        ? CountryData.find(c => c.value === props.user.country)
        : null;

    const [country, setCountry] = useState(defaultCountry);

    const [streetAddress, setStreetAddress] = useState(props.user?.address ?? '');
    const [suburb, setSuburb] = useState(props.user?.suburb ?? '');
    const [state, setState] = useState(props.user?.state ?? '');
    const [postcode, setPostcode] = useState(props.user?.postcode ?? '');

    const navigate = useNavigate();

    const handleNumericInput = (event) => {
        const value = event.target.value;
        // Allow only numeric characters (0-9)
        if (!/^\d*$/.test(value)) {
            event.target.value = value.replace(/[^0-9]/g, '');
        }
    };

    const handlePress = () => {
        if (country === null || streetAddress === '' || suburb === '' || state === '' || postcode === '') {
            alert('Please fill in all fields');
            return;
        }
        // If the user is editing their location details, update their details
        if (isEditLocationDetailsPage) {
            updateUserLocationDetails(country?.value, streetAddress, suburb, state, postcode, fetchUser);
        } else {
            // If the user is registering, navigate to the next page
            navigate('/register/academic-details', {
                state: {
                    gender: props.registerDetails.gender,
                    email: props.registerDetails.email,
                    firstName: props.registerDetails.firstName,
                    lastName: props.registerDetails.lastName,
                    phoneNumber: props.registerDetails.phoneNumber,
                    role: props.registerDetails.role,
                    password: props.registerDetails.password,
                    selectedDate: props.registerDetails.selectedDate,
                    country,
                    streetAddress,
                    suburb,
                    state,
                    postcode
                }
            });
        }
    }

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%">
            {showMainTitle &&
                <Typography variant="h4" align="center" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    Location Details
                </Typography>
            }
            {showTitles &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                    Country
                </Typography>
            }
            <CountryPicker country={country} setCountry={setCountry} />


            <TextField label="Street Address" defaultValue={streetAddress} fullWidth style={{ marginBottom: '16px', marginTop: "16px" }} onChange={(e) => setStreetAddress(e.target.value)} />
            <TextField label="Suburb" fullWidth defaultValue={suburb} style={{ marginBottom: '16px' }} onChange={(e) => setSuburb(e.target.value)} />

            <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                <Grid item xs={6}>
                    <TextField label="State" fullWidth defaultValue={state} onChange={(e) => setState(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Postcode" fullWidth defaultValue={postcode} onInput={handleNumericInput} onChange={(e) => setPostcode(e.target.value)} />
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="center">
                <CustomButton
                    label={props.label}
                    onPress={handlePress}
                />
            </Box>
        </Box>
    );
};

export default LocationDetailsForm;
