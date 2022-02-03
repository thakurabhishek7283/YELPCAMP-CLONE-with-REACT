import { styled } from "@mui/material/styles";
import { Paper, Grid, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  width: "390px",
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginBottom: 16,
  justifyContent: "center",
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: red[600],
  margin: 15,
}));
