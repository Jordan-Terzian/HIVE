
import GetCoursesId from "./getCoursesId";
const updateStudentAcademicDetails = async (schoolingLevel, selectedSubjects, fetchUser) => {

    try {
        // Retrieve course IDs
        const courses = await GetCoursesId(selectedSubjects);



        const formData = new FormData();

        formData.append('year_of_schooling', schoolingLevel);


        courses.forEach(course => {
            formData.append('courses', course);
        });


        const response = await fetch('http://127.0.0.1:8000/profile/edit/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
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

export default updateStudentAcademicDetails;