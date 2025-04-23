
const BanUser = async (userId, reason) => {
    const url = `http://127.0.0.1:8000/ban_user/${userId}/`; 

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // If you use token-based authentication
            },
            body: JSON.stringify({ reason: reason }) // If your backend expects a reason
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('There was an error banning the user:', error);
    }
};

export default BanUser;
