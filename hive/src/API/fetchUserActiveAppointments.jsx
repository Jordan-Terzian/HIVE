const FetchUserActiveAppointments = async (userId) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/${userId}/active-appointments/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.detail}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching active appointments:', error.message);
        return null; 
    }
};

export default FetchUserActiveAppointments;
