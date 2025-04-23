import React from "react";
import Logo from "../../components/atoms/logo";
import PersonalDetailsForm from "../../components/organisms/personalDetailsForm";
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

const PersonalDetailsScreen = () => {
  const location = useLocation();
  const role = location.state?.selectedValue;
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
        <PersonalDetailsForm showMainTitle showTitles label="Next" role={role}/>
      </Box>
    </Box>
  );
};

export default PersonalDetailsScreen;