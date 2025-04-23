import React, { useState, useEffect, useRef } from 'react';
import { Box, Divider, TextField, Typography, Button } from '@mui/material';
import { useUser } from '../../contexts/userContext';
import { useAppointments } from "../../contexts/appointmentsContext";
import CustomButton from '../../components/atoms/customButton';
import ChatBubble from '../../components/atoms/chatBubble';
import conversationGet from '../../API/conversationGet';
import conversationMessagesSend from '../../API/conversationMessagesSend';
import conversationMessagesDisplay from '../../API/conversationMessagesDisplay';
import GetTutorProfile from "../../API/getTutorProfile";
import GetStudentProfile from "../../API/getStudentProfile";
import GetTutors from '../../API/getTutors';

{/* ChatBox component for displaying and managing chat messages */}
const ChatBox = ( {conversation, targetId, currentId} ) => {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [tutorProfile, setTutorProfile] = useState(null);
    const [studentProfile, setStudentProfile] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [allTutors, setAllTutors] = useState([]);
    const { fetchAppointments } = useAppointments();

    {/* Compute right time */}
    const formatMessageTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    {/* Fetch all tutors for checking of sender */}
    const fetchTutors = async () => {
        try {
            let everyTutor;
            everyTutor = await GetTutors();
            setAllTutors(everyTutor)
        } catch (error) {
            console.error('Failed to fetch tutors:', error);
        }
    }

    {/* Render to obtained profile all current and target */}
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let tutor
                let student
                if (user.role === "Tutor") {
                    student = await GetStudentProfile(targetId);
                    tutor = await GetTutorProfile(currentId);
                } else {
                    tutor = await GetTutorProfile(targetId);
                    student = await GetStudentProfile(currentId);
                }
                setTutorProfile(tutor);
                setStudentProfile(student);
            } catch (error) {
                console.error('Failed to fetch profiles:', error);
            }
        }
        fetchProfile();
    }, []);

    {/* Fetch all conversations */}
    const fetchConversations = async () => {
        try {
            const conversation = await conversationGet();
            setConversations(conversation);
        } catch (error) {
            console.error('Failed to fetch conversation:', error);
        }
    }

    {/* Fetch all messages */}
    const fetchMessages = async () => {
        try {
            const allMessage = await conversationMessagesDisplay(conversation?.id);
            setAllMessages(allMessage);
        } catch (error) {
            console.error('Failed to fetch all messages:', error);
        }
    }

    {/* Render for all these components */}
    useEffect(() => {
        fetchAppointments();
        fetchConversations();
        fetchMessages();
        fetchTutors();
    }, []);

    {/* Format time stamp */}
    const getFormattedTimestamp = () => {
        const now = new Date();
        let isoString = now.toISOString();
        isoString = isoString.replace('Z', '+00:00');
        return isoString;
    };

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const messagesEndRef = useRef(null);

    {/* Scrolling */}
    const scrollToBottom = () => {
        const messagesEnd = messagesEndRef.current;
        if (messagesEnd) {
          setTimeout(() => {
            messagesEnd.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      };
  
    useEffect(() => {
        if (allMessages.length > 0) {
          scrollToBottom();
        }
      }, [allMessages.length]);

    {/* Send Message */}
    const handleSendMessage = async ( id, current ) => {
        const timestamp = getFormattedTimestamp();
        try {
            const response = await conversationMessagesSend(conversation?.id, newMessage, current, timestamp);
            setMessages([...messages, { ...response, id: messages.length + 1 }]);
            setNewMessage('');
            scrollToBottom();
            fetchConversations();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        fetchMessages();
        const intervalId = setInterval(fetchMessages, 1000); // Fetch every 1 second
        return () => clearInterval(intervalId);
    }, []);

    {/* Render the chat box UI */}
    return (
        <>
            {/* Chat Box */}
            <Box style={{ position: 'relative' }} >
                <Box display="flex" marginBottom="8px" position="sticky" top="0" zIndex="1" backgroundColor="#FFEFC2" >
                    <Box
                        width="60px"
                        height="60px"
                        borderRadius="50%"
                        marginRight="12px"
                        marginLeft="5px"
                        marginTop= "5px"
                    >
                        {user.role === "Tutor" ? (
                            <img
                                src={`http://127.0.0.1:8000/${studentProfile?.profile_picture}`}
                                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                            />
                        ) : (
                            <img
                                src={`http://127.0.0.1:8000/${tutorProfile?.profile_picture}`}
                                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                            />
                        )}
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                            {user.role === "Tutor" ? (
                                <Typography variant="subtitle1">{studentProfile?.first_name} {studentProfile?.last_name}</Typography>
                            ) : (
                                <Typography variant="subtitle1">{tutorProfile?.first_name} {tutorProfile?.last_name}</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>

                <Divider orientation="horizontal" style={{ marginBottom:"10px" }} />

                {/* Scrollable box for chat messages */}
                <Box style={{ minHeight: '80vh', overflowY: 'scroll' }}>
                    {allMessages.map((message) => {
                    {/* Check if sender is a tutor */}
                        const isTutorSender = allTutors.some(tutor => tutor.id === message.sender);
                        const formattedTimestamp = formatMessageTimestamp(message.timestamp);

                        return (
                            <React.Fragment key={message.id}>
                                {isTutorSender ? (
                                    <ChatBubble
                                        sender={tutorProfile?.first_name}
                                        text={message.message}
                                        isSent={message.sender === currentId}
                                        timestamp={formattedTimestamp}
                                        pic={`http://127.0.0.1:8000/${tutorProfile?.profile_picture}`}
                                    />
                                ) : (
                                    <ChatBubble
                                        sender={studentProfile?.first_name}
                                        text={message.message}
                                        isSent={message.sender === currentId}
                                        timestamp={formattedTimestamp}
                                        pic={`http://127.0.0.1:8000/${studentProfile?.profile_picture}`}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Input box and send button for composing new messages */}
                <Box display="flex" flexDirection="row" style={{ marginTop: '10px', gap: '10px', position: 'sticky', bottom: '0', padding: '10px', zIndex: '1', backgroundColor: '#FFEFC2' }}>
                    <TextField
                        label="Type your message..."
                        fullWidth
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {/* Custom button for sending the message */}
                    <CustomButton label="Send" onPress={() => handleSendMessage(conversation?.id, currentId)} />
                </Box>
            </Box>
        </>
    );
};

export default ChatBox;