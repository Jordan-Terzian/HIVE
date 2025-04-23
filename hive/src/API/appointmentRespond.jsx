const appointmentRespond = async (appointmentId, tutorId, fetchAppointments, status) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/tutor/appointment/respond/${appointmentId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: status
            })
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }

        await fetchAppointments();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default appointmentRespond;