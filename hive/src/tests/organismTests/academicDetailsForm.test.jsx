// AcademicDetailsForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AcademicDetailsForm from '../../components/organisms/AcademicDetailsForm';
import { UserContext } from '../../contexts/userContext';

test('renders Academic Details Form and interact with it', async () => {
    // Your mock function for fetchUser() and any other context values
    const mockFetchUser = jest.fn();

    // Mocking the context
    const mockUserContext = {
        fetchUser: mockFetchUser,
    };

    // Render your component, wrapping with any context providers it relies upon
    render(
        <UserContext.Provider value={mockUserContext}>
            <Router>
                <AcademicDetailsForm label={'Submit'} showMainTitle={true} showTitles={true} />
            </Router>
        </UserContext.Provider>
    );

    // Assertion: Checking if "Academic Details" text is rendered in the document
    const mainTitle = screen.getByText(/Academic Details/i);
    expect(mainTitle).toBeInTheDocument();

    // Assertion: Checking if "Academic Year" text is rendered in the document
    const academicYearTitle = screen.getByText(/Schooling Level/i);
    expect(academicYearTitle).toBeInTheDocument();

    // Assertion: Checking if "Subjects" text is rendered in the document
    const subjectsTitle = screen.getByText(/Add Subjects/i);
    expect(subjectsTitle).toBeInTheDocument();

    // Interaction: If there's a button, check if click fires some function
    const button = screen.getByText(/Submit/i);
    expect(button).toBeInTheDocument();
});
