import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ErrorNotification from '../../components/molecules/errorNotificaton';

// Mock navigate
const mockNavigate = jest.fn();

// Mock useNavigate hook from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ErrorNotification', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ErrorNotification component', () => {
    const { getByText } = render(<ErrorNotification />);
    // Check for the "PAGE NOT FOUND!" message
    expect(getByText('PAGE NOT FOUND!')).toBeInTheDocument();
    // Check for the "Sorry, the page you are looking for cannot be found." message
    expect(getByText('Sorry, the page you are looking for cannot be found.')).toBeInTheDocument();
  });

  it('navigates to login page when "Back To Login" button is clicked', () => {
    const { getByText } = render(<ErrorNotification />);
    const backButton = getByText('Back To Login >');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
