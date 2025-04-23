import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, AppBar, Drawer, Box, ButtonBase } from '@mui/material';
import Icon from '@mdi/react';
import {
    mdiHomeOutline, mdiHome,
    mdiSchoolOutline, mdiSchool,
    mdiCalendarMultiselectOutline, mdiCalendarMultiselect,
    mdiMessageOutline, mdiMessage,
    mdiBellOutline, mdiBell,
    mdiAccountCogOutline, mdiAccountCog,
    mdiAccountCheck, mdiAccountCheckOutline,
    mdiAlertBox, mdiAlertBoxOutline
} from '@mdi/js';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ activeItem, user, userId }) => {
    const navigate = useNavigate();

    let routeMapping = {};
    if (user) {
        switch (user.role) {
            case "Student":
                routeMapping = {
                    "Dashboard": "/home/dashboard",
                    "Find Tutors": "/find-tutors",
                    "Messages": "/messages/:userId",
                    "Calendar": "/calendar",
                    "Notifications": "/notifications",
                    "Settings": "/settings/edit-personal-details"
                };
                break;
            case "Admin": 
                routeMapping = {
                    "Tutor Approval": "/tutor-approval-dashboard",
                    "Reports": "/report-dashboard",
                    "Settings": "/settings/edit-personal-details"
                };
                break;
            case "Tutor":
                routeMapping = {
                    "Dashboard": "/home/tutor-dashboard",
                    "Messages": "/messages/:userId",
                    "Calendar": "/calendar",
                    "Notifications": "/tutor-notifications",
                    "Settings": "/settings/edit-personal-details"
                };
                break;
            default:
                break;
        }
    }

    // Mapping of the navigation bar items to their icons
    const iconMapping = {
        "Dashboard": { active: mdiHome, inactive: mdiHomeOutline },
        "Find Tutors": { active: mdiSchool, inactive: mdiSchoolOutline },
        "Calendar": { active: mdiCalendarMultiselect, inactive: mdiCalendarMultiselectOutline },
        "Messages": { active: mdiMessage, inactive: mdiMessageOutline },
        "Notifications": { active: mdiBell, inactive: mdiBellOutline },
        "Settings": { active: mdiAccountCog, inactive: mdiAccountCogOutline },
        "Tutor Approval": { active: mdiAccountCheck, inactive: mdiAccountCheckOutline },
        "Reports": { active: mdiAlertBox, inactive: mdiAlertBoxOutline }
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            PaperProps={{
                style: {
                    width: '240px',
                    backgroundColor: '#FFEFC2',
                    zIndex:998
                }
            }}
        >
            <AppBar position="sticky" elevation={0} style={{ backgroundColor: '#FFEFC2' }}>
                <Box display="flex" alignItems="center" justifyContent={"center"} padding="16px">
                    <img src="/assets/images/Logo.png" alt="Logo" style={{ height: '121px' }} />
                </Box>
            </AppBar>
            <List>
                {Object.entries(routeMapping).map(([text, route]) => (
                    <NavBarItem
                        key={text}
                        text={text}
                        icon={activeItem === text ? iconMapping[text].active : iconMapping[text].inactive}
                        isActive={activeItem === text}
                        onClick={() => navigate(route)}
                    />
                ))}
            </List>
        </Drawer>
    );
};

const NavBarItem = ({ text, icon, isActive, onClick }) => {
    return (
        <ButtonBase component={ListItem} style={{ padding: 10 }} onClick={onClick}>
            <ListItemIcon>
                <Icon path={icon} size={1.4} style={{ color: 'black' }} />
            </ListItemIcon>
            <ListItemText primary={text} primaryTypographyProps={{ style: { fontWeight: isActive ? 'bold' : 'normal' } }} />
        </ButtonBase>
    );
};

export default NavBar;
