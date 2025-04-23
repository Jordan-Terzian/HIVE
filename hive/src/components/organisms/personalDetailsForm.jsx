import React, { useState } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import GenderPicker from '../molecules/genderPicker';
import DatePicker from '../molecules/datePicker';
import CustomButton from '../atoms/customButton';
import PasswordField from '../molecules/passwordField';
import { useNavigate, useLocation } from 'react-router-dom';
import FormatDate from '../../helperFunctions/formatDate';
import { parse, isBefore, isEqual, startOfDay } from 'date-fns';
import updateUserPersonalDetails from '../../API/updateUserPersonalDetails';
import { useUser } from '../../contexts/userContext';
import CheckUserExistence from '../../API/checkUserExistence';

const PersonalDetailsForm = ({ showMainTitle = false, showTitles = false, ...props }) => {
    const { fetchUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const [gender, setGender] = useState(
        props.user?.gender
            ? (props.user.gender === 'Male' || props.user.gender === 'Female'
                ? props.user.gender
                : 'Other'
            )
            : ''
    );
    const [otherGender, setOtherGender] = useState(
        props.user?.gender && (props.user.gender !== 'Male' && props.user.gender !== 'Female')
            ? props.user.gender
            : ''
    );

    // Converting string date to Date object and set as default if it exists
    const defaultDOB = props.user?.date_of_birth
        ? parse(props.user.date_of_birth, "dd/MM/yyyy", new Date())
        : null;

    const [selectedDate, handleDateChange] = useState(defaultDOB);


    const [email, setEmail] = useState(props.user?.email ?? '');
    const [firstName, setFirstName] = useState(props.user?.first_name ?? '');
    const [lastName, setLastName] = useState(props.user?.last_name ?? '');
    const [phoneNumber, setPhoneNumber] = useState(props.user?.phone_number ?? '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isEditDetailsPage = location.pathname === '/settings/edit-personal-details';
    const boxWidth = isEditDetailsPage ? '37.5%' : '27%';

    const handleNumericInput = (event) => {
        const value = event.target.value;
        // Allow only numeric characters (0-9)
        if (!/^\d*$/.test(value)) {
            event.target.value = value.replace(/[^0-9]/g, '');
        }
    };

    const handlePress = async() => {

        // Define a variable to hold the final gender value
        let finalGender = gender;

        let finalEmail = email.toLowerCase();

        const today = startOfDay(new Date());

        // Check if "Other" is selected, and if it is, use the custom gender value
        if (gender === 'Other') {
            finalGender = otherGender;
        }

        const emailNoExists = await CheckUserExistence(finalEmail);
        const phoneNoExists = await CheckUserExistence(phoneNumber);

        if (firstName === '' || lastName === '' || email === '' || phoneNumber === '' || finalGender === '' || selectedDate === null) {
            alert("Please fill in all fields");
            return;
        }

        if (selectedDate && !(isBefore(selectedDate, today) || isEqual(selectedDate, today))) {
            alert("Please enter a valid date");
            return;
        }

        if (phoneNumber.length > 15 ) {
            alert("Please enter a valid phone number");
            return;
        }


        // If the user is editing their personal details, update their details
        if (isEditDetailsPage) {
            if (!emailNoExists && finalEmail !== props.user?.email) {
                alert("There is already an account with this email registered.");
                return;
            } 

            if (!phoneNoExists && phoneNumber !== props.user?.phone_number) {
                alert("There is already an account with this phone number registered.");
                return;
            }

            updateUserPersonalDetails(firstName, lastName, email, phoneNumber, finalGender, FormatDate(selectedDate), fetchUser)
        } else {
            // If the user is registering, navigate to the next page
            if (!emailNoExists) {
                alert("There is already an account with this email registered.");
                return;
            }
        
            if (!phoneNoExists) {
                alert("There is already an account with this phone number registered.");
                return;
            }


            let finalGender = gender;
            if (otherGender !== '') {
                finalGender = otherGender;
            }
            if (password === confirmPassword) {

                navigate('/register/location-details', {
                    state: {
                        gender: finalGender,
                        email: finalEmail,
                        firstName,
                        lastName,
                        phoneNumber,
                        role: props.role,
                        password,
                        selectedDate: FormatDate(selectedDate),
                    }
                });
            } else {
                alert("Passwords don't match");
            }
        }
    }

    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width={boxWidth}>
            {showMainTitle &&
                <Typography variant="h4" align="center" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    Personal Details
                </Typography>
            }

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField label="First Name" fullWidth defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Last Name" fullWidth defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Grid>
            </Grid>

            <TextField label="Email Address" fullWidth style={{ marginTop: '16px' }} defaultValue={email} onChange={(e) => setEmail(e.target.value)} />

            <TextField label="Phone Number" fullWidth style={{ marginBottom: '8px', marginTop: '16px' }} defaultValue={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onInput={handleNumericInput} />

            {showTitles &&
                <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                    Gender
                </Typography>}

            <GenderPicker
                selectedGender={gender}
                onGenderChange={setGender}
                otherGender={otherGender}
                onOtherGenderChange={setOtherGender}
            />

            <DatePicker
                label="Date of Birth"
                value={selectedDate}
                onChange={date => handleDateChange(date)}
            />
            {!isEditDetailsPage && (
                <>
                    <PasswordField label="Password" onPasswordChange={setPassword} password={password} />
                    <PasswordField label="Confirm Password" onPasswordChange={setConfirmPassword} password={confirmPassword} />
                </>
            )}

            <Box display="flex" justifyContent="center" marginTop="16px">
                <CustomButton
                    label={props.label}
                    onPress={handlePress}
                />
            </Box>

        </Box>

    );
};

export default PersonalDetailsForm; 
