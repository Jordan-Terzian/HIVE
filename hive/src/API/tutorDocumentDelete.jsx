// deleteFileApiCall.js

const TutorDocumentDelete = async (documentId) => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/profile/tutor/documents/remove/${documentId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
        });

        // Handle HTTP response status
        if (response.status === 204) {
            console.log('File deleted successfully');
            return true;
        } else if (response.status === 404) {
            console.log('File not found');
            return false;
        } else {
            console.log('An error occurred while deleting the file');
            return false;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
};

export default TutorDocumentDelete;
