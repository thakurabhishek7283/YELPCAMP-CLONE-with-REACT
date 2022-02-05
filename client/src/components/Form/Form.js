import {
  Button,
  FormControl,
  CircularProgress,
  OutlinedInput,
  Paper,
  TextField,
  InputAdornment,
  Input,
  Box,
  Typography,
} from "@mui/material";
import ChipInput from "./ChipInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCampground } from "../../actions/campground";

function Form() {
  const isLoading = useSelector((state) => state.campground.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    location: "",
    selectedFiles: [],
  });
  const [tagsInput, setTagsInput] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    if (tagsString.includes(",")) {
      const tempArray = tagsString.split(",");

      const tagsArray = tempArray[0];

      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagsArray] }));

      setTagsInput("");
      e.target.value = "";
    }
    setTagsInput(e.target.value);
  };

  const handleChipDelete = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...e.target.files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campForm = new FormData();
    formData.selectedFiles.forEach((element) => {
      campForm.append("images", element);
    });
    campForm.append("images", formData.selectedFiles);
    campForm.append("title", formData.title);
    campForm.append("location", formData.location);
    campForm.append("description", formData.description);
    campForm.append("tags", formData.tags);
    dispatch(createCampground(campForm, navigate));
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Paper
      elevation={5}
      sx={{
        width: { xs: "90%", sm: "50%", md: "50%", lg: "35%", xl: "30%" },
        maxHeight: "600px",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 5,
          paddingY: 5,
          rowGap: 1,
        }}
      >
        <Typography variant="h4" sx={{ alignSelf: "center", mb: 2 }}>
          New Campground
        </Typography>
        <FormControl fullWidth>
          <TextField label="title" name="title" onChange={handleChange} />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="description"
            name="description"
            onChange={handleChange}
            multiline
            rows={4}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="location(city,state)"
            name="location"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <input
            type="file"
            multiple
            name="images"
            onChange={handleFileChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <OutlinedInput
            name="tags"
            value={tagsInput}
            placeholder="tags(comma seprated)"
            onChange={handleTagsChange}
            startAdornment={
              <InputAdornment position="start">
                {formData.tags.map((tag, index) => {
                  return tag ? (
                    <ChipInput
                      key={index}
                      tag={tag}
                      handleChipDelete={handleChipDelete}
                    />
                  ) : null;
                })}
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default Form;
