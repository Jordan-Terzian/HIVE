import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/molecules/navBar';
import { Box, Divider, Typography } from '@mui/material';
import { useUser } from '../../contexts/userContext';
import { useAppointments } from "../../contexts/appointmentsContext";
import CustomButton from '../../components/atoms/customButton';
import ChatCard from '../../components/molecules/chatCard';
import ChatBox from '../../components/molecules/chatBox';
import conversationGet from '../../API/conversationGet';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const Message = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const location = useLocation();
    const myParam = location.state?.myParam;
    const { userId } = useParams();
    const { activeAppointments, fetchAppointments } = useAppointments();

    {/* Page rendering when data changes */}
    useEffect(() => {
        fetchAppointments();
        async function fetchConversations() {
            try {
                const conversation = await conversationGet();
                console.log("Conversation: ", conversation)
                setConversations(conversation);
            } catch (error) {
                console.error('Failed to fetch conversation:', error);
            }
        }
        fetchConversations();
    }, []);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    {/* Search for all valid conversations */}
    const matchingConversation = conversations.find(conversation => 
        (conversation.user_one == userId && conversation.user_two == myParam) ||
        (conversation.user_one == myParam && conversation.user_two == userId)
    );

    return (
        <Box display="grid" gridTemplateColumns="240px 1px 30% auto" height="100vh">
            {/* Dashboard */}
            <NavBar activeItem="Messages" user={user} userId={userId} />

            {/* Chat List */}
            <Box style={{ position: 'relative' }}>

                <Divider orientation="horizontal" />

                {/* List of active chats */}
                <Box mt={2} display="flex" flexDirection="column" alignItems="left" gap="8px" width="29.5vw" marginBottom="8px" position="sticky" top="0" zIndex="1" backgroundColor="#FFEFC2">
                    {matchingConversation ? (
                        <ChatCard conversation={matchingConversation} key={matchingConversation.id} targetId={userId} currentId={myParam}/>
                    ) : (
                        conversations.length > 0 ? (
                            conversations.map(conversation => (
                                <ChatCard conversation={conversation} key={conversation.id} targetId={userId} currentId={myParam}/>
                            ))
                        ) : (
                            <Typography align="center" style={{ width: '100%' }}>No Active Chats</Typography>
                        )
                    )}
                </Box>
            </Box>

            <Divider orientation="vertical" />

            {/* Chat Box */}
            <Box style={{ position: 'relative' }} >
                {matchingConversation ? (
                    <ChatBox conversation={matchingConversation} key={matchingConversation.id} targetId={userId} currentId={myParam} />
                ) : (
                    <Box display="flex" flexDirection="column" gap="20px" width="50vw" height="100vh" alignItems="center" justifyContent="center">
                        <Box>
                            <Typography variant="h5"> Your Messages </Typography>
                        </Box>
                        <Box isplay="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h6"> Choose from existing conversations or start a new one from the upcoming appointments </Typography>
                        </Box>
                        <Box>
                            {user.role === "Tutor" ? (
                                <>
                                    <CustomButton label="Return to Dashboard >" onPress={() => navigate(`/home/tutor-dashboard`)} />
                                </>
                            ) : (
                                <>
                                    <CustomButton label="Return to Dashboard >" onPress={() => navigate(`/home/dashboard`)} />
                                </>
                            )}
                        </Box>
                    </Box>
                )}

            </Box>
        </Box>
    );
};

export default Message;