import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImagePicker from '../../components/molecules/imagePicker';

global.URL.createObjectURL = jest.fn();

describe('ImagePicker', () => {
  let setSelectedFileMock, setSelectedFileBlobUrlMock, onFileSelectedMock;

  beforeEach(() => {
    setSelectedFileMock = jest.fn();
    setSelectedFileBlobUrlMock = jest.fn();
    onFileSelectedMock = jest.fn();

    // Reset mock function
    global.URL.createObjectURL.mockReset();
  });

  it('renders the image, Browse Files button, and file name text', () => {
    render(<ImagePicker />);
    expect(screen.getByRole('button', {name: /browse files/i})).toBeInTheDocument();
    expect(screen.getByText(/no file chosen/i)).toBeInTheDocument();
    expect(screen.getByAltText(/profile/i)).toBeInTheDocument();
  });

  it('displays the selected file name and updates the image source when a file is selected', () => {
    global.URL.createObjectURL.mockReturnValue('blob:fakeImageBlobUrl');

    render(
      <ImagePicker 
        setSelectedFile={setSelectedFileMock} 
        setSelectedFileBlobUrl={setSelectedFileBlobUrlMock}
        onFileSelected={onFileSelectedMock}
      />
    );

    const file = new File(['image-content'], 'image.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Browse Files', { selector: 'input' });
    userEvent.upload(fileInput, file);

    expect(setSelectedFileMock).toHaveBeenCalledWith(file);
    expect(setSelectedFileBlobUrlMock).toHaveBeenCalledWith('blob:fakeImageBlobUrl');
    expect(onFileSelectedMock).toHaveBeenCalledWith(file);
    expect(screen.getByText('image.png')).toBeInTheDocument();
  });

  it('displays the default image when no file is selected', () => {
    render(<ImagePicker />);
    const image = screen.getByAltText('Profile');
    expect(image.src).toContain('/assets/images/default.jpeg');
  });
});
