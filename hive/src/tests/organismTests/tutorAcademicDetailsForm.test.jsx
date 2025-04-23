import { render, screen, fireEvent } from '@testing-library/react';
import TutorAcademicDetailsForm from '../../components/organisms/tutorAcademicDetailsForm';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';

// Mocks
jest.mock('../../API/getCoursesName', () => () => null);
jest.mock('../../API/editTutorAcademicDetails', () => jest.fn());
jest.mock('../../API/validateAndCreateCourses', () => jest.fn());
jest.mock('../../API/uploadTutorFile', () => jest.fn());
jest.mock('../../components/molecules/subjectPicker', () => () => null);
jest.mock('../../components/atoms/customButton', () => () => null);
jest.mock('../../components/molecules/fileUploader', () => () => null);
jest.mock('../../components/molecules/yourUploadedFiles', () => () => null);

// Test UserContext
const mockFetchUser = jest.fn();
const mockUserContext = {
    fetchUser: mockFetchUser,
    user: {
        tutor_details: {
            experience: 'Some experience',
            tutor_documents: []
        },
        courses: [],
    }
};

// Tests
describe('<TutorAcademicDetailsForm />', () => {
    test('renders without crashing', () => {
        render(
            <UserContext.Provider value={mockUserContext}>
                <Router>
                    <TutorAcademicDetailsForm label="Next" showMainTitle={true} />
                </Router>
            </UserContext.Provider>
        );
    });

    test('renders the main title when showMainTitle is true', () => {
        render(
            <UserContext.Provider value={mockUserContext}>
                <Router>
                    <TutorAcademicDetailsForm label="Next" showMainTitle={true} />
                </Router>
            </UserContext.Provider>
        );

        expect(screen.getByText(/Academic Details/i)).toBeInTheDocument();
    });

});
