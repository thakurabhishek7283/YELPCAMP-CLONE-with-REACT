import { styled } from "@mui/material/styles";
import { Paper, Grid, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  width: "390px",
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: 5,
  width: "100%",
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: red[600],
}));
