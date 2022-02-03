import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Campground from "../components/Campground/Campground";
import { Container } from "@mui/material";

const CampgroundLayout = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ minHeight: "80vh" }}>
        <Campground />
      </Container>
      <Footer />
    </>
  );
};

export default CampgroundLayout;
