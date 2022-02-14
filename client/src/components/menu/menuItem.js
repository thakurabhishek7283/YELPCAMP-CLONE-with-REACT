import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteCampground } from "../../actions/campground";
import { useNavigate } from "react-router-dom";

const MenuList = ({ campId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteCamp = () => {
    dispatch(deleteCampground(campId, navigate));
  };
  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <MoreHorizIcon sx={{ color: "orange" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ color: "coral" }}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteCamp} sx={{ color: "coral" }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuList;
