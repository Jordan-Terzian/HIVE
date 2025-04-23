import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportReasonPicker from '../../components/molecules/reportReasonPicker';

describe('<ReportReasonPicker />', () => {
    const mockSetSelectedReason = jest.fn();
    const reasonOptions = [
        { label: 'Case of Harrassment', value: 'Case of Harrassment' },
    ];

    beforeEach(() => {
        render(
            <ReportReasonPicker
                selectedReason={null}
                setSelectedReason={mockSetSelectedReason}
            />
        );
    });

    it('renders the component with placeholder', () => {
        expect(screen.getByText("Select Reason")).toBeInTheDocument();
    });

    it('displays the correct reason options when clicked', () => {
        userEvent.click(screen.getByText("Select Reason"));
        reasonOptions.forEach(reason => {
            expect(screen.getByText(reason.label)).toBeInTheDocument();
        });
    });

    it('handles input changes correctly', () => {
        userEvent.click(screen.getByText("Select Reason"));
        userEvent.click(screen.getByText("Case of Harrassment"));
        expect(mockSetSelectedReason).toHaveBeenCalledWith({
            label: 'Case of Harrassment',
            value: 'Case of Harrassment'
        });
    });

});
