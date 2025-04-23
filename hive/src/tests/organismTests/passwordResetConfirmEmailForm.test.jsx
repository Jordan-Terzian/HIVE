import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PasswordResetConfirmEmailForm from '../../components/organisms/passwordResetConfirmEmailForm';

// Mocking the imported API call
jest.mock('../../API/passwordResetEmailConfirm', () => {
    return jest.fn(() => Promise.resolve({ data: 'Success' }));
});

describe('PasswordResetConfirmEmailForm', () => {
    const mockNavigate = jest.fn();

    // Mock the useNavigate hook from react-router-dom
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }));

    beforeEach(() => {
        render(
            <MemoryRouter>
                <PasswordResetConfirmEmailForm />
            </MemoryRouter>
        );
    });

    it('renders without crashing', () => {
        expect(screen.getByText('Find Your Account')).toBeInTheDocument();
    });

    it('updates the email input when typed into', () => {
        const emailInput = screen.getByLabelText('Enter Email');
        fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
        expect(emailInput.value).toBe('test@email.com');
    });

});
