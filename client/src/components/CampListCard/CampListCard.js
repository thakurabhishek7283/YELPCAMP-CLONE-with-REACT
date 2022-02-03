import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Button,
} from "@mui/material";
// import resume from "../../images/Resume.png";

const CampListCard = () => {
  return (
    <Card sx={{ maxWidth: 1000 }}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <CardMedia
            sx={{
              height: 0,
              paddingTop: "56.25%", // 16:9,
              marginTop: "30",
            }}
            image={require("../../images/Resume.png")}
          />
        </Grid>

        <Grid item md={8} sm={6} xs={12}>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </CardContent>
          <CardActions>
            <Button variant="contained" color="success">
              View Campground
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CampListCard;
