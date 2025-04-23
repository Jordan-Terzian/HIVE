import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBy from '../../components/organisms/filterBar';

describe('FilterBy', () => {
    const mockProps = {
        selectedCountry: '',
        setSelectedCountry: jest.fn(),
        selectedRating: 0,
        setSelectedRating: jest.fn(),
        selectedSubject: '',
        setSelectedSubject: jest.fn()
    };

    it('renders without crashing', () => {
        render(<FilterBy {...mockProps} />);
        expect(screen.getByText('Filter By:')).toBeInTheDocument();
    });
});
