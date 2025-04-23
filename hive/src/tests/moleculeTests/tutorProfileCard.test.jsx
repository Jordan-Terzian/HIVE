import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TutorProfileCard from '../../components/molecules/tutorProfileCard';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock data for the test
const mockTutorProfile = {
    id: '1', // Assuming an ID is needed for FetchUserActiveAppointments
    courses: [1, 2, 3],
    profile_picture: 'path/to/profile.jpg',
    first_name: 'John',
    last_name: 'Doe',
    tutor_details: {
        price_per_hour: '50',
        experience: '5 years',
    },
    state: 'CA',
    country: 'US',
    bio: 'This is a test bio.',
};

describe('TutorProfileCard', () => {
    it('renders the GetCoursesName component with correct props', () => {
        render(
          <Router>
            <TutorProfileCard tutorProfile={mockTutorProfile} />
          </Router>
        );
        // Since GetCoursesName isn't rendered to the DOM directly, you would typically mock this component and check if it was called with the correct props
    });

    it('displays the tutor profile picture', () => {
        render(
          <Router>
            <TutorProfileCard tutorProfile={mockTutorProfile} />
          </Router>
        );
        const profilePic = screen.getByAltText('Profile');
        expect(profilePic).toBeInTheDocument();
        expect(profilePic).toHaveAttribute('src', `http://127.0.0.1:8000/${mockTutorProfile.profile_picture}`);
    });

    it('displays the tutor details', () => {
        render(
          <Router>
            <TutorProfileCard tutorProfile={mockTutorProfile} />
          </Router>
        );
        expect(screen.getByText(`${mockTutorProfile.first_name} ${mockTutorProfile.last_name}`)).toBeInTheDocument();
        expect(screen.getByText(`$${mockTutorProfile.tutor_details.price_per_hour}/hr`)).toBeInTheDocument();
        expect(screen.getByText(`${mockTutorProfile.state}, ${mockTutorProfile.country}`)).toBeInTheDocument();
        expect(screen.getByText('Experience:')).toBeInTheDocument();
        expect(screen.getByText('Bio:')).toBeInTheDocument();
    });
});
