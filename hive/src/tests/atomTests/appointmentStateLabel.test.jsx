import React from 'react';
import { render } from '@testing-library/react';
import AppointmentStateLabel from '../../components/atoms/appointmentStateLabel';

describe('AppointmentStateLabel', () => {
  it('renders the provided text', () => {
    const { getByText } = render(<AppointmentStateLabel text="Confirmed" color="#123456" />);
    expect(getByText('Confirmed')).toBeInTheDocument();
  });

  it('sets typography color to white', () => {
    const { getByText } = render(<AppointmentStateLabel text="Confirmed" color="#123456" />);
    const labelElement = getByText('Confirmed');
    expect(labelElement).toHaveStyle({ color: 'white' });
  });
});
