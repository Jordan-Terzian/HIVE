import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TutorCard from '../../components/molecules/tutorCard';

describe('TutorCard', () => {
    const mockTutor = {
        first_name: 'John',
        last_name: 'Doe',
        profile_picture: 'path_to_image.jpg',
        tutor_details: {
            price_per_hour: 50,
            experience: '5 years'
        },
        state: 'NY',
        country: 'USA',
        courses: [1, 2, 3] // mock course IDs
    };

    beforeEach(() => {
        jest.mock('../../API/getCoursesName', () => () => null); // mocking the GetCoursesName component
    });

    it('renders tutor details correctly', () => {
        render(
            <MemoryRouter>
                <TutorCard tutor={mockTutor} currentTab="profile" tutorID="123" />
            </MemoryRouter>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('$50/hour')).toBeInTheDocument();
        expect(screen.getByText('NY, USA')).toBeInTheDocument();
        expect(screen.getByText('Experience:')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Profile' })).toHaveAttribute('src', 'path_to_image.jpg');
    });

    it('renders correct link to profile', () => {
        render(
            <MemoryRouter>
                <TutorCard tutor={mockTutor} currentTab="profile" tutorID="123" />
            </MemoryRouter>
        );

        expect(screen.getByRole('link')).toHaveAttribute('href', '/profile/tutor/123?tab=profile');
    });
});
