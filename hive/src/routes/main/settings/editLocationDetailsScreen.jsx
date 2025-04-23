import React from "react";
import NavBar from "../../../components/molecules/navBar";
import SettingsNavBar from "../../../components/molecules/settingsNavBar";
import { Box } from "@mui/system";
import LocationDetailsForm from "../../../components/organisms/locationDetailsForm";
import { useUser } from "../../../contexts/userContext";

const EditLocationDetailsScreen = () => {
  const { user } = useUser();
  return (
    <Box display="grid" gridTemplateColumns="240px 240px 1px auto" height="100vh">
      <NavBar activeItem="Settings" user={user} />
      <SettingsNavBar activeSubItem="Edit Location Details" user={user}/>
      <Box height="100vh" width="1px" bgcolor="#d9d3b0" marginRight="16px" /> {/* This is the vertical line */}
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <LocationDetailsForm showTitles label="Submit" user={user}/>
      </Box>
    </Box>

  );
};

export default EditLocationDetailsScreen;
