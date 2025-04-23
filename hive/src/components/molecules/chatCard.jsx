import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../contexts/userContext";
import GetTutorProfile from "../../API/getTutorProfile";
import GetStudentProfile from "../../API/getStudentProfile";
import conversationMessagesDisplay from "../../API/conversationMessagesDisplay";

{/* Component that represents a single chat card in the chat list */}
const ChatCard = ( {conversation, targetId, currentId} ) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const [tutorProfile, setTutorProfile] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);
    const [latestMessage, setLatestMessage] = useState('');
    const [isMessageRead, setIsMessageRead] = useState(true);

    {/* Effect to fetch profiles based on user roles and conversation participants */}
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let tutor;
                let student;
                if (currentId && targetId) {
                    if (user.role === "Tutor") {
                        student = await GetStudentProfile(targetId);
                        tutor = await GetTutorProfile(currentId);
                    } else {
                        tutor = await GetTutorProfile(targetId);
                        student = await GetStudentProfile(currentId);
                    }
                } else {
                    if (user.role === "Tutor") {
                        student = await GetStudentProfile(conversation?.user_two);
                        tutor = await GetTutorProfile(conversation?.user_one);
                    } else {
                        student = await GetStudentProfile(conversation?.user_two);
                        tutor = await GetTutorProfile(conversation?.user_one);
                    }
                }
                setTutorProfile(tutor);
                setStudentProfile(student);
            } catch (error) {
                console.error('Failed to fetch profiles:', error);
            }
        };
        fetchProfile();
    }, [currentId, targetId]);

    {/* Function to handle navigation when a chat card is clicked */}
    const handleAppointmentMessage = async (currentId, targetId) => {
        setIsMessageRead(true);
        if (user.role == "Student") {
            navigate(`/messages/${targetId}`, { state: { myParam: currentId } });
        } else {
            navigate(`/messages/${currentId}`, { state: { myParam: targetId } });
        }
    };

    {/* Function to format the timestamp of messages */}
    const formatMessageTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    {/* Effect to fetch the latest message for the conversation */}
    useEffect(() => {
        const fetchLatestMessage = async () => {
            const messages = await conversationMessagesDisplay(conversation?.id);
            if (messages.length > 0) {
                {/* Set the last message in the state */}
                const lastMessage = messages[messages.length - 1];
                setLatestMessage({ 
                    text: lastMessage.message.length > 10
                        ? lastMessage.message.slice(0, 10) + '...'
                        : lastMessage.message, 
                    time: formatMessageTimestamp(lastMessage.timestamp),
                    sender: lastMessage.sender
                });
            }
        };

        fetchLatestMessage();
        const intervalId = setInterval(fetchLatestMessage, 1000); // Refresh messages every second
        return () => clearInterval(intervalId);
    }, [setLatestMessage]);

    {/* Render the chat card */}
    return (
        <Button onClick={() => handleAppointmentMessage(conversation?.user_two, conversation?.user_one)} style={{ padding: 0, textTransform: 'none' }} >
            <Box
                width="495px"
                minheight="220px"
                border="1px solid #E0E0E0"
                borderRadius="8px"
                position="relative"
                display="flex"
                height ='auto'
                flexDirection="column"
                p="8px"
                gap="1px"
                bgcolor={"white"}
                boxShadow={1}
            >
                {/* Box containing the profile picture and the latest message */}
                <Box display="flex" alignItems="center" justifyContent="flex-start" marginBottom="8px">
                    {/* Profile picture */}
                    <Box
                        width="45px"
                        height="45px"
                        borderRadius="50%"
                        marginRight="8px"
                    >
                        <img
                            src={`http://127.0.0.1:8000/${user.role === "Tutor" ? studentProfile?.profile_picture : tutorProfile?.profile_picture}`}
                            alt="Profile"
                            style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                        />
                    </Box>
                    {/* Container for the name and latest message preview */}
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Typography variant="subtitle1" noWrap>
                            {user.role === "Tutor" ? `${studentProfile?.first_name} ${studentProfile?.last_name}` : `${tutorProfile?.first_name} ${tutorProfile?.last_name}`}
                        </Typography>
                        <Typography variant="subtitle1" noWrap>
                            {latestMessage.sender === currentId ? "You: " : ""}{latestMessage.text} {latestMessage.time}
                            {!isMessageRead && <span style={{ fontWeight: 'bold', color: 'red' }}> • Unread</span>}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Button>
    );
};

export default ChatCard;