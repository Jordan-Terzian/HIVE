import React, { useState, useEffect } from 'react';
import Select from 'react-select/creatable';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

const SubjectPicker = ({ setSelectedSubjects, defaultSubjects = []  }) => {
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [selectedSubjects, _setSelectedSubjects] = useState(defaultSubjects);

    // Synchronize external and internal state for selected subjects
    useEffect(() => {
        _setSelectedSubjects(defaultSubjects);
    }, [defaultSubjects]);

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

    const handleInputChange = (inputValue, actionMeta) => {
        let newSelectedSubjects = inputValue || [];
    
        if (actionMeta.action === 'create-option') {
            const newSubject = inputValue[inputValue.length - 1]; // Grab the last subject in the inputValue (the new one)
            newSelectedSubjects = [...selectedSubjects, newSubject];
        }
    
        _setSelectedSubjects(newSelectedSubjects);
        setSelectedSubjects(newSelectedSubjects);
    };

    return (
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <Select
                isClearable
                isMulti
                options={subjectOptions}
                value={selectedSubjects}
                onChange={handleInputChange}
                placeholder="Select or type a subject..."
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default SubjectPicker;
