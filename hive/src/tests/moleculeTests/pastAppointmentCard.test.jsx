import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PastAppointmentCard from '../../components/molecules/pastAppointmentCard';
import { BrowserRouter as Router } from 'react-router-dom';
import GetTutorProfile from '../../API/getTutorProfile';
import { GetCourseName } from '../../API/getCoursesName';
import { act } from 'react-dom/test-utils';

// Mocking the API calls
jest.mock('../../API/getTutorProfile', () => {
    return jest.fn();
});
jest.mock('../../API/getCoursesName', () => ({
    GetCourseName: jest.fn()
}));

describe('PastAppointmentCard', () => {
    const mockAppointment = {
        start: '2023-01-01T12:00:00Z',
        course: 'course123',
        tutor: 'tutor123'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches and displays tutor and course details', async () => {
        const mockTutorResponse = {
            id: 'tutor123',
            profile_picture: 'image.jpg',
            first_name: 'John',
            last_name: 'Doe',
            tutor_details: {
                price_per_hour: 50
            }
        };
        const mockCourseName = 'Calculus';

        GetTutorProfile.mockResolvedValueOnce(mockTutorResponse);
        GetCourseName.mockResolvedValueOnce(mockCourseName);

        await act(async () => {
            render(
                <Router>
                    <PastAppointmentCard appointment={mockAppointment} />
                </Router>
            );
        })

        await waitFor(() => {
            expect(screen.getByText(/John Doe/)).toBeInTheDocument();
            expect(screen.getByText(/\$.*50.*\/hour/)).toBeInTheDocument();
            expect(screen.getByText('Calculus')).toBeInTheDocument();
        });
    });

    it('renders the appointment date correctly', async () => {
        const dateInstance = new Date(mockAppointment.start);
        const expectedDateString = dateInstance.toLocaleDateString(undefined, { timeZone: 'UTC' });

        await act(async () => {
            render(
                <Router>
                    <PastAppointmentCard appointment={mockAppointment} />
                </Router>
            );
        })

        expect(screen.getByText(expectedDateString)).toBeInTheDocument();
    });

});
