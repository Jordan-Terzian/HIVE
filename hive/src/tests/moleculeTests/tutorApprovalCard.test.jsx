import React from 'react';
import { render, screen } from '@testing-library/react';
import TutorApprovalCard from '../../components/molecules/tutorApprovalCard';
import { mdiPinOutline, mdiBookEducationOutline } from "@mdi/js";

// Mocking necessary components and modules


jest.mock('../../API/getCoursesName', () => {
    return jest.fn(() => null);
});

describe('<TutorApprovalCard />', () => {
    const mockTutor = {
        first_name: "John",
        last_name: "Doe",
        profile_picture: "path-to-picture.jpg",
        tutor_details: {
            price_per_hour: "20"
        },
        country: "USA",
        courses: [1, 2]
    };

    it('renders without crashing', () => {
        render(<TutorApprovalCard tutor={mockTutor} />);
    });

    it('displays tutor details correctly', () => {
        render(<TutorApprovalCard tutor={mockTutor} />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("$20/hr")).toBeInTheDocument();

        const img = screen.getByAltText("Profile");
        expect(img).toHaveAttribute("src", "path-to-picture.jpg");
    });

    it('displays country information correctly', () => {
        render(<TutorApprovalCard tutor={mockTutor} />);
        expect(screen.getByText("USA")).toBeInTheDocument();
    });

    it('renders the "View Application" button correctly', () => {
        render(<TutorApprovalCard tutor={mockTutor} />);
        expect(screen.getByText("View Application")).toBeInTheDocument();
    });
});
