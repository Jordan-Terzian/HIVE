import React from 'react';
import Select from 'react-select';
import { getNames, getCodes } from 'country-list';
import emojiFlags from 'emoji-flags';
import { FormControl } from '@mui/material';
import CustomPickerStyles from '../../styles/customerPickerStyle';

// Get the list of countries from country-list library
const CountryData = getNames().map((country, index) => {
    const countryCode = getCodes()[index];
    const flagEmoji = emojiFlags.countryCode(countryCode).emoji;
    return { label: `${flagEmoji} ${country}`, value: country };
});
const CountryPicker = ({ country, setCountry, FindTutors, ...props }) => {
    return (
        <FormControl fullWidth={!FindTutors} style={FindTutors ? { width: "60%" } : {}}>
            <Select
                value={country}
                onChange={selectedOption => setCountry(selectedOption)}
                options={CountryData}
                placeholder="Select a country"
                menuPortalTarget={document.body}
                styles={CustomPickerStyles}
                isClearable={!!FindTutors}  // Conditionally setting isClearable based on FindTutors prop
            />
        </FormControl>
    );
};

// Exporting countryData so that it can be used in LocationDetailsForm
export { CountryPicker, CountryData };
