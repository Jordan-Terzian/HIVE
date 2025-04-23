const RateTutor = async (appointmentId, rating) => {
    const url = `http://127.0.0.1:8000/rate_tutor/${appointmentId}/`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
            body: JSON.stringify({ rating })
        });

        if (!response.ok) {
            throw new Error('Failed to rate tutor');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error rating tutor:', error);
        throw error;
    }
};

export default RateTutor;
