import {
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { deleteReview } from "../../actions/review";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReviewForm from "../ReviewForm/ReviewEditForm";

const Review = ({ review }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const handleDeleteReview = () => {
    dispatch(deleteReview(review.campId, review._id, navigate));
  };

  const handleEditReview = () => {
    setEdit(true);
  };

  if (!edit) {
    return (
      <Card>
        <CardContent>
          <AccountCircleOutlinedIcon />
          <Typography variant="h3">{review.creator}</Typography>

          <Rating name="simple-controlled" value={review.rating} readOnly />
          <Typography variant="h5">{review.title}</Typography>
          <Typography variant="body1">{review.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleEditReview}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteReview}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
  return <ReviewForm review={review} />;
};

export default Review;
