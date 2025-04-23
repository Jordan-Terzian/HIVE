import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/molecules/navBar';
import { Box, Divider, TextField, Typography, Button } from '@mui/material';
import { useUser } from '../../contexts/userContext';
import { useAppointments } from "../../contexts/appointmentsContext";
import CustomButton from '../../components/atoms/customButton';
import ChatBubble from '../../components/atoms/chatBubble';
import Icon from "@mdi/react";
import {
    mdiChat,
} from "@mdi/js";
import ChatCard from '../../components/molecules/chatCard';
import conversationCreate from '../../API/conversationCreate';
import GetStudentProfile from '../../API/getStudentProfile';
import GetTutorProfile from '../../API/getTutorProfile';

const ChatDropdownList = ( {appointment} ) => {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [tutorProfile, setTutorProfile] = useState(null);
    const [student, setStudent] = useState(null);

    const { activeAppointments, fetchAppointments } = useAppointments();

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchAppointments();
        const fetchStudent = async () => {
            try {
                const student = await GetStudentProfile(appointment.student);
                setStudent(student);
            } catch (error) {
                console.error('Error fetching tutor:', error);
            }
        };
        async function fetchTutorProfile() {
            try {
                const profile = await GetTutorProfile(appointment.tutor);
                setTutorProfile(profile);
            } catch (error) {
                console.error('Failed to fetch tutor profile:', error);
            }
        }
    }, []);

    const Dropdown = ( {appointments}) => (
        <Box style={{ position: 'absolute', zIndex: 2, backgroundColor: '#fff', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', padding: '10px', marginTop: '25vh' }}>
            {/* Cards for upcoming appointments will go here */}
            {appointments.length ? (
                appointments.map((appointment, index) => (
                <Typography key={index} style={{ cursor: 'pointer', margin: '5px' }}>
                    {appointment.name}
                </Typography>
                ))
            ) : (
              <Typography align="center" style={{ width: '100%' }}>No Active Appointments for Chat</Typography>
            )}
        </Box>
      );

    const handleNewChat = async () => {
        console.log("Icon clicked, call conversationCreate");
        setShowDropdown(!showDropdown);
    }

    return (
        <Box style={{ position: 'relative' }}>
            <Box style={{ top: '10px', right: '0px', marginTop: '15px', marginBottom: '15px' }}>
                <Button onClick={handleNewChat} style={{ minWidth: 'auto', padding: 0 }}>
                    <Icon path={mdiChat} size={1} color="#000" />
                    {showDropdown && <Dropdown appointment={appointment} />}
                </Button>
            </Box>
        </Box>
    );
};

export default ChatDropdownList;