import { useEffect } from 'react';

const GetCoursesName = ({ courseIds, setCourseNames }) => {
    useEffect(() => {
        const fetchCourseNames = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/courses/');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch courses.');
                }

                const allCourses = await response.json();

                // Convert object to array of [key, value] pairs
                const coursesArray = Object.entries(allCourses);
                
                // Find the names of the courses by ids
                const foundCourses = coursesArray
                    .filter(([id]) => courseIds.includes(parseInt(id, 10)))
                    .map(([, name]) => ({ label: name, value: name }));

                // Set course names in state
                setCourseNames(foundCourses);

            } catch (error) {
                console.error('Error getting course names:', error);
            }
        };

        // Execute fetch if courseIds are available
        if (courseIds && courseIds.length > 0) {
            fetchCourseNames();
        }
    }, [courseIds, setCourseNames]);

    return null;
};

const GetCourseName = async (courseId) => {
    try {
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

        // Find the name of the course with the specified ID
        const courseEntry = Object.entries(allCourses).find(([id]) => parseInt(id, 10) === courseId);

        return courseEntry ? courseEntry[1] : null;  // Returns the name or null if not found

    } catch (error) {
        console.error('Error getting course name:', error);
        throw error;
    }
};

export default GetCoursesName;

export { GetCourseName };
