import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampImageList from "../components/CampImageList/CampImageList";
import MapWidget from "../components/Map/Mapwidget";
import Review from "../components/Review/Review";
import { CircularProgress, Container, Divider, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCampground } from "../actions/campground";
import ReviewCreateForm from "../components/ReviewForm/ReviewCreateForm";

const CampgroundLayout = () => {
  const { isLoading, campground } = useSelector((state) => state.campground);
  const dispatch = useDispatch();
  const { campId } = useParams();

  useEffect(() => {
    dispatch(fetchCampground(campId));
  }, []);

  if (!campground || isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ minHeight: "80vh", marginY: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={7}>
            <CampImageList images={campground.images} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MapWidget location={campground.location} />
          </Grid>
        </Grid>
        <Divider sx={{ height: 1, marginY: 5, borderColor: "white" }} />
        <Box sx={{ width: "60%", paddingX: 5, marginY: 9 }}>
          <ReviewCreateForm campId={campId} />
        </Box>
        <Box sx={{ width: "60%", paddingX: 5 }}>
          {campground.reviews.map((review) => {
            return <Review review={review} />;
          })}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CampgroundLayout;
