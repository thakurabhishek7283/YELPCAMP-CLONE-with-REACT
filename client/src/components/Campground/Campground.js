import Review from "./Review/Review";
import {
  ImageList,
  ImageListItem,
  Grid,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import resume from "../../images/resume.png";
const imgArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function Campground() {
  return (
    <Paper>
      <Grid container>
        <Grid item lg={6} sm={8} xs={12}>
          <ImageList
            sx={{ width: "100%", height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {imgArray.map(() => (
              <ImageListItem>
                <img
                  src={resume}
                  srcSet="images"
                  style={{ width: 164, height: 164 }}
                />
              </ImageListItem>
            ))}
          </ImageList>
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
    </Paper>
  );
}

export default Campground;
