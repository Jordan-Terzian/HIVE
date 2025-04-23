import React from "react";
import Logo from "../../components/atoms/logo";
import AcademicDetailsForm from "../../components/organisms/academicDetailsForm";
import TutorAcademicDetailsForm from "../../components/organisms/tutorAcademicDetailsForm";
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AcademicDetailsScreen = () => {
  const location = useLocation();

  const isTutor = location.state?.role === 'Tutor';

  // if the user is a tutor change the academic details form to the tutor academic details form
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
        {isTutor ?
          <TutorAcademicDetailsForm
            showTitles
            showMainTitle
            label="Next"
            registerDetails={location.state}
            
          />
          :
          <AcademicDetailsForm
            showTitles
            showMainTitle
            label="Next"
            registerDetails={location.state}
           
          />
        }
      </Box>
    </Box>
  );
};

export default AcademicDetailsScreen;

