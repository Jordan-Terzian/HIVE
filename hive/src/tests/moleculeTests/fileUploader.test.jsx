import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUploader from '../../components/molecules/fileUploader';

describe('FileUploader', () => {
  it('renders the file input and browse button', () => {
    render(<FileUploader files={[]} setFiles={jest.fn()} />);
    expect(screen.getByLabelText('Browse Files')).toBeInTheDocument();
    expect(screen.getByText('Choose files to upload')).toBeInTheDocument();
  });

  it('adds selected files to the file list', () => {
    const setFilesMock = jest.fn();
    render(<FileUploader files={[]} setFiles={setFilesMock} />);
    const fileInput = screen.getByLabelText('Browse Files');
    const file1 = new File(['content'], 'file1.pdf', { type: 'application/pdf' });
    const file2 = new File(['content'], 'file2.pdf', { type: 'application/pdf' });
    userEvent.upload(fileInput, [file1, file2]);

    // Check that setFilesMock was called with a function
    expect(setFilesMock).toHaveBeenCalledWith(expect.any(Function));

    // Get the updater function that was passed to setFilesMock
    const updaterFunction = setFilesMock.mock.calls[0][0];

    // Call the updater function with an empty array to simulate the initial state
    const newFiles = updaterFunction([]);

    // Check that the updater function returns the expected new state
    expect(newFiles).toEqual(expect.arrayContaining([file1, file2]));
  });

  it('removes a file from the list when the remove button is clicked', () => {
    const setFilesMock = jest.fn();
    const file = new File(['content'], 'file.pdf', { type: 'application/pdf' });
    render(<FileUploader files={[file]} setFiles={setFilesMock} />);
    userEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Check that setFilesMock was called with a function
    expect(setFilesMock).toHaveBeenCalledWith(expect.any(Function));

    // Get the updater function that was passed to setFilesMock
    const updaterFunction = setFilesMock.mock.calls[0][0];

    // Call the updater function with an array containing the file to simulate the initial state
    const newFiles = updaterFunction([file]);

    // Check that the updater function returns the expected new state
    expect(newFiles).toEqual([]);
  });

  it('renders selected files in the file list container', () => {
    const file = new File(['content'], 'file.pdf', { type: 'application/pdf' });
    render(<FileUploader files={[file]} setFiles={jest.fn()} />);
    expect(screen.getByText('file.pdf')).toBeInTheDocument();
  });
});
