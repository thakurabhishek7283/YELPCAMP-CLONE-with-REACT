import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "./Input";
import { StyledPaper, StyledGrid, StyledAvatar } from "./styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Auth() {
  const [authForm, setAuthForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validateForm, setValidateForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forSignup, setForSignup] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setAuthForm((prev) => {
      return { ...prev, [e.target.name]: [e.target.value] };
    });
    if (
      forSignup &&
      authForm.password.length > 8 &&
      authForm.confirmPassword === authForm.password
    ) {
      setValidateForm(true);
    } else if (authForm.password.length > 8 && !forSignup)
      setValidateForm(true);
  };

  const handleAuthRoute = () => {
    setForSignup((prev) => !prev);
  };

  const handleFormSubmit = () => {
    console.log(authForm);
  };
  return (
    <StyledPaper elevation={6}>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <form autoComplete="off">
        <StyledGrid container spacing={2}>
          {forSignup && (
            <>
              <Input
                name="firstName"
                label="First Name"
                type="text"
                half={true}
                autoFocus={true}
                handleChange={handleChange}
              />
              <Input
                name="lastName"
                label="Last Name"
                type="text"
                half={true}
                handleChange={handleChange}
              />
            </>
          )}
          <Input
            name="email"
            label="Email"
            type="email"
            half={false}
            handleChange={handleChange}
          />
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            half={false}
            handleShowPassword={handleShowPassword}
            handleChange={handleChange}
          />
          {forSignup && (
            <Input
              name="confirmPassword"
              label="confirm Password"
              type={showPassword ? "text" : "password"}
              half={false}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
          )}
        </StyledGrid>
        <Button
          color="primary"
          variant="contained"
          disabled={!validateForm}
          onClick={handleFormSubmit}
        >
          {forSignup ? "Sign up" : "Sign in"}
        </Button>
      </form>
      <Box>
        <Button color="secondary" variant="contained" onClick={handleAuthRoute}>
          {forSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </StyledPaper>
  );
}

export default Auth;
