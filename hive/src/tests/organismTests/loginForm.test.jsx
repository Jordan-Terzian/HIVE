// LoginForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../../components/organisms/loginForm';
import { UserContext } from '../../contexts/userContext';

jest.mock('../../API/loginRequest');  // Mock the API module

test('renders LoginForm, interacts with input and button', async () => {
    // Mock function from context
    const mockFetchUser = jest.fn();

    // Mock user context
    const mockUserContext = {
        fetchUser: mockFetchUser,
    };

    // Render the component, wrapping with necessary context providers and/or routers
    render(
        <UserContext.Provider value={mockUserContext}>
            <Router>
                <LoginForm />
            </Router>
        </UserContext.Provider>
    );

    // Assertion: Check if "HIVE" is in the document
    const mainTitle = screen.getByText(/HIVE/i);
    expect(mainTitle).toBeInTheDocument();

    // Assertion: Check if "Enter Email or Phone" input field is in the document
    const credentialsInput = screen.getByLabelText(/Enter Email or Phone/i);
    expect(credentialsInput).toBeInTheDocument();

    // Interaction: Type in the "Enter Email or Phone" input field
    fireEvent.change(credentialsInput, { target: { value: 'user@example.com' } });

    // Assertion: Confirm the "Enter Email or Phone" input field value change
    expect(credentialsInput.value).toBe('user@example.com');

    // If you've implemented PasswordField to accept a "label" prop to create a label/placeholder, this should work.
    // If not, you may need to adapt this to find the field based on your actual implementation.
    const passwordInput = screen.getByLabelText(/Enter Password/i);
    expect(passwordInput).toBeInTheDocument();

    // Interaction: Type in the "Enter Password" input field
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assertion: Confirm the "Enter Password" input field value change
    expect(passwordInput.value).toBe('password123');

    // Interaction: Click on the "Log In" button
    const button = screen.getByText(/Log In/i);
    expect(button).toBeInTheDocument();
});
