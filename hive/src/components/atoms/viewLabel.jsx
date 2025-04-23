import React from 'react';
import { Box } from '@mui/material';
import CustomButton from './customButton';
import TutorNotificationStudentDetail from '../molecules/tutorNotificationStudentDetail';

// Component to show the view button in the appointment list opens up the tutor accept or decline form

const ViewLabel = ({ ...props }) => {

    return (
        <>
            {props.isAppointmentFormVisible && (
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
                    onClick={() => props.onHideAppointmentForm()}
                >
                    <TutorNotificationStudentDetail type={"request"} appointment={props.appointment} fetchAppointments={props.fetchAppointments} onClose={() => props.onHideAppointmentForm()}/>
                </Box>
            )}

            <CustomButton label="View" width="100px" height="30px" fontSize={18} background="linear-gradient(45deg, #FFC52A 0%, #9747FF 100%)" onPress={props.onShowAppointmentForm}/>
        </>
    );
};

export default ViewLabel;
