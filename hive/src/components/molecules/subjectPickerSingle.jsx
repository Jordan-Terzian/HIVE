import React, { useState, useEffect } from 'react';
import Select from 'react-select/creatable';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

const SubjectPickerSingle = ({ selectedSubject, setSelectedSubject }) => {

    const [subjects, setSubjectOptions] = useState([]);

    useEffect(() => {
        // Fetch subjects from API on component mount
        fetch('http://127.0.0.1:8000/courses/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Map through the fetched data and set the state
                const fetchedSubjects = Object.values(data).map(subject => ({
                    label: subject,
                    value: subject,
                }));
                setSubjectOptions(fetchedSubjects);
            })
            .catch((error) => {
                console.error('Fetch error: ', error);
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    return (
        <FormControl style={{width: "60%"}} >
            <Select
                value={selectedSubject}
                isClearable
                onChange={selectedOption => setSelectedSubject(selectedOption)}
                options={subjects}
                placeholder="Select a subject"
                menuPortalTarget={document.body}
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default SubjectPickerSingle;
