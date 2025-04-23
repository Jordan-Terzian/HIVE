const createAppointment = async (
    username,
    requesterId,
    start,
    end,
    selectedSubjects,
    selectedLocation
) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/appointments/${username}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                start,
                end,
                course: selectedSubjects,
                location: selectedLocation,
                student: requesterId,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create appointment.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default createAppointment;