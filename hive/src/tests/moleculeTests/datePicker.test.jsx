import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../../components/molecules/datePicker';

describe('DatePicker', () => {
  it('renders the MobileDatePicker with the correct label and placeholder', () => {
    const { getByLabelText, getByPlaceholderText } = render(<DatePicker label="Select date" />);
    expect(getByLabelText('Select date')).toBeInTheDocument();
    expect(getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument();
  });

  it('calls onChange with the selected date when a new date is selected', async () => {
    const onChangeMock = jest.fn();
    render(<DatePicker label="Select date" onChange={onChangeMock} />);
    const inputElement = screen.getByLabelText('Select date');
    await userEvent.type(inputElement, '15/10/2023{enter}');
    expect(onChangeMock).toHaveBeenCalled();
  });



  it('uses the value prop as the value of the MobileDatePicker component', () => {
    const dateValue = new Date('2023-10-15T00:00:00.000Z');
    const { getByDisplayValue } = render(<DatePicker label="Select date" value={dateValue} />);
    expect(getByDisplayValue('15/10/2023')).toBeInTheDocument();
  });
});
