import React from "react";
import { Box } from "@mui/system";
import LoginForm from "../../components/organisms/loginForm";

const Login = () => {

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // This ensures the Box takes up the full height of the viewport.
      style={{
        backgroundImage: "url('/assets/images/loginBackground.jpg')",
        backgroundSize: 'cover', // This ensures the background image covers the entire element.
        backgroundPosition: 'center', // This centers the background image.
        backgroundRepeat: 'no-repeat', // This ensures the background image doesn't repeat.
      }}
    >
      <LoginForm />
    </Box>
  );
}

export default Login;
