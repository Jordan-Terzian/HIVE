import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GenderPicker from '../../components/molecules/genderPicker';

describe('GenderPicker', () => {
  it('renders the radio buttons for gender selection', () => {
    render(<GenderPicker />);
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Other')).toBeInTheDocument();
  });

  it('calls onGenderChange when a gender is selected', () => {
    const onGenderChangeMock = jest.fn();
    render(<GenderPicker onGenderChange={onGenderChangeMock} />);
    fireEvent.click(screen.getByLabelText('Female'));
    expect(onGenderChangeMock).toHaveBeenCalledWith('Female');
  });

  it('shows the Specify text field when Other is selected', () => {
    render(<GenderPicker selectedGender="Other" />);
    expect(screen.getByLabelText('Specify')).toBeInTheDocument();
  });

  it('calls onOtherGenderChange when a value is entered in the Specify text field', () => {
    const onOtherGenderChangeMock = jest.fn();
    render(
      <GenderPicker
        selectedGender="Other"
        onOtherGenderChange={onOtherGenderChangeMock}
      />
    );
    fireEvent.change(screen.getByLabelText('Specify'), { target: { value: 'Non-binary' } });
    expect(onOtherGenderChangeMock).toHaveBeenCalledWith('Non-binary');
  });
});
