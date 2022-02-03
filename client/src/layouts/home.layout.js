import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampListCard from "../components/CampListCard/CampListCard";
import { Box } from "@mui/material";

const HomeLayout = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          paddingY: 5,
          alignItems: "center",
        }}
      >
        <CampListCard />
      </Box>
      <Footer />
    </>
  );
};

export default HomeLayout;
