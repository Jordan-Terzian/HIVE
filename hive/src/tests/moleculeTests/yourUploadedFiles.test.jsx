import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import YourUploadedFilesSection from '../../components/molecules/yourUploadedFiles';
import TutorDocumentDelete from '../../API/tutorDocumentDelete';

// Mocking the API call
jest.mock('../../API/tutorDocumentDelete', () => jest.fn());

// Sample file data
const existingFilesSample = [
    { id: '1', document_name: 'File1', file: 'file1.pdf' },
    { id: '2', document_name: 'File2', file: 'file2.pdf' },
];

test('renders without crashing', () => {
    render(<YourUploadedFilesSection existingFiles={[]} fetchUser={jest.fn()} />);
});

test('displays message when no files are uploaded', () => {
    render(<YourUploadedFilesSection existingFiles={[]} fetchUser={jest.fn()} />);
    expect(screen.getByText('No files have been uploaded yet.')).toBeInTheDocument();
});

test('lists files and controls when files are uploaded', () => {
    render(<YourUploadedFilesSection existingFiles={existingFilesSample} fetchUser={jest.fn()} />);
    existingFilesSample.forEach((file, index) => {  // Added index here
        expect(screen.getByText(file.document_name)).toBeInTheDocument();
        expect(screen.getAllByText('View')[index]).toHaveAttribute('href', file.file);
    });
    expect(screen.getAllByLabelText('Delete')).toHaveLength(existingFilesSample.length);
});

test('deletes file when delete icon is clicked', async () => {
    const fetchUserMock = jest.fn();
    render(<YourUploadedFilesSection existingFiles={existingFilesSample} fetchUser={fetchUserMock} />);

    fireEvent.click(screen.getAllByLabelText('Delete')[0]);

    await waitFor(() => {
        expect(TutorDocumentDelete).toHaveBeenCalledWith(existingFilesSample[0].id);
        expect(fetchUserMock).toHaveBeenCalled();
    });
});
