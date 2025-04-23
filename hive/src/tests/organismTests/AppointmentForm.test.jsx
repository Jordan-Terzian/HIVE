import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AppointmentForm from '../../components/organisms/appointmentForm';

jest.mock('../../API/getCoursesName', () => {
    return jest.fn(() => <div>Mock GetCoursesName</div>);
});

jest.mock("../../API/getCoursesId", () => {
    return {
        GetCourseId: jest.fn().mockResolvedValue('mocked_course_id')
    };
});

jest.mock('../../API/createAppointment', () => {
    return jest.fn().mockResolvedValue({});
});

// Mock other imports as required...

describe('AppointmentForm', () => {
    const mockProps = {
        onClose: jest.fn(),
        requester: {
            address: 'mock_address',
            suburb: 'mock_suburb',
            state: 'mock_state',
            postcode: 'mock_postcode',
            id: 'mock_requester_id'
        },
        tutor: {
            email: 'mock_tutor_email',
            courses: ['course1', 'course2']
        },
        label: "Create"
    };

    it('renders without crashing', () => {
        render(<AppointmentForm {...mockProps} />);
    });

});
