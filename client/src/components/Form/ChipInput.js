import { Chip } from "@mui/material";

function ChipInput({ tag, handleChipDelete }) {
  const handleDelete = () => {
    handleChipDelete(tag);
  };

  return (
    <Chip color="secondary" size="small" label={tag} onDelete={handleDelete} />
  );
}
export default ChipInput;
