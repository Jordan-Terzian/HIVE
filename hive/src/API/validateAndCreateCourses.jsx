const validateAndCreateSubjects = async (selectedSubjects) => {
    try {
        const subjectsToCreate = selectedSubjects.filter(
            (subject) => subject.__isNew__
        );

        for (const subject of subjectsToCreate) {
            const createResponse = await fetch('http://127.0.0.1:8000/courses/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_name: subject.value,
                    course_description: subject.value,
                }),
            });

            if (!createResponse.ok) {
                const errorData = await createResponse.json();
                throw new Error(`Failed to create subject: ${subject.value}. Error: ${JSON.stringify(errorData)}`);
            }
        }

    } catch (error) {
        console.error('Subject creation error: ', error);
    }
};

export default validateAndCreateSubjects;
