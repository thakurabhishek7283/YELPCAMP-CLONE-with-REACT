import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CampImageList from "../components/CampImageList/CampImageList";
import MapWidget from "../components/Map/Mapwidget";
import Review from "../components/Review/Review";
import { Carousel } from "react-carousel-minimal";
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

const captionStyle = {
  fontSize: "2em",
  fontWeight: "bold",
};
const slideNumberStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const CampgroundLayout = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isLoading, campground } = useSelector((state) => state.campground);
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.user);
  const { campId } = useParams();

  const [validuser, setvaliduser] = useState(false);

  useEffect(() => {
    dispatch(fetchCampground(campId));
  }, []);

  useEffect(() => {
    if (!authData || !campground) return;
    if (authData._id == campground.creator._id) setvaliduser(true);
  });

  useEffect(() => {
    if (!authData && user) dispatch({ type: "USER_REFRESH" });
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
            {/* <CampImageList images={campground.images} /> */}
            <Carousel
              data={campground.images}
              time={3000}
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                margin: "40px auto",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MapWidget location={campground.location} />
            <Paper elevation={3} sx={{ marginY: 2, padding: 2 }}>
              <Typography variant="h5" sx={{ paddingY: 1 }}>
                {campground.title}
              </Typography>
              <Divider />
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
              <Divider />
              <Typography variant="body1" sx={{ marginY: 2 }}>
                {campground.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ height: 1, marginY: 4, borderColor: "white" }} />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={7} md={6}>
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
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CampgroundLayout;
