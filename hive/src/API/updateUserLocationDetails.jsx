const updateUserLocationDetails = async (country, streetAddress, suburb, state, postcode, fetchUser) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/profile/edit/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify({
                country: country,
                address: streetAddress,
                suburb: suburb,
                state: state,
                postcode: postcode
            })
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Network response was not ok');
        }

        fetchUser()

    } catch (error) {
        // Handle errors with either the fetch or data processing
        console.log('Fetch error: ', error.message);
    }
}

export default updateUserLocationDetails;