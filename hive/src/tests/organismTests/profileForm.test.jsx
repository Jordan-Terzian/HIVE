// ProfileDetailsForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileDetailsForm from '../../components/organisms/profileForm';
import { UserContext } from '../../contexts/userContext';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders ProfileDetailsForm, interacts with input and button', async () => {
  // Mock function from context
  const mockFetchUser = jest.fn();

  // Mock user context
  const mockUserContext = {
    fetchUser: mockFetchUser,
  };

  // Mock props to pass into the component
  const mockProps = {
    user: {
      bio: 'Biography text',
      profile_picture: null,  // Provide a URL if needed for testing
      tutor_details: {
        price_per_hour: 50,
      },
    },
    registerDetails: {
      role: 'Tutor',
      selectedSubjects: [],
    },
    label: 'Save',
  };

  // Render the component, wrapping with necessary context providers and/or routers
  render(
    <UserContext.Provider value={mockUserContext}>
      <Router>
        <ProfileDetailsForm {...mockProps} showMainTitle={true} showTitles={true} />
      </Router>
    </UserContext.Provider>
  );

  // Assertion: Check if "Profile Details" is in the document
  const mainTitle = screen.getByText(/Profile Details/i);
  expect(mainTitle).toBeInTheDocument();

  // Assertion: Check if "Bio" input field is in the document
  const bioInput = screen.getByLabelText(/Bio/i);
  expect(bioInput).toBeInTheDocument();

  // Interaction: Type in the "Bio" input field
  fireEvent.change(bioInput, { target: { value: 'New Biography Text' } });

  // Assertion: Confirm the "Bio" input field value change
  expect(bioInput.value).toBe('New Biography Text');

  // Assertion: Check if "Price Per Hour" input field is in the document
  const priceInput = screen.getByLabelText(/Price Per Hour/i);
  expect(priceInput).toBeInTheDocument();

  // Interaction: Type in the "Price Per Hour" input field
  fireEvent.change(priceInput, { target: { value: '$60' } });

  // Assertion: Confirm the "Price Per Hour" input field value change
  expect(priceInput.value).toBe('$60');

  // If your component does API calls or other side effects on button press, you'll want to mock those
  // For example:
  jest.mock('../../API/validateAndCreateCourses');
  jest.mock('../../API/registerRequest');
  jest.mock('../../API/updateUserProfile');

  // Interaction: Click on the "Save" button
  const button = screen.getByText(/Save/i);
  fireEvent.click(button);

  // Additional assertions could check for mock function calls, navigation, etc...
});
