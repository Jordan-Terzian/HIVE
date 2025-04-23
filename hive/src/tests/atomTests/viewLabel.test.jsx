import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ViewLabel from '../../components/atoms/viewLabel';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ViewLabel', () => {

  const renderWithRouter = (ui, options) => {
    return render(ui, { wrapper: Router, ...options });
  };

  it('renders the CustomButton', () => {
    const { getByText } = renderWithRouter(<ViewLabel />);
    expect(getByText('View')).toBeInTheDocument();
  });

  it('triggers onShowAppointmentForm when CustomButton is clicked', () => {
    const onShowMock = jest.fn();
    const { getByText } = renderWithRouter(<ViewLabel onShowAppointmentForm={onShowMock} />);
    fireEvent.click(getByText('View'));
    expect(onShowMock).toHaveBeenCalledTimes(1);
  });

  it('renders TutorNotificationStudentDetail when isAppointmentFormVisible is true', () => {
    const mockAppointment = {}; // Add mock data as necessary
    const { getByText } = renderWithRouter(<ViewLabel isAppointmentFormVisible={true} appointment={mockAppointment} />);
    expect(getByText('Accept')).toBeInTheDocument(); 
  });

});
