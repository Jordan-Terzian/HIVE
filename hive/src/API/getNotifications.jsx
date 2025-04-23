const GetNotifications = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/getNotifications/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

export default GetNotifications;
