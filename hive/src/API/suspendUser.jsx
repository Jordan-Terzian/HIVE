// suspendUserService.js

const SuspendUser = async (userId, reason) => {
    const url = `http://127.0.0.1:8000/suspend_user/${userId}/`; 

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ reason: reason })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('There was an error suspending the user:', error);
    }
};

export default SuspendUser;
