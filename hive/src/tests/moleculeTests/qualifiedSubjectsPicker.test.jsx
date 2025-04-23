import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QualifiedSubjectsPicker from '../../components/molecules/qualifiedSubjectsPicker';

describe('QualifiedSubjectsPicker Component', () => {

    const mockSetSelectedSubjects = jest.fn();

    beforeEach(() => {
        render(
            <QualifiedSubjectsPicker
                setSelectedSubjects={mockSetSelectedSubjects}
                selectedSubjects={null}
                courseOptions={[{ value: 'math', label: 'Mathematics' }, { value: 'sci', label: 'Science' }]}
            />
        );
    });

    it('renders without crashing', () => {
        const placeholderElement = screen.getByText("Select a subject...");
        expect(placeholderElement).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        // Open the dropdown
        const selectElement = screen.getByRole('combobox');
        fireEvent.mouseDown(selectElement);

        // Click on an option
        const optionElement = screen.getByText('Mathematics');
        fireEvent.click(optionElement);

        expect(mockSetSelectedSubjects).toHaveBeenCalledWith({ value: 'math', label: 'Mathematics' });
    });

});
