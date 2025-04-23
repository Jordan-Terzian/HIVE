const FormatAppointmentsForCalendar = (appointment, course, tutorProfile) => {
    // Retrieve the role from localStorage
    const role = localStorage.getItem('role');

    // Define options for formatting the time in UTC
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };

    // Convert start and end times to UTC time string
    const startTime = new Date(appointment.start).toLocaleTimeString('en-US', timeOptions);
    const endTime = new Date(appointment.end).toLocaleTimeString('en-US', timeOptions);

    // Define the title based on the role
    let title;
    if (role === 'Tutor') {
        title = `${course} - Student: ${appointment.student_name} - Location: ${appointment.location} (${startTime} - ${endTime})`;
    } else if (role === 'Student' && tutorProfile === true) {
        title = `(${startTime} - ${endTime})`;
    

    } else {
        title = `${course} - Tutor: ${appointment.tutor_name} - Location: ${appointment.location} (${startTime} - ${endTime})`;
    }

    return {
        title: title,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        tutor: appointment.tutor_name,
        student: appointment.student_name,
        location: appointment.location,
        course: appointment.course
    }
};

export default FormatAppointmentsForCalendar;