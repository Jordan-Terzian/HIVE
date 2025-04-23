import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountryPicker } from '../../components/molecules/countryPicker';

describe('CountryPicker', () => {
  it('renders the select dropdown', async () => {
    const { findByText } = render(<CountryPicker country={null} setCountry={jest.fn()} />);
    const placeholderElement = await findByText('Select a country');
    expect(placeholderElement).toBeInTheDocument();
  });

  it('renders the correct options with flag emojis', async () => {
    render(<CountryPicker country={null} setCountry={jest.fn()} />);
    
    const selectInput = screen.getByRole('combobox');
    userEvent.click(selectInput);
  
    await waitFor(() => {
      expect(screen.getByText(/🇺🇸 United States of America/)).toBeInTheDocument();
      expect(screen.getByText(/🇬🇧 United Kingdom/)).toBeInTheDocument();
    });
  });

  it('calls setCountry with the selected option when a new country is selected', async () => {
    const setCountryMock = jest.fn();
    render(<CountryPicker country={null} setCountry={setCountryMock} />);
    
    const selectInput = screen.getByRole('combobox');
    userEvent.click(selectInput);
    
    const option = await screen.findByText(/🇺🇸 United States of America/);
    userEvent.click(option);
  
    await waitFor(() => {
      expect(setCountryMock).toHaveBeenCalledWith({
        label: '🇺🇸 United States of America', 
        value: 'United States of America',
      });
    });
  });

  it('uses the country prop as the value of the Select component', () => {
    const { getByText } = render(<CountryPicker country={{ label: '🇬🇧 United Kingdom', value: 'United Kingdom' }} setCountry={jest.fn()} />);
    expect(getByText(/🇬🇧 United Kingdom/)).toBeInTheDocument();
  });
});
