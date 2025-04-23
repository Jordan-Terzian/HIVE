import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TimePickerComponent from '../../components/molecules/timePicker';

describe('<TimePickerComponent />', () => {

  // 1. Testing the labels display correctly
  it('displays the labels', () => {
    render(
      <TimePickerComponent startLabel="Custom Start" endLabel="Custom End" />
    );

    expect(screen.getByLabelText("Custom Start")).toBeInTheDocument();
    expect(screen.getByLabelText("Custom End")).toBeInTheDocument();
  });

  // 2. Testing the onChangeStart and onChangeEnd handlers
  it('calls the appropriate handlers when the time is changed', () => {
    const mockOnChangeStart = jest.fn();
    const mockOnChangeEnd = jest.fn();

    render(
      <TimePickerComponent 
        onChangeStart={mockOnChangeStart}
        onChangeEnd={mockOnChangeEnd}
      />
    );

    // Simulating the change for start time
    fireEvent.change(screen.getByLabelText("Start Time"), {
      target: { value: '12:00' }
    });
    expect(mockOnChangeStart).toHaveBeenCalled();

    // Simulating the change for end time
    fireEvent.change(screen.getByLabelText("End Time"), {
      target: { value: '13:00' }
    });
    expect(mockOnChangeEnd).toHaveBeenCalled();
  });
});
