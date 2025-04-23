const conversationMessagesSend = async ( conversationId, message, sender, timestamp ) => {
    try {
        await fetch(`http://127.0.0.1:8000/conversation/messages/send/${conversationId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                conversation: conversationId,
                message: message,
                sender: sender,
                timestamp: timestamp,
            }),
        });

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default conversationMessagesSend;