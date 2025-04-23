const updateUserPersonalDetails = async (firstName, lastName, email, phoneNumber, gender, selectedDate, fetchUser) => {

    try {
        const response = await fetch('http://127.0.0.1:8000/profile/edit/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                gender: gender,
                date_of_birth: selectedDate,

            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        localStorage.setItem('username', email);
        fetchUser()

    } catch (error) {
        // Handle errors with either the fetch or data processing
        console.log('Fetch error: ', error.message);
    }
}

export default updateUserPersonalDetails;