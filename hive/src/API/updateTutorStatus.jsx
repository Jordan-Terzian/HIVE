const UpdateTutorStatus = async (tutorId, approvalStatus) => {
    const tutorApprovalUrl = `http://127.0.0.1:8000/platformadmin/tutor/${tutorId}/approve`; // Replace with your actual API path

    try {
        const response = await fetch(tutorApprovalUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ approved: approvalStatus }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error updating tutor approval status:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};

export default UpdateTutorStatus;
