const UploadReportDocuments = async (reportId, files) => {
    const url = `http://127.0.0.1:8000/profile/report/${reportId}/documents/add`;

    const formData = new FormData();
    files.forEach(file => {
        formData.append('file', file);
        formData.append('document_name', file.name)
    });

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    };

try {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorBody = await response.text(); // or response.json() if the server sends JSON
        throw new Error(`Failed to upload documents: ${response.statusText}. Details: ${errorBody}`);
    }

} catch (error) {
    console.error(error.message);
}
};

export default UploadReportDocuments;
