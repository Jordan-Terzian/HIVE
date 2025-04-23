import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordField from '../../components/molecules/passwordField';

describe('PasswordField', () => {
    it('renders with the correct label', () => {
        render(<PasswordField label="Password" />);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('toggles the password visibility when the icon button is clicked', () => {
        render(<PasswordField label="Password" />);
        const visibilityButton = screen.getByLabelText('toggle password visibility');

        // Initially, the password field should be of type "password"
        expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');

        // Click the visibility toggle button
        fireEvent.click(visibilityButton);

        // Now, the password field should be of type "text"
        expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');

        // Click the visibility toggle button again
        fireEvent.click(visibilityButton);

        // The password field should be of type "password" again
        expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    it('has the correct aria-label on the icon button', () => {
        render(<PasswordField label="Password" />);
        expect(screen.getByLabelText('toggle password visibility')).toBeInTheDocument();
    });
});
