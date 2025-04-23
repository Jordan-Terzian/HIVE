import React from "react";
import NavBar from "../../../components/molecules/navBar";
import SettingsNavBar from "../../../components/molecules/settingsNavBar";
import { Box } from "@mui/system";
import AcademicDetailsForm from "../../../components/organisms/academicDetailsForm";
import TutorAcademicDetailsForm from "../../../components/organisms/tutorAcademicDetailsForm";
import { useUser } from "../../../contexts/userContext";
import { Navigate } from 'react-router-dom';

const EditAcamdemicDetailsScreen = () => {
  const { user } = useUser();

  const isTutor = user?.role === 'Tutor';

  if (localStorage.getItem('role') === 'Admin') {
    return <Navigate to="/error" />;
  }
  
  return (
    <Box display="grid" gridTemplateColumns="240px 240px 1px auto" height="100vh">
      <NavBar activeItem="Settings" user={user}/>
      <SettingsNavBar activeSubItem="Edit Academic Details" user={user} />
      <Box height="100vh" width="1px" bgcolor="#d9d3b0" marginRight="16px" /> {/* This is the vertical line */}
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        {isTutor ?
          <TutorAcademicDetailsForm
            showTitles
            label="Submit"
            user={user}
          />
          :
          <AcademicDetailsForm
            showTitles
            label="Submit"
            user={user}

          />
        }
      </Box>
    </Box>

  );
};

export default EditAcamdemicDetailsScreen;
