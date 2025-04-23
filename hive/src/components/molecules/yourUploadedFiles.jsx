import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import TutorDocumentDelete from '../../API/tutorDocumentDelete';

const YourUploadedFilesSection = ({ existingFiles, fetchUser, ...props }) => {

    const handleDelete = async (fileId) => {
        await TutorDocumentDelete(fileId);
        await fetchUser();
    };
    // Check if user is admin
    const isAdmin = localStorage.getItem('role') === 'Admin';

    return (
        <Box marginTop="16px" marginBottom="16px">
            <Box
                border={1}
                borderColor="grey.400"
                borderRadius="4px"
                padding="12px"
                overflowy="auto"
                maxHeight="150px"
                marginBottom="16px"
            >
                {/* If no files */}
                {existingFiles?.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                        No files have been uploaded yet.
                    </Typography>
                ) : (
                    existingFiles?.map((file) => (
                        <Box key={file.id} display="flex" alignItems="center" marginBottom="4px">
                            <Typography variant="body2" style={{ flexGrow: 1 }}>
                                {file.document_name}
                            </Typography>
                            {/* If use is admin display just the files with no delete button, if the user comes from the tutor page, display url differently*/}
                            {isAdmin ? (
                                <a href={props.tutorProfilePage && isAdmin ? `http://127.0.0.1:8000${file.file}` : file.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginRight: '8px' }}>
                                    View
                                </a>
                            ) : (
                                <a href={file.file} target="_blank" rel="noopener noreferrer" style={{ marginRight: '8px' }}>
                                    View
                                </a>
                            )}
                            {/* If is not admin, show the delete icon for files */}
                            {!isAdmin ? (
                                <IconButton size="small" onClick={() => handleDelete(file.id)} aria-label="Delete">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                <></>
                            )}
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default YourUploadedFilesSection;
