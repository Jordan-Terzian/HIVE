import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AppointmentEditForm from '../../components/organisms/appointmentEditForm';

jest.mock('../../API/getCoursesName', () => {
    return jest.fn(() => <div>Mock GetCoursesName</div>);
});

jest.mock("../../API/getCoursesId", () => {
    return {
        GetCourseId: jest.fn().mockResolvedValue('mocked_course_id')
    };
});

jest.mock('../../API/editAppointment', () => {
    return jest.fn().mockResolvedValue({});
});

// Mock other imports as required...

describe('AppointmentEditForm', () => {
    const mockProps = {
        appointmentId: 'mocked_appointment_id',
        appointment: {},  // You can provide a mocked appointment data if required
        tutorProfile: {
            courses: ['course1', 'course2']
        },
        student: {
            location: 'mock_location'
        },
        fetchAppointments: jest.fn(),
        onClose: jest.fn()
    };

    it('renders without crashing', () => {
        render(<AppointmentEditForm {...mockProps} />);
    });

});
