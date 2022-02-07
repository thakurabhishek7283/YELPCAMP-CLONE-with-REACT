import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import resume from "../../images/Resume.png";

const CampListCard = ({ campground }) => {
  const navigate = useNavigate();
  const handleViewClick = () => {
    navigate(`/campground/${campground._id}`);
  };
  return (
    <Card sx={{ minWidth: "80%", marginY: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <CardMedia
            sx={{
              height: 0,
              paddingTop: "56.25%", // 16:9,
              marginTop: "30",
            }}
            image={campground.images[0].imageUrl}
          />
        </Grid>

        <Grid item md={8} sm={6} xs={12}>
          <CardContent>
            <Typography variant="h4">{campground.title}</Typography>
            <Typography variant="body1">{campground.description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="success"
              onClick={handleViewClick}
            >
              View Campground
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CampListCard;
