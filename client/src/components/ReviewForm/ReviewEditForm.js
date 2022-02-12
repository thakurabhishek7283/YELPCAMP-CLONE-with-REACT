import { FormControl, TextField, Rating, Button, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateReview } from "../../actions/review";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ReviewForm({ review }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [revValues, setrevValues] = useState({
    title: review.title,
    description: review.description,
    rating: review.rating,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReview(review.campId, review._id, revValues, navigate));
  };

  return (
    <Paper elevation={6} sx={{ paddingX: 4, paddingY: 5 }}>
      <FormControl fullWidth sx={{ rowGap: 2 }}>
        <TextField
          label="title"
          defaultValue={revValues.title}
          onChange={(e) =>
            setrevValues((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Rating
          name="simple-controlled"
          value={revValues.rating}
          onChange={(event, newValue) => {
            setrevValues((prev) => ({ ...prev, rating: newValue }));
          }}
        />
        <TextField
          label="description"
          multiline
          maxRows={3}
          defaultValue={revValues.description}
          onChange={(e) =>
            setrevValues((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </Paper>
  );
}

export default ReviewForm;
