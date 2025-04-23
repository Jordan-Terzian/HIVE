import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TutorAppointmentRespond from '../../components/organisms/tutorAppointmentRespond';

describe('TutorAppointmentRespond', () => {

  const mockFetchAppointments = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockFetchAppointments.mockClear();
    mockOnClose.mockClear();
  });

  it('renders "Cancel" and "Message" buttons for upcoming appointments', () => {
    render(
      <Router>
        <TutorAppointmentRespond appointment={{ id: 1, tutor: 'John' }} fetchAppointments={mockFetchAppointments} type="upcoming" onClose={mockOnClose} />
      </Router>
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('renders "Cancel" and "Message" buttons for active appointments', () => {
    render(
      <Router>
        <TutorAppointmentRespond appointment={{ id: 1, tutor: 'John' }} fetchAppointments={mockFetchAppointments} type="active" onClose={mockOnClose} />
      </Router>
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('renders "Decline" and "Accept" buttons for other appointments', () => {
    render(
      <Router>
        <TutorAppointmentRespond appointment={{ id: 1, tutor: 'John' }} fetchAppointments={mockFetchAppointments} type="other" onClose={mockOnClose} />
      </Router>
    );
    
    expect(screen.getByText('Decline')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

});
