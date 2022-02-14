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
import { useState } from "react";
import MenuList from "../menu/menuItem";

// import resume from "../../images/Resume.png";

const CampListCard = ({ campground }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const handleViewClick = () => {
    if (user) navigate(`/campground/${campground._id}`);
    else navigate("/auth");
  };
  return (
    <Card sx={{ minWidth: "80%", marginY: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={5} xs={11}>
          <CardMedia
            sx={{
              height: 0,
              paddingTop: "56.25%", // 16:9,
              marginTop: "40",
            }}
            image={campground.images[0].imageUrl}
          />
        </Grid>

        <Grid item md={7} sm={6} xs={12}>
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
        <Grid item md={1} sm={1} xs={1}>
          <MenuList campId={campground._id} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default CampListCard;
