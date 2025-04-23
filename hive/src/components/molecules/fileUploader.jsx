// FileUploader.js
import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

// File uploaded for tutors and reports to upload supporting documents
const FileUploader = ({ files, setFiles, ...props }) => {
    const handleFileInput = (event) => {
        setFiles(prevFiles => [...prevFiles, ...event.target.files]);
    };

    // Logic to remove a file from the list of files
    const handleRemoveFile = (index) => () => {
        setFiles(prevFiles => prevFiles.filter((_, fileIndex) => fileIndex !== index));
    };

    return (
        <Box marginBottom="16px">
            <Box display="flex" alignItems="center" marginBottom="8px">
                <Box
                    flexGrow={1}
                    border={1}
                    borderColor="grey.400"
                    borderRadius="4px"
                    padding="12px"
                    marginRight="16px"
                    style={{ overflowY: 'auto', maxHeight: '100px' }} // Adjust maxHeight to control the height of the container
                >
                    {files.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            {props.report ? "Upload Supporting Documents" : "Choose files to upload"}
                        </Typography>
                    ) : (
                        files.map((file, index) => (
                            <Box key={index} display="flex" alignItems="center" marginBottom="4px">
                                <Typography variant="body2" style={{ flexGrow: 1 }}>{file.name}</Typography>
                                <IconButton size="small" onClick={handleRemoveFile(index)} aria-label="Delete">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))
                    )}
                </Box>
                <input
                    accept=".pdf"
                    style={{ display: 'none' }}
                    id="file-uploader"
                    type="file"
                    multiple
                    onChange={handleFileInput}
                />
                <label htmlFor="file-uploader">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ width: '120px', height: '45px', fontSize: '11px' }}  // Fixed width to prevent resizing
                    >
                        Browse Files
                    </Button>
                </label>
            </Box>
        </Box>
    );
};

export default FileUploader;
