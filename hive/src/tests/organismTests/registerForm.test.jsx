import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterForm from '../../components/organisms/registerForm';

describe('<RegisterForm />', () => {
    const setup = () => {
        const utils = render(
            <Router>
                <RegisterForm label="Proceed" showMainTitle={true} />
            </Router>
        );
        const button = utils.getByText(/Proceed/i);
        return {
            ...utils,
            button,
            history,
        };
    };

    test('renders correctly', () => {
        const { getByText } = setup();

        // Expect main title, label, and radio buttons to be in the document
        expect(getByText(/Register as/i)).toBeInTheDocument();
        expect(getByText(/Proceed/i)).toBeInTheDocument();
    });

    test('updates radio button value on selection', () => {
        const { getByLabelText } = setup();

        // Expect radio buttons to change the selected value when clicked
        fireEvent.click(getByLabelText(/Student/i));
        expect(getByLabelText(/Student/i)).toBeChecked();
        
        fireEvent.click(getByLabelText(/Tutor/i));
        expect(getByLabelText(/Tutor/i)).toBeChecked();
    });

});
