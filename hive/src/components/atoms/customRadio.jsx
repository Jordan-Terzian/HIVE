import React from 'react';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

// a custom radio button for the role selection in the signup page

const StyledRadio = styled(Radio)(({ checked }) => ({
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: checked
        ? 'linear-gradient(45deg, #FFC52A 30%, #9747FF 90%)'
        : 'linear-gradient(45deg, #404040 30%, #000000 90%)',
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(45deg, #FFC52A 30%, #9747FF 90%)',
    },
    '&.Mui-checked': {
        '& .MuiSvgIcon-root': {
            display: 'none',
        },
    },
    '& .MuiSvgIcon-root': {
        display: 'none',
    }
}));

const CustomRadioButton = ({ selectedValue, onChange, label, ...props }) => {
    return (
        <div style={{ position: 'relative', width: '70%', marginBottom: '16px' }}>
            <StyledRadio
                checked={selectedValue === props.value}
                onChange={onChange}
                {...props}
            />
            <Typography
                variant="h6"
                align="center"
                style={{
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#fff'
                }}
            >
                {label}
            </Typography>
        </div>
    );
};


export default CustomRadioButton;
