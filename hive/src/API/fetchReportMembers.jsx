const FetchReportMembers = async (userId) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/profile/user/id/${userId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem fetching user data:', error);
        throw error;
    }
};

export default FetchReportMembers;
