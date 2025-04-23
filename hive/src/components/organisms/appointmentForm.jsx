import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DatePicker from '../molecules/datePicker';
import TimePickerComponent from '../molecules/timePicker';
import CustomButton from '../atoms/customButton';
import QualifiedSubjectsPicker from '../molecules/qualifiedSubjectsPicker';
import LocationPicker from '../molecules/locationPicker';
import GetCoursesName from '../../API/getCoursesName';
import CreateAppointment from '../../API/createAppointment';
import { GetCourseId } from "../../API/getCoursesId";
import { isBefore, isToday, startOfDay } from 'date-fns';

const AppointmentForm = ({ onClose, requester, tutor, ...props }) => {

    const [selectedDate, handleDateChange] = useState(null);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [courseNames, setCourseNames] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const handleCreateAppointment = async () => {
        if (!selectedDate || !selectedSubjects || !selectedLocation || !startTime || !endTime) {
            alert('Please fill in all fields');
            return;
        }

        const currentDate = new Date();
        const startDate = startOfDay(selectedDate); // Get the start of the selected date

        // Check if selectedDate is in the past
        if (isBefore(startDate, startOfDay(currentDate))) {
            alert('Selected date cannot be in the past');
            return;
        }

        // If the selectedDate is today, ensure startTime is in the future
        if (isToday(selectedDate) && (startTime <= currentDate)) {
            alert('For today’s appointments, the start time must be in the future');
            return;
        }

        if (startTime >= endTime) {
            alert('Start time must be before end time');
            return;
        }

        try {
            const courseId = await GetCourseId(selectedSubjects);
            const localDate = selectedDate.toLocaleDateString('en-CA');  // en-CA format is YYYY-MM-DD

            const startHoursMinutes = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const endHoursMinutes = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            const start = `${localDate}T${startHoursMinutes}:00`;
            const end = `${localDate}T${endHoursMinutes}:00`;

            console.log("START: ", start)

            const location = selectedLocation.value === "My Address"
                ? `${requester.address}, ${requester.suburb}, ${requester.state}, ${requester.postcode}`
                : selectedLocation.value;

            const appointmentData = await CreateAppointment(
                tutor.email,
                requester.id,
                start,
                end,
                courseId,
                location
            );

            onClose();


        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };



    return (
        <Box bgcolor="white" borderRadius="25px" padding="24px" boxShadow={3} width="37.5%" onClick={(e) => e.stopPropagation()}>
            <GetCoursesName courseIds={tutor?.courses} setCourseNames={setCourseNames} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                        Request Date
                    </Typography>
                    <DatePicker
                        label="Appointment Date"
                        value={selectedDate}
                        onChange={date => handleDateChange(date)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                        Request Time
                    </Typography>
                    <TimePickerComponent
                        startTime={startTime}
                        endTime={endTime}
                        onChangeStart={setStartTime}
                        onChangeEnd={setEndTime}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                        Subject
                    </Typography>
                    <QualifiedSubjectsPicker setSelectedSubjects={setSelectedSubjects} selectedSubjects={selectedSubjects} courseOptions={courseNames} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                        Location/Platform
                    </Typography>
                    <LocationPicker setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} />
                </Grid>
            </Grid>


            <Box display="flex" justifyContent="center" marginTop="16px">
                <CustomButton
                    width="200px" height="50px" fontSize={16}
                    label={props.label}
                    onPress={handleCreateAppointment}
                />
            </Box>

        </Box>

    );
};

export default AppointmentForm; 
