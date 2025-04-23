const conversationCreate = async (currentId, targetId) => {
    console.log("Current: ", currentId);
    console.log("Target: ", targetId);

    try {
        await fetch(`http://127.0.0.1:8000/conversation/create/${targetId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                user_one: currentId,
                user_two: targetId,
            }),
        });

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default conversationCreate;