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
import { useEffect, useState } from "react";
import MenuList from "../menu/menuItem";
import { useSelector } from "react-redux";

// import resume from "../../images/Resume.png";

const CampListCard = ({ campground }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.user);

  const [validuser, setvaliduser] = useState(false);

  useEffect(() => {
    if (!authData) return;
    if (authData._id == campground.creator._id) setvaliduser(true);
  });

  const handleViewClick = () => {
    navigate(`/campground/${campground._id}`);
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
            image={campground.images[0].image}
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
        {user && validuser && (
          <Grid item md={1} sm={1} xs={1}>
            <MenuList campId={campground._id} />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default CampListCard;
