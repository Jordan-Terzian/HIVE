import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PasswordResetEmailSentForm from '../../components/organisms/passwordResetEmailSentForm';

describe('PasswordResetEmailSentForm', () => {
    const mockNavigate = jest.fn();

    // Mock the useNavigate hook from react-router-dom
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }));

    beforeEach(() => {
        render(
            <MemoryRouter>
                <PasswordResetEmailSentForm />
            </MemoryRouter>
        );
    });

    it('renders without crashing', () => {
        expect(screen.getByText('Reset Password Email Sent')).toBeInTheDocument();
        expect(screen.getByText('The email you have entered exists in our system and a link to reset your password has been sent to the corresponding email. Please press the link and reset your password in privacy')).toBeInTheDocument();
    });
});
