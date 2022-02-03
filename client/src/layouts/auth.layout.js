import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Auth from "../components/Auth/Auth";
import { Box } from "@mui/material";

const AuthLayout = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Auth />
      </Box>

      <Footer />
    </>
  );
};

export default AuthLayout;
