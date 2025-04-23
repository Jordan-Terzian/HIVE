import GetCoursesId from "./getCoursesId";

const editTutorAcademicDetails = async (experience, selectedSubjects, fetchUser) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/profile/edit/tutor/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                experience: experience
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const courses = await GetCoursesId(selectedSubjects);

        const formData = new FormData();

        courses.forEach(course => {
            formData.append('courses', course);
        });


        const subjectResponse = await fetch('http://127.0.0.1:8000/profile/edit/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });

        if (!subjectResponse.ok) {
            throw new Error('Network response was not ok');
        }

        fetchUser()

    } catch (error) {
        // Handle errors with either the fetch or data processing
        console.log('Fetch error: ', error.message);
    }
}

export default editTutorAcademicDetails;