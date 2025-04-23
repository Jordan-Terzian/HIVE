import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


// Custom button component with default styling, can be overwritten with props, takes in an onPress
// and a label
const CustomButton = ({
    label,
    onPress,
    width = 'auto',
    fontSize = 20,
    height = 48,
    background = 'linear-gradient(45deg, #FFC52A 30%, #F69515 90%)' // Default background
}) => {
    const StyledButton = styled(Button)(({ theme }) => ({
        background: background,
        borderRadius: 30,
        color: 'white',
        height: height, 
        width: width,
        padding: '0 30px',
        textTransform: 'none',
    }));

    return (
        <StyledButton onClick={onPress}>
            <Typography variant="h1" style={{ fontSize: fontSize, fontWeight: 'bold' }}>
                {label}
            </Typography>
        </StyledButton>
    );
};

export default CustomButton;
