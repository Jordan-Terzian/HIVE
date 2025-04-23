// PersonalDetailsForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PersonalDetailsForm from '../../components/organisms/personalDetailsForm';
import { UserContext } from '../../contexts/userContext';
import { createMemoryHistory } from 'history';
import { Router as RegularRouter } from 'react-router-dom';

test('renders Personal Details Form and interact with it', async () => {
    // Your mock function for fetchUser() and any other context values
    const mockFetchUser = jest.fn();

    // Mocking the context
    const mockUserContext = {
        fetchUser: mockFetchUser,
    };

    // Create a memory history object for testing navigation
    const history = createMemoryHistory();

    // Mock data to be passed as props
    const mockProps = {
        user: {
            gender: 'Male',
            email: 'test@example.com',
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '555-5555',
            date_of_birth: '01/01/2000',
        },
        label: 'Continue',
        role: 'Student',
    };

    // Render your component, wrapping with any context providers it relies upon
    render(
        <UserContext.Provider value={mockUserContext}>
            <Router>
                <PersonalDetailsForm {...mockProps} showMainTitle={true} showTitles={true} />
                </Router>
        </UserContext.Provider>
    );

    // Assertion: Checking if "Personal Details" text is rendered in the document
    const mainTitle = screen.getByText(/Personal Details/i);
    expect(mainTitle).toBeInTheDocument();

    // Assertion: Checking if "Email Address" text is rendered in the document
    const emailTitle = screen.getByLabelText(/Email Address/i);
    expect(emailTitle).toBeInTheDocument();

    // Interaction: If there's a button, check if click fires some function
    const button = screen.getByText(/Continue/i);
    expect(button).toBeInTheDocument();

    // Interact: Filling out the text fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: 'Doe' },
    });

});
