import Review from "./Review/Review";
import {
  ImageList,
  ImageListItem,
  Grid,
  Paper,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCampground } from "../../actions/campground";

function Campground() {
  const dispatch = useDispatch();
  const { isLoading, campground } = useSelector((state) => state.campground);
  console.log(campground);
  let { campId } = useParams();

  useEffect(() => {
    dispatch(fetchCampground(campId));
  }, [campId]);

  if (!campground || isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Grid container>
        <Grid item lg={6} sm={8} xs={12}>
          <Box>
            <ImageList
              sx={{
                width: "100%",
                height: 450,
              }}
              variant="woven"
              cols={3}
              gap={8}
            >
              {campground.images.map((image, index) => (
                <ImageListItem>
                  <img key={index} src={image.imageUrl} alt={image.publicId} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
        <Grid item lg={6} sm={8} xs={12} sx={{ backgroundColor: red[400] }}>
          Map
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        sx={{ marginY: 3, height: 2, backgroundColor: grey[600] }}
      />
      <Box>
        <Review />
      </Box>
    </>
  );
}

export default Campground;
