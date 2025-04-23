import React from 'react';
import { Box, Typography } from '@mui/material';

{/* Component for displaying a single chat message */}
const ChatBubble = ({ sender, text, isSent, timestamp, pic }) => {
    return (
        <>
            {/* Container for the chat  layout */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: isSent ? 'end' : 'start',
                marginTop: '10px',
                marginRight: isSent ? '10px' : undefined,
                marginLeft: isSent ? undefined : '10px',
            }}>
                {/* Conditionally render the profile picture for received messages */}
                {!isSent && ( 
                    <Box
                        sx={{
                            alignSelf: 'flex-end',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginRight: '12px',
                            marginTop: '12px',
                        }}
                    >
                        <img
                            src={pic}
                            alt={`${sender}'s profile`}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                )}
                {/* Chat message bubble and timestamp */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    maxWidth: 'fit-content',
                    minWidth: '100px',
                    borderRadius: '20px',
                    backgroundColor: isSent ? '#4CAF50' : '#f1f1f1',
                    color: isSent ? 'white' : '#303030',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                    wordWrap: 'break-word',
                    padding: '10px 15px',
                    marginBottom: '12px',
                }}>
                    <Typography variant="body1" gutterBottom>
                        {text}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#BDBDBD', mt: '4px' }}>
                        {timestamp}
                    </Typography>
                </Box>
                {/* Conditionally render the profile picture for sent messages */}
                {isSent && (
                    <Box
                        sx={{
                            alignSelf: 'flex-end',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginLeft: '12px',
                            marginTop: '12px',
                        }}
                    >
                        <img
                            src={pic}
                            alt={`${sender}'s profile`}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
};

export default ChatBubble;