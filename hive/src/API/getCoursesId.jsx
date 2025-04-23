const GetCoursesId = async (selectedSubjects) => {
    try {
        const courseNames = selectedSubjects.map(subject => subject.value); 
        
        const response = await fetch('http://127.0.0.1:8000/courses/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch courses.');
        }

        const allCourses = await response.json();
        
        // Convert object to array of [key, value] pairs
        const coursesArray = Object.entries(allCourses);

        // Find the IDs of the selected courses
        return coursesArray
            .filter(([id, name]) => courseNames.includes(name))
            .map(([id, name]) => parseInt(id, 10));

    } catch (error) {
        console.error('Error getting course IDs:', error);
        throw error;
    }
};

const GetCourseId = async (selectedSubject) => {
    try {
        const courseName = selectedSubject.value;

        const response = await fetch('http://127.0.0.1:8000/courses/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch courses.');
        }

        const allCourses = await response.json();

        // Find the ID of the selected course
        const courseId = Object.entries(allCourses).find(([id, name]) => name === courseName);

        return courseId ? parseInt(courseId[0], 10) : null;  // Returns the ID or null if not found

    } catch (error) {
        console.error('Error getting course ID:', error);
        throw error;
    }
};




export default GetCoursesId;

export { GetCourseId };
