import React from 'react';
import { Button } from '@mui/material';
import Icon from '@mdi/react';

// Component to show an icon button with a text label

const IconButton = ({ iconPath, text, onPress }) => {
    return (
        <Button
            startIcon={<Icon path={iconPath} size={1} color="black" />}
            style={{ position: 'absolute', top: '10px', right: '10px', textTransform: 'none' }}
            onClick={onPress}
        >
            {text}
        </Button>
    );
};

export default IconButton;
