import React from 'react';
import { List, ListItem, ListItemText, ButtonBase, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// SettingsNavBar Component
const SettingsNavBar = ({ activeSubItem, user }) => {
    const navigate = useNavigate();

    // Mapping of sub nav bar items to routes based on user role 
    let routeMapping = {};
    if (user) {
        switch (user.role) {
            case "Student":
                routeMapping = {
                    "Edit Personal Details": "/settings/edit-personal-details",
                    "Edit Location Details": "/settings/edit-location-details",
                    "Edit Academic Details": "/settings/edit-academic-details",
                    "Edit Profile": "/settings/edit-profile",
                    "Delete Account": "/settings/delete-account",
                };
                break;
            case "Admin": 
                routeMapping = {
                "Edit Personal Details": "/settings/edit-personal-details",
                "Edit Location Details": "/settings/edit-location-details",
                "Delete Account": "/settings/delete-account",
                };
                break;
            case "Tutor":
                routeMapping = {
                    "Edit Personal Details": "/settings/edit-personal-details",
                    "Edit Location Details": "/settings/edit-location-details",
                    "Edit Academic Details": "/settings/edit-academic-details",
                    "Edit Profile": "/settings/edit-profile",
                    "Delete Account": "/settings/delete-account",
                };
                break;
            default:
                break;
        }
    }

    return (
        <Box display="flex" flexDirection="column" style={{ width: '240px', height: '100vh' }}>
            <List>
                {Object.entries(routeMapping).map(([text, route]) => (
                    <SubNavBarItem
                        key={text}
                        text={text}
                        isActive={activeSubItem === text}
                        onClick={() => navigate(route)}
                    />
                ))}
            </List>
            <Box mt="auto"> {/* This will push the "Log Out" to the bottom */}
                <SubNavBarItem
                    text="Log Out"
                    isActive={activeSubItem === "Log Out"}
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        navigate('/login');
                    }}
                />
            </Box>
        </Box>
    );
};

// SubNavBarItem Component
const SubNavBarItem = ({ text, isActive, onClick }) => {
    const navigate = useNavigate();

    // Delete user account from database
    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await fetch('http://127.0.0.1:8000/user/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 204) {
                    alert('User account has been deleted.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    navigate('/login');
                } else {
                    const data = await response.json();
                    alert(data.detail);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // Handle click event
    const handleClick = () => {
        if (text === "Delete Account") {
            handleDeleteAccount();
        } else {
            onClick();
        }
    };
    // Base style for sub nav bar items
    const baseStyle = {
        fontWeight: isActive ? 'bold' : 'normal',
        color: '#000',
        borderLeft: isActive ? '4px solid #000' : 'none',
        paddingLeft: isActive ? '6px' : '10px'
    };

    // Style for "Delete Account" sub nav bar item
    if (text === "Delete Account") {
        baseStyle.color = '#EA6565';
    }

    return (
        <ButtonBase component={ListItem} style={{ padding: 10 }} onClick={handleClick}>
            <ListItemText
                primary={text}
                primaryTypographyProps={{ style: baseStyle }}
            />
        </ButtonBase>
    );
};

export default SettingsNavBar;
