import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampImageList from "../components/CampImageList/CampImageList";
import MapWidget from "../components/Map/Mapwidget";
import Review from "../components/Review/Review";
import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCampground } from "../actions/campground";
import ReviewCreateForm from "../components/ReviewForm/ReviewCreateForm";
import MenuList from "../components/menu/menuItem";

const CampgroundLayout = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isLoading, campground } = useSelector((state) => state.campground);
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.user);
  const { campId } = useParams();

  const [validuser, setvaliduser] = useState(false);

  useEffect(() => {
    dispatch({ type: "USER_REFRESH" });
    dispatch(fetchCampground(campId));
  }, []);

  useEffect(() => {
    if (!authData || !campground) return;
    if (authData._id == campground.creator._id) setvaliduser(true);
  });

  if (!campground || isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ minHeight: "80vh", marginY: 5 }}>
        {user && validuser && <MenuList campId={campground._id} />}
        <Grid container spacing={5}>
          <Grid item xs={12} sm={7}>
            <CampImageList images={campground.images} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MapWidget location={campground.location} />
          </Grid>
        </Grid>
        <Divider sx={{ height: 1, marginY: 4, borderColor: "white" }} />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={7}>
            {user && (
              <Box sx={{ width: "100%", paddingX: 5 }}>
                <ReviewCreateForm campId={campId} />
              </Box>
            )}

            <Box sx={{ width: "100%", paddingX: 5 }}>
              {campground.reviews.map((review, index) => {
                return <Review key={index} review={review} />;
              })}
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper elevation={3} sx={{ padding: 5 }}>
              <Typography variant="h5" sx={{ paddingY: 2 }}>
                {campground.title}
              </Typography>
              <Stack sx={{ display: "inline" }}>
                {campground.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    color="success"
                    sx={{ display: "inline-flex" }}
                  />
                ))}
              </Stack>

              <Typography variant="body1" sx={{ marginY: 2 }}>
                {campground.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CampgroundLayout;
