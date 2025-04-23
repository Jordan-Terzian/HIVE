import React from "react";
import Logo from "../../components/atoms/logo";
import RegisterForm from "../../components/organisms/registerForm";
import Box from '@mui/material/Box';

const RegisterScreen = () => {

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
        <RegisterForm  showMainTitle label="Next" />
      </Box>
    </Box>
  );
};

export default RegisterScreen;
