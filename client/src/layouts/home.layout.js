import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampListCard from "../components/CampListCard/CampListCard";
import { CircularProgress, Container, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCampgrounds } from "../actions/campground";
import HomeMap from "../components/Map/HomeMap";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("profile"));

const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, campgrounds } = useSelector((state) => state.campground);
  const [page, setpage] = useState(1);
  useEffect(() => {
    dispatch(fetchCampgrounds(page));
  }, [page]);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ paddingY: 2 }}>
        <HomeMap campgrounds={campgrounds} />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "50vh",
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
