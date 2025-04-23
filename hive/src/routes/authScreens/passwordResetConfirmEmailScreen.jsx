import React from "react";
import Logo from "../../components/atoms/logo";
import PasswordResetForm from "../../components/organisms/passwordResetForm";
import { Box } from '@mui/material';
import PasswordResetConfirmEmailForm from "../../components/organisms/passwordResetConfirmEmailForm";
import NavBarPasswordReset from "../../components/molecules/navBarPasswordReset";

const PasswordResetConfirmEmailScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      alignItems="flex-start"
      justifyContent="center"
    >

        <NavBarPasswordReset />
        
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            <PasswordResetConfirmEmailForm />
        </Box>
    </Box>
  );
};

export default PasswordResetConfirmEmailScreen;


