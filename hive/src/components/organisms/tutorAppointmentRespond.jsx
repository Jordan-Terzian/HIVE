import React from "react";
import { Box, } from '@mui/material';
import CustomButton from '../atoms/customButton';
import AppointmentRespond from '../../API/appointmentRespond';
import { useNavigate } from "react-router-dom";
import conversationCreate from "../../API/conversationCreate";

const TutorAppointmentRespond = ({ appointment, fetchAppointments, type, ...props }) => {
    const navigate = useNavigate();

    const handleAppointmentRespond = async (currentAppointment, currentTutor, fetchAppointments, currentStatus) => {
        try {
            const appointmentData = await AppointmentRespond(currentAppointment, currentTutor, fetchAppointments, currentStatus);
            await fetchAppointments();
            if (typeof props.onClose === "function") {
                props.onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error responding to appointment:', error);
        }
    };

    const handleAppointmentMessage = async (currentId, targetId) => {
        try {
            const createConversation = await conversationCreate(currentId, targetId);
            navigate(`/messages/${targetId}`, { state: { myParam: currentId } })
        } catch (error) {
            console.error('Error creating a conversation:', error);
        }
    }

    return (
        <>
            {/* Buttons */}
            <Box display="flex" flexDirection="row" gap="8px" justifyContent="center" alignItems="center">
                {type === "upcoming" ? (
                <>
                    <CustomButton label="Cancel" width="80px" background="linear-gradient(45deg, #EA6565 30%, #EA6565 90%)" height="30px" fontSize={15}
                    onPress={() => handleAppointmentRespond(appointment.id, appointment.tutor, fetchAppointments, "cancelled")} />
                    <CustomButton label="Message" width="80px" height="30px" fontSize={15}
                    onPress={() => handleAppointmentMessage(appointment.tutor, appointment.student)} />
                </> 
                ) : type === "active" ? (
                <>
                    <CustomButton label="Cancel" width="80px" background="linear-gradient(45deg, #EA6565 30%, #EA6565 90%)" height="30px" fontSize={15}
                    onPress={() => handleAppointmentRespond(appointment.id, appointment.tutor, fetchAppointments, "cancelled")} />
                    <CustomButton label="Message" width="80px" height="30px" fontSize={15}
                    onPress={() => handleAppointmentMessage(appointment.tutor, appointment.student)} />
                </> 
                ) : (
                    <>
                    <CustomButton label="Decline" width="80px" background="linear-gradient(45deg, #EA6565 30%, #EA6565 90%)" height="30px" fontSize={15} 
                    onPress={() => handleAppointmentRespond(appointment.id, appointment.tutor, fetchAppointments, "declined")} />
                    <CustomButton label="Accept" width="80px" background="linear-gradient(45deg, #88EA65 30%, #88EA65 90%)" height="30px" fontSize={15} 
                    onPress={() => handleAppointmentRespond(appointment.id, appointment.tutor, fetchAppointments, "active")} />
                </> 
                )}
            </Box>
        </>
    );
};

export default TutorAppointmentRespond; 
