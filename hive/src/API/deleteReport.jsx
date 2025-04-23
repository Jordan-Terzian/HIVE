const DeleteReport = async (reportId) => {
    const url = `http://127.0.0.1:8000/user/report/delete/${reportId}/`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.status;
    } catch (error) {
        console.error('There was an error deleting the report:', error);
    }
};

export default DeleteReport;
