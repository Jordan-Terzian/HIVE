import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LocationDetailsForm from '../../components/organisms/LocationDetailsForm';
import { UserContext } from '../../contexts/userContext';

test('renders Location Details Form and interact with it', async () => {
    // Your mock function for fetchUser() and any other context values
    const mockFetchUser = jest.fn();

    // Mocking the context
    const mockUserContext = {
        fetchUser: mockFetchUser,
    };

    // Mock data to be passed as props
    const mockProps = {
        user: {
            country: 'USA',
            address: '123 Main St',
            suburb: 'Springfield',
            state: 'IL',
            postcode: '62704'
        },
        label: 'Continue',
        registerDetails: {
            gender: 'Male',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '555-5555',
            role: 'Student',
            password: 'securePassword123',
            selectedDate: '01/01/2000'
        }
    };

    // Render your component, wrapping with any context providers it relies upon
    render(
        <UserContext.Provider value={mockUserContext}>
            <Router>
                <LocationDetailsForm {...mockProps} showMainTitle={true} label={"Next"} />
            </Router>
        </UserContext.Provider>
    );

    // Assertion: Checking if "Location Details" text is rendered in the document
    const mainTitle = screen.getByText(/Location Details/i);
    expect(mainTitle).toBeInTheDocument();

    // Interaction: If there's a button, check if click fires some function
    const button = screen.getByText(/Next/i);
    expect(button).toBeInTheDocument();

});
