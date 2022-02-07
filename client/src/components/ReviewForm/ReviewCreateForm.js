import { FormControl, TextField, Rating, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { postReview } from "../../actions/review";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode";

function ReviewCreateForm() {
  const { campId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const token = user?.token;
  const decodedToken = jwt_decode(token);

  const [revValues, setrevValues] = useState({
    title: "",
    description: "",
    rating: 2,
    creator: decodedToken._id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReview(campId, revValues, navigate));
  };
  return (
    <FormControl fullWidth>
      <TextField
        label="title"
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
        onChange={(e) =>
          setrevValues((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </FormControl>
  );
}

export default ReviewCreateForm;
