import React from "react";
import Logo from "../../components/atoms/logo";
import ProfileForm from "../../components/organisms/profileForm";
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ProfileScreen = () => {
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Box position="absolute" top={0} left={0}>
        <Logo />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <ProfileForm showMainTitle showTitles label="Register" registerDetails={location.state} />
      </Box>
    </Box>
  );
};

export default ProfileScreen;


