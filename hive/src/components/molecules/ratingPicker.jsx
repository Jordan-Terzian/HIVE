import React from 'react';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

// Rating Picker Component
const ratingData = [
    { label: "★★★★★ (5 stars)", value: 5 },
    { label: "★★★★☆ (4 stars)", value: 4 },
    { label: "★★★☆☆ (3 stars)", value: 3 },
    { label: "★★☆☆☆ (2 stars)", value: 2 },
    { label: "★☆☆☆☆ (1 star)", value: 1 },
    { label: "☆☆☆☆☆ (0 stars)", value: 0 }
];

const RatingPicker = ({ rating, setRating }) => {
    return (
        <FormControl style={{width: "60%"}} >
            <Select
                value={rating}
                isClearable
                onChange={selectedOption => setRating(selectedOption)}
                options={ratingData}
                placeholder="Select a rating"
                menuPortalTarget={document.body} 
                styles={CustomPickerStyles}
            />
        </FormControl>
    );
};

export default RatingPicker;
