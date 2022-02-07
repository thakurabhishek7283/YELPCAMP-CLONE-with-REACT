import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampListCard from "../components/CampListCard/CampListCard";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCampgrounds } from "../actions/campground";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const { isLoading, campgrounds } = useSelector((state) => state.campground);
  const [page, setpage] = useState(1);
  useEffect(() => {
    dispatch(fetchCampgrounds(page));
  }, [page]);
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
        {campgrounds.map((campground) => (
          <CampListCard campground={campground} key={campground._id} />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default HomeLayout;
