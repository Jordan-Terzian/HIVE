import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingPicker from '../../components/molecules/ratingPicker';

describe('<RatingPicker />', () => {

    it('renders without crashing', () => {
        render(<RatingPicker />);
    });

    it('calls setRating with correct value when an option is selected', () => {
        const mockSetRating = jest.fn();
        render(<RatingPicker setRating={mockSetRating} />);
        userEvent.click(screen.getByText("Select a rating"));
        userEvent.click(screen.getByText("★★★★★ (5 stars)"));
        expect(mockSetRating).toHaveBeenCalledWith({ label: "★★★★★ (5 stars)", value: 5 });
    });

    it('shows the correct selected rating', () => {
        render(<RatingPicker rating={{ label: "★★★☆☆ (3 stars)", value: 3 }} />);
        expect(screen.getByText("★★★☆☆ (3 stars)")).toBeInTheDocument();
    });

});
