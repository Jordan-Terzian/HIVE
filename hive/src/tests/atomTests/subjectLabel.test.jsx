import React from 'react';
import { render } from '@testing-library/react';
import SubjectLabel from '../../components/atoms/subjectLabel';

describe('SubjectLabel', () => {
    it('renders the provided text', () => {
        const { getByText } = render(<SubjectLabel text="Math" />);
        expect(getByText('Math')).toBeInTheDocument();
    });

    it('has the correct styles', () => {
        const { getByText } = render(<SubjectLabel text="Math" />);
        const labelBox = getByText('Math').closest('div'); // Box is rendered as div by MUI
        expect(labelBox).toHaveStyle({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 10px 4px 10px',
            borderRadius: '50px',
            background: 'linear-gradient(45deg, #FFC52A 0%, #9747FF 100%)',
        });
    });

    it('typography has correct styles', () => {
        const { getByText } = render(<SubjectLabel text="Math" />);
        const typography = getByText('Math');

        const computedStyles = window.getComputedStyle(typography);

        expect(computedStyles.color).toBe('white');
        expect(computedStyles.fontSize).toBe('12px');
        expect(computedStyles.fontWeight).toBe('700');
    });
});
