import React from 'react';
import { Box, Typography } from '@mui/material';
import { CountryPicker } from '../molecules/countryPicker';
import RatingPicker from '../molecules/ratingPicker';
import SubjectPickerSingle from '../molecules/subjectPickerSingle';

// Filter By Component
const FilterBy = ({ selectedCountry, setSelectedCountry, selectedRating, setSelectedRating, selectedSubject, setSelectedSubject  }) => {
    return (
        <Box display="flex" alignItems="center" width="100%">
            <Typography variant="h6" style={{ marginRight: '16px' }}>Filter By:</Typography>
            <Box flex={1}>
                <CountryPicker country={selectedCountry} setCountry={setSelectedCountry} FindTutors={true} />
            </Box>
            <Box flex={1}>
                <RatingPicker rating={selectedRating} setRating={setSelectedRating}/>
            </Box>
            <Box flex={1}>
                <SubjectPickerSingle selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>
            </Box>
        </Box>
    );
};

export default FilterBy;
