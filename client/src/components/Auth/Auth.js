import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "./Input";
import { StyledPaper, StyledGrid, StyledAvatar } from "./styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/user";
import { useDispatch } from "react-redux";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authForm, setAuthForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forSignup, setForSignup] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setAuthForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAuthRoute = () => {
    setForSignup((prev) => !prev);
  };

  const handleFormSubmit = () => {
    if (forSignup) {
      dispatch(signup(authForm, navigate));
    } else {
      dispatch(signin(authForm, navigate));
    }
  };
  return (
    <StyledPaper elevation={6}>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <form
        autoComplete="off"
        style={{ display: "flex", justifyContent: "center" }}
      >
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
      </form>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleFormSubmit}
          sx={{ width: "90%", marginBottom: 1 }}
        >
          {forSignup ? "Sign up" : "Sign in"}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleAuthRoute}
          sx={{ width: "90%" }}
        >
          {forSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </StyledPaper>
  );
}

export default Auth;
