
const CustomPickerStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '56px',
        borderColor: state.isFocused ? 'black' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
        '&:hover': {
            borderColor: 'black',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : provided.color,
        backgroundColor: state.isSelected ? 'black' : provided.backgroundColor,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(0, 0, 0, 0.6)',
    }),
};

export default CustomPickerStyles;