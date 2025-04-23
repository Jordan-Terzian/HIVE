const CheckUserExistence = async (username) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/exist/${username}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    } catch (error) {
        console.error("Error checking user existence: ", error);
        return false;
    }
};

export default CheckUserExistence;