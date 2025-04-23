import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportForm from '../../components/organisms/reportForm';
import CreateReport from '../../API/createReport';

// Mock the API calls
jest.mock('../../API/createReport');

describe('ReportForm', () => {
    const mockOnHide = jest.fn();
    const mockReporter = 'JohnDoe';
    const mockReportee = 'JaneDoe';

    beforeEach(() => {
        render(<ReportForm reporter={mockReporter} reportee={mockReportee} onHideReportForm={mockOnHide} />);
    });

    it('renders the ReportReasonPicker component', () => {
        // You might need to adjust this depending on how ReportReasonPicker is implemented
        const allExplanations = screen.getAllByText('Explanation');
        expect(allExplanations).toHaveLength(2);
    });

    it('updates the explanation field when typing', () => {
        const explanationInput = screen.getByLabelText('Explanation');
        userEvent.type(explanationInput, 'Test Explanation');
        expect(explanationInput.value).toBe('Test Explanation');
    });

});
