import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'; // Needed for the 'useNavigate' hook
import TermsConditionsContent from '../../components/molecules/termsConditionsContent';

describe('<TermsConditionsContent />', () => {

  it('renders the component correctly', () => {
    render(<TermsConditionsContent />, { wrapper: MemoryRouter });

    // Check for title
    expect(screen.getByText('Hive Terms and Conditions')).toBeInTheDocument();

    // Check for specific sections
    expect(screen.getByText('Conditions of Use')).toBeInTheDocument();
    
  });

});

