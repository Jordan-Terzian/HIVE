import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AcademicYearPicker from '../../components/molecules/academicYearPicker';

describe('AcademicYearPicker', () => {
  it('renders the select dropdown', () => {
    const { getByText } = render(<AcademicYearPicker academicYear={null} setAcademicYear={jest.fn()} />);
    expect(getByText('Year of Schooling')).toBeInTheDocument();
  });

  it('renders the correct options', () => {
    const { getByText } = render(<AcademicYearPicker academicYear={null} setAcademicYear={jest.fn()} />);
    userEvent.click(getByText('Year of Schooling'));
    expect(getByText('Kindergarten')).toBeInTheDocument();
    expect(getByText('University')).toBeInTheDocument();
  });

  it('calls setAcademicYear with the selected option when a new option is selected', () => {
    const setAcademicYearMock = jest.fn();
    const { getByText } = render(<AcademicYearPicker academicYear={null} setAcademicYear={setAcademicYearMock} />);
    userEvent.click(getByText('Year of Schooling'));
    userEvent.click(getByText('Kindergarten'));
    expect(setAcademicYearMock).toHaveBeenCalledWith({ label: 'Kindergarten', value: 'Kindergarten' });
  });

  it('uses the academicYear prop as the value of the Select component', () => {
    const { getByText } = render(<AcademicYearPicker academicYear={{ label: 'Year 2', value: 'Year 2' }} setAcademicYear={jest.fn()} />);
    expect(getByText('Year 2')).toBeInTheDocument();
  });
});
