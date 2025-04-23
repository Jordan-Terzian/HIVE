import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import NavBar from '../../components/molecules/navBar';
import { useNavigate } from 'react-router-dom';

// Mocking the necessary modules and functions
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

// Test Suite for NavBar component
describe('NavBar', () => {
  
  // Resetting all mocks after each test to avoid conflicts
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders NavBar with provided user role and activeItem', () => {
    useNavigate.mockReturnValue(jest.fn());
    render(<NavBar activeItem="Dashboard" user={{ role: 'Student' }} />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders different items based on user roles', () => {
    useNavigate.mockReturnValue(jest.fn());
    render(<NavBar activeItem="Reports" user={{ role: 'Admin' }} />);
    expect(screen.getByText('Reports')).toBeInTheDocument();
    
    cleanup();
    render(<NavBar activeItem="Dashboard" user={{ role: 'Student' }} />);
    expect(screen.getByText('Find Tutors')).toBeInTheDocument();
  });

  it('navigates to the correct route when an item is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(<NavBar activeItem="Dashboard" user={{ role: 'Student' }} />);
    fireEvent.click(screen.getByText('Dashboard'));
    expect(navigateMock).toHaveBeenCalledWith('/home/dashboard');
  });

  it('highlights the active item', () => {
    useNavigate.mockReturnValue(jest.fn());

    render(<NavBar activeItem="Dashboard" user={{ role: 'Student' }} />);
    // Depending on your CSS application method, testing for styles might need a different approach.
    // If this test doesn't work, it might be due to the applied CSS method (like styled-components, CSS modules, etc.)
    expect(screen.getByText('Dashboard')).toHaveStyle({ fontWeight: 'bold' });
  });
});
