import React from "react";
import Logo from "../../components/atoms/logo";
import PasswordResetForm from "../../components/organisms/passwordResetForm";
import { Box } from '@mui/material';
import PasswordResetConfirmEmailForm from "../../components/organisms/passwordResetConfirmEmailForm";
import NavBarPasswordReset from "../../components/molecules/navBarPasswordReset";

const PasswordResetScreen = () => {
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
        <PasswordResetForm />
      </Box>
    </Box>
  );
};

export default PasswordResetScreen;


