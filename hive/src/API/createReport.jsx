import UploadReportDocuments from "./uploadReportDocuments";

const CreateReport = async (reporter, reportee, selectedReason, explanation, files) => {
    const url = `http://127.0.0.1:8000/profile/report/${reportee.email}/`;
    
    const payload = {
        reporter: reporter.id,
        reportee: reportee.id,
        reason: selectedReason,
        explanation,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to submit report: ${response.statusText}`);
        }

        const data = await response.json();

        await UploadReportDocuments(data.id, files);
    } catch (error) {
        console.error(error.message);
    }
};

export default CreateReport;
