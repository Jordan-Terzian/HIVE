const GetTutors = () => {
    return fetch('http://127.0.0.1:8000/tutors/', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

export default GetTutors;
