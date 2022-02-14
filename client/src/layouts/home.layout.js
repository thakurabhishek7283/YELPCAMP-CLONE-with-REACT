import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampListCard from "../components/CampListCard/CampListCard";
import { Container, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCampgrounds } from "../actions/campground";
import HomeMap from "../components/Map/HomeMap";
import { green } from "@mui/material/colors";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const { isLoading, campgrounds } = useSelector((state) => state.campground);
  const { authData } = useSelector((state) => state.user);
  const [page, setpage] = useState(1);
  useEffect(() => {
    dispatch(fetchCampgrounds(page));
  }, [page]);
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ paddingY: 2 }}>
        <HomeMap campgrounds={campgrounds} />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          paddingY: 5,
          alignItems: "center",
        }}
      >
        {campgrounds.map((campground) => (
          <CampListCard campground={campground} key={campground._id} />
        ))}
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          sx={{ backgroundColor: green[300], marginY: 3 }}
        />
      </Container>

      <Footer />
    </>
  );
};

export default HomeLayout;
