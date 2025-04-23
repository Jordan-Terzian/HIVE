export const UploadTutorDocuments = async (files) => {
    if (!files || files.length === 0) {
        console.error("No files provided!");
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found!");
        return;
    }

    // Loop through each file and make a separate request for each.
    for (const file of files) {
        const formData = new FormData();
        formData.append('document_name', file.name);
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/profile/tutor/documents/add/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

        } catch (error) {
            console.error("An error occurred while uploading the file:", error);
        }
    }
}
