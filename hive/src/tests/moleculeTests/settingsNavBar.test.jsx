import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsNavBar from '../../components/molecules/settingsNavBar';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('SettingsNavBar', () => {
  // Mocking navigate function from 'react-router-dom'
  const navigateMock = jest.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
    localStorage.clear();
    navigateMock.mockClear();
  });

  it('renders SettingsNavBar with activeSubItem and role as Student', () => {
    render(<SettingsNavBar activeSubItem="Edit Personal Details" user={{ role: 'Student' }} />);
    expect(screen.getByText('Edit Personal Details')).toHaveStyle({ fontWeight: 'bold' });
    expect(screen.getByText('Edit Location Details')).toHaveStyle({ fontWeight: 'normal' });
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  it('renders different items based on user roles', () => {
    render(<SettingsNavBar activeSubItem="Edit Personal Details" user={{ role: 'Admin' }} />);
    expect(screen.queryByText('Edit Academic Details')).not.toBeInTheDocument();
    expect(screen.getByText('Delete Account')).toBeInTheDocument();
  });

  it('navigates to the correct route when an item is clicked', () => {
    render(<SettingsNavBar activeSubItem="Edit Personal Details" user={{ role: 'Student' }} />);
    fireEvent.click(screen.getByText('Edit Location Details'));
    expect(navigateMock).toHaveBeenCalledWith('/settings/edit-location-details');
  });

  it('has distinctive style for Delete Account item', () => {
    render(<SettingsNavBar activeSubItem="Edit Personal Details" user={{ role: 'Student' }} />);
    expect(screen.getByText('Delete Account')).toHaveStyle({ color: '#EA6565' });
  });
});
