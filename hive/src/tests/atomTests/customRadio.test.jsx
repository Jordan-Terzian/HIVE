import { render, fireEvent, screen } from '@testing-library/react';
import CustomRadioButton from '../../components/atoms/customRadio';

test('renders without crashing', () => {
    render(<CustomRadioButton label="Test Radio" value="testValue" selectedValue="" onChange={() => {}} />);
});

test('displays the correct label', () => {
    render(<CustomRadioButton label="Test Radio" value="testValue" selectedValue="" onChange={() => {}} />);
    expect(screen.getByText('Test Radio')).toBeInTheDocument();
});

test('checked radio has correct style', () => {
    render(<CustomRadioButton label="Test Radio" value="testValue" selectedValue="testValue" onChange={() => {}} />);
    expect(screen.getByRole('radio')).toHaveClass('PrivateSwitchBase-input css-1m9pwf3');
});

test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<CustomRadioButton label="Test Radio" value="testValue" selectedValue="" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalled();
});


