const editAppointment = async (
    appointmentId,
    start,
    end,
    selectedSubjects,
    selectedLocation
) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/appointment/edit/${appointmentId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start: start,
                end: end,
                course: selectedSubjects,
                location: selectedLocation,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create appointment.');
        }


    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default editAppointment;