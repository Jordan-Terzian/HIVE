import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationCard from '../../components/molecules/notificationsCard';
import GetStudentProfile from "../../API/getStudentProfile";
import GetTutorProfile from "../../API/getTutorProfile";
import { act } from 'react-dom/test-utils';

jest.mock('../../API/getStudentProfile');
jest.mock('../../API/getTutorProfile');

describe('NotificationCard', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('fetches and displays student profile if role is Tutor', async () => {
        const mockProfile = { profile_picture: 'path/to/image.jpg', first_name: 'John', last_name: 'Doe' };
        GetStudentProfile.mockResolvedValueOnce(mockProfile);
        localStorage.setItem('role', 'Tutor');

        await act(async () => {
            render(<NotificationCard status="active" name="JohnDoe" />);
        });

        expect(await screen.findByAltText('User profile')).toHaveAttribute('src', 'http://127.0.0.1:8000/path/to/image.jpg');
        expect(screen.getByText('John Doe accepted your tutoring request.')).toBeInTheDocument();
    });

    it('fetches and displays tutor profile if role is not Tutor', async () => {
        const mockProfile = { profile_picture: 'path/to/image.jpg', first_name: 'Jane', last_name: 'Doe' };
        GetTutorProfile.mockResolvedValueOnce(mockProfile);

        await act(async () => {
            render(<NotificationCard status="active" name="JohnDoe" />);
        });

        expect(await screen.findByAltText('User profile')).toHaveAttribute('src', 'http://127.0.0.1:8000/path/to/image.jpg');
        expect(screen.getByText('Jane Doe accepted your tutoring request.')).toBeInTheDocument();
    });

    it('shows Message button if status is active', async() => {
        const mockProfile = { profile_picture: 'path/to/image.jpg', first_name: 'Jane', last_name: 'Doe' };
        GetTutorProfile.mockResolvedValueOnce(mockProfile);

        await act(async () => {
            render(<NotificationCard status="active" name="JohnDoe" />);
        });

        expect(screen.getByText('Message')).toBeInTheDocument();
    });

});

