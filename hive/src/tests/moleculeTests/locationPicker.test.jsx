import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationPicker from '../../components/molecules/locationPicker';

describe('LocationPicker', () => {

    it('renders the LocationPicker component', () => {
        const { getByText } = render(
            <LocationPicker selectedLocation={null} setSelectedLocation={() => {}} />
        );

        // Check if placeholder exists
        expect(getByText('Select a Location/Platform')).toBeInTheDocument();
    });

    it('displays all location options', () => {
        const { getByText } = render(
            <LocationPicker selectedLocation={null} setSelectedLocation={() => {}} />
        );

        const select = getByText('Select a Location/Platform').parentElement;
        fireEvent.keyDown(select, { keyCode: 40 }); // Arrow Down to open the dropdown

        expect(getByText('Zoom')).toBeInTheDocument();
        expect(getByText('Teams')).toBeInTheDocument();
        expect(getByText('My Address')).toBeInTheDocument();
    });

    it('selecting a location updates the selectedLocation', () => {
        const mockSetSelectedLocation = jest.fn();

        const { getByText } = render(
            <LocationPicker selectedLocation={null} setSelectedLocation={mockSetSelectedLocation} />
        );

        const select = getByText('Select a Location/Platform').parentElement;
        fireEvent.keyDown(select, { keyCode: 40 }); // Arrow Down to open the dropdown

        fireEvent.click(getByText('Teams'));
        expect(mockSetSelectedLocation).toHaveBeenCalledWith({ label: 'Teams', value: 'Teams' });
    });

});
