import { ImageList, ImageListItem, Box } from "@mui/material";

function CampImageList({ images }) {
  return (
    <Box>
      <ImageList
        sx={{
          width: "100%",
          height: 450,
        }}
        variant="masonry"
        cols={3}
        gap={8}
      >
        {images.map((image, index) => (
          <ImageListItem
            key={index}
            sx={{
              "&:hover": {
                height: "200%",
                width: "200%",
                zIndex: 1,
              },
            }}
          >
            <img src={image.imageUrl} alt={image.publicId} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default CampImageList;
