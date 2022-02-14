import {
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { deleteReview } from "../../actions/review";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReviewForm from "../ReviewForm/ReviewEditForm";

const Review = ({ review }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.user);

  const [edit, setEdit] = useState(false);
  const [validuser, setvaliduser] = useState(false);

  useEffect(() => {
    if (!authData) return;
    if (authData._id == review.creatorId) setvaliduser(true);
  }, [authData]);

  const handleDeleteReview = () => {
    dispatch(deleteReview(review.campId, review._id, navigate));
  };

  const handleEditReview = () => {
    setEdit(true);
  };
  console.log(validuser, user);

  if (!edit) {
    return (
      <Card sx={{ marginY: 2 }}>
        <CardContent>
          <AccountCircleOutlinedIcon />
          <Typography variant="subtitle1">{review.creatorName}</Typography>

          <Rating name="simple-controlled" value={review.rating} readOnly />
          <Typography variant="h5">{review.title}</Typography>
          <Typography variant="body1">{review.description}</Typography>
        </CardContent>
        {user && validuser && (
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
        )}
      </Card>
    );
  }
  return <ReviewForm review={review} />;
};

export default Review;
