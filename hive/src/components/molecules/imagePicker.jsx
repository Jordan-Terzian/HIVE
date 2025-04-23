import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const ImagePicker = ({ selectedFile, setSelectedFile, selectedFileBlobUrl, setSelectedFileBlobUrl, ...props }) => {
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setSelectedFileBlobUrl(blobUrl); // Set blob URL to state for image display
            setSelectedFile(file); // Set File object to state for later API usage
            setFileName(file.name);
            props.onFileSelected(file);
        }
    };

    return (
        <Box display="flex" alignItems="center" marginBottom="16px">
            <img
                src={selectedFileBlobUrl || '/assets/images/default.jpeg'}
                alt="Profile"
                style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '16px' }}
            />
            <Box display="flex" alignItems="center">
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleFileInput}
                />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" component="span">
                        Browse Files
                    </Button>
                </label>
                <Typography variant="body2" style={{ marginLeft: '8px' }}>
                    {fileName}
                </Typography>
            </Box>
        </Box>
    );
};


export default ImagePicker;