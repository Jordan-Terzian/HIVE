import React from 'react';
import { render, screen, act } from '@testing-library/react';
import OpenReportCard from '../../components/molecules/openReportCard';
import FetchReportMembers from "../../API/fetchReportMembers";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../API/fetchReportMembers');  // Mock the FetchReportMembers API call

describe('OpenReportCard', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays report details correctly', async () => {
        const mockReport = {
            id: 1,
            reason: 'Inappropriate Content',
            reporter: '123',
            reportee: '456'
        };
        
        const mockReporter = {
            first_name: 'John',
            last_name: 'Doe'
        };
        
        const mockReportee = {
            first_name: 'Jane',
            last_name: 'Doe'
        };

        FetchReportMembers.mockImplementation((id) => {
            if (id === '123') return Promise.resolve(mockReporter);
            if (id === '456') return Promise.resolve(mockReportee);
            return Promise.reject('User not found');
        });

        await act(async () => {
            render(
              <Router>
                <OpenReportCard report={mockReport} />
              </Router>
            );
        });

        expect(screen.getByText('Inappropriate Content')).toBeInTheDocument();
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('View Report')).toBeInTheDocument();
    });
});
