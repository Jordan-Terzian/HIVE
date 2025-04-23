const updateUserProfile = async (profilePhoto, bio, fetchUser, ...props) => {
    try {
        const formData = new FormData();
        formData.append('bio', bio);

        // Ensure profilePhoto is a File object
        if (profilePhoto instanceof File) {
            formData.append('profile_picture', profilePhoto);
        }

        const response = await fetch('http://127.0.0.1:8000/profile/edit/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        if (localStorage.getItem('role') === 'Tutor') {
            // Corrected the URL in the next line
            const tutorResponse = await fetch('http://127.0.0.1:8000/profile/edit/tutor/', { 
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price_per_hour: props[0],
                })
            });

            if (!tutorResponse.ok) {
                throw new Error('Network response was not ok');
            }
        }

        fetchUser();
    } catch (error) {
        console.log('Fetch error: ', error.message);
    }
};

export default updateUserProfile;
